import { PF_SERVER } from '@/constants';
import { QUOTE_STATUS } from '../app/frames/frames';
import { TransactionResponse } from '@/types';

export const PATH_FINDER_API_URL = 'https://api-beta.pathfinder.routerprotocol.com/api';

export const getPfQuote = async (params: {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromTokenChainId: string;
  toTokenChainId: string;
  partnerId: string;
}) => {
  const endpoint = '/v2/quote';

  try {
    // const res = await axios.get(quoteUrl, { params });
    const paramsString = new URLSearchParams(params).toString();
    console.log(`${PATH_FINDER_API_URL}${endpoint}?${paramsString}`);

    const res = await fetch(`${PATH_FINDER_API_URL}${endpoint}?${paramsString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then((res) => res.json());
    return res;
  } catch (e) {
    console.error(`Fetching quote data from pathfinder: ${e}`);
  }
};

export type QuoteResponse = {
  status: QUOTE_STATUS;
  data?: TransactionResponse;
};

export const getQuoteById = async (params: {
  args?: {
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    fromTokenChainId: string;
    toTokenChainId: string;
    senderAddress: string;
    receiverAddress: string;
  };
  key: string;
}) => {
  const options: any = {
    key: params.key,
  };
  if (params.args) {
    options.args = { ...params.args, partnerId: '0' };
  }
  const body = JSON.stringify({
    params: options.args,
    key: params.key,
  });

  const res = await fetch(`${PF_SERVER}/quote`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: body,
  }).then(async (res) => {
    return await res.json();
  });
  return res as QuoteResponse;
};
