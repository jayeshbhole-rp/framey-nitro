import { createConfig, http } from '@wagmi/core';
import { arbitrum, base, Chain, degen, mainnet, optimism, polygon, zora } from '@wagmi/core/chains';
import { CHAIN_IDS, ChainIds, CHAINS_DATA } from './chains';
import { HttpTransport } from 'viem';

export const TRANSPORTS: Record<ChainIds, HttpTransport> = {
  [CHAIN_IDS.ethereum]: http(),
  [CHAIN_IDS.polygon]: http(),
  [CHAIN_IDS.arbitrum]: http(),
  [CHAIN_IDS.optimism]: http(),
  [CHAIN_IDS.zksync]: http(),
  [CHAIN_IDS.avalanche]: http(),
  [CHAIN_IDS.binance]: http(),
  [CHAIN_IDS.polygonzkevm]: http(),
  [CHAIN_IDS.manta]: http(),
  [CHAIN_IDS.scroll]: http(),
  [CHAIN_IDS.mantle]: http(),
  [CHAIN_IDS.base]: http(),
  [CHAIN_IDS.linea]: http(),
  [CHAIN_IDS.blast]: http(),
  [CHAIN_IDS.metis]: http(),
  [CHAIN_IDS.mode]: http(),
  [CHAIN_IDS.boba]: http(),
} as const;

export const wagmiConfig = createConfig({
  chains: Object.values(CHAINS_DATA) as [Chain, ...Chain[]],
  transports: TRANSPORTS,
});
