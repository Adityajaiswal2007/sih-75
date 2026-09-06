import React from 'react';
import {
  traineeUser,
  traineeCompetencies,
  skillGaps,
  recommendedTrainers,
  allCourses
} from './traineeData';

export default function TraineeDashboardView({ onNavigate, onOpenTrainerProfile }) {
  const primaryCourse = allCourses.find(c => c.id === 'crs-001') || allCourses[0];
  const otherEnrolled = allCourses.filter(c => c.enrolled && c.id !== primaryCourse.id).slice(0, 2);
  const primaryGap = skillGaps[0];

  return (
    <div className="trainee-dashboard-view">
      {/* Trainee Core Journey Interactive Strip */}
      <div className="trainee-journey-strip" title="CapacityConnect Continuous Learning & Competency Loop">
        <span className="trainee-journey-step done" onClick={() => onNavigate('profile')}>
          ✓ 1. Profile Built
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step active" onClick={() => onNavigate('catalog')}>
          ● 2. Discover Courses
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('learning', { courseId: primaryCourse.id })}>
          3. Learn Modules
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('assessment')}>
          4. Take Assessment
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('result')}>
          5. View Diagnostic Result
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('competencies')}>
          6. Update Competencies
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('skill-gap')}>
          7. Identify Skill Gaps
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('trainers')}>
          8. Trainer Matching
        </span>
        <span className="trainee-journey-divider">→</span>
        <span className="trainee-journey-step" onClick={() => onNavigate('certificates')}>
          9. Earn Certificate
        </span>
      </div>

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
            Continue your personalized learning journey and strengthen your verified professional competencies in meteorological analytics and computational climate modeling.
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
              onClick={() => onNavigate('catalog')}
            >
              Explore Courses →
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
            <div className="trainee-metric-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
              ▱
            </div>
            <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600 }}>Active</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.enrolledCourses}</div>
          <div className="trainee-metric-label">Courses Enrolled</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E' }}>
              ✓
            </div>
            <span style={{ fontSize: 11, color: '#22C55E', fontWeight: 600 }}>Completed</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.completedCourses}</div>
          <div className="trainee-metric-label">Courses Completed</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
              ◷
            </div>
            <span style={{ fontSize: 11, color: '#818CF8', fontWeight: 600 }}>Tracked</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.learningHours}</div>
          <div className="trainee-metric-label">Learning Hours</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              ★
            </div>
            <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>Top 10%</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.averageScore}%</div>
          <div className="trainee-metric-label">Average Score</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA' }}>
              ◎
            </div>
            <span style={{ fontSize: 11, color: '#A78BFA', fontWeight: 600 }}>+12% QoQ</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.competencyProgress}%</div>
          <div className="trainee-metric-label">Competency Progress</div>
        </div>

        <div className="trainee-metric-card">
          <div className="trainee-metric-card-top">
            <div className="trainee-metric-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38BDF8' }}>
              ▣
            </div>
            <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600 }}>Verified</span>
          </div>
          <div className="trainee-metric-val">{traineeUser.stats.certificatesEarned}</div>
          <div className="trainee-metric-label">Certificates</div>
        </div>
      </section>

      {/* 2-Column: Continue Learning & Competency Snapshot */}
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
              <span style={{ fontSize: 12, color: '#94A3B8' }}>{primaryCourse.lastAccessed}</span>
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
                  background: 'rgba(10, 22, 38, 0.6)',
                  border: '1px solid #1E334A',
                  borderRadius: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>{course.thumbnailIcon}</span>
                  <div>
                    <strong style={{ fontSize: 13, color: '#fff', display: 'block' }}>{course.title}</strong>
                    <small style={{ fontSize: 11, color: '#94A3B8' }}>{course.category} · {course.progress}% completed</small>
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

        {/* Right Column: Competency Snapshot */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3><span>◎</span> Your Competency Profile</h3>
              <p>Evaluated against institutional benchmarks</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('competencies')}>
              View Competencies →
            </button>
          </div>

          <div style={{ marginBottom: 18 }}>
            {traineeCompetencies.slice(0, 5).map(comp => (
              <div className="trainee-comp-row" key={comp.id}>
                <div className="trainee-comp-row-header">
                  <div className="trainee-comp-name">
                    <span>{comp.name}</span>
                    <span className={`trainee-comp-tag ${comp.status === 'Strong' ? 'strong' : comp.status === 'Developing' ? 'developing' : 'attention'}`}>
                      {comp.status}
                    </span>
                  </div>
                  <span className="trainee-comp-percent">{comp.level}%</span>
                </div>
                <div className="trainee-comp-track">
                  <div
                    className="trainee-comp-fill"
                    style={{
                      width: `${comp.level}%`,
                      background: comp.level >= 80
                        ? 'linear-gradient(90deg, #3B82F6, #38BDF8)'
                        : comp.level >= 65
                        ? 'linear-gradient(90deg, #6366F1, #8B5CF6)'
                        : 'linear-gradient(90deg, #F59E0B, #EF4444)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick assessment callout */}
          <div style={{
            padding: '14px',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <strong style={{ fontSize: 13, color: '#A5B4FC', display: 'block' }}>Validate Next Competency</strong>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Take diagnostic quiz to update your score</span>
            </div>
            <button
              className="trainee-btn-intel"
              style={{ padding: '7px 14px', fontSize: 12 }}
              onClick={() => onNavigate('assessment')}
            >
              Take Quiz →
            </button>
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
              <p>AI-driven diagnosis of developmental milestones</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('skill-gap')}>
              Full Gap Analysis →
            </button>
          </div>

          <div className="trainee-gap-card">
            <div className="trainee-gap-badge">
              <span>●</span> Your Next Growth Area
            </div>
            <h4 className="trainee-gap-title">{primaryGap.skill}</h4>

            <div className="trainee-gap-numbers">
              <div className="trainee-gap-stat">
                <small>Current</small>
                <strong style={{ color: '#38BDF8' }}>{primaryGap.current}%</strong>
              </div>
              <span style={{ color: '#64748B' }}>→</span>
              <div className="trainee-gap-stat">
                <small>Target</small>
                <strong style={{ color: '#22C55E' }}>{primaryGap.target}%</strong>
              </div>
              <span style={{ color: '#64748B' }}>·</span>
              <div className="trainee-gap-stat">
                <small>Gap</small>
                <strong style={{ color: '#F59E0B' }}>{primaryGap.gap}%</strong>
              </div>
              <span style={{ color: '#64748B' }}>·</span>
              <div className="trainee-gap-stat">
                <small>Priority</small>
                <strong style={{ color: primaryGap.priorityColor }}>{primaryGap.priority}</strong>
              </div>
            </div>

            <p className="trainee-gap-rec">
              Recommended Action: Complete <strong>"{primaryGap.recommendedCourse}"</strong> and consult with recommended faculty <strong>{primaryGap.recommendedTrainer.name}</strong> ({primaryGap.recommendedTrainer.match}% Match).
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
              <h3><span>♟</span> Recommended Trainers</h3>
              <p>Faculty matched to your competency requirements</p>
            </div>
            <button className="trainee-panel-link" onClick={() => onNavigate('trainers')}>
              View All Matches →
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
                  background: trainer.isBestMatch ? 'rgba(99, 102, 241, 0.08)' : 'rgba(10, 22, 38, 0.6)',
                  border: trainer.isBestMatch ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid #1E334A',
                  borderRadius: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="trainee-trainer-avatar" style={{ width: 42, height: 42, fontSize: 14 }}>
                    {trainer.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong style={{ fontSize: 13.5, color: '#fff' }}>{trainer.name}</strong>
                      {trainer.isBestMatch && (
                        <span style={{ fontSize: 10, background: '#6366F1', color: '#fff', padding: '1px 6px', borderRadius: 10, fontWeight: 700 }}>
                          Best Match
                        </span>
                      )}
                    </div>
                    <small style={{ fontSize: 11.5, color: '#94A3B8', display: 'block' }}>{trainer.expertise}</small>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 800, color: '#38BDF8', marginBottom: 4 }}>
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
    </div>
  );
}
