/* eslint-disable react/jsx-key */

import { getQuoteById } from '@/utils/pathfinder';
import { getFrameMessage, TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { erc20Abi } from 'viem';
import { State } from '../../frames';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage || !frameMessage.state) {
    throw new Error('No frame message');
  }
  let currentState: State = JSON.parse(frameMessage.state);

  const quote = await getQuoteById({
    key: currentState.sessionKey,
  });

  //   console.log('state', frameMessage.state);
  if (!quote.data) {
    return NextResponse.json({});
  }

  return NextResponse.json({
    chainId: `eip155:${currentState.params.fromTokenChainId}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [],
      to: quote.data.txn.to as `0x${string}`,
      value: quote.data?.txn.value,
      data: quote.data?.txn.data,
    },
  } as TransactionTargetResponse);
}
