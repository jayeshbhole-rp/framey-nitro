'use client';
import { ChainIds } from '@/constants/chains';
import { fallbackFrameContext, FrameUI } from '@frames.js/render';
import { FarcasterSigner, signFrameAction } from '@frames.js/render/farcaster';
import { FrameImageNext } from '@frames.js/render/next';
import { useFrame } from '@frames.js/render/use-frame';
const farcasterSigner: FarcasterSigner = {
  fid: 1,
  status: 'approved',
  publicKey: '0x00000000000000000000000000000000000000000000000000000000000000000',
  privateKey: '0x00000000000000000000000000000000000000000000000000000000000000000',
};

const ExampleFrame = ({ toChainId, toTokenAddress }: { toChainId: ChainIds; toTokenAddress: string }) => {
  const frameState = useFrame({
    homeframeUrl: `https://framey-nitro.vercel.app/frames?toChainId=${toChainId}&toTokenAddress=${toTokenAddress}`,
    frameActionProxy: '/framesget',
    connectedAddress: undefined,
    frameGetProxy: '/framesget',
    frameContext: fallbackFrameContext,
    signerState: {
      hasSigner: farcasterSigner !== undefined,
      signer: farcasterSigner,
      onSignerlessFramePress: () => {
        alert('A frame button was pressed without a signer. Perhaps you want to prompt a login');
      },
      signFrameAction: signFrameAction,
    },
  });

  return (
    <div className='flex w-full flex-col justify-center gap-4'>
      <h3 className='text-center font-joystix'>Example Zap Frame</h3>
      <FrameUI
        frameState={frameState}
        theme={{}}
        FrameImage={FrameImageNext}
      />

      <span>DO NOT SIGN ANY TRANSACTION FROM EXAMPLE FRAME</span>
    </div>
  );
};

export default ExampleFrame;
