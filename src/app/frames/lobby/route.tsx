/* eslint-disable react/jsx-key */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { getBridgeFeeInUSD } from '@/utils';
import { getRequestById } from '@/utils/pathfinder';
import { Button } from 'frames.js/next';
import { parseUnits, zeroAddress } from 'viem';

const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;
  let readyForTx = false;
  let bridgeFeeUSD = '0';

  if (!ctx.message || ctx.message?.inputText) {
    throw new Error('No input text');
  }

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

  const request = await getRequestById({
    args: {
      amount: parseUnits(currentState.params.amount, 18).toString(),
      fromTokenAddress: currentState.params.fromTokenAddress,
      fromTokenChainId: currentState.params.fromTokenChainId,
      toTokenAddress: currentState.params.toTokenAddress,
      toTokenChainId: currentState.params.toTokenChainId,
    },
    key: currentState.sessionKey,
  });

  currentState.status = request?.status || QUOTE_STATUS.PENDING;

  if (request.status === QUOTE_STATUS.SUCCESS && request.quote) {
    readyForTx = true;

    bridgeFeeUSD = request.quote.bridgeFee ? await getBridgeFeeInUSD(request.quote.bridgeFee) : 'error';
  } else {
    readyForTx = false;
  }

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center p-4'>
        {!request?.status || request?.status === QUOTE_STATUS.PENDING ? (
          <span tw='text-yellow-600 text-[4rem]'>Crunching Numbers</span>
        ) : request?.status === QUOTE_STATUS.SUCCESS ? (
          <span tw='text-green-500 text-[4rem]'>Accept Quote</span>
        ) : (
          <span tw='text-red-500 text-[4rem]'>Failed to Fetch Quote</span>
        )}

        {request?.status === QUOTE_STATUS.SUCCESS && request.quote && (
          <>
            <span tw='mt-8'>
              From: {currentState.params.fromTokenChainId} <br />
              {currentState.params.amount} {currentState.params.fromTokenAddress}
            </span>

            <span>Amount: </span>

            <span>
              To: {currentState.params.toTokenChainId} <br />
              {currentState.params.toTokenAddress}
            </span>

            <span>Bridge Fee: ${bridgeFeeUSD}</span>
          </>
        )}
      </div>
    ),
    buttons: [
      <Button
        action='post'
        target={{ pathname: readyForTx ? '/tx' : '/lobby' }}
      >
        {readyForTx ? 'Accept Quote' : 'Refresh'}
      </Button>,
    ],
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
