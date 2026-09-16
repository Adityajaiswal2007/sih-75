import React, { useState } from 'react';
import {
  traineeUser,
  traineeCompetencies,
  skillGaps,
  recommendedTrainers,
  allCourses
} from './traineeData';

const FORMULA_FLASHCARDS = [
  {
    id: 1,
    topic: 'Radar Meteorology',
    question: 'What is the Radar Range Equation for distributed precipitation targets?',
    formula: 'Pr = (Pt · G² · λ² · θ · φ · h · π³ · |K|² · Z) / (1024 · ln(2) · π² · r²)',
    note: 'Pr is received power, Z is radar reflectivity factor, r is target range.'
  },
  {
    id: 2,
    topic: 'Atmospheric Dynamics',
    question: 'What is the Geostrophic Wind equation in pressure coordinates?',
    formula: 'ug = - (g / f) · (∂Z / ∂y),   vg = + (g / f) · (∂Z / ∂x)',
    note: 'Represents exact balance between Coriolis force and pressure gradient force.'
  },
  {
    id: 3,
    topic: 'Numerical Weather Prediction',
    question: 'What is the Courant-Friedrichs-Lewy (CFL) computational stability condition?',
    formula: 'C = (u · Δt) / Δx ≤ Cmax (typically ≤ 1.0)',
    note: 'Ensures numerical wave propagation does not outpace spatial grid resolution.'
  },
  {
    id: 4,
    topic: 'Satellite Remote Sensing',
    question: 'What is Planck\'s Radiance Law for satellite thermal infrared detection?',
    formula: 'B_λ(T) = (2·h·c²) / [ λ⁵ · (exp(h·c / (λ·k·T)) - 1) ]',
    note: 'Relates brightness temperature to emitted spectral radiance at wavelength λ.'
  }
];

