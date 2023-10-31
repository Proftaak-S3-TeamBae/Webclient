<script lang="ts">
    import "./CheckBox.scss";

    export let checked: boolean = false;
    export let invertedStyle: boolean = false;
    export let onChange: (checked: boolean) => void = () => {};

    /** Updates checkbox state */
    const updateState = ()=>{
        checked = !checked;
        onChange(checked);
    }
</script>

<div class={"ui-checkbox" + (invertedStyle ? ' inverted' : '') + (checked ? ' checked' : '')}
    on:click={updateState} role="checkbox"></div>