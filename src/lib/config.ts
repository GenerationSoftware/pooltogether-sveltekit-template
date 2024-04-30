import { NETWORK, PRIZE_POOLS, type VaultList } from '@generationsoftware/hyperstructure-client-js'
import { createConfig, getPublicClient, http } from '@wagmi/core'
import { mainnet, optimism } from '@wagmi/core/chains'
import type { PublicClient } from 'viem'

export const PRIZE_POOL_INFO = PRIZE_POOLS.find(
  (entry) => entry.chainId === NETWORK.optimism
) as NonNullable<(typeof PRIZE_POOLS)[number]>

export const VAULT_LIST = {
  name: 'PoolTogether Template App Vault List',
  version: { major: 0, minor: 1, patch: 1 },
  timestamp: '2024-04-30T15:33:47Z',
  tokens: [
    {
      chainId: NETWORK.optimism,
      address: '0x2998c1685E308661123F64B333767266035f5020',
      name: 'Prize WETH',
      logoURI: 'przWETH.svg'
    },
    {
      chainId: NETWORK.optimism,
      address: '0x03D3CE84279cB6F54f5e6074ff0F8319d830dafe',
      name: 'Prize USDC.e',
      logoURI: 'przUSDC.svg'
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
