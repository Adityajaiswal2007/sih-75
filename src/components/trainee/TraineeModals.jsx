import React, { useState } from 'react';
import { traineeUser } from './traineeData';

export function EnrollmentModal({ course, onClose, onConfirm }) {
  if (!course) return null;

  return (
    <div className="trainee-modal-backdrop" onClick={onClose}>
      <div className="trainee-modal-container" onClick={e => e.stopPropagation()}>
        <button className="trainee-modal-close-btn" onClick={onClose}>✕</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 24 }}>🎓</span>
          <span className="trainee-course-category-badge">{course.category}</span>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
          Confirm Course Enrollment
        </h2>
        <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 20px', lineHeight: 1.5 }}>
          You are about to enroll in <strong>{course.title}</strong> instructed by <strong>{course.instructor}</strong>.
        </p>

        {/* Course Info Summary Box */}
        <div
          style={{
            background: '#0A1626',
            border: '1px solid #1E334A',
            borderRadius: 12,
            padding: '16px',
            marginBottom: 20
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Duration</small>
              <strong style={{ color: '#fff', display: 'block', fontSize: 14 }}>{course.duration}</strong>
            </div>
            <div>
              <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Modules</small>
              <strong style={{ color: '#fff', display: 'block', fontSize: 14 }}>{course.modulesCount} Lessons</strong>
            </div>
            <div>
              <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Skill Level</small>
              <strong style={{ color: '#38BDF8', display: 'block', fontSize: 14 }}>{course.difficulty}</strong>
            </div>
            <div>
              <small style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase' }}>Certification</small>
              <strong style={{ color: '#22C55E', display: 'block', fontSize: 14 }}>Accredited MoES</strong>
            </div>
          </div>

          <div>
            <small style={{ fontSize: 11, color: '#A5B4FC', fontWeight: 600, display: 'block', marginBottom: 6 }}>
              ◎ Competencies Gained Upon Completion:
            </small>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {course.competencies.map((comp, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 11,
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#A5B4FC',
                    padding: '2px 8px',
                    borderRadius: 4
                  }}
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Expected Outcome */}
        <div style={{ marginBottom: 24 }}>
          <strong style={{ fontSize: 13, color: '#CBD5E1', display: 'block', marginBottom: 4 }}>
            Expected Learning Outcome
          </strong>
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            Mastery in real-world atmospheric analysis workflows, leading to verifiable progression toward senior meteorological forecasting responsibilities.
          </p>
        </div>

        {/* Modal Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="trainee-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="trainee-btn-primary"
            onClick={() => onConfirm(course)}
          >
            Confirm Enrollment ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export function CertificateModal({ certificate, onClose, onDownload }) {
  if (!certificate) return null;

  return (
    <div className="trainee-modal-backdrop" onClick={onClose}>
      <div
        className="trainee-modal-container"
        style={{ maxWidth: 720, padding: 32 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="trainee-modal-close-btn" onClick={onClose}>✕</button>

        {/* Stylized Certificate Document Frame */}
        <div
          style={{
            border: '2px solid rgba(56, 189, 248, 0.4)',
            borderRadius: 12,
            padding: '32px 28px',
            background: 'linear-gradient(135deg, #07111F 0%, #0A1626 100%)',
            textAlign: 'center',
            position: 'relative',
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Emblem Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>🏛</span>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>
                MINISTRY OF EARTH SCIENCES · GOVERNMENT OF INDIA
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#38BDF8', letterSpacing: 1 }}>
                CAPACITYCONNECT ACCREDITATION BOARD
              </div>
            </div>
          </div>

          <div style={{ width: 120, height: 2, background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)', margin: '14px auto 18px' }} />

          <span style={{ fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>
            Certificate of Professional Competency
          </span>

          <p style={{ fontSize: 13, color: '#CBD5E1', margin: '12px 0 6px' }}>
            This is to officially certify that
          </p>

          <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: 0.5 }}>
            {certificate.recipient}
          </h2>

          <p style={{ fontSize: 13, color: '#94A3B8', maxWidth: 520, margin: '0 auto 18px', lineHeight: 1.5 }}>
            has successfully completed the intensive institutional curriculum and passed the diagnostic assessment with distinction in
          </p>

          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#38BDF8', margin: '0 0 16px' }}>
            {certificate.title}
          </h3>

          {/* Competency Badges on Cert */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {certificate.competencies.map((comp, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: 11,
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: '#CBD5E1',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '3px 10px',
                  borderRadius: 12
                }}
              >
                ✓ {comp}
              </span>
            ))}
          </div>

          {/* Signatures & Seal */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 18, borderTop: '1px solid #1E334A' }}>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ fontSize: 12, color: '#fff', display: 'block' }}>{certificate.signatory}</strong>
              <small style={{ fontSize: 11, color: '#94A3B8' }}>Directorate General</small>
            </div>

            {/* Gold Seal Graphic */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px dashed #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B',
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase'
              }}
            >
              SEAL
            </div>

            <div style={{ textAlign: 'right' }}>
              <strong style={{ fontSize: 12, color: '#fff', display: 'block', fontFamily: 'monospace' }}>
                {certificate.code}
              </strong>
              <small style={{ fontSize: 11, color: '#22C55E' }}>Verified: {certificate.issueDate}</small>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
          <button className="trainee-btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="trainee-btn-primary"
            onClick={() => onDownload(certificate)}
          >
            Download High-Res PDF Certificate ⤓
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditProfileModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: traineeUser.name,
    email: traineeUser.email,
    mobile: traineeUser.mobile,
    organization: traineeUser.organization,
    designation: traineeUser.designation,
    level: traineeUser.level,
    interests: traineeUser.interests.join(', ')
  });

  const handleChange = (field, val) => {
    setFormData({ ...formData, [field]: val });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="trainee-modal-backdrop" onClick={onClose}>
      <div className="trainee-modal-container" onClick={e => e.stopPropagation()}>
        <button className="trainee-modal-close-btn" onClick={onClose}>✕</button>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>
          Edit Trainee Profile
        </h2>
        <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 20px' }}>
          Update your academic affiliation and research focus areas.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                style={{ width: '100%', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Institutional Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                style={{ width: '100%', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Organization / Division</label>
              <input
                type="text"
                value={formData.organization}
                onChange={e => handleChange('organization', e.target.value)}
                style={{ width: '100%', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 }}
                required
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={e => handleChange('designation', e.target.value)}
                style={{ width: '100%', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>Areas of Interest (comma-separated)</label>
            <input
              type="text"
              value={formData.interests}
              onChange={e => handleChange('interests', e.target.value)}
              style={{ width: '100%', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13 }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
            <button type="button" className="trainee-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="trainee-btn-primary">
              Save Profile Changes ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
