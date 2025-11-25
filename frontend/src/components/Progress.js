
export default function Progress({ percent }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ 
          height: 10, 
          width: '100%', 
          background: '#e5e7eb', 
          borderRadius: 99, 
          overflow: 'hidden' 
      }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #4f46e5, #7c3aed)', // Gradient bar
          borderRadius: 99,
          transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, textAlign: 'right', color: '#6b7280', fontWeight: 600 }}>
        {percent}% Processing
      </div>
    </div>
  );
}