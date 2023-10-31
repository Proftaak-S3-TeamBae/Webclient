<script lang="ts">
    import "./UserBox.scss";
    import pfp from "$lib/images/logo.webp";

    export let username: string;
    export let avatarURL: string;
</script>

<div class="user-box-large">
    <div class="profile-pic" style={`background-image: url(${pfp})`}></div>
    <div class="text">
        <div class="name">{username}</div>
        <div class="type">Administrator Account</div>
    </div>
</div>
