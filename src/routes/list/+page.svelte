<script>
    import ContentContainer from "../../components/basics/ContentContainer.svelte";
    import Table from "../../components/basics/Table.svelte";
    import NavBar from "../../components/layout/NavBar.svelte";
    import openaiLogo from "$lib/images/integrations/openai.svg";
    import googleLogo from "$lib/images/integrations/google.svg";
    import awsLogo from "$lib/images/integrations/aws.svg";
    import "./List.scss";

    // The data for the table
    // TODO: Replace with real data from the backend
    const headers = ["Service Name", "Type", "Description", "Date Added"];
    const data = [
        [
            { data: "OpenAPI GPT-3", icon: openaiLogo },
            { data: "LLM" },
            { data: "Customer Service" },
            { data: new Date() },
        ],
        [
            { data: "Google Bard", icon: googleLogo },
            { data: "LLM" },
            { data: "AI ChatBot" },
            { data: new Date() },
        ],
        [
            { data: "Stable Diffusion", icon: awsLogo },
            { data: "Diffusion Model" },
            { data: "Icon Generation" },
            { data: new Date() },
        ],
    ];
</script>

<svelte:head>
    <title>AI List</title>
    <meta name="description" content="Ai List" />
</svelte:head>

<div class="page list">
    <NavBar />
    <ContentContainer>
        <h3>My Services</h3>
        <Table {headers} {data} />
    </ContentContainer>
</div>
