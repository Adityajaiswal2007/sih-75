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
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>
            Assessment Complete 🎉
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '0 0 20px' }}>
            {result.title} · Submitted {result.submittedAt}
          </p>

          {/* 4 Summary Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 12,
              background: '#0A1626',
              border: '1px solid #1E334A',
              borderRadius: 12,
              padding: '16px'
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#22C55E' }}>
                {result.correctAnswers}
              </div>
              <small style={{ color: '#94A3B8', fontSize: 11 }}>Correct Answers</small>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#EF4444' }}>
                {result.incorrectAnswers}
              </div>
              <small style={{ color: '#94A3B8', fontSize: 11 }}>Incorrect Answers</small>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#38BDF8' }}>
                {result.accuracy}%
              </div>
              <small style={{ color: '#94A3B8', fontSize: 11 }}>Accuracy Rate</small>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F59E0B' }}>
                {result.timeTaken}
              </div>
              <small style={{ color: '#94A3B8', fontSize: 11 }}>Time Taken</small>
            </div>
          </div>
        </div>

        {/* Competency Impact Section (Crucial requirement from prompt!) */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(13, 27, 42, 0.95) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: 14,
            padding: '24px',
            marginBottom: 28
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <strong style={{ fontSize: 16, color: '#fff' }}>Verified Competency Impact</strong>
                <p style={{ margin: 0, fontSize: 11.5, color: '#A5B4FC' }}>
                  Assessment answers immediately upgraded your institutional competency ledger
                </p>
              </div>
            </div>
            <span style={{ fontSize: 11, background: '#22C55E', color: '#07111F', fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
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
                  background: 'rgba(10, 22, 38, 0.7)',
                  border: '1px solid #1E334A',
                  borderRadius: 10
                }}
              >
                <strong style={{ color: '#fff', fontSize: 13.5 }}>{ci.skill}</strong>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#94A3B8', fontSize: 13 }}>{ci.before}%</span>
                  <span style={{ color: '#38BDF8' }}>→</span>
                  <strong style={{ color: '#22C55E', fontSize: 14 }}>{ci.after}%</strong>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#4ADE80',
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
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>
            📊 Performance Breakdown by Domain
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {result.performanceBreakdown.map((pb, idx) => (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  background: '#0A1626',
                  border: '1px solid #1E334A',
                  borderRadius: 10
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 6 }}>
                  <span style={{ color: '#CBD5E1', fontWeight: 600 }}>{pb.domain}</span>
                  <strong style={{ color: '#38BDF8' }}>{pb.score}%</strong>
                </div>
                <div className="trainee-progress-bar-wrap" style={{ height: 6, margin: 0 }}>
                  <div
                    className="trainee-progress-bar-fill"
                    style={{
                      width: `${pb.score}%`,
                      background: pb.score >= 90 ? '#22C55E' : '#38BDF8'
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
          <strong style={{ color: '#38BDF8', fontSize: 13, display: 'block', marginBottom: 4 }}>
            💬 Evaluator Feedback
          </strong>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
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
