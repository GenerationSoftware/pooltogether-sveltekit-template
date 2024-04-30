<script lang="ts">
  import {
    PrizePool,
    getTokenPrices,
    NETWORK,
    USDC_TOKEN_ADDRESSES,
    type TokenWithAmount
  } from '@generationsoftware/hyperstructure-client-js'
  import { PRIZE_POOL_INFO, VIEM_CLIENTS } from './config'
  import { formatUnits, type Address } from 'viem'
  import Loading from './Loading.svelte'

  let grandPrize: TokenWithAmount | undefined = undefined
  let prizeTokenPriceInUsd: number | undefined = undefined

  $: prizePool = new PrizePool(
    PRIZE_POOL_INFO.chainId,
    PRIZE_POOL_INFO.address,
    VIEM_CLIENTS[PRIZE_POOL_INFO.chainId],
    PRIZE_POOL_INFO.options
  )

  const getGrandPrize = async () => {
    if (!!prizePool && !grandPrize) {
      const amount = await prizePool.getTierPrizeSize(0)
      const prizeTokenData = await prizePool.getPrizeTokenData()
      grandPrize = { ...prizeTokenData, amount }
    }
  }

  const getPrizeTokenPrice = async () => {
    if (!!grandPrize && prizeTokenPriceInUsd === undefined) {
      const prizeTokenPriceInEth = (
        await getTokenPrices(PRIZE_POOL_INFO.chainId, [grandPrize.address])
      )[grandPrize.address.toLowerCase() as Lowercase<Address>]
      const usdcTokenPriceInEth = (
        await getTokenPrices(NETWORK.mainnet, [USDC_TOKEN_ADDRESSES[NETWORK.mainnet]])
      )[USDC_TOKEN_ADDRESSES[NETWORK.mainnet]]

      if (!!usdcTokenPriceInEth) {
        prizeTokenPriceInUsd = prizeTokenPriceInEth * (1 / usdcTokenPriceInEth)
      }
    }
  }

  $: prizePool, getGrandPrize()
  $: grandPrize, getPrizeTokenPrice()

  $: tokenAmount = !!grandPrize
    ? parseFloat(formatUnits(grandPrize.amount, grandPrize.decimals))
    : undefined
  $: usdAmount =
    tokenAmount !== undefined && prizeTokenPriceInUsd !== undefined
      ? tokenAmount * prizeTokenPriceInUsd
      : undefined
</script>

<div class="gp">
  <span class="text">The grand prize is currently at...</span>
  <span class="tokens">
    {#if tokenAmount !== undefined}
      <img src="ethLogo.svg" alt="Prize Token" width={48} height={48} />
      {tokenAmount.toLocaleString('en', { maximumFractionDigits: 2 })}
    {:else}
      <Loading height="1rem" />
    {/if}
  </span>
  <span class="dollars">
    {#if usdAmount !== undefined}
      (~${usdAmount.toLocaleString('en', { maximumFractionDigits: 0 })})
    {/if}
  </span>
</div>

<style>
  .gp {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    margin: 3rem 0;
  }

  .text {
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--pt-purple-300);
  }

  .tokens {
    height: 4rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 3.75rem;
    line-height: 1;
  }

  .dollars {
    height: 2rem;
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--pt-purple-300);
  }
</style>
