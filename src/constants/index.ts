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
};
