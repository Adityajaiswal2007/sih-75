import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Building2,
  Mail,
  BookOpen,
  Calendar,
  Share2,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Edit3,
  UserCheck,
  BarChart3,
  UserX,
  Award,
  Zap,
  Clock,
  Send
} from 'lucide-react';

export default function TrainerHero({
  trainer,
  isAdminView,
  onContactClick,
  onRequestClick,
  onViewCoursesClick,
  onAdminAction,
  onShareClick,
  onToast
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onToast(isBookmarked ? 'Trainer removed from saved list' : 'Trainer bookmarked to your list!');
  };

  return (
    <div className="trainer-hero-card">
      {/* Background ambient glow effect */}
      <div className="hero-ambient-glow" />

      <div className="hero-inner">
        {/* Left Column: Avatar & Core Identity */}
        <div className="hero-identity-section">
          <div className="avatar-wrapper">
            <div className="trainer-avatar-large">
              <span className="avatar-text">{trainer.avatarInitials}</span>
              <div className="avatar-pulse-ring" />
            </div>
            <div className="active-badge-pill" title="Currently active on CapacityConnect">
              <span className="active-dot" />
              Active Trainer
            </div>
          </div>

          <div className="hero-details">
            <div className="name-row">
              <h1 className="trainer-name">{trainer.name}</h1>
              <span className="verified-badge" title="Profile Verified by CapacityConnect System">
                <ShieldCheck className="verified-icon" size={18} />
                <span className="verified-text">Profile Verified</span>
              </span>
            </div>

            <p className="trainer-role">{trainer.designation}</p>

            <div className="meta-tags-row">
              <div className="meta-item">
                <Building2 size={15} className="meta-icon" />
                <span>{trainer.organization}</span>
              </div>
              <span className="meta-divider">•</span>
              <div className="meta-item">
                <MapPin size={15} className="meta-icon" />
                <span>{trainer.location}</span>
              </div>
              <span className="meta-divider">•</span>
              <div className="meta-item experience-meta">
                <Award size={15} className="meta-icon" />
                <span>{trainer.experienceYears} Experience</span>
              </div>
            </div>

            <div className="specialization-chips">
              {trainer.specializations.map((spec, index) => (
                <span key={index} className="spec-chip">
                  <Sparkles size={11} className="chip-sparkle" />
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Action Buttons */}
        <div className="hero-actions-section">
          {isAdminView ? (
            /* Administrator Action Controls */
            <div className="admin-actions-wrapper">
              <div className="admin-status-indicator">
                <span className="admin-kicker">ADMINISTRATOR CONTROL</span>
                <div className="admin-badges">
                  <span className="admin-badge active">
                    <CheckCircle2 size={13} />
                    Status: {trainer.status}
                  </span>
                  <span className="admin-badge verified">
                    <ShieldCheck size={13} />
                    Approved
                  </span>
                </div>
              </div>

              <div className="admin-button-grid">
                <button
                  className="cc-btn cc-btn-primary"
                  onClick={() => onAdminAction('Assign Course')}
                  id="btn-admin-assign-course"
                >
                  <BookOpen size={16} />
                  Assign Course
                </button>
                <button
                  className="cc-btn cc-btn-secondary"
                  onClick={() => onAdminAction('Edit Profile')}
                  id="btn-admin-edit-profile"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
                <button
                  className="cc-btn cc-btn-secondary"
                  onClick={() => onAdminAction('View Analytics')}
                  id="btn-admin-analytics"
                >
                  <BarChart3 size={16} />
                  View Analytics
                </button>
                <button
                  className="cc-btn cc-btn-danger"
                  onClick={() => onAdminAction('Deactivate Trainer')}
                  id="btn-admin-deactivate"
                >
                  <UserX size={16} />
                  Deactivate
                </button>
              </div>
            </div>
          ) : (
            /* Trainee / General User Action Controls */
            <div className="trainee-actions-wrapper">
              <div className="action-buttons-group">
                <button
                  className="cc-btn cc-btn-primary action-btn-main"
                  onClick={onContactClick}
                  id="btn-contact-trainer"
                >
                  <Mail size={16} />
                  Contact Trainer
                </button>

                <button
                  className="cc-btn cc-btn-secondary action-btn-main"
                  onClick={onRequestClick}
                  id="btn-request-training"
                >
                  <Zap size={16} />
                  Request Training
                </button>

                <button
                  className="cc-btn cc-btn-outline"
                  onClick={onViewCoursesClick}
                  id="btn-view-courses"
                >
                  <BookOpen size={16} />
                  View Courses ({trainer.totalCourses})
                </button>
              </div>

              <div className="secondary-actions-row">
                <button
                  className={`cc-icon-btn ${isBookmarked ? 'bookmarked' : ''}`}
                  onClick={toggleBookmark}
                  title={isBookmarked ? 'Saved in your bookmarked trainers' : 'Bookmark this trainer'}
                  aria-label="Bookmark Trainer"
                >
                  {isBookmarked ? <BookmarkCheck size={17} className="text-cyan" /> : <Bookmark size={17} />}
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  className="cc-icon-btn"
                  onClick={onShareClick}
                  title="Share trainer profile link"
                  aria-label="Share Profile"
                >
                  <Share2 size={17} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
