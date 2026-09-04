import React, { useState } from 'react';

export function TrainerSettingsView({ onSave }) {
  const [profileForm, setProfileForm] = useState({
    name: 'Dr. Rahul Sharma',
    designation: 'Senior Meteorology & Data Analytics Trainer',
    organization: 'India Meteorological Department (IMD), New Delhi',
    email: 'dr.rahul.sharma@imd.gov.in',
    phone: '+91 98765 43210',
    bio: 'Senior Trainer with 8+ years of capacity building experience in numerical weather prediction, climate analytics, and Doppler radar interpretation.',
    notifyEmail: true,
    notifyAnnouncements: true,
    weeklyReport: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave('Trainer profile preferences updated successfully!');
  };

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Account & Portal Settings</h1>
          <p>Configure your trainer profile, institutional credentials, and notification preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="portal-settings-grid">
        <div className="portal-settings-card">
          <h3>Professional Profile Details</h3>
          <div className="portal-form-group">
            <label>Full Name</label>
            <input
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            />
          </div>
          <div className="portal-form-group">
            <label>Designation / Academic Title</label>
            <input
              value={profileForm.designation}
              onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
            />
          </div>
          <div className="portal-form-group">
            <label>Organization / Department</label>
            <input
              value={profileForm.organization}
              onChange={(e) => setProfileForm({ ...profileForm, organization: e.target.value })}
            />
          </div>
          <div className="portal-form-group">
            <label>Institutional Email</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
            />
          </div>
          <div className="portal-form-group">
            <label>Professional Bio</label>
            <textarea
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
            />
          </div>
        </div>

        <div className="portal-settings-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3>Notification & Delivery Preferences</h3>
            <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#cfe2f5', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={profileForm.notifyEmail}
                  onChange={(e) => setProfileForm({ ...profileForm, notifyEmail: e.target.checked })}
                />
                Email alerts when trainees submit assessments
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#cfe2f5', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={profileForm.notifyAnnouncements}
                  onChange={(e) => setProfileForm({ ...profileForm, notifyAnnouncements: e.target.checked })}
                />
                Push notifications for cohort announcements
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#cfe2f5', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={profileForm.weeklyReport}
                  onChange={(e) => setProfileForm({ ...profileForm, weeklyReport: e.target.checked })}
                />
                Weekly automated cohort competency growth digest
              </label>
            </div>

            <h3>Institutional Verification</h3>
            <div style={{ padding: 14, background: '#07182c', border: '1px solid #1a446c', borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#34d399', fontSize: 13, fontWeight: 'bold' }}>
                <span>✓</span> Verified Institutional Trainer
              </div>
              <small style={{ display: 'block', color: '#7ba2c6', fontSize: 11, marginTop: 4 }}>
                MoES Faculty ID: IMD-FAC-8842 · IIT Delhi Alumnus
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button type="button" className="button outline small" onClick={() => alert('Settings reset')}>Reset</button>
            <button type="submit" className="button small">Save Settings</button>
          </div>
        </div>
      </form>
    </div>
  );
}
