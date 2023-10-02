<script lang="ts">
    import "./Field.scss";

    export let label: string;
    export let type: string;
    export let name: string;
    export let value: string = "";
    export let oninput: (event: Event) => void = () => void 0;

    /// On change of input
    const oninputchange = (event: Event) => {
        value = (event.target as HTMLInputElement).value;
        oninput(event);
    };
</script>

<div class="field">
    <div class="label">{label}</div>
    <input {type} {name} on:input={oninputchange} />
</div>
