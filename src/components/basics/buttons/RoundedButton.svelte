<script lang="ts">
    import "./RoundedButton.scss";
    type ButtonFill = "filled" | "outlined";

    export let fill: ButtonFill = "filled";
    export let href: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={"rounded-button " + fill}
    on:click={() => (window.location.href = href)}
>
    <slot />
</div>
