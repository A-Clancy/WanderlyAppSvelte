<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { poiService } from "$lib/services/poi-service";
  import Heading from "$lib/ui/Heading.svelte";
  import NavBar from "$lib/ui/NavBar.svelte";
  import { onMount } from "svelte";

  let isReady = false;

  onMount(async () => {
    await poiService.restoreSession();
    isReady = true;
  });
</script>

{#if isReady}
  <NavBar />
  <div class="container">
    {#if loggedInUser.email}
      <Heading />
    {/if}
    <slot />
  </div>
{/if}
