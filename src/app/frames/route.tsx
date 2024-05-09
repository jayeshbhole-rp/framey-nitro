/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames, initialState, QUOTE_STATUS } from './frames';
import { NATIVE } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import { PATH_FINDER_API_URL } from '@/utils/pathfinder';

const handleRequest = frames(async (ctx) => {
  const currentState = initialState;

  const sessionKey = uuidv4();

  fetch(PATH_FINDER_API_URL, {
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
        <span>Bridge MATIC to DEGEN</span>
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
            fromTokenChainId: '137',
            toTokenAddress: '0x4ed4e862860bed51a9570b96d89af5e1b0efefed',
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
