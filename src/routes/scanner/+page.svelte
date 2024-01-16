<script lang="ts">
  import { parseLogo } from "$lib/util/Lists";
  import AuthGuard from "../../components/auth/AuthGuard.svelte";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";
  import Table from "../../components/basics/Table.svelte";
  import WizardButton from "../../components/basics/buttons/WizardButton.svelte";
  import NavBar from "../../components/layout/NavBar.svelte";
  import type { DropDownItem } from "../../components/basics/DropDown";
  import Overlay from "../../components/basics/Overlay.svelte";
  import InputField from "../../components/basics/InputField.svelte";
  import DropDown from "../../components/basics/DropDown.svelte";
  import OpenAiConf from "../../components/integrations/OpenAIConf.svelte";
  import openaiIcon from "$lib/images/integrations/openai.svg";
  import googleIcon from "$lib/images/integrations/google.svg";
  import awsIcon from "$lib/images/integrations/aws.svg";
  import Divider from "../../components/basics/Divider.svelte";
  import type { AISystemModel } from "$lib/types/api/AISystemModel";
  import { fetchAuthenticated, getToken } from "$lib/api/AuthAPI";
  import { APISourceURLs } from "$lib/api/APISource";
  import type { PagedAPIResponse } from "$lib/api/PagedAPIResponse";
  import Paginator from "../../components/layout/Paginator.svelte";
  import Field from "../../components/basics/Field.svelte";
  import ErrorOverlay from "../../components/error/ErrorOverlay.svelte";
  import SelectMenu from "../../components/basics/SelectMenu.svelte";

  /// The data for an integration
  interface Integration {
    // The name of the integration
    type: "OpenAi" | "Google" | "AWS";
    // The data stored for the integration
    data: any;
  }

  // The table config
  const resultsHeaders = ["Service", "Version", "Type", "Origin"];
  const integrationHeaders = ["Integration", "identifier"];
  // The table data for the results
  let resultsData: any[] = [];
  // The table data for the integrations
  let integrationData: any[][] = [];

  // For adding an integration
  let integrationOverlay = false;
  let integrationTypeChoice: DropDownItem;

  // For adding a system
  let systemOverlay = false;

  // The registered integrations
  let integrations: Integration[] = [];
  // The data for the current input
  let input: any;

  // The data for the input system
  let systemIndex: number = 0;
  let systemInput: AISystemModel = {
    name: "",
    version: "",
    type: "",
    description: "",
    origin: "",
    integration: "",
    dateAdded: "",
  };

  let errorOverlay = false;
  let confirmationOverlay = false;
  let discardConfirmationOverlay = false;

  // The scan results
  let results: PagedAPIResponse<AISystemModel> = {
    data: [],
    currentPage: 0,
    totalPages: 0,
  };

  // The page index
  let pageIndex = 0;

  /// Censor the API key
  function censorApiKey(key: string): string {
    return `${key.substring(0, 3)}...${key.substring(key.length - 4)}`;
  }

  /// Add the integration based on the current input
  function onConfirmAddIntegration(integrationType: string) {
    integrationOverlay = false;
    if (integrationType === "OpenAI") {
      integrations.push({
        type: "OpenAi",
        data: input["openAiKey"],
      });
    }
    integrationData = getIntegrationData();
  }

  /// Get the integration data as table data
  function getIntegrationData(): any[][] {
    return integrations.map((x) => [
      { data: x.type, icon: parseLogo(x.type) },
      { data: censorApiKey(x.data) },
    ]);
  }

  /// Add the system based on the current input
  async function onConfirmAddSystem(
    system: AISystemModel,
    systemIndex: number
  ) {
    systemOverlay = false;

    const token = getToken();
    if (!token) {
      return Promise.reject("No token");
    }

    try {
      const response = await fetchAuthenticated(
        `${APISourceURLs.aiSystemAPI}/aisystem/approve`,
        token,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify([system]),
        }
      );
      if (response !== undefined && !response.ok) {
        errorOverlay = true;
        console.log("error");
        return;
      }
      // Remove the system from the results
      results.data.splice(systemIndex, 1);
      resultsData = results.data.map((d) => [
        { data: d.name, icon: parseLogo(d.integration) },
        { data: d.version },
        { data: d.type },
        { data: d.origin },
      ]);
      confirmationOverlay = true;
    } catch (e) {
      errorOverlay = true;
    }
  }

  /// Discard the system based on the current input
  async function onDiscardSystem(system: AISystemModel, systemIndex: number) {
    systemOverlay = false;

    const token = getToken();
    if (!token) {
      return Promise.reject("No token");
    }

    try {
      const response = await fetchAuthenticated(
        `${APISourceURLs.aiSystemAPI}/aisystem/disapprove`,
        token,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify([system]),
        }
      );
      if (response !== undefined && !response.ok) {
        errorOverlay = true;
        return Promise.reject("Failed to fetch data");
      }

      // Remove the system from the results
      results.data.splice(systemIndex, 1);
      resultsData = results.data.map((d) => [
        { data: d.name, icon: parseLogo(d.integration) },
        { data: d.version },
        { data: d.type },
        { data: d.origin },
      ]);
      discardConfirmationOverlay = false;
    } catch (e) {
      errorOverlay = true;
    }
  }

  /// Scan the services for AI systems
  async function scanSystems(): Promise<PagedAPIResponse<AISystemModel>> {
    const token = getToken();
    if (!token) {
      return Promise.reject("No token");
    }
    const openAIKeys = integrations
      .filter((x) => x.type === "OpenAi")
      .map((x) => x.data);
    try {
      const response = await fetchAuthenticated(
        `${APISourceURLs.aiSystemAPI}/aisystem/scan`,
        token,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            OpenAiTokens: openAIKeys,
            page: pageIndex,
            max: 10,
          }),
        }
      );
      if (response === undefined || !response.ok) {
        errorOverlay = true;
        return Promise.reject("Failed to fetch data");
      }
      const data = await response.json();
      results = data;
      resultsData = data.data.map((d: any) => [
        { data: d.name, icon: parseLogo(d.integration) },
        { data: d.version },
        { data: d.type },
        { data: d.origin },
      ]);
      return data;
    } catch {
      errorOverlay = true;
      return Promise.reject("Failed to fetch data");
    }
  }
