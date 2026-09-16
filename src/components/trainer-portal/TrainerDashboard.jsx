import React, { useState, useEffect } from 'react'
import './TrainerDashboard.css'
import './TrainerPortal.css'
import cloverIcon from '../../assets/landing/arcticons-clover0.svg'
import api from '../../services/api'
import { TrainerCoursesView } from './TrainerCoursesView'
import { TrainerTraineesView } from './TrainerTraineesView'
import { TrainerAssessmentsView } from './TrainerAssessmentsView'
import { TrainerCompetenciesView } from './TrainerCompetenciesView'
import { TrainerContentView } from './TrainerContentView'
import { TrainerAnnouncementsView } from './TrainerAnnouncementsView'
import { TrainerFeedbackView } from './TrainerFeedbackView'
import { TrainerAnalyticsView } from './TrainerAnalyticsView'
import { TrainerSupportView } from './TrainerSupportView'
import { TrainerSettingsView } from './TrainerSettingsView'
import { TrainerPortalModals } from './TrainerPortalModals'
import {
  initialCourses,
  initialTrainees,
  initialAssessments,
  initialCompetencies,
  initialContent,
  initialAnnouncements,
  initialFeedback,
  initialAnalytics,
  initialFaqs
} from './trainerPortalData'

const INITIAL_TRAINER_NOTIFICATIONS = [
  { id: 1, title: 'Attention Required', desc: '3 trainees in NWP module scored below competency threshold.', time: '15m ago', unread: true },
  { id: 2, title: 'Assessment Results Ready', desc: 'Radar Meteorology Mid-Term grading completed for 84 trainees.', time: '1h ago', unread: true },
  { id: 3, title: 'New Cohort Feedback', desc: 'IMD Pune trainees submitted ratings for Satellite Climatology.', time: '3h ago', unread: true },
  { id: 4, title: 'Cloud Quota Updated', desc: 'Computational weather modeling cluster allocation renewed.', time: '1d ago', unread: false }
]

