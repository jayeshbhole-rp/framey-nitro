/* eslint-disable react/jsx-key */

import { frames } from '@/app/frames/frames';
import { Button } from 'frames.js/next';

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

  if (!ctx.message?.transactionId) {
    throw new Error('No transaction ID in message');
  }
  currentState.tx = ctx.message?.transactionId;

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center justify-center'>
        <span tw='text-[4rem] text-green-500'>Transaction Successful</span>

        <span>Track your transaction on the explorer</span>
      </div>
    ),
    buttons: [
      <Button action='post'>Check Status</Button>,
      <Button
        action='link'
        target={`https://explorer.routernitro.com/tx/${ctx.message?.transactionId}`}
      >
        Explorer
      </Button>,
    ],
    state: currentState,
    imageOptions: {
      width: 916,
      height: 480,
      aspectRatio: '1.91:1',
      fonts: [
        {
          name: 'IBMPlexMono',
          data: ibmPlexMonoFontData,
        },
        {
          name: 'Joystix',
          data: joystixFontData,
        },
      ],
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
