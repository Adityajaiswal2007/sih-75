import React, { useState } from 'react';
import './TraineePortal.css';
import cloverIcon from '../../assets/landing/arcticons-clover0.svg';
import { traineeUser, mockNotifications } from './traineeData';
import TraineeDashboardView from './TraineeDashboardView';
import TraineeCatalogView from './TraineeCatalogView';
import TraineeCourseDetailView from './TraineeCourseDetailView';
import TraineeLearningView from './TraineeLearningView';
import TraineeAssessmentView from './TraineeAssessmentView';
import TraineeResultView from './TraineeResultView';
import TraineeCompetenciesView from './TraineeCompetenciesView';
import TraineeSkillGapView from './TraineeSkillGapView';
import TraineeTrainerMatchView from './TraineeTrainerMatchView';
import TraineeMyLearningView from './TraineeMyLearningView';
import TraineeCertificatesView from './TraineeCertificatesView';
import TraineeAnnouncementsView from './TraineeAnnouncementsView';
import TraineeProfileView from './TraineeProfileView';
import TraineeSettingsView from './TraineeSettingsView';
import TraineeHelpView from './TraineeHelpView';
import { EnrollmentModal, CertificateModal, EditProfileModal } from './TraineeModals';

export default function TraineePortal({ onBack, onOpenTrainerProfile }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeCourseId, setActiveCourseId] = useState('crs-001');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [toast, setToast] = useState(null);

  // Modals state
  const [modalType, setModalType] = useState(null); // 'enroll' | 'certificate' | 'edit-profile'
  const [enrollCourse, setEnrollCourse] = useState(null);
  const [viewCertificate, setViewCertificate] = useState(null);

  const showToast = msg => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleNavigate = (section, params = {}) => {
    setActiveSection(section);
    if (params.courseId) {
      setActiveCourseId(params.courseId);
    }
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollClick = course => {
    setEnrollCourse(course);
    setModalType('enroll');
  };

  const handleConfirmEnrollment = course => {
    course.enrolled = true;
    setModalType(null);
    showToast(`Successfully enrolled in ${course.title}!`);
    setTimeout(() => {
      handleNavigate('learning', { courseId: course.id });
    }, 1000);
  };

  const handleViewCertificate = cert => {
    setViewCertificate(cert);
    setModalType('certificate');
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markAllNotifsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const NAV_SECTIONS = [
    {
      group: 'Academic & Learning',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          )
        },
        {
          id: 'my-learning',
          label: 'My Learning',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        },
        {
          id: 'catalog',
          label: 'Course Catalog',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Assessments & Credentials',
      items: [
        {
          id: 'assessment',
          label: 'Assessments',
          badge: '1 Live',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )
        },
        {
          id: 'certificates',
          label: 'Certificates',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Competencies & AI Match',
      items: [
        {
          id: 'competencies',
          label: 'Competencies',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          )
        },
        {
          id: 'skill-gap',
          label: 'Skill Gaps',
          badge: '1 High',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )
        },
        {
          id: 'trainers',
          label: 'Trainer Matching',
          badge: '92%',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Support & Portal',
      items: [
        {
          id: 'announcements',
          label: 'Announcements',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          )
        },
        {
          id: 'help',
          label: 'Help & Support',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="trainee-portal-root">
      {/* Toast Notification */}
      {toast && (
        <div className="trainee-toast">
          <span className="trainee-toast-icon">✓</span>
          <span className="trainee-toast-text">{toast}</span>
        </div>
      )}

      {/* FIXED SIDEBAR (Unified Institutional Design) */}
      <aside className={`trainee-sidebar-container ${sidebarOpen ? 'open' : ''}`}>
        <div className="trainee-sidebar-header">
          <button type="button" className="trainee-sidebar-brand" onClick={() => handleNavigate('dashboard')} title="Return to Dashboard">
            <div className="trainee-sidebar-logo-icon">
              <img src={cloverIcon} alt="CapacityConnect" style={{ width: 18, height: 18 }} />
            </div>
            <div className="trainee-sidebar-brand-text">
              <div className="trainee-brand-name">
                <span className="trainee-brand-part-cap">Capacity</span>
                <span className="trainee-brand-part-conn">Connect</span>
              </div>
              <div className="trainee-brand-portal-badge">TRAINEE PORTAL</div>
            </div>
          </button>
        </div>

        {/* Distributed Navigation Categories */}
        <nav className="trainee-sidebar-nav-scroll">
          {NAV_SECTIONS.map((sec) => (
            <div className="trainee-nav-group" key={sec.group}>
              <div className="trainee-nav-group-title">{sec.group}</div>
              {sec.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`trainee-nav-item-btn ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.id)}
                >
                  <div className="trainee-nav-btn-left">
                    <span className="trainee-nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="trainee-nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Institutional Live Status Card */}
        <div className="trainee-sidebar-status-card">
          <div className="trainee-status-indicator">
            <span className="trainee-status-ping" />
            <span className="trainee-status-dot" />
          </div>
          <div className="trainee-status-info">
            <span className="trainee-status-title">MoES Network • Live</span>
            <span className="trainee-status-subtitle">IMD Learner Node Active</span>
          </div>
        </div>

        {/* Sidebar Footer Profile & Integrated Exit */}
        <div className="trainee-sidebar-footer">
          <div
            className="trainee-sidebar-user-card"
            onClick={() => handleNavigate('profile')}
            title="View Trainee Profile"
          >
            <div className="trainee-user-avatar">
              AJ
              <span className="trainee-online-indicator" />
            </div>
            <div className="trainee-user-info">
              <strong className="trainee-user-name">{traineeUser.name}</strong>
              <small className="trainee-user-role">Trainee ({traineeUser.organization || 'MoES/IMD'})</small>
            </div>
            <button
              type="button"
              className="trainee-user-card-exit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
              title="Exit to Home"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="trainee-sidebar-backdrop-mobile"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation drawer"
        />
      )}

      {/* Main Content Area */}
      <div className="trainee-content-area">
        {/* Global Header */}
        <header className="trainee-global-header">
          <div className="trainee-header-left">
            <button
              className="trainee-mobile-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="trainee-nav-heading-wrap">
              <h1 className="trainee-nav-heading-title">
                {activeSection === 'dashboard' && 'Trainee Workspace'}
                {activeSection === 'my-learning' && 'My Learning Workspace'}
                {activeSection === 'learning' && 'Active Classroom'}
                {activeSection === 'catalog' && 'Course Catalog'}
                {activeSection === 'course-detail' && 'Course Overview'}
                {activeSection === 'assessment' && 'Assessments & Tests'}
                {activeSection === 'result' && 'Diagnostic Results'}
                {activeSection === 'competencies' && 'Competency Matrix'}
                {activeSection === 'skill-gap' && 'Skill Gap Analysis'}
                {activeSection === 'trainers' && 'Trainer Directory'}
                {activeSection === 'certificates' && 'My Certificates'}
                {activeSection === 'announcements' && 'Official Announcements'}
                {activeSection === 'help' && 'Help & Support'}
                {activeSection === 'settings' && 'Account Settings'}
                {activeSection === 'profile' && 'Learner Profile'}
              </h1>
              <div className="trainee-nav-heading-meta">
                <span className="trainee-live-dot" />
                <span className="trainee-meta-text">MoES · IMD Platform</span>
                <span className="trainee-meta-divider">•</span>
                <span className="trainee-meta-cohort">Cohort 2026</span>
              </div>
            </div>
          </div>

          <div className="trainee-header-right">
            {/* Global Search Bar with SVG */}
            <div className="trainee-search-wrapper">
              <span className="trainee-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="trainee-search-input"
                placeholder="Search courses, skills, faculty..."
                onFocus={() => {
                  if (activeSection !== 'catalog') handleNavigate('catalog');
                }}
              />
            </div>

            {/* Direct Action Button */}
            <button
              type="button"
              className="trainee-header-action-btn"
              onClick={() => handleNavigate(activeSection === 'catalog' ? 'my-learning' : 'catalog')}
            >
              <span>{activeSection === 'catalog' ? 'My Courses →' : '+ Explore Courses'}</span>
            </button>

            {/* Notification Bell with SVG */}
            <div className="trainee-bell-container">
              <button
                type="button"
                className={`trainee-bell-btn ${notifOpen ? 'active' : ''}`}
                onClick={() => setNotifOpen(!notifOpen)}
                aria-label="Notifications"
                title="View Notifications"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadNotifCount > 0 && <span className="trainee-bell-badge">{unreadNotifCount}</span>}
              </button>

              {notifOpen && (
                <div className="trainee-notification-popover">
                  <div className="trainee-notif-head">
                    <strong>Notifications & Alerts</strong>
                    {unreadNotifCount > 0 && (
                      <button type="button" className="trainee-notif-mark-btn" onClick={markAllNotifsRead}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="trainee-notif-list">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        className={`trainee-notif-item ${!n.read ? 'unread' : ''}`}
                        onClick={() => {
                          setNotifOpen(false);
                          handleNavigate(n.actionRoute);
                        }}
                      >
                        <div className="trainee-notif-title-row">
                          <span className="trainee-notif-item-title">{n.title}</span>
                          <span className="trainee-notif-time">{n.time}</span>
                        </div>
                        <p className="trainee-notif-desc">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help Quick Button with SVG */}
            <button
              type="button"
              className="trainee-header-icon-btn"
              onClick={() => handleNavigate('help')}
              title="Help & Support Desk"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>

            {/* User Profile Card */}
            <div
              className="trainee-header-user-card"
              onClick={() => handleNavigate('profile')}
              title="View Profile & Settings"
            >
              <div className="trainee-user-avatar-circle">
                {traineeUser.avatar}
              </div>
              <div className="trainee-header-user-text">
                <span className="trainee-header-user-name">{traineeUser.name}</span>
                <span className="trainee-header-user-sub">Trainee · IMD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="trainee-page-body">
          {activeSection === 'dashboard' && (
            <TraineeDashboardView
              onNavigate={handleNavigate}
              onOpenTrainerProfile={onOpenTrainerProfile}
            />
          )}

          {activeSection === 'catalog' && (
            <TraineeCatalogView
              onNavigate={handleNavigate}
              onEnrollClick={handleEnrollClick}
            />
          )}

          {activeSection === 'course-detail' && (
            <TraineeCourseDetailView
              courseId={activeCourseId}
              onNavigate={handleNavigate}
              onEnrollClick={handleEnrollClick}
              onOpenTrainerProfile={onOpenTrainerProfile}
            />
          )}

          {activeSection === 'learning' && (
            <TraineeLearningView
              courseId={activeCourseId}
              onNavigate={handleNavigate}
              showToast={showToast}
            />
          )}

          {activeSection === 'assessment' && (
            <TraineeAssessmentView
              onNavigate={handleNavigate}
              onCompleteAssessment={() => {
                showToast('Assessment submitted successfully! Calculating competency scores...');
                setTimeout(() => {
                  handleNavigate('result');
                }, 1000);
              }}
            />
          )}

          {activeSection === 'result' && (
            <TraineeResultView onNavigate={handleNavigate} />
          )}

          {activeSection === 'competencies' && (
            <TraineeCompetenciesView onNavigate={handleNavigate} />
          )}

          {activeSection === 'skill-gap' && (
            <TraineeSkillGapView
              onNavigate={handleNavigate}
              onOpenTrainerProfile={onOpenTrainerProfile}
            />
          )}

          {activeSection === 'trainers' && (
            <TraineeTrainerMatchView
              onNavigate={handleNavigate}
              onOpenTrainerProfile={onOpenTrainerProfile}
            />
          )}

          {activeSection === 'my-learning' && (
            <TraineeMyLearningView onNavigate={handleNavigate} />
          )}

          {activeSection === 'certificates' && (
            <TraineeCertificatesView
              onViewCertificate={handleViewCertificate}
              showToast={showToast}
            />
          )}

          {activeSection === 'announcements' && (
            <TraineeAnnouncementsView onNavigate={handleNavigate} />
          )}

          {activeSection === 'profile' && (
            <TraineeProfileView
              onEditProfile={() => setModalType('edit-profile')}
              onNavigate={handleNavigate}
            />
          )}

          {activeSection === 'settings' && (
            <TraineeSettingsView showToast={showToast} />
          )}

          {activeSection === 'help' && (
            <TraineeHelpView showToast={showToast} />
          )}
        </main>
      </div>

      {/* Modals */}
      {modalType === 'enroll' && (
        <EnrollmentModal
          course={enrollCourse}
          onClose={() => setModalType(null)}
          onConfirm={handleConfirmEnrollment}
        />
      )}

      {modalType === 'certificate' && (
        <CertificateModal
          certificate={viewCertificate}
          onClose={() => setModalType(null)}
          onDownload={cert => {
            setModalType(null);
            showToast(`Downloaded Certificate: ${cert.code}`);
          }}
        />
      )}

      {modalType === 'edit-profile' && (
        <EditProfileModal
          onClose={() => setModalType(null)}
          onSave={updated => {
            Object.assign(traineeUser, updated);
            setModalType(null);
            showToast('Profile updated successfully!');
          }}
        />
      )}
    </div>
  );
}
