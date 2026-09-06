import React, { useState } from 'react';
import { recommendedTrainers } from './traineeData';

export default function TraineeTrainerMatchView({ onNavigate, onOpenTrainerProfile }) {
  const [filterExpertise, setFilterExpertise] = useState('All');
  const bestMatch = recommendedTrainers.find(t => t.isBestMatch) || recommendedTrainers[0];

  const handleViewProfile = (trainerId) => {
    if (onOpenTrainerProfile) {
      onOpenTrainerProfile(trainerId);
    } else {
      window.location.hash = '#trainer-profile';
    }
  };

  const filteredTrainers = recommendedTrainers.filter(
    t => filterExpertise === 'All' || t.expertise.includes(filterExpertise)
  );

  return (
    <div className="trainee-trainer-match-view">
      {/* Page Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#6366F1', textTransform: 'uppercase' }}>
            INTELLIGENT FACULTY MATCHING
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>
          Trainer Recommendations
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Connect with verified faculty whose research and pedagogical specializations match your diagnosed competency gaps.
        </p>
      </div>

      {/* Featured "Best Match" Detailed Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(13, 27, 42, 0.98) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: 16,
          padding: '32px',
          marginBottom: 36,
          position: 'relative',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="trainee-best-match-pill">★ #1 RECOMMENDED FACULTY MATCH</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div
            className="trainee-trainer-avatar"
            style={{ width: 72, height: 72, fontSize: 24, borderWidth: 3 }}
          >
            {bestMatch.avatar}
          </div>

          <div style={{ flexGrow: 1, maxWidth: 640 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
              {bestMatch.name}
            </h2>
            <div style={{ color: '#38BDF8', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
              {bestMatch.role} · {bestMatch.organization}
            </div>
            <p style={{ color: '#CBD5E1', fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
              {bestMatch.tagline}
            </p>

            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#F59E0B' }}>★</span>
                <strong style={{ color: '#fff' }}>{bestMatch.rating}</strong>
                <small style={{ color: '#94A3B8' }}>({bestMatch.reviewsCount} reviews)</small>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 12.5 }}>
                👨‍🎓 <strong>{bestMatch.traineesTrained}+</strong> trainees mentored
              </div>
              <div style={{ color: '#94A3B8', fontSize: 12.5 }}>
                ⏳ <strong>{bestMatch.experience}</strong> research seniority
              </div>
            </div>
          </div>

          {/* Match Score Gauge */}
          <div
            style={{
              padding: '16px 24px',
              background: 'rgba(10, 22, 38, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 14,
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 900, color: '#38BDF8', lineHeight: 1 }}>
              {bestMatch.matchScore}%
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#A5B4FC', textTransform: 'uppercase', display: 'block', marginTop: 4 }}>
              Competency Match
            </span>
          </div>
        </div>

        {/* Why this trainer? Section */}
        <div
          style={{
            background: 'rgba(10, 22, 38, 0.7)',
            border: '1px solid #1E334A',
            borderRadius: 12,
            padding: '20px',
            marginBottom: 24
          }}
        >
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#A5B4FC', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            🧠 Why is this trainer recommended for you?
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {bestMatch.matchReasons.map((reason, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: '#CBD5E1' }}>
                <span style={{ color: '#22C55E', fontWeight: 700 }}>✓</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Competency Comparison Table */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
            Direct Competency Alignment
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {bestMatch.trainerCompetencies.map((comp, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(13, 27, 42, 0.6)',
                  border: '1px solid #1E334A',
                  borderRadius: 10
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#22C55E', fontWeight: 700, fontSize: 12 }}>✓ Matched</span>
                  <span style={{ color: '#38BDF8', fontWeight: 700, fontSize: 12 }}>{comp.level}%</span>
                </div>
                <strong style={{ color: '#fff', fontSize: 12.5, display: 'block' }}>{comp.name}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14 }}>
          <button
            className="trainee-btn-intel"
            style={{ fontSize: 13.5, padding: '12px 24px' }}
            onClick={() => handleViewProfile(bestMatch.id)}
          >
            View Full Trainer Profile ↗
          </button>
          <button
            className="trainee-btn-secondary"
            onClick={() => onNavigate('course-detail', { courseId: 'crs-001' })}
          >
            Explore Courses Taught
          </button>
        </div>
      </div>

      {/* All Verified Faculty Discovery Grid */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0 }}>
          All Recommended Faculty Matches
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Meteorology', 'Remote Sensing', 'Machine Learning'].map(tag => (
            <button
              key={tag}
              className={`trainee-filter-chip ${filterExpertise === tag ? 'active' : ''}`}
              style={{ fontSize: 11, padding: '4px 10px' }}
              onClick={() => setFilterExpertise(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="trainee-trainers-grid">
        {filteredTrainers.map(trainer => (
          <div
            key={trainer.id}
            className={`trainee-trainer-card ${trainer.isBestMatch ? 'best-match' : ''}`}
          >
            {trainer.isBestMatch && (
              <span
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontSize: 10,
                  fontWeight: 700,
                  background: '#6366F1',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: 10
                }}
              >
                Top Pick
              </span>
            )}

            <div className="trainee-trainer-header">
              <div className="trainee-trainer-avatar">{trainer.avatar}</div>
              <div className="trainee-trainer-name-box">
                <h4>{trainer.name}</h4>
                <p>{trainer.organization}</p>
              </div>
            </div>

            <div className="trainee-trainer-match-score">
              <strong>{trainer.matchScore}%</strong>
              <small>Competency Match for your learning path</small>
            </div>

            <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 14px', lineHeight: 1.5 }}>
              {trainer.tagline}
            </p>

            <div className="trainee-trainer-tags">
              {trainer.coursesTaught.map((crs, idx) => (
                <span key={idx} className="trainee-trainer-tag">
                  {crs}
                </span>
              ))}
            </div>

            <div style={{ paddingTop: 14, borderTop: '1px solid #1E334A', display: 'flex', gap: 10 }}>
              <button
                className="trainee-btn-primary"
                style={{ width: '100%', fontSize: 12, padding: '8px' }}
                onClick={() => handleViewProfile(trainer.id)}
              >
                View Profile ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
