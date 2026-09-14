import React from 'react';
import { mockAssessmentResult } from './traineeData';

export default function TraineeResultView({ onNavigate }) {
  const result = mockAssessmentResult;

  return (
    <div className="trainee-result-view" style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Back Link */}
      <button
        className="trainee-panel-link"
        style={{ marginBottom: 20 }}
        onClick={() => onNavigate('dashboard')}
      >
        ← Back to Dashboard
      </button>

      {/* Main Result Card */}
      <div className="trainee-result-card">
        {/* Hero Score Section */}
        <div className="trainee-result-hero">
          <div className="trainee-result-score-circle">
            <strong>{result.score}%</strong>
            <small>{result.status}</small>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#16251B', margin: '0 0 6px' }}>
            Assessment Complete 🎉
          </h2>
          <p style={{ color: '#485563', fontSize: 13.5, margin: '0 0 20px' }}>
            {result.title} · Submitted {result.submittedAt}
          </p>

          {/* 4 Summary Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 12,
              background: '#EEF6EA',
              border: '1px solid #D6E3D8',
              borderRadius: 12,
              padding: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#2F6B3C' }}>
                {result.correctAnswers}
              </div>
              <small style={{ color: '#485563', fontSize: 11 }}>Correct Answers</small>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#B94A48' }}>
                {result.incorrectAnswers}
              </div>
              <small style={{ color: '#485563', fontSize: 11 }}>Incorrect Answers</small>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#2F5233' }}>
                {result.accuracy}%
              </div>
              <small style={{ color: '#485563', fontSize: 11 }}>Accuracy Rate</small>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#B58B32' }}>
                {result.timeTaken}
              </div>
              <small style={{ color: '#485563', fontSize: 11 }}>Time Taken</small>
            </div>
          </div>
        </div>

        {/* Competency Impact Section (Crucial requirement from prompt!) */}
        <div
          style={{
            background: '#E6F4EA',
            border: '1px solid #D6E3D8',
            borderRadius: 14,
            padding: '24px',
            marginBottom: 28
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <strong style={{ fontSize: 16, color: '#16251B' }}>Verified Competency Impact</strong>
                <p style={{ margin: 0, fontSize: 11.5, color: '#2F5233' }}>
                  Assessment answers immediately upgraded your institutional competency ledger
                </p>
              </div>
            </div>
            <span style={{ fontSize: 11, background: '#2F6B3C', color: '#FFFFFF', fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
              Updated Live
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {result.competencyImpact.map((ci, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #D6E3D8',
                  borderRadius: 10
                }}
              >
                <strong style={{ color: '#16251B', fontSize: 13.5 }}>{ci.skill}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#485563', fontSize: 13 }}>{ci.before}%</span>
                  <span style={{ color: '#2F5233' }}>→</span>
                  <strong style={{ color: '#2F6B3C', fontSize: 14 }}>{ci.after}%</strong>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#2F6B3C',
                      background: 'rgba(34, 197, 94, 0.15)',
                      padding: '2px 8px',
                      borderRadius: 12
                    }}
                  >
                    {ci.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Breakdown */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#16251B', margin: '0 0 14px' }}>
            📊 Performance Breakdown by Domain
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {result.performanceBreakdown.map((pb, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  background: '#EEF6EA',
                  border: '1px solid #D6E3D8',
                  borderRadius: 10
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                  <span style={{ color: '#485563', fontWeight: 600 }}>{pb.domain}</span>
                  <strong style={{ color: '#2F5233' }}>{pb.score}%</strong>
                </div>
                <div className="trainee-progress-bar-wrap" style={{ height: 6, margin: 0 }}>
                  <div
                    className="trainee-progress-bar-fill"
                    style={{
                      width: `${pb.score}%`,
                      background: pb.score >= 90 ? '#2F6B3C' : '#2F5233'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Faculty Feedback */}
        <div
          style={{
            padding: '16px 20px',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: 12,
            marginBottom: 28
          }}
        >
          <strong style={{ color: '#2F5233', fontSize: 13, display: 'block', marginBottom: 4 }}>
            💬 Evaluator Feedback
          </strong>
          <p style={{ color: '#485563', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            {result.feedback}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          <button
            className="trainee-btn-primary"
            onClick={() => onNavigate('competencies')}
          >
            View Competency Profile →
          </button>
          <button
            className="trainee-btn-intel"
            onClick={() => onNavigate('certificates')}
          >
            Claim Verified Certificate 🎓
          </button>
          <button
            className="trainee-btn-secondary"
            onClick={() => onNavigate('learning')}
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}
