/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */

import { frames, QUOTE_STATUS } from '@/app/frames/frames';
import { TokenData, tokenWhitelist } from '@/constants';
import { ChainIds, CHAINS } from '@/constants/chains';
import { SourceChainIds, SUPPORTED_SOURCE_CHAINS } from '@/constants/chains/source';
import { capitalize, getImageURI, getTokenData } from '@/utils';
import { Button } from 'frames.js/next';

export const runtime = 'edge';
const joystixFont = fetch(new URL('/public/fonts/joystix_monospace.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);
const ibmPlexMonoFont = fetch(new URL('/public/fonts/IBMPlexMono-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

enum Steps {
  NONE = 'NONE',
  SOURCE_CHAIN = 'SOURCE_CHAIN',
  SOURCE_TOKEN = 'SOURCE_TOKEN',
  DEST_CHAIN = 'DEST_CHAIN',
  DEST_TOKEN = 'DEST_TOKEN',
  AMOUNT = 'AMOUNT',
}

const handleRequest = frames(async (ctx) => {
  const [joystixFontData, ibmPlexMonoFontData] = await Promise.all([joystixFont, ibmPlexMonoFont]);

  let currentState = ctx.state;

  if (ctx.searchParams.newQuote === 'true') {
    currentState.skey = '';
    currentState.status = QUOTE_STATUS.NONE;

    currentState.p = {
      fTA: currentState.l.fTA ? currentState.p.fTA : ctx.searchParams.fromTokenAddress,
      tTA: currentState.l.tTA ? currentState.p.tTA : ctx.searchParams.toTokenAddress,
      fCID: currentState.l.fCID
        ? Number(currentState.p.fCID)
        : (Number(ctx.searchParams.fromChainId || 0) as SourceChainIds),
      tCID: currentState.l.tCID ? Number(currentState.p.tCID) : (Number(ctx.searchParams.toChainId || 0) as ChainIds),
      amt: '',
    };

    // to persist locked values from search params after cancellation
    currentState.l = {
      tTA: currentState.l.tTA || ctx.searchParams.toTokenAddress ? 't' : '',
      tCID: currentState.l.tCID || (Number(ctx.searchParams.toChainId || 0) as ChainIds) ? 't' : '',
      fTA: currentState.l.fTA || ctx.searchParams.fromTokenAddress ? 't' : '',
      fCID: currentState.l.fCID || (Number(ctx.searchParams.fromChainId || 0) as ChainIds) ? 't' : '',
    };
  } else {
    currentState.p = {
      tTA: currentState.p.tTA || ctx.searchParams.toTokenAddress,
      tCID: currentState.p.tCID || (Number(ctx.searchParams.toChainId || 0) as ChainIds),
      fTA: currentState.p.fTA || ctx.searchParams.fromTokenAddress,
      fCID: currentState.p.fCID || (Number(ctx.searchParams.fromChainId || 0) as ChainIds),
      amt: '',
    };
  }

  const { tTA: toTokenAddress, tCID: toChainId, fTA: fromTokenAddress, fCID: fromChainId } = currentState.p;

  let step: Steps = Steps.NONE;

  let toTokenData: TokenData | undefined = undefined;
  let fromTokenData: TokenData | undefined = undefined;

  if (!fromChainId) {
    step = Steps.SOURCE_CHAIN;
  } else if (!fromTokenAddress) {
    step = Steps.SOURCE_TOKEN;
  } else if (!toChainId) {
    step = Steps.DEST_CHAIN;
  } else if (!toTokenAddress) {
    step = Steps.DEST_TOKEN;
  } else {
    step = Steps.AMOUNT;

    toTokenData = await getTokenData(toTokenAddress, toChainId);
    fromTokenData = await getTokenData(fromTokenAddress, fromChainId);

    if (!fromTokenData || !toTokenData) {
      console.log('Invalid token configuration');
      throw new Error('Invalid token configuration');
    }
  }

  let buttons: any = [];

  if (step === Steps.AMOUNT) {
    buttons = [
      <Button
        action='post'
        target={{
          pathname: '/lobby',
        }}
      >
        Get Quote
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
  } else if (step === Steps.SOURCE_CHAIN) {
    buttons = SUPPORTED_SOURCE_CHAINS.map((chainId) => (
      <Button
        action='post'
        target={{
          pathname: '/inputs',
          query: {
            fromChainId: chainId,
          },
        }}
      >
        {capitalize(CHAINS[chainId])}
      </Button>
    ));
  } else if (step === Steps.DEST_CHAIN) {
    buttons = SUPPORTED_SOURCE_CHAINS.map((chainId) => (
      <Button
        action='post'
        target={{
          pathname: '/inputs',
          query: {
            toChainId: chainId,
          },
        }}
      >
        {capitalize(CHAINS[chainId])}
      </Button>
    ));
  } else if (step === Steps.DEST_TOKEN) {
    buttons = Object.values(tokenWhitelist[toChainId]).map((token, index) => (
      <Button
        action='post'
        target={{
          pathname: '/inputs',
          query: {
            toTokenAddress: token.address,
          },
        }}
      >
        {capitalize(token.symbol)}
      </Button>
    ));
  }

  return {
    image: (
      <div
        tw='flex h-full w-full flex-col bg-[#fff] text-neutral-100 items-center p-8'
        style={{
          fontFamily: 'Joystix',
        }}
      >
        {/* bg */}
        <img
          tw='absolute top-0 left-0 w-[916px] h-[480px]'
          src={getImageURI('/images/template.png')}
          alt=''
          width={916}
          height={480}
        />

        <div tw='mt-10' />

        {step === Steps.SOURCE_CHAIN && (
          <div tw='flex flex-col items-center'>
            <span tw='text-[2.5rem]'>
              Select <span tw='mx-[1rem] text-red-500'>Source</span> Chain
            </span>

            <div tw='mt-4' />

            <div tw='flex flex-col items-start mx-auto'>
              {SUPPORTED_SOURCE_CHAINS.map((chainId, index) => (
                <div
                  tw='flex items-center mt-4'
                  key={chainId}
                >
                  <span tw='text-[1.75rem]'>{index + 1}.</span>

                  <img
                    tw='w-[2rem] h-[2rem] mr-4'
                    src={getImageURI(`/images/chains/${CHAINS[chainId]}.png`)}
                    width={64}
                    height={64}
                    alt=''
                  />
                  <span tw='text-[1.75rem]'>{CHAINS[chainId]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === Steps.DEST_CHAIN && (
          <div tw='flex flex-col items-center'>
            <span tw='text-[2.5rem]'>
              Select <span tw='mx-[1rem] text-green-500'>Destination</span> Chain
            </span>

            <div tw='mt-4' />

            <div tw='flex flex-col items-start mx-auto'>
              {SUPPORTED_SOURCE_CHAINS.map((chainId, index) => (
                <div
                  tw='flex items-center mt-4'
                  key={chainId}
                >
                  <span tw='text-[1.75rem]'>{index + 1}.</span>

                  <img
                    tw='w-[2rem] h-[2rem] mr-4'
                    src={getImageURI(`/images/chains/${CHAINS[chainId]}.png`)}
                    width={64}
                    height={64}
                    alt=''
                  />
                  <span tw='text-[1.75rem]'>{CHAINS[chainId]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === Steps.DEST_TOKEN && (
          <div tw='flex flex-col items-center'>
            <span tw='text-[2.5rem]'>
              Select <span tw='mx-[1rem] text-green-500'>Destination</span> Token
            </span>

            <div tw='mt-4' />

            <div tw='mx-auto flex flex-wrap'>
              {Object.values(tokenWhitelist[toChainId]).map((token, index) => (
                <div
                  tw='flex items-center m-4'
                  key={token.address}
                >
                  <span tw='text-[1.75rem]'>{index + 1}.</span>

                  {/* <img
                    tw='w-[3rem] h-[3rem] mr-4'
                    src={getImageURI(`/images/tokens/${[token.address]}.png`)}
                    width={64}
                    height={64}
                    alt=''
                  /> */}
                  <span tw='text-[1.75rem]'>{token.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === Steps.AMOUNT && fromTokenData && toTokenData && (
          <div tw='flex flex-col items-center mx-auto'>
            <span tw='text-[3rem] text-center'>Enter Amount To Zap</span>

            <div tw='flex flex-col items-start mx-auto'>
              <div tw='flex items-center mt-4 mr-4'>
                -
                <img
                  tw='w-[3rem] h-[3rem] mx-4'
                  src={getImageURI(`/images/chains/${CHAINS[fromChainId as ChainIds]}.png`)}
                  width={64}
                  height={64}
                  alt=''
                />
                <span tw='text-[2.5rem] text-red-500'>{fromTokenData.symbol}</span>
              </div>

              <div tw='flex items-center mt-4 mr-4'>
                +
                <img
                  tw='w-[3rem] h-[3rem] mx-4'
                  src={getImageURI(`/images/chains/${CHAINS[toChainId as ChainIds]}.png`)}
                  width={64}
                  height={64}
                  alt=''
                />
                <span tw='text-[2.5rem] text-lime-500'>{toTokenData.symbol}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    textInput: step === Steps.AMOUNT ? 'Enter the amount of ETH to zap' : undefined,
    buttons: buttons,
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
