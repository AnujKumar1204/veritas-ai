import React from 'react';
import styles from './ClaimSelector.module.css';

export default function ClaimSelector({ claims, selected, onToggle, onVerify, loading }) {
  const allSelected = selected.size === claims.length;

  const toggleAll = () => {
    if (allSelected) claims.forEach((_, i) => selected.has(i) && onToggle(i));
    else claims.forEach((_, i) => !selected.has(i) && onToggle(i));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.stepTag}>02</div>
        <div className={styles.headerText}>
          <h2 className={styles.title}>Extracted Claims</h2>
          <p className={styles.subtitle}>{claims.length} factual claim{claims.length !== 1 ? 's' : ''} found — select which to verify</p>
        </div>
        <button className={styles.selectAll} onClick={toggleAll}>
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>

      <div className={styles.list}>
        {claims.map((claim, i) => (
          <button
            key={i}
            className={`${styles.claimRow} ${selected.has(i) ? styles.selected : ''}`}
            onClick={() => onToggle(i)}
          >
            <div className={`${styles.checkbox} ${selected.has(i) ? styles.checked : ''}`}>
              {selected.has(i) && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="2 6 5 9 10 3"/>
                </svg>
              )}
            </div>
            <span className={styles.claimIdx}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.claimText}>{claim}</span>
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.countLabel}>
          <span className={styles.countNum}>{selected.size}</span> of {claims.length} selected
        </span>
        <button
          className={styles.verifyBtn}
          onClick={onVerify}
          disabled={selected.size === 0 || loading}
        >
          {loading ? (
            <><span className={styles.spinner} />Verifying…</>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Verify {selected.size > 0 ? selected.size : ''} claim{selected.size !== 1 ? 's' : ''}
            </>
          )}
        </button>
      </div>
    </section>
  );
}
