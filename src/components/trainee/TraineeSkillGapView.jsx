import React from 'react';
import { skillGaps } from './traineeData';

export default function TraineeSkillGapView({ onNavigate, onOpenTrainerProfile }) {
  return (
    <div className="trainee-skill-gap-view">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#B58B32', textTransform: 'uppercase' }}>
            DIAGNOSTIC INTELLIGENCE
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#16251B', margin: 0 }}>Skill Gap Analysis</h1>
        <p style={{ color: '#485563', fontSize: 13.5, margin: '4px 0 0' }}>
          Identify priority competency areas where targeted coursework and expert faculty mentoring will maximize your career growth.
        </p>
      </div>

      {/* Featured Primary Gap Card */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #D6E3D8',
          borderRadius: 16,
          padding: '28px',
          marginBottom: 32,
          boxShadow: '0 4px 16px rgba(22, 37, 27, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#B58B32',
              background: '#EEF6EA',
              padding: '4px 10px',
              borderRadius: 20,
              border: '1px solid #D6E3D8'
            }}
          >
            🔥 Highest Priority Growth Area
          </span>
          <span style={{ fontSize: 12, color: '#485563' }}>Domain: Meteorology</span>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#16251B', margin: '0 0 14px' }}>
          {skillGaps[0].skill}
        </h2>

        {/* Gap Numerical Metric Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '16px 20px',
            background: '#EEF6EA',
            border: '1px solid #D6E3D8',
            borderRadius: 12,
            marginBottom: 18,
            flexWrap: 'wrap'
          }}
        >
          <div>
            <small style={{ fontSize: 11, color: '#485563', textTransform: 'uppercase' }}>Current Level</small>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2F5233' }}>{skillGaps[0].current}%</div>
          </div>
          <span style={{ fontSize: 20, color: '#718078' }}>→</span>
          <div>
            <small style={{ fontSize: 11, color: '#485563', textTransform: 'uppercase' }}>Target Benchmark</small>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2F6B3C' }}>{skillGaps[0].target}%</div>
          </div>
          <span style={{ fontSize: 20, color: '#718078' }}>·</span>
          <div>
            <small style={{ fontSize: 11, color: '#485563', textTransform: 'uppercase' }}>Diagnosed Gap</small>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#B58B32' }}>{skillGaps[0].gap}%</div>
          </div>
          <span style={{ fontSize: 20, color: '#718078' }}>·</span>
          <div>
            <small style={{ fontSize: 11, color: '#485563', textTransform: 'uppercase' }}>Priority Level</small>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#B94A48' }}>High Priority</div>
          </div>
        </div>

        <p style={{ color: '#485563', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 22px' }}>
          {skillGaps[0].impact}
        </p>

        {/* Action Pair: Recommended Course + Recommended Trainer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div
            style={{
              padding: '16px',
              background: '#E6F4EA',
              border: '1px solid #D6E3D8',
              borderRadius: 12
            }}
          >
            <span style={{ fontSize: 11, color: '#2F5233', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              📚 RECOMMENDED COURSE
            </span>
            <strong style={{ color: '#16251B', fontSize: 14, display: 'block', marginBottom: 10 }}>
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
              background: '#EEF6EA',
              border: '1px solid #D6E3D8',
              borderRadius: 12
            }}
          >
            <span style={{ fontSize: 11, color: '#2F5233', fontWeight: 600, display: 'block', marginBottom: 4 }}>
              👨‍🏫 TOP MATCHED TRAINER
            </span>
            <strong style={{ color: '#16251B', fontSize: 14, display: 'block', marginBottom: 2 }}>
              {skillGaps[0].recommendedTrainer.name}
            </strong>
            <small style={{ color: '#485563', fontSize: 12, display: 'block', marginBottom: 10 }}>
              {skillGaps[0].recommendedTrainer.match}% Competency Match · {skillGaps[0].recommendedTrainer.experience}
            </small>
            <button
              className="trainee-btn-intel"
              style={{ fontSize: 12, padding: '8px 16px' }}
              onClick={() => {
                if (onOpenTrainerProfile) {
                  onOpenTrainerProfile(skillGaps[0].recommendedTrainer);
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
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#16251B', margin: '0 0 16px' }}>
        Other Diagnosed Competency Gaps
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {skillGaps.slice(1).map(gap => (
          <div
            key={gap.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #D6E3D8',
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
                  background: '#EEF6EA',
                  color: gap.priorityColor,
                  fontWeight: 700,
                  border: `1px solid ${gap.priorityColor}40`
                }}
              >
                {gap.priority} Priority
              </span>
              <span style={{ fontSize: 11, color: '#718078' }}>{gap.domain}</span>
            </div>

            <h4 style={{ color: '#16251B', fontSize: 16, margin: '0 0 12px' }}>{gap.skill}</h4>

            {/* Gap meter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: '#485563' }}>Current: <strong style={{ color: '#16251B' }}>{gap.current}%</strong></span>
              <span style={{ color: '#B58B32' }}>Gap: <strong>{gap.gap}%</strong></span>
              <span style={{ color: '#2F6B3C' }}>Target: <strong>{gap.target}%</strong></span>
            </div>

            <div className="trainee-progress-bar-wrap" style={{ height: 6, marginBottom: 14 }}>
              <div
                className="trainee-progress-bar-fill"
                style={{
                  width: `${gap.current}%`,
                  background: gap.priority === 'High' ? '#B94A48' : '#2F5233'
                }}
              />
            </div>

            <p style={{ fontSize: 12, color: '#485563', lineHeight: 1.5, flexGrow: 1, margin: '0 0 16px' }}>
              {gap.impact}
            </p>

            <div style={{ paddingTop: 14, borderTop: '1px solid #D6E3D8' }}>
              <small style={{ fontSize: 11, color: '#718078', display: 'block', marginBottom: 4 }}>
                Recommended Course:
              </small>
              <strong style={{ fontSize: 12.5, color: '#16251B', display: 'block', marginBottom: 12, fontWeight: 700 }}>
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
