<script lang="ts">
    import "./WizardButton.scss";

    export let onPress: () => void = () => {};
    export let color: "primary"|"none" = "none";
</script>

<div
    class={"wizard-button" + ((color != "none") ? ` ${color}` : '')}
    on:click={onPress}
    on:keydown={(e) => {
        if (document.activeElement !== e.target) return;
        if (e.key !== "Enter") return;
        onPress();
    }}
    role="button"
    tabindex="0"
>
    <slot />
</div>
