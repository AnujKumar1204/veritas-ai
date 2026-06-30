import React from 'react';
import styles from './StatsPanel.module.css';

export default function StatsPanel({ results }) {
  const done = results.filter(r => r.result && !r.loading);
  const counts = done.reduce((a, r) => {
    const v = r.result.verdict;
    a[v] = (a[v] || 0) + 1;
    return a;
  }, {});
  const avg = done.length
    ? Math.round(done.reduce((s, r) => s + r.result.confidence, 0) / done.length * 100)
    : 0;

  return (
    <div className={styles.panel}>
      <div className={styles.stat}>
        <div className={styles.dot} style={{ background: 'var(--green)' }} />
        <span className={styles.num} style={{ color: 'var(--green)' }}>{counts.True || 0}</span>
        <span className={styles.lbl}>True</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <div className={styles.dot} style={{ background: 'var(--red)' }} />
        <span className={styles.num} style={{ color: 'var(--red)' }}>{counts.False || 0}</span>
        <span className={styles.lbl}>False</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <div className={styles.dot} style={{ background: 'var(--amber)' }} />
        <span className={styles.num} style={{ color: 'var(--amber)' }}>{counts.Uncertain || 0}</span>
        <span className={styles.lbl}>Uncertain</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <div className={styles.dot} style={{ background: 'var(--accent)' }} />
        <span className={styles.num} style={{ color: 'var(--accent-bright)' }}>{avg}%</span>
        <span className={styles.lbl}>Avg confidence</span>
      </div>
    </div>
  );
}
