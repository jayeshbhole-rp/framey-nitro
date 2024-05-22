import { ChainIds } from './wagmiConfig';

export const NATIVE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const PF_SERVER =
  process.env.NODE_ENV === 'production' ? 'https://pathfinder-frames.onrender.com' : 'http://localhost:3200';

export const SUPPORTED_CHAINS: ChainIds[] = [8453, 42161, 10, 1];

export type TokenData = {
  address: string;
  symbol: string;
  chainId: number;
};
export const tokenWhitelist: Record<string, Record<string, TokenData>> = {
  8453: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 8453,
    },
    '0x4ed4e862860bed51a9570b96d89af5e1b0efefed': {
      address: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
      symbol: 'DEGEN',
      chainId: 8453,
    },
  },
  1: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 1,
    },
  },
  10: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 10,
    },
  },
  42161: {
    [NATIVE]: {
      address: NATIVE,
      symbol: 'ETH',
      chainId: 42161,
    },
  },
};
