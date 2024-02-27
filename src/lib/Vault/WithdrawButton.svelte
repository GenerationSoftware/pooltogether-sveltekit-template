<script lang="ts">
  import type { TokenWithAmount, Vault } from '@generationsoftware/hyperstructure-client-js'
  import { userAddress, walletClient } from '$lib/stores'
  import { onMount } from 'svelte'
  import { getUserVaultTokenBalance } from '$lib/utils'

  export let vault: Vault
  export let withdrawAmount: bigint
  export let disabled: boolean = false
  export let onSuccess: () => void = () => {}
  let token: TokenWithAmount | undefined = undefined
  let isWithdrawing: boolean = false

  const getVaultTokenBalance = async () => {
    if (!!$userAddress) {
      token = await getUserVaultTokenBalance(vault, $userAddress)
    }
  }

  const withdraw = async () => {
    try {
      isWithdrawing = true
      vault.walletClient = $walletClient
      await vault.withdraw(withdrawAmount)
      onSuccess()
    } catch (e) {
      console.error(e)
    } finally {
      isWithdrawing = false
    }
  }

  // TODO: refresh token balance after withdrawal
  // TODO: refresh token balance in vault after withdrawal
  // TODO: refresh total vault token balance after withdrawal

  onMount(async () => {
    getVaultTokenBalance()
  })
</script>

{#if !$walletClient || !$userAddress || !withdrawAmount || !token || withdrawAmount > token.amount}
  <button disabled={true}>Withdraw</button>
{:else}
  <button type="submit" on:click={withdraw} disabled={isWithdrawing || disabled}>Withdraw</button>
{/if}

<style>
  button {
    padding: 0.125rem 0.5rem;
    background-color: var(--pt-teal-dark);
    color: var(--pt-purple-900);
    border-radius: 0 0.25rem 0.25rem 0;
  }
</style>
