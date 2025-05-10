<script lang="ts">
  import { loggedInUser, currentCategories } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let name = $state("");
  let description = $state("");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let categoryId = $state("");
  let message = $state("Enter details for your POI");

  async function addPoi() {
    if (name && categoryId) {
      const poi = {
        name,
        description,
        lat,
        lng,
        categoryId
      };
      const success = await poiService.addPoi(poi);
      message = success
        ? `POI '${name}' added successfully!`
        : "POI not added - an error occurred";
    } else {
      message = "Please enter all required fields";
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="name">POI Name:</label>
    <input bind:value={name} class="input" id="name" name="name" type="text" />
  </div>

  <div class="field">
    <label class="label" for="description">Description:</label>
    <input bind:value={description} class="input" id="description" name="description" type="text" />
  </div>

  <div class="field">
    <label class="label" for="category">Category:</label>
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
      <button onclick={addPoi} class="button is-primary">Add POI</button>
    </div>
  </div>
</div>

<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
