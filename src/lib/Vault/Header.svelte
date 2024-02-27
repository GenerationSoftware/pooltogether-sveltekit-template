<script lang="ts">
  import type { Vault } from '@generationsoftware/hyperstructure-client-js'
  import Loading from '$lib/Loading.svelte'

  export let vault: Vault
</script>

<div class="vault-header">
  <img src={vault.logoURI ?? ''} alt={`${vault.name} Logo`} />
  <span></span>
  <span>
    {#if !!vault.name}
      {vault.name}
    {:else}
      <Loading height="0.75rem" />
    {/if}
  </span>
</div>

<style>
  .vault-header {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .vault-header > img {
    width: 2rem;
    height: 2rem;
  }

  .vault-header > span {
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
</style>
