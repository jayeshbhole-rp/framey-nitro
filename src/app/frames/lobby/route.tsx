/* eslint-disable react/jsx-key */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { getQuoteById } from '@/utils/pathfinder';
import { Button } from 'frames.js/next';
import { parseUnits, zeroAddress } from 'viem';

const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;

  if (currentState.status === 'NONE') {
    currentState.params = {
      amount: ctx.message?.inputText || '0',
      fromTokenAddress: ctx.searchParams.fromTokenAddress,
      fromTokenChainId: ctx.searchParams.fromTokenChainId,
      toTokenAddress: ctx.searchParams.toTokenAddress,
      toTokenChainId: ctx.searchParams.toTokenChainId,
      senderAddress: ctx.message?.connectedAddress || zeroAddress,
    };
    currentState.sessionKey = ctx.searchParams.sessionKey;
  }

  const quote = await getQuoteById({
    amount: parseUnits(currentState.params.amount, 18).toString(),
    fromTokenAddress: currentState.params.fromTokenAddress,
    fromTokenChainId: currentState.params.fromTokenChainId,
    toTokenAddress: currentState.params.toTokenAddress,
    toTokenChainId: currentState.params.toTokenChainId,
    receiverAddress: currentState.params.senderAddress,
    senderAddress: currentState.params.senderAddress,
    key: currentState.sessionKey,
  });

  currentState.status = quote?.status || QUOTE_STATUS.NONE;

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center justify-center'>
        {!quote?.status || quote?.status === QUOTE_STATUS.PENDING ? (
          <span tw='bg-green-400 text-red-600'>Loading your request</span>
        ) : (
          <span>{quote?.status === QUOTE_STATUS.SUCCESS ? 'Quote Success' : 'Quote Failed'}</span>
        )}
        <span>Amount: {currentState.params.amount}</span>
        <span>Quote Id: {currentState.sessionKey}</span>
        <span>Quote Status: {currentState.status}</span>
      </div>
    ),
    buttons: [
      <Button
        action='post'
        target={{ pathname: '/lobby' }}
      >
        Refresh
      </Button>,
    ],
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
