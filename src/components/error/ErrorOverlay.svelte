<script lang="ts">
  import Overlay from "../basics/Overlay.svelte";
  import WizardButton from "../basics/buttons/WizardButton.svelte";
  export let shown = false;
</script>

<Overlay name="Something went wrong" behavior="persist" bind:shown>
  <p style="color: red">
    Something went wrong. Please contact your systems administrator.
  </p>
  <div style="float: left; margin-top: 1rem; margin-bottom: 0;">
    <WizardButton color="primary" onPress={() => (shown = false)}
      >Dismiss</WizardButton
    >
  </div>
</Overlay>
