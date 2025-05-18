<script lang="ts">
  import { onMount } from "svelte";
  import { subTitle, currentPOIs, currentCategories } from "$lib/runes.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import type { POI } from "$lib/types/placemark-types";

  subTitle.text = "beyond the map";

  let userLocation = { lat: 0, lng: 0 };
  let locationReady = false;
  let nearbyPOIs: POI[] = [];

  function getDistanceKm(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  onMount(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.lat = position.coords.latitude;
      userLocation.lng = position.coords.longitude;

      nearbyPOIs = currentPOIs.places.filter((poi) =>
        getDistanceKm(userLocation.lat, userLocation.lng, poi.latitude, poi.longitude) < 50
      );

      locationReady = true;
      console.log("User location:", userLocation);
      console.log("Nearby POIs:", nearbyPOIs.length);
    });
  });
</script>

{#if currentPOIs.places.length > 0 && currentCategories.categories.length > 0}
  <h2 class="title is-5">All POIs by Category</h2>
  <LeafletMap
    height={60}
    pois={currentPOIs.places}
    categories={currentCategories.categories}
  />

  {#if locationReady}
    <h2 class="title is-5 mt-6">Nearby POIs (within 50km of your location)</h2>
    <LeafletMap
      height={50}
      pois={nearbyPOIs}
      categories={currentCategories.categories}
      location={userLocation}
      zoom={11}
    />
  {:else}
    <p class="mt-4">Loading your location and nearby POIs…</p>
  {/if}
{:else}
  <p class="mt-4">Loading POIs and categories…</p>
{/if}
