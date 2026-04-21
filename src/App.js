import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ChatInterface from './pages/ChatInterface';
import AttendanceTracker from './pages/AttendanceTracker';
import AdminPanel from './pages/AdminPanel';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [studentInfo, setStudentInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    const info = localStorage.getItem('studentInfo');
    const admin = localStorage.getItem('isAdmin');

    if (auth && info) {
      setIsAuthenticated(true);
      setStudentInfo(JSON.parse(info));
      setIsAdmin(admin === 'true');
    }
  }, []);

  const handleLogin = (email, password, name) => {
    const adminEmail = '10717vishal@gmail.com';
    const adminPassword = 'Vishal@@2004';

    if (email === adminEmail && password === adminPassword) {
      const info = { email, name: 'Admin', isAdmin: true };
      localStorage.setItem('auth', 'true');
      localStorage.setItem('studentInfo', JSON.stringify(info));
      localStorage.setItem('isAdmin', 'true');
      setStudentInfo(info);
      setIsAdmin(true);
      setIsAuthenticated(true);
    } else {
      const info = { email, name, isAdmin: false };
      localStorage.setItem('auth', 'true');
      localStorage.setItem('studentInfo', JSON.stringify(info));
      localStorage.setItem('isAdmin', 'false');
      setStudentInfo(info);
      setIsAdmin(false);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('studentInfo');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setStudentInfo(null);
    setIsAdmin(false);
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isAdmin={isAdmin}
      />
      <div className="main-content">
        <Header
          studentInfo={studentInfo}
          currentPage={currentPage}
          onLogout={handleLogout}
          isAdmin={isAdmin}
        />
        <div className="content">
          {currentPage === 'dashboard' && (
            <Dashboard studentInfo={studentInfo} />
          )}
          {currentPage === 'chat' && (
            <ChatInterface studentInfo={studentInfo} />
          )}
          {currentPage === 'attendance' && (
            <AttendanceTracker studentInfo={studentInfo} />
          )}
          {isAdmin && currentPage === 'admin' && (
            <AdminPanel />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
