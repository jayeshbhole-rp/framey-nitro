import { BridgeFee } from '@/types';
import { formatUnits } from 'viem';

export const isTokenETH = (address: string) =>
  address && address.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
export const areTokensEqual = (tokenA: string, tokenB: string) => tokenA.toLowerCase() === tokenB.toLowerCase();

export const shortenAddress = (address: string | undefined, chars = 4) =>
  address ? `${address.slice(0, chars + 2)}...${address.slice(-chars)}` : '';

export const getBridgeFeeInUSD = async (quoteBridgeFee: BridgeFee) => {
  const ethPrice = await fetch(`https://price-api.crypto.com/price/v1/token-price/ethereum`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json().then((data) => data.usd_price));

  const feeAmount = quoteBridgeFee?.amount;

  let bridgeFeeUSD = 0,
    bridgeFeeReserve,
    bridgeToken;

  bridgeFeeReserve = Number(formatUnits(BigInt(feeAmount), quoteBridgeFee?.decimals || 18));
  bridgeToken = quoteBridgeFee?.symbol;
  bridgeFeeUSD = bridgeToken === 'ETH' || bridgeToken === 'WETH' ? bridgeFeeReserve * ethPrice : bridgeFeeReserve;

  return bridgeFeeUSD.toString();
};