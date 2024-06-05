import Home from '@/components/Home';
import { fetchMetadata } from 'frames.js/next';

export async function generateMetadata() {
  return {
    title: 'Nitro Frames | Router Protocol',
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL('/frames', process.env.VERCEL_URL ? `https://framey-nitro.vercel.app` : 'http://localhost:3000'),
    ),
  };
}

export default function Page() {
  return <Home />;
}
