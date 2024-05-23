import { gqlFetcher } from '.';

const txnQuery = `
query($hash: String!) {
  findNitroTransactionByFilter(hash: $hash) {
    dest_address
    dest_amount
    dest_symbol
    dest_timestamp
    dest_chain_id
    src_tx_hash
    dest_tx_hash
    src_timestamp
    src_chain_id
    src_symbol
    deposit_id
    src_amount
    dest_amount
    src_stable_address
    src_address
    status
    fee_amount
    fee_address
    fee_symbol
    recipient_address
  }
}`;

const VOYAGER_EXPLORER_API_HOST = 'https://api.pro-nitro-explorer-public.routernitro.com';

export const getTransactionFromExplorer = async (hash: string): Promise<NitroTransactionReceipt | undefined> => {
  const txn = await gqlFetcher(VOYAGER_EXPLORER_API_HOST + '/graphql', txnQuery, { hash });
  return txn?.findNitroTransactionByFilter;
};

export interface NitroTransactionReceipt {
  dest_timestamp: number;
  dest_tx_hash: string;
  status: string;
  dest_address: string;
  dest_chain_id: string;
  dest_amount: string;
  dest_symbol: string;
  fee_amount: string;
  fee_address: string;
  fee_symbol: string;
  recipient_address: string;
  deposit_id: string;
  src_amount: string;
  src_timestamp: string;
  src_tx_hash: string;
  src_chain_id: string;
  src_stable_address: string;
  src_address: string;
  src_symbol: string;
}
