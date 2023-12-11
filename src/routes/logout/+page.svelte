<script lang="ts">
  import { onMount } from "svelte";
  import { logoutAccount } from "$lib/api/AuthAPI";

  onMount(() => {
    logoutAccount();
    window.location.href = "/login";
  });
</script>
