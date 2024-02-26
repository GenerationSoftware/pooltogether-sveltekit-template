<script lang="ts">
  import { VAULT_LIST } from '$lib/config'
  import Vault from '$lib/Vault/index.svelte'
  import GrandPrize from '$lib/GrandPrize.svelte'
</script>

<svelte:head>
  <title>PoolTogether App Template</title>
  <meta
    name="description"
    content="This is a minimal template for a static SvelteKit app that interacts with the PoolTogether protocol"
  />
</svelte:head>

<GrandPrize />

<div id="vaults">
  {#each VAULT_LIST.tokens as vaultInfo}
    <Vault {vaultInfo} />
  {/each}
</div>

<style>
  #vaults {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
</style>
