import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          AI-Powered Fact Verification System
        </div>
        <h1 className={styles.heading}>
          V.E.R.I.T.A.S.<br />
          </h1>
          <h2>
          <span className={styles.headingAccent}>Multi-Agent Fact Verification System</span>
        </h2>
        <p className={styles.sub}>
          Extract factual claims from any text or PDF and verify them against
          Wikipedia using a RAG pipeline — semantic search, LLM reasoning, and
          confidence scoring.
        </p>
        {/* <div className={styles.stats}> */}
          {/* <div className={styles.stat}> */}
            {/* <span className={styles.statNum}>RAG</span> */}
            {/* <span className={styles.statLabel}>Architecture</span> */}
          {/* </div> */}
          {/* <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>FAISS</span>
            <span className={styles.statLabel}>Vector Search</span>
          </div> */}
          {/* <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>Gemini</span>
            <span className={styles.statLabel}>2.5 Flash LLM</span>
          </div> */}
          {/* <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>spaCy</span>
            <span className={styles.statLabel}>NLP Extraction</span>
          </div> */}
        {/* </div> */}
      </div>
      {/* <div className={styles.scanBox} aria-hidden="true"> */}
        {/* <div className={styles.scanLabel}>
          <span className={styles.scanDot} />
          <span>SCANNING</span>
        </div> */}
        {/* <div className={styles.scanLines}> */}
          {/* {["The Eiffel Tower is located in Paris, France.", "Water boils at 100°C at sea level.", "India landed Chandrayaan-3 on the Moon in 2023."].map((line, i) => ( */}
            {/* // <div key={i} className={styles.scanLine}> */}
              {/* <span className={styles.scanIdx}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.scanText}>{line}</span>
              <span className={styles.scanVerdict} style={{ color: i === 0 ? 'var(--green)' : i === 1 ? 'var(--green)' : 'var(--accent)' }}>
                {i === 0 ? '✓ TRUE' : i === 1 ? '✓ TRUE' : '◎ VERIFYING'}
              </span> */}
            {/* // </div> */}
          {/* ))} */}
          {/* <div className={styles.scanBeam} /> */}
        {/* </div> */}
      {/* </div> */}
    </section>
  );
}
