<script lang="ts">
  import "./UserBox.scss";
  import pfp from "$lib/images/logo.webp";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { getUsername, logoutAccount } from "$lib/api/AuthAPI";
  import RoundedButton from "../basics/buttons/RoundedButton.svelte";

  let username: Promise<string>;
  let avatarURL: string;

  onMount(async () => {
    username = getUsername();
  });
</script>

{#await username then username}
  <div class="user-box-large">
    <div class="profile-pic" style={`background-image: url(${pfp})`}></div>
    <div class="text">
      <div class="name">{username}</div>
      <div class="type">Administrator Account</div>
      <RoundedButton style="light" fill="filled" href="/logout"
        >Logout</RoundedButton
      >
    </div>
  </div>
{/await}
