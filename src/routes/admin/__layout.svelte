<script>
  import Auth from "../../components/Auth.svelte";
  import {goto} from "$app/navigation";
  import {buildRelativeRootPath} from "../../services/routeUtils.js";
  import {page} from "$app/stores";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    loggedIn = !!user;
  });
  let loggedIn;

  function logout() {
    signOut(auth);
    goto('/');
  }
</script>

{#if loggedIn}
    <div class="bg-white mb-5 border-b-2">
        <div class="flex justify-between items-center px-6 py-4 md:justify-start md:space-x-10">
            <div class="flex justify-start lg:w-0 lg:flex-1">
                <a class="font-bold" href="/" target="_blank">
                    Registrocyr
                </a>
                <a class="ml-20" href={buildRelativeRootPath($page,'/admin/campaigns')}>
                    <span>Campañas</span>
                </a>
                <a class="ml-20" href={buildRelativeRootPath($page,'/admin/items')}>
                    <span>Productos</span>
                </a>
            </div>
            <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <button on:click={logout} class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"> Log Out </button>
            </div>
        </div>
    </div>

    <div class="page">
        <slot/>
    </div>
{:else}
    <Auth/>
{/if}