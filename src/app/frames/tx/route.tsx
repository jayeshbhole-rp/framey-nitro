/* eslint-disable react/jsx-key */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { getQuoteById } from '@/utils/pathfinder';
import { Button } from 'frames.js/next';
import { erc20Abi, parseUnits, zeroAddress } from 'viem';
import { readContract } from '@wagmi/core';
import { ChainIds, wagmiConfig } from '@/constants/wagmiConfig';
import { getBridgeFeeInUSD, isTokenETH, shortenAddress } from '@/utils';
import { redirect } from 'frames.js/core';
import { FrameButtonElement } from 'frames.js/types';

const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;
  let requireAllowance = false;
  let allowanceTo = '';

  const quote = await getQuoteById({
    key: currentState.sessionKey,
  });

  if (!quote.data) {
    console.log('[TX] No data in quote', quote);

    return redirect('/frames');
  }

  currentState.status = quote?.status || QUOTE_STATUS.PENDING;

  const bridgeFeeUSD = quote.data.bridgeFee ? await getBridgeFeeInUSD(quote.data.bridgeFee) : 'error';

  const txData = {
    allowanceTo: quote.data.allowanceTo,
    amount: quote.data.destination.tokenAmount,
    bridgeFee: bridgeFeeUSD,
    calldata: quote.data.txn.data,
    estimatedTime: quote.data.estimatedTime,
    to: quote.data.txn.to,
    value: quote.data.txn.value,
  };

  if (currentState.status === QUOTE_STATUS.SUCCESS) {
    // check allowance requirement
    if (!isTokenETH(currentState.params.fromTokenAddress)) {
      const allowance = await readContract(wagmiConfig, {
        abi: erc20Abi,
        address: currentState.params.fromTokenAddress as `0x${string}`,
        functionName: 'allowance',
        args: [currentState.params.senderAddress, txData.allowanceTo] as [`0x${string}`, `0x${string}`],
        chainId: Number(currentState.params.fromTokenChainId) as ChainIds,
      });

      allowanceTo = txData.allowanceTo;

      if (allowance < BigInt(currentState.params.amount)) {
        requireAllowance = true;
      }
    }
  }

  let buttons: [] | [FrameButtonElement] = [];

  if (requireAllowance) {
    buttons = [
      <Button
        action='tx'
        target={{
          query: {
            allowanceTo,
            token: currentState.params.fromTokenAddress,
            amount: currentState.params.amount,
            chainId: currentState.params.fromTokenChainId,
            sender: currentState.params.senderAddress,
          },
          pathname: '/tx/approve',
        }}
      >
        {`Approve Token`}
      </Button>,
    ];
  }

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center justify-center'>
        <span>Bridge Quote</span>
        <span>Amount: {currentState.params.amount}</span>
        {/* <span>Quote Id: {currentState.sessionKey}</span> */}
        <span>Quote Status: {currentState.status}</span>

        <span tw='mt-8'>
          From: {currentState.params.fromTokenChainId} - {shortenAddress(currentState.params.fromTokenAddress)}
        </span>

        <span>
          To: {currentState.params.toTokenChainId} - {shortenAddress(currentState.params.toTokenAddress)}
        </span>

        <span>Bridge Fee: ${bridgeFeeUSD}</span>
      </div>
    ),
    buttons: [
      ...buttons,
      <Button
        action='tx'
        // target={'/tx/bridge'}
        target={{
          pathname: '/tx/bridge',
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
