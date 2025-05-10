<script lang="ts">
  import { onMount } from "svelte";
  import { poiService } from "$lib/services/poi-service";
  import { currentPOIs } from "$lib/runes.svelte";

  let mapContainer: HTMLDivElement;

  onMount(async () => {
    await poiService.getAllPOIs();

    // Dynamically import Leaflet only in the browser
    const L = await import("leaflet");

    const map = L.map(mapContainer).setView([52.16, -7.15], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    for (const poi of currentPOIs.places) {
      L.marker([poi.lat, poi.lng])
        .addTo(map)
        .bindPopup(`<strong>${poi.name}</strong><br>${poi.description || ""}`);
    }
  });
</script>

<section class="section">
  <div class="container">
    <h1 class="title">Map of POIs</h1>
    <div bind:this={mapContainer} style="height: 500px;"></div>
  </div>
</section>
