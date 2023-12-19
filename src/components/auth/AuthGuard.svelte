<!-- Basic authguard. Redirects to login of not logged in -->

<script lang="ts">
  import { isLoggedIn } from "$lib/api/AuthAPI";
  import { onMount } from "svelte";

  var loggedIn = false;

  onMount(async () => {
    try {
      if (await isLoggedIn()) {
        loggedIn = true;
        return;
      }
      window.location.href = "/login";
    } catch (e) {
      // Go to error page and encode message in base32
      window.location.href = "/error?msg=" + window.btoa(JSON.stringify(e));
    }
  });
</script>

{#if loggedIn}
  <slot />
{/if}
