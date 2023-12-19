<script lang="ts">
  import type { PageData } from "./$types";
  import { friendlyDate } from "$lib/util/DateFormatter";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";
  import Table from "../../components/basics/Table.svelte";
  import NavBar from "../../components/layout/NavBar.svelte";
  import "./List.scss";
  import ToolBarItem from "../../components/basics/ToolBarItem.svelte";
  import ToolBarSpacer from "../../components/basics/ToolBarSpacer.svelte";
  import ToolBar from "../../components/basics/ToolBar.svelte";
  import WizardButton from "../../components/basics/buttons/WizardButton.svelte";
  import Paginator from "../../components/layout/Paginator.svelte";
  import AuthGuard from "../../components/auth/AuthGuard.svelte";
  import { onMount } from "svelte";
  import { fetchAuthenticated, getToken } from "$lib/api/AuthAPI";
  import type { PagedAPIResponse } from "$lib/api/PagedAPIResponse";
  import type { AISystemModel } from "$lib/types/api/AISystemModel";
  import { APISourceURLs } from "$lib/api/APISource";
  import { parseLogo } from "$lib/util/Lists";
  import Overlay from "../../components/basics/Overlay.svelte";
  import InputField from "../../components/basics/InputField.svelte";
  import Field from "../../components/basics/Field.svelte";
  import Divider from "../../components/basics/Divider.svelte";

  export let data: PagedAPIResponse<AISystemModel>;
  let checkedItems: boolean[] = [];

  // The editing overlay state
  let editingOverlay = false;
  // The systems being editeds
  let editingSystems: { index: number; system: AISystemModel }[] = [];

  // The data for the table
  const headers = [
    "Service Name",
    "Version",
    "Type",
    "Description",
    "Origin",
    "Date Added",
  ];
  let tdata: any[][] = [];

  onMount(async () => {
    tdata = await fetchData();
  });

  // Get the page index from the URL
  function getPageIndex(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    if (!page) {
      return 0;
    }
    return parseInt(page);
  }

  // Fetch the data foronMount( the page
  async function fetchData(): Promise<any[][]> {
    const pageIndex = getPageIndex();
    const token = getToken();
    if (!token) {
      return Promise.reject("No token");
    }
    const response = await fetchAuthenticated(
      `${APISourceURLs.aiSystemAPI}/aisystem/approved?page=${pageIndex}`,
      token
    );
    if (response === undefined || !response.ok) {
      return Promise.reject("Failed to fetch data");
    }
    data = await response.json();
    data.data = data.data.reverse();
    const mapped = data.data.map((x) => [
      { data: x.name, icon: parseLogo(x.integration) },
      { data: x.version },
      { data: x.type },
      { data: x.description },
      { data: x.origin },
      { data: friendlyDate(new Date(x.dateAdded)) },
    ]);
    return mapped;
  }

  /// Remove the AI system from the list
  async function removeAiSystems(systems: AISystemModel[]) {
    const token = getToken();
    if (!token) {
      return Promise.reject("No token");
    }
    await fetchAuthenticated(
      `${APISourceURLs.aiSystemAPI}/aisystem/remove`,
      token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(systems),
      }
    );
    // Remove the systems from the results
    data.data = data.data.filter((x) => !systems.includes(x));
    tdata = data.data.map((x) => [
      { data: x.name, icon: parseLogo(x.integration) },
      { data: x.version },
      { data: x.type },
      { data: x.description },
      { data: x.origin },
      { data: friendlyDate(new Date(x.dateAdded)) },
    ]);
    checkedItems = data.data.map(() => false);
  }

  /// Confirm editing the systems
  async function onConfirmAddSystems(
    systems: {
      index: number;
      system: AISystemModel;
    }[]
  ) {
    editingOverlay = false;
    const token = getToken();
    if (!token) {
      return Promise.reject("No token");
    }
    await fetchAuthenticated(
      `${APISourceURLs.aiSystemAPI}/aisystem/approve`,
      token,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(systems.map((x) => x.system)),
      }
    );
    editingOverlay = false;
    // Update the data
    data.data = data.data.map((x, i) => {
      const system = systems.find((y) => y.index === i);
      if (system) {
        return system.system;
      }
      return x;
    });
    tdata = data.data.map((x) => [
      { data: x.name, icon: parseLogo(x.integration) },
      { data: x.version },
      { data: x.type },
      { data: x.description },
      { data: x.origin },
      { data: friendlyDate(new Date(x.dateAdded)) },
    ]);
    checkedItems = data.data.map(() => false);
  }
</script>

<svelte:head>
  <title>AI List</title>
  <meta name="description" content="Ai List" />
</svelte:head>

<AuthGuard>
  <div class="page list">
    <NavBar />
    <ContentContainer>
      <h3>My Services</h3>
      <p>Here you can view all of your active AI services and their purpose.</p>
      <ToolBar>
        <ToolBarSpacer />
        <ToolBarItem
          icon="edit"
          label="Edit"
          disabled={false}
          onPress={() => {
            let items = [];
            for (let i = 0; i < data.data.length; i++) {
              let item = data.data[i];
              if (checkedItems[i]) items.push({ index: i, system: item });
            }
            editingSystems = items;
            editingOverlay = true;
          }}
        />
        <ToolBarItem
          icon="delete"
          label="Remove"
          disabled={false}
          onPress={() => {
            const items = data.data.filter((x, i) => checkedItems[i]);
            removeAiSystems(items);
          }}
        />
      </ToolBar>
      <Table bind:checkedItems addCheckBoxes={true} {headers} data={tdata} />
      <Paginator
        currentPage={data.currentPage}
        pageCount={data.totalPages}
        onChange={(page) => void (window.location.href = `/list?page=${page}`)}
      />
      <div class="button-group">
        <WizardButton color="primary">Register Service</WizardButton>
      </div>
    </ContentContainer>

    <!-- Editing overlay -->
    <Overlay
      name="Edit Systems"
      behavior="hide-on-outside-click"
      bind:shown={editingOverlay}
    >
      <div class="inputfield-container">
        {#each editingSystems as { index, system }}
          <InputField label="Name"
            ><Field name="Name" type="text" bind:value={system.name}
            ></Field></InputField
          >
          <InputField label="Version"
            ><Field name="Version" type="text" bind:value={system.version}
            ></Field></InputField
          >
          <InputField label="Type"
            ><Field name="Type" type="text" bind:value={system.type}
            ></Field></InputField
          >
          <InputField label="Description"
            ><Field
              name="Description"
              type="textarea"
              bind:value={system.description}
            ></Field></InputField
          >
          <Divider />
        {/each}
      </div>
      <div style="margin-top: 1rem; margin-bottom: 0;">
        <div style="float:left">
          <WizardButton
            color="primary"
            onPress={() => onConfirmAddSystems(editingSystems)}
            >Edit</WizardButton
          >
          <WizardButton color="none" onPress={() => (editingOverlay = false)}
            >Cancel</WizardButton
          >
        </div>
      </div>
    </Overlay>
  </div>
</AuthGuard>
