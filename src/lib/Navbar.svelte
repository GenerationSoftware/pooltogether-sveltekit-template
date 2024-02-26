<script>
  import ConnectButton from './ConnectButton.svelte'
</script>

<nav>
  <div>
    <img src="pooltogetherLogo.svg" alt="PoolTogether Logo" />
    <ConnectButton />
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: inherit;
    border-bottom: solid 2px var(--pt-purple-700);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    z-index: 50;
  }

  nav > div {
    width: 100%;
    max-width: 1280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
