<script lang="ts">
  import {
    Vault,
    type TokenWithAmount,
    type VaultInfo
  } from '@generationsoftware/hyperstructure-client-js'
  import { VIEM_CLIENTS } from '$lib/config'
  import { userAddress } from '$lib/stores'
  import VaultHeader from './Header.svelte'
  import VaultUserBalance from './UserBalance.svelte'
  import VaultBalance from './Balance.svelte'

  export let vaultInfo: VaultInfo
  let userBalance: TokenWithAmount | undefined = undefined
  let vaultBalance: TokenWithAmount | undefined = undefined
  let isFetchingUserBalance: boolean = false
  let isFetchingVaultBalance: boolean = false

  $: vault = new Vault(vaultInfo.chainId, vaultInfo.address, VIEM_CLIENTS[vaultInfo.chainId], {
    decimals: vaultInfo.decimals,
    tokenAddress: vaultInfo.extensions?.underlyingAsset?.address,
    name: vaultInfo.name,
    logoURI: vaultInfo.logoURI,
    tags: vaultInfo.tags,
    tokenLogoURI: vaultInfo.extensions?.underlyingAsset?.logoURI,
    yieldSourceURI: vaultInfo.yieldSourceURI
  })

  const getUserBalance = async () => {
    if (!!$userAddress && !isFetchingUserBalance) {
      isFetchingUserBalance = true
      userBalance = await vault.getUserTokenBalance($userAddress)
      isFetchingUserBalance = false
    }
  }

  const getVaultBalance = async () => {
    if (!isFetchingVaultBalance) {
      isFetchingVaultBalance = true
      vaultBalance = await vault.getTotalTokenBalance()
      isFetchingVaultBalance = false
    }
  }

  $: vault, $userAddress, getUserBalance()
  $: vault, getVaultBalance()
</script>

<div class="vault">
  <VaultHeader {vault} />
  <hr />
  <VaultUserBalance token={userBalance} />
  <VaultBalance token={vaultBalance} />
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
    border-color: var(--pt-purple-600);
  }
</style>
