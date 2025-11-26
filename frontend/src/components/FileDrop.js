
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

  const containerStyle = {
    border: `2px dashed ${isDragOver ? '#4f46e5' : '#e2e8f0'}`,
    background: isDragOver ? '#eff6ff' : '#f8fafc',
    padding: '60px 20px',
    borderRadius: '16px',
    textAlign: 'center',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); if(!disabled) setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={onDrop}
        style={containerStyle}
        onClick={() => !disabled && fileRef.current.click()}
      >
        <div style={{ 
          background: isDragOver ? '#dbeafe' : 'white', 
          padding: 16, 
          borderRadius: '50%', 
          marginBottom: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={isDragOver ? '#4f46e5' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
        </div>
        
        <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#1e293b', fontSize: '1.1rem' }}>
            Click to upload or drag and drop
        </p>
        <small style={{ color: '#94a3b8' }}>PDF, PNG, JPG (max 20MB)</small>
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