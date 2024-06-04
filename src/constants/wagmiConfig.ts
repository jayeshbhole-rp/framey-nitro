import { createConfig, http } from '@wagmi/core';
import { arbitrum, base, Chain, degen, mainnet, optimism, polygon, zora } from '@wagmi/core/chains';

export const CHAIN_IDS = {
  ethereum: 1,
  arbitrum: 42161,
  optimism: 10,
  base: 8453,
} as const;

export type Chains = keyof typeof CHAIN_IDS;
export type ChainIds = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

export const CHAINS: Record<ChainIds, Chains> = {
  [CHAIN_IDS.ethereum]: 'ethereum',
  [CHAIN_IDS.arbitrum]: 'arbitrum',
  [CHAIN_IDS.optimism]: 'optimism',
  [CHAIN_IDS.base]: 'base',
} as const;

export const WAGMI_CHAINS_DATA: Record<ChainIds, Chain> = {
  [CHAIN_IDS.ethereum]: mainnet,
  [CHAIN_IDS.arbitrum]: arbitrum,
  [CHAIN_IDS.optimism]: optimism,
  [CHAIN_IDS.base]: base,
} as const;

export const TRANSPORTS = {
  [CHAIN_IDS.ethereum]: http(),
  [CHAIN_IDS.arbitrum]: http(),
  [CHAIN_IDS.optimism]: http(),
  [CHAIN_IDS.base]: http(),
} as const;

export const wagmiConfig = createConfig({
  chains: Object.values(WAGMI_CHAINS_DATA) as [Chain, ...Chain[]],
  transports: TRANSPORTS,
});
