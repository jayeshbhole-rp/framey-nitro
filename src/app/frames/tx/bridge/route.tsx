/* eslint-disable react/jsx-key */

import { getTransactionById } from '@/utils/pathfinder';
import { getFrameMessage, TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { frames } from '../../frames';
import { DexSpanAbi } from '@/constants/abi/DexSpan';
import { AssetForwarderAbi } from '@/constants/abi/AssetForwarder';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const json = await req.json();
  const searchParams = new URLSearchParams(req.url.split('?')[1]);
  const sessionKey = searchParams.get('sessionKey');

  const frameMessage = await getFrameMessage(json);

  if (!sessionKey) {
    throw new Error('No session key');
  }
  if (!frameMessage || !frameMessage?.connectedAddress) {
    throw new Error('No connected address');
  }

  console.log(frameMessage.connectedAddress);

  const quote = await getTransactionById({
    key: sessionKey,
    sender: frameMessage.connectedAddress,
  });

  if (!quote) {
    throw new Error('No quote');
  }

  console.log({
    chainId: `eip155:${quote.source.chainId}`,
    method: 'eth_sendTransaction',
    params: {
      abi: quote.source.tokenPath ? DexSpanAbi : AssetForwarderAbi,
      to: quote.txn.to,
      value: quote.txn.value,
      data: quote.txn.data,
    },
  });

  return NextResponse.json({
    chainId: `eip155:${quote.source.chainId}`,
    method: 'eth_sendTransaction',
    params: {
      abi: quote.source.tokenPath ? DexSpanAbi : AssetForwarderAbi,
      to: quote.txn.to,
      value: quote.txn.value,
      data: quote.txn.data,
    },
  } as TransactionTargetResponse);
};
