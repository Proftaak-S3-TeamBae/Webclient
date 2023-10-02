<script>
    import ContentContainer from "../../components/basics/ContentContainer.svelte";
    import Table from "../../components/basics/Table.svelte";
    import Header from "../../components/home/Header.svelte";
    import NavBar from "../../components/layout/NavBar.svelte";
    import "./List.scss";
</script>

<svelte:head>
    <title>AI List</title>
    <meta name="description" content="Ai List" />
</svelte:head>

<div class="page list">
    <NavBar />
    <ContentContainer>
        <h3>My Services</h3>
        <Table
            headers={["Service Name", "Type", "Description", "Date Added"]}
        />
    </ContentContainer>
</div>
