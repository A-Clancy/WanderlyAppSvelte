<script lang="ts">
  import { onMount } from "svelte";
  import { poiService } from "$lib/services/poi-service";
  import { currentCategories } from "$lib/runes.svelte";
  import POIForm from "$lib/ui/POIForm.svelte";
  import POIList from "$lib/ui/POIList.svelte";

  onMount(async () => {
    await poiService.restoreSession();
    const categories = await poiService.getAllCategories();
    console.log("Loaded categories:", categories);
    currentCategories.categories = categories;

    await poiService.getAllPOIs();
  });
</script>

<POIForm />
<POIList />
