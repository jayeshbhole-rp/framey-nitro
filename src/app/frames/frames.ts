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
    fromChainId: number;
    toTokenAddress: string;
    toChainId: number;
  };
};

export const initialState: State = {
  sessionKey: '',
  status: QUOTE_STATUS.NONE,
  params: {
    amount: '',
    fromTokenAddress: '',
    fromChainId: 0,
    toTokenAddress: '',
    toChainId: 0,
  },
};

export const frames = createFrames<State>({
  basePath: '/frames',
  initialState,
});
