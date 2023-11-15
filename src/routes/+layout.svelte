<script>
	import '@fontsource/inter';
	import '../app.css';
</script>

<svelte:head>
	<title>anurag singh</title>
</svelte:head>

<div class="center-screen">
	<slot />
</div>

<style>
	.center-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 100vh;
	}
</style>
