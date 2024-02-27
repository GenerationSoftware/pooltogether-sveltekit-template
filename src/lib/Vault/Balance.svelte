<script lang="ts">
  import type { Vault } from '@generationsoftware/hyperstructure-client-js'
  import Loading from '$lib/Loading.svelte'
  import { formatTokenAmount } from '$lib/utils'

  export let vault: Vault
</script>

<div class="vault-balance">
  <span class="title">Total Vault Assets:</span>
  {#await vault.getTotalTokenBalance()}
    <Loading height="0.5rem" />
  {:then token}
    <span>{formatTokenAmount(token.amount, token.decimals)} {token.symbol}</span>
  {/await}
</div>

<style>
  .vault-balance {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .title {
    color: var(--pt-purple-100);
  }
</style>
