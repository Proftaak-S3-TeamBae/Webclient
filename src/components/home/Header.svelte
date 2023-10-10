<script lang="ts">
    import RoundedButton from "../basics/buttons/RoundedButton.svelte";
    import "./Header.scss";
</script>

<div class="header">
    <div class="header-contents">
        <div class="header-title">AI Scanner</div>
        <RoundedButton fill="outlined" href="/login">Login</RoundedButton>
        <RoundedButton fill="filled" href="/register">Sign up</RoundedButton>
    </div>
</div>
