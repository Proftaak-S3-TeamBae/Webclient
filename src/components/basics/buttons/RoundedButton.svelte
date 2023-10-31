<script lang="ts">
    import "./RoundedButton.scss";
    type ButtonFill = "filled" | "outlined";
    type Style = "dark" | "light";

    export let fill: ButtonFill = "filled";
    export let href: string;
    export let style: Style = "dark";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={"rounded-button " + fill + " " + style}
    on:click={() => (window.location.href = href)}
>
    <slot />
</div>
