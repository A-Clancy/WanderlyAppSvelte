<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/explore">
        <span class="icon"> <i class="fas fa-map-marked-alt"></i></span>
        <span><strong>Wanderly</strong></span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/add-poi"> Add POI </a>
        <a class="navbar-item" href="/explore"> Explore </a>
        <a class="navbar-item" href="/logout"> Logout [{loggedInUser.name}]</a>
      </div>
    </div>
  </div>
</nav>
