<script lang="ts">
  import type { Vault } from '@generationsoftware/hyperstructure-client-js'
  import Loading from '$lib/Loading.svelte'
  import { userAddress } from '$lib/stores'
  import { formatTokenAmount, getUserVaultTokenBalance } from '$lib/utils'

  export let vault: Vault
</script>

{#if $userAddress}
  <div class="vault-user-balance">
    <span class="title">Your Balance:</span>
    {#await getUserVaultTokenBalance(vault, $userAddress)}
      <Loading height="0.5rem" />
    {:then token}
      <span>{formatTokenAmount(token.amount, token.decimals)} {token.symbol}</span>
    {/await}
  </div>
{/if}

<style>
  .vault-user-balance {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .title {
    color: var(--pt-purple-100);
  }
</style>