export default function TraineeDashboardView({ onNavigate, onOpenTrainerProfile }) {
  const primaryCourse = allCourses.find(c => c.id === 'crs-001') || allCourses[0];
  const otherEnrolled = allCourses.filter(c => c.enrolled && c.id !== primaryCourse.id).slice(0, 2);
  const primaryGap = skillGaps[0];

  const [flashcardOpen, setFlashcardOpen] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Curriculum Roadmap Milestones
  const ROADMAP_STATIONS = [
    { num: 1, title: 'Atmospheric Physics', status: 'Completed', score: '94%', active: false },
    { num: 2, title: 'Doppler Radar Principles', status: 'Completed', score: '88%', active: false },
    { num: 3, title: 'Velocity Dealiasing Lab', status: 'In Progress', score: '68%', active: true },
    { num: 4, title: 'Severe Echo Interpretation', status: 'Upcoming', score: '--', active: false },
    { num: 5, title: 'MoES Practical Exam', status: 'Locked', score: '--', active: false }
  ];

  return (
    <div className="trainee-dashboard-view">
      {/* Hero Welcome Banner */}
      <section className="trainee-hero-banner">
        <div className="trainee-hero-left">
          <div className="trainee-hero-eyebrow">
            <span>◇</span> CAPACITYCONNECT LEARNER ECOSYSTEM
          </div>
          <h1>
            Good morning, <span>{traineeUser.name}</span> 👋
          </h1>
          <p>
            Continue your curriculum pathway and track your verified competencies in meteorological analytics, satellite remote sensing, and computational models.
          </p>
          <div className="trainee-hero-ctas">
            <button
              className="trainee-btn-primary"
              onClick={() => onNavigate('learning', { courseId: primaryCourse.id })}
            >
              <span>▶</span> Continue Learning
            </button>
            <button
              className="trainee-btn-secondary"
              onClick={() => setFlashcardOpen(true)}
            >
              ⚡ Practice Flashcards
            </button>
          </div>
        </div>

        <div className="trainee-hero-right">
          <div className="trainee-hero-metric-pill">
            <strong>{traineeUser.stats.competencyProgress}%</strong>
            <span>Competency Progress</span>
          </div>
          <div className="trainee-hero-metric-pill">
            <strong>{traineeUser.stats.averageScore}%</strong>
            <span>Average Score</span>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="trainee-metrics-grid">
        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#2F5233' }}>
              ▱
            </div>
            <span style={{ fontSize: 11, color: '#2F5233', fontWeight: 600 }}>Active</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.enrolledCourses}</div>
          <div className="trainee-metric-label">Courses Enrolled</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#2F6B3C' }}>
              ✓
            </div>
            <span style={{ fontSize: 11, color: '#2F6B3C', fontWeight: 600 }}>Completed</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.completedCourses}</div>
          <div className="trainee-metric-label">Courses Completed</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#527A5A' }}>
              ◷
            </div>
            <span style={{ fontSize: 11, color: '#527A5A', fontWeight: 600 }}>Tracked</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.learningHours}</div>
          <div className="trainee-metric-label">Learning Hours</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#B58B32' }}>
              ★
            </div>
            <span style={{ fontSize: 11, color: '#B58B32', fontWeight: 600 }}>Top 10%</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.averageScore}%</div>
          <div className="trainee-metric-label">Average Score</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#6F9F70' }}>
              🔥
            </div>
            <span style={{ fontSize: 11, color: '#6F9F70', fontWeight: 600 }}>7 Days Streak</span>
          </div>
          <div className="trainee-metric-val">14 Days</div>
          <div className="trainee-metric-label">Study Streak</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#2F5233' }}>
              ▣
            </div>
            <span style={{ fontSize: 11, color: '#2F5233', fontWeight: 600 }}>Verified</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.certificatesEarned}</div>
          <div className="trainee-metric-label">Certificates</div>
        </div>
      </section>

      {/* INTERACTIVE CURRICULUM ROADMAP (METRO MAP STYLE) */}
      <section className="trainee-panel" style={{ marginBottom: 20 }}>
        <div className="trainee-panel-header">
          <div className="trainee-panel-title-group">
            <h3><span>🗺️</span> Active Curriculum Roadmap: Doppler Radar &amp; Climate Modeling</h3>
            <p>Milestone pipeline from atmospheric fundamentals to certified operational competency.</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1B4332', background: '#EAF4EE', padding: '4px 10px', borderRadius: 8 }}>
            Stage 3 of 5 In Progress
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 14 }}>
          {ROADMAP_STATIONS.map((stn) => (
            <div
              key={stn.num}
              style={{
                padding: '14px',
                borderRadius: '12px',
                background: stn.active ? '#EAF4EE' : '#FFFFFF',
                border: stn.active ? '2px solid #1B4332' : '1px solid #DCE6DF',
                boxShadow: stn.active ? '0 4px 14px rgba(27, 67, 50, 0.1)' : 'none',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: stn.status === 'Completed' ? '#1B4332' : stn.active ? '#A7C957' : '#E3ECE5',
                  color: stn.status === 'Completed' ? '#FFFFFF' : stn.active ? '#1B4332' : '#718078',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 800
                }}>
                  {stn.status === 'Completed' ? '✓' : stn.num}
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: stn.status === 'Completed' ? '#047857' : stn.active ? '#1B4332' : '#8CA394',
                  textTransform: 'uppercase'
                }}>
                  {stn.status}
                </span>
              </div>
              <strong style={{ display: 'block', fontSize: 13, color: '#12281B', marginBottom: 4 }}>{stn.title}</strong>
              <small style={{ color: '#526E5D', fontSize: 11 }}>
                {stn.score !== '--' ? `Evaluation Score: ${stn.score}` : 'Prerequisite locked'}
              </small>
            </div>
          ))}
        </div>
      </section>

      {/* 2-Column: Continue Learning & Competency Radar Profile */}
      <div className="trainee-grid-two-col">
        {/* Left Column: Continue Learning */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3><span>▱</span> Continue Learning</h3>
              <p>Pick up right where you left off</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('my-learning')}>
              View All Enrolled →
            </button>
          </div>

          {/* Primary Enrolled Course Card */}
          <div className="trainee-continue-card">
            <div className="trainee-continue-card-top">
              <span className="trainee-continue-badge">Active Module · 4 of 6</span>
              <span style={{ fontSize: 12, color: '#485563' }}>{primaryCourse.lastAccessed}</span>
            </div>
            <h3 className="trainee-continue-title">{primaryCourse.title}</h3>
            <div className="trainee-continue-meta">
              Current: <b>{primaryCourse.currentModule}</b> · Instructor: {primaryCourse.instructor}
            </div>

            <div className="trainee-progress-bar-wrap">
              <div className="trainee-progress-bar-fill" style={{ width: `${primaryCourse.progress}%` }} />
            </div>
            <div className="trainee-progress-stats">
              <span>Progress: <strong>{primaryCourse.progress}%</strong></span>
              <span>Duration: {primaryCourse.duration}</span>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button
                className="trainee-btn-primary"
                onClick={() => onNavigate('learning', { courseId: primaryCourse.id })}
              >
                Continue Course →
              </button>
              <button
                className="trainee-btn-secondary"
                onClick={() => onNavigate('course-detail', { courseId: primaryCourse.id })}
              >
                Syllabus
              </button>
            </div>
          </div>

          {/* Additional Enrolled Mini List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {otherEnrolled.map(course => (
              <div
                key={course.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#F4F8F5',
                  border: '1px solid #D6E3D8',
                  borderRadius: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{course.thumbnailIcon}</span>
                  <div>
                    <strong style={{ fontSize: 13, color: '#12281B', display: 'block' }}>{course.title}</strong>
                    <small style={{ fontSize: 11, color: '#485563' }}>{course.category} · {course.progress}% completed</small>
                  </div>
                </div>
                <button
                  className="trainee-btn-secondary"
                  style={{ padding: '6px 14px', fontSize: 12 }}
                  onClick={() => onNavigate('learning', { courseId: course.id })}
                >
                  Resume
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Personal Competency Spider Radar */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3><span>◎</span> Your Competency Radar</h3>
              <p>Current score vs. 75% national benchmark</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('competencies')}>
              Full Framework →
            </button>
          </div>

          {/* Mini Radar Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 14 }}>
            <svg viewBox="0 0 300 240" style={{ width: '100%', maxWidth: 280, height: 210 }}>
              {/* Concentric Polygons */}
              {[0.35, 0.7, 1.0].map((scale, i) => {
                const r = 80 * scale;
                const pts = [0, 1, 2, 3, 4].map(idx => {
                  const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                  return `${150 + r * Math.cos(angle)},${120 + r * Math.sin(angle)}`;
                }).join(' ');
                return <polygon key={i} points={pts} fill="none" stroke="#DCE6DF" strokeWidth="1" strokeDasharray={scale === 0.7 ? '3 3' : 'none'} />;
              })}

              {/* Benchmark Target Polygon (75%) */}
              {(() => {
                const targetR = 80 * 0.75;
                const pts = [0, 1, 2, 3, 4].map(idx => {
                  const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                  return `${150 + targetR * Math.cos(angle)},${120 + targetR * Math.sin(angle)}`;
                }).join(' ');
                return <polygon points={pts} fill="rgba(217, 119, 6, 0.08)" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 3" />;
              })()}

              {/* Actual Trainee Scores */}
              {(() => {
                const scores = [84, 76, 68, 88, 58];
                const pts = scores.map((sc, idx) => {
                  const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                  const r = 80 * (sc / 100);
                  return `${150 + r * Math.cos(angle)},${120 + r * Math.sin(angle)}`;
                }).join(' ');
                return <polygon points={pts} fill="rgba(45, 106, 79, 0.25)" stroke="#1B4332" strokeWidth="2" />;
              })()}

              {/* Labels */}
              {['Python', 'NWP', 'Radar', 'GIS', 'Satellite'].map((lbl, idx) => {
                const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                const lx = 150 + 98 * Math.cos(angle);
                const ly = 120 + 98 * Math.sin(angle);
                return (
                  <text
                    key={lbl}
                    x={lx}
                    y={ly}
                    textAnchor={lx > 150 ? 'start' : lx < 150 ? 'end' : 'middle'}
                    dominantBaseline="central"
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#1B4332"
                  >
                    {lbl}
                  </text>
                );
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {traineeCompetencies.slice(0, 3).map(comp => (
              <div key={comp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, padding: '6px 10px', background: '#F8FAF8', borderRadius: 8 }}>
                <span style={{ fontWeight: 600, color: '#16251B' }}>{comp.name}</span>
                <span style={{ fontWeight: 800, color: comp.level >= 75 ? '#047857' : '#D97706' }}>{comp.level}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 2-Column: Skill Gap Insight & Recommended Trainers */}
      <div className="trainee-grid-two-col">
        {/* Left: Highlighted Skill Gap Card */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3><span>✦</span> Skill Gap Insight</h3>
              <p>Targeted developmental milestones</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('skill-gap')}>
              Full Gap Analysis →
            </button>
          </div>

          <div className="trainee-gap-card">
            <div className="trainee-gap-badge">
              <span>●</span> Priority Remediation Target
            </div>
            <h4 className="trainee-gap-title">{primaryGap.skill}</h4>

            <div className="trainee-gap-numbers">
              <div className="trainee-gap-stat">
                <small>Current</small>
                <strong style={{ color: '#2F5233' }}>{primaryGap.current}%</strong>
              </div>
              <span style={{ color: '#718078' }}>→</span>
              <div className="trainee-gap-stat">
                <small>Target</small>
                <strong style={{ color: '#2F6B3C' }}>{primaryGap.target}%</strong>
              </div>
              <span style={{ color: '#718078' }}>·</span>
              <div className="trainee-gap-stat">
                <small>Gap</small>
                <strong style={{ color: '#B58B32' }}>{primaryGap.gap}%</strong>
              </div>
              <span style={{ color: '#718078' }}>·</span>
              <div className="trainee-gap-stat">
                <small>Priority</small>
                <strong style={{ color: primaryGap.priorityColor }}>{primaryGap.priority}</strong>
              </div>
            </div>

            <p className="trainee-gap-rec">
              Action Plan: Complete <strong>"{primaryGap.recommendedCourse}"</strong> and book 1-on-1 office hours with faculty <strong>{primaryGap.recommendedTrainer.name}</strong> ({primaryGap.recommendedTrainer.match}% Match).
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="trainee-btn-primary"
                onClick={() => onNavigate('course-detail', { courseId: primaryGap.recommendedCourseId })}
              >
                View Recommendation →
              </button>
              <button
                className="trainee-btn-secondary"
                onClick={() => onNavigate('trainers')}
              >
                Find Trainer
              </button>
            </div>
          </div>
        </section>

        {/* Right: Recommended Trainers */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3><span>♟</span> Accredited Faculty Advisors</h3>
              <p>Instructors for domain mentorship &amp; practical guidance</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('trainers')}>
              View All Faculty →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recommendedTrainers.map(trainer => (
              <div
                key={trainer.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  background: trainer.isBestMatch ? '#E6F4EA' : '#FFFFFF',
                  border: trainer.isBestMatch ? '1px solid #A7C957' : '1px solid #D6E3D8',
                  borderRadius: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="trainee-trainer-avatar" style={{ width: 42, height: 42, fontSize: 14 }}>
                    {trainer.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong style={{ fontSize: 13.5, color: '#16251B' }}>{trainer.name}</strong>
                      {trainer.isBestMatch && (
                        <span style={{ fontSize: 10, background: '#2F5233', color: '#FFFFFF', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>
                          Lead Mentor
                        </span>
                      )}
                    </div>
                    <small style={{ fontSize: 11.5, color: '#485563', display: 'block' }}>{trainer.expertise}</small>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#2F5233', marginBottom: 4 }}>
                    {trainer.matchScore}% Match
                  </div>
                  <button
                    className="trainee-panel-link"
                    style={{ fontSize: 11.5 }}
                    onClick={() => {
                      if (onOpenTrainerProfile) {
                        onOpenTrainerProfile(trainer.id);
                      } else {
                        onNavigate('trainers');
                      }
                    }}
                  >
                    View Profile ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FORMULA PRACTICE FLASHCARD MODAL */}
      {flashcardOpen && (
        <div className="trainee-modal-backdrop" onClick={() => setFlashcardOpen(false)}>
          <div className="trainee-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #DCE6DF', paddingBottom: 10, marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: '#1B4332', textTransform: 'uppercase' }}>
                  {FORMULA_FLASHCARDS[currentCardIdx].topic}
                </span>
                <h3 style={{ margin: '2px 0 0', fontSize: 16, color: '#12281B' }}>Meteorological Practice Flashcard</h3>
              </div>
              <button
                type="button"
                style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#688273' }}
                onClick={() => setFlashcardOpen(false)}
              >
                ✕
              </button>
            </div>

            <div
              onClick={() => setCardFlipped(!cardFlipped)}
              style={{
                minHeight: 160,
                background: cardFlipped ? '#1B4332' : '#F4F8F5',
                color: cardFlipped ? '#FFFFFF' : '#12281B',
                border: '1.5px solid #C4DFC9',
                borderRadius: 14,
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: 16
              }}
            >
              <small style={{ color: cardFlipped ? '#A7C957' : '#557060', fontWeight: 700, marginBottom: 8 }}>
                {cardFlipped ? 'REVEALED FORMULA & PRINCIPLE' : 'CLICK CARD TO FLIP'}
              </small>
              <strong style={{ fontSize: cardFlipped ? 14 : 15, lineHeight: 1.5, fontFamily: cardFlipped ? 'monospace' : 'inherit' }}>
                {cardFlipped ? FORMULA_FLASHCARDS[currentCardIdx].formula : FORMULA_FLASHCARDS[currentCardIdx].question}
              </strong>
              {cardFlipped && (
                <p style={{ margin: '10px 0 0', fontSize: 12, color: '#D2ECC9' }}>
                  {FORMULA_FLASHCARDS[currentCardIdx].note}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                className="trainee-btn-secondary"
                disabled={currentCardIdx === 0}
                onClick={() => {
                  setCardFlipped(false);
                  setCurrentCardIdx(prev => Math.max(0, prev - 1));
                }}
              >
                ← Previous
              </button>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#557060' }}>
                {currentCardIdx + 1} of {FORMULA_FLASHCARDS.length}
              </span>
              <button
                type="button"
                className="trainee-btn-primary"
                onClick={() => {
                  setCardFlipped(false);
                  setCurrentCardIdx(prev => (prev + 1) % FORMULA_FLASHCARDS.length);
                }}
              >
                Next Card →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
