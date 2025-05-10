<script lang="ts">
  import AddCategory from "./AddCategoryForm.svelte";
  import { onMount } from "svelte";
  import { poiService } from "$lib/services/poi-service";
  import { currentCategories } from "$lib/runes.svelte";

  onMount(async () => {
    const categories = await poiService.getAllCategories();
    currentCategories.categories = categories;
  });
</script>

<AddCategory />

<hr class="my-4" />

<h3 class="title is-5">Existing Categories</h3>
<ul>
  {#each currentCategories.categories as category}
    <li>{category.name}</li>
  {/each}
</ul>
