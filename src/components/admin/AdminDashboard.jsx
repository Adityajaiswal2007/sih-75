import React, { useState } from 'react'
import './AdminDashboard.css'
import cloverIcon from '../../assets/landing/arcticons-clover0.svg'

// Initial Mock Data
const INITIAL_COMPETENCIES = [
  { name: 'Python & Programming', score: 82, target: 80, trainees: 324, status: 'Strong' },
  { name: 'Data Analysis', score: 74, target: 75, trainees: 286, status: 'Developing' },
  { name: 'Weather Data Analysis', score: 68, target: 75, trainees: 210, status: 'Developing' },
  { name: 'GIS & Spatial Analytics', score: 61, target: 75, trainees: 194, status: 'Developing' },
  { name: 'Satellite Remote Sensing', score: 54, target: 75, trainees: 165, status: 'Action Required' },
  { name: 'Machine Learning in Weather', score: 47, target: 75, trainees: 126, status: 'Action Required' }
]

const INITIAL_COURSES = [
  { id: 'C101', name: 'Python Fundamentals for Earth Science', enrolled: 324, completion: '86%', avgScore: '82%', status: 'Excellent', domain: 'Programming' },
  { id: 'C102', name: 'Weather Data Analysis & Forecasting', enrolled: 286, completion: '74%', avgScore: '76%', status: 'Good', domain: 'Meteorology' },
  { id: 'C103', name: 'GIS & Spatial Mapping Basics', enrolled: 194, completion: '61%', avgScore: '68%', status: 'Needs Attention', domain: 'Geospatial' },
  { id: 'C104', name: 'Satellite Climatology & Radar Systems', enrolled: 165, completion: '58%', avgScore: '64%', status: 'Needs Attention', domain: 'Remote Sensing' },
  { id: 'C105', name: 'Numerical Weather Prediction (NWP)', enrolled: 142, completion: '79%', avgScore: '80%', status: 'Good', domain: 'Modeling' }
]

const INITIAL_TRAINERS = [
  { name: 'Dr. Rahul Sharma', expertise: 'Weather Data Analysis', score: '92%', trained: '84 trainees', rating: '4.9/5', status: 'Accredited' },
  { name: 'Dr. Neha Verma', expertise: 'Remote Sensing & GIS', score: '89%', trained: '71 trainees', rating: '4.8/5', status: 'Accredited' },
  { name: 'Dr. Amit Kumar', expertise: 'Python & Data Analysis', score: '86%', trained: '96 trainees', rating: '4.7/5', status: 'Accredited' },
  { name: 'Dr. Priya Nair', expertise: 'Atmospheric Physics & NWP', score: '94%', trained: '112 trainees', rating: '4.9/5', status: 'Senior Faculty' }
]

const INITIAL_TRAINEES = [
  { id: 'TR-1082', name: 'Aditya Jaiswal', dept: 'Meteorology Division', enrolled: '6 Enrolled', score: '74%', status: 'Active' },
  { id: 'TR-1094', name: 'Rahul Verma', dept: 'Climatology Unit', enrolled: '4 Enrolled', score: '68%', status: 'Active' },
  { id: 'TR-1105', name: 'Pooja Sharma', dept: 'Remote Sensing Lab', enrolled: '5 Enrolled', score: '88%', status: 'Distinction' },
  { id: 'TR-1112', name: 'Amit Kumar', dept: 'Hydrology Division', enrolled: '3 Enrolled', score: '58%', status: 'Needs Attention' },
  { id: 'TR-1120', name: 'Sneha Patel', dept: 'Numerical Modeling Unit', enrolled: '5 Enrolled', score: '82%', status: 'Active' },
  { id: 'TR-1135', name: 'Vikram Singh', dept: 'Ocean Science Wing', enrolled: '4 Enrolled', score: '76%', status: 'Active' }
]

const INITIAL_ASSESSMENTS = [
  { id: 'ASM-01', title: 'Radar Meteorology Mid-Term Assessment', course: 'Satellite Climatology & Radar Systems', candidates: 142, date: 'Sept 18, 2026', avgScore: '71%', status: 'Scheduled' },
  { id: 'ASM-02', title: 'Python for Earth Sciences Lab Exam', course: 'Python Fundamentals for Earth Science', candidates: 310, date: 'Sept 10, 2026', avgScore: '84%', status: 'Completed' },
  { id: 'ASM-03', title: 'GIS Spatial Analytics Practical Exam', course: 'GIS & Spatial Mapping Basics', candidates: 185, date: 'Sept 04, 2026', avgScore: '68%', status: 'Completed' },
  { id: 'ASM-04', title: 'Numerical Weather Prediction Evaluation', course: 'Numerical Weather Prediction (NWP)', candidates: 130, date: 'Sept 25, 2026', avgScore: '--', status: 'Upcoming' }
]

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Competency Gap Alert', desc: '12 competency gaps need attention in Satellite Climatology & Radar.', time: '10m ago', unread: true },
  { id: 2, title: 'Faculty Accreditation Request', desc: 'Dr. Sunita Rao submitted faculty verification credentials.', time: '1h ago', unread: true },
  { id: 3, title: 'Trainee Cohort Feedback', desc: 'New trainee evaluation reports uploaded from IMD Pune Center.', time: '3h ago', unread: false },
  { id: 4, title: 'Scheduled Platform Audit', desc: 'System integrity and security logs synchronized with MoES server.', time: '1d ago', unread: false }
]

