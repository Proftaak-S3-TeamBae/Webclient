<!-- Basic authguard. Redirects to login of not logged in -->

<script lang="ts">
  import { isLoggedIn } from "$lib/api/AuthAPI";
  import { onMount } from "svelte";

  var loggedIn = false;

  onMount(async () => {
    if (await isLoggedIn()) {
      loggedIn = true;
      return;
    }
    window.location.href = "/login";
  });
</script>

{#if loggedIn}
  <slot />
{/if}
