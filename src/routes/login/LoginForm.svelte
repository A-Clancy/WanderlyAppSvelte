<script lang="ts">
  import { goto } from "$app/navigation";
  import { poiService } from "$lib/services/poi-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import { loggedInUser } from "$lib/runes.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    console.log(`Attempting to log in email: ${email}`);
    let session = await poiService.login(email, password);
    if (session) {
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;

      console.log("Updated loggedInUser:", {
        email: loggedInUser.email,
        name: loggedInUser.name,
        token: loggedInUser.token,
        _id: loggedInUser._id
      });

      goto("/map");
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
  <!-- svelte-ignore event_directive_deprecated -->
  <button on:click={login} class="button">Log In</button>
</div>
