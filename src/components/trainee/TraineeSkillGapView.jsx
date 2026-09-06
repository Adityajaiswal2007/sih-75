import React from 'react';
import { skillGaps } from './traineeData';

export default function TraineeSkillGapView({ onNavigate, onOpenTrainerProfile }) {
  return (
    <div className="trainee-skill-gap-view">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#F59E0B', textTransform: 'uppercase' }}>
            DIAGNOSTIC INTELLIGENCE
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Skill Gap Analysis</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Identify priority competency areas where targeted coursework and expert faculty mentoring will maximize your career growth.
        </p>
      </div>

      {/* Featured Primary Gap Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(10, 27, 48, 0.9) 0%, rgba(16, 31, 49, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: 16,
          padding: '28px',
          marginBottom: 32,
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#F59E0B',
              background: 'rgba(245, 158, 11, 0.12)',
              padding: '4px 10px',
              borderRadius: 20,
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            🔥 Highest Priority Growth Area
          </span>
          <span style={{ fontSize: 12, color: '#94A3B8' }}>Domain: Meteorology</span>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 14px' }}>
          {skillGaps[0].skill}
        </h2>

        {/* Gap Numerical Metric Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '16px 20px',
            background: 'rgba(10, 22, 38, 0.8)',
            border: '1px solid #1E334A',
            borderRadius: 12,
            marginBottom: 18
          }}
        >
          <div>
            <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Current Level</small>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#38BDF8' }}>{skillGaps[0].current}%</div>
          </div>
          <span style={{ fontSize: 20, color: '#64748B' }}>→</span>
          <div>
            <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Target Benchmark</small>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#22C55E' }}>{skillGaps[0].target}%</div>
          </div>
          <span style={{ fontSize: 20, color: '#64748B' }}>·</span>
          <div>
            <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Diagnosed Gap</small>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F59E0B' }}>{skillGaps[0].gap}%</div>
          </div>
          <span style={{ fontSize: 20, color: '#64748B' }}>·</span>
          <div>
            <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Priority Level</small>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#EF4444' }}>High Priority</div>
          </div>
        </div>

        <p style={{ color: '#CBD5E1', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 22px' }}>
          {skillGaps[0].impact}
        </p>

        {/* Action Pair: Recommended Course + Recommended Trainer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div
            style={{
              padding: '16px',
              background: 'rgba(13, 27, 42, 0.7)',
              border: '1px solid #1E334A',
              borderRadius: 12
            }}
          >
            <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              📚 RECOMMENDED COURSE
            </span>
            <strong style={{ color: '#fff', fontSize: 14, display: 'block', marginBottom: 10 }}>
              {skillGaps[0].recommendedCourse}
            </strong>
            <button
              className="trainee-btn-primary"
              style={{ fontSize: 12, padding: '8px 16px' }}
              onClick={() => onNavigate('course-detail', { courseId: skillGaps[0].recommendedCourseId })}
            >
              View Course Details →
            </button>
          </div>

          <div
            style={{
              padding: '16px',
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 12
            }}
          >
            <span style={{ fontSize: 11, color: '#A5B4FC', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              👨‍🏫 TOP MATCHED TRAINER
            </span>
            <strong style={{ color: '#fff', fontSize: 14, display: 'block', marginBottom: 2 }}>
              {skillGaps[0].recommendedTrainer.name}
            </strong>
            <small style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 10 }}>
              {skillGaps[0].recommendedTrainer.match}% Competency Match · {skillGaps[0].recommendedTrainer.experience}
            </small>
            <button
              className="trainee-btn-intel"
              style={{ fontSize: 12, padding: '8px 16px' }}
              onClick={() => {
                if (onOpenTrainerProfile) {
                  onOpenTrainerProfile();
                } else {
                  onNavigate('trainers');
                }
              }}
            >
              View Trainer Profile ↗
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Skill Gaps Grid */}
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
        Other Diagnosed Competency Gaps
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {skillGaps.slice(1).map(gap => (
          <div
            key={gap.id}
            style={{
              background: '#0D1B2A',
              border: '1px solid #1E334A',
              borderRadius: 14,
              padding: '22px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span
                style={{
                  fontSize: 10.5,
                  padding: '2px 8px',
                  borderRadius: 12,
                  background: 'rgba(30, 51, 74, 0.6)',
                  color: gap.priorityColor,
                  fontWeight: 700,
                  border: `1px solid ${gap.priorityColor}40`
                }}
              >
                {gap.priority} Priority
              </span>
              <span style={{ fontSize: 11, color: '#64748B' }}>{gap.domain}</span>
            </div>

            <h4 style={{ color: '#fff', fontSize: 16, margin: '0 0 12px' }}>{gap.skill}</h4>

            {/* Gap meter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: '#94A3B8' }}>Current: <strong style={{ color: '#fff' }}>{gap.current}%</strong></span>
              <span style={{ color: '#F59E0B' }}>Gap: <strong>{gap.gap}%</strong></span>
              <span style={{ color: '#22C55E' }}>Target: <strong>{gap.target}%</strong></span>
            </div>

            <div className="trainee-progress-bar-wrap" style={{ height: 6, marginBottom: 14 }}>
              <div
                className="trainee-progress-bar-fill"
                style={{
                  width: `${gap.current}%`,
                  background: gap.priority === 'High' ? '#EF4444' : '#38BDF8'
                }}
              />
            </div>

            <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.5, flexGrow: 1, margin: '0 0 16px' }}>
              {gap.impact}
            </p>

            <div style={{ paddingTop: 14, borderTop: '1px solid #1E334A' }}>
              <small style={{ fontSize: 11, color: '#64748B', display: 'block', marginBottom: 4 }}>
                Recommended Course:
              </small>
              <strong style={{ fontSize: 12.5, color: '#E2E8F0', display: 'block', marginBottom: 12 }}>
                {gap.recommendedCourse}
              </strong>
              <button
                className="trainee-btn-secondary"
                style={{ width: '100%', fontSize: 12, padding: '8px' }}
                onClick={() => onNavigate('course-detail', { courseId: gap.recommendedCourseId })}
              >
                Explore Solution →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
