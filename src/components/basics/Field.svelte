<script lang="ts">
    import "./Field.scss";

    export let label: string;
    export let type: string;
    export let name: string;
</script>

<div class="field">
    <div class="label">{label}</div>
    <input {type} {name} />
</div>
