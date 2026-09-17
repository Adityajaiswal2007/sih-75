import React from 'react';
import {
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Star
} from 'lucide-react';

export default function RelatedTrainers({ similarTrainers, onSelectTrainer }) {
  if (!similarTrainers || similarTrainers.length === 0) return null;

  return (
    <section className="profile-section-card similar-trainers-card" id="section-similar-trainers">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge">
            <Users size={13} />
            COMPETENCY NETWORK
          </span>
          <h2 className="section-title">Similar Trainers &amp; Faculty Network</h2>
          <p className="section-subtitle">
            Other verified instructors with overlapping competency profiles in meteorological sciences, forecasting workflows, and atmospheric computing.
          </p>
        </div>
      </div>

      <div className="similar-trainers-grid">
        {similarTrainers.map((trainer) => (
          <div key={trainer.id} className="similar-trainer-card">
            {/* Top Bar: Avatar + Match Score Pill */}
            <div className="similar-card-header">
              <div className="similar-avatar-box">
                <div className="similar-avatar">
                  <span>{trainer.avatarInitials}</span>
                </div>
                <span className="similar-avatar-dot" title="Active Faculty Node" />
              </div>
              <div className="similar-match-pill">
                <Sparkles size={12} />
                <span>{trainer.matchScore}% Match</span>
              </div>
            </div>

            {/* Info Body */}
            <div className="similar-info">
              <div className="similar-name-row">
                <h3 className="similar-name">{trainer.name}</h3>
                <ShieldCheck size={16} className="similar-verify-icon" title="Accredited MoES/IMD Faculty" />
              </div>
              <p className="similar-designation">{trainer.designation}</p>
              <div className="similar-org">
                <Building size={13} className="similar-org-icon" />
                <span>{trainer.organization}</span>
              </div>
            </div>

            {/* Skills / Specialization Chips */}
            <div className="similar-skills-tags">
              {trainer.skills.map((skill, idx) => (
                <span key={idx} className="similar-skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats Row & Action CTA */}
            <div className="similar-footer">
              <div className="similar-stats-row">
                <div className="similar-stat-item">
                  <GraduationCap size={13} />
                  <span><b>{trainer.coursesCount}</b> Courses</span>
                </div>
                <span className="similar-stat-divider">•</span>
                <div className="similar-stat-item">
                  <Users size={13} />
                  <span><b>{trainer.traineesCount}</b> Trainees</span>
                </div>
                <span className="similar-stat-divider">•</span>
                <div className="similar-stat-item rating">
                  <Star size={12} fill="#B58B32" stroke="#B58B32" />
                  <span><b>{trainer.rating}</b></span>
                </div>
              </div>

              <button
                type="button"
                className="similar-view-profile-btn"
                onClick={() => onSelectTrainer(trainer)}
                id={`btn-view-similar-${trainer.id}`}
              >
                <span>View Full Profile</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
