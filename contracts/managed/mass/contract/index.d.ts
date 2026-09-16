import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  createEscrow(context: __compactRuntime.CircuitContext<PS>,
               escrowId_0: Uint8Array,
               milestoneAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  settleMilestone(context: __compactRuntime.CircuitContext<PS>,
                  escrowId_0: Uint8Array,
                  qualityRating_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proveTrackRecord(context: __compactRuntime.CircuitContext<PS>,
                   auditorPkHash_0: Uint8Array,
                   receiptHash_0: Uint8Array,
                   qualifyingCount_0: bigint,
                   minScoreFloor_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  disputeEscrow(context: __compactRuntime.CircuitContext<PS>,
                escrowId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refundEscrow(context: __compactRuntime.CircuitContext<PS>,
               escrowId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  createEscrow(context: __compactRuntime.CircuitContext<PS>,
               escrowId_0: Uint8Array,
               milestoneAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  settleMilestone(context: __compactRuntime.CircuitContext<PS>,
                  escrowId_0: Uint8Array,
                  qualityRating_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proveTrackRecord(context: __compactRuntime.CircuitContext<PS>,
                   auditorPkHash_0: Uint8Array,
                   receiptHash_0: Uint8Array,
                   qualifyingCount_0: bigint,
                   minScoreFloor_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  disputeEscrow(context: __compactRuntime.CircuitContext<PS>,
                escrowId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refundEscrow(context: __compactRuntime.CircuitContext<PS>,
               escrowId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  createEscrow(context: __compactRuntime.CircuitContext<PS>,
               escrowId_0: Uint8Array,
               milestoneAmount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  settleMilestone(context: __compactRuntime.CircuitContext<PS>,
                  escrowId_0: Uint8Array,
                  qualityRating_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proveTrackRecord(context: __compactRuntime.CircuitContext<PS>,
                   auditorPkHash_0: Uint8Array,
                   receiptHash_0: Uint8Array,
                   qualifyingCount_0: bigint,
                   minScoreFloor_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  disputeEscrow(context: __compactRuntime.CircuitContext<PS>,
                escrowId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refundEscrow(context: __compactRuntime.CircuitContext<PS>,
               escrowId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly totalEscrowsCreated: bigint;
  readonly totalSettledMilestones: bigint;
  readonly totalVolumeShieldedTier: bigint;
  readonly totalTrackRecordsVerified: bigint;
  escrowStates: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  verifiedAuditorProofs: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
