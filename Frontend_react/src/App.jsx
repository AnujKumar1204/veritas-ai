import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InputSection from './components/InputSection';
import ClaimSelector from './components/ClaimSelector';
import ResultCard from './components/ResultCard';
import StatsPanel from './components/StatsPanel';
import Footer from './components/Footer';
import { extractClaimsFromText, extractClaimsFromPDF, factCheck } from './api';
import styles from './App.module.css';

export default function App() {
  const [claims, setClaims]       = useState([]);
  const [selected, setSelected]   = useState(new Set());
  const [results, setResults]     = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError]         = useState('');

  const handleExtract = async ({ type, value }) => {
    setExtracting(true);
    setError('');
    setClaims([]);
    setSelected(new Set());
    setResults([]);
    try {
      const extracted = type === 'text'
        ? await extractClaimsFromText(value)
        : await extractClaimsFromPDF(value);
      setClaims(extracted);
      // Scroll to claims
      setTimeout(() => document.getElementById('claims')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError('Could not reach the backend. Make sure it is running on http://localhost:8000');
    } finally {
      setExtracting(false);
    }
  };

  const toggleClaim = (i) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleVerify = async () => {
    setVerifying(true);
    setError('');
    const toVerify = [...selected].map(i => ({ claim: claims[i] }));
    const initial = toVerify.map(({ claim }) => ({ claim, result: null, loading: true }));
    setResults(initial);
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    const updated = [...initial];
    for (let i = 0; i < toVerify.length; i++) {
      try {
        const result = await factCheck(toVerify[i].claim);
        updated[i] = { claim: toVerify[i].claim, result, loading: false };
      } catch {
        updated[i] = {
          claim: toVerify[i].claim,
          result: {
            verdict: 'Uncertain',
            confidence: 0,
            source: 'Error',
            evidence_chunks: [],
            detailed_analysis: 'Failed to verify. Check backend connection.',
          },
          loading: false,
        };
      }
      setResults([...updated]);
    }
    setVerifying(false);
  };

  const doneResults = results.filter(r => !r.loading);
  const showStats = doneResults.length > 0;

  return (
    <div className={styles.app}>
      <Navbar />
      <Hero />

      <main className={styles.main} id="check">
        <InputSection onExtract={handleExtract} loading={extracting} />

        {error && (
          <div className={styles.error}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {claims.length > 0 && (
          <div id="claims">
            <ClaimSelector
              claims={claims}
              selected={selected}
              onToggle={toggleClaim}
              onVerify={handleVerify}
              loading={verifying}
            />
          </div>
        )}

        {results.length > 0 && (
          <section className={styles.resultsSection} id="results">
            <div className={styles.resultsHeader}>
              <div className={styles.stepTag}>03</div>
              <div>
                <h2 className={styles.resultsTitle}>Results</h2>
                <p className={styles.resultsSub}>
                  {doneResults.length} of {results.length} verified
                </p>
              </div>
            </div>

            {showStats && <StatsPanel results={results} />}

            <div className={styles.resultsList}>
              {results.map((r, i) => (
                <ResultCard
                  key={i}
                  index={i}
                  claim={r.claim}
                  result={r.result}
                  loading={r.loading}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
