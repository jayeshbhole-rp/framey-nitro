/* eslint-disable react/jsx-key */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { getBridgeFeeInUSD } from '@/utils';
import { getQuoteById } from '@/utils/pathfinder';
import { Button } from 'frames.js/next';
import { parseUnits, zeroAddress } from 'viem';

const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;
  let readyForTx = false;
  let bridgeFeeUSD = '0';

  if (!ctx.message) {
    throw new Error('No frame message');
  }
  if (!ctx.message?.connectedAddress) {
    return {
      image: (
        <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center p-4'>
          <span tw='text-red-500 text-[4rem]'>[ERROR] Please connect a wallet to farcaster first</span>
        </div>
      ),
      buttons: [
        <Button
          action='post'
          target={{
            pathname: '/',
          }}
        >
          Try Again
        </Button>,
      ],
      state: currentState,
    };
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

  const quote = await getQuoteById({
    args: {
      amount: parseUnits(currentState.params.amount, 18).toString(),
      fromTokenAddress: currentState.params.fromTokenAddress,
      fromTokenChainId: currentState.params.fromTokenChainId,
      toTokenAddress: currentState.params.toTokenAddress,
      toTokenChainId: currentState.params.toTokenChainId,
      receiverAddress: currentState.params.senderAddress,
      senderAddress: currentState.params.senderAddress,
    },
    key: currentState.sessionKey,
  });

  currentState.status = quote?.status || QUOTE_STATUS.PENDING;

  if (quote.status === QUOTE_STATUS.SUCCESS && quote.data) {
    readyForTx = true;

    bridgeFeeUSD = quote.data.bridgeFee ? await getBridgeFeeInUSD(quote.data.bridgeFee) : 'error';
  }

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center p-4'>
        {!quote?.status || quote?.status === QUOTE_STATUS.PENDING ? (
          <span tw='text-yellow-600 text-[4rem]'>Crunching Numbers</span>
        ) : quote?.status === QUOTE_STATUS.SUCCESS ? (
          <span tw='text-green-500 text-[4rem]'>Accept Quote</span>
        ) : (
          <span tw='text-red-500 text-[4rem]'>Failed to Fetch Quote</span>
        )}

        {quote?.status === QUOTE_STATUS.SUCCESS && quote.data && (
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
