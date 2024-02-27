<script lang="ts">
  import type { TokenWithAmount, Vault } from '@generationsoftware/hyperstructure-client-js'
  import { formatTokenAmount, getUserVaultTokenBalance } from '$lib/utils'
  import { onMount } from 'svelte'
  import { parseUnits, type Address, formatUnits } from 'viem'
  import VaultWithdrawButton from './WithdrawButton.svelte'

  export let vault: Vault
  export let userAddress: Address
  let token: TokenWithAmount | undefined = undefined
  let formWithdrawAmount = ''
  let errorMsg = ''

  const getErrorMsg = () => {
    if (!!token && !!formWithdrawAmount) {
      if (Number.isNaN(Number(formWithdrawAmount))) {
        errorMsg = 'Enter a valid number'
      } else if (parseFloat(formWithdrawAmount) < 0) {
        errorMsg = 'Enter a valid positive number'
      } else if (formWithdrawAmount.split('.')[1]?.length > token.decimals) {
        errorMsg = 'Too many decimals'
      } else if (
        parseFloat(formatUnits(token.amount, token.decimals)) < parseFloat(formWithdrawAmount)
      ) {
        errorMsg = `Not enough ${token.symbol} in vault`
      } else {
        errorMsg = ''
      }
    } else {
      errorMsg = ''
    }
  }

  $: token, formWithdrawAmount, getErrorMsg()

  $: withdrawAmount =
    !!token && !!formWithdrawAmount && !errorMsg
      ? parseUnits(formWithdrawAmount, token.decimals)
      : 0n

  const setMaxWithdrawAmount = () => {
    if (!!token) {
      formWithdrawAmount = formatUnits(token.amount, token.decimals)
    }
  }

  const resetWithdrawAmount = () => {
    formWithdrawAmount = ''
  }

  onMount(async () => {
    token = await getUserVaultTokenBalance(vault, userAddress)
  })
</script>

{#if !!token}
  <div class="vault-withdraw-form">
    <div class="label">
      <span>Withdraw {token.symbol}</span>
      <button class="max-button" on:click={setMaxWithdrawAmount}>
        Max ({formatTokenAmount(token.amount, token.decimals)}
        {token.symbol})
      </button>
    </div>
    <form on:submit|preventDefault>
      <input bind:value={formWithdrawAmount} placeholder="0" />
      <VaultWithdrawButton
        {vault}
        {withdrawAmount}
        disabled={!!errorMsg}
        onSuccess={resetWithdrawAmount}
      />
    </form>
    <span class="error-msgs">{errorMsg}</span>
  </div>
{/if}

<style>
  .vault-withdraw-form {
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
