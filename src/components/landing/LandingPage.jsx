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

import step2Icon from '../../assets/landing/akar-icons-book-open1.svg'
import step3Icon from '../../assets/landing/basil-user-plus-solid2.svg'
import step4Icon from '../../assets/landing/basil-user-plus-solid3.svg'
import step5Icon from '../../assets/landing/ci-trending-up1.svg'

import arrowRight1 from '../../assets/landing/basil-arrow-right-outline0.svg'
import arrowRight2 from '../../assets/landing/basil-arrow-right-outline1.svg'
import arrowRight3 from '../../assets/landing/basil-arrow-right-outline2.svg'

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

// 5 Official Regional Meteorological Training Nodes
const REGIONAL_CENTERS = [
  {
    id: 'node-pune',
    name: 'IMD Pune Training Node',
    city: 'Pune, Maharashtra',
    lead: 'Dr. S. K. Roy',
    designation: 'Director of Training',
    trainees: 642,
    passRate: 94,
    uptime: '99.98%',
    activeCohorts: 8,
    primaryFocus: 'Doppler Radar & Climatological Observation',
    modules: ['Radar Meteorology', 'Synoptic Weather Maps', 'Severe Storm Tracking']
  },
  {
    id: 'node-delhi',
    name: 'IMD New Delhi Directorate HQ',
    city: 'Mausam Bhawan, New Delhi',
    lead: 'Dr. M. Mohapatra',
    designation: 'Director General of Meteorology',
    trainees: 720,
    passRate: 91,
    uptime: '100%',
    activeCohorts: 10,
    primaryFocus: 'National Forecasting Operations & Cyclone Warning',
    modules: ['Tropical Cyclones', 'Aviation Meteorology', 'Public Weather Delivery']
  },
  {
    id: 'node-iitm',
    name: 'IITM Pune Atmospheric Wing',
    city: 'Pashan, Pune',
    lead: 'Dr. R. Krishnan',
    designation: 'Director & Climate Scientist',
    trainees: 480,
    passRate: 88,
    uptime: '99.94%',
    activeCohorts: 6,
    primaryFocus: 'Atmospheric Dynamics & Climate Change Modeling',
    modules: ['Monsoon Dynamics', 'Cloud Physics', 'Aerosol Chemistry']
  },
  {
    id: 'node-ncmrwf',
    name: 'NCMRWF Noida Modeling Center',
    city: 'Sector 62, Noida, UP',
    lead: 'Dr. V. S. Prasad',
    designation: 'Head of High-Performance Computing',
    trainees: 390,
    passRate: 85,
    uptime: '99.96%',
    activeCohorts: 5,
    primaryFocus: 'Global & Regional NWP Simulation on Supercomputers',
    modules: ['Data Assimilation', 'Ensemble Prediction Systems', 'HPC Workflows']
  },
  {
    id: 'node-incois',
    name: 'INCOIS Hyderabad Ocean Node',
    city: 'Pragathi Nagar, Hyderabad',
    lead: 'Dr. T. Srinivasa Kumar',
    designation: 'Director of Ocean Services',
    trainees: 254,
    passRate: 82,
    uptime: '99.91%',
    activeCohorts: 4,
    primaryFocus: 'Marine Meteorology, Tsunami Early Warning & Ocean State',
    modules: ['Ocean Surface Waves', 'Coastal Surge Modeling', 'Marine Advisories']
  }
]

