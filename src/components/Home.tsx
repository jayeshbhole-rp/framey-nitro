'use client';
import { TokenData } from '@/constants';
import { CHAIN_IDS, ChainIds, CHAINS, CHAINS_DATA } from '@/constants/chains';
import { capitalize, getTokenData } from '@/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isAddress } from 'viem';

const ExampleFrame = dynamic(() => import('./ExampleFrame'), {
  ssr: false,
});

const Home = () => {
  const [toChainId, setToChainId] = useState<ChainIds>(CHAIN_IDS.base);
  const [toTokenAddress, setToTokenAddress] = useState<string>('');

  // debounced values
  const [debouncedToTokenAddress, setDebouncedToTokenAddress] = useState('');

  // debouncing to prevent multiple requests
  useEffect(() => {
    const timeout = setTimeout(() => {
      toTokenAddress && isAddress(toTokenAddress) && setDebouncedToTokenAddress(toTokenAddress);
    }, 500);

    return () => clearTimeout(timeout);
  }, [toTokenAddress]);

  const [tokenData, setTokenData] = useState<TokenData>();

  useEffect(() => {
    if (!debouncedToTokenAddress) {
      setTokenData(undefined);
      return;
    }

    getTokenData(debouncedToTokenAddress, toChainId)
      .then((data) => setTokenData(data))
      .catch((err) => console.error(err));
  }, [debouncedToTokenAddress, toChainId]);

  return (
    <>
      <Image
        className='absolute right-0 top-0 z-0 h-1/2 select-none object-contain'
        src={'/images/bolt.png'}
        alt=''
        width={480}
        height={480}
        draggable={false}
      />
      <div className='relatice mx-auto flex min-h-screen w-full max-w-[50ch] flex-col items-center justify-center gap-10 py-32'>
        <h1 className='flex items-end justify-center gap-[1ch] font-joystix text-4xl'>
          Framey Nitro
          <Image
            src='/images/thunder.png'
            alt='Thunder'
            className='h-12 object-contain'
            width={48}
            height={48}
          />
        </h1>

        <ol
          className='max-w-[50ch] list-decimal leading-10'
          type='1'
        >
          <li>
            <span className='text-yellow-500'>Zap</span> tokens right from your Warpcast feed!
          </li>

          <li>Enjoy the cheapest and fastest bridge in one frame.</li>

          <li>Create frames for your tokens and share them with your frens.</li>
        </ol>

        <Link
          href='https://app.routernitro.com'
          target='_blank'
          className='cursor-pointer rounded-sm border-2 border-neutral-800 bg-neutral-800 p-2 px-6 text-yellow-500 transition-colors duration-200 ease-in-out hover:border-yellow-500 hover:bg-neutral-800 focus:outline-yellow-500'
        >
          Open Nitro App
        </Link>

        <hr className='my-4 h-2 w-[50ch] border-neutral-400' />

        <h2 className='font-joystix text-2xl'>Create a zap frame</h2>

        <div className='flex w-full flex-col gap-1'>
          <label htmlFor='toChainId'>Token Chain Id</label>

          <select
            name='toChainId'
            id='toChainId'
            value={toChainId}
            onChange={(e) => setToChainId(Number(e.target.value) as ChainIds)}
            className='w-full rounded-sm border-[1px] border-yellow-500 bg-neutral-600 p-2 px-4 text-yellow-500 focus:outline-yellow-500'
          >
            {Object.values(CHAIN_IDS).map((chainId) => (
              <option
                key={chainId}
                value={chainId}
              >
                {capitalize(CHAINS[chainId])}
              </option>
            ))}
          </select>
        </div>

        <div className='flex w-full flex-col gap-1'>
          <label htmlFor='toTokenAddress'>Token Address</label>
          <div className='relative w-full'>
            <input
              type='text'
              id='toTokenAddress'
              className='w-full rounded-sm border-[1px] border-yellow-500 bg-neutral-600 p-2 px-4 text-yellow-500 focus:outline-yellow-500'
              value={toTokenAddress}
              onChange={(e) => setToTokenAddress(e.target.value.trim())}
            />

            <button
              className='absolute bottom-[1px] right-1 cursor-pointer rounded-sm border-2 border-neutral-800 bg-neutral-800 p-2 px-6 text-sm text-yellow-500 transition-colors duration-200 ease-in-out hover:border-yellow-500 focus:outline-yellow-500'
              onClick={(e) => {
                navigator.clipboard.readText().then((text) => {
                  isAddress(text.trim()) && setToTokenAddress(text.trim());
                });
              }}
            >
              Paste
            </button>
          </div>
        </div>

        <div className='flex w-full items-center gap-2'>
          <Image
            src={`/images/chains/${CHAINS[toChainId]}.png`}
            alt={CHAINS[toChainId]}
            className='h-8 object-contain'
            width={48}
            height={48}
          />

          <Link
            href={`${CHAINS_DATA[toChainId].blockExplorers?.default.url}/address/${toTokenAddress}`}
            target='_blank'
            className='font-joystix text-xl text-yellow-500 underline underline-offset-4'
          >
            {tokenData?.symbol}
          </Link>

          <button
            className='ml-auto cursor-pointer rounded-sm border-2 border-neutral-800 bg-neutral-800 p-2 px-6 text-sm text-yellow-500 transition-colors duration-200 ease-in-out hover:border-yellow-500 focus:outline-yellow-500'
            onClick={(e) => {
              navigator.clipboard.writeText(
                `${window.location.origin}/frames?toChainId=${toChainId}&toTokenAddress=${toTokenAddress}`,
              );
            }}
            disabled={!tokenData}
          >
            Copy Frame Link
          </button>
        </div>

        <ExampleFrame
          toChainId={toChainId}
          toTokenAddress={toTokenAddress}
        />
      </div>
    </>
  );
};

export default Home;
