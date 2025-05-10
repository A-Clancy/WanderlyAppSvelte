<script lang="ts">
  import AddCategory from "./AddCategoryForm.svelte";
  import { onMount } from "svelte";
  import { poiService } from "$lib/services/poi-service";
  import { currentCategories } from "$lib/runes.svelte";
  import POIChart from "$lib/ui/POIChart.svelte";

  onMount(async () => {
    const categories = await poiService.getAllCategories();
    currentCategories.categories = categories;
  });

  async function deleteCategory(id: string) {
    const success = await poiService.deleteCategory(id);
    if (success) {
      currentCategories.categories = currentCategories.categories.filter(c => c._id !== id);
    }
  }
</script>

<AddCategory />

<hr class="my-4" />

<h3 class="title is-5">Existing Categories</h3>
<ul>
  {#each currentCategories.categories as category}
    <li>
      {category.name}
      <button
        class="button is-small is-danger ml-2"
        on:click={() => deleteCategory(category._id)}
      >
        Delete
      </button>
    </li>
  {/each}
</ul>

<hr class="my-4" />
<h3 class="title is-5">Analytics</h3>
<POIChart />
