import type { TokenWithAmount, Vault } from '@generationsoftware/hyperstructure-client-js'
import { formatUnits, type Address } from 'viem'

export const formatTokenAmount = (
  amount: bigint,
  decimals: number,
  options?: Intl.NumberFormatOptions
) => {
  const tokenAmount = parseFloat(formatUnits(amount, decimals))

  return tokenAmount.toLocaleString('en', {
    maximumFractionDigits: tokenAmount > 1_000 ? 0 : tokenAmount < 0 ? 4 : 2,
    ...options
  })
}

export const getUserVaultTokenBalance = async (
  vault: Vault,
  userAddress: Address
): Promise<TokenWithAmount> => {
  const token = await vault.getTokenData()
  const share = await vault.getUserShareBalance(userAddress)
  const amount = await vault.getAssetsFromShares(share.amount)
  return { ...token, amount }
}
