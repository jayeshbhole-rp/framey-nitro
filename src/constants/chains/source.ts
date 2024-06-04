export const SOURCE_CHAIN_IDS = {
  ethereum: 1,
  arbitrum: 42161,
  optimism: 10,
  base: 8453,
} as const;

export type SourceChains = keyof typeof SOURCE_CHAIN_IDS;
export type SourceChainIds = (typeof SOURCE_CHAIN_IDS)[keyof typeof SOURCE_CHAIN_IDS];

export const SUPPORTED_SOURCE_CHAINS: SourceChainIds[] = [8453, 42161, 10, 1];

export const SOURCE_CHAINS: Record<SourceChainIds, SourceChains> = {
  [SOURCE_CHAIN_IDS.ethereum]: 'ethereum',
  [SOURCE_CHAIN_IDS.arbitrum]: 'arbitrum',
  [SOURCE_CHAIN_IDS.optimism]: 'optimism',
  [SOURCE_CHAIN_IDS.base]: 'base',
} as const;
