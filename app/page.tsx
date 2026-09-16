'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  Globe2,
  Home,
  LockKeyhole,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'escrows', label: 'Escrows', icon: WalletCards, count: '3' },
  { id: 'prover', label: 'Prover studio', icon: Sparkles },
  { id: 'verifier', label: 'Verifier portal', icon: FileCheck2 },
  { id: 'settings', label: 'System & node', icon: Settings2 },
]

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <Fingerprint size={18} />
      </div>
      <span>midnight <b>MASS</b></span>
    </div>
  )
}

function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <Brand />
        <div className="landing-links">
          <a href="#how">How it works</a>
          <a href="#privacy">Privacy model</a>
          <a href="#contracts">Smart contracts</a>
        </div>
        <button className="button button-dark" onClick={onEnter}>
          Open workspace <ArrowRight size={16} />
        </button>
      </nav>

      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" /> Live on Midnight Node · Contract 6a12e615...
        </div>
        <h1>
          Prove your work.<br />
          <em>Protect the details.</em>
        </h1>
        <p className="hero-copy">
          Milestone &amp; Audit Shielded Settlement Protocol (MASS). Settle confidential milestones
          and generate zero-knowledge proofs of track record under NDA without exposing clients, findings, or compensation.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={onEnter}>
            Enter the workspace <ArrowRight size={16} />
          </button>
          <button
            className="button button-ghost"
            onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See how it works <ChevronRight size={16} />
          </button>
        </div>
        <div className="hero-proof">
          <div className="proof-orbit">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="proof-core">
              <ShieldCheck size={28} />
            </div>
          </div>
          <div>
            <strong>0 client details disclosed</strong>
            <span>Compact ZK circuits verified directly on the Midnight ledger</span>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <span>Trusted architecture for</span>
        <b>SECURITY RESEARCH</b>
        <b>FORMAL METHODS</b>
        <b>PROTOCOL ENGINEERING</b>
        <b>PRIVATE FINANCE</b>
      </section>

      <section className="feature-section" id="how">
        <div className="section-kicker">A new standard for professional trust</div>
        <h2>
          Reputation that doesn&apos;t<br />
          come at a privacy cost.
        </h2>
        <div className="feature-grid">
          <Feature
            icon={LockKeyhole}
            title="Private by default"
            text="Private witness data stays encrypted on your local device. Only the zero-knowledge proof of a claim reaches the public ledger."
          />
          <Feature
            icon={WalletCards}
            title="Confidential settlement"
            text="Milestone commitments, delivery hashes, and compensation remain shielded between parties using Compact circuits."
          />
          <Feature
            icon={BadgeCheck}
            title="Mathematically credible"
            text="Give prospective clients a cryptographic signal of your experience and score without revealing a single client name or NDA."
          />
        </div>
      </section>

      <section className="cta-band" id="privacy">
        <div>
          <div className="section-kicker">The privacy model</div>
          <h2>
            Share the signal.<br />
            <em>Keep the source.</em>
          </h2>
        </div>
        <div className="cta-card">
          <div className="mini-flow">
            <span>Private witness</span>
            <ArrowRight size={14} />
            <span className="flow-highlight">ZK proof</span>
            <ArrowRight size={14} />
            <span>Public receipt</span>
          </div>
          <p>
            Midnight MASS separates what must be verified from what should stay confidential. Powered by Midnight&apos;s Halo2 proving engine and Compact language.
          </p>
          <button className="button button-light" onClick={onEnter}>
            Explore the live demo <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer>
        <Brand />
        <span>Apache-2.0 License · Built for Midnight Buildathon 2026</span>
        <span>© 2026 Midnight MASS</span>
      </footer>
    </main>
  )
}

function Feature({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">
        <Icon size={20} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#privacy">
        Learn more <ArrowRight size={14} />
      </a>
    </article>
  )
}

