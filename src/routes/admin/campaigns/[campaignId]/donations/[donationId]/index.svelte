<script>
  import {buildRelativePath} from "../../../../../../services/routeUtils.js";
  import {page} from "$app/stores";
  import {onMount} from "svelte";
  import {DatabaseArray, auth} from "@jsdb/sdk";
  import {goto} from "$app/navigation";
  import {SerializedDocument, SerializedDocumentArray} from "@healthtree/firestore-join";
  import {addDoc, collection, doc, getFirestore, query, setDoc} from "firebase/firestore";

  const campaignId = $page.params.campaignId;
  const donationId = $page.params.donationId;
  const _items = new DatabaseArray('items');
  const typeOptions = ['LICENCIATURA', 'POSTGRADO', 'PERSONAL', 'ALUMNI', 'INTERCAMBIO', 'OTRO'];


  let items = [];
  let itemOptions = [];
  let values = {campaignId, items: {}, type: undefined};
  let donation;


  async function save() {
    if (donationId === 'new') {

      await addDoc(collection(getFirestore(),'donations'), values)
    } else {
      await setDoc(donation.ref, values)
    }
    goto(buildRelativePath($page, '../'))
  }

  onMount(async () => {
    items = await SerializedDocumentArray.fromQuery(query(collection(getFirestore(), "items")));
    itemOptions = items.map(item => ({label: item.data.name, value: item.ref.id}));
    if (donationId === 'new') {
      donation = SerializedDocument.createLocal(collection(getFirestore(),'donations'), {campaignId, items: {}, type: undefined, date: new Date()});
    } else {
      donation = await SerializedDocument.fromDocumentReference(doc(getFirestore(),'donations', donationId));
    }
    values = {...donation.data};
  });
</script>

<section class="page">
    <form class="bg-white space-y-8 divide-y divide-gray-200 shadow p-6">
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Donacion</h3>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="name" class="block text-sm font-medium text-gray-700"> Nombre del donador </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="name" id="name" bind:value={values.name}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        <label class="block text-sm font-medium text-gray-700"> Tipo de donante </label>
                        <div>
                            {#each typeOptions as type}
                                <label class="block"><input type="radio" value={type} bind:group={values.type}> {type}
                                </label>
                            {/each}
                        </div>

                        <label for="upId" class="block text-sm font-medium text-gray-700"> ID UP </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="upId" id="upId" bind:value={values.upId}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

                        {#each items as item (item.ref.id)}
                            <label class="block text-sm font-medium text-gray-700"> Cantidad {item.data.name} </label>
                            <div class="mt-1 flex rounded-md shadow-sm">
                                <input type="number" bind:value={values.items[item.ref.id]}
                                       class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                            </div>
                        {/each}

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

