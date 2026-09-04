import React, { useState } from 'react';

export function TrainerSupportView({ faqs }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Help & Institutional Support</h1>
          <p>Guides, FAQs, syllabus authoring standards, and technical assistance.</p>
        </div>
        <div className="portal-header-actions">
          <button className="button small" onClick={() => alert('Support ticket modal opened. Institutional helpline: support@imd.gov.in')}>
            Contact Technical Support
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, color: '#f2f8ff', margin: '0 0 16px' }}>Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <div className="portal-faq-item" key={faq.q}>
              <div className="portal-faq-q" onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}>
                <span>{faq.q}</span>
                <span style={{ color: '#38bdf8', fontSize: 16 }}>{openIdx === idx ? '−' : '+'}</span>
              </div>
              {openIdx === idx && (
                <div className="portal-faq-a">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
            <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 12px' }}>Trainer Guidelines & Documentation</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, fontSize: 13, color: '#90b2d4' }}>
              <li style={{ cursor: 'pointer', color: '#38bdf8' }}>📄 IMD Competency Mapping Handbook ↗</li>
              <li style={{ cursor: 'pointer', color: '#38bdf8' }}>📄 Setting up JupyterHub & MetPy environments ↗</li>
              <li style={{ cursor: 'pointer', color: '#38bdf8' }}>📄 Authoring diagnostic assessments for MoES ↗</li>
              <li style={{ cursor: 'pointer', color: '#38bdf8' }}>📄 Cohort grading and certification policies ↗</li>
            </ul>
          </div>

          <div style={{ padding: 22, border: '1px solid #1c4263', borderRadius: 10, background: '#09213d' }}>
            <h3 style={{ fontSize: 16, color: '#f1f7ff', margin: '0 0 8px' }}>Direct Admin Escalation</h3>
            <p style={{ fontSize: 12, color: '#8aa6c0', lineHeight: 1.5, margin: '0 0 14px' }}>
              Need institutional role elevation or additional cloud compute cluster credits for atmospheric simulations?
            </p>
            <button className="button outline small" onClick={() => alert('Escalation request sent to MoES / IMD Portal Administrator')}>
              Request Compute Allocation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