// Meteorological Competency Domains
const COMPETENCY_DOMAINS = [
  {
    id: 'nwp',
    name: 'Numerical Weather Prediction (NWP)',
    tag: 'Core Modeling',
    benchmark: '80%',
    avgScore: '84.2%',
    hours: '45 hrs',
    prereq: 'Atmospheric Thermodynamics & PDE',
    certifiedCount: 780,
    desc: 'Mathematical formulations of fluid motion, grid parameterization, and boundary condition modeling.'
  },
  {
    id: 'radar',
    name: 'Satellite & Doppler Radar Systems',
    tag: 'Observation Systems',
    benchmark: '75%',
    avgScore: '78.6%',
    hours: '38 hrs',
    prereq: 'Electromagnetic Wave Propagation',
    certifiedCount: 640,
    desc: 'Interpretation of INSAT/GPM multispectral channels, dual-polarization radar velocity, and reflectivity.'
  },
  {
    id: 'gis',
    name: 'GIS & Spatial Hydrology Mapping',
    tag: 'Spatial Analytics',
    benchmark: '75%',
    avgScore: '81.4%',
    hours: '30 hrs',
    prereq: 'Coordinate Systems & QGIS/GDAL',
    certifiedCount: 520,
    desc: 'Cartographic delineation of river basin catchments, precipitation overlays, and flood zone vulnerability.'
  },
  {
    id: 'python',
    name: 'Python & Earth Science HPC Computing',
    tag: 'Computational Science',
    benchmark: '85%',
    avgScore: '89.1%',
    hours: '50 hrs',
    prereq: 'Object-Oriented Logic & NumPy/Xarray',
    certifiedCount: 910,
    desc: 'High-throughput parsing of NetCDF4/GRIB2 multidimensional meteorological arrays and automated pipeline workflows.'
  },
  {
    id: 'ocean',
    name: 'Marine Climatology & Coastal Warning',
    tag: 'Ocean Meteorology',
    benchmark: '75%',
    avgScore: '76.8%',
    hours: '32 hrs',
    prereq: 'Hydrodynamic Equations & Tidal Gauges',
    certifiedCount: 390,
    desc: 'Storm surge estimation, sea surface temperature anomaly analysis, and high-seas weather warnings.'
  }
]

// Mini Course Preview Data
const PREVIEW_COURSES = [
  {
    id: 'c1',
    category: 'Forecasting',
    title: 'Numerical Weather Prediction (NWP) Fundamentals',
    level: 'Advanced',
    duration: '6 Weeks',
    modules: 6,
    lessons: 24,
    avgScore: '84%',
    syllabus: ['Governing Atmospheric Equations', 'Numerical Discretization & Grid Schemes', 'Data Assimilation Methods (3D/4D-Var)', 'Model Parameterizations & Verification']
  },
  {
    id: 'c2',
    category: 'Observation',
    title: 'Satellite Climatology & Doppler Radar Meteorology',
    level: 'Intermediate',
    duration: '5 Weeks',
    modules: 5,
    lessons: 18,
    avgScore: '79%',
    syllabus: ['Geostationary vs Polar Satellite Orbits', 'Spectral Radiance & Water Vapor Channels', 'Radar Reflectivity (dBZ) & Velocity Signatures', 'Severe Mesoscale Convective Identification']
  },
  {
    id: 'c3',
    category: 'Computing',
    title: 'Python Fundamentals for Earth Science & NetCDF',
    level: 'Foundational',
    duration: '4 Weeks',
    modules: 4,
    lessons: 16,
    avgScore: '88%',
    syllabus: ['NumPy & Pandas for Time-Series Met Data', 'Handling NetCDF4 and GRIB2 Data with Xarray', 'Cartopy & Matplotlib Geospatial Visualization', 'Automated Daily Forecast Report Generation']
  },
  {
    id: 'c4',
    category: 'Geospatial',
    title: 'GIS & Spatial Mapping for Hydrological Disaster Warning',
    level: 'Intermediate',
    duration: '4 Weeks',
    modules: 4,
    lessons: 14,
    avgScore: '81%',
    syllabus: ['Digital Elevation Models (DEM) & Watershed Analysis', 'Spatial Interpolation (Kriging & IDW) of Rainfall', 'Inundation Layering & Vulnerability Indexing', 'Publishing Live Web Map Service (WMS) Layers']
  }
]

