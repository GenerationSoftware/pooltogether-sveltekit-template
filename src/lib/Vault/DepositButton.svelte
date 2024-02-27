<script lang="ts">
  import type { TokenWithAmount, Vault } from '@generationsoftware/hyperstructure-client-js'
  import { userAddress, walletClient } from '$lib/stores'
  import { onMount } from 'svelte'

  export let vault: Vault
  export let depositAmount: bigint
  export let disabled: boolean = false
  export let onSuccess: () => void = () => {}
  let token: TokenWithAmount | undefined = undefined
  let allowance: bigint | undefined = undefined
  let isApproving: boolean = false
  let isDepositing: boolean = false

  const getTokenBalance = async () => {
    if (!!$userAddress) {
      token = await vault.getUserTokenBalance($userAddress)
    }
  }

  const getTokenAllowance = async () => {
    if (!!$userAddress) {
      allowance = await vault.getUserTokenAllowance($userAddress)
    }
  }

  const deposit = async () => {
    try {
      isDepositing = true
      vault.walletClient = $walletClient
      await vault.deposit(depositAmount)
      onSuccess()
    } catch (e) {
      console.error(e)
    } finally {
      isDepositing = false
    }
  }

  const approve = async () => {
    try {
      isApproving = true
      vault.walletClient = $walletClient
      await vault.approveDeposit(depositAmount)
    } catch (e) {
      console.error(e)
    } finally {
      isApproving = false
    }
  }

  // TODO: refresh token allowance after approval
  // TODO: refresh token balance after deposit
  // TODO: refresh token balance in vault after deposit
  // TODO: refresh total vault token balance after deposit

  onMount(async () => {
    getTokenBalance()
    getTokenAllowance()
  })
</script>

{#if !$walletClient || !$userAddress || !depositAmount || !token || depositAmount > token.amount || allowance === undefined}
  <button disabled={true}>Deposit</button>
{:else if allowance < depositAmount}
  <button type="submit" on:click={approve} disabled={isApproving || disabled}>Approve</button>
{:else}
  <button type="submit" on:click={deposit} disabled={isDepositing || disabled}>Deposit</button>
{/if}

<style>
  button {
    padding: 0.125rem 0.5rem;
    background-color: var(--pt-teal-dark);
    color: var(--pt-purple-900);
    border-radius: 0 0.25rem 0.25rem 0;
  }
</style>
