import { createConfig, http } from '@wagmi/core';
import { arbitrum, base, Chain, degen, mainnet, optimism, polygon, zora } from '@wagmi/core/chains';

export const CHAIN_IDS = {
  ethereum: 1,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
  base: 8453,
  zora: 7777777,
  degen: 666666666,
} as const;

export type Chains = keyof typeof CHAIN_IDS;
export type ChainIds = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

export const CHAINS: Record<ChainIds, Chains> = {
  [CHAIN_IDS.ethereum]: 'ethereum',
  [CHAIN_IDS.polygon]: 'polygon',
  [CHAIN_IDS.arbitrum]: 'arbitrum',
  [CHAIN_IDS.optimism]: 'optimism',
  [CHAIN_IDS.base]: 'base',
  [CHAIN_IDS.zora]: 'zora',
  [CHAIN_IDS.degen]: 'degen',
} as const;

export const CHAINS_DATA: Record<ChainIds, Chain> = {
  [CHAIN_IDS.ethereum]: mainnet,
  [CHAIN_IDS.polygon]: polygon,
  [CHAIN_IDS.arbitrum]: arbitrum,
  [CHAIN_IDS.optimism]: optimism,
  [CHAIN_IDS.base]: base,
  [CHAIN_IDS.zora]: zora,
  [CHAIN_IDS.degen]: degen,
} as const;

export const TRANSPORTS = {
  [CHAIN_IDS.ethereum]: http(),
  [CHAIN_IDS.polygon]: http(),
  [CHAIN_IDS.arbitrum]: http(),
  [CHAIN_IDS.optimism]: http(),
  [CHAIN_IDS.base]: http(),
  [CHAIN_IDS.zora]: http(),
  [CHAIN_IDS.degen]: http(),
} as const;

export const wagmiConfig = createConfig({
  chains: Object.values(CHAINS_DATA) as [Chain, ...Chain[]],
  transports: TRANSPORTS,
});
