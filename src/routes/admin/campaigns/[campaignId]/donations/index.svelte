<script>
  import {page} from "$app/stores";
  import {buildRelativePath} from "../../../../../services/routeUtils.js";
  import {onMount} from "svelte";
  import {SerializedDocumentArray} from "@healthtree/firestore-join";
  import {collection, getFirestore, query, where} from "firebase/firestore";

  let campaignDonations = [];

  onMount(async () => {
    campaignDonations = await SerializedDocumentArray.fromQuery(query(collection(getFirestore(), "donations"), where('campaignId', '==', $page.params.campaignId)));
  });
</script>

<div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Donaciones</h1>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <a type="submit" href={buildRelativePath($page,'./new')}
               class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                Registrar nueva donacion
            </a>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
               class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                Descargar reporte excel
            </button>
        </div>
    </div>
    <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre
                            </th>
                            <th scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Fecha
                            </th>
                            <!--                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha Inicio</th>-->
                            <!--                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha Fin</th>-->
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                        {#each campaignDonations as donation (donation.ref.id)}
                            <tr>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{donation.data.name}</td>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{donation.data.date}</td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href={buildRelativePath($page,`./${donation.ref.id}`)}
                                       class="text-rose-600 hover:text-rose-900 mr-4">Editar</a>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
