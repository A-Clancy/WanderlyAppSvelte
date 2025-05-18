<script lang="ts">
  import { currentPOIs } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import ImageCarousel from "$lib/ui/ImageCarousel.svelte";

  async function deletePOI(id: string) {
    const success = await poiService.deletePOI(id);
    if (success) {
      currentPOIs.places = currentPOIs.places.filter(p => p._id !== id);
    }
  }
</script>

{#if currentPOIs.places.length === 0}
  <p>No POIs found.</p>
{:else}
  <div class="box">
    <h2 class="title is-5">All My POIs</h2>
    <ul>
      {#each currentPOIs.places as poi}
        <li class="mb-6">
          <strong>{poi.name}</strong>
          {#if poi.description} — {poi.description}{/if}

          {#if poi.imageUrls?.length}
            <ImageCarousel images={poi.imageUrls} />

            <div class="buttons mt-2">
              {#each poi.imageUrls as _, index}
                <button
                  class="button is-small is-warning mr-2"
                  on:click={async () => {
                    const confirmed = confirm("Delete this image?");
                    if (confirmed) {
                      const success = await poiService.deleteImage(poi._id, index);
                      if (success) {
                        poi.imageUrls.splice(index, 1);
                      }
                    }
                  }}>
                  Delete Image {index + 1}
                </button>
              {/each}
            </div>
          {/if}

          <button class="button is-small is-danger mt-2" on:click={() => deletePOI(poi._id)}>
            Delete POI
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}
