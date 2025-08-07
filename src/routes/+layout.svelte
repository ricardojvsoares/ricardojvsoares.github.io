<script>
  import '../styles/global.css';
  import '../styles/variables.css';
  import '../styles/themes.css';
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
