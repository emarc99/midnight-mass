import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { FluentWalletBuilder } from '@midnight-ntwrk/testkit-js';
import { LedgerParameters } from '@midnight-ntwrk/midnight-js-protocol/ledger';

console.log('Testing Wallet SDK imports and environment setup...');

const networkId = 'undeployed';
setNetworkId(networkId);

const envConfig = {
  walletNetworkId: networkId,
  networkId: networkId,
  indexer: 'http://127.0.0.1:8088/api/v4/graphql',
  indexerWS: 'ws://127.0.0.1:8088/api/v4/graphql/ws',
  node: 'http://127.0.0.1:9944',
  nodeWS: 'ws://127.0.0.1:9944',
  proofServer: 'http://127.0.0.1:6300',
  faucet: '',
};

console.log('Environment configuration ready:', envConfig);
console.log('LedgerParameters initial:', LedgerParameters.initialParameters());
