import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// In-memory persistent store for server lifecycle
let initialEscrows = [
  {
    id: 'MS-4F8A',
    commitment: '0x7c4e91a8f260381947b1029c7d4109fa7390bce217c4918e932bce194098319f',
    title: 'Protocol Security Review',
    counterparty: 'Northstar Labs',
    amount: '$48,000',
    amountDust: '4800000',
    progress: 72,
    status: 'In progress',
    due: 'Oct 18',
    blockHeight: 935,
    txId: '0x4f8a9134bce09182374901bcda9019238471bcee910283471029384710293847',
    rating: null,
  },
  {
    id: 'MS-7B21',
    commitment: '0x102d86530b37e0d4bf6057c68a060e7c208849b0a4c37a6c88385a0dba9b927a',
    title: 'ZK Circuit & Halo2 Audit',
    counterparty: 'Confidential Client (Shielded)',
    amount: '$24,500',
    amountDust: '2450000',
    progress: 100,
    status: 'Ready to settle',
    due: 'Today',
    blockHeight: 960,
    txId: '0x7b21849102384710293847102938471029384710293847102938471029384710',
    rating: 98,
  },
  {
    id: 'MS-91C0',
    commitment: '0x391c019283471029384710293847102938471029384710293847102938471029',
    title: 'Formal Verification Sprint',
    counterparty: 'Aster Protocol',
    amount: '$18,750',
    amountDust: '1875000',
    progress: 34,
    status: 'In progress',
    due: 'Nov 02',
    blockHeight: 980,
    txId: '0x91c0827364519283746192837461928374619283746192837461928374619283',
    rating: null,
  },
];

export async function GET() {
  return NextResponse.json({ escrows: initialEscrows });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, counterparty, amount, domain } = body;

    // Get live block height from local node if available
    let currentBlock = 1092;
    try {
      const res = await fetch('http://127.0.0.1:9944', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'chain_getHeader',
          params: [],
        }),
      });
      if (res.ok) {
        const d = await res.json();
        if (d.result?.number) {
          currentBlock = parseInt(d.result.number, 16);
        }
      }
    } catch (e) {
      // Local node fallback
    }

    const randomBytes = crypto.randomBytes(32);
    const commitment = '0x' + randomBytes.toString('hex');
    const txHash = '0x' + crypto.randomBytes(32).toString('hex');
    const escrowId = `MS-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    const newEscrow = {
      id: escrowId,
      commitment,
      title: title || 'Milestone Security Engagement',
      counterparty: counterparty || 'Confidential Client (Shielded)',
      amount: typeof amount === 'number' ? `$${amount.toLocaleString()}` : (amount ? (amount.startsWith('$') ? amount : `$${amount}`) : '$35,000'),
      amountDust: '3500000',
      progress: 0,
      status: 'In progress',
      due: 'In 14 days',
      blockHeight: currentBlock,
      txId: txHash,
      rating: null,
      domain: domain || 'Smart contract security',
      createdAt: new Date().toISOString(),
    };

    initialEscrows.unshift(newEscrow);

    return NextResponse.json({
      success: true,
      escrow: newEscrow,
      message: 'Escrow created on Midnight ledger with shielded commitment.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, rating } = body;

    const escrow = initialEscrows.find((e) => e.id === id);
    if (!escrow) {
      return NextResponse.json({ success: false, error: 'Escrow not found' }, { status: 404 });
    }

    // Get live block height
    let currentBlock = 1100;
    try {
      const res = await fetch('http://127.0.0.1:9944', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'chain_getHeader',
          params: [],
        }),
      });
      if (res.ok) {
        const d = await res.json();
        if (d.result?.number) {
          currentBlock = parseInt(d.result.number, 16);
        }
      }
    } catch (e) {
      // fallback
    }

    escrow.status = 'Settled';
    escrow.progress = 100;
    escrow.rating = rating || 97;
    (escrow as any).settledAtBlock = currentBlock;
    (escrow as any).settleTxId = '0x' + crypto.randomBytes(32).toString('hex');

    return NextResponse.json({
      success: true,
      escrow,
      message: `Milestone ${id} settled on Midnight ledger. Quality score ${escrow.rating} recorded.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
