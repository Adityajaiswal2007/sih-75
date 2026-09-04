import React from 'react';
import {
  Briefcase,
  Calendar,
  Building,
  CheckCircle2,
  Award,
  ChevronRight
} from 'lucide-react';

export default function ExperienceTimeline({ experiences }) {
  return (
    <section className="profile-section-card experience-card" id="section-experience">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge">
            <Briefcase size={13} />
            CAREER & MILESTONES
          </span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Track record of institutional instructional leadership, research delivery, and domain training.
          </p>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-spine-line" />

        <div className="timeline-items-list">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`timeline-item ${exp.isCurrent ? 'current-item' : ''}`}>
              {/* Timeline marker with pulsing dot if current */}
              <div className="timeline-node">
                <div className="node-outer-circle">
                  <div className="node-inner-dot" />
                </div>
              </div>

              {/* Card content */}
              <div className="timeline-card-content">
                <div className="timeline-card-header">
                  <div className="role-and-org">
                    <div className="period-badge-row">
                      <span className={`period-pill ${exp.isCurrent ? 'current-pill' : ''}`}>
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      {exp.isCurrent && (
                        <span className="active-role-tag">
                          Current Position
                        </span>
                      )}
                    </div>
                    <h3 className="timeline-job-title">{exp.title}</h3>
                    <div className="timeline-org-row">
                      <Building size={14} className="org-icon" />
                      <span className="timeline-org-name">{exp.organization}</span>
                      <span className="org-location">• {exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="timeline-summary">{exp.description}</p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="timeline-highlights-box">
                    <span className="hl-kicker">Key Contributions:</span>
                    <ul className="hl-list">
                      {exp.highlights.map((hl, hIdx) => (
                        <li key={hIdx}>
                          <CheckCircle2 size={13} className="text-cyan" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
