<script lang="ts">
    import "./Field.scss";

    export let label: string | undefined = undefined;
    export let type: string;
    export let name: string;
    export let value: string = "";
    export let oninput: (event: Event) => void | undefined = () => void 0;

    /// On change of input
    const oninputchange = (event: Event) => {
        value = (event.target as HTMLInputElement).value;
        if (oninput === undefined) return;
        oninput(event);
    };
</script>

<div class="field">
    {#if label !== undefined}
        <div class="label">{label}</div>
    {/if}
    <input {type} {name} on:input={oninputchange} />
</div>
