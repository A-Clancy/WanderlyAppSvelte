<script lang="ts">
  import { currentPOIs } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";

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
        <li class="mb-4">
          <strong>{poi.name}</strong>
          {#if poi.description} — {poi.description}{/if}
          {#if poi.imageUrls?.length}
            <div class="mt-2">
              <div class="columns is-multiline">
                {#each poi.imageUrls! as url, index}
                  <div class="column is-narrow has-text-centered">
                    <figure class="image is-128x128 mb-1">
                      <img src={url} alt={`Image ${index + 1} of ${poi.name}`} />
                    </figure>
                    <button
                      class="button is-small is-warning"
                      on:click={async () => {
                        const confirmed = confirm("Delete this image?");
                        if (confirmed) {
                          const success = await poiService.deleteImage(poi._id, index);
                          if (success) {
                            poi.imageUrls.splice(index, 1); // update UI 
                          }
                        }
                      }}>
                      Delete
                    </button>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          <button class="button is-small is-danger mt-1" on:click={() => deletePOI(poi._id)}>
            Delete
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}
