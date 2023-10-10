<script lang="ts">
    import "./NavBar.scss";
    import pfp from "$lib/images/logo.webp";
</script>

<div class="nav-bar">
    <div class="title">AI Scanner</div>
    <div class="links">
        <a href="/list">My Services</a>
        <a href="/integrations">Integrations</a>
        <a href="/settings">Settings</a>
    </div>
    <div class="user-box">
        <div class="avatar" style={`background-image: url(${pfp});`} />
        <div class="name">Max Meevis</div>
    </div>
</div>
