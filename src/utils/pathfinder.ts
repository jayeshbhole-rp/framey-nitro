import { PF_SERVER } from '@/constants';
import { QUOTE_STATUS } from '../app/frames/frames';
import { QuoteResponse, TransactionResponse } from '@/types';

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
    const paramsString = new URLSearchParams({ ...params, slippageTolerance: '2' }).toString();
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

export type RequestResponse = {
  status: QUOTE_STATUS;
  quote?: QuoteResponse;
};

export const getRequestById = async (params: {
  args?: {
    fromTokenAddress: string;
    toTokenAddress: string;
    amount: string;
    fromTokenChainId: string;
    toTokenChainId: string;
  };
  key: string;
}) => {
  const body = JSON.stringify({
    params: { ...params.args, partnerId: '0' },
    key: params.key,
  });

  const res = await fetch(`${PF_SERVER}/quote-sync`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: body,
  }).then(async (res) => {
    try {
      return await res.json();
    } catch (e) {
      console.error(`Error getting transaction. Response: ${res}`);
      throw new Error('Error getting transaction');
    }
  });
  return res as RequestResponse;
};

export const getTransactionById = async (params: { key: string; sender: string; receiver?: string }) => {
  const body = JSON.stringify({
    key: params.key,
    sender: params.sender,
    receiver: params.receiver,
  });

  const res = await fetch(`${PF_SERVER}/transaction`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: body,
  }).then(async (res) => {
    try {
      return await res.json();
    } catch (e) {
      console.error(`Error getting transaction. Response: ${res}`);
      throw new Error('Error getting transaction');
    }
  });
  return res as TransactionResponse;
};