export default function AdminDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [period, setPeriod] = useState('30 Days')
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  // Data states
  const [courses, setCourses] = useState(INITIAL_COURSES)
  const [trainers, setTrainers] = useState(INITIAL_TRAINERS)
  const [trainees, setTrainees] = useState(INITIAL_TRAINEES)
  const [assessments, setAssessments] = useState(INITIAL_ASSESSMENTS)
  const [competencies, setCompetencies] = useState(INITIAL_COMPETENCIES)

  // Modal State
  const [activeModal, setActiveModal] = useState(null)
  const [newTraineeForm, setNewTraineeForm] = useState({ name: '', dept: 'Meteorology Division', email: '' })
  const [newTrainerForm, setNewTrainerForm] = useState({ name: '', expertise: 'Meteorology', email: '' })
  const [newCourseForm, setNewCourseForm] = useState({ name: '', domain: 'Meteorology', enrolled: '120' })
  const [actionSuccessMsg, setActionSuccessMsg] = useState('')

  const openTrainerProfile = () => {
    window.location.hash = '#trainer-profile'
  }

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const unreadCount = notifications.filter(n => n.unread).length

  // Handlers for adding items
  const handleAddTrainee = (e) => {
    e.preventDefault()
    if (!newTraineeForm.name) return
    const newEntry = {
      id: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newTraineeForm.name,
      dept: newTraineeForm.dept,
      enrolled: '1 Enrolled',
      score: '80%',
      status: 'Active'
    }
    setTrainees([newEntry, ...trainees])
    setActiveModal(null)
    setNewTraineeForm({ name: '', dept: 'Meteorology Division', email: '' })
    setActionSuccessMsg(`Trainee ${newEntry.name} registered successfully!`)
    setTimeout(() => setActionSuccessMsg(''), 4000)
  }

  const handleAddTrainer = (e) => {
    e.preventDefault()
    if (!newTrainerForm.name) return
    const newEntry = {
      name: newTrainerForm.name,
      expertise: newTrainerForm.expertise,
      score: '90%',
      trained: '0 trainees',
      rating: '5.0/5',
      status: 'Accredited'
    }
    setTrainers([newEntry, ...trainers])
    setActiveModal(null)
    setNewTrainerForm({ name: '', expertise: 'Meteorology', email: '' })
    setActionSuccessMsg(`Trainer invite dispatched to ${newEntry.name}!`)
    setTimeout(() => setActionSuccessMsg(''), 4000)
  }

  const handleAddCourse = (e) => {
    e.preventDefault()
    if (!newCourseForm.name) return
    const newEntry = {
      id: `C${Math.floor(100 + Math.random() * 900)}`,
      name: newCourseForm.name,
      enrolled: Number(newCourseForm.enrolled) || 100,
      completion: '0%',
      avgScore: '80%',
      status: 'Good',
      domain: newCourseForm.domain
    }
    setCourses([newEntry, ...courses])
    setActiveModal(null)
    setNewCourseForm({ name: '', domain: 'Meteorology', enrolled: '120' })
    setActionSuccessMsg(`Course "${newEntry.name}" published to catalog!`)
    setTimeout(() => setActionSuccessMsg(''), 4000)
  }

  // Sidebar navigation structure with SVGs
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
      group: 'Academic & Learning',
      items: [
        {
          id: 'Courses',
          label: 'Courses',
          badge: courses.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        },
        {
          id: 'Assessments',
          label: 'Assessments',
          badge: assessments.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )
        },
        {
          id: 'Learning Content',
          label: 'Learning Content',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          )
        },
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
        }
      ]
    },
    {
      group: 'Personnel & Faculty',
      items: [
        {
          id: 'Trainees',
          label: 'Trainees',
          badge: '2.4k',
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
          id: 'Trainers',
          label: 'Trainers',
          badge: trainers.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          )
        },
        {
          id: 'Trainer Matching',
          label: 'Trainer Matching',
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
      group: 'Governance',
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
          id: 'Feedback',
          label: 'Feedback',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        },
        {
          id: 'Reports',
          label: 'Reports & Audit',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
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
    <div className="admin-layout-root">
      {/* SIDEBAR */}
      <aside className={`admin-sidebar-container ${drawerOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <button type="button" className="admin-sidebar-brand" onClick={onBack} title="Return to Landing Page">
            <div className="admin-sidebar-logo-icon">
              <img src={cloverIcon} alt="CapacityConnect" style={{ width: 18, height: 18 }} />
            </div>
            <div className="admin-sidebar-brand-text">
              <div className="admin-brand-name">
                <span className="admin-brand-part-cap">Capacity</span>
                <span className="admin-brand-part-conn">Connect</span>
              </div>
              <div className="admin-brand-portal-badge">ADMIN PORTAL</div>
            </div>
          </button>
        </div>

        {/* Scrollable Navigation Groups */}
        <nav className="admin-sidebar-nav-scroll">
          {NAV_SECTIONS.map((sec) => (
            <div className="admin-nav-group" key={sec.group}>
              <div className="admin-nav-group-title">{sec.group}</div>
              {sec.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`admin-nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id)
                    setDrawerOpen(false)
                  }}
                >
                  <div className="admin-nav-btn-left">
                    <span className="admin-nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Institutional Live Sync Indicator */}
        <div className="admin-sidebar-status-card">
          <div className="admin-status-indicator">
            <span className="admin-status-ping" />
            <span className="admin-status-dot" />
          </div>
          <div className="admin-status-info">
            <span className="admin-status-title">MoES Network • Live</span>
            <span className="admin-status-subtitle">IMD Node Sync Active</span>
          </div>
        </div>

        {/* Sidebar Footer with Profile & Integrated Exit */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user-card" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
            <div className="admin-user-avatar">
              AD
              <span className="admin-online-indicator" />
            </div>
            <div className="admin-user-info">
              <strong className="admin-user-name">Admin Workspace</strong>
              <small className="admin-user-role">Administrator (MoES/IMD)</small>
            </div>
            <button
              type="button"
              className="admin-user-card-exit-btn"
              onClick={(e) => {
                e.stopPropagation()
                onBack()
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

      {/* MAIN VIEWPORT */}
      <div className="admin-main-viewport">
        {/* TOP NAVBAR */}
        <header className="admin-top-navbar">
          <div className="admin-nav-left-meta">
            <button
              type="button"
              className="admin-mobile-drawer-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Drawer"
            >
              ☰
            </button>
            <div className="admin-nav-heading-wrap">
              <h1 className="admin-nav-heading-title">
                {activeTab === 'Dashboard' ? 'Institutional Dashboard' : `${activeTab} Management`}
              </h1>
              <span className="admin-nav-heading-sub">
                Monitor learning activity, capacity growth, and institutional performance.
              </span>
            </div>
          </div>

          <div className="admin-nav-actions-wrap">
            {/* Global Search Bar with adequate width and full placeholder */}
            <div className="admin-search-wrapper">
              <span className="admin-search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search courses, trainers, competencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notification Bell */}
            <div className="admin-bell-container">
              <button
                type="button"
                className={`admin-bell-btn ${noticeOpen ? 'active' : ''}`}
                onClick={() => setNoticeOpen(!noticeOpen)}
                title="View Admin Alerts"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && <span className="admin-bell-badge">{unreadCount}</span>}
              </button>

              {noticeOpen && (
                <div className="admin-notification-popover">
                  <div className="admin-notif-head">
                    <strong>Administrative Notifications</strong>
                    {unreadCount > 0 && (
                      <button type="button" className="admin-notif-mark-btn" onClick={markAllNotifsRead}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="admin-notif-list">
                    {notifications.map((item) => (
                      <div className="admin-notif-item" key={item.id} onClick={() => setNoticeOpen(false)}>
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                        <small>{item.time}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Header User Avatar Dropdown */}
            <div className="admin-user-menu-container">
              <button
                type="button"
                className="admin-header-avatar-btn"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="admin-user-avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
                  AD
                </div>
              </button>

              {profileMenuOpen && (
                <div className="admin-user-menu-dropdown">
                  <div className="admin-user-menu-profile-summary">
                    <strong>Admin Director</strong>
                    <small>admin.directorate@imd.gov.in</small>
                  </div>
                  <button
                    type="button"
                    className="admin-user-menu-item"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      openTrainerProfile()
                    }}
                  >
                    <span>👨‍🏫</span> View Trainer Profile
                  </button>
                  <button
                    type="button"
                    className="admin-user-menu-item"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      setActiveTab('Settings')
                    }}
                  >
                    <span>⚙️</span> Governance Settings
                  </button>
                  <button
                    type="button"
                    className="admin-user-menu-item logout"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      onBack()
                    }}
                  >
                    <span>←</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* FEEDBACK TOAST */}
        {actionSuccessMsg && (
          <div style={{
            margin: '16px 32px 0',
            padding: '12px 18px',
            borderRadius: '12px',
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            fontWeight: 600,
            fontSize: '13.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span>✓</span> {actionSuccessMsg}
          </div>
        )}

        {/* MAIN SCROLLABLE CONTENT BODY */}
        <main className="admin-scrollable-content">
          {/* TAB: DASHBOARD */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Top Overview Banner */}
              <div className="admin-welcome-hero">
                <div>
                  <div className="admin-welcome-kicker">
                    <span>INSTITUTIONAL PORTAL</span> • MoES / IMD Capacity Network
                  </div>
                  <h1 className="admin-welcome-title">Good morning, Admin 👋</h1>
                  <p className="admin-welcome-desc">
                    Monitor learning activity, workforce competencies and institutional capacity growth across all national centers.
                  </p>
                </div>
                <div className="admin-action-btn-group">
                  <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('addTrainee')}>
                    <span>+</span> Add Trainee
                  </button>
                  <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal('addTrainer')}>
                    <span>+</span> Add Trainer
                  </button>
                  <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal('createCourse')}>
                    <span>+</span> Create Course
                  </button>
                </div>
              </div>

              {/* 5 KPI Metric Cards */}
              <div className="admin-kpis-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">👥</div>
                    <span className="admin-kpi-trend-pill">↑ +12.4%</span>
                  </div>
                  <span className="admin-kpi-label">Total Trainees</span>
                  <strong className="admin-kpi-value">2,486</strong>
                  <span className="admin-kpi-subtext">Active enrolled personnel</span>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">🎓</div>
                    <span className="admin-kpi-trend-pill">+8 this mo</span>
                  </div>
                  <span className="admin-kpi-label">Active Trainers</span>
                  <strong className="admin-kpi-value">148</strong>
                  <span className="admin-kpi-subtext">Verified domain faculty</span>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">📚</div>
                    <span className="admin-kpi-trend-pill">12 running</span>
                  </div>
                  <span className="admin-kpi-label">Active Courses</span>
                  <strong className="admin-kpi-value">{courses.length}</strong>
                  <span className="admin-kpi-subtext">Meteorological & GIS tracks</span>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">📋</div>
                    <span className="admin-kpi-trend-pill">24 scheduled</span>
                  </div>
                  <span className="admin-kpi-label">Assessments</span>
                  <strong className="admin-kpi-value">186</strong>
                  <span className="admin-kpi-subtext">Competency certifications</span>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">🎯</div>
                    <span className="admin-kpi-trend-pill">↑ +5.2%</span>
                  </div>
                  <span className="admin-kpi-label">Avg. Competency Score</span>
                  <strong className="admin-kpi-value">74.8%</strong>
                  <span className="admin-kpi-subtext">Institutional index</span>
                </div>
              </div>

              {/* 2-Column Grid: Platform Activity & Competency Health */}
              <div className="admin-two-col-grid">
                {/* Platform Learning Activity */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Platform Learning Activity</h2>
                      <p className="admin-panel-subtitle">Trainee engagement and study hours across cohorts</p>
                    </div>
                    <select
                      className="admin-period-select"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option>7 Days</option>
                      <option>30 Days</option>
                      <option>6 Months</option>
                      <option>1 Year</option>
                    </select>
                  </div>

                  <div className="admin-bar-chart-container">
                    <div className="admin-bars-wrapper">
                      {[
                        { label: 'W1', h: 54 },
                        { label: 'W2', h: 72 },
                        { label: 'W3', h: 63 },
                        { label: 'W4', h: 88 },
                        { label: 'W5', h: 79 },
                        { label: 'W6', h: 95 },
                        { label: 'W7', h: 68 },
                        { label: 'W8', h: 92 }
                      ].map((bar, idx) => (
                        <div className="admin-bar-col" key={idx}>
                          <div
                            className="admin-bar-fill"
                            style={{ height: `${bar.h}%` }}
                            title={`${bar.label}: ${bar.h}% activity`}
                          />
                          <span className="admin-bar-col-label">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-activity-metrics-row">
                    <div className="admin-submetric-card">
                      <strong className="admin-submetric-val">12,840</strong>
                      <span className="admin-submetric-label">Total Learning Hours</span>
                    </div>
                    <div className="admin-submetric-card">
                      <strong className="admin-submetric-val">78.4%</strong>
                      <span className="admin-submetric-label">Course Completion</span>
                    </div>
                    <div className="admin-submetric-card">
                      <strong className="admin-submetric-val">81.2%</strong>
                      <span className="admin-submetric-label">Avg. Assessment Score</span>
                    </div>
                  </div>
                </div>

                {/* Institutional Competency Health */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Institutional Competency Health</h2>
                      <p className="admin-panel-subtitle">Current average proficiency across active learners</p>
                    </div>
                    <button
                      type="button"
                      className="admin-panel-action-btn"
                      onClick={() => setActiveTab('Competencies')}
                    >
                      View Framework →
                    </button>
                  </div>

                  <div className="admin-health-stack">
                    {competencies.map((comp) => (
                      <div className="admin-health-item" key={comp.name}>
                        <div className="admin-health-meta">
                          <span className="admin-health-name">{comp.name}</span>
                          <strong className="admin-health-percent">{comp.score}%</strong>
                        </div>
                        <div className="admin-health-track">
                          <div
                            className="admin-health-fill"
                            style={{
                              width: `${comp.score}%`,
                              background: comp.score >= 75
                                ? 'linear-gradient(90deg, #1B4332, #40916C)'
                                : comp.score >= 60
                                  ? 'linear-gradient(90deg, #D97706, #F59E0B)'
                                  : 'linear-gradient(90deg, #DC2626, #EF4444)'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2-Column Grid: Gaps & Top Trainers */}
              <div className="admin-two-col-grid">
                {/* Competency Gaps Requiring Attention */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Competency Gaps Requiring Attention</h2>
                      <p className="admin-panel-subtitle">Prioritize institutional learning and workshops</p>
                    </div>
                  </div>

                  <div>
                    {[
                      { name: 'Machine Learning in Weather', current: '47%', target: '75%', gap: '-28%', trainees: '126' },
                      { name: 'Satellite Remote Sensing', current: '54%', target: '75%', gap: '-21%', trainees: '94' },
                      { name: 'GIS & Spatial Analytics', current: '61%', target: '75%', gap: '-14%', trainees: '72' }
                    ].map((gap) => (
                      <div className="admin-gap-item-card" key={gap.name}>
                        <div className="admin-gap-left">
                          <div className="admin-gap-icon-circle">!</div>
                          <div className="admin-gap-text-meta">
                            <strong>{gap.name}</strong>
                            <span>Current {gap.current} • Target {gap.target} (Gap: {gap.gap})</span>
                          </div>
                        </div>
                        <div className="admin-gap-right">
                          <span className="admin-gap-affected-pill">{gap.trainees} trainees</span>
                          <button
                            type="button"
                            className="admin-panel-action-btn"
                            onClick={() => setActiveModal({ type: 'gap', data: gap })}
                          >
                            View Gap
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Trainers */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Top Performing Trainers</h2>
                      <p className="admin-panel-subtitle">Highest rated faculty across institutional courses</p>
                    </div>
                    <button
                      type="button"
                      className="admin-panel-action-btn"
                      onClick={() => setActiveTab('Trainers')}
                    >
                      View All Faculty →
                    </button>
                  </div>

                  <div>
                    {trainers.slice(0, 4).map((tr) => (
                      <div className="admin-trainer-row" key={tr.name} onClick={openTrainerProfile} title="Click to view Trainer Profile">
                        <div className="admin-trainer-left">
                          <div className="admin-trainer-avatar">
                            {tr.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                          </div>
                          <div className="admin-trainer-details">
                            <strong>{tr.name}</strong>
                            <small>{tr.expertise} • {tr.trained}</small>
                          </div>
                        </div>
                        <div className="admin-trainer-score-badge">
                          <strong>{tr.score}</strong>
                          <small>success</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2-Column Grid: Course Performance & AI Matching */}
              <div className="admin-two-col-grid">
                {/* Course Performance Table */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Course Performance</h2>
                      <p className="admin-panel-subtitle">Compare course enrollments, completion and status</p>
                    </div>
                    <button
                      type="button"
                      className="admin-panel-action-btn"
                      onClick={() => setActiveTab('Courses')}
                    >
                      All Courses →
                    </button>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-custom-table">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Enrolled</th>
                          <th>Completion</th>
                          <th>Avg Score</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.slice(0, 4).map((c) => (
                          <tr key={c.id}>
                            <td><strong>{c.name}</strong></td>
                            <td>{c.enrolled}</td>
                            <td>{c.completion}</td>
                            <td>{c.avgScore}</td>
                            <td>
                              <span className={`admin-status-pill ${c.status === 'Excellent' ? 'excellent' : c.status === 'Good' ? 'good' : 'warning'}`}>
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Intelligent Trainer Matching */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Intelligent Trainer Matching</h2>
                      <p className="admin-panel-subtitle">AI match algorithm recommendations for new cohorts</p>
                    </div>
                  </div>

                  <div className="admin-matching-preview-card">
                    <div className="admin-target-course-box">
                      <small>TARGET COURSE</small>
                      <strong>Weather Data Analysis &amp; Forecasting</strong>
                      <span>Python • Statistics • Doppler Radar Meteorology</span>
                    </div>

                    <div className="admin-matched-faculty-card" onClick={openTrainerProfile} title="Click to view Dr. Rahul Sharma profile">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="admin-trainer-avatar" style={{ width: 42, height: 42, fontSize: 14 }}>
                          RS
                        </div>
                        <div>
                          <strong style={{ fontSize: 14.5, color: '#12281B', display: 'block' }}>Dr. Rahul Sharma</strong>
                          <small style={{ color: '#4F6B58' }}>Senior Meteorology • 8+ yrs experience</small>
                        </div>
                      </div>
                      <div className="admin-match-score-pill">
                        <strong>92%</strong>
                        <small>Match Score</small>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-admin-action primary"
                      style={{ marginTop: 4, width: '100%', justifyContent: 'center' }}
                      onClick={() => setActiveModal('assignTrainer')}
                    >
                      Assign Trainer to Cohort →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB: COURSES */}
          {activeTab === 'Courses' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Courses Catalog</h2>
                  <p className="admin-panel-subtitle">Manage accredited syllabi, enrollments, and competency tracks.</p>
                </div>
                <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('createCourse')}>
                  + Add New Course
                </button>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 10 }}>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Title</th>
                      <th>Domain</th>
                      <th>Enrolled Learners</th>
                      <th>Completion</th>
                      <th>Avg. Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses
                      .filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.domain.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((c) => (
                        <tr key={c.id}>
                          <td><code>{c.id}</code></td>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.domain}</td>
                          <td>{c.enrolled} trainees</td>
                          <td>{c.completion}</td>
                          <td>{c.avgScore}</td>
                          <td>
                            <span className={`admin-status-pill ${c.status === 'Excellent' ? 'excellent' : c.status === 'Good' ? 'good' : 'warning'}`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ASSESSMENTS */}
          {activeTab === 'Assessments' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Competency Assessments &amp; Exams</h2>
                  <p className="admin-panel-subtitle">Centralized evaluation roster and credentialing checkpoints.</p>
                </div>
                <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('scheduleAssessment')}>
                  + Schedule Assessment
                </button>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 10 }}>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Assessment Title</th>
                      <th>Related Course</th>
                      <th>Candidates</th>
                      <th>Date</th>
                      <th>Avg. Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((a) => (
                      <tr key={a.id}>
                        <td><code>{a.id}</code></td>
                        <td><strong>{a.title}</strong></td>
                        <td>{a.course}</td>
                        <td>{a.candidates}</td>
                        <td>{a.date}</td>
                        <td>{a.avgScore}</td>
                        <td>
                          <span className={`admin-status-pill ${a.status === 'Completed' ? 'excellent' : 'good'}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: LEARNING CONTENT */}
          {activeTab === 'Learning Content' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Content &amp; Lab Repositories</h2>
                  <p className="admin-panel-subtitle">Syllabi, computational notebooks, HPC datasets, and training modules.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 10 }}>
                {[
                  { title: 'WRF Numerical Modeling Lab', files: '18 Notebooks', size: '2.4 GB', tag: 'High Priority' },
                  { title: 'Doppler Radar Interpretation Modules', files: '32 Lessons', size: '1.8 GB', tag: 'Active' },
                  { title: 'NetCDF Geospatial Analysis Suite', files: '14 Datasets', size: '4.1 GB', tag: 'Updated' },
                  { title: 'Satellite Meteorology Fundamentals', files: '26 Modules', size: '940 MB', tag: 'Verified' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span className="admin-status-pill good">{item.tag}</span>
                      <small style={{ color: '#688273' }}>{item.size}</small>
                    </div>
                    <strong style={{ display: 'block', fontSize: 15, color: '#12281B', marginBottom: 4 }}>{item.title}</strong>
                    <span style={{ fontSize: 12.5, color: '#526E5D' }}>{item.files} available in cloud workspace</span>
                    <button type="button" className="btn-admin-action secondary" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
                      Inspect Syllabus &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TRAINEES */}
          {activeTab === 'Trainees' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Trainees Directory</h2>
                  <p className="admin-panel-subtitle">2,486 active learners across MoES / IMD centers and universities.</p>
                </div>
                <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('addTrainee')}>
                  + Register Trainee
                </button>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 10 }}>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Department / Center</th>
                      <th>Enrollments</th>
                      <th>Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainees
                      .filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.dept.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((t) => (
                        <tr key={t.id}>
                          <td><code>{t.id}</code></td>
                          <td><strong>{t.name}</strong></td>
                          <td>{t.dept}</td>
                          <td>{t.enrolled}</td>
                          <td>{t.score}</td>
                          <td>
                            <span className={`admin-status-pill ${t.status === 'Distinction' ? 'excellent' : t.status === 'Active' ? 'good' : 'warning'}`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: TRAINERS */}
          {activeTab === 'Trainers' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Accredited Faculty &amp; Trainers</h2>
                  <p className="admin-panel-subtitle">Verified subject matter experts across meteorological disciplines.</p>
                </div>
                <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('addTrainer')}>
                  + Invite Faculty
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 10 }}>
                {trainers
                  .filter(tr => !searchQuery || tr.name.toLowerCase().includes(searchQuery.toLowerCase()) || tr.expertise.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((tr) => (
                    <div
                      key={tr.name}
                      style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB', cursor: 'pointer' }}
                      onClick={openTrainerProfile}
                      title="Click to view Trainer Profile"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div className="admin-trainer-avatar" style={{ width: 44, height: 44, fontSize: 14 }}>
                          {tr.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <strong style={{ fontSize: 15, color: '#12281B', display: 'block' }}>{tr.name}</strong>
                          <small style={{ color: '#567261' }}>{tr.expertise}</small>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#3A5545', margin: '8px 0 14px' }}>
                        <span>Trained: <strong>{tr.trained}</strong></span>
                        <span>Rating: <strong>{tr.rating}</strong></span>
                      </div>
                      <button type="button" className="btn-admin-action secondary" style={{ width: '100%', justifyContent: 'center' }}>
                        View Profile &rarr;
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: COMPETENCIES */}
          {activeTab === 'Competencies' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Competency Framework</h2>
                  <p className="admin-panel-subtitle">Target benchmarks, threshold analytics, and gap resolution programs.</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
                {competencies.map((comp) => (
                  <div key={comp.name} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div>
                        <strong style={{ fontSize: 15, color: '#12281B' }}>{comp.name}</strong>
                        <span className={`admin-status-pill ${comp.status === 'Strong' ? 'excellent' : comp.status === 'Developing' ? 'good' : 'warning'}`} style={{ marginLeft: 10 }}>
                          {comp.status}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong style={{ fontSize: 16, color: '#1B4332' }}>{comp.score}%</strong>
                        <small style={{ color: '#688273', marginLeft: 6 }}>Target: {comp.target}%</small>
                      </div>
                    </div>
                    <div className="admin-health-track" style={{ height: 10 }}>
                      <div
                        className="admin-health-fill"
                        style={{
                          width: `${comp.score}%`,
                          background: comp.score >= 75 ? '#1B4332' : comp.score >= 60 ? '#D97706' : '#DC2626'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#688273', marginTop: 8 }}>
                      <span>Enrolled Learners in Track: {comp.trainees}</span>
                      <span>Gap: {comp.target - comp.score > 0 ? `-${comp.target - comp.score}%` : 'Target Achieved'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TRAINER MATCHING */}
          {activeTab === 'Trainer Matching' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">AI Trainer Matching Engine</h2>
                  <p className="admin-panel-subtitle">Automated algorithm aligning syllabus requirements with accredited faculty.</p>
                </div>
              </div>

              <div className="admin-two-col-grid" style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="admin-target-course-box">
                    <small>RECOMMENDED ALLOCATION</small>
                    <strong style={{ fontSize: 16 }}>Advanced Geospatial &amp; Remote Sensing</strong>
                    <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#557060' }}>
                      Target skills: QGIS, Doppler Radar Interpretation, NetCDF Pipeline
                    </p>
                  </div>

                  <div className="admin-matched-faculty-card" onClick={openTrainerProfile}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="admin-trainer-avatar" style={{ width: 46, height: 46, fontSize: 15 }}>
                        RS
                      </div>
                      <div>
                        <strong style={{ fontSize: 15, color: '#12281B', display: 'block' }}>Dr. Rahul Sharma</strong>
                        <small style={{ color: '#4F6B58' }}>Lead Faculty • 8+ yrs experience</small>
                      </div>
                    </div>
                    <div className="admin-match-score-pill">
                      <strong style={{ fontSize: 22 }}>92%</strong>
                      <small>Match Score</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-admin-action primary"
                    style={{ justifyContent: 'center' }}
                    onClick={() => setActiveModal('assignTrainer')}
                  >
                    Confirm Faculty Assignment &rarr;
                  </button>
                </div>

                <div style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: 15, color: '#12281B' }}>Algorithm Weight Matrix</h3>
                  <ul style={{ paddingLeft: 18, fontSize: 13, color: '#456150', lineHeight: 1.8 }}>
                    <li><strong>35% Weight:</strong> Historical Trainee Assessment Outcomes</li>
                    <li><strong>30% Weight:</strong> Verified Competency Skill Taxonomy</li>
                    <li><strong>20% Weight:</strong> Publications &amp; Operational Experience</li>
                    <li><strong>15% Weight:</strong> Trainee Qualitative Feedback Score</li>
                  </ul>
                  <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: '#EAF4EE', color: '#1B4332', fontSize: 12.5, fontWeight: 600 }}>
                    Algorithm status: Operational • 148 faculty members indexed.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Capacity &amp; Learning Analytics</h2>
                  <p className="admin-panel-subtitle">Comprehensive metrics on completion, competency gain, and training ROI.</p>
                </div>
              </div>

              <div className="admin-kpis-grid" style={{ marginBottom: 20 }}>
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Total Learning Hours</span>
                  <strong className="admin-kpi-value">12,840</strong>
                  <span className="admin-kpi-subtext">+18% vs last quarter</span>
                </div>
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Completion Rate</span>
                  <strong className="admin-kpi-value">78.4%</strong>
                  <span className="admin-kpi-subtext">Above national benchmark</span>
                </div>
                <div className="admin-kpi-card">
                  <span className="admin-kpi-label">Certified Trainees</span>
                  <strong className="admin-kpi-value">1,894</strong>
                  <span className="admin-kpi-subtext">WMO / MoES accredited</span>
                </div>
              </div>

              <div style={{ padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#F8FAF8' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: 16, color: '#12281B' }}>Quarterly Training Progress Summary</h3>
                <p style={{ margin: '0 0 16px', fontSize: 13.5, color: '#4F6B58' }}>
                  The institutional training network achieved a 5.2% net growth in meteorology and HPC competency indices for Q3 2026.
                </p>
                <button
                  type="button"
                  className="btn-admin-action primary"
                  onClick={() => {
                    setActionSuccessMsg('Exporting Quarterly Institutional Capacity Report (PDF)...')
                    setTimeout(() => setActionSuccessMsg(''), 4000)
                  }}
                >
                  Download Executive Report (PDF) &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB: ANNOUNCEMENTS */}
          {activeTab === 'Announcements' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Broadcasts &amp; Notices</h2>
                  <p className="admin-panel-subtitle">Send notifications to trainers, trainees, and administrative departments.</p>
                </div>
                <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('createNotice')}>
                  + Create Broadcast
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                {[
                  { title: 'Q3 Capacity Building Schedule Released', desc: 'Published to all 148 verified trainers and 2,486 trainees across MoES/IMD centers.', time: 'Yesterday', sender: 'Directorate' },
                  { title: 'HPC Weather Modeling Cluster Upgrade Complete', desc: 'Trainees now have access to high-resolution WRF computational nodes and NetCDF parallel pipelines.', time: '3 days ago', sender: 'HPC Admin' },
                  { title: 'Annual Competency Audit Guidelines Updated', desc: 'All faculty and trainees must review the revised threshold criteria prior to final certifications.', time: '1 week ago', sender: 'Compliance Team' }
                ].map((notice, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <strong style={{ fontSize: 15, color: '#12281B' }}>{notice.title}</strong>
                      <small style={{ color: '#688273' }}>{notice.time}</small>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: 13, color: '#4F6B58', lineHeight: 1.5 }}>{notice.desc}</p>
                    <span className="admin-status-pill good">Broadcast by {notice.sender}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FEEDBACK */}
          {activeTab === 'Feedback' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Trainee &amp; Faculty Feedback</h2>
                  <p className="admin-panel-subtitle">Post-course evaluations, learning outcomes, and trainer satisfaction.</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                {[
                  { user: 'Pooja Sharma', role: 'Trainee • Remote Sensing Lab', rating: '5/5', text: 'Dr. Neha Verma’s practical radar interpretation module was exceptionally clear and helpful for field analysis.', course: 'Satellite Remote Sensing' },
                  { user: 'Aditya Jaiswal', role: 'Trainee • Meteorology Division', rating: '4.8/5', text: 'Great hands-on exercises in the Python for Earth Sciences course. The lab assignments simulated real forecasting.', course: 'Python Fundamentals' },
                  { user: 'Dr. Amit Kumar', role: 'Trainer • Data Analysis', rating: '4.9/5', text: 'Platform assessment tools make it simple to track individual learner bottlenecks and provide targeted interventions.', course: 'Faculty Review' }
                ].map((fb, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong style={{ fontSize: 14.5, color: '#12281B' }}>{fb.user}</strong>
                      <span className="admin-status-pill excellent">{fb.rating}</span>
                    </div>
                    <small style={{ display: 'block', color: '#688273', marginBottom: 8 }}>{fb.role} • Course: {fb.course}</small>
                    <p style={{ margin: 0, fontSize: 13, color: '#314D3C', lineHeight: 1.5 }}>“{fb.text}”</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REPORTS */}
          {activeTab === 'Reports' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Audit Reports &amp; Compliance Logs</h2>
                  <p className="admin-panel-subtitle">Official records, accreditation audits, and institutional compliance exports.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 10 }}>
                {[
                  { name: 'MoES Annual Capacity Audit Report 2026', date: 'Sept 2026', format: 'PDF • 4.2 MB' },
                  { name: 'Faculty Accreditation & Roster Verification', date: 'Aug 2026', format: 'Excel • 1.1 MB' },
                  { name: 'Institutional Competency Matrix Baseline', date: 'July 2026', format: 'PDF • 3.5 MB' },
                  { name: 'National Training Center Pass Rates', date: 'June 2026', format: 'Excel • 840 KB' }
                ].map((rep, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB' }}>
                    <strong style={{ display: 'block', fontSize: 14.5, color: '#12281B', marginBottom: 6 }}>{rep.name}</strong>
                    <div style={{ fontSize: 12, color: '#688273', marginBottom: 14 }}>Generated: {rep.date} • {rep.format}</div>
                    <button
                      type="button"
                      className="btn-admin-action secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => {
                        setActionSuccessMsg(`Downloading ${rep.name}...`)
                        setTimeout(() => setActionSuccessMsg(''), 3000)
                      }}
                    >
                      Download Report &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Governance &amp; Security Settings</h2>
                  <p className="admin-panel-subtitle">Access control, identity providers, and MoES integration endpoints.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 10 }}>
                <div style={{ padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#FFFFFF' }}>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16, color: '#12281B' }}>Institutional Identity</h3>
                  <div className="admin-form-group" style={{ marginBottom: 12 }}>
                    <label>Institution Legal Entity</label>
                    <input type="text" readOnly defaultValue="India Meteorological Department (MoES, Govt. of India)" />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 12 }}>
                    <label>SSO / SAML Identity Provider</label>
                    <input type="text" readOnly defaultValue="National Informatics Centre (NIC) SSO Enabled" />
                  </div>
                  <div className="admin-form-group">
                    <label>Administrative Contact</label>
                    <input type="email" readOnly defaultValue="admin.directorate@imd.gov.in" />
                  </div>
                </div>

                <div style={{ padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#FFFFFF' }}>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16, color: '#12281B' }}>Platform Infrastructure Status</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: '#ECFDF5', color: '#047857', fontWeight: 600, fontSize: 13 }}>
                      <span>● High Performance Cluster</span>
                      <span>Operational</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: '#ECFDF5', color: '#047857', fontWeight: 600, fontSize: 13 }}>
                      <span>● AI Match Recommendation Engine</span>
                      <span>Active</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: '#ECFDF5', color: '#047857', fontWeight: 600, fontSize: 13 }}>
                      <span>● Competency Audit Service</span>
                      <span>Synchronized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==========================================================================
          MODALS
          ========================================================================== */}
      {/* Modal: Add Trainee */}
      {activeModal === 'addTrainee' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Register New Trainee</h2>
            <p className="admin-modal-subtitle">Add personnel to the institutional capacity building roster.</p>
            <form onSubmit={handleAddTrainee} className="admin-modal-form">
              <div className="admin-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  required
                  value={newTraineeForm.name}
                  onChange={(e) => setNewTraineeForm({ ...newTraineeForm, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Department / Center</label>
                <select
                  value={newTraineeForm.dept}
                  onChange={(e) => setNewTraineeForm({ ...newTraineeForm, dept: e.target.value })}
                >
                  <option>Meteorology Division</option>
                  <option>Climatology Unit</option>
                  <option>Remote Sensing Lab</option>
                  <option>Hydrology Division</option>
                  <option>Numerical Modeling Unit</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Institutional Email</label>
                <input
                  type="email"
                  placeholder="ramesh@imd.gov.in"
                  value={newTraineeForm.email}
                  onChange={(e) => setNewTraineeForm({ ...newTraineeForm, email: e.target.value })}
                />
              </div>
              <div className="admin-modal-actions-row">
                <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="btn-admin-action primary">Confirm Registration</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Trainer */}
      {activeModal === 'addTrainer' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Accredit New Faculty</h2>
            <p className="admin-modal-subtitle">Invite verified instructor or domain specialist to training portal.</p>
            <form onSubmit={handleAddTrainer} className="admin-modal-form">
              <div className="admin-form-group">
                <label>Faculty Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Sunita Rao"
                  required
                  value={newTrainerForm.name}
                  onChange={(e) => setNewTrainerForm({ ...newTrainerForm, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Domain Specialization</label>
                <select
                  value={newTrainerForm.expertise}
                  onChange={(e) => setNewTrainerForm({ ...newTrainerForm, expertise: e.target.value })}
                >
                  <option>Meteorology</option>
                  <option>Remote Sensing &amp; GIS</option>
                  <option>Atmospheric Physics &amp; NWP</option>
                  <option>Climate Modeling &amp; AI</option>
                  <option>Hydrometeorology</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Institutional Email</label>
                <input
                  type="email"
                  placeholder="sunita.rao@moes.gov.in"
                  value={newTrainerForm.email}
                  onChange={(e) => setNewTrainerForm({ ...newTrainerForm, email: e.target.value })}
                />
              </div>
              <div className="admin-modal-actions-row">
                <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="btn-admin-action primary">Send Accreditation Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Course */}
      {activeModal === 'createCourse' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Create Institutional Course</h2>
            <p className="admin-modal-subtitle">Define syllabus and competency parameters for new cohort.</p>
            <form onSubmit={handleAddCourse} className="admin-modal-form">
              <div className="admin-form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced NWP Ensemble Forecasting"
                  required
                  value={newCourseForm.name}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Domain</label>
                <select
                  value={newCourseForm.domain}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, domain: e.target.value })}
                >
                  <option>Meteorology</option>
                  <option>Remote Sensing</option>
                  <option>Programming</option>
                  <option>Geospatial</option>
                  <option>Modeling</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label>Planned Trainee Capacity</label>
                <input
                  type="number"
                  placeholder="120"
                  value={newCourseForm.enrolled}
                  onChange={(e) => setNewCourseForm({ ...newCourseForm, enrolled: e.target.value })}
                />
              </div>
              <div className="admin-modal-actions-row">
                <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button type="submit" className="btn-admin-action primary">Publish Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Assign Trainer */}
      {activeModal === 'assignTrainer' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Confirm Trainer Allocation</h2>
            <p className="admin-modal-subtitle">Assign Dr. Rahul Sharma to Weather Data Analysis &amp; Forecasting cohort.</p>
            <div style={{ padding: 14, borderRadius: 12, background: '#F4F8F5', border: '1px solid #D5E4D8', marginBottom: 16 }}>
              <strong>AI Match Score: 92%</strong>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#4F6B58' }}>
                Course matches 8+ years domain experience and highest student satisfaction metrics.
              </p>
            </div>
            <div className="admin-modal-actions-row">
              <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
              <button
                type="button"
                className="btn-admin-action primary"
                onClick={() => {
                  setActiveModal(null)
                  setActionSuccessMsg('Dr. Rahul Sharma successfully assigned to cohort!')
                  setTimeout(() => setActionSuccessMsg(''), 4000)
                }}
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Gap */}
      {activeModal?.type === 'gap' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">{activeModal.data.name}</h2>
            <p className="admin-modal-subtitle">Institutional competency gap analysis &amp; action proposal.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <small style={{ color: '#688273' }}>Current</small>
                <strong style={{ display: 'block', fontSize: 16, color: '#12281B' }}>{activeModal.data.current}</strong>
              </div>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <small style={{ color: '#688273' }}>Target</small>
                <strong style={{ display: 'block', fontSize: 16, color: '#1B4332' }}>{activeModal.data.target}</strong>
              </div>
              <div style={{ background: '#FEF2F2', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <small style={{ color: '#991B1B' }}>Gap</small>
                <strong style={{ display: 'block', fontSize: 16, color: '#DC2626' }}>{activeModal.data.gap}</strong>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#456150', lineHeight: 1.5, marginBottom: 16 }}>
              {activeModal.data.trainees} trainees are currently performing below the benchmark 75% accuracy threshold. Recommending a 2-week supplementary intensive workshop.
            </p>
            <div className="admin-modal-actions-row">
              <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Close</button>
              <button
                type="button"
                className="btn-admin-action primary"
                onClick={() => {
                  setActiveModal(null)
                  setActionSuccessMsg(`Supplemental capacity workshop scheduled for ${activeModal.data.name}!`)
                  setTimeout(() => setActionSuccessMsg(''), 4000)
                }}
              >
                Schedule Workshop &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Schedule Assessment */}
      {activeModal === 'scheduleAssessment' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Schedule Assessment Exam</h2>
            <p className="admin-modal-subtitle">Set date and target cohort for competency certification test.</p>
            <div className="admin-modal-form">
              <div className="admin-form-group">
                <label>Assessment Title</label>
                <input type="text" placeholder="e.g. Doppler Radar Certification Evaluation" />
              </div>
              <div className="admin-form-group">
                <label>Target Course</label>
                <select>
                  {courses.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="admin-modal-actions-row">
                <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button
                  type="button"
                  className="btn-admin-action primary"
                  onClick={() => {
                    setActiveModal(null)
                    setActionSuccessMsg('Assessment successfully scheduled!')
                    setTimeout(() => setActionSuccessMsg(''), 4000)
                  }}
                >
                  Confirm Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Notice */}
      {activeModal === 'createNotice' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Create Platform Broadcast</h2>
            <p className="admin-modal-subtitle">Broadcast message to all 148 faculty and 2,486 registered trainees.</p>
            <div className="admin-modal-form">
              <div className="admin-form-group">
                <label>Notice Subject</label>
                <input type="text" placeholder="e.g. HPC Maintenance Window Notification" />
              </div>
              <div className="admin-form-group">
                <label>Message Content</label>
                <textarea rows={3} placeholder="Enter broadcast message text..." />
              </div>
              <div className="admin-modal-actions-row">
                <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button
                  type="button"
                  className="btn-admin-action primary"
                  onClick={() => {
                    setActiveModal(null)
                    setActionSuccessMsg('Institutional notice broadcast successfully!')
                    setTimeout(() => setActionSuccessMsg(''), 4000)
                  }}
                >
                  Send Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
