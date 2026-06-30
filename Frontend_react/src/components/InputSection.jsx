import React, { useState, useRef } from 'react';
import styles from './InputSection.module.css';

export default function InputSection({ onExtract, loading }) {
  const [tab, setTab] = useState('text');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => {
    if (f?.type === 'application/pdf') setFile(f);
  };

  const canSubmit = tab === 'text' ? text.trim().length > 10 : !!file;

  const handleSubmit = () => {
    if (!canSubmit || loading) return;
    onExtract(tab === 'text' ? { type: 'text', value: text } : { type: 'pdf', value: file });
  };

  return (
    <section className={styles.section} id="check">
      <div className={styles.header}>
        <div className={styles.stepTag}>01</div>
        
        <div>
          <h2 className={styles.title}></h2>
          <p className={styles.subtitle}>Paste text or upload a document to begin</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'text' ? styles.tabActive : ''}`}
            onClick={() => setTab('text')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Plain text
          </button>
          <button
            className={`${styles.tab} ${tab === 'pdf' ? styles.tabActive : ''}`}
            onClick={() => setTab('pdf')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            PDF upload
          </button>
        </div>

        <div className={styles.inputArea}>
          {tab === 'text' ? (
            <textarea
              className={styles.textarea}
              placeholder="Paste an article, paragraph, or any text containing factual claims…&#10;&#10;"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={7}
            />
          ) : (
            <>
              <div
                className={`${styles.dropzone} ${dragging ? styles.dragging : ''} ${file ? styles.hasFile : ''}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current.click()}
              >
                <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }}
                  onChange={e => handleFile(e.target.files[0])} />
                {file ? (
                  <>
                    <div className={styles.fileIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                    </div>
                    <p className={styles.fileName}>{file.name}</p>
                    <p className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB — click to replace</p>
                  </>
                ) : (
                  <>
                    <div className={styles.uploadIcon}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="16 16 12 12 8 16"/>
                        <line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
                      </svg>
                    </div>
                    <p className={styles.dropText}>Drop your PDF here</p>
                    <p className={styles.dropSub}>or click to browse</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          {tab === 'text' && (
            <span className={styles.charCount}>
              {text.length > 0 ? `${text.length} characters` : 'Min. 10 characters'}
            </span>
          )}
          <button
            className={styles.extractBtn}
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                Extracting claims…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Extract claims
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
