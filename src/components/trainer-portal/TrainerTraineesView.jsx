import React, { useState } from 'react';

export function TrainerTraineesView({ trainees, onOpenModal, onSelectTrainee }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = trainees.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.course.toLowerCase().includes(search.toLowerCase()) || t.organization.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (statusFilter === 'All') return true;
    return t.status === statusFilter;
  });

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Enrolled Trainees & Cohort Directory</h1>
          <p>Monitor individual learner performance, identify at-risk trainees, and intervene early.</p>
        </div>
        <div className="portal-header-actions">
          <button className="button outline small" onClick={() => onOpenModal('post-announcement')}>+ Broadcast Cohort Notice</button>
        </div>
      </div>

      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">♟</div>
          <div className="kpi-label">Active Trainees</div>
          <div className="kpi-val">{trainees.length}</div>
          <div className="kpi-note">Across 4 regional centers</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✓</div>
          <div className="kpi-label">On Track / Excellent</div>
          <div className="kpi-val">{trainees.filter((t) => t.status !== 'Falling Behind').length}</div>
          <div className="kpi-note">83% positive progression</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon" style={{ color: '#f87171' }}>!</div>
          <div className="kpi-label">Needs Diagnostic Attention</div>
          <div className="kpi-val" style={{ color: '#f87171' }}>{trainees.filter((t) => t.status === 'Falling Behind').length}</div>
          <div className="kpi-note" style={{ color: '#f87171' }}>Action recommended</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">◎</div>
          <div className="kpi-label">Cohort Avg Assessment</div>
          <div className="kpi-val">82.8%</div>
          <div className="kpi-note">+4.2% from prior cohort</div>
        </div>
      </div>

      <div className="portal-filter-bar">
        <div className="portal-search-box">
          <span>⌕</span>
          <input
            placeholder="Search trainee name, institution, or enrolled course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="portal-tab-pills">
          {['All', 'On Track', 'Excellent', 'Falling Behind'].map((tab) => (
            <button
              key={tab}
              className={`portal-pill-btn ${statusFilter === tab ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab)}
            >
              {tab} ({tab === 'All' ? trainees.length : trainees.filter((t) => t.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      <div className="portal-table-container">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Enrolled Course</th>
              <th>Progress</th>
              <th>Diagnostic Score</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="portal-user-cell">
                    <div className="portal-user-avatar">{t.initials}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.organization}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: 13, color: '#e2edf9' }}>{t.course}</span>
                  <small style={{ display: 'block', color: '#7b9bb6', fontSize: 11 }}>Joined: {t.joinedDate}</small>
                </td>
                <td style={{ minWidth: 140 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: '#7ba2c6' }}>{t.completedModules}/{t.totalModules} modules</span>
                    <b style={{ color: '#38bdf8' }}>{t.progress}%</b>
                  </div>
                  <div className="portal-progress-track" style={{ margin: 0, height: 5 }}>
                    <div className="portal-progress-fill" style={{ width: `${t.progress}%` }} />
                  </div>
                </td>
                <td>
                  <strong style={{ fontSize: 14, color: t.assessmentScore >= 75 ? '#34d399' : '#f87171' }}>
                    {t.assessmentScore}%
                  </strong>
                </td>
                <td>
                  <span className={`portal-badge ${t.status === 'Excellent' || t.status === 'On Track' ? 'good' : 'urgent'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="portal-btn-sm"
                    onClick={() => {
                      onSelectTrainee(t);
                      onOpenModal('trainee-details');
                    }}
                  >
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
