
import React, { useState } from 'react';
import FileDrop from '../components/FileDrop';
import Progress from '../components/Progress';
import ResultPanel from '../components/ResultPanel';
import { uploadFile } from '../services/apis';
import '../App.css'; // Ensure CSS is imported

export default function Home() {
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const onFileSelected = f => {
    setFile(f);
    setResult(null);
    setError('');
  };

  const onUpload = async () => {
    if (!file) return setError('Select a file first');
    setLoading(true);
    setPercent(0);
    setError('');
    try {
      const res = await uploadFile(file, p => setPercent(p));
      setResult(res);
    } catch (e) {
      setError(e.message || 'Upload failed');
    } finally {
      setLoading(false);
      setPercent(100);
      setTimeout(() => setPercent(0), 600);
    }
  };

  const applyHashtag = tag => {
    if (!result) return;
    const appended = (result.text || '') + '\n\n' + tag;
    setResult({ ...result, text: appended });
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <h2>Social Media Content Analyzer</h2>
        
        <FileDrop onFileSelected={onFileSelected} disabled={loading} />
        
        <div className="action-area">
          <div className="file-name">
            {file ? `📄 ${file.name}` : 'No file selected'}
          </div>
          <button 
            className="primary-btn"
            onClick={onUpload} 
            disabled={loading || !file}
          >
            {loading ? 'Processing...' : 'Upload & Extract'}
          </button>
        </div>

        {loading && <Progress percent={percent} />}

        {error && (
          <div style={{ 
            marginTop: 16, 
            padding: 12, 
            background: '#fee2e2', 
            color: '#991b1b', 
            borderRadius: 8, 
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        {result && (
          <ResultPanel text={result.text} analysis={result.analysis} onApplyHashtags={applyHashtag} />
        )}
      </div>
    </div>
  );
}