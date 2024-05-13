/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { v4 as uuidv4 } from 'uuid';
import { NATIVE, PF_SERVER } from '../../constants';
import { frames, initialState } from './frames';

const handleRequest = frames(async (ctx) => {
  const currentState = initialState;

  const sessionKey = uuidv4();

  currentState.sessionKey = sessionKey;

  fetch(PF_SERVER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((err) => {
    console.error(err);
  });

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center p-8'>
        <span tw='text-[4rem]'>Start bridging to Base!</span>
        <span>Bridge Op ETH to DEGEN</span>
      </div>
    ),
    textInput: 'Enter the amount to bridge',
    buttons: [
      <Button
        action='post'
        target={{
          pathname: '/lobby',
          query: {
            fromTokenAddress: NATIVE,
            fromTokenChainId: '10',
            toTokenAddress: NATIVE,
            toTokenChainId: '8453',
            sessionKey,
          },
        }}
      >
        Get Quote
      </Button>,
    ],
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
