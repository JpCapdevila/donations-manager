<script>
  import {onMount} from "svelte";
  import {SerializedDocument, SerializedDocumentArray} from "@healthtree/firestore-join";
  import {collection, doc, getFirestore, query} from "firebase/firestore";
  import {page} from "$app/stores";

  export let campaign;
  export let items = [];

  function getUrl() {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
  }

  onMount(async () => {
    items = await SerializedDocumentArray.fromQuery(query(collection(getFirestore(), "items")));
    campaign = await SerializedDocument.fromDocumentReference(doc(getFirestore(), 'campaigns', $page.params.campaignId));
  })

  function getTitle() {
    return encodeURIComponent(`Los invito a participar en la campaña ${campaign.data.name}.`);
  }
</script>

{#if campaign}
    <div class="p-4 border-b shadow-md mb-16">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl text-rose-800 mt-2">{campaign.data.name}</h1>
        <p class="my-4 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">{campaign.data.description}</p>
    </div>

    <section class="page">

        <div class="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            <div class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
      <span class="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
      </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-lg font-medium">
                        <p>
                            Donde?
                        </p>
                    </h3>
                    <p class="my-2 text-md text-gray-500">{campaign.data.deliveryPlace}</p>
                    <a class="text-rose-800" target="_blank" href={campaign.data.googleMapsLink}>Ver en Google Maps</a>
                </div>
                <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                      aria-hidden="true">
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
      </svg>
    </span>
            </div>

            <div class="sm:rounded-tr-lg relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
      <span class="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
        <!-- Heroicon name: outline/badge-check -->
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
             stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
      </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-lg font-medium">
                        <a href="#" class="focus:outline-none">
                            <!-- Extend touch target to entire panel -->
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Que se necesita?
                        </a>
                    </h3>
                    <p class="mt-2 text-md text-gray-500">
                        {campaign.data.items.map(itemId => items.find(item => item.ref.id === itemId)?.data.name).join(', ')}
                    </p>
                </div>
                <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                      aria-hidden="true">
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
      </svg>
    </span>
            </div>

            <div class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
      <span class="rounded-lg inline-flex p-3 bg-sky-50 text-sky-700 ring-4 ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
</svg>
      </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-lg font-medium">
                        <a href="#" class="focus:outline-none">
                            <!-- Extend touch target to entire panel -->
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Que dias?
                        </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">{campaign.data.datesText}</p>
                </div>
                <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                      aria-hidden="true">
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
      </svg>
    </span>
            </div>

            <div class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <div>
      <span class="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
             stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
      </span>
                </div>
                <div class="mt-8">
                    <h3 class="text-lg font-medium">
                        <a href="#" class="focus:outline-none">
                            <!-- Extend touch target to entire panel -->
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            A que hora?
                        </a>
                    </h3>
                    <p class="mt-2 text-sm text-gray-500">{campaign.data.timeText}</p>
                </div>
                <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                      aria-hidden="true">
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
      </svg>
    </span>
            </div>

        </div>

    </section>

    <div class="page mt-8">
        <h2 class="text-xl mb-2">
            Invita a tus amigos a participar
        </h2>
        <div class="flex flex-row space-x-2">
            <a
                    href="https://www.facebook.com/sharer.php?u={getUrl()}%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cursor-pointer text-xl md:text-base rounded-full h-12 w-12 md:h-9 md:w-9 flex justify-center items-center bg-rose-800"
            >
                <span class="fab fa-facebook-f text-white"/>
            </a>
            <a
                    href="https://twitter.com/share?text={getTitle()}&amp;url={getUrl()}%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cursor-pointer text-xl md:text-base rounded-full h-12 w-12 md:h-9 md:w-9 flex justify-center items-center bg-rose-800"
            >
                <span class="fab fa-twitter text-white"/>
            </a>
            <a
                    href="https://www.linkedin.com/shareArticle?mini=true&amp;url={getUrl()}%2F&amp;"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cursor-pointer text-xl md:text-base rounded-full h-12 w-12 md:h-9 md:w-9 flex justify-center items-center bg-rose-800"
            >
                <span class="fab fa-linkedin-in text-white"/>
            </a>

            <a
                    href="mailto:?subject={getTitle()}&amp;body={getUrl()}/"
                    target="_blank"
                    class="cursor-pointer text-xl md:text-base rounded-full h-12 w-12 md:h-9 md:w-9 flex justify-center items-center bg-rose-800"
            >
                <span class="far fa-envelope text-white"/>
            </a>
        </div>
    </div>

{/if}
