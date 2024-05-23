/* eslint-disable react/jsx-key */

import { getTransactionById } from '@/utils/pathfinder';
import { getFrameMessage, TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { zeroAddress } from 'viem';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const json = await req.json();
  const searchParams = new URLSearchParams(req.url.split('?')[1]);
  const sessionKey = searchParams.get('sessionKey');

  const frameMessage = await getFrameMessage(json);

  if (!sessionKey) {
    throw new Error('No session key');
  }
  if (
    !frameMessage ||
    !frameMessage?.connectedAddress ||
    frameMessage.connectedAddress === '0x0000000000000000000000000000000000000001' ||
    frameMessage.connectedAddress === zeroAddress
  ) {
    throw new Error('No connected address');
  }

  const quote = await getTransactionById({
    key: sessionKey,
    sender: frameMessage.connectedAddress,
  });

  if (!quote) {
    throw new Error('No quote');
  }

  return NextResponse.json({
    chainId: `eip155:${quote.source.chainId}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      to: quote.txn.to,
      value: quote.txn.value,
      data: quote.txn.data,
    },
  } as TransactionTargetResponse);
};
