<script lang="ts">
  import { onMount } from "svelte";
  import { subTitle } from "$lib/runes.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { poiService } from "$lib/services/poi-service";
  import type { POI } from "$lib/types/placemark-types";

  subTitle.text = "Explore Wanderly POIs";

  let map: LeafletMap;

  onMount(async () => {
    const pois: POI[] = await poiService.getAllPOIs();

    console.log("POIs received for map:", pois);

    pois.forEach((poi) => {
      // Use correct field names: latitude and longitude
      if (poi.latitude && poi.longitude) {
        const popup = `<strong>${poi.name}</strong><br>${poi.description || ""}`;
        map.addMarker(poi.latitude, poi.longitude, popup);
      }
    });

    const lastPoi = pois[pois.length - 1];
    if (lastPoi && lastPoi.latitude && lastPoi.longitude) {
      map.moveTo(lastPoi.latitude, lastPoi.longitude);
    }
  });
</script>

<Card title="Map of POIs">
  <LeafletMap height={60} bind:this={map} />
</Card>
