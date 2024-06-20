import { CHAIN_IDS } from './chains';

export const NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const PF_SERVER =
  process.env.NODE_ENV === 'production'
    ? 'https://api.nitro-frames-server.routerprotocol.com'
    : 'http://localhost:3200';

export type TokenData = {
  address: string;
  symbol: string;
  chainId: number;
  decimals: number;
};
export const tokenWhitelist: Record<string, Record<string, TokenData>> = {
  8453: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 8453,
      decimals: 18,
    },
    '0x4ed4e862860bed51a9570b96d89af5e1b0efefed': {
      address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
      symbol: 'DEGEN',
      chainId: 8453,
      decimals: 18,
    },
  },
  1: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 1,
      decimals: 18,
    },
  },
  10: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 10,
      decimals: 18,
    },
  },
  42161: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 42161,
      decimals: 18,
    },
  },

  [CHAIN_IDS.polygon]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'MATIC',
      chainId: CHAIN_IDS.polygon,
      decimals: 18,
    },
  },
  [CHAIN_IDS.zksync]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: CHAIN_IDS.zksync,
      decimals: 18,
    },
  },
  [CHAIN_IDS.avalanche]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'AVAX',
      decimals: 18,
      chainId: CHAIN_IDS.avalanche,
    },
  },
  [CHAIN_IDS.binance]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.binance,
    },
  },
  [CHAIN_IDS.polygonzkevm]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.polygonzkevm,
    },
  },
  [CHAIN_IDS.manta]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.manta,
    },
  },
  [CHAIN_IDS.mantle]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.mantle,
    },
  },
  [CHAIN_IDS.linea]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.linea,
    },
  },
  [CHAIN_IDS.blast]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.blast,
    },
  },
  [CHAIN_IDS.metis]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.metis,
    },
  },
  [CHAIN_IDS.mode]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.mode,
    },
  },
  [CHAIN_IDS.boba]: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      decimals: 18,
      chainId: CHAIN_IDS.boba,
    },
  },
};
