import React, { useState } from 'react';
import {
  Layers,
  Award,
  ChevronRight,
  Sparkles,
  BarChart2,
  SlidersHorizontal,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function CoreCompetencies({ competencies, onViewAllModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('bars'); // 'bars' or 'grid'

  const categories = ['All', 'Meteorology & Forecasting', 'Data & Analytics', 'Geospatial & Tools'];

  const filteredCompetencies = competencies.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const getProficiencyBadge = (score) => {
    if (score >= 90) return { label: 'Mastery', class: 'mastery' };
    if (score >= 80) return { label: 'Advanced', class: 'advanced' };
    return { label: 'Proficient', class: 'proficient' };
  };

  return (
    <section className="profile-section-card competencies-card" id="section-competencies">
      <div className="section-header-flex">
        <div className="section-title-wrap">
          <span className="section-badge">
            <Layers size={13} />
            SKILL MAP & CAPABILITY
          </span>
          <h2 className="section-title">Core Competencies</h2>
          <p className="section-subtitle">
            Trainer expertise mapped directly to CapacityConnect competency framework and institutional benchmarks.
          </p>
        </div>

        <div className="competencies-controls">
          <div className="view-toggle-btns">
            <button
              className={`view-toggle-btn ${viewMode === 'bars' ? 'active' : ''}`}
              onClick={() => setViewMode('bars')}
              title="Progress Bars View"
              aria-label="Progress Bars View"
            >
              <BarChart2 size={15} />
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Competency Cards View"
              aria-label="Cards View"
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="category-tabs-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
            <span className="cat-count">
              {cat === 'All' ? competencies.length : competencies.filter((c) => c.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Competencies Render: Bar View or Grid View */}
      {viewMode === 'bars' ? (
        <div className="competency-bars-list">
          {filteredCompetencies.map((comp) => {
            const badge = getProficiencyBadge(comp.score);
            return (
              <div key={comp.name} className="competency-row-item">
                <div className="comp-info-top">
                  <div className="comp-title-group">
                    <span className="comp-name">{comp.name}</span>
                    <span className={`comp-badge ${badge.class}`}>
                      {badge.label}
                    </span>
                    <span className="comp-category-tag">{comp.category}</span>
                  </div>
                  <div className="comp-score-value">
                    <span className="comp-number">{comp.score}%</span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="comp-progress-track">
                  <div
                    className="comp-progress-fill"
                    style={{ width: `${comp.score}%` }}
                  >
                    <div className="fill-glow-tip" />
                  </div>
                  {/* Institutional benchmark marker at 75% */}
                  <div className="benchmark-line" style={{ left: '75%' }} title="Institutional Target Benchmark (75%)" />
                </div>

                <div className="comp-meta-footer">
                  <span className="comp-desc">{comp.description}</span>
                  <span className="comp-verified-tag">
                    <CheckCircle size={11} className="text-teal" />
                    Verified by {comp.evaluationsCount} course evaluations
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="competency-grid-view">
          {filteredCompetencies.map((comp) => {
            const badge = getProficiencyBadge(comp.score);
            return (
              <div key={comp.name} className="competency-grid-card">
                <div className="card-top-row">
                  <span className={`comp-badge ${badge.class}`}>{badge.label}</span>
                  <strong className="grid-score-num">{comp.score}%</strong>
                </div>
                <h3 className="grid-comp-name">{comp.name}</h3>
                <p className="grid-comp-desc">{comp.description}</p>
                <div className="comp-progress-track mini">
                  <div className="comp-progress-fill" style={{ width: `${comp.score}%` }} />
                </div>
                <div className="grid-comp-footer">
                  <span>{comp.category}</span>
                  <span className="verified-evals">{comp.evaluationsCount} Trainee Evals</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Action */}
      <div className="competencies-footer-row">
        <div className="benchmark-legend">
          <span className="legend-marker" />
          <span className="legend-text">Vertical line indicates CapacityConnect Institutional Benchmark (75%)</span>
        </div>
        <button
          className="cc-btn cc-btn-outline small"
          onClick={onViewAllModal}
          id="btn-view-all-competencies"
        >
          <span>View All Competency Frameworks</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </section>
  );
}
