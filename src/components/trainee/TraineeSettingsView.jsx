import React, { useState } from 'react';

export default function TraineeSettingsView({ showToast }) {
  const [prefs, setPrefs] = useState({
    courseUpdates: true,
    assessmentReminders: true,
    trainerRecommendations: true,
    announcements: true,
    achievementNotifications: true,
    weeklyDigest: false,
    darkMode: true
  });

  const toggle = key => {
    const next = !prefs[key];
    setPrefs({ ...prefs, [key]: next });
    if (showToast) {
      showToast(`Preference updated: ${key} is now ${next ? 'enabled' : 'disabled'}`);
    }
  };

  return (
    <div className="trainee-settings-view" style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#94A3B8', textTransform: 'uppercase' }}>
            SYSTEM CONFIGURATION
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Portal Settings</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Manage your notification alerts, learning preferences, and institutional privacy.
        </p>
      </div>

      {/* Notification Preferences Card */}
      <section className="trainee-panel" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 18px' }}>
          🔔 Notification Preferences
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { key: 'courseUpdates', title: 'Course & Module Updates', desc: 'Alerts when new lab exercises, dataset downloads, or lectures are published.' },
            { key: 'assessmentReminders', title: 'Assessment & Diagnostic Reminders', desc: 'Upcoming exam dates, diagnostic deadlines, and submission confirmations.' },
            { key: 'trainerRecommendations', title: 'Intelligent Trainer Recommendations', desc: 'Notifies you when a verified trainer matches newly diagnosed skill gaps.' },
            { key: 'announcements', title: 'Cohort & Directorate Announcements', desc: 'Broadcast notices regarding cloud cluster allocations and guest masterclasses.' },
            { key: 'achievementNotifications', title: 'Milestone & Certificate Notifications', desc: 'Receive instant alerts when competencies level up or certificates are minted.' },
            { key: 'weeklyDigest', title: 'Weekly Learning Summary Digest', desc: 'Receive a Monday email summarizing hours logged and next recommended steps.' }
          ].map(item => (
            <div
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                background: 'rgba(10, 22, 38, 0.6)',
                border: '1px solid #1E334A',
                borderRadius: 10
              }}
            >
              <div>
                <strong style={{ color: '#fff', fontSize: 13.5, display: 'block' }}>{item.title}</strong>
                <small style={{ color: '#94A3B8', fontSize: 12 }}>{item.desc}</small>
              </div>

              <button
                type="button"
                onClick={() => toggle(item.key)}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 20,
                  background: prefs[item.key] ? '#38BDF8' : '#1E334A',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: prefs[item.key] ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Preferences Card */}
      <section className="trainee-panel" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
          ⚙ Learning & Display Preferences
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ padding: '14px', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 10 }}>
            <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 6 }}>
              Default Code Notebook Environment
            </label>
            <select
              defaultValue="JupyterLab Python 3.11"
              style={{ width: '100%', background: '#0D1B2A', border: '1px solid #1E334A', color: '#fff', padding: '8px', borderRadius: 6, fontSize: 13 }}
            >
              <option>JupyterLab Python 3.11 (IMD HPC Cluster)</option>
              <option>Google Colab Enterprise</option>
              <option>Local Conda Environment</option>
            </select>
          </div>

          <div style={{ padding: '14px', background: '#0A1626', border: '1px solid #1E334A', borderRadius: 10 }}>
            <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 6 }}>
              Preferred Map Projection Framework
            </label>
            <select
              defaultValue="Cartopy Lambert Conformal"
              style={{ width: '100%', background: '#0D1B2A', border: '1px solid #1E334A', color: '#fff', padding: '8px', borderRadius: 6, fontSize: 13 }}
            >
              <option>Cartopy Lambert Conformal</option>
              <option>Cartopy Plate Carree (Equirectangular)</option>
              <option>QGIS Geospatial Server</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
