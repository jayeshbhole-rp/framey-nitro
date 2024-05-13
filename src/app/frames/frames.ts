import { createFrames } from 'frames.js/next';

export enum QUOTE_STATUS {
  NONE = 'NONE',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  KEY_ERR = 'KEY_ERR',
  SUCCESS = 'SUCCESS',
}
export type State = {
  sessionKey: string;
  status: QUOTE_STATUS;
  params: {
    amount: string;
    fromTokenAddress: string;
    fromTokenChainId: string;
    toTokenAddress: string;
    toTokenChainId: string;
  };
};

export const initialState: State = {
  sessionKey: '',
  status: QUOTE_STATUS.NONE,
  params: {
    amount: '',
    fromTokenAddress: '',
    fromTokenChainId: '',
    toTokenAddress: '',
    toTokenChainId: '',
  },
};

export const frames = createFrames<State>({
  basePath: '/frames',
  initialState,
});
