import Home from '@/components/Home';
import { fetchMetadata } from 'frames.js/next';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: 'Nitro Frames | Router Protocol',
    other: await fetchMetadata(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/frames/home?toTokenAddress=${searchParams.toTokenAddress}&toChainId=${searchParams.toChainId}`
        : `http://localhost:3000/frames/home?toTokenAddress=${searchParams.toTokenAddress}&toChainId=${searchParams.toChainId}`,
    ),
  };
}

export default function Page() {
  return <Home />;
}
