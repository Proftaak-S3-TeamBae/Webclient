<script lang="ts">
  import Field from "../basics/Field.svelte";
  import InputField from "../basics/InputField.svelte";

  export let data: any;
  const onInputChange = (e: any) => {
    data = { ...data };
    data["openAiKey"] = e.target.value;
  };
</script>

<InputField label="API Key"
  ><Field type="text" name="apikey" oninput={onInputChange} /></InputField
>
