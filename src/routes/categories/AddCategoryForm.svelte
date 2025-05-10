<script lang="ts">
  import { poiService } from "$lib/services/poi-service";
  import { loggedInUser } from "$lib/runes.svelte";
  import { get } from "svelte/store";

  let name = "";
  let message = "";

  async function addCategory() {
    const category = { name };
    const token = loggedInUser.token;
    const success = await poiService.addCategory(category, token);
    message = success ? "Category added successfully" : "Failed to add category";
    console.log("Token being sent:", loggedInUser.token);
  }
</script>

<div class="box">
  <h2 class="title is-5">Add a New Category</h2>

  <div class="field">
    <label class="label" for="category-name">Name</label>
    <div class="control">
      <input
        id="category-name"
        class="input"
        bind:value={name}
        placeholder="e.g. Mountains"
      />
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button class="button is-primary" on:click={addCategory}>
        Add Category
      </button>
    </div>
  </div>

  {#if message}
    <div class="notification is-info mt-2">
      {message}
    </div>
  {/if}
</div>
