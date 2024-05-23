/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import { ChainIds, CHAINS } from '@/constants/wagmiConfig';
import { getImageURI } from '@/utils';
import { Button } from 'frames.js/next';
import { NATIVE, PF_SERVER, tokenWhitelist } from '../../constants';
import { frames } from './frames';

export const runtime = 'edge';
const joystixFont = fetch(new URL('/public/fonts/joystix_monospace.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);
const ibmPlexMonoFont = fetch(new URL('/public/fonts/IBMPlexMono-Regular.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

const handleRequest = frames(async (ctx) => {
  const [joystixFontData, ibmPlexMonoFontData] = await Promise.all([joystixFont, ibmPlexMonoFont]);

  fetch(PF_SERVER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((err) => {
    console.error(err);
  });

  const toTokenAddress = ctx.searchParams.toTokenAddress;
  const toChainId = Number(ctx.searchParams.toChainId) as ChainIds;

  const tokenData = tokenWhitelist[toChainId]?.[toTokenAddress];

  if (toTokenAddress && toChainId && !tokenData) {
    throw new Error('Token not supported');
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
          <span tw='text-[2rem]'>{tokenData ? 'Zap To' : 'Zap With'}</span>
          {tokenData ? (
            <span tw='text-yellow-500 flex justify-center items-center'>
              <img
                tw='w-[3rem] h-[3rem] mr-2 my-auto'
                src={getImageURI(`/images/${CHAINS[toChainId]}.png`)}
                width={64}
                height={64}
                alt=''
              />
              <span tw='text-[3rem]'>${tokenData.symbol}</span>
            </span>
          ) : (
            <span tw='text-yellow-500 flex justify-center items-center'>
              <span tw='text-[3rem]'>Nitro</span>
            </span>
          )}
          <span tw='text-[2rem]'>In a Blink!</span>
        </div>

        <div tw='flex absolute w-[916px] bottom-[6rem] left-0 justify-center'>Zap From</div>
        <div tw='flex absolute w-[916px] bottom-2 left-0 justify-center'>
          <img
            tw='w-[4rem] h-[4rem]'
            src={getImageURI('/images/chains/ethereum.png')}
            width={64}
            height={64}
            alt=''
          />
          <img
            tw='w-[4rem] h-[4rem]'
            src={getImageURI('/images/chains/base.png')}
            width={64}
            height={64}
            alt=''
          />
          <img
            tw='w-[4rem] h-[4rem]'
            src={getImageURI('/images/chains/optimism.png')}
            width={64}
            height={64}
            alt=''
          />
          <img
            tw='w-[4rem] h-[4rem]'
            src={getImageURI('/images/chains/arbitrum.png')}
            width={64}
            height={64}
            alt=''
          />
        </div>
      </div>
    ),
    buttons: [
      <Button
        action='post'
        target={{
          pathname: '/inputs',
          query: {
            toTokenAddress: tokenData ? tokenData.address : '',
            toChainId: tokenData ? toChainId : '',
            fromTokenAddress: NATIVE,
            newQuote: 'true',
          },
        }}
      >
        Start Bridging
      </Button>,
    ],
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
