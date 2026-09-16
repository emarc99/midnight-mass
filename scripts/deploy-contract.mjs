import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import {
  createDefaultTestLogger,
  MidnightWalletProvider,
  initializeMidnightProviders,
} from '@midnight-ntwrk/testkit-js';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { Contract } from '../contracts/managed/mass/contract/index.js';
import { WebSocket } from 'ws';
import * as Rx from 'rxjs';
import path from 'path';
import fs from 'fs';

globalThis.WebSocket = WebSocket;

const NETWORK_ID = 'undeployed';
setNetworkId(NETWORK_ID);

const INDEXER_HTTP = 'http://127.0.0.1:8088/api/v4/graphql';
const INDEXER_WS = 'ws://127.0.0.1:8088/api/v4/graphql/ws';
const NODE_URL = 'http://127.0.0.1:9944';
const NODE_WS = 'ws://127.0.0.1:9944';
const PROOF_SERVER_URL = 'http://127.0.0.1:6300';
const GENESIS_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

console.log('===============================================================');
console.log('  MIDNIGHT MASS: ON-CHAIN DEPLOYMENT TO LOCAL DOCKER NETWORK   ');
console.log('===============================================================');

console.log('\n[1/5] Initializing Master Genesis Wallet...');
const envConfig = {
  walletNetworkId: NETWORK_ID,
  networkId: NETWORK_ID,
  indexer: INDEXER_HTTP,
  indexerWS: INDEXER_WS,
  node: NODE_URL,
  nodeWS: NODE_WS,
  proofServer: PROOF_SERVER_URL,
  faucet: '',
};

const logger = createDefaultTestLogger();
const walletProvider = await MidnightWalletProvider.build(logger, envConfig, GENESIS_SEED);

console.log('\n[2/5] Starting Wallet & Synchronizing with Local Indexer...');
await walletProvider.start(false);

const syncedState = await Rx.firstValueFrom(
  walletProvider.wallet.state().pipe(
    Rx.filter((s) =>
      Boolean(s.shielded?.state?.progress?.isStrictlyComplete?.() ?? false) &&
      Boolean(s.unshielded?.progress?.isStrictlyComplete?.() ?? false) &&
      Boolean(s.dust?.state?.progress?.isStrictlyComplete?.() ?? false)
    ),
    Rx.timeout({ each: 45000, with: () => Rx.throwError(() => new Error('Sync timeout waiting for indexer')) })
  )
);

console.log('✓ Wallet synchronized!');
console.log('  Spendable Dust coins:', syncedState.dust.availableCoins.length);
console.log('  Master Coin Public Key:', walletProvider.getCoinPublicKey());

console.log('\n[3/5] Initializing Midnight Providers & Proof Pipeline...');
const zkConfigPath = path.resolve('contracts/managed/mass');
const providers = initializeMidnightProviders(walletProvider, envConfig, {
  zkConfigPath,
  privateStateStoreName: `mass-deployer-${Date.now()}`,
});

console.log('\n[4/5] Binding Compiled Contract Artifacts...');
const compiledContract = CompiledContract.make('mass', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath)
);

console.log('\n[5/5] Deploying MASS Contract On-Chain (Zero-Knowledge Proof + Submitting Block)...');
try {
  const deployed = await deployContract(providers, {
    compiledContract,
    initialPrivateState: {},
  });

  const contractAddress = deployed.deployTxData.public.contractAddress;
  const txId = deployed.deployTxData.public.txId;
  const blockHeight = deployed.deployTxData.public.blockHeight;

  console.log('\n===============================================================');
  console.log('  >>> MIDNIGHT MASS CONTRACT DEPLOYED ON-CHAIN SUCCESSFULLY! <<<');
  console.log('===============================================================');
  console.log('  Contract Address :', contractAddress);
  console.log('  Deployment Tx ID :', txId);
  console.log('  Finalized Block  :', blockHeight);
  console.log('===============================================================\n');

  // Persist deployment address
  const deploymentInfo = {
    contractAddress,
    txId,
    blockHeight,
    networkId: NETWORK_ID,
    deployedAt: new Date().toISOString(),
    indexerUrl: INDEXER_HTTP,
    nodeUrl: NODE_URL,
    proofServerUrl: PROOF_SERVER_URL,
  };

  fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
  console.log('✓ Saved deployment details to deployment.json');

  // Update .env file
  let envContent = '';
  if (fs.existsSync('.env')) {
    envContent = fs.readFileSync('.env', 'utf-8');
  }
  const addressRegex = /^VITE_MASS_CONTRACT_ADDRESS=.*$/m;
  if (addressRegex.test(envContent)) {
    envContent = envContent.replace(addressRegex, `VITE_MASS_CONTRACT_ADDRESS=${contractAddress}`);
  } else {
    envContent += `\nVITE_MASS_CONTRACT_ADDRESS=${contractAddress}\n`;
  }
  fs.writeFileSync('.env', envContent.trim() + '\n');
  console.log('✓ Updated .env with VITE_MASS_CONTRACT_ADDRESS');

  await walletProvider.stop();
  process.exit(0);
} catch (err) {
  console.error('\n>>> CONTRACT DEPLOYMENT FAILED:');
  console.error(err);
  await walletProvider.stop();
  process.exit(1);
}
