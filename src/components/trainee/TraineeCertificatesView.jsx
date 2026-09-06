import React, { useState } from 'react';
import { mockCertificates } from './traineeData';

export default function TraineeCertificatesView({ onViewCertificate, showToast }) {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = (cert) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      setDownloadingId(null);
      if (showToast) {
        showToast(`Official PDF Certificate (${cert.code}) downloaded successfully!`);
      }
    }, 1200);
  };

  return (
    <div className="trainee-certificates-view">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#22C55E', textTransform: 'uppercase' }}>
            VERIFIED CREDENTIALS
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>My Certificates</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Official institutional certifications issued by the Ministry of Earth Sciences and partner research centers.
        </p>
      </div>

      {/* Grid of Certificates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {mockCertificates.map(cert => (
          <div
            key={cert.id}
            style={{
              background: 'linear-gradient(135deg, rgba(13, 27, 42, 0.95), rgba(16, 31, 49, 0.98))',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.35)',
              position: 'relative'
            }}
          >
            {/* Top Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#4ADE80',
                  background: 'rgba(34, 197, 94, 0.15)',
                  padding: '3px 8px',
                  borderRadius: 12,
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}
              >
                ✓ Cryptographically Verified
              </span>
              <span style={{ fontSize: 11, color: '#64748B', fontFamily: 'monospace' }}>
                {cert.code}
              </span>
            </div>

            <div style={{ fontSize: 32, marginBottom: 8 }}>📜</div>

            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
              {cert.title}
            </h3>

            <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 16px', lineHeight: 1.4 }}>
              Awarded to <strong style={{ color: '#CBD5E1' }}>{cert.recipient}</strong> with {cert.grade} ({cert.score}% Score).
            </p>

            <div style={{ fontSize: 11.5, color: '#64748B', marginBottom: 16 }}>
              Issued: <strong>{cert.issueDate}</strong> · {cert.authority}
            </div>

            {/* Competency Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, flexGrow: 1 }}>
              {cert.competencies.map((comp, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 10.5,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: 'rgba(30, 51, 74, 0.6)',
                    color: '#A5B4FC'
                  }}
                >
                  {comp}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 14, borderTop: '1px solid #1E334A' }}>
              <button
                className="trainee-btn-primary"
                style={{ flex: 1, fontSize: 12, padding: '8px' }}
                onClick={() => onViewCertificate && onViewCertificate(cert)}
              >
                View Certificate ↗
              </button>

              <button
                className="trainee-btn-secondary"
                style={{ flex: 1, fontSize: 12, padding: '8px' }}
                onClick={() => handleDownload(cert)}
              >
                {downloadingId === cert.id ? 'Exporting PDF...' : 'Download PDF ⤓'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
