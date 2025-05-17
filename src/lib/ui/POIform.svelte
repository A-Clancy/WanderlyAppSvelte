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
  let imageFiles: File[] = [];

  async function addPoi() {
    if (!name || !categoryId) {
      message = "Please fill in all required fields.";
      return;
    }

    const poi = { name, description, latitude: lat, longitude: lng, categoryId };
    const created = await poiService.addPoi(poi);

    if (created && imageFiles.length > 0) {
      const formData = new FormData();
      imageFiles.forEach((file, i) => {
        console.log(`Appending file ${i + 1}: ${file.name}`);
        formData.append("images", file);
      });

      try {
        const response = await fetch(`${poiService.baseUrl}/api/pois/${created._id}/images`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`
          }
        });

        const result = await response.json();
        console.log("Upload response:", result);

        if (response.ok) {
          message = `POI '${name}' added successfully with ${imageFiles.length} image(s)!`;
        } else {
          message = `POI '${name}' added, but image upload failed.`;
        }

      } catch (error) {
        console.log("Image upload failed:", error);
        message = `POI '${name}' added, but image upload failed.`;
      }
    } else {
      message = created
        ? `POI '${name}' added successfully!`
        : "POI not added - an error occurred";
    }

    console.log("Submitting POI:", { name, description, latitude: lat, longitude: lng, categoryId });
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
    <label class="label" for="poi-image">POI Images</label>
    <div class="control">
      <input
        id="poi-image"
        type="file"
        multiple
        accept="image/*"
        on:change={(e) => {
          const target = e.target as HTMLInputElement;
          if (target?.files?.length) {
            imageFiles = Array.from(target.files);
          }
        }}
      />
    </div>
  </div>

  {#if imageFiles.length}
    <div class="field mt-2">
      <p class="label">Preview</p>
      <div class="columns is-multiline">
        {#each imageFiles as file, index}
          <div class="column is-narrow">
            <figure class="image is-128x128">
              <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} />
            </figure>
          </div>
        {/each}
      </div>
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
