<script lang="ts">
  import RoundedButton from "../../components/basics/buttons/RoundedButton.svelte";
  import Footer from "../../components/home/Footer.svelte";
  import Header from "../../components/home/Header.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Project Bae" />
</svelte:head>

<Header />

<section>
  <!-- The box at the center of the screen with explanation text an the title -->
  <div class="center-box">
    <span class="title">Timeout</span>
    <p style="font-size: 20px;">
      For security reasons, you have been timed out due to inactivity. Please
      login again to continue.
    </p>
    <RoundedButton style="light" fill="filled" href="/login"
      >Login</RoundedButton
    >
  </div>
</section>

<Footer />

<style lang="scss">
  .title {
    font-size: 5rem;
    font-weight: 700;
  }

  .center-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
    text-align: center;

    margin-left: 20%;
    margin-right: 20%;
  }
</style>
