<script lang="ts">
  import { Vault, type VaultInfo } from '@generationsoftware/hyperstructure-client-js'
  import { VIEM_CLIENTS } from '$lib/config'
  import { userAddress } from '$lib/stores'
  import VaultHeader from './Header.svelte'
  import VaultUserBalance from './UserBalance.svelte'
  import VaultBalance from './Balance.svelte'
  import VaultDepositForm from './DepositForm.svelte'
  import VaultWithdrawForm from './WithdrawForm.svelte'

  export let vaultInfo: VaultInfo

  $: vault = new Vault(vaultInfo.chainId, vaultInfo.address, VIEM_CLIENTS[vaultInfo.chainId], {
    decimals: vaultInfo.decimals,
    tokenAddress: vaultInfo.extensions?.underlyingAsset?.address,
    name: vaultInfo.name,
    logoURI: vaultInfo.logoURI,
    tags: vaultInfo.tags,
    tokenLogoURI: vaultInfo.extensions?.underlyingAsset?.logoURI,
    yieldSourceURI: vaultInfo.yieldSourceURI
  })
</script>

<div class="vault">
  <VaultHeader {vault} />
  <hr />
  <VaultUserBalance {vault} />
  <VaultBalance {vault} />
  {#if $userAddress}
    <VaultDepositForm {vault} userAddress={$userAddress} />
    <VaultWithdrawForm {vault} userAddress={$userAddress} />
  {/if}
</div>

<style>
  .vault {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 1rem;
    background-color: var(--pt-purple-800);
    border-radius: 0.5rem;
  }

  .vault > hr {
    width: 100%;
    margin: 0;
    border: none;
    border-top: solid 1px var(--pt-purple-600);
  }
</style>
