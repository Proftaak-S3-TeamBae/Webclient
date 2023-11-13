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
    
    export let data: PageData;

    // The data for the table
    // TODO: Replace with real data from the backend
    const headers = ["Service Name", "Type", "Description", "Date Added"];
    const tdata = data.list.map(x => [
        { data: x.name, icon: openaiLogo },
        { data: x.type },
        { data: x.description },
        { data: friendlyDate(new Date(x.date_added)) }
    ]);
    // const tdata = [
    //     [
    //         { data: "OpenAPI GPT-3", icon: openaiLogo },
    //         { data: "LLM" },
    //         { data: "Customer Service" },
    //         { data: friendlyDate(new Date()) },
    //     ],
    //     [
    //         { data: "Google Bard", icon: googleLogo },
    //         { data: "LLM" },
    //         { data: "AI ChatBot" },
    //         { data: friendlyDate(new Date()) },
    //     ],
    //     [
    //         { data: "Stable Diffusion", icon: awsLogo },
    //         { data: "Diffusion Model" },
    //         { data: "Icon Generation" },
    //         { data: friendlyDate(new Date()) },
    //     ],
    // ];
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
        <div class="button-group">
            <WizardButton color="primary"
                >Register Service</WizardButton
            >
        </div>
    </ContentContainer>
</div>
