<script lang="ts">
  import "./Integrations.scss";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";
  import NavBar from "../../components/layout/NavBar.svelte";
  import Table from "../../components/basics/Table.svelte";
  import type { DropDownItem } from "../../components/basics/DropDown";
  import WizardButton from "../../components/basics/buttons/WizardButton.svelte";
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
</AuthGuard>
