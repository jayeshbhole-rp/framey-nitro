/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next';
import { frames } from './frames';

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <span
        style={{ backgroundColor: 'green' }}
        className='bg-green-400 text-red-600'
      >
        {ctx.pressedButton ? `I clicked ${ctx.searchParams.value}` : `Click some button`}
      </span>
    ),
    buttons: [
      <Button
        action='post'
        target={{ pathname: '/frames/response/yes', query: { value: 'Yes' } }}
      >
        Say Yes
      </Button>,
      <Button
        action='post'
        target={{ pathname: '/frames/response/yes', query: { value: 'No' } }}
      >
        Say No
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
