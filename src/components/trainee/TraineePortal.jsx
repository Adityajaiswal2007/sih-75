import React, { useState, useEffect } from 'react';
import './TraineePortal.css';
import { traineeUser, mockNotifications, allCourses } from './traineeData';
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '▦' },
    { id: 'my-learning', label: 'My Learning', icon: '▱' },
    { id: 'catalog', label: 'Course Catalog', icon: '◫' },
    { id: 'assessment', label: 'Assessments', icon: '▤' },
    { id: 'competencies', label: 'Competencies', icon: '◎' },
    { id: 'skill-gap', label: 'Skill Gaps', icon: '✦', badge: '1 High' },
    { id: 'trainers', label: 'Trainer Matching', icon: '♟', badge: '92%' },
    { id: 'certificates', label: 'Certificates', icon: '▣' },
    { id: 'announcements', label: 'Announcements', icon: '◌' }
  ];

  const bottomNavItems = [
    { id: 'help', label: 'Help & Support', icon: '?' },
    { id: 'settings', label: 'Settings', icon: '⚙' }
  ];

  return (
    <div className="trainee-portal-root">
      {/* Toast Notification */}
      {toast && (
        <div className="trainee-toast">
          <span style={{ fontSize: 18, color: '#22C55E' }}>✓</span>
          <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{toast}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className={`trainee-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="trainee-sidebar-header">
          <div
            className="trainee-sidebar-logo"
            onClick={() => handleNavigate('dashboard')}
          >
            <div className="logo-icon">◇</div>
            <div className="logo-title">
              Capacity<span>Connect</span>
            </div>
          </div>
          <span className="trainee-role-badge">Trainee</span>
        </div>

        <nav className="trainee-nav-list">
          <div className="trainee-nav-section-title">Learner Suite</div>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`trainee-nav-btn ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="trainee-nav-badge">{item.badge}</span>}
            </button>
          ))}

          <div className="trainee-nav-section-title" style={{ marginTop: 12 }}>
            Support & Setup
          </div>
          {bottomNavItems.map(item => (
            <button
              key={item.id}
              className={`trainee-nav-btn ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer: Trainee User Card */}
        <div className="trainee-sidebar-footer">
          <div
            className="trainee-user-card"
            onClick={() => handleNavigate('profile')}
            title="View Profile"
          >
            <div className="trainee-avatar-box">{traineeUser.avatar}</div>
            <div className="trainee-user-info">
              <strong>{traineeUser.name}</strong>
              <small>{traineeUser.organization}</small>
            </div>
          </div>

          <button
            className="trainee-logout-btn"
            onClick={onBack}
            title="Return to Main Portal"
          >
            <span>←</span> Exit Portal / Logout
          </button>
        </div>
      </aside>

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
              ☰
            </button>
            <div className="trainee-greeting-title">
              <h2>Good morning, {traineeUser.name.split(' ')[0]} 👋</h2>
              <p>Continue building your competencies and advancing weather analytics.</p>
            </div>
          </div>

          <div className="trainee-header-right">
            {/* Search */}
            <div className="trainee-search-input-wrap">
              <span className="trainee-search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search catalog or competencies..."
                onFocus={() => {
                  if (activeSection !== 'catalog') handleNavigate('catalog');
                }}
              />
            </div>

            {/* Notifications Bell */}
            <div style={{ position: 'relative' }}>
              <button
                className="trainee-icon-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                aria-label="Notifications"
              >
                <span>🔔</span>
                {unreadNotifCount > 0 && <span className="trainee-notif-dot" />}
              </button>

              {notifOpen && (
                <div className="trainee-notif-popover">
                  <div className="trainee-notif-header">
                    <h4>Notifications</h4>
                    {unreadNotifCount > 0 && (
                      <small onClick={markAllNotifsRead}>Mark all read</small>
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
                        <div className="trainee-notif-text">
                          <strong>{n.title}</strong>
                          <p>{n.description}</p>
                          <span>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help Button */}
            <button
              className="trainee-icon-btn"
              onClick={() => handleNavigate('help')}
              title="Help & Support"
            >
              <span>?</span>
            </button>

            {/* User Avatar */}
            <div
              className="trainee-avatar-box"
              style={{ width: 34, height: 34, fontSize: 12, cursor: 'pointer' }}
              onClick={() => handleNavigate('profile')}
              title="View Profile"
            >
              {traineeUser.avatar}
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
