<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { categoryService } from "$lib/services/category-service";
  import type { Category } from "$lib/types/placemark-types";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let name = $state("");
  let lat = $state(52.160858);
  let lng = $state(-7.15242);
  let message = $state("Enter details for your POI");

  async function addPoi() {
    if (name) {
      const category: Category = {
        name,
        lat,
        lng,
        user: loggedInUser._id
      };
      const success = await categoryService.addCategory(category);
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

  <Coordinates bind:lat bind:lng />

  <div class="field mt-4">
    <div class="control">
      <button on:click={addPoi} class="button is-primary">Add POI</button>
    </div>
  </div>
</div>

<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
