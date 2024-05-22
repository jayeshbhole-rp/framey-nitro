/* eslint-disable react/jsx-key */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { getBridgeFeeInUSD } from '@/utils';
import { getRequestById, RequestResponse } from '@/utils/pathfinder';
import { Button } from 'frames.js/next';
import { v4 as uuidv4 } from 'uuid';
import { parseUnits, zeroAddress } from 'viem';

export const runtime = 'edge';
const joystixFont = fetch(new URL('/public/fonts/joystix_monospace.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);
const ibmPlexMonoFont = fetch(new URL('/public/fonts/IBMPlexMono-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

const handleRequest = frames(async (ctx) => {
  const [joystixFontData, ibmPlexMonoFontData] = await Promise.all([joystixFont, ibmPlexMonoFont]);

  let currentState = ctx.state;

  if (!currentState.sessionKey) {
    const sessionKey = uuidv4();
    currentState.sessionKey = sessionKey;
  }

  let readyForTx = false;
  let bridgeFeeUSD = '0';
  let request: RequestResponse;
  if (currentState.status === 'NONE') {
    if (!ctx.message || !ctx.message?.inputText) {
      throw new Error('No input text');
    }

    currentState.params.amount = ctx.message?.inputText || '0';

    request = await getRequestById({
      args: {
        amount: parseUnits(currentState.params.amount, 18).toString(),
        fromTokenAddress: currentState.params.fromTokenAddress,
        fromTokenChainId: currentState.params.fromChainId.toString(),
        toTokenAddress: currentState.params.toTokenAddress,
        toTokenChainId: currentState.params.toChainId.toString(),
      },
      key: currentState.sessionKey,
    });
  } else {
    request = await getRequestById({
      key: currentState.sessionKey,
    });
  }

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
          <div tw='flex flex-col gap-2'>
            <span tw='mt-8'>
              From: {currentState.params.fromChainId} <br />
              {currentState.params.amount} {currentState.params.fromTokenAddress}
            </span>

            <span>Amount: {currentState.params.amount}</span>

            <span>
              To: {currentState.params.toChainId} <br />
              {currentState.params.toTokenAddress}
            </span>

            <span>Bridge Fee: ${bridgeFeeUSD}</span>
          </div>
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
