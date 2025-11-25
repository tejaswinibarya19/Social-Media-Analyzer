import React, { useCallback, useRef, useState } from 'react';

export default function FileDrop({ onFileSelected, disabled }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef();

  const onFiles = useCallback(files => {
    if (!files || !files.length) return;
    onFileSelected(files[0]);
  }, [onFileSelected]);

  const onDrop = useCallback(ev => {
    ev.preventDefault();
    setIsDragOver(false);
    onFiles(ev.dataTransfer.files);
  }, [onFiles]);

  const onDragOver = (e) => {
      e.preventDefault();
      if(!disabled) setIsDragOver(true);
  }

  const onDragLeave = () => setIsDragOver(false);

  const containerStyle = {
    border: `2px dashed ${isDragOver ? '#4f46e5' : '#cbd5e1'}`,
    background: isDragOver ? '#eef2ff' : '#f8fafc',
    padding: '40px 20px',
    borderRadius: '16px',
    textAlign: 'center',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease'
  };

  return (
    <div>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={containerStyle}
        onClick={() => !disabled && fileRef.current.click()}
      >
        
        <div style={{ color: isDragOver ? '#1a1399ff' : '#01060eff', marginBottom: 12 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
        </div>
        
        <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#77c8e8ff' }}>
            Click to upload or drag and drop
        </p>
        <small style={{ color:  '#77c8e8ff' }}>PDF, PNG, JPG (max 20MB)</small>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={e => onFiles(e.target.files)}
      />
    </div>
  );
}