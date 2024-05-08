export interface BridgeFee {
  amount: string;
  decimals: number;
  symbol: string;
}

export interface Asset {
  decimals: number;
  symbol: string;
  name: string;
  chainId: string;
  address: string;
  resourceID: string;
  isMintable: boolean;
  isWrappedAsset: boolean;
}

export interface TokenResponse {
  chainId: string;
  asset: Asset;
  stableReserveAsset: Asset;
  tokenAmount: string;
  stableReserveAmount: string;
  path: Array<string>;
  flags: Array<string>;
  priceImpact: string;
  tokenPath: string;
  dataTx: Array<string>;
}

export interface QuoteResponse {
  flowType: string;
  isTransfer: boolean;
  isWrappedToken: boolean;
  allowanceTo: string;
  bridgeFee?: BridgeFee;
  source: TokenResponse;
  destination: TokenResponse;
  widgetId: string;
}
export interface TransactionParams extends QuoteResponse {
  fromTokenAddress: string;
  toTokenAddress: string;
  senderAddress: string;
  receiverAddress: string;
  partnerId: string;
  estimatedTime: number;
}

export interface TransactionResponse extends TransactionParams {
  txn: {
    from: string;
    to: string;
    data: string;
    value: string;
  };
}
