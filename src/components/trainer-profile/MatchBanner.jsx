import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function MatchBanner({ matchData, onViewMatchDetails }) {
  return (
    <section className="recommended-match-banner" aria-label="Trainer Matching Recommendation">
      <div className="match-banner-glass">
        {/* Glow ambient background */}
        <div className="match-ambient-orb" />

        <div className="match-banner-content">
          {/* Left badge & Match Ring */}
          <div className="match-score-cluster">
            <div className="score-ring-wrapper">
              <svg className="score-svg" viewBox="0 0 100 100">
                <circle
                  className="score-track"
                  cx="50"
                  cy="50"
                  r="42"
                />
                <circle
                  className="score-progress"
                  cx="50"
                  cy="50"
                  r="42"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * matchData.score) / 100}
                />
              </svg>
              <div className="score-center-text">
                <span className="score-val">{matchData.score}%</span>
                <span className="score-sub">Match</span>
              </div>
            </div>
          </div>

          {/* Center Info */}
          <div className="match-text-content">
            <div className="match-kicker-row">
              <span className="match-pill">
                <Sparkles size={13} className="sparkle-icon" />
                RECOMMENDED TRAINER
              </span>
              <span className="match-verified-badge">
                <Cpu size={12} />
                CapacityConnect AI Discovery
              </span>
            </div>

            <h2 className="match-headline">
              {matchData.score}% Competency Match for <span className="highlight-target">{matchData.targetRole}</span>
            </h2>

            <p className="match-description">
              {matchData.description}
            </p>

            <div className="required-competencies-strip">
              <span className="req-label">Required Competencies:</span>
              <div className="competencies-tag-list">
                {matchData.matchedCompetencies.map((comp, idx) => (
                  <span key={idx} className="comp-tag-pill">
                    <CheckCircle2 size={13} className="check-icon" />
                    <b>{comp.name}</b>
                    <span className="comp-score-tag">{comp.score}%</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="match-action-col">
            <button
              className="cc-btn cc-btn-match"
              onClick={onViewMatchDetails}
              id="btn-view-match-details"
            >
              <span>View Match Details</span>
              <ArrowRight size={16} />
            </button>
            <span className="match-caption">Full competency mapping breakdown</span>
          </div>
        </div>
      </div>
    </section>
  );
}
