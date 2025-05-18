<script lang="ts">
  import { loggedInUser } from "$lib/runes.svelte";
  import { goto } from "$app/navigation";

function logout() {
  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
  localStorage.removeItem("wanderly");
  goto("/login");
}

console.log("Navbar sees loggedInUser:", loggedInUser);

</script>

<!-- svelte-ignore a11y_no_redundant_roles -->
<nav class="navbar is-light mb-4" role="navigation" aria-label="main navigation">
  <div class="navbar-menu is-active">
    <div class="navbar-start">
      <a class="navbar-item" href="/">Home</a>
      <a class="navbar-item" href="/categories">Categories</a>
      <a class="navbar-item" href="/pois">POIs</a>
      <a class="navbar-item" href="/map">Map</a>
    </div>
    <div class="navbar-end">
      {#if loggedInUser.email}
        <div class="navbar-item">
          Logged in as {loggedInUser.name}
        </div>
        <div class="navbar-item">
          <button class="button is-small is-light" on:click={logout}>
            Logout
          </button>
        </div>
      {/if}
    </div>
  </div>
</nav>
