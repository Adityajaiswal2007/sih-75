import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Star,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';

export default function TrainingPerformance({ performanceData }) {
  const [hoveredMonth, setHoveredMonth] = useState(null);

  const kpis = [
    {
      id: 'score',
      label: 'Average Trainee Score',
      value: `${performanceData.averageScore}%`,
      change: '+4.2% vs baseline',
      icon: Award,
      color: 'blue'
    },
    {
      id: 'completion',
      label: 'Course Completion',
      value: `${performanceData.completionRate}%`,
      change: '+6.1% vs institution avg',
      icon: CheckCircle2,
      color: 'cyan'
    },
    {
      id: 'success',
      label: 'Trainee Success Rate',
      value: `${performanceData.successRate}%`,
      change: 'High competency retention',
      icon: TrendingUp,
      color: 'teal'
    },
    {
      id: 'feedback',
      label: 'Average Feedback',
      value: `${performanceData.averageFeedback} / 5`,
      change: '98% Positive Trainee Ratings',
      icon: Star,
      color: 'amber'
    }
  ];

  const trendData = performanceData.monthlyTrend; // [{ month: 'Apr', score: 76, completion: 82, count: 68 }, ...]

  return (
    <section className="profile-section-card performance-card" id="section-performance">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge">
            <BarChart3 size={13} />
            OUTCOMES & ANALYTICS
          </span>
          <h2 className="section-title">Training Performance</h2>
          <p className="section-subtitle">
            Quantitative assessment of learner outcomes, course mastery, and 6-month evaluation trajectories.
          </p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="performance-kpis-grid">
        {kpis.map((kpi) => {
          const IconComp = kpi.icon;
          return (
            <div key={kpi.id} className={`perf-kpi-card perf-${kpi.color}`}>
              <div className="perf-top-row">
                <div className="perf-icon-badge">
                  <IconComp size={18} />
                </div>
                <span className="perf-growth-pill">
                  <ArrowUpRight size={13} />
                  {kpi.change}
                </span>
              </div>
              <strong className="perf-value">{kpi.value}</strong>
              <span className="perf-label">{kpi.label}</span>
            </div>
          );
        })}
      </div>

      {/* Interactive 6-Month Trainee Performance Trend Chart */}
      <div className="trend-chart-box">
        <div className="trend-chart-header">
          <div>
            <h3 className="trend-chart-title">Trainee Performance & Competency Growth Trend</h3>
            <span className="trend-chart-sub">Average trainee score and evaluation pass rates (Last 6 Months)</span>
          </div>
          <div className="trend-legend">
            <div className="legend-item">
              <span className="legend-bar-sample" />
              <span>Avg. Score (%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-target-line" />
              <span>Target Benchmark (80%)</span>
            </div>
          </div>
        </div>

        {/* SVG & Bar Chart Visualization */}
        <div className="chart-canvas-container">
          {/* Target Benchmark guide line at 80% */}
          <div className="chart-target-benchmark-line" style={{ bottom: '80%' }}>
            <span className="benchmark-tag">Target: 80%</span>
          </div>

          <div className="chart-bars-wrap">
            {trendData.map((d, index) => {
              const isHovered = hoveredMonth === d.month;
              return (
                <div
                  key={d.month}
                  className={`chart-bar-column ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredMonth(d.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Floating tooltip */}
                  <div className={`bar-tooltip ${isHovered ? 'visible' : ''}`}>
                    <strong className="tt-month">{d.month} 2026</strong>
                    <div className="tt-stat">Avg Score: <b>{d.score}%</b></div>
                    <div className="tt-stat">Completion: <b>{d.completion}%</b></div>
                    <div className="tt-stat">Evaluated: <b>{d.count} trainees</b></div>
                  </div>

                  {/* Vertical bar element */}
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${d.score}%` }}
                    >
                      <span className="bar-val-label">{d.score}%</span>
                    </div>
                  </div>

                  <span className="bar-month-label">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="trend-footer-note">
          <Info size={14} className="text-cyan" />
          <span>
            Performance data is aggregated across 486 trainee assessment results and practical evaluation checkpoints.
          </span>
        </div>
      </div>
    </section>
  );
}
