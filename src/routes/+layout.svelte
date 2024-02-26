<script>
  import Navbar from '$lib/Navbar.svelte'
  import '../app.css'
</script>

<Navbar />

<main><slot /></main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    padding: 2rem 1rem;
  }
</style>
