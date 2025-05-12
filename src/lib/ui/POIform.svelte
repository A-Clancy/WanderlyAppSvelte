<script lang="ts">
  import { poiService } from "$lib/services/poi-service";
  import { currentCategories, loggedInUser } from "$lib/runes.svelte";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let name = "";
  let description = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let categoryId = "";
  let message = "";
  let imageFile: File | null = null;

  async function addPoi() {
    if (!name || !categoryId) {
      message = "Please fill in all required fields.";
      return;
    }

    const poi = { name, description, lat, lng, categoryId };
    const created = await poiService.addPoi(poi);

    if (created && imageFile) {
      const formData = new FormData();
      formData.append("images", imageFile);

      try {
        await fetch(`${poiService.baseUrl}/api/pois/${created._id}/images`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`
          }
        });
        message = `POI '${name}' added successfully with image!`;
      } catch (error) {
        console.log("Image upload failed:", error);
        message = `POI '${name}' added, but image upload failed.`;
      }
    } else {
      message = created
        ? `POI '${name}' added successfully!`
        : "POI not added - an error occurred";
    }

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

  <div class="field">
    <label class="label" for="poi-image">POI Image</label>
    <div class="control">
      <input
        id="poi-image"
        type="file"
        accept="image/*"
        on:change={(e) => {
          const target = e.target as HTMLInputElement;
          if (target && target.files && target.files.length > 0) {
            imageFile = target.files[0];
          }
        }}
      />
    </div>
  </div>

  {#if imageFile}
    <div class="field mt-2">
      <label class="label" for="image-preview">Image Preview</label>
      <figure class="image is-128x128">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img id="image-preview" src={URL.createObjectURL(imageFile)} alt="Preview of selected POI image" />
      </figure>
    </div>
  {/if}

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
