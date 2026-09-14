import React from 'react';
import { traineeUser, traineeCompetencies } from './traineeData';

export default function TraineeProfileView({ onEditProfile, onNavigate }) {
  return (
    <div className="trainee-profile-view" style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Header Profile Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #EEF6EA 0%, #E6F4EA 50%, #EEF6EA 100%)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 16,
          padding: '32px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2F5233, #527A5A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 800,
              color: '#fff',
              border: '3px solid rgba(56, 189, 248, 0.4)'
            }}
          >
            {traineeUser.avatar}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#16251B', margin: 0 }}>
                {traineeUser.name}
              </h1>
              <span className="trainee-role-badge">Trainee Fellow</span>
            </div>
            <p style={{ color: '#2F5233', fontSize: 13.5, margin: '0 0 4px', fontWeight: 600 }}>
              {traineeUser.designation} · {traineeUser.organization}
            </p>
            <span style={{ color: '#485563', fontSize: 12 }}>
              📍 {traineeUser.location} · ✉ {traineeUser.email} · 📱 {traineeUser.mobile}
            </span>
          </div>
        </div>

        {/* Profile Completion Dial + Edit Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              padding: '12px 18px',
              background: '#EEF6EA',
              border: '1px solid #D6E3D8',
              borderRadius: 12,
              textAlign: 'center'
            }}
          >
            <strong style={{ fontSize: 24, fontWeight: 800, color: '#2F6B3C', display: 'block' }}>
              {traineeUser.profileCompletion}%
            </strong>
            <small style={{ fontSize: 11, color: '#485563' }}>Profile Complete</small>
          </div>

          <button
            className="trainee-btn-primary"
            onClick={onEditProfile}
          >
            ✎ Edit Profile
          </button>
        </div>
      </div>

      {/* 2-Column Details */}
      <div className="trainee-grid-two-col">
        {/* Left Column: Learning Profile & Goals */}
        <div>
          {/* Areas of Interest */}
          <section className="trainee-panel" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#16251B', margin: '0 0 12px' }}>
              🔍 Areas of Interest
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {traineeUser.interests.map((interest, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    background: '#EEF6EA',
                    color: '#2F5233',
                    border: '1px solid #D6E3D8',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Learning Goals */}
          <section className="trainee-panel">
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#16251B', margin: '0 0 14px' }}>
              🎯 Learning & Career Goals
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#485563', fontSize: 13, lineHeight: 1.8 }}>
              {traineeUser.goals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Competency Summary */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3 style={{ color: '#16251B' }}>◎ Competency Summary</h3>
              <p>Top verified skills recorded on platform</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('competencies')}>
              Full Matrix →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {traineeCompetencies.slice(0, 5).map(comp => (
              <div key={comp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                  <span style={{ color: '#16251B', fontWeight: 600 }}>{comp.name}</span>
                  <strong style={{ color: '#2F5233' }}>{comp.level}%</strong>
                </div>
                <div className="trainee-comp-track" style={{ height: 6 }}>
                  <div
                    className="trainee-comp-fill"
                    style={{
                      width: `${comp.level}%`,
                      background: comp.level >= 80 ? '#2F5233' : '#527A5A'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #D6E3D8' }}>
            <button
              className="trainee-btn-secondary"
              style={{ width: '100%', fontSize: 12.5 }}
              onClick={() => onNavigate('certificates')}
            >
              View Official Certificates ({traineeUser.stats.certificatesEarned}) →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
