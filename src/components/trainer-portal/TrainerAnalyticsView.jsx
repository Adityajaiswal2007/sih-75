import React from 'react';

export function TrainerAnalyticsView({ analytics }) {
  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Analytics & Cohort Performance Metrics</h1>
          <p>Longitudinal competency trends, pass rates, score distributions and engagement stats.</p>
        </div>
      </div>

      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">◷</div>
          <div className="kpi-label">Cumulative Training Hours</div>
          <div className="kpi-val">1,240 <small style={{ fontSize: 13, color: '#8daac4' }}>hrs</small></div>
          <div className="kpi-note">+184 hrs this quarter</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">◎</div>
          <div className="kpi-label">Average Cohort Pass Rate</div>
          <div className="kpi-val">92%</div>
          <div className="kpi-note">Across 486 evaluated trainees</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">◈</div>
          <div className="kpi-label">Overall Completion Rate</div>
          <div className="kpi-val">86%</div>
          <div className="kpi-note">+6% improvement</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✦</div>
          <div className="kpi-label">Competency Uplift Average</div>
          <div className="kpi-val">+18.4%</div>
          <div className="kpi-note">Pre vs. post assessment</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20 }}>
        <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
          <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 6px' }}>6-Month Trainee Performance & Pass Rate Trend</h3>
          <p style={{ fontSize: 12, color: '#7e9ebc', margin: '0 0 20px' }}>Average score & completion progression (Apr - Sep 2026)</p>
          
          <div style={{ height: 180, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: 16, padding: '10px 10px 0', borderBottom: '1px solid #1c4263', background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 35px, #143552 36px)' }}>
            {analytics.monthlyTrends.map((d) => (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', maxWidth: 36, height: `${d.completion}%`, borderRadius: '6px 6px 2px 2px', background: 'linear-gradient(180deg, #38bdf8, #1d65b8)', display: 'grid', placeItems: 'center', fontSize: 10, color: '#fff', fontWeight: 600 }}>
                  {d.completion}%
                </div>
                <small style={{ color: '#8da8c2', fontSize: 11 }}>{d.month}</small>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14, fontSize: 12, color: '#8bb0d2' }}>
            <span>■ Completion Rate</span>
            <span style={{ color: '#34d399' }}>● Average Score (88%)</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
            <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 14px' }}>Assessment Score Distribution</h3>
            {analytics.scoreDistribution.map((s) => (
              <div key={s.range} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#cfe0f2' }}>{s.range}</span>
                  <b style={{ color: '#38bdf8' }}>{s.count} ({s.pct})</b>
                </div>
                <div className="portal-progress-track" style={{ margin: 0, height: 5 }}>
                  <div className="portal-progress-fill" style={{ width: s.pct }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
            <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 14px' }}>Fastest Growing Competencies</h3>
            {analytics.topCompetenciesGrowth.map((comp) => (
              <div key={comp.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #173b5e' }}>
                <span style={{ color: '#cfe2f7', fontSize: 13 }}>{comp.name}</span>
                <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: 13 }}>{comp.uplift} uplift</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
