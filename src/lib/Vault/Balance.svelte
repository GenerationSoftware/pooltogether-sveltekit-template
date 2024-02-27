<script lang="ts">
  import type { TokenWithAmount } from '@generationsoftware/hyperstructure-client-js'
  import Loading from '$lib/Loading.svelte'
  import { userAddress } from '$lib/stores'
  import { formatTokenAmount } from '$lib/utils'

  export let token: TokenWithAmount | undefined = undefined

  $: balance = !!token ? formatTokenAmount(token.amount, token.decimals) : undefined
</script>

{#if $userAddress}
  <div class="vault-balance">
    <span class="title">Total Vault Assets:</span>
    {#if !!token}
      <span>{balance} {token.symbol}</span>
    {:else}
      <Loading height="0.5rem" />
    {/if}
  </div>
{/if}

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
