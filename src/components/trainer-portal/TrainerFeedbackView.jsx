import React, { useState } from 'react';

export function TrainerFeedbackView({ feedbackList, onHelpful }) {
  const [reviews, setReviews] = useState(feedbackList);

  const handleHelpfulClick = (id) => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
    if (onHelpful) onHelpful('Thank you for marking this feedback as helpful!');
  };

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Trainee Feedback & Institutional Reviews</h1>
          <p>Verified ratings and qualitative testimonials from course participants.</p>
        </div>
      </div>

      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">★</div>
          <div className="kpi-label">Average Trainer Rating</div>
          <div className="kpi-val">4.8 <small style={{ fontSize: 13, color: '#8daac4' }}>/ 5.0</small></div>
          <div className="kpi-note">98% positive sentiment</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✓</div>
          <div className="kpi-label">5-Star Reviews</div>
          <div className="kpi-val">128</div>
          <div className="kpi-note">89% of all submitted reviews</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">▤</div>
          <div className="kpi-label">Total Submissions</div>
          <div className="kpi-val">142</div>
          <div className="kpi-note">Verified trainees</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">◎</div>
          <div className="kpi-label">Net Recommendation Score</div>
          <div className="kpi-val">+94</div>
          <div className="kpi-note">Institutional benchmark top tier</div>
        </div>
      </div>

      <div className="portal-feedback-grid">
        {reviews.map((fdb) => (
          <div className="portal-feedback-card" key={fdb.id}>
            <div>
              <div className="portal-feedback-rating">
                {'★'.repeat(fdb.rating)}
              </div>
              <p>"{fdb.text}"</p>
            </div>
            <div>
              <div className="portal-feedback-author">
                <div className="portal-user-avatar">{fdb.avatar}</div>
                <div>
                  <strong style={{ color: '#f2f8ff', fontSize: 13, display: 'block' }}>{fdb.author}</strong>
                  <small style={{ color: '#7ba0c1', fontSize: 11 }}>{fdb.role}</small>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: 11, color: '#688ba8' }}>
                <span>{fdb.course}</span>
                <button
                  className="portal-btn-sm"
                  onClick={() => handleHelpfulClick(fdb.id)}
                  style={{ fontSize: 10, padding: '4px 8px' }}
                >
                  Helpful ({fdb.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
