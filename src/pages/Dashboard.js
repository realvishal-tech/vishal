import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Users, Book } from 'lucide-react';

function Dashboard({ studentInfo }) {
  const [stats, setStats] = useState({
    attendance: 85,
    studyProgress: 62,
    streak: 12,
    completedAssignments: 18,
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Rahul Singh',
      action: 'solved a Java problem',
      icon: '✅',
      time: 'just now',
    },
    {
      id: 2,
      name: 'Ankit Kumar',
      action: 'asked about DBMS queries',
      icon: '❓',
      time: '2 min ago',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      action: 'completed Python assignment',
      icon: '🎯',
      time: '5 min ago',
    },
    {
      id: 4,
      name: 'Neha Verma',
      action: 'studying Operating Systems',
      icon: '📚',
      time: '8 min ago',
    },
  ]);

  const [onlineStudents, setOnlineStudents] = useState(125);

  useEffect(() => {
    // Simulate live activity updates
    const activityInterval = setInterval(() => {
      const newActivities = [
        {
          id: Math.random(),
          name: ['Raj Patel', 'Sneha Singh', 'Vikram Nair', 'Anjali Desai'][
            Math.floor(Math.random() * 4)
          ],
          action: [
            'solved a problem',
            'asked a question',
            'completed assignment',
            'studying',
          ][Math.floor(Math.random() * 4)],
          icon: ['✅', '❓', '🎯', '📚'][Math.floor(Math.random() * 4)],
          time: 'just now',
        },
        ...activities.slice(0, 3),
      ];
      setActivities(newActivities);
      setOnlineStudents(Math.floor(Math.random() * 50) + 100);
    }, 8000);

    return () => clearInterval(activityInterval);
  }, [activities]);

  return (
    <div className="animate-fadeInUp">
      {/* Welcome Section */}
      <div className="glass-card neon-glow" style={{ marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '5px' }}>
          👋 Welcome back, {studentInfo?.name.split(' ')[0]}!
        </h2>
        <p>
          You're on day <strong>{stats.streak}</strong> 🔥 Keep up the great work!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid">
        {/* Attendance */}
        <div className="glass-card">
          <div className="stat-label">📊 Attendance</div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
          >
            <div className="progress-circle" style={{ '--percentage': '85%' }}>
              <div className="progress-value">{stats.attendance}%</div>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                132 classes attended
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                out of 156 total
              </p>
            </div>
          </div>
        </div>

        {/* Study Progress */}
        <div className="glass-card">
          <div className="stat-label">📈 Study Progress</div>
          <div className="stat-value" style={{ marginBottom: '10px' }}>
            {stats.studyProgress}%
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${stats.studyProgress}%` }}
            ></div>
          </div>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
            Keep learning! 💪
          </p>
        </div>

        {/* Daily Streak */}
        <div className="glass-card">
          <div className="stat-label">🔥 Daily Streak</div>
          <div className="stat-value">{stats.streak} days</div>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
            Last active today
          </p>
        </div>

        {/* Completed */}
        <div className="glass-card">
          <div className="stat-label">✅ Assignments</div>
          <div className="stat-value">{stats.completedAssignments}</div>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
            submitted this month
          </p>
        </div>
      </div>

      {/* Study Suggestion */}
      <div className="glass-card neon-accent" style={{ marginBottom: '30px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '10px',
          }}
        >
          <Zap size={24} style={{ color: '#06b6d4' }} />
          <h3 style={{ margin: 0, color: '#06b6d4' }}>Today's Study Tip</h3>
        </div>
        <p>
          Master Java Collections Framework by solving 3 coding problems from the
          <strong> LeetCode Easy </strong>
          section. This will help you ace the Data Structures exam!
        </p>
        <button className="btn btn-primary" style={{ marginTop: '10px' }}>
          Start Practice →
        </button>
      </div>

      {/* Main Grid: Activity Feed + Quick Access */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Live Activity Feed */}
        <div className="glass-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ margin: 0 }}>🔴 Live Activity</h3>
            <span className="live-badge">
              <span className="live-dot"></span>
              {onlineStudents} online
            </span>
          </div>

          <div className="activity-feed">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-avatar">{activity.icon}</div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px' }}>
                    <strong>{activity.name}</strong> {activity.action}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748b' }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '20px' }}>📚 Quick Access</h3>

          <div style={{ display: 'grid', gap: '12px' }}>
            <button
              className="btn btn-secondary"
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px',
                marginBottom: 0,
              }}
            >
              📝 Today's Notes
            </button>
            <button
              className="btn btn-secondary"
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px',
                marginBottom: 0,
              }}
            >
              🎯 Pending Assignments
            </button>
            <button
              className="btn btn-secondary"
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px',
                marginBottom: 0,
              }}
            >
              🧪 Previous Question Papers
            </button>
            <button
              className="btn btn-secondary"
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px',
                marginBottom: 0,
              }}
            >
              💬 Ask AI Something
            </button>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '12px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '10px',
              fontSize: '12px',
            }}
          >
            <p style={{ margin: 0, color: '#06b6d4', fontWeight: 600 }}>
              💡 Smart Tip
            </p>
            <p style={{ margin: '5px 0 0 0', color: '#cbd5e1' }}>
              Your exam is in 23 days. Practice 2-3 hours daily to stay on track!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
