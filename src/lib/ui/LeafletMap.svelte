<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";
  import type { POI, Category } from "$lib/types/placemark-types";
  import type { Control, Map as LeafletMap } from "leaflet";

  let { height = 80, pois = [], categories = [] } = $props(); // accepts props

  let id = "wanderly-map-id";
  let location = { lat: 53.2734, lng: -7.7783203 };
  let zoom = 8;
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

  // --- This function was previously adding markers directly to the map.
  // --- It caused markers to persist when their category was toggled off.
  // --- Leaving here in case I need it in the future. 

  /*
  export async function addMarker(lat: number, lng: number, popupText: string) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    const marker = L.marker([lat, lng]).addTo(imap); // Problmem line - adds outside LayerGroup
    const popup = L.popup({ autoClose: false, closeOnClick: false });
    popup.setContent(popupText);
    marker.bindPopup(popup);
  }
  */

  export async function moveTo(lat: number, lng: number) {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    imap.flyTo({ lat: lat, lng: lng });
  }
</script>

<div {id} class="box" style="height: {height}vh"></div>