// FAQ Items
const FAQS = [
  {
    q: 'How are meteorological training candidates enrolled across regional center nodes?',
    a: 'Candidates are nominated through the central MoES Directorate or registered via IMD Regional Headquarters. Once verified by an administrative supervisor, trainees are assigned to their designated regional center node (Pune, New Delhi, IITM, NCMRWF, or INCOIS).'
  },
  {
    q: 'What criteria are required to earn MoES Certificate Accreditation?',
    a: 'Officers must maintain at least 80% attendance in live lectures and laboratory practicals, achieve 75% or higher on module evaluations, and pass the final practical assessment under accredited faculty evaluation.'
  },
  {
    q: 'Are courses and simulation labs accessible from field stations?',
    a: 'Yes. The CapacityConnect platform is cloud-synchronized with central IMD supercomputing nodes, allowing officers in coastal or remote observatories to access syllabus modules, flashcard drills, and quizzes on any desktop or tablet.'
  },
  {
    q: 'How does the faculty mentor allocation system work?',
    a: 'Our deterministic mentor allocation algorithm pairs trainees with senior faculty based on technical domain expertise (e.g. NWP Modeling, Radar, GIS), regional node proximity, and current faculty mentorship capacity.'
  },
  {
    q: 'What happens if a trainee scores below the 75% competency benchmark?',
    a: 'The system flags specific competency sub-domains (e.g. Thermodynamic Soundings or Python NetCDF extraction) and automatically recommends a 2-week remedial review track before re-examination.'
  }
]

// Institutional Testimonials
const TESTIMONIALS = [
  {
    quote: 'The unified Doppler Radar and synoptic forecasting curriculum reduced our seasonal cyclone onboarding ramp-up by over 50% across the Western coast.',
    author: 'Dr. S. K. Roy',
    role: 'Director of Meteorological Training',
    center: 'IMD Pune Training Node'
  },
  {
    quote: 'Standardized assessment rubrics and practical Python labs ensure consistent competency benchmarks across all national earth science centers.',
    author: 'Dr. Priya Nair',
    role: 'Senior Faculty & Lead NWP Specialist',
    center: 'IITM Pune Atmospheric Wing'
  },
  {
    quote: 'Instant milestone tracking and radar competency drills helped me prepare for operational high-seas weather advisory duty with complete confidence.',
    author: 'Pooja Sharma',
    role: 'Meteorological Officer (Distinction)',
    center: 'IMD New Delhi Directorate HQ'
  }
]

