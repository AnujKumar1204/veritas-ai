import React, { useState } from 'react';
import styles from './ResultCard.module.css';

const VERDICTS = {
  True:      { cls: styles.true,      icon: '✓', label: 'TRUE',      color: 'var(--green)' },
  False:     { cls: styles.false,     icon: '✗', label: 'FALSE',     color: 'var(--red)' },
  Uncertain: { cls: styles.uncertain, icon: '◎', label: 'UNCERTAIN', color: 'var(--amber)' },
};

function ConfBar({ value }) {
  const pct = Math.round(value * 100);
  const cls = pct >= 75 ? styles.barHigh : pct >= 50 ? styles.barMid : styles.barLow;
  return (
    <div className={styles.confRow}>
      <span className={styles.confLabel}>Confidence</span>
      <div className={styles.barTrack}>
        <div className={`${styles.barFill} ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.confPct} style={{ color: pct >= 75 ? 'var(--green)' : pct >= 50 ? 'var(--amber)' : 'var(--red)' }}>
        {pct}%
      </span>
    </div>
  );
}

export default function ResultCard({ claim, result, index, loading }) {
  const [open, setOpen] = useState(true);
  const v = VERDICTS[result?.verdict] || VERDICTS['Uncertain'];

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.loadingRow}>
          <span className={styles.spinner} />
          <span className={styles.loadingText}>
            <span className={styles.loadingIdx}>{String(index + 1).padStart(2, '0')}</span>
            {claim.slice(0, 70)}{claim.length > 70 ? '…' : ''}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${v.cls}`}>
      <button className={styles.header} onClick={() => setOpen(o => !o)}>
        <div className={styles.verdictBadge} style={{ background: `${v.color}18`, border: `1px solid ${v.color}40`, color: v.color }}>
          <span className={styles.verdictIcon}>{v.icon}</span>
          <span className={styles.verdictLabel}>{v.label}</span>
        </div>
        <div className={styles.claimWrap}>
          <span className={styles.claimIdx}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.claimText}>{claim}</span>
        </div>
        <span className={styles.chevron} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      {open && (
        <div className={styles.body}>
          <ConfBar value={result.confidence} />

          <div className={styles.analysisBlock}>
            <span className={styles.blockLabel}>Analysis</span>
            <p className={styles.analysis}>{result.detailed_analysis}</p>
          </div>

          {result.evidence_chunks?.length > 0 && (
            <div className={styles.evidenceBlock}>
              <span className={styles.blockLabel}>Evidence</span>
              {result.evidence_chunks.map((chunk, i) => (
                <div key={i} className={styles.chunk}>
                  <span className={styles.chunkBar} style={{ background: v.color }} />
                  <span className={styles.chunkText}>{chunk}</span>
                </div>
              ))}
            </div>
          )}

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              {result.source || 'Wikipedia'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