</script>

<svelte:head>
  <title>Scanner</title>
  <meta name="description" content="Scanner" />
</svelte:head>

<AuthGuard>
  <NavBar />
  <ContentContainer>
    <h3>Scanner</h3>
    <p>
      Here you can scan your services for AI systems and register the results to <a
        href="/list">My Services</a
      > list
    </p>
    <hr />

    <b>Integrations</b>
    <p>Here you can manage external connections for use as scanning sources.</p>

    <Table headers={integrationHeaders} data={integrationData}></Table>

    <div class="button-group">
      <WizardButton
        color="primary"
        onPress={() => {
          scanSystems();
        }}>Scan</WizardButton
      >
      <WizardButton color="none" onPress={() => (integrationOverlay = true)}
        >Add Integration</WizardButton
      >
      <hr />
      <b>Results</b>
      <p>The results of the scan</p>
      <Table
        itemsAreClickable={true}
        headers={resultsHeaders}
        data={resultsData}
        onItemClicked={(index) => {
          let data = results.data[index];
          systemInput = data;
          systemIndex = index;
          systemOverlay = true;
        }}
      ></Table>
      <Paginator
        currentPage={results.currentPage}
        pageCount={results.totalPages}
        onChange={(page) => {
          pageIndex = page;
          scanSystems();
        }}
      />
    </div>
  </ContentContainer>

  <!-- The overlay for adding an integration to the scanner -->
  <Overlay
    name="Add Integration"
    behavior="persist"
    bind:shown={integrationOverlay}
  >
    <InputField label="Type">
      <DropDown
        items={[
          { icon: openaiIcon, label: "OpenAI" },
          { icon: googleIcon, label: "Google" },
          { icon: awsIcon, label: "AWS" },
        ]}
        bind:selectedItem={integrationTypeChoice}
      /></InputField
    >
    <hr />
    {#if integrationTypeChoice !== undefined && integrationTypeChoice.label === "OpenAI"}
      <OpenAiConf bind:data={input} />
    {:else}
      <p>Not implemented</p>
    {/if}
    <hr />
    <div style="float: right; margin-top: 1rem; margin-bottom: 0;">
      <WizardButton
        color="primary"
        onPress={() => onConfirmAddIntegration(integrationTypeChoice.label)}
        >Confirm</WizardButton
      >
    </div>
  </Overlay>

  <!-- The overlay for adding a system to the list -->
  <Overlay
    name="Add System"
    behavior="hide-on-outside-click"
    bind:shown={systemOverlay}
  >
    <InputField label="Name"
      ><Field name="Name" type="text" bind:value={systemInput.name}
      ></Field></InputField
    >
    <InputField label="Version"
      ><Field name="Version" type="text" bind:value={systemInput.version}
      ></Field></InputField
    >
    <InputField label="Type"
      ><Field name="Type" type="text" bind:value={systemInput.type}
      ></Field></InputField
    >
    <InputField label="Description"
      ><Field
        name="Description"
        type="text"
        bind:value={systemInput.description}
      ></Field></InputField
    >
    <div style="margin-top: 1rem; margin-bottom: 0;">
      <div style="float:left">
        <WizardButton
          color="primary"
          onPress={() => onConfirmAddSystem(systemInput, systemIndex)}
          >Add</WizardButton
        >
        <WizardButton color="none" onPress={() => (systemOverlay = false)}
          >Cancel</WizardButton
        >
      </div>
      <div style="float:right">
        <WizardButton
          color="dangerous"
          onPress={() => {
            systemOverlay = false;
            discardConfirmationOverlay = true;
          }}>Discard</WizardButton
        >
      </div>
    </div>
  </Overlay>

  <!-- The overlay for indicating the success of added a system to the list -->
  <Overlay
    name="Success"
    behavior="hide-on-outside-click"
    bind:shown={confirmationOverlay}
  >
    <p>System successfully added</p>
    <div style="margin-top: 1rem; margin-bottom: 0;">
      <div style="float:left">
        <WizardButton color="none" onPress={() => (confirmationOverlay = false)}
          >Close</WizardButton
        >
      </div>
    </div>
  </Overlay>

  <!-- The overlay for confirmation of discarding a system -->
  <Overlay
    name="Confirm Deletion"
    behavior="hide-on-outside-click"
    bind:shown={discardConfirmationOverlay}
  >
    <p>Are you sure you want to discard</p>
    <div style="margin-top: 1rem; margin-bottom: 0;">
      <div style="float:right">
        <WizardButton color="primary" onPress={() => (systemOverlay = false)}
          >Cancel</WizardButton
        >
        <WizardButton
          color="dangerous"
          onPress={() => onDiscardSystem(systemInput, systemIndex)}
          >Discard</WizardButton
        >
      </div>
    </div>
  </Overlay>

  <!-- The error overlay -->
  <ErrorOverlay bind:shown={errorOverlay} />
</AuthGuard>
