<script lang="ts">
  import type { TokenWithAmount } from '@generationsoftware/hyperstructure-client-js'
  import Loading from '$lib/Loading.svelte'
  import { userAddress } from '$lib/stores'
  import { formatTokenAmount } from '$lib/utils'

  export let token: TokenWithAmount | undefined = undefined

  $: userBalance = !!token ? formatTokenAmount(token.amount, token.decimals) : undefined
</script>

{#if $userAddress}
  <div class="vault-user-balance">
    <span class="title">Your Balance:</span>
    {#if !!token}
      <span>{userBalance} {token.symbol}</span>
    {:else}
      <Loading height="0.5rem" />
    {/if}
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
