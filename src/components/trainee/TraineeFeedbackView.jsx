import React, { useState } from 'react';
import './TraineePortal.css';
import { allCourses } from './traineeData';

const INITIAL_FEEDBACK_HISTORY = [
  {
    id: 'FBK-2026-8912',
    date: '12 Sept 2026',
    overallRating: 5,
    courseTitle: 'Python for Weather Analytics',
    instructor: 'Dr. Rahul Sharma',
    ratings: {
      course: 5,
      experience: 5,
      platform: 4
    },
    pacing: 'Balanced & Optimal',
    tags: ['More Practical Datasets', '1-on-1 Mentorship'],
    suggestion: 'The NetCDF and Cartopy plotting labs were exceptionally helpful for synoptic chart interpretation. Would love additional modules on Doppler radar precipitation estimation.',
    status: 'Reviewed by Training Director',
    statusColor: '#166534',
    statusBg: '#DCFCE7'
  },
  {
    id: 'FBK-2026-8450',
    date: '28 Aug 2026',
    overallRating: 4,
    courseTitle: 'Advanced Weather Data Analysis',
    instructor: 'Dr. Rahul Sharma',
    ratings: {
      course: 4,
      experience: 4,
      platform: 5
    },
    pacing: 'Balanced & Optimal',
    tags: ['Offline Modules'],
    suggestion: 'Flashcards and instant quiz telemetry are very effective for mid-term review. High-resolution satellite images load smoothly.',
    status: 'Actioned in Syllabus Update',
    statusColor: '#1E40AF',
    statusBg: '#DBEAFE'
  }
];

const SUGGESTION_TAGS = [
  'More Practical Weather Datasets',
  '1-on-1 Faculty Office Hours',
  'Advanced Radar Case Studies',
  'Downloadable Jupyter Notebooks',
  'Offline Video & Study Material',
  'More Mock Assessment Exams',
  'Satellite Real-Time API Practice'
];

