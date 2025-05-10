<script lang="ts">
    import { onMount } from "svelte";
    import { poiService } from "$lib/services/poi-service";
    import POIList from "$lib/ui/POIList.svelte";
  
    onMount(async () => {
      await poiService.getAllPOIs();
    });
  </script>
  
  <section class="section">
    <div class="container">
      <h1 class="title">Explore POIs</h1>
      <POIList />
    </div>
  </section>
  