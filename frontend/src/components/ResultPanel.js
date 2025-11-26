// frontend/src/components/ResultPanel.jsx
import React from 'react';
import { normalizeTextForDisplay } from '../utils/textUtils';

export default function ResultPanel({ text, analysis, onApplyHashtags }) {
  const displayText = normalizeTextForDisplay(text);

  return (
    <div className="result-section">
      <div style={{ marginBottom: 32 }}>
        <h4 style={{ marginBottom: 16, color: '#374151', fontSize: '1.1rem' }}>Analysis Results</h4>
        
        {/* Stats Grid */}
        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-value">{analysis?.wordCount ?? 0}</span>
                <span className="stat-label">Words</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{analysis?.sentenceCount ?? 0}</span>
                <span className="stat-label">Sentences</span>
            </div>
            <div className="stat-card">
                <span className="stat-value">{analysis?.avgSentenceLength ?? 0}</span>
                <span className="stat-label">Avg Length</span>
            </div>
            <div className="stat-card" style={{ 
              background: analysis?.hasCTA ? '#f0fdf4' : '#fef2f2',
              borderColor: analysis?.hasCTA ? '#bbf7d0' : '#fecaca' 
            }}>
                <span className="stat-value" style={{ color: analysis?.hasCTA ? '#166534' : '#991b1b' }}>
                    {analysis?.hasCTA ? 'Yes' : 'No'}
                </span>
                <span className="stat-label">Call to Action</span>
            </div>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h4 style={{ marginBottom: 16, color: '#374151', fontSize: '1.1rem' }}>Extracted Text</h4>
        <textarea
          readOnly
          className="text-display"
          value={displayText}
        />
      </div>

      {/* Suggestions */}
      <div style={{ 
        marginBottom: 32, 
        background: '#fff7ed', 
        padding: 20, 
        borderRadius: 16, 
        border: '1px solid #ffedd5' 
      }}>
        <h4 style={{ margin: '0 0 12px', color: '#9a3412', display: 'flex', alignItems: 'center', gap: 8 }}>
           💡 Suggestions
        </h4>
        {analysis?.suggestions?.length ? (
          <ul style={{ margin: 0, paddingLeft: 20, color: '#c2410c', lineHeight: 1.6 }}>
            {analysis.suggestions.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
          </ul>
        ) : <div style={{ color: '#c2410c' }}>No suggestions — looks excellent!</div>}
      </div>

      <div>
        <h4 style={{ marginBottom: 16, color: '#374151', fontSize: '1.1rem' }}>Hashtag Suggestions</h4>
        <div className="hashtag-container">
          {analysis?.hashtagSuggestions?.map((h, i) => (
            <button key={i} onClick={() => onApplyHashtags && onApplyHashtags(h)} className="hashtag-pill">
              {h}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}