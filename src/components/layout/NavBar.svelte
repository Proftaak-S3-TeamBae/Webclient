<script lang="ts">
  import "./NavBar.scss";
  import pfp from "$lib/images/logo.webp";
  import { onMount } from "svelte";
  import { getUsername } from "$lib/api/AuthAPI";

  let username: Promise<string>;

  onMount(async () => {
    username = getUsername();
  });
</script>

<div class="nav-bar">
  <div class="title">AI Scanner</div>
  <div class="links">
    <a href="/scanner">Scanner</a>
    <a href="/list">My Services</a>
    <a href="/integrations">Integrations</a>
    <a href="/settings">Settings</a>
  </div>
  {#await username then username}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="user-box" on:click={() => (window.location.href = "/user")}>
      <div class="avatar" style={`background-image: url(${pfp});`} />
      <div class="name">{username}</div>
    </div>
  {/await}
</div>
