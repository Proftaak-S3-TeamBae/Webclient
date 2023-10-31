<!-- A box with the input label on the left and an input field on the right -->
<script lang="ts">
    import "./InputField.scss";

    export let label: string;
</script>

<div class="input-field">
    <div class="input-label">{label}</div>
    <div class="input-content"><slot /></div>
</div>