export default function TrainerDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [navSection, setNavSection] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [activeModal, setActiveModal] = useState(null)
  const [selectedTrainee, setSelectedTrainee] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [notifications, setNotifications] = useState(INITIAL_TRAINER_NOTIFICATIONS)

  const [courses, setCourses] = useState(initialCourses)
  const [trainees, setTrainees] = useState(initialTrainees)
  const [assessments, setAssessments] = useState(initialAssessments)
  const [competencies, setCompetencies] = useState(initialCompetencies)
  const [contentList, setContentList] = useState(initialContent)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [feedbackList, setFeedbackList] = useState(initialFeedback)

  useEffect(() => {
    let isMounted = true
    api.getCourses().then(data => { if (isMounted && data) setCourses(data) }).catch(() => { })
    api.getTrainees().then(data => { if (isMounted && data) setTrainees(data) }).catch(() => { })
    api.getAssessments().then(data => { if (isMounted && data) setAssessments(data) }).catch(() => { })
    api.getCompetencies().then(data => { if (isMounted && data) setCompetencies(data) }).catch(() => { })
    api.getContent().then(data => { if (isMounted && data) setContentList(data) }).catch(() => { })
    api.getAnnouncements().then(data => { if (isMounted && data) setAnnouncements(data) }).catch(() => { })
    api.getFeedback().then(data => { if (isMounted && data) setFeedbackList(data) }).catch(() => { })
    return () => { isMounted = false }
  }, [])

  const openTrainerProfile = () => {
    window.location.hash = '#trainer-profile'
  }

  const showToast = (msg) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3800)
  }

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const unreadCount = notifications.filter(n => n.unread).length

  const handleActionSuccess = async (msg, newItem, type) => {
    if (newItem && type === 'course') {
      try { await api.createCourse(newItem) } catch { }
      setCourses(prev => [newItem, ...prev])
    }
    if (newItem && type === 'assessment') {
      try { await api.createAssessment(newItem) } catch { }
      setAssessments(prev => [newItem, ...prev])
    }
    if (newItem && type === 'announcement') {
      try { await api.createAnnouncement(newItem) } catch { }
      setAnnouncements(prev => [newItem, ...prev])
    }
    if (newItem && type === 'content') {
      try { await api.createContent(newItem) } catch { }
      setContentList(prev => [newItem, ...prev])
    }
    showToast(msg)
  }

  const NAV_SECTIONS = [
    {
      group: 'Overview',
      items: [
        {
          id: 'Dashboard',
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
          id: 'Analytics',
          label: 'Analytics',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Training & Academics',
      items: [
        {
          id: 'My Courses',
          label: 'My Courses',
          badge: courses.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        },
        {
          id: 'Trainees',
          label: 'Trainees',
          badge: '486',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          )
        },
        {
          id: 'Assessments',
          label: 'Assessments',
          badge: assessments.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )
        },
        {
          id: 'Content',
          label: 'Learning Content',
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
      group: 'Evaluation & Skills',
      items: [
        {
          id: 'Competencies',
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
          id: 'Feedback',
          label: 'Feedback',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Communications & Support',
      items: [
        {
          id: 'Announcements',
          label: 'Announcements',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          )
        },
        {
          id: 'Help & Support',
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
          id: 'Settings',
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
  ]

  return (
    <div className="trainer-layout-root">
      {/* Mobile Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="trainer-sidebar-backdrop-mobile"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close navigation drawer"
        />
      )}

      {/* FIXED SIDEBAR */}
      <aside className={`trainer-sidebar-container ${drawerOpen ? 'open' : ''}`}>
        <div className="trainer-sidebar-header">
          <button type="button" className="trainer-sidebar-brand" onClick={onBack} title="Return to Landing Page">
            <div className="trainer-sidebar-logo-icon">
              <img src={cloverIcon} alt="CapacityConnect" style={{ width: 18, height: 18 }} />
            </div>
            <div className="trainer-sidebar-brand-text">
              <div className="trainer-brand-name">
                <span className="trainer-brand-part-cap">Capacity</span>
                <span className="trainer-brand-part-conn">Connect</span>
              </div>
              <div className="trainer-brand-portal-badge">TRAINER PORTAL</div>
            </div>
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className="trainer-sidebar-nav-scroll">
          {NAV_SECTIONS.map((sec) => (
            <div className="trainer-nav-group" key={sec.group}>
              <div className="trainer-nav-group-title">{sec.group}</div>
              {sec.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`trainer-nav-item-btn ${navSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setNavSection(item.id)
                    setDrawerOpen(false)
                  }}
                >
                  <div className="trainer-nav-btn-left">
                    <span className="trainer-nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && <span className="trainer-nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Institutional Live Status Card */}
        <div className="trainer-sidebar-status-card">
          <div className="trainer-status-indicator">
            <span className="trainer-status-ping" />
            <span className="trainer-status-dot" />
          </div>
          <div className="trainer-status-info">
            <span className="trainer-status-title">MoES Network • Live</span>
            <span className="trainer-status-subtitle">IMD Pune Faculty Node</span>
          </div>
        </div>

        {/* Profile Card with Integrated Exit */}
        <div className="trainer-sidebar-footer">
          <div className="trainer-sidebar-user-card" onClick={openTrainerProfile} title="Click to view Dr. Rahul Sharma's Trainer Profile">
            <div className="trainer-user-avatar">
              RS
              <span className="trainer-online-indicator" />
            </div>
            <div className="trainer-user-info">
              <strong className="trainer-user-name">Dr. Rahul Sharma</strong>
              <small className="trainer-user-role">Senior Meteorologist (Faculty)</small>
            </div>
            <button
              type="button"
              className="trainer-user-card-exit-btn"
              onClick={(e) => {
                e.stopPropagation()
                onBack()
              }}
              title="Exit to Home"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="trainer-main-viewport">
        {/* TOP NAVBAR */}
        <header className="trainer-top-navbar">
          <div className="trainer-nav-left-meta">
            <button
              type="button"
              className="trainer-mobile-drawer-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Drawer"
            >
              ☰
            </button>
            <div className="trainer-nav-heading-wrap">
              <h1 className="trainer-nav-heading-title">
                {navSection === 'Dashboard' ? 'Trainer Workspace' : `${navSection}`}
              </h1>
              <span className="trainer-nav-heading-sub">
                Monitor learning activity, trainee cohorts, and competency growth.
              </span>
            </div>
          </div>

          <div className="trainer-nav-actions-wrap">
            {/* Global Search Bar */}
            <div className="trainer-search-wrapper">
              <span className="trainer-search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="trainer-search-input"
                placeholder="Search trainees, courses, assessments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Notification Bell */}
            <div className="trainer-bell-container">
              <button
                type="button"
                className={`trainer-bell-btn ${noticeOpen ? 'active' : ''}`}
                onClick={() => setNoticeOpen(!noticeOpen)}
                title="View Trainer Alerts"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && <span className="trainer-bell-badge">{unreadCount}</span>}
              </button>

              {noticeOpen && (
                <div className="trainer-notification-popover">
                  <div className="trainer-notif-head">
                    <strong>Faculty Alerts & Notifications</strong>
                    {unreadCount > 0 && (
                      <button type="button" className="trainer-notif-mark-btn" onClick={markAllNotifsRead}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="trainer-notif-list">
                    {notifications.map((item) => (
                      <div className={`trainer-notif-item ${item.unread ? 'unread' : ''}`} key={item.id}>
                        <div className="trainer-notif-title-row">
                          <span className="trainer-notif-item-title">{item.title}</span>
                          <span className="trainer-notif-time">{item.time}</span>
                        </div>
                        <p className="trainer-notif-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="trainer-header-btn-group">
              <button
                type="button"
                className="btn-trainer-primary"
                onClick={() => setActiveModal('create-course')}
              >
                <span>+ Create Course</span>
              </button>
              <button
                type="button"
                className="btn-trainer-secondary"
                onClick={() => setActiveModal('create-assessment')}
              >
                <span>+ Create Assessment</span>
              </button>
            </div>

            {/* Profile Dropdown Toggle */}
            <div className="trainer-profile-menu-container">
              <button
                type="button"
                className="trainer-profile-avatar-btn"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                title="Faculty Profile Options"
              >
                RS
                <span className="trainer-header-online-dot" />
              </button>

              {profileMenuOpen && (
                <div className="trainer-profile-dropdown">
                  <div className="trainer-dropdown-user-header">
                    <strong>Dr. Rahul Sharma</strong>
                    <small>rahul.sharma@imd.gov.in</small>
                    <span className="trainer-faculty-badge">Senior Meteorologist • MoES</span>
                  </div>
                  <div className="trainer-dropdown-divider" />
                  <button
                    type="button"
                    className="trainer-dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      openTrainerProfile()
                    }}
                  >
                    <span>View Public Profile ↗</span>
                  </button>
                  <button
                    type="button"
                    className="trainer-dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      setNavSection('Settings')
                    }}
                  >
                    <span>Account Settings</span>
                  </button>
                  <div className="trainer-dropdown-divider" />
                  <button
                    type="button"
                    className="trainer-dropdown-item text-danger"
                    onClick={onBack}
                  >
                    <span>Exit to Home / Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* SCROLLABLE VIEWPORT CONTENT */}
        <main className="trainer-scrollable-content">
          {navSection === 'Dashboard' && (
            <div className="trainer-dashboard-home">
              {/* Hero Banner */}
              <div className="trainer-welcome-hero">
                <div className="trainer-hero-copy">
                  <span className="trainer-hero-tag">FACULTY WORKSPACE • MOES / IMD TRAINING NETWORK</span>
                  <h2 className="trainer-welcome-title">Good morning, Dr. Sharma 👋</h2>
                  <p className="trainer-welcome-desc">
                    Monitor your assigned trainee cohorts, track competency assessments, and manage course curriculums across national centers.
                  </p>
                </div>
                <div className="trainer-hero-actions">
                  <button
                    type="button"
                    className="btn-trainer-primary"
                    onClick={() => setNavSection('Trainees')}
                  >
                    👥 View Trainees (486)
                  </button>
                  <button
                    type="button"
                    className="btn-trainer-secondary"
                    onClick={() => setNavSection('Analytics')}
                  >
                    📊 Analytics & Reports
                  </button>
                </div>
              </div>

              {/* KPI Stat Cards */}
              <div className="trainer-kpis-grid">
                <div className="trainer-kpi-card">
                  <div className="trainer-kpi-top">
                    <div className="trainer-kpi-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <span className="trainer-kpi-trend positive">Active Cohorts</span>
                  </div>
                  <span className="trainer-kpi-label">Active Courses</span>
                  <div className="trainer-kpi-value">{courses.length}</div>
                  <span className="trainer-kpi-subtext">
                    {courses.filter(c => c.status === 'Published').length} published · {courses.filter(c => c.status === 'Draft').length} draft
                  </span>
                </div>

                <div className="trainer-kpi-card">
                  <div className="trainer-kpi-top">
                    <div className="trainer-kpi-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <span className="trainer-kpi-trend positive">↑ +24 this month</span>
                  </div>
                  <span className="trainer-kpi-label">Total Trainees</span>
                  <div className="trainer-kpi-value">486</div>
                  <span className="trainer-kpi-subtext">Across 12 IMD regional meteorological labs</span>
                </div>

                <div className="trainer-kpi-card">
                  <div className="trainer-kpi-top">
                    <div className="trainer-kpi-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <span className="trainer-kpi-trend neutral">Evaluations</span>
                  </div>
                  <span className="trainer-kpi-label">Assessments</span>
                  <div className="trainer-kpi-value">{assessments.length}</div>
                  <span className="trainer-kpi-subtext">
                    {assessments.filter(a => a.status === 'Published').length} active examinations
                  </span>
                </div>

                <div className="trainer-kpi-card">
                  <div className="trainer-kpi-top">
                    <div className="trainer-kpi-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <span className="trainer-kpi-trend positive">↑ +6% vs benchmark</span>
                  </div>
                  <span className="trainer-kpi-label">Average Completion</span>
                  <div className="trainer-kpi-value">78%</div>
                  <span className="trainer-kpi-subtext">High institutional engagement index</span>
                </div>
              </div>

              {/* Live Classroom Poll Launcher Widget */}
              <LiveClassroomPollWidget onNotify={showToast} />

              {/* My Courses Section */}
              <section className="trainer-card-panel">
                <div className="trainer-panel-header">
                  <div>
                    <h3 className="trainer-panel-title">My Active Courses</h3>
                    <p className="trainer-panel-subtitle">Manage curriculums, modules, and enrolled trainee progress</p>
                  </div>
                  <div className="trainer-panel-actions">
                    <button
                      type="button"
                      className="btn-trainer-secondary small"
                      onClick={() => setNavSection('My Courses')}
                    >
                      View All Courses →
                    </button>
                    <button
                      type="button"
                      className="btn-trainer-primary small"
                      onClick={() => setActiveModal('create-course')}
                    >
                      + Create Course
                    </button>
                  </div>
                </div>

                <div className="trainer-courses-summary-grid">
                  {courses.slice(0, 3).map((course) => (
                    <article className="trainer-summary-course-card" key={course.id}>
                      <div className="trainer-course-card-top">
                        <span className="trainer-course-category-tag">{course.category}</span>
                        <span className={`trainer-status-pill ${course.status === 'Published' ? 'active' : 'draft'}`}>
                          {course.status}
                        </span>
                      </div>
                      <h4 className="trainer-course-card-title">{course.title}</h4>
                      <span className="trainer-course-level-badge">{course.level}</span>
                      <div className="trainer-course-meta-row">
                        <span>👥 {course.traineesCount} Trainees</span>
                        <span>📚 {course.modulesCount} Modules</span>
                      </div>
                      <div className="trainer-course-progress-wrap">
                        <div className="trainer-progress-bar-bg">
                          <div
                            className="trainer-progress-bar-fill"
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <div className="trainer-progress-labels">
                          <span>Progress</span>
                          <strong>{course.completionRate}% average completion</strong>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="trainer-btn-manage-course"
                        onClick={() => setNavSection('My Courses')}
                      >
                        Manage Course & Curriculum →
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              {/* Two Column Grid: Trainee Performance & Needs Attention */}
              <div className="trainer-two-col-grid">
                <section className="trainer-card-panel">
                  <div className="trainer-panel-header">
                    <div>
                      <h3 className="trainer-panel-title">Trainee Performance Growth</h3>
                      <p className="trainer-panel-subtitle">Weekly learning progress and assessment metrics</p>
                    </div>
                  </div>

                  <div className="trainer-performance-metric-cards">
                    <div className="trainer-perf-box">
                      <span className="trainer-perf-val">82%</span>
                      <span className="trainer-perf-lbl">Average Score</span>
                    </div>
                    <div className="trainer-perf-box">
                      <span className="trainer-perf-val">78%</span>
                      <span className="trainer-perf-lbl">Completion Rate</span>
                    </div>
                    <div className="trainer-perf-box">
                      <span className="trainer-perf-val highlight">+14%</span>
                      <span className="trainer-perf-lbl">Competency Growth</span>
                    </div>
                    <div className="trainer-perf-box">
                      <span className="trainer-perf-val danger">12</span>
                      <span className="trainer-perf-lbl">At-Risk Learners</span>
                    </div>
                  </div>

                  {/* Dynamic Weekly Chart Bars */}
                  <div className="trainer-chart-container">
                    <div className="trainer-chart-bars-wrap">
                      <div className="trainer-chart-col">
                        <div className="trainer-bar" style={{ height: '43%' }} />
                        <span className="trainer-chart-label">Week 1</span>
                      </div>
                      <div className="trainer-chart-col">
                        <div className="trainer-bar" style={{ height: '57%' }} />
                        <span className="trainer-chart-label">Week 2</span>
                      </div>
                      <div className="trainer-chart-col">
                        <div className="trainer-bar" style={{ height: '66%' }} />
                        <span className="trainer-chart-label">Week 3</span>
                      </div>
                      <div className="trainer-chart-col">
                        <div className="trainer-bar" style={{ height: '81%' }} />
                        <span className="trainer-chart-label">Week 4</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="trainer-card-panel">
                  <div className="trainer-panel-header">
                    <div>
                      <h3 className="trainer-panel-title">Trainees Requiring Attention</h3>
                      <p className="trainer-panel-subtitle">Learners who benefit from mentoring or extra guidance</p>
                    </div>
                  </div>

                  <div className="trainer-attention-list">
                    <div className="trainer-attention-card">
                      <div className="trainer-attention-avatar">AJ</div>
                      <div className="trainer-attention-info">
                        <strong className="trainer-attention-name">Aditya Jaiswal</strong>
                        <span className="trainer-attention-course">Weather Data Analysis & Forecasting</span>
                        <div className="trainer-attention-meta">
                          <span>Progress: <strong>32%</strong></span>
                          <span>Exam Score: <strong className="text-danger">48%</strong></span>
                        </div>
                        <span className="trainer-gap-tag">Skill Gap: Data Analysis (41%)</span>
                      </div>
                      <button
                        type="button"
                        className="btn-trainer-view-gap"
                        onClick={() => {
                          setSelectedTrainee(trainees[0])
                          setActiveModal('trainee-details')
                        }}
                      >
                        Inspect →
                      </button>
                    </div>

                    <div className="trainer-attention-card">
                      <div className="trainer-attention-avatar">RV</div>
                      <div className="trainer-attention-info">
                        <strong className="trainer-attention-name">Rahul Verma</strong>
                        <span className="trainer-attention-course">Numerical Weather Prediction</span>
                        <div className="trainer-attention-meta">
                          <span>Progress: <strong>28%</strong></span>
                          <span>Exam Score: <strong className="text-danger">54%</strong></span>
                        </div>
                        <span className="trainer-gap-tag">Skill Gap: Physics Modeling (48%)</span>
                      </div>
                      <button
                        type="button"
                        className="btn-trainer-view-gap"
                        onClick={() => {
                          setSelectedTrainee(trainees[1])
                          setActiveModal('trainee-details')
                        }}
                      >
                        Inspect →
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Two Column Grid: Competency Analytics & Assessment Management */}
              <div className="trainer-two-col-grid">
                <section className="trainer-card-panel">
                  <div className="trainer-panel-header">
                    <div>
                      <h3 className="trainer-panel-title">Competency Analytics</h3>
                      <p className="trainer-panel-subtitle">How trainees are developing key meteorological proficiencies</p>
                    </div>
                    <button
                      type="button"
                      className="text-link-button"
                      onClick={() => setNavSection('Competencies')}
                    >
                      Detailed Matrix →
                    </button>
                  </div>

                  <div className="trainer-competencies-list">
                    {competencies.map((c) => (
                      <div className="trainer-competency-item" key={c.name}>
                        <div className="trainer-comp-row-header">
                          <strong className="trainer-comp-name">{c.name}</strong>
                          <div className="trainer-comp-right">
                            <span className={`trainer-comp-badge ${c.status === 'Strong' ? 'strong' : c.status === 'Developing' ? 'developing' : 'needs'}`}>
                              {c.status}
                            </span>
                            <span className="trainer-comp-score">{c.score}%</span>
                          </div>
                        </div>
                        <div className="trainer-comp-progress-bg">
                          <div
                            className={`trainer-comp-progress-fill ${c.status === 'Strong' ? 'strong' : c.status === 'Developing' ? 'developing' : 'needs'}`}
                            style={{ width: `${c.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="trainer-card-panel">
                  <div className="trainer-panel-header">
                    <div>
                      <h3 className="trainer-panel-title">Assessment Management</h3>
                      <p className="trainer-panel-subtitle">Create, monitor, and evaluate competency tests</p>
                    </div>
                    <button
                      type="button"
                      className="btn-trainer-primary small"
                      onClick={() => setActiveModal('create-assessment')}
                    >
                      + New Test
                    </button>
                  </div>

                  <div className="trainer-assessments-list">
                    {assessments.slice(0, 3).map((asm) => (
                      <div className="trainer-asm-row" key={asm.id}>
                        <div className="trainer-asm-icon">📋</div>
                        <div className="trainer-asm-info">
                          <strong className="trainer-asm-title">{asm.title}</strong>
                          <span className="trainer-asm-meta">
                            {asm.questionsCount} Questions · {asm.attemptsCount} Attempts · Avg {asm.avgScore}%
                          </span>
                        </div>
                        <span className={`trainer-status-pill ${asm.status === 'Published' ? 'active' : 'draft'}`}>
                          {asm.status}
                        </span>
                        <button
                          type="button"
                          className="btn-trainer-secondary small"
                          onClick={() => setNavSection('Assessments')}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {navSection === 'My Courses' && (
            <TrainerCoursesView
              courses={courses}
              onOpenModal={setActiveModal}
              onSelectCourse={(c) => console.log(c)}
            />
          )}

          {navSection === 'Trainees' && (
            <TrainerTraineesView
              trainees={trainees}
              onOpenModal={setActiveModal}
              onSelectTrainee={setSelectedTrainee}
            />
          )}

          {navSection === 'Assessments' && (
            <TrainerAssessmentsView
              assessments={assessments}
              onOpenModal={setActiveModal}
            />
          )}

          {navSection === 'Competencies' && (
            <TrainerCompetenciesView
              competencies={competencies}
            />
          )}

          {navSection === 'Content' && (
            <TrainerContentView
              contentList={contentList}
              onOpenModal={setActiveModal}
            />
          )}

          {navSection === 'Announcements' && (
            <TrainerAnnouncementsView
              announcements={announcements}
              onOpenModal={setActiveModal}
            />
          )}

          {navSection === 'Feedback' && (
            <TrainerFeedbackView
              feedbackList={feedbackList}
              onHelpful={showToast}
            />
          )}

          {navSection === 'Analytics' && (
            <TrainerAnalyticsView
              analytics={initialAnalytics}
            />
          )}

          {navSection === 'Help & Support' && (
            <TrainerSupportView
              faqs={initialFaqs}
            />
          )}

          {navSection === 'Settings' && (
            <TrainerSettingsView
              onSave={showToast}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <TrainerPortalModals
        activeModal={activeModal}
        modalData={selectedTrainee}
        onClose={() => setActiveModal(null)}
        onActionSuccess={handleActionSuccess}
      />

      {/* Toast notifications */}
      {toastMessage && (
        <div className="trainer-toast-notification">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

function LiveClassroomPollWidget({ onNotify }) {
  const PRESET_POLLS = [
    {
      id: 'poll-1',
      topic: 'Radar Meteorology & Signal Processing',
      question: 'What is the primary factor determining maximum unambiguous velocity (V_max) in Doppler Weather Radar?',
      options: [
        { key: 'A', text: 'Pulse Repetition Frequency (PRF) × Radar Wavelength / 4', votes: 58, correct: true },
        { key: 'B', text: 'Azimuthal antenna rotation speed and beam width', votes: 12, correct: false },
        { key: 'C', text: 'Atmospheric pressure lapse rate at 500 hPa', votes: 9, correct: false },
        { key: 'D', text: 'Reflectivity factor (Z) calibration constant', votes: 5, correct: false }
      ],
      explanation: 'V_max = (λ × PRF) / 4. Increasing PRF elevates unambiguous velocity but decreases maximum unambiguous range (Doppler Dilemma).'
    },
    {
      id: 'poll-2',
      topic: 'Numerical Weather Prediction (NWP)',
      question: 'Which numerical time-integration scheme is unconditionally stable for linear advective modeling?',
      options: [
        { key: 'A', text: 'Crank-Nicolson Implicit Scheme', votes: 51, correct: true },
        { key: 'B', text: 'Forward Euler Explicit Scheme', votes: 15, correct: false },
        { key: 'C', text: 'Standard Leapfrog Scheme without Asselin Filter', votes: 11, correct: false },
        { key: 'D', text: 'Adams-Bashforth 2nd Order Scheme', votes: 7, correct: false }
      ],
      explanation: 'The Crank-Nicolson implicit scheme is unconditionally stable for linear hyperbolic and parabolic partial differential equations.'
    },
    {
      id: 'poll-3',
      topic: 'Satellite Climatology & Radiometry',
      question: 'Which spectral band on INSAT-3D/3DR is best suited to track mid-to-upper tropospheric moisture flux?',
      options: [
        { key: 'A', text: '6.7 µm – 7.1 µm Water Vapor Absorption Channel', votes: 64, correct: true },
        { key: 'B', text: '0.65 µm Visible Reflected Solar Channel', votes: 8, correct: false },
        { key: 'C', text: '10.8 µm Longwave Thermal Window Channel', votes: 9, correct: false },
        { key: 'D', text: '3.9 µm Shortwave Infrared Channel', votes: 3, correct: false }
      ],
      explanation: 'The 6.7–7.1 µm channel captures strong vibrational absorption of H2O molecules in the 300–600 hPa altitude band.'
    }
  ]

  const [activePollIndex, setActivePollIndex] = useState(0)
  const [pollState, setPollState] = useState(PRESET_POLLS[0])
  const [showExplanation, setShowExplanation] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)

  const currentPoll = pollState
  const totalVotes = currentPoll.options.reduce((acc, opt) => acc + opt.votes, 0)

  const handleSelectPoll = (idx) => {
    setActivePollIndex(idx)
    setPollState(PRESET_POLLS[idx])
    setShowExplanation(false)
    if (onNotify) onNotify(`Switched to poll question: "${PRESET_POLLS[idx].topic}"`)
  }

  const handleSimulateResponse = () => {
    setIsSimulating(true)
    const randomIdx = Math.random() > 0.3 ? 0 : Math.floor(Math.random() * currentPoll.options.length)
    const updatedOptions = currentPoll.options.map((opt, idx) => {
      if (idx === randomIdx) {
        return { ...opt, votes: opt.votes + 1 }
      }
      return opt
    })
    setPollState(prev => ({ ...prev, options: updatedOptions }))
    setTimeout(() => setIsSimulating(false), 400)
    if (onNotify) onNotify('Received live cohort response from IMD Pune Node (+1 Vote)')
  }

  const handleResetVotes = () => {
    setPollState(prev => ({
      ...prev,
      options: prev.options.map(o => ({ ...o, votes: Math.floor(o.votes / 3) }))
    }))
    setShowExplanation(false)
    if (onNotify) onNotify('Live poll cohort counter reset.')
  }

  return (
    <section className="trainer-card-panel trainer-live-poll-section">
      <div className="trainer-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="trainer-live-pulse-badge">
            <span className="live-dot-ping" />
            <span className="live-dot" />
            LIVE COHORT POLLING
          </div>
          <div>
            <h3 className="trainer-panel-title">Interactive Classroom Quick-Poll</h3>
            <p className="trainer-panel-subtitle">Broadcast rapid conceptual checks to regional meteorological training nodes in real-time</p>
          </div>
        </div>
        <div className="trainer-panel-actions">
          <button
            type="button"
            className="btn-trainer-secondary small"
            onClick={handleResetVotes}
            title="Reset active poll responses"
          >
            ↺ Reset Session
          </button>
          <button
            type="button"
            className="btn-trainer-primary small"
            onClick={handleSimulateResponse}
            disabled={isSimulating}
          >
            {isSimulating ? 'Receiving Data...' : '⚡ Simulate Trainee Vote'}
          </button>
        </div>
      </div>

      {/* Preset Question Picker Pills */}
      <div className="trainer-poll-pills-row">
        <span className="trainer-poll-pills-lbl">Active Topics:</span>
        {PRESET_POLLS.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            className={`trainer-poll-selector-pill ${activePollIndex === idx ? 'active' : ''}`}
            onClick={() => handleSelectPoll(idx)}
          >
            {idx + 1}. {p.topic}
          </button>
        ))}
      </div>

      {/* Main Poll Card */}
      <div className="trainer-poll-display-card">
        <div className="trainer-poll-meta-header">
          <div className="trainer-poll-badge-node">
            <span>📡 Target Cohorts:</span>
            <strong>IMD Pune, Delhi Alipore, Chennai (84 Trainees Connected)</strong>
          </div>
          <div className="trainer-poll-total-votes">
            Total Responses: <strong>{totalVotes}</strong>
          </div>
        </div>

        <h4 className="trainer-poll-question-text">{currentPoll.question}</h4>

        {/* Options Breakdown */}
        <div className="trainer-poll-options-grid">
          {currentPoll.options.map((opt) => {
            const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0
            return (
              <div
                key={opt.key}
                className={`trainer-poll-option-row ${showExplanation && opt.correct ? 'is-correct' : ''}`}
              >
                <div className="trainer-poll-option-key">{opt.key}</div>
                <div className="trainer-poll-option-content">
                  <div className="trainer-poll-option-text-row">
                    <span className="trainer-poll-opt-text">{opt.text}</span>
                    <span className="trainer-poll-opt-pct">
                      {showExplanation && opt.correct && <span className="correct-tag">✓ Correct Key</span>}
                      <strong>{pct}%</strong> ({opt.votes} votes)
                    </span>
                  </div>
                  <div className="trainer-poll-bar-track">
                    <div
                      className={`trainer-poll-bar-fill ${showExplanation && opt.correct ? 'correct-fill' : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Reveal Answer / Explanation Footer */}
        <div className="trainer-poll-footer-actions">
          <button
            type="button"
            className={`btn-trainer-secondary small ${showExplanation ? 'active-reveal' : ''}`}
            onClick={() => setShowExplanation(!showExplanation)}
          >
            {showExplanation ? 'Hide Institutional Key & Solution' : '👁 Reveal Key & Scientific Explanation'}
          </button>
          <span className="trainer-poll-nodes-status">
            4/4 Regional Nodes Synced • Latency: 12ms
          </span>
        </div>

        {showExplanation && (
          <div className="trainer-poll-explanation-box">
            <strong>Institutional Formulation & Scientific Rationale:</strong>
            <p>{currentPoll.explanation}</p>
          </div>
        )}
      </div>
    </section>
  )
}

