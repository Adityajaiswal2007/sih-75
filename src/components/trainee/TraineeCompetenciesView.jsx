import React, { useState } from 'react';
import { traineeCompetencies, competencyHistory } from './traineeData';

export default function TraineeCompetenciesView({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Computing', 'Data Science', 'Meteorology', 'Analytics', 'Geospatial', 'Satellite', 'AI/ML'];

  const filteredCompetencies = traineeCompetencies.filter(
    c => selectedCategory === 'All' || c.category === selectedCategory
  );

  return (
    <div className="trainee-competencies-view">
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#6366F1', textTransform: 'uppercase' }}>
            INTELLIGENT SKILL MAPPING
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>My Competencies</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Track the skills and computational capabilities you are developing through courses and diagnostic assessments.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
        <div className="trainee-metric-card" style={{ borderLeft: '4px solid #6366F1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#A5B4FC', fontWeight: 600 }}>OVERALL COMPETENCY</span>
            <span style={{ fontSize: 18 }}>◎</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 4 }}>74%</div>
          <span style={{ fontSize: 12, color: '#4ADE80', fontWeight: 600 }}>+12% this quarter</span>
        </div>

        <div className="trainee-metric-card" style={{ borderLeft: '4px solid #22C55E' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#86EFAC', fontWeight: 600 }}>VERIFIED STRENGTHS</span>
            <span style={{ fontSize: 18 }}>✓</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 4 }}>4 / 7</div>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>Above national institutional benchmark</span>
        </div>

        <div className="trainee-metric-card" style={{ borderLeft: '4px solid #F59E0B' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#FCD34D', fontWeight: 600 }}>ACTIVE GROWTH GAPS</span>
            <span style={{ fontSize: 18 }}>✦</span>
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 4 }}>3 Gaps</div>
          <button
            className="trainee-panel-link"
            style={{ fontSize: 12, marginTop: 4 }}
            onClick={() => onNavigate('skill-gap')}
          >
            Review Gap Diagnosis →
          </button>
        </div>
      </div>

      {/* 2-Column: Left Competencies List, Right Competency History Chart */}
      <div className="trainee-grid-two-col">
        {/* Left: Competency Grid */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3><span>◎</span> Tracked Competency Indicators</h3>
              <p>Granular proficiency indices across core scientific domains</p>
            </div>
          </div>

          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`trainee-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                style={{ fontSize: 11, padding: '4px 10px' }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredCompetencies.map(comp => (
              <div
                key={comp.id}
                style={{
                  padding: '16px',
                  background: 'rgba(10, 22, 38, 0.6)',
                  border: '1px solid #1E334A',
                  borderRadius: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <strong style={{ color: '#fff', fontSize: 14 }}>{comp.name}</strong>
                    <span style={{ fontSize: 11, color: '#94A3B8', marginLeft: 8 }}>({comp.category})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 12,
                        background:
                          comp.status === 'Strong'
                            ? 'rgba(34, 197, 94, 0.15)'
                            : comp.status === 'Developing'
                            ? 'rgba(56, 189, 248, 0.15)'
                            : 'rgba(245, 158, 11, 0.15)',
                        color:
                          comp.status === 'Strong'
                            ? '#4ADE80'
                            : comp.status === 'Developing'
                            ? '#38BDF8'
                            : '#FBBF24'
                      }}
                    >
                      {comp.status}
                    </span>
                    <strong style={{ color: '#fff', fontSize: 15 }}>{comp.level}%</strong>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="trainee-comp-track" style={{ height: 8 }}>
                  <div
                    className="trainee-comp-fill"
                    style={{
                      width: `${comp.level}%`,
                      background:
                        comp.level >= 80
                          ? 'linear-gradient(90deg, #3B82F6, #38BDF8)'
                          : comp.level >= 65
                          ? 'linear-gradient(90deg, #6366F1, #8B5CF6)'
                          : 'linear-gradient(90deg, #F59E0B, #EF4444)'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#64748B' }}>
                  <span>Recent growth: <strong style={{ color: '#22C55E' }}>{comp.change}</strong></span>
                  {comp.target && <span>Target: {comp.target}%</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Competency History & Trajectory */}
        <div>
          {/* History Trend Card */}
          <section className="trainee-panel" style={{ marginBottom: 24 }}>
            <div className="trainee-panel-header">
              <div className="trainee-panel-title-group">
                <h3><span>📈</span> Competency Growth Trajectory</h3>
                <p>6-month score progression (Jan – Jun 2026)</p>
              </div>
            </div>

            {/* Static Visual Bar/Line Chart */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: 180,
                padding: '20px 10px 0',
                borderBottom: '1px solid #1E334A',
                marginBottom: 16
              }}
            >
              {competencyHistory.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    flex: 1
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8' }}>
                    {item.score}%
                  </span>
                  <div
                    style={{
                      width: 24,
                      height: `${(item.score / 100) * 120}px`,
                      background:
                        idx === competencyHistory.length - 1
                          ? 'linear-gradient(180deg, #38BDF8, #2563EB)'
                          : 'rgba(56, 189, 248, 0.3)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.5s ease'
                    }}
                  />
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{item.month}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12.5, color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
              Your competency score has accelerated by <strong>+16%</strong> over the past 6 months due to regular module completions in Python and Radar Meteorology.
            </p>
          </section>

          {/* Action Card to Connect to Next Step in Journey */}
          <section
            style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, #0D1B2A 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 16
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
            <h4 style={{ color: '#fff', fontSize: 16, margin: '0 0 6px' }}>Ready to bridge your skill gaps?</h4>
            <p style={{ color: '#94A3B8', fontSize: 12.5, lineHeight: 1.5, margin: '0 0 16px' }}>
              View personalized recommendations based on your current 74% competency evaluation.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="trainee-btn-primary"
                style={{ fontSize: 12.5 }}
                onClick={() => onNavigate('skill-gap')}
              >
                Analyze Skill Gaps →
              </button>
              <button
                className="trainee-btn-secondary"
                style={{ fontSize: 12.5 }}
                onClick={() => onNavigate('trainers')}
              >
                Match Trainers
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
