/* eslint-disable react/jsx-key */

import { frames } from '@/app/frames/frames';
import { getBridgeFeeInUSD, shortenAddress } from '@/utils';
import { getRequestById } from '@/utils/pathfinder';
import { redirect } from 'frames.js/core';
import { Button } from 'frames.js/next';

const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;

  const txQuote = await getRequestById({
    key: currentState.skey,
  });

  if (!txQuote.quote) {
    console.log('[TX] No data in quote', txQuote);

    return redirect('/frames');
  }

  const bridgeFeeUSD = txQuote.quote.bridgeFee ? await getBridgeFeeInUSD(txQuote.quote.bridgeFee) : 'error';

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center justify-center'>
        <span>Bridge Quote</span>
        <span>Amount: {ctx.searchParams.amount}</span>
        {/* <span>Quote Id: {currentState.skey}</span> */}
        <span>Quote Status: {currentState.status}</span>

        <span tw='mt-8'>
          From: {ctx.searchParams.fromTokenChainId} - {shortenAddress(ctx.searchParams.fromTokenAddress)}
        </span>

        <span>
          To: {ctx.searchParams.toTokenChainId} - {shortenAddress(ctx.searchParams.toTokenAddress)}
        </span>

        <span>Bridge Fee: ${bridgeFeeUSD}</span>
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        post_url={'/tx/explorer'}
        target={{
          pathname: '/tx/bridge',
          query: {
            sessionKey: currentState.skey,
          },
        }}
      >
        Bridge
      </Button>,
    ],
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
