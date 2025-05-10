<script lang="ts">
  import { currentPOIs } from "$lib/runes.svelte";
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    {#each currentPOIs.places as poi}
      <tr>
        <td>{poi.name}</td>
        <td>{poi.description}</td>
        <td>{poi.lat}</td>
        <td>{poi.lng}</td>
      </tr>
    {/each}
  </tbody>
</table>
