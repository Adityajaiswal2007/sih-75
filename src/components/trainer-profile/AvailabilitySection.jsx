import React from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Zap,
  Globe2,
  Building,
  GraduationCap,
  ClipboardCheck,
  Clock,
  Send
} from 'lucide-react';

export default function AvailabilitySection({ onRequestTrainingModal }) {
  const formats = [
    {
      title: 'Online Training',
      desc: 'Interactive virtual cohorts with hands-on live code labs and digital breakout sessions.',
      icon: Globe2
    },
    {
      title: 'Institutional Workshops',
      desc: 'On-site intensive bootcamp delivery for MoES/IMD scientific centers and partner institutes.',
      icon: Building
    },
    {
      title: 'Course Delivery',
      desc: 'Full-semester or multi-week modular training programs with graded assessment milestones.',
      icon: GraduationCap
    },
    {
      title: 'Assessment Support',
      desc: 'Subject matter evaluation, rubric design, question bank formulation and competency auditing.',
      icon: ClipboardCheck
    }
  ];

  return (
    <section className="profile-section-card availability-card" id="section-availability">
      <div className="availability-inner-box">
        {/* Ambient glow */}
        <div className="availability-glow-orb" />

        <div className="availability-header-row">
          <div className="avail-badge-wrap">
            <span className="section-badge avail-badge">
              <CalendarCheck size={13} />
              TRAINING CAPACITY & BOOKING
            </span>
            <h2 className="availability-title">Training Availability</h2>
            <p className="availability-subtitle">
              Dr. Rahul Sharma is currently accepting institutional training cohorts and workshop delivery engagements.
            </p>
          </div>

          <div className="availability-status-pill">
            <span className="avail-pulse-dot" />
            <span>Open for Q3/Q4 2026 Cohorts</span>
          </div>
        </div>

        {/* Format Offerings Grid */}
        <div className="formats-grid">
          {formats.map((fmt, idx) => {
            const IconComp = fmt.icon;
            return (
              <div key={idx} className="format-card-item">
                <div className="format-icon-wrap">
                  <IconComp size={18} />
                </div>
                <div className="format-body">
                  <div className="format-title-row">
                    <CheckCircle2 size={13} className="text-teal" />
                    <strong className="format-name">{fmt.title}</strong>
                  </div>
                  <p className="format-desc">{fmt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="availability-cta-bar">
          <div className="cta-lead-text">
            <strong>Ready to elevate your team's meteorological competencies?</strong>
            <span>Submit a training cohort request or invite Dr. Sharma to your institution.</span>
          </div>

          <button
            className="cc-btn cc-btn-primary large-cta"
            onClick={onRequestTrainingModal}
            id="btn-request-training-bottom"
          >
            <Zap size={16} />
            <span>Request Training Cohort</span>
          </button>
        </div>
      </div>
    </section>
  );
}
