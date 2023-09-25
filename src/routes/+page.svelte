<script lang="ts">
	import Header from "../components/home/Header.svelte";
	import Footer from "../components/home/Footer.svelte";
	import RoundedButton from "../components/basics/buttons/RoundedButton.svelte";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Project Bae" />
</svelte:head>

<Header />

<section>
	<!-- The box at the center of the screen with explanation text an the title -->
	<div class="center-box">
		<span class="title">AI Scanner</span>
		<p style="font-size: 20px;">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Elementum curabitur vitae nunc sed velit dignissim sodales ut eu.
			Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus.
			Tellus elementum sagittis vitae et. Nullam eget felis eget nunc
			lobortis mattis aliquam faucibus purus. Et malesuada fames ac turpis
			egestas maecenas. Mattis pellentesque id nibh tortor id. Ac turpis
			egestas integer eget. Eget lorem dolor sed viverra ipsum. Lacinia
			quis vel eros donec. Nunc eget lorem dolor sed viverra ipsum nunc.
			Sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Etiam tempor
			orci eu lobortis elementum. Viverra vitae congue eu consequat.
			Viverra justo nec ultrices dui sapien eget mi. Ultrices in iaculis
			nunc sed augue lacus viverra. Euismod nisi porta lorem mollis
			aliquam ut porttitor leo. Aenean pharetra magna ac placerat
			vestibulum. Diam quam nulla porttitor massa id neque aliquam
			vestibulum. Eu sem integer vitae justo eget.
		</p>
		<RoundedButton fill="outlined" href="/login">Login</RoundedButton>
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
