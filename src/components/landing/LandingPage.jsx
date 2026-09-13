import React, { useState, useEffect, useRef } from 'react'
import './LandingPage.css'

// Image and icon imports
import cloverIcon from '../../assets/landing/arcticons-clover0.svg'
import notificationIcon from '../../assets/landing/basil-notification-on-outline0.svg'
import profileIcon from '../../assets/landing/vector1.svg'
import heroImg from '../../assets/landing/frame-30.png'
import bookOpenHero from '../../assets/landing/akar-icons-book-open3.svg'
import peopleHero from '../../assets/landing/bi-people0.svg'
import securityHero from '../../assets/landing/arcticons-security0.svg'

import featureUserIcon from '../../assets/landing/group0.svg'
import featureCourseIcon from '../../assets/landing/akar-icons-book-open0.svg'
import featureAssessIcon1 from '../../assets/landing/vector2.svg'
import featureAssessIcon2 from '../../assets/landing/vector3.svg'
import featureChartIcon from '../../assets/landing/ci-chart-line0.svg'
import featureTrainerIcon from '../../assets/landing/ix-user-check-filled0.svg'
import featureProgressIcon from '../../assets/landing/ci-trending-up0.svg'

import step1Icon from '../../assets/landing/basil-user-plus-solid0.svg'
import step2Icon from '../../assets/landing/akar-icons-book-open1.svg'
import step3Icon from '../../assets/landing/basil-user-plus-solid2.svg'
import step4Icon from '../../assets/landing/basil-user-plus-solid3.svg'
import step5Icon from '../../assets/landing/ci-trending-up1.svg'

import arrowRight1 from '../../assets/landing/basil-arrow-right-outline0.svg'
import arrowRight2 from '../../assets/landing/basil-arrow-right-outline1.svg'
import arrowRight3 from '../../assets/landing/basil-arrow-right-outline2.svg'
import arrowRight4 from '../../assets/landing/basil-arrow-right-outline3.svg'

import trainerImg from '../../assets/landing/frame-270.png'
import traineeImg from '../../assets/landing/frame-280.png'

import statUsersIcon from '../../assets/landing/ci-users0.svg'
import statGradCapIcon from '../../assets/landing/fa-solid-graduation-cap0.svg'
import statBookIcon from '../../assets/landing/akar-icons-book-open2.svg'
import statTrendingIcon from '../../assets/landing/ci-trending-up2.svg'
import statTargetIcon from '../../assets/landing/fluent-target-arrow-16-filled0.svg'

import herbDecor1 from '../../assets/landing/noto-v-1-herb0.svg'
import leafDecor1 from '../../assets/landing/vector6.svg'
import leafDecor2 from '../../assets/landing/vector7.svg'
import leafDecor3 from '../../assets/landing/vector8.svg'
import leafDecor4 from '../../assets/landing/vector9.svg'
import leafDecor6 from '../../assets/landing/group5.svg'

const initialAlerts = [
  {
    id: 1,
    categoryIcon: '📚',
    categoryName: 'New Courses',
    kicker: 'New Course Available',
    title: 'Advanced Geospatial & Remote Sensing',
    desc: 'A new competency-focused course is now available.',
    type: 'courses',
    time: '15m ago',
    unread: true,
    action: 'Explore Course'
  },
  {
    id: 2,
    categoryIcon: '⚠️',
    categoryName: 'Important Update',
    kicker: 'Platform Update',
    title: 'Competency assessment guidelines have been updated.',
    desc: 'Review the latest changes before your next assessment.',
    type: 'important',
    time: '2h ago',
    unread: true,
    action: 'View Update'
  },
  {
    id: 3,
    categoryIcon: '📢',
    categoryName: 'Announcement',
    kicker: 'Training Program Announcement',
    title: 'New trainer-led learning sessions are now open for registration.',
    desc: 'Join live expert sessions and expand your meteorological capabilities.',
    type: 'announcements',
    time: '1d ago',
    unread: true,
    action: 'View Announcement'
  }
]

