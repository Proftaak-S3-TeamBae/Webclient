<script>
  import NavBar from "../../components/layout/NavBar.svelte";
  import UserBox from "../../components/user/UserBox.svelte";
  import ContentContainer from "../../components/basics/ContentContainer.svelte";
  import CommandButton from "../../components/basics/CommandButton.svelte";
  import CenterBox from "../../components/layout/CenterBox.svelte";
  import "./UserPage.scss";
  import PropPaneHost from "../../components/layout/PropPaneHost.svelte";
  import { SvelteComponent } from "svelte";
  import AuthGuard from "../../components/auth/AuthGuard.svelte";
</script>

<svelte:head>
  <title>My Profile</title>
  <meta name="description" content="User profile view" />
</svelte:head>

<AuthGuard>
  <div class="page user">
    <NavBar />
    <ContentContainer>
      <UserBox />
      <hr />
      <PropPaneHost pages={[{ label: "Testing", icon: "folder" }]} />
    </ContentContainer>
  </div>
</AuthGuard>
