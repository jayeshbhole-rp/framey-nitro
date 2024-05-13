/* eslint-disable react/jsx-key */

import { frames } from '@/app/frames/frames';
import { Button } from 'frames.js/next';

const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;

  return {
    image: (
      <div tw='flex h-full w-full flex-col gap-2 bg-neutral-900 text-neutral-100 items-center justify-center'>
        EXPLORER
      </div>
    ),
    buttons: [
      <Button
        action='link'
        target={{
          href: `https://explorer.routernitro.com/tx/${ctx.message?.transactionId}`,
        }}
      >
        View Transaction
      </Button>,
    ],
    state: currentState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;