<script>
    import "./Integrations.scss";
    import ContentContainer from "../../components/basics/ContentContainer.svelte";
    import NavBar from "../../components/layout/NavBar.svelte";

    import openaiLogo from "$lib/images/integrations/openai.svg";
    import googleLogo from "$lib/images/integrations/google.svg";
    import awsLogo from "$lib/images/integrations/aws.svg";

    import ServiceButton from "../../components/integrations/ServiceButton.svelte";
</script>

<svelte:head>
    <title>Integrations</title>
    <meta name="description" content="Integrations" />
</svelte:head>

<NavBar />

<ContentContainer>
    <h3>Add Integration</h3>
    <div class="integ-buttons">
        <ServiceButton icon={openaiLogo}>OpenAI</ServiceButton>
        <ServiceButton icon={googleLogo}>Google</ServiceButton>
        <ServiceButton icon={awsLogo}>Amazon AWS</ServiceButton>
    </div>
</ContentContainer>
