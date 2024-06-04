import {
  arbitrum,
  avalanche,
  base,
  blast,
  boba,
  bsc,
  linea,
  mainnet,
  manta,
  mantle,
  metis,
  mode,
  optimism,
  polygon,
  polygonZkEvm,
  scroll,
  zkSync,
} from '@wagmi/core/chains';
import { Chain } from '@wagmi/core/chains';

export type ChainData = Omit<Chain, 'id'>;

export const CHAIN_IDS = {
  // evm
  ethereum: '1',
  polygon: '137',
  arbitrum: '42161',
  optimism: '10',
  zksync: '324',
  avalanche: '43114',
  binance: '56',
  polygonzkevm: '1101',
  manta: '169',
  scroll: '534352',
  mantle: '5000',
  base: '8453',
  linea: '59144',
  blast: '81457',
  metis: '1088',
  mode: '34443',
  boba: '288',
} as const;

export type Chains = keyof typeof CHAIN_IDS;
export type ChainIds = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

export const CHAINS: Record<ChainIds, Chains> = {
  [CHAIN_IDS.ethereum]: 'ethereum',
  [CHAIN_IDS.polygon]: 'polygon',
  [CHAIN_IDS.arbitrum]: 'arbitrum',
  [CHAIN_IDS.optimism]: 'optimism',
  [CHAIN_IDS.zksync]: 'zksync',
  [CHAIN_IDS.avalanche]: 'avalanche',
  [CHAIN_IDS.binance]: 'binance',
  [CHAIN_IDS.polygonzkevm]: 'polygonzkevm',
  [CHAIN_IDS.manta]: 'manta',
  [CHAIN_IDS.scroll]: 'scroll',
  [CHAIN_IDS.mantle]: 'mantle',
  [CHAIN_IDS.base]: 'base',
  [CHAIN_IDS.linea]: 'linea',
  [CHAIN_IDS.blast]: 'blast',
  [CHAIN_IDS.metis]: 'metis',
  [CHAIN_IDS.mode]: 'mode',
  [CHAIN_IDS.boba]: 'boba',
} as const;

export const CHAINS_DATA: Record<ChainIds, ChainData> = {
  [CHAIN_IDS.ethereum]: mainnet,
  [CHAIN_IDS.polygon]: polygon,
  [CHAIN_IDS.arbitrum]: arbitrum,
  [CHAIN_IDS.optimism]: optimism,
  [CHAIN_IDS.zksync]: zkSync,
  [CHAIN_IDS.avalanche]: avalanche,
  [CHAIN_IDS.binance]: bsc,
  [CHAIN_IDS.polygonzkevm]: polygonZkEvm,
  [CHAIN_IDS.manta]: manta,
  [CHAIN_IDS.scroll]: scroll,
  [CHAIN_IDS.mantle]: mantle,
  [CHAIN_IDS.base]: base,
  [CHAIN_IDS.linea]: linea,
  [CHAIN_IDS.blast]: blast,
  [CHAIN_IDS.metis]: metis,
  [CHAIN_IDS.mode]: mode,
  [CHAIN_IDS.boba]: boba,
} as const;
