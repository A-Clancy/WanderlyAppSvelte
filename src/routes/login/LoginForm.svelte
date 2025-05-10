<script lang="ts">
  import { goto } from "$app/navigation";
  import { poiService } from "$lib/services/poi-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    console.log(`Attempting to log in email: ${email}`);
    let session = await poiService.login(email, password);
    if (session) {
      goto("/add-poi");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <UserCredentials bind:email bind:password />
  <button on:click={login} class="button">Log In</button>
</div>