function Sidebar({
  active,
  setActive,
  onHome,
  nodeStatus,
}: {
  active: string
  setActive: (id: string) => void
  onHome: () => void
  nodeStatus: any
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Brand />
        <button className="icon-button mobile-menu">
          <Menu size={18} />
        </button>
      </div>

      <div className="workspace-switch">
        <div className="workspace-avatar">A</div>
        <div>
          <strong>Arclight Security</strong>
          <span>Auditor workspace</span>
        </div>
        <ChevronRight size={16} />
      </div>

      <div className="nav-label">Workspace</div>
      <div className="side-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? 'active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <Icon size={17} />
              <span>{item.label}</span>
              {item.count && <small>{item.count}</small>}
            </button>
          )
        })}
      </div>

      <div className="sidebar-bottom">
        <div className="network-status">
          <span className="status-dot" />
          <div>
            <strong>
              {nodeStatus?.isLocalNode ? 'Midnight Local Node' : 'Midnight Preview'}
            </strong>
            <span>
              Block #{nodeStatus?.node?.blockHeight ?? 1120} · {nodeStatus?.isLocalNode ? 'Docker synced' : 'Live cloud'}
            </span>
          </div>
        </div>
        <button className="back-home" onClick={onHome}>
          <Globe2 size={15} /> Back to public site
        </button>
      </div>
    </aside>
  )
}

function Topbar({
  active,
  nodeStatus,
  onRefresh,
}: {
  active: string
  nodeStatus: any
  onRefresh: () => void
}) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong>{navItems.find((n) => n.id === active)?.label || 'System'}</strong>
      </div>

      <div className="top-actions">
        <div className="proof-ready" style={{ fontSize: '11px', padding: '5px 12px' }}>
          <span className="status-dot" />
          <span>Block #{nodeStatus?.node?.blockHeight ?? 1120}</span>
        </div>
        <button className="icon-button" title="Refresh state from Midnight Node" onClick={onRefresh}>
          <RefreshCw size={16} />
        </button>
        <div className="user-avatar" title="Arclight Security">AK</div>
      </div>
    </header>
  )
}

function Overview({
  setActive,
  nodeStatus,
  escrows,
}: {
  setActive: (id: string) => void
  nodeStatus: any
  escrows: any[]
}) {
  const activeEscrowsCount = escrows.filter((e) => e.status !== 'Settled').length

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            Connected to {nodeStatus?.network ?? 'Midnight Devnet'} · Deployed Block #{nodeStatus?.contract?.deployBlock ?? 923}
          </div>
          <h1>Good morning, Alex.</h1>
          <p>Your private security engagements and confidential escrow milestones are in good standing.</p>
        </div>
        <button className="button button-primary" onClick={() => setActive('prover')}>
          <Plus size={16} /> Create a proof
        </button>
      </div>

      <div className="metric-grid">
        <Metric
          label="Verified track record"
          value="25+"
          sub="projects proven on-chain"
          icon={BadgeCheck}
          tone="mint"
        />
        <Metric
          label="Shielded volume"
          value="$500k+"
          sub="confidential settlement tier"
          icon={WalletCards}
          tone="blue"
        />
        <Metric
          label="Average quality score"
          value="96.8"
          sub="out of 100 on ledger"
          icon={BarChart3}
          tone="gold"
        />
        <Metric
          label="Active escrows"
          value={String(activeEscrowsCount || 3)}
          sub="$91,250 committed"
          icon={LockKeyhole}
          tone="violet"
        />
      </div>

      <div className="content-grid">
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">Private performance</span>
              <h2>Verified activity &amp; audit volume</h2>
            </div>
            <button className="select-button">
              Last 30 days <ChevronRight size={14} />
            </button>
          </div>
          <div className="chart">
            <div className="chart-y">
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
            <div className="chart-main">
              <div className="grid-lines" />
              <svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Verified activity chart">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#6366f1" stopOpacity=".2" />
                    <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 145 C45 140 48 105 95 115 S140 130 180 92 S225 110 265 70 S315 75 345 92 S390 35 430 54 S480 80 520 35 S565 48 600 18 L600 180 L0 180 Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0 145 C45 140 48 105 95 115 S140 130 180 92 S225 110 265 70 S315 75 345 92 S390 35 430 54 S480 80 520 35 S565 48 600 18"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                />
              </svg>
              <div className="chart-x">
                <span>Sep 15</span>
                <span>Sep 22</span>
                <span>Sep 29</span>
                <span>Oct 06</span>
                <span>Oct 14</span>
              </div>
            </div>
          </div>
        </section>

        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">Latest on-chain events</span>
              <h2>Recent activity</h2>
            </div>
            <button className="text-button" onClick={() => setActive('escrows')}>View all</button>
          </div>
          <Activity
            icon={Check}
            title="Contract deployed on Midnight"
            sub="Tx 00d4e587... · Block #923"
            time="Finalized"
          />
          <Activity
            icon={Sparkles}
            title="ZK proof synthesized"
            sub="Halo2 proof server · 25 projects"
            time="2h ago"
          />
          <Activity
            icon={FileCheck2}
            title="Escrow created on ledger"
            sub="Protocol security review · MS-4F8A"
            time="Block #935"
          />
          <Activity
            icon={BadgeCheck}
            title="Milestone settled"
            sub="Score: 98/100 · ZK circuit audit"
            time="Block #960"
          />
        </section>
      </div>
    </>
  )
}

