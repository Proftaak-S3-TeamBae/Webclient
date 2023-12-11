<script lang="ts">
  import "./Integrations.scss";
  import { friendlyDate } from "$lib/util/DateFormatter";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";
  import NavBar from "../../components/layout/NavBar.svelte";
  import Table from "../../components/basics/Table.svelte";
  import openaiIcon from "$lib/images/integrations/openai.svg";
  import googleIcon from "$lib/images/integrations/google.svg";
  import awsIcon from "$lib/images/integrations/aws.svg";
  import Overlay from "../../components/basics/Overlay.svelte";
  import DropDown from "../../components/basics/DropDown.svelte";
  import type { DropDownItem } from "../../components/basics/DropDown";
  import InputField from "../../components/basics/InputField.svelte";
  import WizardButton from "../../components/basics/buttons/WizardButton.svelte";
  import OpenAiConf from "../../components/integrations/OpenAIConf.svelte";
  import ToolBarItem from "../../components/basics/ToolBarItem.svelte";
  import ToolBarSpacer from "../../components/basics/ToolBarSpacer.svelte";
  import ToolBar from "../../components/basics/ToolBar.svelte";
  import AuthGuard from "../../components/auth/AuthGuard.svelte";

  let overlay = false;
  let typeChoice: DropDownItem;

  // The data for the table
  // TODO: Replace with real data from the backend
  const headers = ["Integration", "Status", "Date Added"];
  const data = [
    // [
    //     { data: "OpenAI", icon: openaiIcon },
    //     { data: "Linked" },
    //     { data: friendlyDate(new Date()) },
    // ],
    // [
    //     { data: "Google", icon: googleIcon },
    //     { data: "Linked" },
    //     { data: friendlyDate(new Date()) },
    // ],
    // [
    //     { data: "AWS", icon: awsIcon },
    //     { data: "Linked" },
    //     { data: friendlyDate(new Date()) },
    // ],
  ];
</script>

<svelte:head>
  <title>Integrations</title>
  <meta name="description" content="Integrations" />
</svelte:head>

<AuthGuard>
  <div class="page integ">
    <NavBar />

    <ContentContainer>
      <h3>My Integrations</h3>
      <p>
        Here you can manage external connections for use as scanning sources.
      </p>
      <ToolBar>
        <ToolBarSpacer />
        <ToolBarItem icon="edit" label="Edit" disabled={true} />
        <ToolBarItem icon="delete" label="Remove" disabled={true} />
      </ToolBar>
      <Table addCheckBoxes={true} {headers} {data} />
      <div class="integ-buttons">
        <WizardButton color="primary" onPress={() => (overlay = true)}
          >Add Integration</WizardButton
        >
      </div>
    </ContentContainer>
  </div>

  <Overlay name="Add Integration" behavior="persist" bind:shown={overlay}>
    <InputField label="Type">
      <DropDown
        items={[
          { icon: openaiIcon, label: "OpenAI" },
          { icon: googleIcon, label: "Google" },
          { icon: awsIcon, label: "AWS" },
        ]}
        bind:selectedItem={typeChoice}
      /></InputField
    >
    <hr />
    {#if typeChoice !== undefined && typeChoice.label === "OpenAI"}
      <OpenAiConf />
    {/if}
    <hr />
    <div style="float: right; margin-top: 1rem; margin-bottom: 0;">
      <WizardButton color="primary" onPress={() => (overlay = false)}
        >Confirm</WizardButton
      >
    </div>
  </Overlay>
</AuthGuard>
