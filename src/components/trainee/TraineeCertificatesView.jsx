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
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#2F6B3C', textTransform: 'uppercase' }}>
            VERIFIED CREDENTIALS
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#16251B', margin: 0 }}>My Certificates</h1>
        <p style={{ color: '#485563', fontSize: 13.5, margin: '4px 0 0' }}>
          Official institutional certifications issued by the Ministry of Earth Sciences and partner research centers.
        </p>
      </div>

      {/* Grid of Certificates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {mockCertificates.map(cert => (
          <div
            key={cert.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #D6E3D8',
              borderTop: '4px solid #2F6B3C',
              borderRadius: 16,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 16px rgba(22, 37, 27, 0.06)',
              position: 'relative',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {/* Top Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: '#2F6B3C',
                  background: '#E6F4EA',
                  padding: '3px 8px',
                  borderRadius: 12,
                  border: '1px solid rgba(47, 107, 60, 0.3)'
                }}
              >
                ✓ Cryptographically Verified
              </span>
              <span style={{ fontSize: 11, color: '#718078', fontFamily: 'monospace', fontWeight: 600 }}>
                {cert.code}
              </span>
            </div>

            <div style={{ fontSize: 32, marginBottom: 8 }}>📜</div>

            <h3 style={{ fontSize: 17, fontWeight: 800, color: '#16251B', margin: '0 0 8px', lineHeight: 1.35 }}>
              {cert.title}
            </h3>

            <p style={{ fontSize: 12.5, color: '#485563', margin: '0 0 14px', lineHeight: 1.5 }}>
              Awarded to <strong style={{ color: '#16251B' }}>{cert.recipient}</strong> with {cert.grade} ({cert.score}% Score).
            </p>

            <div style={{ fontSize: 11.5, color: '#718078', marginBottom: 16 }}>
              Issued: <strong>{cert.issueDate}</strong> · {cert.authority}
            </div>

            {/* Competency Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20, flexGrow: 1 }}>
              {cert.competencies.map((comp, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: '#EEF6EA',
                    color: '#2F5233',
                    border: '1px solid #D6E3D8'
                  }}
                >
                  {comp}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 14, borderTop: '1px solid #D6E3D8' }}>
              <button
                className="trainee-btn-primary"
                style={{ flex: 1, fontSize: 12, padding: '9px 12px' }}
                onClick={() => onViewCertificate && onViewCertificate(cert)}
              >
                View Certificate ↗
              </button>

              <button
                className="trainee-btn-secondary"
                style={{ flex: 1, fontSize: 12, padding: '9px 12px' }}
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
