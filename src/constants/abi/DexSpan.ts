export const DexSpanAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenSent',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'handleMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'partnerId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'destChainIdBytes',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'recipient',
        type: 'bytes',
      },
      {
        internalType: 'uint8',
        name: 'depositType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'feeAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'contract IERC20Upgradeable[]',
            name: 'tokens',
            type: 'address[]',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minReturn',
            type: 'uint256',
          },
          {
            internalType: 'uint256[]',
            name: 'flags',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes[]',
            name: 'dataTx',
            type: 'bytes[]',
          },
          {
            internalType: 'bool',
            name: 'isWrapper',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'destToken',
            type: 'bytes',
          },
        ],
        internalType: 'struct DexSpan.SwapParams',
        name: 'swapData',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: 'refundRecipient',
        type: 'address',
      },
    ],
    name: 'swapAndDeposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20Upgradeable[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minReturn',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'flags',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'dataTx',
        type: 'bytes[]',
      },
      {
        internalType: 'bool',
        name: 'isWrapper',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'widgetID',
        type: 'uint256',
      },
    ],
    name: 'swapInSameChain',
    outputs: [
      {
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20Upgradeable[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minReturn',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'flags',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'dataTx',
        type: 'bytes[]',
      },
      {
        internalType: 'bool',
        name: 'isWrapper',
        type: 'bool',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'swapMultiWithRecipient',
    outputs: [
      {
        internalType: 'uint256',
        name: 'returnAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;
