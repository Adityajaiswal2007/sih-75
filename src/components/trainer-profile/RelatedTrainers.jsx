import React from 'react';
import {
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';

export default function RelatedTrainers({ similarTrainers, onSelectTrainer }) {
  return (
    <section className="profile-section-card similar-trainers-card" id="section-similar-trainers">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge">
            <Users size={13} />
            COMPETENCY NETWORK
          </span>
          <h2 className="section-title">Similar Trainers</h2>
          <p className="section-subtitle">
            Other verified instructors with overlapping competency profiles in meteorological data and computational sciences.
          </p>
        </div>
      </div>

      <div className="similar-trainers-grid">
        {similarTrainers.map((trainer) => (
          <div key={trainer.id} className="similar-trainer-card">
            <div className="similar-card-header">
              <div className="similar-avatar">
                <span>{trainer.avatarInitials}</span>
              </div>
              <div className="similar-match-pill">
                <Sparkles size={11} />
                <span>{trainer.matchScore}% Match</span>
              </div>
            </div>

            <div className="similar-info">
              <div className="similar-name-row">
                <h3 className="similar-name">{trainer.name}</h3>
                <ShieldCheck size={14} className="text-cyan" title="Verified Trainer" />
              </div>
              <p className="similar-designation">{trainer.designation}</p>
              <span className="similar-org">
                <Building size={12} />
                {trainer.organization}
              </span>
            </div>

            <div className="similar-skills-tags">
              {trainer.skills.map((skill, idx) => (
                <span key={idx} className="similar-skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="similar-footer">
              <div className="similar-stats-row">
                <span><b>{trainer.coursesCount}</b> Courses</span>
                <span>•</span>
                <span><b>{trainer.traineesCount}</b> Trainees</span>
                <span>•</span>
                <span>★ <b>{trainer.rating}</b></span>
              </div>

              <button
                className="cc-btn cc-btn-secondary full-width small"
                onClick={() => onSelectTrainer(trainer)}
                id={`btn-view-similar-${trainer.id}`}
              >
                <span>View Profile</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
