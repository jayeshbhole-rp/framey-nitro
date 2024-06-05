import { createFrames } from 'frames.js/next';

export enum QUOTE_STATUS {
  NONE = 'NONE',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  KEY_ERR = 'KEY_ERR',
  SUCCESS = 'SUCCESS',
}
export type State = {
  skey: string;
  status: QUOTE_STATUS;
  p: {
    amt: string;
    fTA: string;
    fCID: number;
    tTA: string;
    tCID: number;
  };
  l: {
    tTA?: string;
    tCID?: string;
    fTA?: string;
    fCID?: string;
  };
  tx: string;
};

export const initialState: State = {
  skey: '',
  status: QUOTE_STATUS.NONE,
  p: {
    amt: '',
    fTA: '',
    fCID: 0,
    tTA: '',
    tCID: 0,
  },
  l: {},
  tx: '',
};

export const frames = createFrames<State>({
  basePath: '/frames',
  initialState,
  // baseUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
});
