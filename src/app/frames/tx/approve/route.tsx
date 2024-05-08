/* eslint-disable react/jsx-key */

import { ChainIds, wagmiConfig } from '@/constants/wagmiConfig';
import { prepareTransactionRequest, simulateContract, writeContract } from '@wagmi/core';
import { getFrameMessage, TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, erc20Abi, zeroAddress } from 'viem';

export async function POST(req: NextRequest): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage || !frameMessage.state) {
    throw new Error('No frame message');
  }

  let state = JSON.parse(frameMessage.state);

  console.log('state', state);

  const approveCall = encodeFunctionData({
    abi: [
      {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
          {
            name: 'spender',
            type: 'address',
          },
          {
            name: 'amount',
            type: 'uint256',
          },
        ],
        outputs: [
          {
            type: 'bool',
          },
        ],
      },
    ] as const,
    functionName: 'approve',
    args: [state.allowanceTo, BigInt(state.amount)] as [`0x${string}`, bigint],
  });

  return NextResponse.json({
    chainId: state.chainId,
    method: 'eth_sendTransaction',
    params: {
      abi: [erc20Abi[3]],
      to: state.token as `0x${string}`,
      value: '0x0',
      data: approveCall,
    },
  });
}
