import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.brand}>Veritas:<span>Truth</span></span>
          <span className={styles.sep}>·</span>
          <span className={styles.meta}>Powered by RAG, LangChain, FAISS & LLM Reasoning</span>
          
        </div>
        <div className={styles.right}>
          <span className={styles.credit}></span>
        </div>
      </div>
    </footer>
  );
}
