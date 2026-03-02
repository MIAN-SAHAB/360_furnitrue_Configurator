import React from 'react';

export default function Navigation({ onNavigateHome }) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      minHeight: '64px',
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '16px',
      paddingRight: '16px',
      zIndex: 100,
      fontFamily: 'sans-serif',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minHeight: '64px' }}>
        <button
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#333',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.color = '#667eea'}
          onMouseLeave={(e) => e.target.style.color = '#333'}
        >
          ← Home
        </button>
        <span style={{ color: '#ddd' }}>|</span>
        <span style={{ color: '#666', fontWeight: '600' }}>Configurator</span>
      </div>
    </nav>
  );
}
