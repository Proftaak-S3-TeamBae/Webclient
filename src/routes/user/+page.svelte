<script>
    import NavBar from "../../components/layout/NavBar.svelte";
    import UserBox from "../../components/user/UserBox.svelte";
    import ContentContainer from "../../components/basics/ContentContainer.svelte";
    import CommandButton from "../../components/basics/CommandButton.svelte";
    import CenterBox from "../../components/layout/CenterBox.svelte";
    import "./UserPage.scss";
</script>

<svelte:head>
    <title>My Profile</title>
    <meta name="description" content="User profile view" />
</svelte:head>

<div class="page user">
    <NavBar />
    <ContentContainer>
        <UserBox username="Max Meevis" avatarURL=""/>
        <hr>
        
    </ContentContainer>
</div>
