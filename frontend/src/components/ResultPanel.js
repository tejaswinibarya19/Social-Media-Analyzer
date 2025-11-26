
import { normalizeTextForDisplay } from '../utils/textUtils';

export default function ResultPanel({ text, analysis, onApplyHashtags }) {
  const displayText = normalizeTextForDisplay(text);

  return (
    <div className="result-section">
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ marginBottom: 12, color:'#e8eaf0ff' }}>Analysis Results</h4>
        
        
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
            <div className="stat-card" style={{ background: analysis?.hasCTA ? '#dcfce7' : '#fee2e2' }}>
                <span className="stat-value" style={{ color: analysis?.hasCTA ? '#166534' : '#991b1b' }}>
                    {analysis?.hasCTA ? 'Yes' : 'No'}
                </span>
                <span className="stat-label">Call to Action</span>
            </div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h4 style={{ marginBottom: 12, color: '#e8eaf0ff' }}>Extracted Text</h4>
        <textarea
          readOnly
          className="text-display"
          value={displayText}
        />
      </div>

     
      <div style={{ marginBottom: 24, background: '#fff7ed', padding: 16, borderRadius: 12, border: '1px solid #ffedd5' }}>
        <h4 style={{ margin: '0 0 8px', color: '#9a3412' }}> Suggestions</h4>
        {analysis?.suggestions?.length ? (
          <ul style={{ margin: 0, paddingLeft: 20, color: '#c2410c' }}>
            {analysis.suggestions.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
          </ul>
        ) : <div style={{ color: '#c2410c' }}>No suggestions — looks excellent!</div>}
      </div>

      <div>
        <h4 style={{ marginBottom: 12, color: '#e8eaf0ff' }}>Hashtag Suggestions</h4>
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