export default function LandingPage({ onLogin, onGetStarted, onNavigateRole }) {
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [alertFilter, setAlertFilter] = useState('all')
  const [alerts, setAlerts] = useState(initialAlerts)
  const [activeNav, setActiveNav] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const alertsRef = useRef(null)

  const unreadCount = alerts.filter(a => a.unread).length

  // Close alerts dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertsRef.current && !alertsRef.current.contains(event.target)) {
        setAlertsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setAlertsOpen(false)
        setMobileMenuOpen(false)
      }
    }
    if (alertsOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [alertsOpen, mobileMenuOpen])

  const scrollToSection = (id) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, unread: false })))
  }

  const toggleAlertRead = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, unread: !a.unread } : a))
  }

  const filteredAlerts = alerts.filter(alert => {
    if (alertFilter === 'all') return true
    if (alertFilter === 'courses') return alert.type === 'courses'
    if (alertFilter === 'important') return alert.type === 'important'
    if (alertFilter === 'announcements') return alert.type === 'announcements'
    return true
  })

  return (
    <div className="landing-root">
      {/* Top Floating / Centered Redesigned Navbar */}
      <header className="landing-navbar-wrapper">
        <nav className="landing-navbar">
          {/* Left: Logo & Brand Identity */}
          <div className="landing-logo-group" onClick={() => scrollToSection('hero')}>
            <div className="landing-logo-icon-wrapper">
              <img className="landing-logo-clover" src={cloverIcon} alt="CapacityConnect Logo" />
            </div>
            <div className="landing-logo-text-group">
              <span className="landing-brand-text">CapacityConnect</span>
              <span className="landing-brand-subtag">Smart Capacity Platform</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="landing-nav-links desktop-only">
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'hero' ? 'active' : ''}`}
              onClick={() => scrollToSection('hero')}
            >
              Home
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'features' ? 'active' : ''}`}
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'how-it-works' ? 'active' : ''}`}
              onClick={() => scrollToSection('how-it-works')}
            >
              How it works
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'roles' ? 'active' : ''}`}
              onClick={() => scrollToSection('roles')}
            >
              Tracks
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'impact' ? 'active' : ''}`}
              onClick={() => scrollToSection('impact')}
            >
              Impact
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'footer' ? 'active' : ''}`}
              onClick={() => scrollToSection('footer')}
            >
              About
            </button>
          </div>

          {/* Right: Action Group (Alerts Dropdown & Sign In / Hamburger) */}
          <div className="landing-nav-actions">
            {/* Alerts Dropdown Trigger Container */}
            <div className="landing-alerts-container" ref={alertsRef}>
              <button
                type="button"
                className={`landing-nav-pill-btn alerts-trigger ${alertsOpen ? 'active' : ''}`}
                onClick={() => setAlertsOpen(prev => !prev)}
                title="Notifications & Announcements"
                aria-expanded={alertsOpen}
              >
                <div className="alerts-icon-box">
                  <img className="landing-icon-btn" src={notificationIcon} alt="Alerts" />
                  {unreadCount > 0 && <span className="alerts-pulse-badge">{unreadCount}</span>}
                </div>
                <span className="alerts-btn-label">Alerts</span>
                <span className="alerts-caret">{alertsOpen ? '▲' : '▼'}</span>
              </button>

              {/* Interactive Floating Alerts Dropdown */}
              {alertsOpen && (
                <div className="landing-alerts-dropdown">
                  <div className="alerts-dropdown-header">
                    <div className="alerts-header-title-row">
                      <div className="alerts-header-title">
                        <span className="alerts-header-icon">🔔</span>
                        <strong>Notifications & Alerts</strong>
                      </div>
                      {unreadCount > 0 ? (
                        <span className="alerts-count-chip">{unreadCount} New</span>
                      ) : (
                        <span className="alerts-count-chip all-read">All caught up</span>
                      )}
                    </div>
                    <div className="alerts-header-actions">
                      <p className="alerts-subheading">Updates on courses, deadlines & trainer masterclasses.</p>
                      {unreadCount > 0 && (
                        <button type="button" className="alerts-mark-read-btn" onClick={markAllRead}>
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Filter Tabs */}
                    <div className="alerts-filter-tabs">
                      <button
                        type="button"
                        className={`alerts-tab-btn ${alertFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setAlertFilter('all')}
                      >
                        All ({alerts.length})
                      </button>
                      <button
                        type="button"
                        className={`alerts-tab-btn ${alertFilter === 'courses' ? 'active' : ''}`}
                        onClick={() => setAlertFilter('courses')}
                      >
                        New Courses
                      </button>
                      <button
                        type="button"
                        className={`alerts-tab-btn ${alertFilter === 'important' ? 'active' : ''}`}
                        onClick={() => setAlertFilter('important')}
                      >
                        Important
                      </button>
                      <button
                        type="button"
                        className={`alerts-tab-btn ${alertFilter === 'announcements' ? 'active' : ''}`}
                        onClick={() => setAlertFilter('announcements')}
                      >
                        Announcements
                      </button>
                    </div>
                  </div>

                  {/* Alerts List */}
                  <div className="alerts-items-scroll">
                    {filteredAlerts.length === 0 ? (
                      <div className="alerts-empty-state">
                        <span>✨</span>
                        <p>No notifications in this filter.</p>
                      </div>
                    ) : (
                      filteredAlerts.map(item => (
                        <div
                          key={item.id}
                          className={`alert-card-item ${item.unread ? 'unread' : 'read'}`}
                          onClick={() => toggleAlertRead(item.id)}
                        >
                          <div className="alert-card-top">
                            <span className={`alert-badge-tag ${item.type}`}>
                              <span className="alert-cat-icon">{item.categoryIcon}</span> {item.categoryName}
                            </span>
                            <div className="alert-meta-right">
                              <span className="alert-time">{item.time}</span>
                              {item.unread && <span className="alert-unread-dot" title="Unread" />}
                            </div>
                          </div>
                          <span className="alert-item-kicker">{item.kicker}</span>
                          <h4 className="alert-item-title">{item.title}</h4>
                          <p className="alert-item-desc">{item.desc}</p>
                          <div className="alert-card-footer">
                            <button
                              type="button"
                              className="alert-action-link"
                              onClick={(e) => {
                                e.stopPropagation()
                                setAlertsOpen(false)
                                onGetStarted ? onGetStarted() : onLogin()
                              }}
                            >
                              {item.action} →
                            </button>
                            <span className="alert-read-hint">{item.unread ? 'Click to mark read' : 'Read'}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="alerts-dropdown-bottom">
                    <button
                      type="button"
                      className="alerts-view-all-btn"
                      onClick={() => {
                        setAlertsOpen(false)
                        onLogin()
                      }}
                    >
                      Open Full Notification Center ↗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="button"
              className="landing-nav-pill-btn profile-btn"
              onClick={onLogin}
              title="Sign In to CapacityConnect"
            >
              <img className="landing-icon-btn" src={profileIcon} alt="Profile" />
              <span>Sign In</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`landing-mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="landing-mobile-nav-drawer">
            <div className="mobile-nav-links-grid">
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'hero' ? 'active' : ''}`}
                onClick={() => scrollToSection('hero')}
              >
                <span>🏠</span> Home
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'features' ? 'active' : ''}`}
                onClick={() => scrollToSection('features')}
              >
                <span>✦</span> Features
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'how-it-works' ? 'active' : ''}`}
                onClick={() => scrollToSection('how-it-works')}
              >
                <span>⚡</span> How it works
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'roles' ? 'active' : ''}`}
                onClick={() => scrollToSection('roles')}
              >
                <span>👥</span> Tracks
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'impact' ? 'active' : ''}`}
                onClick={() => scrollToSection('impact')}
              >
                <span>📈</span> Impact
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'footer' ? 'active' : ''}`}
                onClick={() => scrollToSection('footer')}
              >
                <span>ℹ️</span> About
              </button>
            </div>
            <div className="mobile-nav-quick-actions">
              <button
                type="button"
                className="mobile-quick-btn register"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onGetStarted ? onGetStarted() : onLogin()
                }}
              >
                Get Started Free →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="landing-hero-section">
        <div className="landing-hero-container">
          <div className="landing-hero-content">
            <div className="landing-badge-pill">
              <span>Smart Education Platform</span>
            </div>

            <h1 className="landing-hero-title">
              Learn. Improve.<br />
              <span className="landing-hero-gradient">Match. Grow.</span>
            </h1>

            <p className="landing-hero-subtitle">
              A unified platform to learn, assess, match and grow competencies.
            </p>

            <div className="landing-hero-buttons">
              <button type="button" className="landing-btn-primary" onClick={onGetStarted}>
                Get Started
              </button>
              <button type="button" className="landing-btn-secondary" onClick={() => scrollToSection('features')}>
                Explore Platform →
              </button>
            </div>
          </div>

          <div className="landing-hero-visual-wrapper">
            <img className="landing-hero-main-img" src={heroImg} alt="Learner on CapacityConnect Platform" />
            
            {/* Floating Highlight Badges */}
            <div className="landing-float-badge float-badge-1">
              <div className="float-badge-icon">
                <img src={bookOpenHero} alt="Learning" />
              </div>
              <span className="float-badge-text">Better Learning<br />Outcomes</span>
            </div>

            <div className="landing-float-badge float-badge-2">
              <div className="float-badge-icon">
                <img src={peopleHero} alt="Communities" />
              </div>
              <span className="float-badge-text">Stronger<br />Communities</span>
            </div>

            <div className="landing-float-badge float-badge-3">
              <div className="float-badge-icon">
                <img src={securityHero} alt="Workforce" />
              </div>
              <span className="float-badge-text">Skilled<br />Workforce</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="landing-features-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">Key Features</div>
          <h2 className="landing-section-title">Everything You Need in One Place</h2>
          <p className="landing-section-subtitle">
            Powerful features to build skills, track progress and connect learners with the right opportunities.
          </p>
          <img src={herbDecor1} alt="" className="landing-decor-herb-right" aria-hidden="true" />
        </div>

        <div className="landing-features-grid">
          {/* Card 1 */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <img src={featureUserIcon} alt="User Management" />
            </div>
            <h3 className="landing-feature-card-title">User Management</h3>
            <p className="landing-feature-card-desc">
              Manage trainers, trainees and institutional roles.
            </p>
          </div>

          {/* Card 2 */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <img src={featureCourseIcon} alt="Course & Content Management" />
            </div>
            <h3 className="landing-feature-card-title">Course &amp; Content Management</h3>
            <p className="landing-feature-card-desc">
              Organize and deliver quality learning content.
            </p>
          </div>

          {/* Card 3 */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <div className="dual-icon-wrap">
                <img src={featureAssessIcon1} alt="" aria-hidden="true" />
                <img src={featureAssessIcon2} alt="Assessment" />
              </div>
            </div>
            <h3 className="landing-feature-card-title">Assessment &amp; Evaluation</h3>
            <p className="landing-feature-card-desc">
              Conduct tests and track performance metrics.
            </p>
          </div>

          {/* Card 4 */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <img src={featureChartIcon} alt="Skill Gap Analysis" />
            </div>
            <h3 className="landing-feature-card-title">Skill Gap Analysis</h3>
            <p className="landing-feature-card-desc">
              Identify gaps and plan tailored learning paths.
            </p>
          </div>

          {/* Card 5 */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <img src={featureTrainerIcon} alt="Trainer Matching" />
            </div>
            <h3 className="landing-feature-card-title">Trainer Matching</h3>
            <p className="landing-feature-card-desc">
              Connect verified trainers with target trainees.
            </p>
          </div>

          {/* Card 6 */}
          <div className="landing-feature-card">
            <div className="landing-feature-icon-box">
              <img src={featureProgressIcon} alt="Progress Tracking" />
            </div>
            <h3 className="landing-feature-card-title">Progress Tracking &amp; Gamification</h3>
            <p className="landing-feature-card-desc">
              Monitor growth and keep learners motivated.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="landing-steps-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">How It Works</div>
          <h2 className="landing-section-title">Simple Steps to a Better Tomorrow</h2>
          <p className="landing-section-subtitle">
            A simple journey from learning to growth.
          </p>
        </div>

        <div className="landing-steps-container">
          {/* Step 1 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">1</div>
            <div className="landing-step-icon-circle">
              <img src={step1Icon} alt="Sign Up" />
            </div>
            <h3 className="landing-step-title">Sign Up</h3>
            <p className="landing-step-desc">Create your account and get started.</p>
          </div>

          <img src={arrowRight1} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 2 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">2</div>
            <div className="landing-step-icon-circle">
              <img src={step2Icon} alt="Explore" />
            </div>
            <h3 className="landing-step-title">Explore</h3>
            <p className="landing-step-desc">Discover courses and learning opportunities.</p>
          </div>

          <img src={arrowRight2} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 3 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">3</div>
            <div className="landing-step-icon-circle">
              <img src={step3Icon} alt="Learn & Practice" />
            </div>
            <h3 className="landing-step-title">Learn &amp; Practice</h3>
            <p className="landing-step-desc">Build skills through learning and assessment.</p>
          </div>

          <img src={arrowRight3} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 4 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">4</div>
            <div className="landing-step-icon-circle">
              <img src={step4Icon} alt="Get Matched" />
            </div>
            <h3 className="landing-step-title">Get Matched</h3>
            <p className="landing-step-desc">Connect with the right trainer.</p>
          </div>

          <img src={arrowRight4} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 5 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">5</div>
            <div className="landing-step-icon-circle">
              <img src={step5Icon} alt="Grow" />
            </div>
            <h3 className="landing-step-title">Grow</h3>
            <p className="landing-step-desc">Track progress and achieve your goals.</p>
          </div>
        </div>
      </section>

      {/* Role Tracks Section (Trainers & Trainees) */}
      <section id="roles" className="landing-tracks-section">
        <div className="landing-tracks-grid">
          {/* Card: For Trainers */}
          <div className="landing-track-card">
            <div className="landing-track-badge">For Trainers</div>
            <h3 className="landing-track-title">Share Your Expertise.<br />Make an Impact.</h3>
            <p className="landing-track-desc">
              Create courses, conduct assessments, connect with learners and track progress — all in one place.
            </p>
            <button
              type="button"
              className="landing-track-btn"
              onClick={() => (onNavigateRole ? onNavigateRole('trainer') : onGetStarted())}
            >
              Explore as Trainer →
            </button>
            <div className="landing-track-image-box">
              <img src={trainerImg} alt="Trainer Experience" />
            </div>
          </div>

          {/* Card: For Trainees */}
          <div className="landing-track-card">
            <div className="landing-track-badge">For Trainees</div>
            <h3 className="landing-track-title">Build Your Skills.<br />Achieve Your Goals.</h3>
            <p className="landing-track-desc">
              Access quality learning, take assessments, get matched with trainers and track your progress.
            </p>
            <button
              type="button"
              className="landing-track-btn"
              onClick={() => (onNavigateRole ? onNavigateRole('trainee') : onGetStarted())}
            >
              Explore as Trainee →
            </button>
            <div className="landing-track-image-box">
              <img src={traineeImg} alt="Trainee Experience" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Benefits Section */}
      <section id="impact" className="landing-impact-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">IMPACT &amp; BENEFITS</div>
          <h2 className="landing-section-title">Creating a Skilled and Empowered Future</h2>
          <p className="landing-section-subtitle">
            Better learning. Better connections. A stronger workforce.
          </p>
        </div>

        <div className="landing-stats-grid">
          {/* Stat 1 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statUsersIcon} alt="Learners" />
            </div>
            <div className="landing-stat-number">10K+</div>
            <div className="landing-stat-label">Active Learners</div>
          </div>

          {/* Stat 2 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statGradCapIcon} alt="Trainers" />
            </div>
            <div className="landing-stat-number">500+</div>
            <div className="landing-stat-label">Trainers</div>
          </div>

          {/* Stat 3 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statBookIcon} alt="Courses" />
            </div>
            <div className="landing-stat-number">200+</div>
            <div className="landing-stat-label">Courses</div>
          </div>

          {/* Stat 4 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statTrendingIcon} alt="Success Rate" />
            </div>
            <div className="landing-stat-number">95%</div>
            <div className="landing-stat-label">Success Rate</div>
          </div>

          {/* Stat 5 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statTargetIcon} alt="Growth" />
            </div>
            <div className="landing-stat-number">100%</div>
            <div className="landing-stat-label">Growth Focused</div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="landing-cta-section">
        <div className="landing-cta-card">
          <div className="landing-cta-leaves" aria-hidden="true">
            <img src={leafDecor1} alt="" className="cta-leaf leaf-1" />
            <img src={leafDecor2} alt="" className="cta-leaf leaf-2" />
            <img src={leafDecor3} alt="" className="cta-leaf leaf-3" />
            <img src={leafDecor4} alt="" className="cta-leaf leaf-4" />
            <img src={leafDecor6} alt="" className="cta-leaf leaf-5" />
          </div>

          <h2 className="landing-cta-title">Ready to Build a Stronger Tomorrow?</h2>
          <p className="landing-cta-subtitle">
            Join CapacityConnect and take the first step towards your growth.
          </p>
          <button type="button" className="landing-cta-btn" onClick={onGetStarted}>
            Get Started →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="landing-footer-section">
        <div className="landing-footer-grid">
          {/* Brand Info */}
          <div className="landing-footer-brand">
            <div className="landing-footer-logo-row">
              <img src={cloverIcon} alt="CapacityConnect" className="landing-footer-clover" />
              <span className="landing-footer-brand-name">CapacityConnect</span>
            </div>
            <p className="landing-footer-desc">
              CapacityConnect is a unified digital platform for learning, skill development, assessments, trainer matching and progress tracking.
            </p>
          </div>

          {/* Modules Column */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-col-title">PLATFORM MODULES</h4>
            <ul className="landing-footer-links">
              <li><button type="button" onClick={() => scrollToSection('features')}>User Management</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Course &amp; Content</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Assessment &amp; Evaluation</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Skill Gap Analysis</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Trainer Matching</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Progress Tracking</button></li>
            </ul>
          </div>

          {/* Portals Column */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-col-title">QUICK PORTALS</h4>
            <ul className="landing-footer-links">
              <li><button type="button" onClick={() => onNavigateRole ? onNavigateRole('trainee') : onLogin()}>Trainee Portal</button></li>
              <li><button type="button" onClick={() => onNavigateRole ? onNavigateRole('trainer') : onLogin()}>Trainer Portal</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Courses Catalog</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Assessments Suite</button></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-col-title">RESOURCES</h4>
            <ul className="landing-footer-links">
              <li><button type="button" onClick={() => scrollToSection('hero')}>About Us</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>Contact Us</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>Help &amp; Support</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>Privacy Policy</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>Terms &amp; Conditions</button></li>
            </ul>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <p>© {new Date().getFullYear()} CapacityConnect. All rights reserved. Building capable people for a better tomorrow.</p>
        </div>
      </footer>
    </div>
  )
}
