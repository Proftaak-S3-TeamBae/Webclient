<script lang="ts">
    import type { MouseEventHandler } from "svelte/elements";
    import "./FormButton.scss";

    export let label: string;
    export let filled: boolean;
    export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button class={"form-button" + (filled ? " filled" : "")} on:click={onClick}
    >{label}</button
>
