<script context="module">
    export function load() {
      return {
        redirect: '/campaigns',
        status: 302
      }
    }
</script>

<script>
    import {onMount} from "svelte";

    onMount(()=> {
      window.location.href = window.location.href+'/campaigns';
    })
</script>

<h1 class="text-3xl font-bold underline">

</h1>