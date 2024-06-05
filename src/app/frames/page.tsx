import Home from '@/components/Home';
import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { fetchMetadata } from 'frames.js/next';

const Page = () => {
  return <Home />;
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    other: await fetchMetadata(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/frames/home?toTokenAddress=${searchParams.toTokenAddress}&toChainId=${searchParams.toChainId}`
        : `http://localhost:3000/frames/home?toTokenAddress=${searchParams.toTokenAddress}&toChainId=${searchParams.toChainId}`,
    ),
  };
}

export default Page;
