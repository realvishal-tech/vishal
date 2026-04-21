import React from 'react';
import { LogOut, Menu } from 'lucide-react';

function Header({ studentInfo, currentPage, onLogout, isAdmin }) {
  const pageNames = {
    dashboard: 'Dashboard',
    chat: 'AI Assistant',
    attendance: 'Attendance',
    admin: 'Admin Panel',
  };

  return (
    <div className="header">
      <div>
        <h1 style={{ margin: 0 }}>
          {pageNames[currentPage] || 'BCA Assist'}
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>
          {studentInfo?.name}
          {isAdmin && ' (Admin)'}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <button
          onClick={onLogout}
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#fca5a5',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
