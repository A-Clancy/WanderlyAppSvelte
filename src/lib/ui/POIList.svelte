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
    <h2 class="title is-5">All POIs</h2>
    <ul>
      {#each currentPOIs.places as poi}
        <li class="mb-2">
          <strong>{poi.name}</strong>
          {#if poi.description} — {poi.description}{/if}
          <button class="button is-small is-danger ml-2" on:click={() => deletePOI(poi._id)}>
            Delete
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}
