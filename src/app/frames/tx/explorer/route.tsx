/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { frames } from '@/app/frames/frames';
import { tokenWhitelist } from '@/constants';
import { ChainIds, CHAINS } from '@/constants/wagmiConfig';
import { capitalize, getImageURI } from '@/utils';
import { formatNumber } from '@/utils/formatNumber';
import { getTransactionFromExplorer } from '@/utils/getTransactionFromExplorer';
import { Button } from 'frames.js/next';
import { formatUnits } from 'viem';

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

  if (ctx.message?.transactionId) {
    currentState.tx = ctx.message.transactionId;
  }
  if (!currentState.tx) throw new Error('No transaction ID in message');

  const tx = await getTransactionFromExplorer(currentState.tx);

  let buttons: any = [];
  if (tx && (tx.status === 'completed' || tx.status === 'failed')) {
    buttons = [
      <Button
        action='post'
        target='/'
      >
        Zap again
      </Button>,
      <Button
        action='link'
        target={`https://explorer.routernitro.com/tx/${currentState.tx}`}
      >
        Explorer
      </Button>,
    ];
  } else {
    buttons = [
      <Button
        action='post'
        target='/tx/explorer'
      >
        Refresh Status
      </Button>,
      <Button
        action='link'
        target={`https://explorer.routernitro.com/tx/${currentState.tx}`}
      >
        Explorer
      </Button>,
    ];
  }

  return {
    image: (
      <div tw='flex h-full w-full flex-col bg-[#fff] text-neutral-100 items-center p-8'>
        {/* bg */}
        <img
          tw='absolute top-0 left-0 w-[916px] h-[480px]'
          src={getImageURI('/images/template.png')}
          alt=''
          width={916}
          height={480}
        />

        <div tw='mt-10' />

        <div
          tw='flex w-full flex-col items-center'
          style={{
            fontFamily: 'Joystix',
          }}
        >
          {!tx || !tx?.src_tx_hash ? (
            <div
              tw='flex w-full flex-col items-center'
              style={{
                fontFamily: 'Joystix',
              }}
            >
              <span tw='text-[2rem] text-green-500'>
                Submitted on {capitalize(CHAINS[currentState.p.fCID as ChainIds])}
              </span>

              <span>Nitro is looking for your transaction</span>
            </div>
          ) : !tx?.dest_tx_hash ? (
            <div
              tw='flex w-full flex-col items-center'
              style={{
                fontFamily: 'Joystix',
              }}
            >
              <span tw='text-[2rem] text-yellow-500'>
                Zapping to {capitalize(CHAINS[currentState.p.tCID as ChainIds])}
              </span>

              <span tw='text-red-500'>
                <img
                  tw='w-[2.5rem] h-[2.5rem] mr-4'
                  src={getImageURI(`/images/chains/${CHAINS[Number(currentState.p.fCID) as ChainIds]}.png`)}
                  width={64}
                  height={72}
                  alt=''
                />
                {formatNumber(currentState.p.amt)} {tokenWhitelist[currentState.p.fCID][currentState.p.fTA].symbol}
              </span>

              <img
                tw='w-[2rem] h-[3rem] mx-auto'
                src={getImageURI('/images/thunder.png')}
                width={32}
                height={32}
                alt=''
              />

              <span tw='text-green-500'>
                <img
                  tw='w-[2.5rem] h-[2.5rem] mr-4'
                  src={getImageURI(`/images/chains/${CHAINS[Number(currentState.p.tCID) as ChainIds]}.png`)}
                  width={64}
                  height={64}
                  alt=''
                />
                {tokenWhitelist[currentState.p.tCID][currentState.p.tTA].symbol}
              </span>
            </div>
          ) : tx.status === 'completed' ? (
            <div
              tw='flex flex-col items-start'
              style={{
                fontFamily: 'Joystix',
              }}
            >
              <span tw='mx-auto'>Zapped</span>

              <span tw='text-red-500'>
                <img
                  tw='w-[2.5rem] h-[2.5rem] mr-4'
                  src={getImageURI(`/images/chains/${CHAINS[Number(tx.src_chain_id) as ChainIds]}.png`)}
                  width={64}
                  height={72}
                  alt=''
                />
                {formatNumber(tx.src_amount)} {tx?.src_symbol}
              </span>

              <img
                tw='w-[2rem] h-[3rem] mx-auto'
                src={getImageURI('/images/thunder.png')}
                width={32}
                height={32}
                alt=''
              />

              <span tw='text-green-500'>
                <img
                  tw='w-[2.5rem] h-[2.5rem] mr-4'
                  src={getImageURI(`/images/chains/${CHAINS[Number(tx.dest_chain_id) as ChainIds]}.png`)}
                  width={64}
                  height={64}
                  alt=''
                />
                {formatNumber(tx.dest_amount)} {tx?.dest_symbol}
              </span>
            </div>
          ) : (
            <div
              tw='flex w-full flex-col items-center'
              style={{
                fontFamily: 'Joystix',
              }}
            >
              <span tw='text-[2rem] text-red-500'>Zap Failed</span>
            </div>
          )}
        </div>

        <span tw='absolute bottom-4 left-0 w-[916px] flex justify-center text-center'>
          Track your transaction on the explorer
        </span>
      </div>
    ),
    buttons,
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
