import React, { useState } from 'react';
import { mockFaqs } from './traineeData';

export default function TraineeHelpView({ showToast }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSendTicket = e => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    if (showToast) {
      showToast('Support ticket dispatched to Academic Directorate. Ticket ID: #CC-84920');
    }
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="trainee-help-view" style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#38BDF8', textTransform: 'uppercase' }}>
            LEARNER ASSISTANCE
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Help & Support</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Explore learning guidance, understand assessment criteria, or contact the academic support desk.
        </p>
      </div>

      {/* 3 Quick Help Guides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <div style={{ padding: '18px', background: '#0D1B2A', border: '1px solid #1E334A', borderRadius: 12 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>📖</div>
          <strong style={{ color: '#fff', fontSize: 14, display: 'block', marginBottom: 4 }}>
            Learner Quickstart Guide
          </strong>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
            How to navigate coursework, submit lab exercises, and earn verified certificate credentials.
          </p>
        </div>

        <div style={{ padding: '18px', background: '#0D1B2A', border: '1px solid #1E334A', borderRadius: 12 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🎯</div>
          <strong style={{ color: '#fff', fontSize: 14, display: 'block', marginBottom: 4 }}>
            Assessment Protocol
          </strong>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
            Grading rubrics, proctoring guidelines, passing thresholds (70%), and retake cooldown policies.
          </p>
        </div>

        <div style={{ padding: '18px', background: '#0D1B2A', border: '1px solid #1E334A', borderRadius: 12 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🤝</div>
          <strong style={{ color: '#fff', fontSize: 14, display: 'block', marginBottom: 4 }}>
            Faculty Mentorship
          </strong>
          <p style={{ color: '#94A3B8', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
            How the 92% Intelligent Trainer Matching engine pairs you with researchers for skill gap mastery.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="trainee-panel" style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
          ❓ Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                style={{
                  border: '1px solid #1E334A',
                  borderRadius: 10,
                  background: isOpen ? 'rgba(56, 189, 248, 0.05)' : '#0A1626',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: 16, color: '#38BDF8', marginLeft: 12 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 16px 16px', color: '#CBD5E1', fontSize: 13, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Support Form */}
      <section className="trainee-panel">
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
          ✉ Contact Academic Support Desk
        </h3>
        <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 16px' }}>
          Our technical coordinators respond within 24 hours during working days.
        </p>

        <form onSubmit={handleSendTicket} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>
              Subject or Topic
            </label>
            <input
              type="text"
              placeholder="e.g. Issue running Cartopy projection script on cluster"
              value={ticketSubject}
              onChange={e => setTicketSubject(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#0A1626',
                border: '1px solid #1E334A',
                borderRadius: 8,
                padding: '10px 14px',
                color: '#fff',
                fontSize: 13,
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: '#94A3B8', display: 'block', marginBottom: 4 }}>
              Detailed Description
            </label>
            <textarea
              rows={4}
              placeholder="Please provide course module name, error logs, or specific questions..."
              value={ticketMessage}
              onChange={e => setTicketMessage(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#0A1626',
                border: '1px solid #1E334A',
                borderRadius: 8,
                padding: '10px 14px',
                color: '#fff',
                fontSize: 13,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div>
            <button type="submit" className="trainee-btn-primary">
              Send Support Ticket →
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
