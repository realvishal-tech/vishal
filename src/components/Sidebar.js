import React, { useState } from 'react';
import {
  Home,
  MessageSquare,
  Calendar,
  Settings,
  Database,
  Book,
  Code,
  Code2,
  Cpu,
  Globe,
} from 'lucide-react';

function Sidebar({ currentPage, onPageChange, isAdmin }) {
  const [selectedSubject, setSelectedSubject] = useState('Java');
  const [selectedSemester, setSelectedSemester] = useState('sem5');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: Settings });
  }

  const subjects = [
    { id: 'java', name: 'Java', icon: Code },
    { id: 'cpp', name: 'C++', icon: Code2 },
    { id: 'python', name: 'Python', icon: Code },
    { id: 'c', name: 'C', icon: Code },
    { id: 'dbms', name: 'DBMS', icon: Database },
    { id: 'os', name: 'OS', icon: Cpu },
    { id: 'cn', name: 'Computer Networks', icon: Globe },
  ];

  const semesters = [
    { value: 'sem3', label: 'Semester 3' },
    { value: 'sem5', label: 'Semester 5' },
    { value: 'sem7', label: 'Semester 7' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        🎓 BCA Assist
      </div>

      <div className="nav-group">
        <div className="nav-title">Main Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              <div className="nav-icon">
                <Icon size={18} />
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="nav-group">
        <div className="nav-title">Subjects & Courses</div>
        <select
          className="subject-dropdown"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {semesters.map((sem) => (
            <option key={sem.value} value={sem.value}>
              {sem.label}
            </option>
          ))}
        </select>

        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.id}
              className={`nav-item ${selectedSubject === subject.name ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subject.name)}
            >
              <div className="nav-icon">
                <Icon size={16} />
              </div>
              <span style={{ fontSize: '13px' }}>{subject.name}</span>
            </div>
          );
        })}
      </div>

      <div className="nav-group">
        <div className="nav-title">Study Resources</div>
        <div className="nav-item" style={{ cursor: 'pointer' }}>
          <div className="nav-icon">📝</div>
          <span style={{ fontSize: '13px' }}>Notes</span>
        </div>
        <div className="nav-item" style={{ cursor: 'pointer' }}>
          <div className="nav-icon">📚</div>
          <span style={{ fontSize: '13px' }}>Assignments</span>
        </div>
        <div className="nav-item" style={{ cursor: 'pointer' }}>
          <div className="nav-icon">🧪</div>
          <span style={{ fontSize: '13px' }}>Previous Papers</span>
        </div>
      </div>

      <div className="credit">
        <p>👉 Developed by Vishal Kumar</p>
      </div>
    </div>
  );
}

export default Sidebar;
