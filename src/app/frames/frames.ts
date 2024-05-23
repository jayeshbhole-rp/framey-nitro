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
    amount: string;
    fromTokenAddress: string;
    fromChainId: number;
    toTokenAddress: string;
    toChainId: number;
  };
  tx: string;
};

export const initialState: State = {
  skey: '',
  status: QUOTE_STATUS.NONE,
  p: {
    amount: '',
    fromTokenAddress: '',
    fromChainId: 0,
    toTokenAddress: '',
    toChainId: 0,
  },
  tx: '',
};

export const frames = createFrames<State>({
  basePath: '/frames',
  initialState,
});
