<script lang="ts">
  import { onMount } from "svelte";
  import Header from "../../components/home/Header.svelte";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";

  let error: Error | undefined = undefined;

  onMount(() => {
    // Get error from url
    const urlParams = new URLSearchParams(window.location.search);
    const msgStr = urlParams.get("msg");
    if (msgStr === null) {
      return undefined;
    }
    const msg = window.atob(msgStr);
    error = JSON.parse(msg);
  });
</script>

<Header />

<ContentContainer>
  <p>
    {#if error !== undefined}
      {error.message}
    {:else}
      Error
    {/if}
  </p>
</ContentContainer>
