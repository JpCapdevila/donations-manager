<script>
  import {buildRelativePath} from "../../services/routeUtils.js";
  import {page} from "$app/stores";
  import {onMount} from "svelte";
  import {SerializedDocumentArray} from "@healthtree/firestore-join";
  import {collection, getFirestore, query, where} from "firebase/firestore";

  export let campaigns = [];
  export let items = [];

  onMount(async () => {
    campaigns = await SerializedDocumentArray.fromQuery(query(collection(getFirestore(), "campaigns"), where('active', '==', true)));
    items = await SerializedDocumentArray.fromQuery(query(collection(getFirestore(), "items")));
  })
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                 fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100"/>
            </svg>

            <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div class="sm:text-center lg:text-left">
                    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span class="block xl:inline">Participación en campañas de Compromiso Social,.</span>
                        <span class="block text-rose-800 xl:inline">campus Guadalajara</span>
                    </h1>
                    <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Siguiendo la línea de la Universidad Panamericana de contribuir en la <span
                            class="block text-rose-800 xl:inline">construcción de un mundo mejor</span> y con el
                        objetivo de seguir fomentando en la Comunidad Universitaria los valores sociales, el
                        departamento de Compromiso Social, del Área de Vida Panamericana, los invita a formar parte de
                        las siguientes campañas.
                    </p>
                </div>
            </main>
        </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="landing.jpg"
             alt="Alumnos compromiso social">
    </div>


</div>

<div class="page">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 m-4">
        {#each campaigns as campaign (campaign.ref.id)}
            <a href={buildRelativePath($page,'./'+campaign.ref.id)}
               class="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 cursor-pointer">
                <div class="w-full flex items-center justify-between p-6 space-x-6">
                    <div class="flex-1 truncate">
                        <div class="flex items-center space-x-3">
                            <h3 class="text-rose-800 text-lg font-medium truncate">{campaign.data.name}</h3>
                        </div>
                        <p class="mt-1 text-gray-500 text-sm truncate">{campaign.data.deliveryPlace}</p>
                        <div class="mt-1">
                            {#each campaign.data.items as itemId}
                                <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                    {items.find(item => item.ref.id === itemId)?.data.name}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </ul>
</div>

