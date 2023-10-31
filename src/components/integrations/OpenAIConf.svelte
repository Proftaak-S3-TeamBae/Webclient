<script lang="ts">
    import Field from "../basics/Field.svelte";
    import InputField from "../basics/InputField.svelte";

    let apikey: string = "";
</script>

<InputField label="API Key"
    ><Field type="text" name="apikey" bind:value={apikey} /></InputField
>
