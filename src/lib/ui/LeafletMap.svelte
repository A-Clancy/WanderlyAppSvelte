<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { POI, Category } from "$lib/types/placemark-types";
  import type { Control, Map as LeafletMap } from "leaflet";

  // Props with defaults
  let {
    height = 80,
    pois = [],
    categories = [],
    zoom = 8,
    location = { lat: 53.2734, lng: -7.7783203 }
  } = $props();

  let id = `wanderly-map-id-${Math.random().toString(36).substring(2, 9)}`;
  let minZoom = 7;
  let activeLayer = "Terrain";

  let imap: LeafletMap;
  let control: Control.Layers;
  let overlays: Control.LayersObject = {};
  let baseLayers: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;

    baseLayers = {
      Terrain: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
      Satellite: L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "Tiles &copy; Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, and others"
        }
      )
    };

    const defaultLayer = baseLayers[activeLayer];
    imap = L.map(id, {
      center: [location.lat, location.lng],
      zoom,
      minZoom,
      layers: [defaultLayer]
    });

    // Create category layers
    for (const category of categories) {
      const group = L.layerGroup();
      const poisInCategory = pois.filter((p) => p.categoryId === category._id);

      for (const poi of poisInCategory) {
        if (poi.latitude && poi.longitude) {
          const popup = `<strong>${poi.name}</strong><br>${poi.description || ""}`;
          L.marker([poi.latitude, poi.longitude]).bindPopup(popup).addTo(group);
        }
      }

      overlays[category.name] = group;
      group.addTo(imap);
    }

    control = L.control.layers(baseLayers, overlays, { position: "bottomleft" }).addTo(imap);
  });

  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat, lng });
  }
</script>

<div {id} class="box" style="height: {height}vh"></div>
