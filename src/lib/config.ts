import { NETWORK, PRIZE_POOLS, type VaultList } from '@generationsoftware/hyperstructure-client-js'
import { createConfig, getPublicClient, http } from '@wagmi/core'
import { mainnet, optimism } from '@wagmi/core/chains'
import type { PublicClient } from 'viem'

export const PRIZE_POOL_INFO = PRIZE_POOLS.find(
  (entry) => entry.chainId === NETWORK.optimism
) as NonNullable<(typeof PRIZE_POOLS)[number]>

export const VAULT_LIST = {
  name: 'PoolTogether Template App Vault List',
  version: { major: 0, minor: 1, patch: 0 },
  timestamp: '2024-02-21T00:32:35Z',
  tokens: [
    {
      chainId: NETWORK.optimism,
      address: '0xf0b19f02c63d51b69563a2b675e0160e1c34397c',
      name: 'Prize WETH',
      logoURI: 'pWETH.svg'
    },
    {
      chainId: NETWORK.optimism,
      address: '0xe3b3a464ee575e8e25d2508918383b89c832f275',
      name: 'Prize USDC.e',
      logoURI: 'pUSDC.svg'
    }
  ]
} as const satisfies VaultList

export const WAGMI_CONFIG = createConfig({
  chains: [mainnet, optimism],
  transports: {
    [NETWORK.mainnet]: http(),
    [NETWORK.optimism]: http()
  }
})

export const VIEM_CLIENTS: { [chainId: number]: PublicClient } = {
  [NETWORK.mainnet]: getPublicClient(WAGMI_CONFIG, { chainId: NETWORK.mainnet }) as PublicClient,
  [NETWORK.optimism]: getPublicClient(WAGMI_CONFIG, { chainId: NETWORK.optimism }) as PublicClient
}
