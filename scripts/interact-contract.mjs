import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import {
  createDefaultTestLogger,
  MidnightWalletProvider,
  initializeMidnightProviders,
} from '@midnight-ntwrk/testkit-js';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { Contract } from '../contracts/managed/mass/contract/index.js';
import { WebSocket } from 'ws';
import * as Rx from 'rxjs';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

globalThis.WebSocket = WebSocket;

const NETWORK_ID = 'undeployed';
setNetworkId(NETWORK_ID);

const deployment = JSON.parse(fs.readFileSync('deployment.json', 'utf-8'));
const contractAddress = deployment.contractAddress;

console.log('===============================================================');
console.log('  MIDNIGHT MASS: ON-CHAIN INTERACTION WITH DEPLOYED CONTRACT  ');
console.log('===============================================================');
console.log('Target Contract Address:', contractAddress);

const envConfig = {
  walletNetworkId: NETWORK_ID,
  networkId: NETWORK_ID,
  indexer: deployment.indexerUrl,
  indexerWS: 'ws://127.0.0.1:8088/api/v4/graphql/ws',
  node: deployment.nodeUrl,
  nodeWS: 'ws://127.0.0.1:9944',
  proofServer: deployment.proofServerUrl,
  faucet: '',
};

const GENESIS_SEED = '0000000000000000000000000000000000000000000000000000000000000001';
const logger = createDefaultTestLogger();
const walletProvider = await MidnightWalletProvider.build(logger, envConfig, GENESIS_SEED);

console.log('\n[1/4] Synchronizing Wallet with Local Indexer...');
await walletProvider.start(false);

await Rx.firstValueFrom(
  walletProvider.wallet.state().pipe(
    Rx.filter((s) =>
      Boolean(s.shielded?.state?.progress?.isStrictlyComplete?.() ?? false) &&
      Boolean(s.unshielded?.progress?.isStrictlyComplete?.() ?? false) &&
      Boolean(s.dust?.state?.progress?.isStrictlyComplete?.() ?? false)
    ),
    Rx.timeout({ each: 45000, with: () => Rx.throwError(() => new Error('Sync timeout')) })
  )
);
console.log('✓ Wallet synchronized!');

console.log('\n[2/4] Connecting to Deployed Contract on Midnight Node...');
const zkConfigPath = path.resolve('contracts/managed/mass');
const providers = initializeMidnightProviders(walletProvider, envConfig, {
  zkConfigPath,
  privateStateStoreName: `mass-client-${Date.now()}`,
});

const compiledContract = CompiledContract.make('mass', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath)
);

const deployedContract = await findDeployedContract(providers, {
  compiledContract,
  contractAddress,
  privateStateId: 'massPrivateState',
  initialPrivateState: {},
});
console.log('✓ Found deployed contract on ledger!');

console.log('\n[3/4] Calling `createEscrow` Circuit (Zero-Knowledge Proof Generation)...');
// Generate unique escrow ID
const escrowId = crypto.randomBytes(32);
const milestoneAmount = 100_000n;

console.log('  Escrow ID (Hex)   :', escrowId.toString('hex'));
console.log('  Milestone Amount  :', milestoneAmount.toString(), 'DUST');

const tx = await deployedContract.callTx.createEscrow(
  new Uint8Array(escrowId),
  milestoneAmount
);

console.log('\n===============================================================');
console.log('  >>> ON-CHAIN ESCROW TRANSACTION CONFIRMED ON MIDNIGHT NODE! <<<');
console.log('===============================================================');
console.log('  Transaction ID   :', tx.public.txId);
console.log('  Block Height     :', tx.public.blockHeight);
console.log('  Escrow Status    : ACTIVE (Shielded Commitment Recorded)');
console.log('===============================================================\n');

await walletProvider.stop();
process.exit(0);
