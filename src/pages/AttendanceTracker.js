import React, { useState, useEffect } from 'react';
import { Calendar, User, CheckCheck, X } from 'lucide-react';

function AttendanceTracker({ studentInfo }) {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('attendance');
    if (saved) return JSON.parse(saved);

    const days = {};
    for (let i = 1; i <= 30; i++) {
      days[i] = Math.random() > 0.3 ? 'present' : 'absent';
    }
    return days;
  });

  const [view, setView] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  const presentDays = Object.values(attendance).filter(
    (status) => status === 'present'
  ).length;
  const totalDays = Object.keys(attendance).length;
  const attendancePercentage = ((presentDays / totalDays) * 100).toFixed(1);

  const toggleDay = (day) => {
    setAttendance((prev) => ({
      ...prev,
      [day]:
        prev[day] === 'present'
          ? 'absent'
          : prev[day] === 'absent'
            ? null
            : 'present',
    }));
  };

  const getDaysInMonth = (month) => {
    return new Date(new Date().getFullYear(), month + 1, 0).getDate();
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysInSelectedMonth = getDaysInMonth(selectedMonth);

  return (
    <div className="animate-fadeInUp">
      {/* Header Stats */}
      <div className="glass-card neon-glow" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div>
            <div className="stat-label">📊 Overall Attendance</div>
            <div className="stat-value" style={{ color: '#06b6d4' }}>
              {attendancePercentage}%
            </div>
          </div>
          <div>
            <div className="stat-label">✅ Days Present</div>
            <div className="stat-value" style={{ color: '#22c55e' }}>
              {presentDays}
            </div>
          </div>
          <div>
            <div className="stat-label">❌ Days Absent</div>
            <div className="stat-value" style={{ color: '#ef4444' }}>
              {totalDays - presentDays}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card" style={{ marginBottom: '30px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: 600 }}>
          Progress to 75% Target
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(attendancePercentage / 75) * 100}%`,
            }}
          ></div>
        </div>
        <p
          style={{
            margin: '10px 0 0 0',
            fontSize: '12px',
            color: attendancePercentage >= 75 ? '#22c55e' : '#f59e0b',
          }}
        >
          {attendancePercentage >= 75
            ? '✅ You meet the requirement!'
            : `${(75 - attendancePercentage).toFixed(1)}% more needed`}
        </p>
      </div>

      {/* Month Selector */}
      <div className="glass-card" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Calendar size={20} />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="subject-dropdown"
            style={{ flex: 1, margin: 0 }}
          >
            {months.map((m, idx) => (
              <option key={idx} value={idx}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Grid */}
        <div className="attendance-grid">
          {Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map(
            (day) => (
              <div
                key={day}
                className={`day-cell ${
                  attendance[day] === 'present'
                    ? 'present'
                    : attendance[day] === 'absent'
                      ? 'absent'
                      : ''
                }`}
                onClick={() => toggleDay(day)}
              >
                <div className="day-label">
                  {attendance[day] === 'present' ? '✓' : attendance[day] === 'absent' ? '✕' : day}
                </div>
              </div>
            )
          )}
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '6px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid #86efac',
              }}
            ></div>
            <span>Present</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '6px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #fca5a5',
              }}
            ></div>
            <span>Absent</span>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="glass-card">
        <h3 style={{ marginBottom: '20px' }}>📅 Weekly Breakdown</h3>

        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            { week: 'Week 1-7', present: 6, total: 7 },
            { week: 'Week 8-14', present: 5, total: 7 },
            { week: 'Week 15-21', present: 6, total: 7 },
            { week: 'Week 22-30', present: presentDays - 17, total: daysInSelectedMonth - 21 },
          ].map((week, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '80px', fontSize: '12px', fontWeight: 600 }}>
                {week.week}
              </div>
              <div className="progress-bar" style={{ flex: 1, margin: 0 }}>
                <div
                  className="progress-fill"
                  style={{
                    width: `${(week.present / week.total) * 100}%`,
                  }}
                ></div>
              </div>
              <div
                style={{
                  width: '60px',
                  fontSize: '12px',
                  textAlign: 'right',
                  color: (week.present / week.total) * 100 >= 75 ? '#22c55e' : '#f59e0b',
                }}
              >
                {((week.present / week.total) * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="credit">
        <p>Click on any day to toggle attendance status</p>
      </div>
    </div>
  );
}

export default AttendanceTracker;
