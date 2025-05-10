<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<nav class="navbar is-light mb-4" role="navigation" aria-label="main navigation">
  <div class="navbar-menu is-active">
    <div class="navbar-start">
      <a class="navbar-item" href="/">Home</a>
      <a class="navbar-item" href="/categories">Categories</a>
      <a class="navbar-item" href="/pois">POIs</a>
    </div>
    <div class="navbar-end">
      {#if loggedInUser.email}
        <div class="navbar-item">Logged in as {loggedInUser.name}</div>
      {/if}
    </div>
  </div>
</nav>
