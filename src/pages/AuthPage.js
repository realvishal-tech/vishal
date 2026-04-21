import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password || !name) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      onLogin(email, password, name);
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    onLogin('student@lnd.edu', 'password123', 'Rahul Singh');
  };

  return (
    <div className="login-container">
      <div className="login-form animate-fadeInUp">
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
            🎓 BCA Assist
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>
            LND College Smart AI Portal
          </p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div
          style={{
            margin: '20px 0',
            color: '#64748b',
            textAlign: 'center',
            fontSize: '12px',
          }}
        >
          or
        </div>

        <button
          onClick={handleDemoLogin}
          className="btn btn-secondary"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Try Demo Account
        </button>

        <div
          style={{
            marginTop: '25px',
            padding: '15px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '10px',
            fontSize: '12px',
            lineHeight: '1.6',
            color: '#cbd5e1',
          }}
        >
          <strong>👨‍💼 Admin Login:</strong>
          <div>Email: 10717vishal@gmail.com</div>
          <div>Pwd: Vishal@@2004</div>
        </div>

        <div className="credit">
          <p style={{ marginTop: 0 }}>👉 Developed by Vishal Kumar</p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
