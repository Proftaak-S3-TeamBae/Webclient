<script lang="ts">
  import type { PageData } from "./$types";
  import { friendlyDate } from "$lib/util/DateFormatter";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";
  import Table from "../../components/basics/Table.svelte";
  import NavBar from "../../components/layout/NavBar.svelte";
  import openaiLogo from "$lib/images/integrations/openai.svg";
  import googleLogo from "$lib/images/integrations/google.svg";
  import awsLogo from "$lib/images/integrations/aws.svg";
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

  export let data: PagedAPIResponse<AISystemModel[]>;

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
      `${APISourceURLs.aiSystemAPI}/aisystem/approved`,
      token
    );
    if (response === undefined || !response.ok) {
      return Promise.reject("Failed to fetch data");
    }
    data = await response.json();
    const mapped = data.map((x) => [
      { data: x.name, icon: parseLogo(x.integration) },
      { data: x.version },
      { data: x.type },
      { data: x.description },
      { data: x.origin },
      // { data: x.description },
      { data: friendlyDate(new Date(x.dateAdded)) },
    ]);
    return mapped;
  }

  /**
   * Gets an AI system logo from a string.
   * @param logoId The ID of the logo to get the URL for.
   */
  function parseLogo(logoId: string) {
    switch (logoId) {
      default:
        return "";
      case "OpenAi":
        return openaiLogo;
      case "Google":
        return googleLogo;
      case "AWS":
        return awsLogo;
    }
  }

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
        <ToolBarItem icon="edit" label="Edit" disabled={true} />
        <ToolBarItem icon="delete" label="Remove" disabled={true} />
      </ToolBar>
      <Table addCheckBoxes={true} {headers} data={tdata} />
      <Paginator
        currentPage={data.currentPage}
        pageCount={data.totalPages}
        onChange={(page) => void (window.location.href = `/list?page=${page}`)}
      />
      <div class="button-group">
        <WizardButton color="primary">Register Service</WizardButton>
      </div>
    </ContentContainer>
  </div>
</AuthGuard>
