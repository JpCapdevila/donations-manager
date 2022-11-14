<script>
  import {buildRelativePath} from "../../../../services/routeUtils.js";
  import {page} from "$app/stores";
  import {onMount} from "svelte";
  import {goto} from "$app/navigation";
  import {SerializedDocument, SerializedDocumentArray} from "@healthtree/firestore-join";
  import {addDoc, collection, doc, getFirestore, query, setDoc} from "firebase/firestore";

  let items = [];
  let itemOptions = [];
  let campaign;
  let values = {items: []};

  async function save() {
    const campaignId = $page.params.campaignId;
    if (campaignId === 'new') {
      await addDoc(collection(getFirestore(),'campaigns'), values)
    } else {
      await setDoc(campaign.ref, values)
    }
    goto(buildRelativePath($page, '../'))
  }

  onMount(async () => {
    const campaignId = $page.params.campaignId;
    items = await SerializedDocumentArray.fromQuery(query(collection(getFirestore(), "items")));
    itemOptions = items.map(item => ({label: item.data.name, value: item.ref.id}));
    if (campaignId === 'new') {
      campaign = SerializedDocument.createLocal(collection(getFirestore(),'campaigns'), {items: []});
    } else {
      campaign = await SerializedDocument.fromDocumentReference(doc(getFirestore(),'campaigns', campaignId));
    }
    values = {...campaign.data};
  });
</script>

<section class="page">
    <form class="bg-white space-y-8 divide-y divide-gray-200 shadow p-6">
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Campaña</h3>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="name" class="block text-sm font-medium text-gray-700"> Nombre de la Campaña </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="name" id="name" bind:value={values.name}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="checkbox" name="active" id="active" bind:checked={values.active}
                                   class="sm:text-sm border-gray-300">
                            <label for="active" class="block text-sm font-medium text-gray-700"> Campaña Activa </label>
                        </div>

                        <label for="description" class="block text-sm font-medium text-gray-700"> Descripcion </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="description" id="description" bind:value={values.description}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        <label for="deliveryPlace" class="block text-sm font-medium text-gray-700"> Lugar de
                            Entrega </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="deliveryPlace" id="deliveryPlace" bind:value={values.deliveryPlace}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        <label for="googleMapsLink" class="block text-sm font-medium text-gray-700"> Link Google
                            Maps </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="googleMapsLink" id="googleMapsLink"
                                   bind:value={values.googleMapsLink}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        <label for="datesText" class="block text-sm font-medium text-gray-700"> Texto Dias </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="datesText" id="datesText"
                                   bind:value={values.datesText}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        <label for="timeText" class="block text-sm font-medium text-gray-700"> Texto Horario </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="timeText" id="timeText"
                                   bind:value={values.timeText}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>


<!--                        <label for="startDate" class="block text-sm font-medium text-gray-700"> Fecha de Inicio </label>-->
<!--                        <div class="mt-1 flex rounded-md shadow-sm">-->
<!--                            <input type="datetime-local" name="startDate" id="startDate" bind:value={values.startDate}-->
<!--                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">-->
<!--                        </div>-->

<!--                        <label for="endDate" class="block text-sm font-medium text-gray-700"> Fecha Final </label>-->
<!--                        <div class="mt-1 flex rounded-md shadow-sm">-->
<!--                            <input type="datetime-local" name="endDate" id="endDate" bind:value={values.endDate}-->
<!--                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">-->
<!--                        </div>-->

                        <label class="block text-sm font-medium text-gray-700"> Productos Necesitados </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            {#each itemOptions as itemOption}
                                <label class="flex-1">
                                    <input type="checkbox" name="items" value={itemOption.value}
                                           bind:group={values.items}
                                           class=" sm:text-sm border-gray-300">
                                    {itemOption.label}
                                </label>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-5">
            <div class="flex justify-end">
                <a href={buildRelativePath($page,'../')}
                   class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Cancel
                </a>
                <button type="submit" on:click|preventDefault={save}
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Save
                </button>
            </div>
        </div>
    </form>
</section>