export default function TraineeFeedbackView({ showToast }) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'history'
  const [historyList, setHistoryList] = useState(INITIAL_FEEDBACK_HISTORY);

  // Form State
  const [overallRating, setOverallRating] = useState(5);
  const [npsScore, setNpsScore] = useState(9);
  
  // Course-Wise
  const [selectedCourseId, setSelectedCourseId] = useState('crs-001');
  const [courseContentRating, setCourseContentRating] = useState(5);
  const [courseLabRating, setCourseLabRating] = useState(5);
  const [trainerInteractionRating, setTrainerInteractionRating] = useState(5);

  // Experience-Wise
  const [pacingChoice, setPacingChoice] = useState('Balanced & Optimal');
  const [skillGrowthRating, setSkillGrowthRating] = useState(5);
  const [queryResolutionRating, setQueryResolutionRating] = useState(4);

  // Platform Rating
  const [platformUiRating, setPlatformUiRating] = useState(5);
  const [platformSpeedRating, setPlatformSpeedRating] = useState(5);
  const [platformToolsRating, setPlatformToolsRating] = useState(5);

  // Suggestions
  const [selectedTags, setSelectedTags] = useState(['More Practical Weather Datasets']);
  const [suggestionText, setSuggestionText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedSuccessModal, setSubmittedSuccessModal] = useState(null);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getSelectedCourse = () => {
    return allCourses.find(c => c.id === selectedCourseId) || allCourses[0];
  };

  const handleStarClick = (setter, val) => {
    setter(val);
  };

  const renderStarSelector = (value, setter) => {
    return (
      <div className="trainee-feedback-star-group">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className={`feedback-star-btn ${star <= value ? 'filled' : ''}`}
            onClick={() => handleStarClick(setter, star)}
            title={`${star} Star${star > 1 ? 's' : ''}`}
          >
            ★
          </button>
        ))}
        <span className="feedback-star-text">
          {value === 5 && '⭐⭐⭐⭐⭐ Outstanding (5.0)'}
          {value === 4 && '⭐⭐⭐⭐ Very Good (4.0)'}
          {value === 3 && '⭐⭐⭐ Good / Meets Expectations (3.0)'}
          {value === 2 && '⭐⭐ Fair / Needs Polish (2.0)'}
          {value === 1 && '⭐ Poor / Action Required (1.0)'}
        </span>
      </div>
    );
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    const currentCourse = getSelectedCourse();
    const newEntry = {
      id: `FBK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
      overallRating,
      courseTitle: currentCourse.title,
      instructor: currentCourse.instructor || 'Lead Faculty',
      ratings: {
        course: courseContentRating,
        experience: skillGrowthRating,
        platform: platformUiRating
      },
      pacing: pacingChoice,
      tags: selectedTags,
      suggestion: suggestionText.trim() || 'No additional written remarks provided. Ratings submitted for review.',
      status: 'Submitted to Training Directorate',
      statusColor: '#065F46',
      statusBg: '#ECFDF5'
    };

    setHistoryList([newEntry, ...historyList]);
    setSubmittedSuccessModal(newEntry);
    
    if (showToast) {
      showToast('Institutional feedback submitted successfully! ✓');
    }

    // Reset Form
    setSuggestionText('');
  };

  return (
    <div className="trainee-feedback-view-container">
      {/* Top Header Banner */}
      <div className="trainee-feedback-hero">
        <div className="feedback-hero-left">
          <div className="feedback-hero-kicker">
            <span className="kicker-badge-dot">🛡️</span>
            <span>QUALITY ASSURANCE &amp; EVALUATION</span>
            <span className="kicker-sep">•</span>
            <span>MoES / IMD Continuous Improvement</span>
          </div>
          <h1 className="feedback-hero-title">Trainee Experience &amp; Platform Feedback</h1>
          <p className="feedback-hero-sub">
            Share your structured evaluation across overall training, individual courses, faculty mentorship, and the CapacityConnect platform. Your feedback directly shapes curriculum enhancements and training node upgrades.
          </p>
        </div>

        {/* Live Feedback Score Highlights */}
        <div className="feedback-hero-stats">
          <div className="feedback-stat-pill">
            <span className="stat-pill-num">4.8 / 5.0</span>
            <span className="stat-pill-lbl">Avg Cohort Satisfaction</span>
          </div>
          <div className="feedback-stat-pill">
            <span className="stat-pill-num">100%</span>
            <span className="stat-pill-lbl">Directorate Review Rate</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher: New Feedback vs History */}
      <div className="trainee-feedback-tabs-bar">
        <button
          type="button"
          className={`trainee-feedback-tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <span>📝</span> Submit Feedback Evaluation
        </button>
        <button
          type="button"
          className={`trainee-feedback-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <span>📜</span> My Feedback History ({historyList.length})
        </button>
      </div>

      {/* TAB 1: STRUCTURED FEEDBACK FORM */}
      {activeTab === 'form' && (
        <form className="trainee-feedback-form" onSubmit={handleSubmitFeedback}>
          {/* SECTION 1: OVERALL INSTITUTIONAL RATING */}
          <div className="feedback-card-section">
            <div className="feedback-section-header">
              <span className="feedback-sec-num">01</span>
              <div>
                <h3 className="feedback-sec-title">Overall Institutional &amp; Training Rating</h3>
                <p className="feedback-sec-desc">
                  Rate your overall satisfaction with the CapacityConnect learning program and training curriculum.
                </p>
              </div>
            </div>

            <div className="feedback-rating-row">
              <label className="feedback-input-label">
                Overall Program Rating <span className="req-star">*</span>
              </label>
              {renderStarSelector(overallRating, setOverallRating)}
            </div>

            {/* NPS Scale */}
            <div className="feedback-nps-box">
              <label className="feedback-input-label">
                How likely are you to recommend CapacityConnect to a fellow MoES scientist or trainee? (0 - 10)
              </label>
              <div className="feedback-nps-scale">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    type="button"
                    key={num}
                    className={`nps-btn ${npsScore === num ? 'active' : ''}`}
                    onClick={() => setNpsScore(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="nps-labels">
                <span>0 - Not Likely</span>
                <span>10 - Extremely Likely</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: COURSE-WISE RATING */}
          <div className="feedback-card-section">
            <div className="feedback-section-header">
              <span className="feedback-sec-num">02</span>
              <div>
                <h3 className="feedback-sec-title">Course-Wise &amp; Content Rating</h3>
                <p className="feedback-sec-desc">
                  Select a specific enrolled course to evaluate syllabus clarity, practical lab exercises, and domain relevance.
                </p>
              </div>
            </div>

            <div className="feedback-grid-2col">
              <div className="feedback-form-group">
                <label className="feedback-input-label">
                  Select Course to Evaluate <span className="req-star">*</span>
                </label>
                <select
                  className="feedback-select-input"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  {allCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.instructor})
                    </option>
                  ))}
                </select>
              </div>

              <div className="feedback-selected-course-badge">
                <strong>Instructor: {getSelectedCourse().instructor}</strong>
                <span>Domain: {getSelectedCourse().category || 'Meteorology'} • Rating: {getSelectedCourse().rating}★</span>
              </div>
            </div>

            <div className="feedback-rating-stack">
              <div className="feedback-rating-row">
                <label className="feedback-input-label">Course Content Clarity &amp; Syllabus Depth</label>
                {renderStarSelector(courseContentRating, setCourseContentRating)}
              </div>

              <div className="feedback-rating-row">
                <label className="feedback-input-label">Hands-On Labs &amp; Computational Exercises</label>
                {renderStarSelector(courseLabRating, setCourseLabRating)}
              </div>

              <div className="feedback-rating-row">
                <label className="feedback-input-label">Trainer &amp; Faculty Instruction Quality</label>
                {renderStarSelector(trainerInteractionRating, setTrainerInteractionRating)}
              </div>
            </div>
          </div>

          {/* SECTION 3: LEARNING EXPERIENCE & MENTORSHIP */}
          <div className="feedback-card-section">
            <div className="feedback-section-header">
              <span className="feedback-sec-num">03</span>
              <div>
                <h3 className="feedback-sec-title">Learning Experience &amp; Pacing</h3>
                <p className="feedback-sec-desc">
                  Help us tune syllabus difficulty, instructional velocity, and query resolution support.
                </p>
              </div>
            </div>

            <div className="feedback-form-group">
              <label className="feedback-input-label">Training Pacing &amp; Velocity</label>
              <div className="feedback-pills-selector">
                {['Too Slow', 'Balanced & Optimal', 'Fast & Intensive'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={`feedback-choice-pill ${pacingChoice === opt ? 'active' : ''}`}
                    onClick={() => setPacingChoice(opt)}
                  >
                    {opt === 'Balanced & Optimal' ? '🎯 ' : opt === 'Too Slow' ? '🐢 ' : '⚡ '}
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="feedback-rating-stack">
              <div className="feedback-rating-row">
                <label className="feedback-input-label">Practical Skill Growth &amp; Knowledge Retention</label>
                {renderStarSelector(skillGrowthRating, setSkillGrowthRating)}
              </div>

              <div className="feedback-rating-row">
                <label className="feedback-input-label">Doubt Resolution &amp; Faculty Accessibility</label>
                {renderStarSelector(queryResolutionRating, setQueryResolutionRating)}
              </div>
            </div>
          </div>

          {/* SECTION 4: PLATFORM RATING */}
          <div className="feedback-card-section">
            <div className="feedback-section-header">
              <span className="feedback-sec-num">04</span>
              <div>
                <h3 className="feedback-sec-title">CapacityConnect Platform Usability</h3>
                <p className="feedback-sec-desc">
                  Rate your technical user experience across LMS tools, assessment execution, and UI responsiveness.
                </p>
              </div>
            </div>

            <div className="feedback-rating-stack">
              <div className="feedback-rating-row">
                <label className="feedback-input-label">Portal UI Design, Readability &amp; Navigation</label>
                {renderStarSelector(platformUiRating, setPlatformUiRating)}
              </div>

              <div className="feedback-rating-row">
                <label className="feedback-input-label">Speed, Test Engine &amp; Quiz Telemetry</label>
                {renderStarSelector(platformSpeedRating, setPlatformSpeedRating)}
              </div>

              <div className="feedback-rating-row">
                <label className="feedback-input-label">Flashcard Practice &amp; Competency Tracking</label>
                {renderStarSelector(platformToolsRating, setPlatformToolsRating)}
              </div>
            </div>
          </div>

          {/* SECTION 5: SUGGESTIONS & QUALITATIVE FEEDBACK */}
          <div className="feedback-card-section">
            <div className="feedback-section-header">
              <span className="feedback-sec-num">05</span>
              <div>
                <h3 className="feedback-sec-title">Suggestions for Continuous Improvement</h3>
                <p className="feedback-sec-desc">
                  Select priority tags and share detailed recommendations for upcoming training batches.
                </p>
              </div>
            </div>

            {/* Suggestion Quick Tags */}
            <div className="feedback-form-group">
              <label className="feedback-input-label">Quick Suggestion Focus Areas (Select all that apply)</label>
              <div className="feedback-tags-grid">
                {SUGGESTION_TAGS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    className={`feedback-tag-pill ${selectedTags.includes(tag) ? 'selected' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    <span>{selectedTags.includes(tag) ? '✓' : '+'}</span>
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Suggestions Textarea */}
            <div className="feedback-form-group" style={{ marginTop: 16 }}>
              <label className="feedback-input-label">
                Detailed Suggestions &amp; Comments <span className="opt-sub">(Optional but highly appreciated)</span>
              </label>
              <textarea
                className="feedback-textarea"
                rows={4}
                placeholder="Share your specific thoughts on course materials, trainer explanations, assessment formats, or platform features that would make your learning more impactful..."
                value={suggestionText}
                onChange={(e) => setSuggestionText(e.target.value)}
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="feedback-anonymous-row">
              <label className="feedback-checkbox-label">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span>Submit this evaluation anonymously (Hide my staff ID &amp; name from faculty reviews)</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="feedback-submit-bar">
            <div className="feedback-guarantee-note">
              <span>🛡️</span>
              <span>Your feedback is securely transmitted to the MoES Training Directorate Quality Assurance cell.</span>
            </div>
            <div className="feedback-btn-group">
              <button
                type="button"
                className="btn-feedback-secondary"
                onClick={() => {
                  setSuggestionText('');
                  setSelectedTags([]);
                  showToast('Feedback form reset.');
                }}
              >
                Clear Form
              </button>
              <button type="submit" className="btn-feedback-primary">
                Submit Feedback Evaluation ✓
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: MY FEEDBACK HISTORY */}
      {activeTab === 'history' && (
        <div className="trainee-feedback-history-wrap">
          <div className="history-head-card">
            <div>
              <h3 className="history-title">My Submitted Feedback &amp; Evaluations</h3>
              <p className="history-sub">Track review status, Directorate responses, and curriculum improvements logged from your feedback.</p>
            </div>
            <button
              type="button"
              className="btn-feedback-primary"
              onClick={() => setActiveTab('form')}
            >
              + Submit New Feedback
            </button>
          </div>

          <div className="history-cards-list">
            {historyList.map((item) => (
              <div key={item.id} className="feedback-history-card">
                <div className="history-card-top">
                  <div className="history-card-meta">
                    <span className="history-course-badge">📚 {item.courseTitle}</span>
                    <span className="history-date">Logged on {item.date}</span>
                    <code className="history-ref-id">{item.id}</code>
                  </div>
                  <div
                    className="history-status-pill"
                    style={{ color: item.statusColor, backgroundColor: item.statusBg }}
                  >
                    ✔ {item.status}
                  </div>
                </div>

                <div className="history-card-ratings-grid">
                  <div className="rating-stat-box">
                    <span className="stat-label">Overall Rating</span>
                    <strong className="stat-stars">{'★'.repeat(item.overallRating)} ({item.overallRating}.0)</strong>
                  </div>
                  <div className="rating-stat-box">
                    <span className="stat-label">Course Clarity</span>
                    <strong className="stat-stars">{'★'.repeat(item.ratings.course)} ({item.ratings.course}.0)</strong>
                  </div>
                  <div className="rating-stat-box">
                    <span className="stat-label">Learning Growth</span>
                    <strong className="stat-stars">{'★'.repeat(item.ratings.experience)} ({item.ratings.experience}.0)</strong>
                  </div>
                  <div className="rating-stat-box">
                    <span className="stat-label">Platform Experience</span>
                    <strong className="stat-stars">{'★'.repeat(item.ratings.platform)} ({item.ratings.platform}.0)</strong>
                  </div>
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="history-tags-row">
                    <span className="tags-label">Focus Areas:</span>
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="history-tag-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="history-suggestion-box">
                  <strong>My Remarks &amp; Suggestions:</strong>
                  <p>"{item.suggestion}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {submittedSuccessModal && (
        <div className="trainee-modal-backdrop" onClick={() => setSubmittedSuccessModal(null)}>
          <div className="trainee-feedback-success-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="trainee-modal-close-btn"
              onClick={() => setSubmittedSuccessModal(null)}
              title="Close modal"
            >
              ✕
            </button>
            <div className="success-icon-badge">✓</div>
            <h2 className="success-modal-title">Feedback Submitted Successfully!</h2>
            <p className="success-modal-desc">
              Thank you for evaluating your training experience. Your submission has been securely logged with the MoES Training Directorate.
            </p>

            <div className="success-modal-summary-box">
              <div className="summary-row">
                <span>Evaluation Ref:</span>
                <code>{submittedSuccessModal.id}</code>
              </div>
              <div className="summary-row">
                <span>Course Evaluated:</span>
                <strong>{submittedSuccessModal.courseTitle}</strong>
              </div>
              <div className="summary-row">
                <span>Overall Rating:</span>
                <span style={{ color: '#2F6B3C', fontWeight: 800 }}>
                  {'★'.repeat(submittedSuccessModal.overallRating)} ({submittedSuccessModal.overallRating}.0 / 5.0)
                </span>
              </div>
              <div className="summary-row">
                <span>Status:</span>
                <span className="admin-status-pill excellent">● {submittedSuccessModal.status}</span>
              </div>
            </div>

            <div className="success-modal-actions">
              <button
                type="button"
                className="btn-feedback-secondary"
                onClick={() => {
                  setSubmittedSuccessModal(null);
                  setActiveTab('history');
                }}
              >
                View in Feedback History
              </button>
              <button
                type="button"
                className="btn-feedback-primary"
                onClick={() => setSubmittedSuccessModal(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
