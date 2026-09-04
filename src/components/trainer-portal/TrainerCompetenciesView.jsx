import React from 'react';

export function TrainerCompetenciesView({ competencies }) {
  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Trainer Competencies & Skill Matrix</h1>
          <p>Verified capacity profile mapped to institutional standards (MoES / IMD Framework).</p>
        </div>
      </div>

      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">◎</div>
          <div className="kpi-label">Overall Competency Score</div>
          <div className="kpi-val">84%</div>
          <div className="kpi-note">Advanced Level Verified</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✦</div>
          <div className="kpi-label">Institutional AI Match</div>
          <div className="kpi-val">92%</div>
          <div className="kpi-note">Top recommendation rank</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✓</div>
          <div className="kpi-label">Competencies Above Benchmark</div>
          <div className="kpi-val">5 of 6</div>
          <div className="kpi-note">Institutional benchmark: 75%</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">▤</div>
          <div className="kpi-label">Evaluated Trainee Checkpoints</div>
          <div className="kpi-val">486</div>
          <div className="kpi-note">Practical & diagnostic tests</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, color: '#f2f8ff', margin: '0 0 16px' }}>Domain Competency Progress</h2>
          {competencies.map((comp) => (
            <div className="portal-competency-card" key={comp.name}>
              <div className="portal-comp-header">
                <div>
                  <strong>{comp.name}</strong>
                  <span className={`portal-badge ${comp.status === 'Strong' ? 'good' : comp.status === 'Developing' ? 'draft' : 'urgent'}`} style={{ marginLeft: 10 }}>
                    {comp.status}
                  </span>
                </div>
                <span>{comp.score}%</span>
              </div>
              <p className="portal-comp-desc">{comp.description}</p>
              <div className="portal-progress-track">
                <div
                  className="portal-progress-fill"
                  style={{
                    width: `${comp.score}%`,
                    background: comp.score >= 75 ? 'linear-gradient(90deg, #2583ff, #2cd0d3)' : comp.score >= 60 ? 'linear-gradient(90deg, #eab308, #ca8a04)' : 'linear-gradient(90deg, #ef4444, #dc2626)'
                  }}
                />
              </div>
              <div className="portal-benchmark-note">
                <span>Institutional Benchmark: {comp.benchmark}%</span>
                <b style={{ color: comp.score >= comp.benchmark ? '#34d399' : '#f87171' }}>
                  {comp.score >= comp.benchmark ? `+${comp.score - comp.benchmark}% Above Benchmark` : `${comp.score - comp.benchmark}% Gap`}
                </b>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
            <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 12px' }}>AI Competency Matching Engine</h3>
            <p style={{ fontSize: 12, color: '#90acc6', lineHeight: 1.6, margin: '0 0 14px' }}>
              CapacityConnect continuously assesses your training delivery outcomes against required syllabus competencies to calculate automated match scores for newly scheduled courses.
            </p>
            <div style={{ padding: 14, borderRadius: 8, background: '#07182c', border: '1px solid #1b436a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#d8e8f8' }}>Weather Data Analysis Match</span>
                <strong style={{ fontSize: 18, color: '#38bdf8' }}>92%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <span style={{ fontSize: 12, color: '#d8e8f8' }}>Atmospheric Modeling Match</span>
                <strong style={{ fontSize: 18, color: '#34d399' }}>88%</strong>
              </div>
            </div>
          </div>

          <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
            <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 12px' }}>Target Growth Recommendation</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>!</div>
              <div>
                <strong style={{ color: '#f1f7ff', fontSize: 13 }}>Machine Learning in Climatology (48%)</strong>
                <p style={{ color: '#8aa6c0', fontSize: 12, margin: '4px 0 10px', lineHeight: 1.5 }}>
                  Completing the advanced CNN Nowcasting certification will elevate your profile match for next month's AI meteorology cohort.
                </p>
                <button className="button outline small" style={{ fontSize: 11, padding: '6px 12px' }}>View Recommended Material →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
