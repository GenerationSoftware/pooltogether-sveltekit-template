<script lang="ts">
  import type { TokenWithAmount, Vault } from '@generationsoftware/hyperstructure-client-js'
  import { formatTokenAmount } from '$lib/utils'
  import { onMount } from 'svelte'
  import { parseUnits, type Address, formatUnits } from 'viem'
  import VaultDepositButton from './DepositButton.svelte'

  export let vault: Vault
  export let userAddress: Address
  let token: TokenWithAmount | undefined = undefined
  let formDepositAmount = ''
  let errorMsg = ''

  const getErrorMsg = () => {
    if (!!token && !!formDepositAmount) {
      if (Number.isNaN(Number(formDepositAmount))) {
        errorMsg = 'Enter a valid number'
      } else if (parseFloat(formDepositAmount) < 0) {
        errorMsg = 'Enter a valid positive number'
      } else if (formDepositAmount.split('.')[1]?.length > token.decimals) {
        errorMsg = 'Too many decimals'
      } else if (
        parseFloat(formatUnits(token.amount, token.decimals)) < parseFloat(formDepositAmount)
      ) {
        errorMsg = `Not enough ${token.symbol} in wallet`
      } else {
        errorMsg = ''
      }
    } else {
      errorMsg = ''
    }
  }

  $: token, formDepositAmount, getErrorMsg()

  $: depositAmount =
    !!token && !!formDepositAmount && !errorMsg ? parseUnits(formDepositAmount, token.decimals) : 0n

  const setMaxDepositAmount = () => {
    if (!!token) {
      formDepositAmount = formatUnits(token.amount, token.decimals)
    }
  }

  const resetDepositAmount = () => {
    formDepositAmount = ''
  }

  onMount(async () => {
    token = await vault.getUserTokenBalance(userAddress)
  })
</script>

{#if !!token}
  <div class="vault-deposit-form">
    <div class="label">
      <span>Deposit {token.symbol}</span>
      <button class="max-button" on:click={setMaxDepositAmount}>
        Max ({formatTokenAmount(token.amount, token.decimals)}
        {token.symbol})
      </button>
    </div>
    <form on:submit|preventDefault>
      <input bind:value={formDepositAmount} placeholder="0" />
      <VaultDepositButton
        {vault}
        {depositAmount}
        disabled={!!errorMsg}
        onSuccess={resetDepositAmount}
      />
    </form>
    <span class="error-msgs">{errorMsg}</span>
  </div>
{/if}

<style>
  .vault-deposit-form {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: space-between;
  }

  .max-button {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--pt-purple-100);
  }

  .max-button:hover {
    color: var(--pt-purple-200);
  }

  form {
    display: flex;
  }

  form > input {
    flex-grow: 1;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem 0 0 0.25rem;
  }

  .error-msgs {
    height: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--pt-warning-light);
  }
</style>
