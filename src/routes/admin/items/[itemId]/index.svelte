<script>
  import {buildRelativePath} from "../../../../services/routeUtils.js";
  import {page} from "$app/stores";
  import {onMount} from "svelte";
  import {goto} from "$app/navigation";
  import { getFirestore, getDocs, query, collection, doc, addDoc, setDoc } from "firebase/firestore";
  import {SerializedDocument} from "@healthtree/firestore-join";

  let item;
  let values = {};

  async function save() {
    const itemId = $page.params.itemId;
    if(itemId === 'new') {
      await addDoc(collection(getFirestore(),'items'), values)
    } else {
      await setDoc(item.ref, values)
    }
    goto(buildRelativePath($page,'../'))
  }

  onMount(async () => {
    const itemId = $page.params.itemId;
    if(itemId === 'new') {
      item = SerializedDocument.createLocal(collection(getFirestore(),'items'));
    } else {
      item = await SerializedDocument.fromDocumentReference(doc(getFirestore(),'items', itemId));
      console.log('item', item);
    }
    values = {...item.data};
  });
</script>

<section class="page">
    <form class="bg-white space-y-8 divide-y divide-gray-200 shadow p-6">
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Producto</h3>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="name" class="block text-sm font-medium text-gray-700"> Nombre </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" name="name" id="name" bind:value={values.name}
                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">
                        </div>

<!--                        <label for="amount" class="block text-sm font-medium text-gray-700">Cantidad Meta</label>-->
<!--                        <div class="mt-1 flex rounded-md shadow-sm">-->
<!--                            <input type="number" name="amount" id="amount" bind:value={values.amount}-->
<!--                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">-->
<!--                        </div>-->

<!--                        <label for="equivalenceText" class="block text-sm font-medium text-gray-700"> Frase equivalencia (poner # donde va el numero)</label>-->
<!--                        <div class="mt-1 flex rounded-md shadow-sm">-->
<!--                            <input type="text" name="equivalenceText" id="equivalenceText" bind:value={values.equivalenceText}-->
<!--                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">-->
<!--                        </div>-->

<!--                        <label for="equivalenceValue" class="block text-sm font-medium text-gray-700"> Numero equivalencia </label>-->
<!--                        <div class="mt-1 flex rounded-md shadow-sm">-->
<!--                            <input type="number" name="equivalenceValue" id="equivalenceValue" bind:value={values.equivalenceValue}-->
<!--                                   class="flex-1 focus:ring-rose-500 focus:border-rose-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300">-->
<!--                        </div>-->
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