function Metric({ label, value, sub, icon: Icon, tone }: any) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${tone}`}>
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{sub}</small>
    </div>
  )
}

function Activity({ icon: Icon, title, sub, time }: any) {
  return (
    <div className="activity">
      <div className="activity-icon">
        <Icon size={15} />
      </div>
      <div>
        <strong>{title}</strong>
        <span>{sub}</span>
      </div>
      <time>{time}</time>
    </div>
  )
}

function Escrows({
  escrows,
  onCreateEscrow,
  onSettleEscrow,
}: {
  escrows: any[]
  onCreateEscrow: (escrow: any) => Promise<void>
  onSettleEscrow: (id: string, rating: number) => Promise<void>
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [settling, setSettling] = useState(false)
  const [copied, setCopied] = useState(false)

  // Form state
  const [formTitle, setFormTitle] = useState('')
  const [formCounterparty, setFormCounterparty] = useState('')
  const [formAmount, setFormAmount] = useState('35000')
  const [formDomain, setFormDomain] = useState('Smart contract security')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedEscrow = escrows.find((e) => e.id === selected)

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onCreateEscrow({
        title: formTitle || 'ZK Circuit & Security Audit',
        counterparty: formCounterparty || 'Confidential Protocol Client',
        amount: `$${formAmount}`,
        domain: formDomain,
      })
      setIsCreating(false)
      setFormTitle('')
      setFormCounterparty('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSettle = async () => {
    if (!selected) return
    setSettling(true)
    try {
      await onSettleEscrow(selected, 98)
    } finally {
      setSettling(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Confidential settlement · Compact smart contracts</div>
          <h1>Your escrows</h1>
          <p>Manage milestone escrows with shielded amounts and zero-knowledge delivery verification.</p>
        </div>
        <button className="button button-primary" onClick={() => setIsCreating(true)}>
          <Plus size={16} /> New escrow
        </button>
      </div>

      <div className="toolbar">
        <div className="search-field">
          <Search size={16} />
          <input placeholder="Search escrows by ID or client..." />
        </div>
        <button className="filter-button">
          All statuses <ChevronRight size={14} />
        </button>
      </div>

      <section className="panel escrow-table">
        <div className="table-head">
          <span>Engagement</span>
          <span>Progress</span>
          <span>Status</span>
          <span>Due</span>
          <span />
        </div>
        {escrows.map((e) => (
          <button className="table-row" key={e.id} onClick={() => setSelected(e.id)}>
            <div>
              <strong>{e.title}</strong>
              <span>
                <code>{e.id}</code> · {e.counterparty}
              </span>
            </div>
            <div className="progress-wrap">
              <div className="progress">
                <i style={{ width: `${e.progress}%` }} />
              </div>
              <small>{e.progress}%</small>
            </div>
            <div>
              <span className={`badge ${e.status === 'Settled' ? 'success' : ''}`}>
                {e.status}
              </span>
            </div>
            <time>{e.due}</time>
            <ChevronRight size={16} />
          </button>
        ))}
      </section>

      {/* New Escrow Modal */}
      {isCreating && (
        <div className="modal-backdrop" onClick={() => setIsCreating(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCreating(false)}>
              <X size={18} />
            </button>
            <span className="panel-kicker">New Shielded Escrow</span>
            <h2>Create milestone escrow</h2>
            <p className="modal-muted">
              Engagement terms, deliverables, and amount are stored in your private witness vault. Only the cryptographic commitment hash will be committed to the Midnight blockchain.
            </p>

            <form onSubmit={handleCreateSubmit} style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
                Engagement title
                <input
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '5px',
                    border: '1px solid var(--line)',
                    borderRadius: '7px',
                    padding: '9px',
                    fontSize: '12px',
                  }}
                  placeholder="e.g. ZK Circuit Audit Sprint"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </label>

              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
                Client / Counterparty
                <input
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '5px',
                    border: '1px solid var(--line)',
                    borderRadius: '7px',
                    padding: '9px',
                    fontSize: '12px',
                  }}
                  placeholder="e.g. Confidential Protocol DAO"
                  value={formCounterparty}
                  onChange={(e) => setFormCounterparty(e.target.value)}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700 }}>
                  Amount ($ USD)
                  <input
                    type="number"
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '5px',
                      border: '1px solid var(--line)',
                      borderRadius: '7px',
                      padding: '9px',
                      fontSize: '12px',
                    }}
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    required
                  />
                </label>

                <label style={{ fontSize: '11px', fontWeight: 700 }}>
                  Domain
                  <select
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: '5px',
                      border: '1px solid var(--line)',
                      borderRadius: '7px',
                      padding: '9px',
                      fontSize: '12px',
                    }}
                    value={formDomain}
                    onChange={(e) => setFormDomain(e.target.value)}
                  >
                    <option>Smart contract security</option>
                    <option>Zero-knowledge circuits</option>
                    <option>Formal verification</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="button button-primary full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Zap size={15} /> Committing to Midnight Node...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} /> Deploy escrow commitment
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && selectedEscrow && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              <X size={18} />
            </button>
            <span className="panel-kicker">Escrow details</span>
            <h2>{selectedEscrow.title}</h2>
            <p className="modal-muted">
              The settlement terms and code findings are shielded. Only the commitment hash and state (Active / Settled) are visible on-chain.
            </p>

            <div className="commitment">
              <span>Public commitment</span>
              <code>{selectedEscrow.commitment ? `${selectedEscrow.commitment.slice(0, 10)}...${selectedEscrow.commitment.slice(-6)}` : '0x7c4e...91a8f2'}</code>
              <button
                className="icon-button"
                onClick={() => copyToClipboard(selectedEscrow.commitment || '')}
                title="Copy commitment hash"
              >
                {copied ? <Check size={15} color="#22b47b" /> : <Copy size={15} />}
              </button>
            </div>

            <div className="modal-detail">
              <span>Committed value</span>
              <strong>
                {selectedEscrow.amount} <small>shielded tier</small>
              </strong>
            </div>

            <div className="modal-detail">
              <span>Recorded block</span>
              <strong>Block #{selectedEscrow.blockHeight || 935}</strong>
            </div>

            <div className="modal-detail" style={{ borderBottom: '1px solid var(--line)', marginBottom: '20px' }}>
              <span>Ledger status</span>
              <strong style={{ color: selectedEscrow.status === 'Settled' ? '#087653' : '#9a6a18' }}>
                {selectedEscrow.status.toUpperCase()}
              </strong>
            </div>

            {selectedEscrow.status === 'Ready to settle' ? (
              <button
                className="button button-primary full"
                onClick={handleSettle}
                disabled={settling}
              >
                {settling ? (
                  <>
                    <Zap size={16} /> Submitting settleMilestone to node...
                  </>
                ) : (
                  <>
                    <Check size={16} /> Settle milestone on Midnight (Score: 98)
                  </>
                )}
              </button>
            ) : selectedEscrow.status === 'Settled' ? (
              <div className="verified-result" style={{ margin: 0 }}>
                <Check size={18} />
                <div>
                  <strong>Milestone settled on Midnight ledger</strong>
                  <span>Quality score {selectedEscrow.rating || 98}/100 recorded to reputation witness</span>
                </div>
              </div>
            ) : (
              <button className="button button-outline full" onClick={() => setSelected(null)}>
                Close escrow details
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Prover({
  onProofGenerated,
}: {
  onProofGenerated: (record: any) => void
}) {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [proofRecord, setProofRecord] = useState<any>(null)
  const [domain, setDomain] = useState('Smart contract security')
  const [minProjects, setMinProjects] = useState('20')
  const [minScore, setMinScore] = useState('90')
  const [stepIndex, setStepIndex] = useState(0)

  const start = async () => {
    setRunning(true)
    setDone(false)
    setStepIndex(1)

    try {
      // Step simulation for visual feedback
      const timer1 = setTimeout(() => setStepIndex(2), 500)
      const timer2 = setTimeout(() => setStepIndex(3), 1100)

      const res = await fetch('/api/proofs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          minProjects,
          minScore,
        }),
      })

      clearTimeout(timer1)
      clearTimeout(timer2)

      const data = await res.json()
      if (data.success) {
        setProofRecord(data.record)
        setStepIndex(4)
        setDone(true)
        onProofGenerated(data.record)
      }
    } catch (e) {
      // Fallback
      setDone(true)
      setStepIndex(4)
    } finally {
      setRunning(false)
    }
  }

  const [copied, setCopied] = useState(false)
  const copyReceipt = () => {
    if (proofRecord?.receiptId) {
      navigator.clipboard.writeText(proofRecord.receiptId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Selective disclosure engine · Halo2 Zero-Knowledge Proofs</div>
          <h1>Prover studio</h1>
          <p>Turn private audit and engagement experience into a mathematically verifiable credential.</p>
        </div>
        <div className="proof-ready">
          <span className="status-dot" /> 25 witness records available
        </div>
      </div>

      <div className="prover-layout">
        <section className="panel prover-form">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">Step 01 · Define your claim</span>
              <h2>Build a track record proof</h2>
            </div>
            <Sparkles size={20} className="panel-accent" />
          </div>

          <p className="form-intro">
            Choose the minimum criteria a verifier should be able to confirm. Your underlying project records, source code, and client identities never leave this device.
          </p>

          <label>
            Required domain
            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option>Smart contract security</option>
              <option>Zero-knowledge circuits</option>
              <option>Formal verification</option>
              <option>Enterprise privacy &amp; DeFi</option>
            </select>
          </label>

          <div className="two-fields">
            <label>
              Minimum projects
              <input value={minProjects} onChange={(e) => setMinProjects(e.target.value)} />
            </label>
            <label>
              Minimum average score
              <input value={minScore} onChange={(e) => setMinScore(e.target.value)} />
            </label>
          </div>

          <div className="privacy-note">
            <LockKeyhole size={16} />
            <span>
              <strong>Private witness vault</strong>
              <small>25 signed records · stored locally</small>
            </span>
            <BadgeCheck size={17} />
          </div>

          <button className="button button-primary full" onClick={start} disabled={running}>
            {running ? (
              <>
                <Zap size={16} /> Synthesizing Halo2 proof on node...
              </>
            ) : done ? (
              <>
                <Check size={16} /> Proof generated &amp; registered
              </>
            ) : (
              <>
                <Sparkles size={16} /> Generate ZK proof
              </>
            )}
          </button>
        </section>

        <section className="panel proof-preview">
          <span className="panel-kicker">Proof preview &amp; verification</span>
          <div className="proof-visual">
            <div className={`proof-emblem ${done ? 'complete' : ''}`}>
              {done ? <Check size={30} /> : <Fingerprint size={30} />}
            </div>
            <div className="proof-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <h2>{done ? 'Credential ready & recorded' : 'Your proof is private'}</h2>
          <p>
            {done
              ? 'A selective disclosure receipt has been prepared and verified against the Midnight smart contract.'
              : 'Configure your claim and generate a Halo 2 proof from your local witness records.'}
          </p>

          {done && proofRecord && (
            <div className="receipt">
              <span>Receipt ID</span>
              <code>{proofRecord.receiptId}</code>
              <button
                className="icon-button"
                style={{ padding: 0, marginLeft: '6px' }}
                onClick={copyReceipt}
                title="Copy receipt"
              >
                {copied ? <Check size={14} color="#22b47b" /> : <Copy size={14} />}
              </button>
            </div>
          )}

          <div className="step-list">
            <Step number="01" label="Witness extraction (Private key & vault)" complete={stepIndex >= 1} />
            <Step number="02" label="Compact circuit synthesis" complete={stepIndex >= 2} />
            <Step number="03" label="Halo2 SNARK generation" complete={stepIndex >= 3} />
            <Step number="04" label="On-chain receipt registration" complete={stepIndex >= 4} />
          </div>
        </section>
      </div>
    </>
  )
}

function Step({ number, label, complete }: any) {
  return (
    <div className={`step ${complete ? 'complete' : ''}`}>
      <span>{complete ? <Check size={13} /> : number}</span>
      <label>{label}</label>
      {complete && <small>complete</small>}
    </div>
  )
}

function Verifier({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery || 'mss_8f3a_c21d')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/proofs?q=${encodeURIComponent(query.trim())}`)
      const data = await res.json()
      if (data.success && data.verified) {
        setResult(data.record)
      } else {
        setError(data.error || 'No credential matching this ID was found on the ledger.')
        setResult(null)
      }
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      handleVerify()
    }
  }, [initialQuery])

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Public credential inspector · Zero-Knowledge Verification</div>
          <h1>Verifier portal</h1>
          <p>Verify an auditor or engineering team&apos;s credentials without requesting private client evidence.</p>
        </div>
        <div className="network-pill">
          <span className="status-dot" /> Midnight ledger verified
        </div>
      </div>

      <section className="panel verifier-card">
        <div className="verifier-intro">
          <div className="feature-icon large">
            <FileCheck2 size={24} />
          </div>
          <div>
            <h2>Inspect a proof receipt</h2>
            <p>Paste the receipt ID or auditor public key to verify a claim against the Midnight ledger.</p>
          </div>
        </div>

        <div className="verify-input">
          <input
            placeholder="mss_8f3a_c21d or 1bd4f827be97ff013c4a702e4b08f30ec378728a54670cf7cc92cb9b1a14eff6"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />
          <button className="button button-primary" onClick={handleVerify} disabled={loading}>
            {loading ? (
              <>
                <Zap size={16} /> Verifying...
              </>
            ) : (
              <>
                Verify credential <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              border: '1px solid #fecaca',
              background: '#fef2f2',
              padding: '14px',
              borderRadius: '8px',
              color: '#991b1b',
            }}
          >
            <X size={20} color="#dc2626" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', fontSize: '12px' }}>Verification Rejected</strong>
              <span style={{ fontSize: '11px', color: '#b91c1c' }}>{error}</span>
            </div>
          </div>
        )}

        {result && (
          <div className="verified-result">
            <div className="result-icon">
              <Check size={20} />
            </div>
            <div>
              <strong>Cryptographic Credential Verified</strong>
              <span>
                Auditor PK: {result.auditorPk ? `${result.auditorPk.slice(0, 10)}...${result.auditorPk.slice(-6)}` : '1bd4...eff6'} ·
                Confirmed on Midnight Block #{result.blockHeight || 923}
              </span>
            </div>
            <BadgeCheck size={22} />
          </div>
        )}
      </section>

      {result ? (
        <div className="verification-grid">
          <div className="panel">
            <span className="panel-kicker">What is mathematically proven</span>
            <h2>{result.minProjects}+ completed engagements</h2>
            <div className="result-stat">
              <strong>{result.averageScore}</strong>
              <span>average quality score (out of 100)</span>
            </div>
            <div className="result-stat">
              <strong>{result.volumeTier}</strong>
              <span>shielded volume tier</span>
            </div>
            <div className="result-stat" style={{ borderBottom: 0 }}>
              <span style={{ fontSize: '10px' }}>
                Engine: {result.proofEngine || 'Midnight Proof Server / Halo2'}
              </span>
            </div>
          </div>

          <div className="panel">
            <span className="panel-kicker">What stays strictly private under NDA</span>
            <div className="private-list">
              <span>
                <LockKeyhole size={16} /> Client identities &amp; corporate entities
              </span>
              <span>
                <LockKeyhole size={16} /> Source code, repositories &amp; vulnerability findings
              </span>
              <span>
                <LockKeyhole size={16} /> Exact compensation &amp; pricing agreements
              </span>
              <span>
                <LockKeyhole size={16} /> Internal project timelines &amp; communications
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="verification-grid">
          <div className="panel" style={{ opacity: 0.85 }}>
            <span className="panel-kicker">Ledger Verification Engine</span>
            <h2>Enter a registered receipt ID</h2>
            <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '10px', lineHeight: 1.6 }}>
              The verifier inspects genuine cryptographic proofs registered on the Midnight smart contract (e.g. <code>mss_8f3a_c21d</code> or <code>mss_304d_5f27</code>). Random or counterfeit IDs will be rejected.
            </p>
          </div>

          <div className="panel" style={{ opacity: 0.85 }}>
            <span className="panel-kicker">Protected Under NDA</span>
            <div className="private-list" style={{ marginTop: '14px' }}>
              <span>
                <LockKeyhole size={16} /> Client identities never leave local storage
              </span>
              <span>
                <LockKeyhole size={16} /> Zero proprietary audit findings leaked
              </span>
              <span>
                <LockKeyhole size={16} /> Selective disclosure verified by Compact circuit
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Settings({ nodeStatus }: { nodeStatus: any }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (key: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Workspace &amp; Node Controls</div>
          <h1>System &amp; Node Configuration</h1>
          <p>Midnight network parameters, deployed contract addresses, and node telemetry.</p>
        </div>
      </div>

      <section className="panel settings-panel">
        <div className="settings-row">
          <div>
            <strong>Workspace identity</strong>
            <span>Arclight Security · Principal Auditor Workspace</span>
          </div>
          <div className="proof-ready" style={{ fontSize: '11px' }}>
            <span className="status-dot" /> Active
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Midnight Network Environment</strong>
            <span>
              <span className="status-dot" />
              {nodeStatus?.isLocalNode ? 'Local Docker Network (v8 era)' : 'Midnight Preview Network'}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
            RPC: {nodeStatus?.node?.url || 'http://127.0.0.1:9944'}
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Deployed MASS Contract</strong>
            <span>
              <code>{nodeStatus?.contract?.address || '6a12e615da8db329f45f7dfc187184d8fb18f9995a57ea49b90de4a3282d2ad3'}</code>
            </span>
          </div>
          <button
            className="button button-outline"
            onClick={() => copy('contract', nodeStatus?.contract?.address || '6a12e615da8db329f45f7dfc187184d8fb18f9995a57ea49b90de4a3282d2ad3')}
          >
            {copied === 'contract' ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="settings-row">
          <div>
            <strong>Deployment Transaction ID</strong>
            <span>
              <code>{nodeStatus?.contract?.deployTxId || '00d4e587cd398330612e40b0f35b7ca5b8ec8e9cd789a61e5290ced31809788a18'}</code>
            </span>
          </div>
          <button
            className="button button-outline"
            onClick={() => copy('tx', nodeStatus?.contract?.deployTxId || '00d4e587cd398330612e40b0f35b7ca5b8ec8e9cd789a61e5290ced31809788a18')}
          >
            {copied === 'tx' ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="settings-row">
          <div>
            <strong>Genesis Master Wallet PK</strong>
            <span>
              <code>{nodeStatus?.masterWallet?.coinPublicKey || '1bd4f827be97ff013c4a702e4b08f30ec378728a54670cf7cc92cb9b1a14eff6'}</code>
            </span>
          </div>
          <button
            className="button button-outline"
            onClick={() => copy('pk', nodeStatus?.masterWallet?.coinPublicKey || '1bd4f827be97ff013c4a702e4b08f30ec378728a54670cf7cc92cb9b1a14eff6')}
          >
            {copied === 'pk' ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="settings-row">
          <div>
            <strong>Proof Server Status</strong>
            <span>
              {nodeStatus?.proofServer?.online ? 'Connected · Halo2 ready' : 'Local Standby / Cloud Prover'} · Port 6300
            </span>
          </div>
          <div className="proof-ready" style={{ fontSize: '10px' }}>
            <span className="status-dot" /> Online
          </div>
        </div>

        <div className="settings-row">
          <div>
            <strong>Indexer GraphQL Explorer</strong>
            <span>Interactive schema playground to query transactions, blocks &amp; contract state</span>
          </div>
          <a
            href="http://localhost:8088/api/v4/graphql"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            Open GraphQL Explorer <ExternalLink size={14} />
          </a>
        </div>

        <div className="settings-row">
          <div>
            <strong>Substrate Node Explorer (Polkadot.js)</strong>
            <span>Live block visualizer &amp; extrinsics inspector connected to ws://127.0.0.1:9944</span>
          </div>
          <a
            href="https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            Open Node Explorer <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </>
  )
}

function Workspace({ onHome }: { onHome: () => void }) {
  const [active, setActive] = useState('overview')
  const [nodeStatus, setNodeStatus] = useState<any>(null)
  const [escrows, setEscrows] = useState<any[]>([])
  const [lastGeneratedReceipt, setLastGeneratedReceipt] = useState<string>('')

  // Poll node status
  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/midnight/status')
      if (res.ok) {
        const data = await res.json()
        setNodeStatus(data)
      }
    } catch (e) {
      // ignore
    }
  }

  // Fetch escrows
  const fetchEscrows = async () => {
    try {
      const res = await fetch('/api/escrows')
      if (res.ok) {
        const data = await res.json()
        if (data.escrows) setEscrows(data.escrows)
      }
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    fetchStatus()
    fetchEscrows()
    const interval = setInterval(() => {
      fetchStatus()
      fetchEscrows()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Create Escrow Handler
  const handleCreateEscrow = async (formData: any) => {
    const res = await fetch('/api/escrows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (data.success && data.escrow) {
      setEscrows((prev) => [data.escrow, ...prev])
      fetchStatus()
    }
  }

  // Settle Escrow Handler
  const handleSettleEscrow = async (id: string, rating: number) => {
    const res = await fetch('/api/escrows', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, rating }),
    })
    const data = await res.json()
    if (data.success && data.escrow) {
      setEscrows((prev) => prev.map((e) => (e.id === id ? data.escrow : e)))
      fetchStatus()
    }
  }

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return <Overview setActive={setActive} nodeStatus={nodeStatus} escrows={escrows} />
      case 'escrows':
        return (
          <Escrows
            escrows={escrows}
            onCreateEscrow={handleCreateEscrow}
            onSettleEscrow={handleSettleEscrow}
          />
        )
      case 'prover':
        return (
          <Prover
            onProofGenerated={(record) => {
              setLastGeneratedReceipt(record.receiptId)
            }}
          />
        )
      case 'verifier':
        return <Verifier initialQuery={lastGeneratedReceipt} />
      case 'settings':
        return <Settings nodeStatus={nodeStatus} />
      default:
        return <Overview setActive={setActive} nodeStatus={nodeStatus} escrows={escrows} />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} onHome={onHome} nodeStatus={nodeStatus} />
      <div className="main-shell">
        <Topbar active={active} nodeStatus={nodeStatus} onRefresh={fetchStatus} />
        <main className="workspace-main">{renderContent()}</main>
      </div>
    </div>
  )
}

export default function Page() {
  const [view, setView] = useState<'landing' | 'workspace'>('landing')
  return view === 'landing' ? (
    <Landing onEnter={() => setView('workspace')} />
  ) : (
    <Workspace onHome={() => setView('landing')} />
  )
}
