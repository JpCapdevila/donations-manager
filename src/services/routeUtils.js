/*
Builds a relative path from the project's root, preserving query params.
Example.
buildRelativeRootPath(page, '/account/profile') === '/account/profile'
*/
export function buildRelativeRootPath(page, goto) {
  return buildRelativePath(page, '/', goto);
}

/*
Builds a relative path and keeps the query params
 */
export function buildRelativePath(page, goto, base = undefined) {
  return absolute(page, goto, base || page.url.pathname);
}

function combineSearchParams(searchParams1, searchParams2) {
  const result = new URLSearchParams();
  [searchParams1, searchParams2].map((params) => {
    for (const pair of params.entries()) {
      result.append(pair[0], pair[1]);
    }
  });

  return result;
}

function absolute(page, goto, base) {
  // Remove hash and query string if present
  const stack = base.split('#')[0].split('?')[0].split('/');
  const parts = goto.split('#')[0].split('?')[0].split('/');

  // Resolve goto relative to base
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '.') continue;
    if (parts[i] === '..') stack.pop();
    else stack.push(parts[i]);
  }

  let searchParams = new URLSearchParams();

  // TODO: Define if we want to keep query params in base or not
  // Check for query string in base
  if (base.includes('?')) {
    searchParams = combineSearchParams(searchParams, new URLSearchParams(base.split('?')[1]));
  }

  // Check for query string in goto
  if (goto.includes('?')) {
    searchParams = combineSearchParams(searchParams, new URLSearchParams(goto.split('?')[1]));
  }
  // Preserve whitelisted search params
  searchParams = getFilteredQuery(page, searchParams);

  let searchParamsString = searchParams.toString();

  // Remove double slashes
  let path = stack.join('/').replace(/\/\//g, '/');

  // Remove ending slash
  if (path.endsWith('/')) {
    path = path.slice(0, path.length - 1);
  }

  // Append query string
  if (searchParamsString.length) {
    path += '?' + searchParamsString;
  }

  if (goto.includes('#')) {
    path += '#' + goto.split('#')[1];
  }

  return path;
}

function getFilteredQuery(page, targetQuery) {
  const whitelist = ['userId'];
  const filteredQuery = targetQuery || new URLSearchParams();
  page.url.searchParams &&
  whitelist.forEach(
    (param) => page.url.searchParams.has(param) && filteredQuery.set(param, page.url.searchParams.get(param))
  );
  return filteredQuery;
}
