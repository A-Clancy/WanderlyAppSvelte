<script lang="ts">
  import { poiService } from "$lib/services/poi-service";
  import { currentCategories } from "$lib/runes.svelte";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let name = "";
  let description = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let categoryId = "";
  let message = "";

  async function addPoi() {
    if (!name || !categoryId) {
      message = "Please fill in all required fields.";
      return;
    }

    const poi = { name, description, lat, lng, categoryId };
    const success = await poiService.addPoi(poi);
    message = success
      ? `POI '${name}' added successfully!`
      : "POI not added - an error occurred";
    console.log("Submitting POI:", { name, description, lat, lng, categoryId });

  }
</script>

<div class="box">
  <h2 class="title is-5">Add a New POI</h2>

  <div class="field">
    <label class="label" for="name">Name</label>
    <input id="name" class="input" bind:value={name} placeholder="e.g. Croagh Patrick" />
  </div>

  <div class="field">
    <label class="label" for="description">Description</label>
    <input id="description" class="input" bind:value={description} placeholder="Optional" />
  </div>

  <div class="field">
    <label class="label" for="category">Category</label>
    <div class="select">
      <select id="category" bind:value={categoryId}>
        <option value="">Select a category</option>
        {#each currentCategories.categories as category}
          <option value={category._id}>{category.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <Coordinates bind:lat bind:lng />

  <div class="field mt-4">
    <div class="control">
      <button on:click={addPoi} class="button is-primary">Add POI</button>
    </div>
  </div>

  {#if message}
    <div class="notification is-info mt-2">
      {message}
    </div>
  {/if}
</div>