export default function LandingPage({ onLogin, onGetStarted, onNavigateRole }) {
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [alertFilter, setAlertFilter] = useState('all')
  const [alerts, setAlerts] = useState(initialAlerts)
  const [activeNav, setActiveNav] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState(REGIONAL_CENTERS[0])
  const [selectedDomain, setSelectedDomain] = useState(COMPETENCY_DOMAINS[0])
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('All')
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)
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

  const filteredCourses = PREVIEW_COURSES.filter(c => {
    if (courseCategoryFilter === 'All') return true
    return c.category === courseCategoryFilter
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
              <span className="landing-brand-subtag">MoES / IMD Capacity Platform</span>
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
              className={`landing-nav-link ${activeNav === 'network' ? 'active' : ''}`}
              onClick={() => scrollToSection('network')}
            >
              Centers
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'competencies' ? 'active' : ''}`}
              onClick={() => scrollToSection('competencies')}
            >
              Competencies
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'courses' ? 'active' : ''}`}
              onClick={() => scrollToSection('courses')}
            >
              Courses
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
              className={`landing-nav-link ${activeNav === 'impact' ? 'active' : ''}`}
              onClick={() => scrollToSection('impact')}
            >
              Impact
            </button>
            <button
              type="button"
              className={`landing-nav-link ${activeNav === 'faq' ? 'active' : ''}`}
              onClick={() => scrollToSection('faq')}
            >
              FAQ
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
                        <strong>Notifications &amp; Alerts</strong>
                      </div>
                      {unreadCount > 0 ? (
                        <span className="alerts-count-chip">{unreadCount} New</span>
                      ) : (
                        <span className="alerts-count-chip all-read">All caught up</span>
                      )}
                    </div>
                    <div className="alerts-header-actions">
                      <p className="alerts-subheading">Updates on courses, deadlines &amp; trainer masterclasses.</p>
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
                                if (onGetStarted) { onGetStarted() } else { onLogin() }
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
                className={`mobile-nav-link-btn ${activeNav === 'network' ? 'active' : ''}`}
                onClick={() => scrollToSection('network')}
              >
                <span>🏢</span> Centers
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'competencies' ? 'active' : ''}`}
                onClick={() => scrollToSection('competencies')}
              >
                <span>🎯</span> Competencies
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'courses' ? 'active' : ''}`}
                onClick={() => scrollToSection('courses')}
              >
                <span>📖</span> Courses
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
                className={`mobile-nav-link-btn ${activeNav === 'impact' ? 'active' : ''}`}
                onClick={() => scrollToSection('impact')}
              >
                <span>📈</span> Impact
              </button>
              <button
                type="button"
                className={`mobile-nav-link-btn ${activeNav === 'faq' ? 'active' : ''}`}
                onClick={() => scrollToSection('faq')}
              >
                <span>❓</span> FAQ
              </button>
            </div>
            <div className="mobile-nav-quick-actions">
              <button
                type="button"
                className="mobile-quick-btn login-drawer-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onLogin()
                }}
              >
                Sign In 👤
              </button>
              <button
                type="button"
                className="mobile-quick-btn register"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onGetStarted) { onGetStarted() } else { onLogin() }
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
            {/* Real-time Institutional Status Pill */}
            <div className="landing-hero-telemetry-badge">
              <span className="telemetry-live-dot" />
              <span className="telemetry-text">MoES &bull; IMD National Training Network Active</span>
            </div>

            <h1 className="landing-hero-title">
              National Meteorological<br />
              <span className="landing-hero-gradient">Capacity &amp; Skill Network</span>
            </h1>

            <p className="landing-hero-subtitle">
              A unified institutional framework for meteorological officer accreditation, Doppler radar simulations, numerical weather modeling, and continuous professional competency growth.
            </p>

            <div className="landing-hero-buttons">
              <button type="button" className="landing-btn-primary" onClick={onGetStarted}>
                Access Portal Now &rarr;
              </button>
              <button type="button" className="landing-btn-secondary" onClick={() => scrollToSection('network')}>
                Explore Regional Nodes
              </button>
            </div>

            {/* Quick Hero Telemetry Bar */}
            <div className="landing-hero-quick-telemetry">
              <div className="telemetry-item">
                <strong>5</strong>
                <span>Regional Nodes</span>
              </div>
              <div className="telemetry-divider" />
              <div className="telemetry-item">
                <strong>2,486+</strong>
                <span>Certified Officers</span>
              </div>
              <div className="telemetry-divider" />
              <div className="telemetry-item">
                <strong>94.2%</strong>
                <span>Pass Rate</span>
              </div>
              <div className="telemetry-divider" />
              <div className="telemetry-item">
                <strong>140+</strong>
                <span>Accredited Faculty</span>
              </div>
            </div>
          </div>

          <div className="landing-hero-visual-wrapper">
            <img className="landing-hero-main-img" src={heroImg} alt="Learner on CapacityConnect Platform" />
            
            {/* Floating Highlight Badges */}
            <div className="landing-float-badge float-badge-1">
              <div className="float-badge-icon">
                <img src={bookOpenHero} alt="Learning" />
              </div>
              <span className="float-badge-text">Doppler Radar<br />Lab Practical</span>
            </div>

            <div className="landing-float-badge float-badge-2">
              <div className="float-badge-icon">
                <img src={peopleHero} alt="Communities" />
              </div>
              <span className="float-badge-text">5 Regional<br />Center Nodes</span>
            </div>

            <div className="landing-float-badge float-badge-3">
              <div className="float-badge-icon">
                <img src={securityHero} alt="Workforce" />
              </div>
              <span className="float-badge-text">MoES Verified<br />Accreditation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Trust & Partner Ribbon */}
      <section className="landing-trust-ribbon">
        <div className="trust-ribbon-label">INSTITUTIONAL METEOROLOGICAL PARTNERS &bull; GOVERNMENT OF INDIA</div>
        <div className="trust-ribbon-grid">
          <div className="trust-ribbon-item">
            <span className="trust-item-icon">🏛️</span>
            <div>
              <strong>MoES</strong>
              <small>Ministry of Earth Sciences</small>
            </div>
          </div>
          <div className="trust-ribbon-item">
            <span className="trust-item-icon">📡</span>
            <div>
              <strong>IMD</strong>
              <small>India Meteorological Dept</small>
            </div>
          </div>
          <div className="trust-ribbon-item">
            <span className="trust-item-icon">💻</span>
            <div>
              <strong>NCMRWF</strong>
              <small>Medium Range Weather Forecasting</small>
            </div>
          </div>
          <div className="trust-ribbon-item">
            <span className="trust-item-icon">🌦️</span>
            <div>
              <strong>IITM</strong>
              <small>Tropical Meteorology Pune</small>
            </div>
          </div>
          <div className="trust-ribbon-item">
            <span className="trust-item-icon">🌊</span>
            <div>
              <strong>INCOIS</strong>
              <small>Ocean Information Services</small>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Regional Training Nodes Section */}
      <section id="network" className="landing-network-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">REGIONAL INFRASTRUCTURE</div>
          <h2 className="landing-section-title">5 Operational Regional Training Hubs</h2>
          <p className="landing-section-subtitle">
            Click any regional node to inspect live capacity, center leadership, uptime metrics, and active training modules.
          </p>
        </div>

        <div className="landing-network-layout">
          {/* Node Selector List */}
          <div className="network-nodes-list">
            {REGIONAL_CENTERS.map((node) => (
              <button
                type="button"
                key={node.id}
                className={`network-node-btn ${selectedNode.id === node.id ? 'active' : ''}`}
                onClick={() => setSelectedNode(node)}
              >
                <div className="node-btn-left">
                  <span className="node-status-dot" />
                  <div>
                    <strong className="node-btn-name">{node.name}</strong>
                    <span className="node-btn-city">{node.city}</span>
                  </div>
                </div>
                <div className="node-btn-right">
                  <span className="node-pill">{node.activeCohorts} Cohorts</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Node Inspector Display Card */}
          <div className="network-inspector-card">
            <div className="inspector-header">
              <div>
                <span className="inspector-badge">OPERATIONAL &bull; LIVE NODE</span>
                <h3 className="inspector-title">{selectedNode.name}</h3>
                <p className="inspector-city">📍 {selectedNode.city}</p>
              </div>
              <div className="inspector-uptime">
                <strong>{selectedNode.uptime}</strong>
                <span>Uptime</span>
              </div>
            </div>

            <div className="inspector-meta-grid">
              <div className="inspector-meta-box">
                <small>Center Director / Lead</small>
                <strong>{selectedNode.lead}</strong>
                <span>{selectedNode.designation}</span>
              </div>
              <div className="inspector-meta-box">
                <small>Active Enrolled Trainees</small>
                <strong>{selectedNode.trainees}</strong>
                <span>Across {selectedNode.activeCohorts} batches</span>
              </div>
              <div className="inspector-meta-box">
                <small>Historical Pass Rate</small>
                <strong style={{ color: '#10B981' }}>{selectedNode.passRate}%</strong>
                <span>Benchmark: 75%</span>
              </div>
            </div>

            <div className="inspector-focus-box">
              <small>PRIMARY RESEARCH &amp; TRAINING DOMAIN</small>
              <p>{selectedNode.primaryFocus}</p>
            </div>

            <div className="inspector-modules-wrap">
              <small>ACTIVE SYLLABUS MODULES</small>
              <div className="inspector-modules-pills">
                {selectedNode.modules.map((m, idx) => (
                  <span key={idx} className="inspector-mod-pill">
                    ✓ {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Meteorological Competency Explorer */}
      <section id="competencies" className="landing-competencies-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">CURRICULUM BENCHMARKS</div>
          <h2 className="landing-section-title">Institutional Competency Framework</h2>
          <p className="landing-section-subtitle">
            Explore core earth science disciplines and competency standards required for operational weather duty.
          </p>
        </div>

        <div className="landing-competency-layout">
          {/* Domain Tabs */}
          <div className="competency-domain-tabs">
            {COMPETENCY_DOMAINS.map((domain) => (
              <button
                type="button"
                key={domain.id}
                className={`competency-tab-btn ${selectedDomain.id === domain.id ? 'active' : ''}`}
                onClick={() => setSelectedDomain(domain)}
              >
                <span>{domain.name}</span>
                <small>{domain.tag}</small>
              </button>
            ))}
          </div>

          {/* Active Domain Inspector */}
          <div className="competency-detail-card">
            <div className="comp-detail-top">
              <div>
                <span className="comp-tag">{selectedDomain.tag}</span>
                <h3 className="comp-title">{selectedDomain.name}</h3>
                <p className="comp-desc">{selectedDomain.desc}</p>
              </div>
              <div className="comp-score-badge">
                <span>Avg Cohort Score</span>
                <strong>{selectedDomain.avgScore}</strong>
                <small>Target: {selectedDomain.benchmark}</small>
              </div>
            </div>

            <div className="comp-specs-grid">
              <div className="comp-spec-box">
                <small>Instructional Hours</small>
                <strong>{selectedDomain.hours}</strong>
              </div>
              <div className="comp-spec-box">
                <small>Officers Certified</small>
                <strong>{selectedDomain.certifiedCount}+</strong>
              </div>
              <div className="comp-spec-box wide">
                <small>Prerequisites &amp; Foundational Knowledge</small>
                <strong>{selectedDomain.prereq}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Mini Course Catalog Preview */}
      <section id="courses" className="landing-courses-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">ACADEMIC OFFERINGS</div>
          <h2 className="landing-section-title">Explore Specialized Meteorological Courses</h2>
          <p className="landing-section-subtitle">
            Comprehensive curricula designed in partnership with IMD and IITM senior faculty.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="courses-filter-pills">
          {['All', 'Forecasting', 'Observation', 'Computing', 'Geospatial'].map((cat) => (
            <button
              type="button"
              key={cat}
              className={`cat-filter-pill ${courseCategoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCourseCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="preview-courses-grid">
          {filteredCourses.map((c) => (
            <div key={c.id} className="preview-course-card">
              <div className="course-card-top">
                <span className="course-cat-tag">{c.category}</span>
                <span className="course-level-tag">{c.level}</span>
              </div>
              <h4 className="course-card-title">{c.title}</h4>
              <div className="course-card-meta">
                <span>⏱️ {c.duration}</span>
                <span>📚 {c.modules} Modules ({c.lessons} Lessons)</span>
                <span>⭐ {c.avgScore} Avg Score</span>
              </div>

              <div className="course-syllabus-preview">
                <button
                  type="button"
                  className="syllabus-toggle-btn"
                  onClick={() => setExpandedCourse(expandedCourse === c.id ? null : c.id)}
                >
                  <span>{expandedCourse === c.id ? 'Hide Syllabus Modules' : 'View Syllabus Modules'}</span>
                  <span>{expandedCourse === c.id ? '▲' : '▼'}</span>
                </button>

                {expandedCourse === c.id && (
                  <ul className="syllabus-modules-list">
                    {c.syllabus.map((s, idx) => (
                      <li key={idx}>
                        <span className="mod-num">M{idx + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
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
          <h2 className="landing-section-title">Simple Steps to Professional Excellence</h2>
          <p className="landing-section-subtitle">
            A structured workflow from competency discovery to verified certification.
          </p>
        </div>

        <div className="landing-steps-container">
          {/* Step 1 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">1</div>
            <div className="landing-step-icon-circle">
              <img src={step2Icon} alt="Explore" />
            </div>
            <h3 className="landing-step-title">Explore</h3>
            <p className="landing-step-desc">Discover courses and competency benchmarks.</p>
          </div>

          <img src={arrowRight1} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 2 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">2</div>
            <div className="landing-step-icon-circle">
              <img src={step3Icon} alt="Learn & Practice" />
            </div>
            <h3 className="landing-step-title">Learn &amp; Practice</h3>
            <p className="landing-step-desc">Build skills through simulations and assessments.</p>
          </div>

          <img src={arrowRight2} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 3 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">3</div>
            <div className="landing-step-icon-circle">
              <img src={step4Icon} alt="Get Matched" />
            </div>
            <h3 className="landing-step-title">Get Matched</h3>
            <p className="landing-step-desc">Connect with accredited faculty and mentors.</p>
          </div>

          <img src={arrowRight3} alt="" className="landing-step-connector" aria-hidden="true" />

          {/* Step 4 */}
          <div className="landing-step-card">
            <div className="landing-step-num-badge">4</div>
            <div className="landing-step-icon-circle">
              <img src={step5Icon} alt="Grow & Certify" />
            </div>
            <h3 className="landing-step-title">Grow &amp; Certify</h3>
            <p className="landing-step-desc">Track competency progress and earn verified credentials.</p>
          </div>
        </div>
      </section>

      {/* Role Tracks Section (Trainers & Trainees) */}
      <section id="roles" className="landing-tracks-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">TWO CORE ROLES</div>
          <h2 className="landing-section-title">Built for Instructors &amp; Trainee Officers</h2>
          <p className="landing-section-subtitle">
            Dedicated functional environments engineered for institutional faculty and learning cadets.
          </p>
        </div>

        <div className="landing-tracks-grid">
          {/* Card: For Trainers */}
          <div className="landing-track-card">
            <div className="landing-track-top">
              <div className="landing-track-badge">Instructor &amp; Faculty Role</div>
              <span className="landing-role-tag">Trainer</span>
            </div>
            <h3 className="landing-track-title">Trainer &amp; Evaluator</h3>
            <p className="landing-track-desc">
              Author training modules, conduct automated assessments, monitor cohort telemetry, and deliver targeted mentorship across regional training nodes.
            </p>
            <div className="landing-track-capabilities">
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Course authoring &amp; syllabus mapping</span>
              </div>
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Automated quizzes &amp; assignment evaluation</span>
              </div>
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Real-time batch competency analytics</span>
              </div>
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Skill gap intervention &amp; mentorship</span>
              </div>
            </div>
            <div className="landing-track-image-box">
              <img src={trainerImg} alt="Trainer Portal Interface" />
            </div>
          </div>

          {/* Card: For Trainees */}
          <div className="landing-track-card">
            <div className="landing-track-top">
              <div className="landing-track-badge">Cadet &amp; Officer Role</div>
              <span className="landing-role-tag">Trainee</span>
            </div>
            <h3 className="landing-track-title">Trainee &amp; Learner</h3>
            <p className="landing-track-desc">
              Access standardized weather observation curriculum, complete diagnostic gap analyses, practice simulations, and earn verified national credentials.
            </p>
            <div className="landing-track-capabilities">
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Curated course catalog &amp; learning pathways</span>
              </div>
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Diagnostic skill gap assessments</span>
              </div>
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Automated mentor matching recommendations</span>
              </div>
              <div className="landing-track-cap-item">
                <span className="landing-cap-dot"></span>
                <span>Tamper-evident competency certificates</span>
              </div>
            </div>
            <div className="landing-track-image-box">
              <img src={traineeImg} alt="Trainee Portal Interface" />
            </div>
          </div>
        </div>
      </section>

      {/* Faculty & Officer Testimonials Spotlight */}
      <section className="landing-testimonials-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">INSTITUTIONAL VOICES</div>
          <h2 className="landing-section-title">Trusted by Meteorological Leaders</h2>
          <p className="landing-section-subtitle">
            Hear from directors and certified officers across our national network.
          </p>
        </div>

        <div className="landing-testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-quote-icon">“</div>
              <p className="testimonial-quote-text">{t.quote}</p>
              <div className="testimonial-author-meta">
                <strong>{t.author}</strong>
                <span className="test-role">{t.role}</span>
                <span className="test-center">📍 {t.center}</span>
              </div>
            </div>
          ))}
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
            <div className="landing-stat-number">2,486+</div>
            <div className="landing-stat-label">Certified Officers</div>
          </div>

          {/* Stat 2 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statGradCapIcon} alt="Trainers" />
            </div>
            <div className="landing-stat-number">140+</div>
            <div className="landing-stat-label">Accredited Faculty</div>
          </div>

          {/* Stat 3 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statBookIcon} alt="Courses" />
            </div>
            <div className="landing-stat-number">48+</div>
            <div className="landing-stat-label">Operational Modules</div>
          </div>

          {/* Stat 4 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statTrendingIcon} alt="Success Rate" />
            </div>
            <div className="landing-stat-number">94.2%</div>
            <div className="landing-stat-label">Assessment Pass Rate</div>
          </div>

          {/* Stat 5 */}
          <div className="landing-stat-card">
            <div className="landing-stat-icon-wrap">
              <img src={statTargetIcon} alt="Growth" />
            </div>
            <div className="landing-stat-number">100%</div>
            <div className="landing-stat-label">MoES Verified</div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="landing-faq-section">
        <div className="landing-section-header">
          <div className="landing-section-kicker">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="landing-section-title">Everything You Need to Know</h2>
          <p className="landing-section-subtitle">
            Answers regarding accreditation, regional node facilities, and assessment criteria.
          </p>
        </div>

        <div className="landing-faq-container">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            >
              <button type="button" className="faq-question-btn">
                <span>{faq.q}</span>
                <span className="faq-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="faq-answer-pane">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
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

          <h2 className="landing-cta-title">Ready to Enhance Meteorological Excellence?</h2>
          <p className="landing-cta-subtitle">
            Join India&apos;s unified meteorological capacity platform and accelerate your professional accreditation.
          </p>
          <button type="button" className="landing-cta-btn" onClick={onGetStarted}>
            Get Started Now →
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
              CapacityConnect is an institutional platform for earth science learning, meteorological skill development, Doppler radar simulation, faculty matching, and verified credential accreditation under MoES &amp; IMD.
            </p>
          </div>

          {/* Modules Column */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-col-title">PLATFORM MODULES</h4>
            <ul className="landing-footer-links">
              <li><button type="button" onClick={() => scrollToSection('network')}>Regional Centers Hub</button></li>
              <li><button type="button" onClick={() => scrollToSection('competencies')}>Competency Framework</button></li>
              <li><button type="button" onClick={() => scrollToSection('courses')}>Course Catalog</button></li>
              <li><button type="button" onClick={() => scrollToSection('features')}>Assessment Suite</button></li>
              <li><button type="button" onClick={() => scrollToSection('impact')}>National Impact</button></li>
            </ul>
          </div>

          {/* Portals Column */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-col-title">REGIONAL NODES</h4>
            <ul className="landing-footer-links">
              <li><button type="button" onClick={() => scrollToSection('network')}>IMD Pune Training Node</button></li>
              <li><button type="button" onClick={() => scrollToSection('network')}>IMD New Delhi Directorate HQ</button></li>
              <li><button type="button" onClick={() => scrollToSection('network')}>IITM Pune Atmospheric Wing</button></li>
              <li><button type="button" onClick={() => scrollToSection('network')}>NCMRWF Noida Modeling Center</button></li>
              <li><button type="button" onClick={() => scrollToSection('network')}>INCOIS Hyderabad Ocean Node</button></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="landing-footer-col">
            <h4 className="landing-footer-col-title">RESOURCES</h4>
            <ul className="landing-footer-links">
              <li><button type="button" onClick={() => scrollToSection('hero')}>About Platform</button></li>
              <li><button type="button" onClick={() => scrollToSection('faq')}>Accreditation FAQs</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>Help &amp; Support</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>MoES Guidelines</button></li>
              <li><button type="button" onClick={() => scrollToSection('footer')}>Terms &amp; Conditions</button></li>
            </ul>
          </div>
        </div>

        <div className="landing-footer-bottom">
          <p>© {new Date().getFullYear()} CapacityConnect &bull; Ministry of Earth Sciences (MoES) &bull; India Meteorological Department (IMD). All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
