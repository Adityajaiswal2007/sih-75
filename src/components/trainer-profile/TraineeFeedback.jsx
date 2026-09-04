import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  ThumbsUp,
  Quote,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';

export default function TraineeFeedback({ reviews, onOpenAllFeedbackModal }) {
  const [helpfulCounts, setHelpfulCounts] = useState({});

  const handleHelpfulClick = (idx) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1
    }));
  };

  const renderStars = (rating) => {
    return (
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`star-svg ${star <= rating ? 'filled' : 'empty'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="profile-section-card feedback-card" id="section-feedback">
      <div className="section-header-flex">
        <div className="section-title-wrap">
          <span className="section-badge">
            <MessageSquare size={13} />
            EVALUATIONS & TESTIMONIALS
          </span>
          <h2 className="section-title">Trainee Feedback</h2>
          <p className="section-subtitle">
            Authentic post-training evaluations and feedback from participating institutional trainees.
          </p>
        </div>

        {/* Rating Score Snapshot */}
        <div className="feedback-score-snapshot">
          <div className="snap-score-large">4.8</div>
          <div className="snap-stars-wrap">
            {renderStars(5)}
            <small>320 Verified Trainees</small>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="feedback-reviews-grid">
        {reviews.map((review, idx) => (
          <div key={idx} className="feedback-review-card">
            <div className="review-card-top">
              {renderStars(review.rating)}
              <span className="review-date">{review.date}</span>
            </div>

            <p className="review-quote-text">
              “{review.quote}”
            </p>

            <div className="review-trainee-meta">
              <div className="trainee-avatar-badge">
                {review.author.split(' ').map((p) => p[0]).join('')}
              </div>
              <div className="trainee-details">
                <strong className="trainee-author-name">{review.author}</strong>
                <span className="trainee-course-name">{review.course}</span>
                <span className="trainee-org-sub">{review.organization}</span>
              </div>
            </div>

            <div className="review-card-footer">
              <span className="verified-trainee-pill">
                <CheckCircle2 size={12} className="text-teal" />
                Verified Trainee
              </span>
              <button
                className="helpful-btn"
                onClick={() => handleHelpfulClick(idx)}
                title="Mark as helpful"
              >
                <ThumbsUp size={12} />
                <span>Helpful ({12 + (helpfulCounts[idx] || 0)})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="feedback-footer-row">
        <button
          className="cc-btn cc-btn-outline"
          onClick={onOpenAllFeedbackModal}
          id="btn-view-all-feedback"
        >
          <span>View All 320 Trainee Reviews</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </section>
  );
}
