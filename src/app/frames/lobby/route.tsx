/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { ChainIds, CHAINS } from '@/constants/chains';
import { getBridgeFeeInUSD, getImageURI, getTokenData } from '@/utils';
import { formatNumber } from '@/utils/formatNumber';
import { getRequestById, RequestResponse } from '@/utils/pathfinder';
import { Button } from 'frames.js/next';
import { v4 as uuidv4 } from 'uuid';
import { formatUnits, parseUnits } from 'viem';

export const runtime = 'edge';
export const maxDuration = 15;

const joystixFont = fetch(new URL('/public/fonts/joystix_monospace.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);
const ibmPlexMonoFont = fetch(new URL('/public/fonts/IBMPlexMono-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);
const slippageTolerance = '2';

const handleRequest = frames(async (ctx) => {
  const [joystixFontData, ibmPlexMonoFontData] = await Promise.all([joystixFont, ibmPlexMonoFont]);

  let currentState = ctx.state;

  if (!currentState.skey) {
    const sessionKey = uuidv4();
    currentState.skey = sessionKey;
  }

  let readyForTx = false;
  let bridgeFeeUSD = '0';
  let quoteRequest: RequestResponse;

  if (currentState.status === 'NONE') {
    if (!ctx.message || !ctx.message?.inputText) {
      throw new Error('No input text');
    }

    currentState.p.amt = ctx.message?.inputText || '0';

    quoteRequest = await getRequestById({
      args: {
        amount: parseUnits(currentState.p.amt, 18).toString(),
        fromTokenAddress: currentState.p.fTA,
        fromTokenChainId: currentState.p.fCID.toString(),
        toTokenAddress: currentState.p.tTA,
        toTokenChainId: currentState.p.tCID.toString(),
      },
      key: currentState.skey,
    });

    console.log('quoteRequest', quoteRequest);
  } else {
    quoteRequest = await getRequestById({
      key: currentState.skey,
      args: {
        amount: parseUnits(currentState.p.amt, 18).toString(),
        fromTokenAddress: currentState.p.fTA,
        fromTokenChainId: currentState.p.fCID.toString(),
        toTokenAddress: currentState.p.tTA,
        toTokenChainId: currentState.p.tCID.toString(),
      },
    });
  }

  currentState.status = quoteRequest?.status || QUOTE_STATUS.PENDING;

  if (quoteRequest.status === QUOTE_STATUS.SUCCESS && quoteRequest.quote) {
    readyForTx = true;

    bridgeFeeUSD = quoteRequest.quote.bridgeFee ? await getBridgeFeeInUSD(quoteRequest.quote.bridgeFee) : 'error';
  } else {
    readyForTx = false;
  }

  const {
    tTA: toTokenAddress,
    tCID: toChainId,
    fTA: fromTokenAddress,
    fCID: fromChainId,
    amt: amount,
  } = currentState.p;

  const toTokenData = await getTokenData(toTokenAddress, toChainId);
  const fromTokenData = await getTokenData(fromTokenAddress, fromChainId);

  let buttons: any = [];
  if (readyForTx) {
    buttons = [
      <Button
        action={'tx'}
        post_url={'/tx/explorer'}
        target={{
          pathname: '/tx/bridge',
          query: {
            sessionKey: currentState.skey,
          },
        }}
      >
        Zap
      </Button>,
      <Button
        action='post'
        target={{
          pathname: '/',
          query: {
            toTokenAddress: currentState.l.tTA ? toTokenAddress : '',
            toChainId: currentState.l.tCID ? toChainId : '',
          },
        }}
      >
        Cancel
      </Button>,
    ];
  } else {
    buttons = [
      <Button
        action={'post'}
        target={'/lobby'}
      >
        Refresh
      </Button>,
      <Button
        action='post'
        target={{
          pathname: '/',
          query: {
            toTokenAddress: currentState.l.tTA ? toTokenAddress : '',
            toChainId: currentState.l.tCID ? toChainId : '',
          },
        }}
      >
        Cancel
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
          {!quoteRequest?.status || quoteRequest?.status === QUOTE_STATUS.PENDING ? (
            <span tw='text-yellow-600 text-[2.5rem]'>Crunching Numbers</span>
          ) : quoteRequest?.status === QUOTE_STATUS.SUCCESS ? (
            <span tw='text-yellow-500 text-[2.5rem]'>Accept Quote</span>
          ) : (
            <span tw='text-red-500 text-[2.5rem]'>Failed to Fetch Quote</span>
          )}

          {quoteRequest?.status === QUOTE_STATUS.SUCCESS && quoteRequest.quote && (
            <div tw='flex flex-col text-[2rem] justify-start items-start'>
              <span tw='mt-8 flex flex-col '>
                <span>Zap From</span>
                <span tw='text-red-500'>
                  <img
                    tw='w-[2.5rem] h-[2.5rem] mr-4'
                    src={getImageURI(`/images/chains/${CHAINS[fromChainId as ChainIds]}.png`)}
                    width={64}
                    height={64}
                    alt=''
                  />
                  {formatNumber(formatUnits(BigInt(quoteRequest.quote.source.tokenAmount), fromTokenData.decimals))}{' '}
                  {fromTokenData.symbol}
                </span>
              </span>

              <span tw='mt-8 flex flex-col '>
                <span>Zap To</span>
                <span tw='text-green-500'>
                  <img
                    tw='w-[2.5rem] h-[2.5rem] mr-4'
                    src={getImageURI(`/images/chains/${CHAINS[toChainId as ChainIds]}.png`)}
                    width={64}
                    height={64}
                    alt=''
                  />
                  {formatNumber(formatUnits(BigInt(quoteRequest.quote.destination.tokenAmount), toTokenData.decimals))}{' '}
                  {toTokenData.symbol}
                </span>
              </span>

              <span
                tw='mt-12 text-[1.5rem]'
                style={{
                  fontFamily: 'IBMPlexMono',
                }}
              >
                Bridge Fee ${formatNumber(bridgeFeeUSD)}
              </span>
              <span
                style={{
                  fontFamily: 'IBMPlexMono',
                }}
                tw='mt-2 text-[1.5rem]'
              >
                Slippage {slippageTolerance}%
              </span>
            </div>
          )}
        </div>
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
