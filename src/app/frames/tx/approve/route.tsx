/* eslint-disable react/jsx-key */

import { ChainIds, wagmiConfig } from '@/constants/wagmiConfig';
import { getRequestById, getTransactionById } from '@/utils/pathfinder';
import { prepareTransactionRequest, simulateContract, writeContract } from '@wagmi/core';
import { getFrameMessage, TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, erc20Abi, zeroAddress } from 'viem';

export async function POST(req: NextRequest): Promise<NextResponse<TransactionTargetResponse>> {
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

  const quote = await getTransactionById({
    key: sessionKey,
    sender: frameMessage.connectedAddress,
  });

  if (!quote) {
    console.log('[TX] No data in quote');
    throw new Error(`No quote found for session, ${sessionKey}`);
  }

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
    args: [quote.allowanceTo, BigInt(quote.source.tokenAmount)] as [`0x${string}`, bigint],
  });

  return NextResponse.json({
    chainId: `eip155:${quote.source.chainId}`,
    method: 'eth_sendTransaction',
    params: {
      abi: [erc20Abi[3]],
      to: quote.source.asset.address as `0x${string}`,
      value: '0x0',
      data: approveCall,
    },
  });
}
