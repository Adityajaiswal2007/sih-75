import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  ArrowRight,
  TrendingUp,
  Target,
  FileCheck2,
  ShieldCheck,
  Award,
  Zap,
  HelpCircle
} from 'lucide-react';

export default function CompetencyMatchDetail({ matchData, onOpenMatchModal }) {
  return (
    <section className="profile-section-card match-detail-card" id="section-matching">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge match-accent">
            <Cpu size={13} />
            INTELLIGENT MATCHING ENGINE
          </span>
          <h2 className="section-title">Why this Trainer Matches</h2>
          <p className="section-subtitle">
            Algorithmic alignment between institutional curriculum needs and trainer competency profile.
          </p>
        </div>
      </div>

      {/* CapacityConnect 5-Step Matching Architecture Visualizer */}
      <div className="matching-pipeline-banner">
        <div className="pipeline-step">
          <span className="step-num">01</span>
          <div className="step-content">
            <strong>Training Requirement</strong>
            <small>Weather Data Analysis</small>
          </div>
        </div>
        <div className="pipeline-arrow">→</div>

        <div className="pipeline-step">
          <span className="step-num">02</span>
          <div className="step-content">
            <strong>Required Skills</strong>
            <small>4 Competencies Identified</small>
          </div>
        </div>
        <div className="pipeline-arrow">→</div>

        <div className="pipeline-step">
          <span className="step-num">03</span>
          <div className="step-content">
            <strong>Trainer Skills</strong>
            <small>Verified Profile Map</small>
          </div>
        </div>
        <div className="pipeline-arrow">→</div>

        <div className="pipeline-step active-highlight">
          <span className="step-num">04</span>
          <div className="step-content">
            <strong>92% Match Score</strong>
            <small>High Compatibility</small>
          </div>
        </div>
        <div className="pipeline-arrow">→</div>

        <div className="pipeline-step recommended">
          <span className="step-num">05</span>
          <div className="step-content">
            <strong>Recommended</strong>
            <small>Dr. Rahul Sharma</small>
          </div>
        </div>
      </div>

      {/* Interactive Match Matrix: Required vs Trainer Competencies */}
      <div className="match-matrix-grid">
        <div className="matrix-left-summary">
          <div className="target-course-box">
            <span className="target-label">CURRICULUM IN FOCUS</span>
            <h3 className="target-title">Weather Data Analysis Program</h3>
            <p className="target-desc">
              Operational forecasting, automated meteorological data pipelines, and quantitative weather models.
            </p>
          </div>

          <div className="compatibility-gauge-card">
            <div className="gauge-header">
              <span className="gauge-title">Compatibility Score</span>
              <span className="gauge-score-large">92%</span>
            </div>
            <div className="gauge-track">
              <div className="gauge-fill" style={{ width: '92%' }} />
            </div>
            <div className="gauge-meta">
              <span className="status-badge-match">
                <CheckCircle2 size={13} />
                Exceeds Baseline Requirement (+17%)
              </span>
              <p className="gauge-sub">
                Calculated across 4 core required competency domains with 100% prerequisite fulfillment.
              </p>
            </div>
          </div>
        </div>

        {/* Matrix Right: Side-by-Side Required vs Trainer Competency Verification */}
        <div className="matrix-right-comparison">
          <div className="comparison-header">
            <span className="col-header req-col">Required Competency</span>
            <span className="col-header required-lvl">Target</span>
            <span className="col-header trainer-lvl">Trainer Proficiency</span>
            <span className="col-header status-col">Status</span>
          </div>

          <div className="comparison-rows-list">
            {matchData.matchedCompetencies.map((item) => (
              <div key={item.name} className="comp-match-row">
                <div className="req-comp-cell">
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>

                <div className="target-cell">
                  <span className="target-badge">{item.target}%</span>
                </div>

                <div className="trainer-prof-cell">
                  <div className="bar-val-group">
                    <span className="trainer-score-num">{item.score}%</span>
                    <div className="mini-comp-bar">
                      <div className="mini-fill" style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                </div>

                <div className="match-status-cell">
                  <span className="match-check-pill">
                    <CheckCircle2 size={13} className="text-teal" />
                    Matched ✓
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="matrix-actions-bar">
            <div className="mock-ai-disclaimer">
              <Sparkles size={13} className="text-cyan" />
              <span>Competency-driven matching for institutional capacity optimization</span>
            </div>
            <button
              className="cc-btn cc-btn-outline small"
              onClick={onOpenMatchModal}
              id="btn-match-explain"
            >
              <span>Explore Matching Logic</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
