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
      <div tw='bg-neutral-900 text-red-600 w-full h-full flex justify-center items-center flex-col'>
        Start bridging to Base!
        <span>Session: {sessionKey}</span>
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
            receiverAddress: '0x0b90994F83D2Fde68f83C418141B42550dE2Cb4c',
            senderAddress: '0x0b90994F83D2Fde68f83C418141B42550dE2Cb4c',
            sessionKey,
          },
        }}
      >
        Get Quote
      </Button>,
      <Button
        action='post'
        target={{ pathname: '/counter' }}
      >
        Counter
      </Button>,
    ],
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
