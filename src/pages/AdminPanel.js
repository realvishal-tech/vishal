import React, { useState } from 'react';
import { Plus, Trash2, Edit, BookOpen } from 'lucide-react';

function AdminPanel() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      subject: 'Java',
      type: 'Notes',
      title: 'OOP Concepts Explained',
      link: 'https://example.com/java-oop',
      date: '2024-04-20',
    },
    {
      id: 2,
      subject: 'DBMS',
      type: 'Assignment',
      title: 'SQL Queries Practice',
      link: 'https://example.com/dbms-sql',
      date: '2024-04-19',
    },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    subject: 'Java',
    type: 'Notes',
    title: '',
    link: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const subjects = ['Java', 'C++', 'Python', 'C', 'DBMS', 'OS', 'Computer Networks'];
  const types = ['Notes', 'Assignment', 'Question Paper', 'Reference'];

  const handleAdd = () => {
    if (!newMaterial.title || !newMaterial.link) {
      alert('Please fill all fields');
      return;
    }

    const material = {
      id: Date.now(),
      ...newMaterial,
      date: new Date().toISOString().split('T')[0],
    };

    setMaterials([material, ...materials]);
    setNewMaterial({ subject: 'Java', type: 'Notes', title: '', link: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setMaterials(materials.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="animate-fadeInUp">
      {/* Add Material Section */}
      <div className="glass-card neon-glow" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>📚 Manage Study Materials</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={16} style={{ marginRight: '6px' }} />
            Add Material
          </button>
        </div>

        {showForm && (
          <div
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Subject</label>
                  <select
                    className="subject-dropdown"
                    value={newMaterial.subject}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, subject: e.target.value })
                    }
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Type</label>
                  <select
                    className="subject-dropdown"
                    value={newMaterial.type}
                    onChange={(e) =>
                      setNewMaterial({ ...newMaterial, type: e.target.value })
                    }
                  >
                    {types.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Material title"
                  value={newMaterial.title}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, title: e.target.value })
                  }
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Link</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/resource"
                  value={newMaterial.link}
                  onChange={(e) =>
                    setNewMaterial({ ...newMaterial, link: e.target.value })
                  }
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add Material
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Materials List */}
      <div className="glass-card">
        <h3 style={{ marginBottom: '20px' }}>📖 Available Materials ({materials.length})</h3>

        <div style={{ display: 'grid', gap: '12px' }}>
          {materials.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8' }}>
              No materials added yet
            </p>
          ) : (
            materials.map((material) => (
              <div
                key={material.id}
                style={{
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '15px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '15px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: '#06b6d4' }}>
                      {material.subject}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#8b5cf6',
                      }}
                    >
                      {material.type}
                    </span>
                  </div>
                  <h4
                    style={{
                      margin: '0 0 6px 0',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    {material.title}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '20px', fontSize: '12px', color: '#64748b' }}>
                    <div>
                      Link:{' '}
                      <a
                        href={material.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#06b6d4', textDecoration: 'none' }}
                      >
                        Open →
                      </a>
                    </div>
                    <div>Added: {material.date}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="action-btn"
                    onClick={() => setEditingId(material.id)}
                    title="Edit"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleDelete(material.id)}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div className="glass-card">
          <div className="stat-label">📚 Total Materials</div>
          <div className="stat-value" style={{ color: '#06b6d4' }}>
            {materials.length}
          </div>
        </div>
        <div className="glass-card">
          <div className="stat-label">📋 Subjects Covered</div>
          <div className="stat-value" style={{ color: '#8b5cf6' }}>
            {new Set(materials.map((m) => m.subject)).size}
          </div>
        </div>
        <div className="glass-card">
          <div className="stat-label">📌 Resource Types</div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>
            {new Set(materials.map((m) => m.type)).size}
          </div>
        </div>
      </div>

      <div className="credit">
        <p>Admin can manage and organize study materials for students</p>
      </div>
    </div>
  );
}

export default AdminPanel;
