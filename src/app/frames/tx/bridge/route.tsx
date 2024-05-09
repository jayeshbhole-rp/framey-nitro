/* eslint-disable react/jsx-key */

import { getTransactionById } from '@/utils/pathfinder';
import { TransactionTargetResponse } from 'frames.js';
import { NextResponse } from 'next/server';
import { frames } from '../../frames';
import { DexSpanAbi } from '@/constants/abi/DexSpan';
import { AssetForwarderAbi } from '@/constants/abi/AssetForwarder';

export const POST = frames(async (ctx) => {
  if (!ctx.message || !ctx.message?.connectedAddress) {
    throw new Error('No connected address');
  }

  console.log(ctx.message.connectedAddress);

  const quote = await getTransactionById({
    key: ctx.searchParams.sessionKey,
    sender: ctx.message.connectedAddress,
  });

  //   console.log('state', frameMessage.state);
  if (!quote) {
    throw new Error('No quote');
  }

  return NextResponse.json({
    chainId: `eip155:${quote.source.chainId}`,
    method: 'eth_sendTransaction',
    params: {
      abi: quote.source.tokenPath ? DexSpanAbi : AssetForwarderAbi,
      to: quote.txn.to as `0x${string}`,
      value: quote.txn.value,
      data: quote.txn.data,
    },
  } as TransactionTargetResponse);
});
