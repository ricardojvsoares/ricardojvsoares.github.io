<script>
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style>
	:global(html) {
		font-family: 'Inter', system-ui, sans-serif;
	}
	
	main {
		min-height: 100vh;
	}
</style>

