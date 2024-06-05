import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const FrameLink = dynamic(() => import('./FrameLink'), {
  ssr: false,
});

const Home = () => {
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

        <FrameLink />
      </div>
    </>
  );
};

export default Home;
