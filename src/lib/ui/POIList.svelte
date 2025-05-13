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
              <figure class="image is-128x128">
                <img src={poi.imageUrls[0]} alt={`Image of ${poi.name}`} />
              </figure>
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
