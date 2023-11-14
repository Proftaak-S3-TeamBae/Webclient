<script lang="ts">
    import type { PageData } from './$types';
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
    import Paginator from '../../components/layout/Paginator.svelte';
    
    export let data: PageData;

    /**
     * Gets an AI system logo from a string.
     * @param logoId The ID of the logo to get the URL for.
     */
    function parseLogo(logoId: string) {
        switch(logoId){
            default:
                return "";
            case "OpenAI":
                return openaiLogo;
            case "Google":
                return googleLogo;
            case "AWS":
                return awsLogo;
        }

    }

    // The data for the table
    const headers = ["Service Name", "Type", /* "Description", */ "Date Added"];
    const tdata = data.list.data.map(x => [
        { data: x.name, icon: parseLogo(x.source) },
        { data: x.type },
        // { data: x.description },
        { data: friendlyDate(new Date(x.date_added)) }
    ]);
</script>

<svelte:head>
    <title>AI List</title>
    <meta name="description" content="Ai List" />
</svelte:head>

<div class="page list">
    <NavBar />
    <ContentContainer>
        <h3>My Services</h3>
        <p>
            Here you can view all of your active AI services and their purpose.
        </p>
        <ToolBar>
            <ToolBarSpacer/>
            <ToolBarItem icon="edit" label="Edit" disabled={true}/>
            <ToolBarItem icon="delete" label="Remove" disabled={true}/>
        </ToolBar>
        <Table addCheckBoxes={true} {headers} data={tdata} />
        <Paginator currentPage={data.list.currentPage} pageCount={data.list.totalPages}
            onChange = {(page)=>void (window.location.href = `/list?page=${page}`)}/>
        <div class="button-group">
            <WizardButton color="primary"
                >Register Service</WizardButton
            >
        </div>
    </ContentContainer>
</div>
