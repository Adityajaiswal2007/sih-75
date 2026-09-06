import { useEffect, useState } from 'react'
import './App.css'
import api from './services/api'
import TrainerProfilePage from './components/trainer-profile/TrainerProfilePage'
import TraineePortal from './components/trainee/TraineePortal'
import { TrainerCoursesView } from './components/trainer-portal/TrainerCoursesView'
import { TrainerTraineesView } from './components/trainer-portal/TrainerTraineesView'
import { TrainerAssessmentsView } from './components/trainer-portal/TrainerAssessmentsView'
import { TrainerCompetenciesView } from './components/trainer-portal/TrainerCompetenciesView'
import { TrainerContentView } from './components/trainer-portal/TrainerContentView'
import { TrainerAnnouncementsView } from './components/trainer-portal/TrainerAnnouncementsView'
import { TrainerFeedbackView } from './components/trainer-portal/TrainerFeedbackView'
import { TrainerAnalyticsView } from './components/trainer-portal/TrainerAnalyticsView'
import { TrainerSupportView } from './components/trainer-portal/TrainerSupportView'
import { TrainerSettingsView } from './components/trainer-portal/TrainerSettingsView'
import { TrainerPortalModals } from './components/trainer-portal/TrainerPortalModals'
import './components/trainer-portal/TrainerPortal.css'
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
} from './components/trainer-portal/trainerPortalData'

const features = [
  ['01', 'Personalized Learning', 'Personalized learning paths and course recommendations based on your skills, role, and interests.', '◆'],
  ['02', 'Competency Mapping', 'Identify skills, diagnose competency gaps and track development with an intelligent mapping engine.', '◎'],
  ['03', 'Intelligent Trainer Matching', 'AI-driven matching to connect you with the right verified trainer for each competency requirement.', '✦'],
  ['04', 'Assessments & Progress', 'Take assessments, evaluate performance and monitor your competency improvement continuously.', '▤'],
  ['05', 'Learning Resources', 'Access curated learning materials, meteorological datasets, documents and practical resources in one place.', '▣'],
  ['06', 'Analytics & Insights', 'Data-driven insights for trainees, trainers and administrators to make informed decisions.', '▥'],
]

const roles = [
  {
    title: 'For Trainees',
    icon: '●',
    role: 'trainee',
    badge: 'Learner Track',
    items: ['Discover relevant domain courses', 'Learn with structured modules & materials', 'Take assessments & diagnostic quizzes', 'Track competency score & growth'],
    action: 'Explore as Trainee'
  },
  {
    title: 'For Trainers',
    icon: '◉',
    role: 'trainer',
    badge: 'Faculty Suite',
    items: ['Create & manage learning content', 'Design multi-tier assessments', 'Monitor cohort progress & at-risk learners', 'Showcase verified competencies'],
    action: 'Explore as Trainer'
  },
  {
    title: 'For Administrators',
    icon: '⬟',
    role: 'admin',
    badge: 'Institutional Control',
    items: ['Manage users, roles & accreditations', 'Orchestrate courses & curriculum standards', 'Monitor institutional analytics & health', 'Oversee intelligent trainer matching'],
    action: 'Explore as Admin'
  },
]

const impacts = [
  ['▰', 'Centralized Learning', 'All learning resources and curriculums in one secure institutional platform'],
  ['◎', 'Better Competency Visibility', 'Clear visibility into skills, mastery curves, and developmental gaps'],
  ['▥', 'Data-Driven Training', 'Make informed institutional decisions with real-time analytics & reports'],
  ['♟', 'Efficient Trainer Selection', 'Match the right expert trainer with specific required competencies'],
  ['⌁', 'Personalized Development', 'Empower individuals and teams with adaptive personalized learning paths'],
]

function Logo({ onClick }) {
  return (
    <a className="logo" href="#top" onClick={onClick} aria-label="CapacityConnect home">
      <span className="logo-mark">◇</span>
      <span className="logo-text">Capacity<span className="logo-accent">Connect</span></span>
    </a>
  )
}

function MiniChart() {
  return (
    <div className="preview-mini-chart" aria-label="Learning progress chart">
      <i style={{ height: '35%' }} />
      <i style={{ height: '48%' }} />
      <i style={{ height: '62%' }} />
      <i style={{ height: '55%' }} />
      <i style={{ height: '78%' }} />
      <i style={{ height: '88%' }} />
      <i style={{ height: '100%' }} />
    </div>
  )
}

function HeroDashboardPreview({ onNavigateRole }) {
  const [activeTab, setActiveTab] = useState('Dashboard')

  return (
    <div className="capacity-hero-window">
      {/* Top OS Window Bar */}
      <div className="window-top-bar">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="window-title">capacityconnect.gov.in / learning-workspace</div>
        <div className="window-status-pill">
          <span className="pulse-dot" /> Live Portal
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="preview-inner">
        {/* Top Welcome Bar */}
        <div className="preview-top-greeting">
          <div className="greeting-left">
            <span className="greeting-logo-mark">◇</span>
            <div>
              <strong>Welcome back, Rahul! 👋</strong>
              <small>Let's continue your learning journey.</small>
            </div>
          </div>
          <div className="greeting-right">
            <button className="preview-role-pill" onClick={() => onNavigateRole('trainee')}>
              Open Trainee Portal ↗
            </button>
          </div>
        </div>

        {/* Body Layout with Sidebar + Dashboard Grid */}
        <div className="preview-body-layout">
          {/* Left Mini Sidebar */}
          <aside className="preview-sidebar">
            <button className={`preview-nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>
              <span>▣</span> Dashboard
            </button>
            <button className={`preview-nav-item ${activeTab === 'My Learning' ? 'active' : ''}`} onClick={() => setActiveTab('My Learning')}>
              <span>▱</span> My Learning
            </button>
            <button className={`preview-nav-item ${activeTab === 'Courses' ? 'active' : ''}`} onClick={() => setActiveTab('Courses')}>
              <span>◫</span> Courses
            </button>
            <button className={`preview-nav-item ${activeTab === 'Assessments' ? 'active' : ''}`} onClick={() => setActiveTab('Assessments')}>
              <span>▤</span> Assessments
            </button>
            <button className={`preview-nav-item ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => setActiveTab('Profile')}>
              <span>♙</span> Profile
            </button>
            <button className={`preview-nav-item ${activeTab === 'Analytics' ? 'active' : ''}`} onClick={() => setActiveTab('Analytics')}>
              <span>⌁</span> Analytics
            </button>
            <button className={`preview-nav-item ${activeTab === 'Messages' ? 'active' : ''}`} onClick={() => setActiveTab('Messages')}>
              <span>▰</span> Messages
            </button>
            <button className={`preview-nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}>
              <span>⚙</span> Settings
            </button>
          </aside>

          {/* Right Dashboard Area */}
          <div className="preview-main-content">
            {/* Upper Two KPI Cards */}
            <div className="preview-kpi-row">
              <div className="preview-card progress-card" onClick={() => onNavigateRole('trainee')}>
                <span className="card-label">Learning Progress</span>
                <div className="progress-content-wrap">
                  <div className="progress-ring-box">
                    <strong>72%</strong>
                  </div>
                  <div className="progress-stats-text">
                    <p><b>12</b> Courses Enrolled</p>
                    <p><b>8</b> Courses Completed</p>
                    <p><b>24</b> Assessments Taken</p>
                  </div>
                </div>
              </div>

              <div className="preview-card score-card" onClick={() => onNavigateRole('trainee')}>
                <span className="card-label">Competency Score</span>
                <div className="score-content-wrap">
                  <div className="score-display">
                    <strong>85<span>/100</span></strong>
                    <em>Advanced</em>
                  </div>
                  <MiniChart />
                </div>
              </div>
            </div>

            {/* Lower Recommendations Row */}
            <div className="preview-recommendations-panel">
              <span className="card-label">Recommended for You</span>
              <div className="rec-cards-grid">
                <div className="rec-mini-card" onClick={() => onNavigateRole('trainee')}>
                  <strong>Advanced Meteorology</strong>
                  <span className="match-tag cyan">98% Match</span>
                </div>
                <div className="rec-mini-card" onClick={() => onNavigateRole('trainee')}>
                  <strong>Python for Data Analysis</strong>
                  <span className="match-tag blue">90% Match</span>
                </div>
                <div className="rec-mini-card" onClick={() => onNavigateRole('trainee')}>
                  <strong>Climate Data Visualization</strong>
                  <span className="match-tag purple">78% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [dashboardRole, setDashboardRole] = useState(null)
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
      if (window.location.hash === '#get-started') {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        setShowLogin(true)
      }
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentHash === '#admin') return <AdminDashboard onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }} />
  if (currentHash === '#trainer-profile') return <TrainerProfilePage onBack={() => { window.location.hash = ''; setCurrentHash('') }} defaultRole={dashboardRole || 'trainer'} />
  if (currentHash === '#trainee') return <TraineeDashboard onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }} />

  if (dashboardRole === 'trainer') return <TrainerDashboard onBack={() => setDashboardRole(null)} />
  if (dashboardRole === 'trainee') return <TraineeDashboard onBack={() => setDashboardRole(null)} />
  if (dashboardRole === 'admin') return <AdminDashboard onBack={() => setDashboardRole(null)} />
  if (showLogin) return <LoginPage onBack={() => { window.location.hash = ''; setShowLogin(false); setCurrentHash('') }} onDashboard={(role = 'trainee') => { setShowLogin(false); setDashboardRole(role); }} />

  return (
    <div id="top" className="capacity-app">
      {/* Top Header */}
      <header className="site-header shell">
        <Logo onClick={() => { window.location.hash = ''; setShowLogin(false); setDashboardRole(null); }} />

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <div className="nav-links">
            <a className="active" href="#top">Home</a>
            <a href="#features">Platform Ecosystem</a>
            <a href="#how">AI Matching Engine</a>
            <a href="#impact">Institutional Impact</a>
            <a href="#about">About</a>
          </div>

          <div className="nav-actions">
            <button className="button-get-started" onClick={() => setShowLogin(true)}>
              <span>Launch Platform</span> <b>→</b>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Page Body */}
      <main>
        {/* Hero Section */}
        <section className="hero-capacity shell">
          <div className="hero-copy-wrap">
            <div className="eyebrow-badge">
              <span className="pulse-dot" />
              <span>MoES | IMD · AI-Powered Capacity Architecture</span>
            </div>

            <h1 className="hero-title">
              Build Skills.<br />
              Strengthen<br />
              Competencies.<br />
              <em className="gradient-highlight">Empower People.</em>
            </h1>

            <p className="hero-subtitle">
              CapacityConnect is an intelligent, unified digital platform for meteorological capacity building, competency diagnostics, adaptive learning, and precision AI trainer matching.
            </p>

            <div className="hero-actions">
              <button className="btn-primary-action" onClick={() => setShowLogin(true)}>
                Launch Platform Now <b>→</b>
              </button>
              <button className="btn-secondary-action" onClick={() => { window.location.hash = '#trainer-profile'; }}>
                Explore Verified Faculty ↗
              </button>
            </div>

            {/* 4 Trust Feature Badges */}
            <div className="trust-row-grid">
              <div className="trust-badge">
                <span className="trust-icon">◈</span>
                <div>
                  <b>Institutional Security</b>
                  <small>Role-based RBAC & GovID</small>
                </div>
              </div>
              <div className="trust-badge">
                <span className="trust-icon">✦</span>
                <div>
                  <b>AI Matching Engine</b>
                  <small>Precision faculty pairing</small>
                </div>
              </div>
              <div className="trust-badge">
                <span className="trust-icon">◎</span>
                <div>
                  <b>Competency Mapping</b>
                  <small>IMD / MoES Framework</small>
                </div>
              </div>
              <div className="trust-badge">
                <span className="trust-icon">▥</span>
                <div>
                  <b>Real-Time Analytics</b>
                  <small>Skill growth & gap diagnostics</small>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Hero Workspace Window */}
          <HeroDashboardPreview onNavigateRole={(role) => setDashboardRole(role)} />
        </section>

        {/* Live Institutional Metrics Counter Strip */}
        <section className="metrics-strip-section shell">
          <div className="metrics-strip-grid">
            <div className="metric-strip-card">
              <div className="metric-strip-icon">♙</div>
              <div className="metric-strip-content">
                <strong>150+</strong>
                <span>Verified Master Trainers</span>
              </div>
            </div>
            <div className="metric-strip-card">
              <div className="metric-strip-icon">♟</div>
              <div className="metric-strip-content">
                <strong>2,486+</strong>
                <span>Active Cohort Trainees</span>
              </div>
            </div>
            <div className="metric-strip-card">
              <div className="metric-strip-icon">✦</div>
              <div className="metric-strip-content">
                <strong>94.8%</strong>
                <span>AI Match Precision</span>
              </div>
            </div>
            <div className="metric-strip-card">
              <div className="metric-strip-icon">◷</div>
              <div className="metric-strip-content">
                <strong>12,840+</strong>
                <span>Certified Learning Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Trust Strip */}
        <div className="institution-strip shell">
          <span className="strip-title">Government & Institutional Trust Standards</span>
          <div className="strip-badges">
            <span>◈ Ministry of Earth Sciences (MoES)</span>
            <span>♟ India Meteorological Department (IMD)</span>
            <span>▣ End-to-End Encrypted Data Architecture</span>
            <span>◉ SIH 2026 Innovation Architecture</span>
            <span className="india-badge">◒ Digital India Standard</span>
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="section shell">
          <SectionHeading title="Everything You Need for" accent="Smarter Capacity Building" />
          <p className="section-subtitle">A comprehensive modular ecosystem designed to assess, train, benchmark, and scale institutional workforce capability</p>
          <div className="feature-grid">
            {features.map(([number, title, body, icon]) => (
              <article className="feature-card" key={number}>
                <div className="feature-card-top">
                  <div className="feature-icon">{icon}</div>
                  <span className="feature-num">{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section id="how" className="section process-section">
          <div className="shell">
            <SectionHeading title="From Competency Gaps to the" accent="Right Expert Trainer" />
            <p className="section-subtitle">Our multi-dimensional AI engine evaluates syllabus requirements against verified faculty credentials to achieve optimal cohort outcomes</p>
            <div className="process">
              <Step icon="▤" title="1. Course Requirements" text="Course defines the exact skills, compute tools, and specialized meteorology domains required." />
              <Step icon="◈" title="2. Competency Mapping" text="Extract and map syllabus requirements to national competency standards & benchmarks." />
              <Step icon="✣" title="3. Verified Faculty DB" text="Search accredited trainer profiles with verified publications, research, and past cohort ratings." />
              <Step icon="◇" title="4. Multi-Factor AI Engine" text="Neural matching computes skill overlap, domain depth, delivery ratings, and availability." />
              <Step icon="♟" title="5. Precision Allocation" text="Institutional administrators receive top-ranked matches with transparent score breakdowns." />
            </div>
          </div>
        </section>

        {/* Impact Highlights */}
        <section id="impact" className="impact-section shell">
          <SectionHeading title="Driving Impact Through" accent="Data-Driven Capacity Building" />
          <p className="section-subtitle">Measurable improvements in institutional capability, operational forecast readiness, and workforce skill agility</p>
          <div className="impact-grid">
            {impacts.map(([icon, title, text]) => (
              <article className="impact-card" key={title}>
                <div className="impact-icon">{icon}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section id="get-started" className="cta shell">
          <div className="cta-left">
            <h2>Ready to Elevate Your <em>Institutional Capacity?</em></h2>
            <p>Connect learners, verified faculty, and administrators in a single AI-empowered capacity building platform.</p>
            <div className="actions">
              <button className="btn-primary-action" onClick={() => setShowLogin(true)}>
                Get Started with CapacityConnect →
              </button>
              <button className="btn-secondary-action" onClick={() => { window.location.hash = '#trainer-profile'; }}>
                View Dr. Rahul Sharma's Profile ↗
              </button>
            </div>
          </div>
          <div className="journey">
            <b>Integrated Enterprise Governance</b>
            <span>✓ Precision AI Faculty Matchmaking</span>
            <span>✓ Dynamic Skill Gap Diagnostics</span>
            <span>✓ Verified Institutional Credentials</span>
            <span>✓ High-Resolution Training Analytics</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className="footer shell">
        <div className="footer-brand-col">
          <Logo onClick={() => { }} />
          <p className="footer-tagline">CapacityConnect is an institutional digital ecosystem for capacity building, skill diagnostics, learning assessments, and intelligent faculty matching.</p>
          <span className="footer-copy">© 2026 CapacityConnect · Ministry of Earth Sciences | IMD. All rights reserved.</span>
        </div>
        <div>
          <b>Platform Modules</b>
          <a href="#features">Curriculum Engine</a>
          <a href="#features">Assessment Suite</a>
          <a href="#how">AI Matching Pipeline</a>
          <a href="#impact">Institutional Impact</a>
        </div>
        <div>
          <b>Quick Portals</b>
          <button onClick={() => setDashboardRole('trainee')}>Trainee Portal</button>
          <button onClick={() => setDashboardRole('trainer')}>Trainer Suite</button>
          <button onClick={() => setDashboardRole('admin')}>Admin Console</button>
          <button onClick={() => { window.location.hash = '#trainer-profile'; }}>Verified Trainer Profile</button>
        </div>
        <div>
          <b>Governance & Resources</b>
          <a href="#about">MoES / IMD Standards</a>
          <a href="#about">Curriculum Taxonomy</a>
          <a href="#about">Security Protocols</a>
          <a href="#about">Digital India Compliance</a>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({ title, accent }) {
  return (
    <div className="section-heading-wrap">
      <h2 className="section-heading">{title} <em>{accent}</em></h2>
    </div>
  )
}

function Step({ icon, title, text }) {
  return (
    <div className="step">
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

function EyeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function LoginPage({ onBack, onDashboard }) {
  const [selectedRoleTab, setSelectedRoleTab] = useState('trainee')
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSignup, setShowSignup] = useState(false)

  // Demo accounts helper
  const demoAccounts = {
    trainee: {
      email: 'ananya.verma@imd.gov.in',
      password: 'DemoPassword123!',
      name: 'Ananya Verma',
      title: 'Trainee Fellow · NWP Track',
    },
    trainer: {
      email: 'dr.priya.nair@imd.gov.in',
      password: 'DemoPassword123!',
      name: 'Dr. Priya Nair',
      title: 'Senior Faculty · Radar Meteorology',
    },
    admin: {
      email: 'admin.directorate@imd.gov.in',
      password: 'DemoPassword123!',
      name: 'Executive Directorate',
      title: 'Central Institutional Administrator',
    }
  }

  const handleRoleTabSelect = (roleKey) => {
    setSelectedRoleTab(roleKey)
    setEmail(demoAccounts[roleKey].email)
    setPassword(demoAccounts[roleKey].password)
    setErrorMessage('')
  }

  const handleQuickDemoLaunch = async (roleKey) => {
    setSelectedRoleTab(roleKey)
    setEmail(demoAccounts[roleKey].email)
    setPassword(demoAccounts[roleKey].password)
    setLoading(true)
    setErrorMessage('')

    try {
      const res = await api.login({ email: demoAccounts[roleKey].email, password: demoAccounts[roleKey].password, role: roleKey })
      const resolvedRole = roleKey || res?.user?.role || 'trainee'
      setLoading(false)
      onDashboard(resolvedRole)
    } catch {
      setLoading(false)
      onDashboard(roleKey)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.')
      return
    }
    setErrorMessage('')
    setLoading(true)

    try {
      const res = await api.login({ email, password, role: selectedRoleTab })
      const resolvedRole = selectedRoleTab || res?.user?.role || 'trainee'
      setLoading(false)
      setSubmitted(true)
      onDashboard(resolvedRole)
    } catch {
      setLoading(false)
      onDashboard(selectedRoleTab || 'trainee')
    }
  }

  if (showSignup) return <SignupPage onBack={() => setShowSignup(false)} onLogin={() => setShowSignup(false)} onDashboard={onDashboard} />
  if (showForgot) return <ForgotPasswordPage onBack={() => setShowForgot(false)} />

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* Top Header Navigation */}
        <div className="auth-header-bar">
          <button className="back-home-pill" onClick={onBack}>
            <span className="back-arrow">←</span> Back to Home
          </button>
          <div className="auth-security-pill">
            <span className="secure-lock-icon">🔒</span>
            <span>256-Bit SSL Encrypted · MoES Sovereign Cloud</span>
          </div>
        </div>

        <div className="login-layout">
          {/* Left Column: High-Impact Institutional Showcase */}
          <div className="login-intro-showcase">
            <div className="auth-brand-row">
              <Logo onClick={onBack} />
              <span className="gov-seal-pill">🏛️ MoES | IMD Portal</span>
            </div>

            <h1 className="login-showcase-title">
              National Meteorological<br />
              <span className="gradient-highlight">Capacity & AI Matching</span><br />
              Command Center
            </h1>

            <p className="login-showcase-desc">
              Log in to access your customized meteorological learning pathways, real-time competency matrix, and AI-powered faculty matching workspace.
            </p>

            {/* Feature Cards Grid */}
            <div className="login-feature-strip">
              <div className="login-feature-pill">
                <div className="feature-pill-icon cyan">⚡</div>
                <div>
                  <strong>Precision AI Faculty Matching</strong>
                  <small>Multi-factor neural algorithm with 94.8% accuracy</small>
                </div>
              </div>

              <div className="login-feature-pill">
                <div className="feature-pill-icon blue">📊</div>
                <div>
                  <strong>Dynamic Skill Gap Diagnostics</strong>
                  <small>Real-time competency radar & personalized modules</small>
                </div>
              </div>

              <div className="login-feature-pill">
                <div className="feature-pill-icon purple">📜</div>
                <div>
                  <strong>Sovereign Credentials & Governance</strong>
                  <small>MoES accredited certifications with audit logging</small>
                </div>
              </div>
            </div>

            {/* Bottom Live Metrics Tag */}
            <div className="login-trust-footer">
              <div className="trust-metric-item">
                <strong>2,486+</strong>
                <small>Certified Learners</small>
              </div>
              <div className="trust-divider" />
              <div className="trust-metric-item">
                <strong>150+</strong>
                <small>Master Faculty</small>
              </div>
              <div className="trust-divider" />
              <div className="trust-metric-item">
                <strong>99.98%</strong>
                <small>System Uptime</small>
              </div>
            </div>
          </div>

          {/* Right Column: Ultra-Sleek Glassmorphism Login Card */}
          <div className="login-card-container">
            <form className="login-card" onSubmit={handleSubmit}>
              <div className="login-card-heading">
                <div className="login-card-header-icon">
                  <span>◇</span>
                </div>
                <div>
                  <h2>Workspace Sign In</h2>
                  <p>Choose your role or enter your credentials</p>
                </div>
              </div>

              {/* Role Switcher Tabs */}
              <div className="auth-role-tabs" role="tablist">
                <button
                  type="button"
                  className={`auth-role-tab ${selectedRoleTab === 'trainee' ? 'active' : ''}`}
                  onClick={() => handleRoleTabSelect('trainee')}
                >
                  <span className="role-tab-icon">🎓</span>
                  <span className="role-tab-text">Trainee</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab ${selectedRoleTab === 'trainer' ? 'active' : ''}`}
                  onClick={() => handleRoleTabSelect('trainer')}
                >
                  <span className="role-tab-icon">👨‍🏫</span>
                  <span className="role-tab-text">Trainer</span>
                </button>
                <button
                  type="button"
                  className={`auth-role-tab ${selectedRoleTab === 'admin' ? 'active' : ''}`}
                  onClick={() => handleRoleTabSelect('admin')}
                >
                  <span className="role-tab-icon">🛡️</span>
                  <span className="role-tab-text">Admin</span>
                </button>
              </div>

              {/* 1-Click Fast Demo Launcher */}
              <div className="quick-demo-box">
                <div className="quick-demo-header">
                  <span className="demo-badge-pill">⚡ 1-Click Instant Demo:</span>
                  <small>No password typing needed</small>
                </div>
                <div className="quick-demo-buttons">
                  <button
                    type="button"
                    className={`demo-btn ${selectedRoleTab === 'trainee' ? 'selected' : ''}`}
                    onClick={() => handleQuickDemoLaunch('trainee')}
                  >
                    <span>🎓 Learner Demo</span>
                    <small>Rahul Sharma</small>
                  </button>
                  <button
                    type="button"
                    className={`demo-btn ${selectedRoleTab === 'trainer' ? 'selected' : ''}`}
                    onClick={() => handleQuickDemoLaunch('trainer')}
                  >
                    <span>👨‍🏫 Faculty Demo</span>
                    <small>Dr. Priya Nair</small>
                  </button>
                  <button
                    type="button"
                    className={`demo-btn ${selectedRoleTab === 'admin' ? 'selected' : ''}`}
                    onClick={() => handleQuickDemoLaunch('admin')}
                  >
                    <span>🛡️ Admin Demo</span>
                    <small>Directorate</small>
                  </button>
                </div>
              </div>

              {errorMessage && (
                <div className="auth-alert-error">
                  <span>!</span> {errorMessage}
                </div>
              )}

              {submitted ? (
                <div className="login-success">
                  <div className="login-success-icon">✓</div>
                  <strong>You're signed in!</strong>
                  <p>Initializing your CapacityConnect workspace environment...</p>
                  <button type="button" className="btn-primary-action" onClick={onBack}>Continue to Workspace →</button>
                </div>
              ) : (
                <>
                  <div className="auth-input-group">
                    <label>
                      <span>Institutional Email</span>
                      <div className="input-with-icon-wrap">
                        <span className="input-lead-icon">✉</span>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                          placeholder={`${selectedRoleTab === 'trainer' ? 'dr.priya.nair' : selectedRoleTab === 'admin' ? 'admin.directorate' : 'ananya.verma'}@imd.gov.in`}
                          required
                        />
                      </div>
                    </label>
                  </div>

                  <div className="auth-input-group">
                    <label>
                      <span>Password</span>
                      <div className="password-field-wrap">
                        <span className="input-lead-icon">🔒</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                          placeholder="Enter your account password"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </label>
                  </div>

                  <div className="auth-form-row">
                    <label className="auth-check-label">
                      <input type="checkbox" defaultChecked />
                      <span>Remember on this device</span>
                    </label>
                    <button type="button" className="auth-forgot-btn" onClick={() => setShowForgot(true)}>
                      Forgot password?
                    </button>
                  </div>

                  <button className="btn-primary-action auth-submit-btn" type="submit" disabled={loading}>
                    {loading ? (
                      <span className="btn-loading-wrap">
                        <span className="spinner-dot" /> Authenticating...
                      </span>
                    ) : (
                      <>
                        <span>Sign In to {selectedRoleTab === 'admin' ? 'Admin Console' : selectedRoleTab === 'trainer' ? 'Trainer Suite' : 'Trainee Portal'}</span>
                        <b>→</b>
                      </>
                    )}
                  </button>

                  <div className="auth-divider">
                    <span>OR SIGN IN VIA GOV SSO</span>
                  </div>

                  <button
                    type="button"
                    className="btn-sso-gov"
                    onClick={() => handleQuickDemoLaunch(selectedRoleTab)}
                  >
                    <span className="sso-emblem">🇮🇳</span>
                    <span>Jan Parichay / MeriPehchaan SSO</span>
                    <span className="sso-arrow">↗</span>
                  </button>

                  <p className="auth-signup-text">
                    New to CapacityConnect?{' '}
                    <button type="button" className="inline-signup-btn" onClick={() => setShowSignup(true)}>
                      Create an account
                    </button>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [seconds, setSeconds] = useState(30)

  useEffect(() => {
    if (!sent || seconds === 0) return undefined
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [sent, seconds])

  const sendResetLink = (event) => {
    event.preventDefault()
    if (!email.trim()) return setError('Please enter your email address.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Please enter a valid email address.')
    setError('')
    setSending(true)
    window.setTimeout(() => { setSending(false); setSent(true); setSeconds(30) }, 700)
  }

  const resend = () => {
    if (!seconds) {
      setSent(false)
      setSending(true)
      window.setTimeout(() => { setSending(false); setSent(true); setSeconds(30) }, 700)
    }
  }

  return (
    <div className="forgot-page">
      <header className="forgot-header">
        <Logo />
        <button onClick={onBack}>← Back to Sign In</button>
      </header>
      <div className="forgot-layout">
        <section className="forgot-intro">
          <span className="forgot-kicker">ACCOUNT RECOVERY</span>
          <h1>Build Skills.<br />Strengthen <em>Competencies.</em><br />Empower People.</h1>
          <p>Your learning journey is always within reach.</p>
          <div className="recovery-visual">
            <span>◇</span>
            <i>✓</i>
            <b>Secure recovery<br />for your learning journey</b>
          </div>
        </section>

        <section className="forgot-card">
          {sent ? (
            <div className="forgot-success">
              <div className="forgot-success-icon">✓</div>
              <h2>Check your inbox</h2>
              <p>We've prepared a password reset link for your account.</p>
              <div className="sent-email">
                <small>Reset link sent to</small>
                <strong>{email}</strong>
              </div>
              <div className="resend-row">
                <span>Didn't receive the email?</span>
                <button disabled={seconds > 0} onClick={resend}>{seconds ? `Resend in ${seconds}s` : 'Resend Link'}</button>
              </div>
              <button className="forgot-secondary" onClick={onBack}>← Back to Sign In</button>
            </div>
          ) : (
            <>
              <div className="forgot-card-heading">
                <div className="forgot-icon">⌑</div>
                <div>
                  <h2>Forgot your password?</h2>
                  <p>Enter your registered email address and we'll help you reset your password.</p>
                </div>
              </div>
              <form onSubmit={sendResetLink}>
                <label className="forgot-label">
                  Email Address
                  <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} placeholder="Enter your email address" aria-invalid={Boolean(error)} />
                  {error && <small className="forgot-error">{error}</small>}
                </label>
                <button className="btn-primary-action forgot-submit" disabled={sending}>
                  {sending ? 'Sending Link...' : 'Send Reset Link →'}
                </button>
              </form>
              <p className="forgot-back-text">Remember your password? <button onClick={onBack}>Back to Sign In</button></p>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

const signupSkills = ['Meteorology', 'Climate Science', 'Weather Data Analysis', 'Python', 'Data Analysis', 'Remote Sensing', 'GIS', 'Machine Learning', 'Scientific Computing', 'Visualization']
const trainerSkills = ['Meteorology', 'Climatology', 'Weather Forecasting', 'Data Analysis', 'Python', 'Machine Learning', 'Remote Sensing', 'GIS', 'Numerical Weather Prediction', 'Climate Modeling']
const learningGoals = ['Improve technical skills', 'Prepare for assessments', 'Develop professional competencies', 'Learn new tools', 'Advance domain knowledge']

function SignupPage({ onBack, onLogin, onDashboard }) {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('trainer')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedGoals, setSelectedGoals] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    organization: '',
    designation: '',
    level: 'Beginner',
    experience: '',
    qualification: '',
    specialization: '',
    bio: '',
    certifications: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const toggle = (value, setter, values) => setter(values.includes(value) ? values.filter((item) => item !== value) : values.length < 10 ? [...values, value] : values)
  const passwordStrong = form.password.length >= 8 && /[A-Z]/.test(form.password) && /\d/.test(form.password)
  const canContinue = step === 1 ? role : step === 2 ? form.firstName && form.lastName && form.email && form.password && form.password === form.confirmPassword : step === 3 ? selectedSkills.length >= 3 : true

  const next = () => { if (canContinue) setStep(Math.min(4, step + 1)) }
  const previous = () => setStep(Math.max(1, step - 1))

  const handleCreateAccount = async () => {
    setLoading(true)
    try {
      await api.register({ ...form, role, skills: selectedSkills, goals: selectedGoals })
    } catch {
      // Fallback inside API
    }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="signup-page">
        <div className="signup-success">
          <div className="success-mark">✓</div>
          <h1>Account created successfully</h1>
          <p>Your CapacityConnect profile has been initialized. You can now access your customized workspace.</p>
          <button className="btn-primary-action" onClick={() => onDashboard(role)}>
            Go to {role === 'trainer' ? 'Trainer' : 'Trainee'} Dashboard →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page">
      <div className="signup-shell">
        <div className="signup-top-nav">
          <button className="back-home" onClick={onBack}>
            <span className="back-arrow">←</span> Back to Home
          </button>
          <div className="signup-header-signin">
            Already have an account? <button type="button" className="inline-signup-btn" onClick={onLogin}>Sign In</button>
          </div>
        </div>

        <div className="signup-layout">
          <div className="signup-intro">
            <Logo />
            <div className="eyebrow">✦ Create Your Account</div>
            <h1>Start Your <em>Learning Journey</em> with CapacityConnect.</h1>
            <p>Create your profile, discover relevant learning opportunities, track your competencies, and connect with verified trainers.</p>
            <div className="signup-benefits">
              <span><i className="benefit-check">✓</i> Personalized learning recommendations</span>
              <span><i className="benefit-check">✓</i> Competency-based development & mapping</span>
              <span><i className="benefit-check">✓</i> Intelligent verified trainer matching</span>
              <span><i className="benefit-check">✓</i> Real-time progress and assessment tracking</span>
            </div>
          </div>

          <div className="signup-card">
            <div className="signup-card-top">
              <div className="signup-symbol">◇</div>
              <div>
                <h2>Create your account</h2>
                <p>Step {step} of 4 · Configure your profile</p>
              </div>
            </div>

            <div className="signup-progress">
              {[['01', 'Account'], ['02', 'Profile'], ['03', 'Skills'], ['04', 'Review']].map(([number, label], index) => (
                <div className={step >= index + 1 ? 'progress-item active' : 'progress-item'} key={number}>
                  <span>{number}</span>
                  <b>{label}</b>
                  {index < 3 && <i />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="signup-step">
                <h3>Choose your account type</h3>
                <p className="step-copy">Select how you'll use CapacityConnect.</p>
                <div className="role-options">
                  <RoleOption selected={role === 'trainee'} icon="⌂" title="Trainee" text="Learn, assess your skills, track your progress, and build your competencies." onClick={() => setRole('trainee')} />
                  <RoleOption selected={role === 'trainer'} icon="▣" title="Trainer" text="Create learning content, conduct assessments, mentor trainees, and showcase your expertise." onClick={() => setRole('trainer')} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="signup-step">
                <h3>Tell us about yourself</h3>
                <p className="step-copy">Enter your personal details to initialize your profile.</p>
                <div className="field-grid">
                  <Field label="First Name" name="firstName" value={form.firstName} onChange={updateForm} placeholder="Enter your first name" />
                  <Field label="Last Name" name="lastName" value={form.lastName} onChange={updateForm} placeholder="Enter your last name" />
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={updateForm} placeholder="name@imd.gov.in" />
                  <Field label="Mobile Number" name="mobile" value={form.mobile} onChange={updateForm} placeholder="+91 98765 43210" />

                  <label className="signup-field">
                    Password
                    <div className="password-field">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={updateForm}
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </label>

                  <label className="signup-field">
                    Confirm Password
                    <div className="password-field">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={updateForm}
                        placeholder="Re-enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </label>
                </div>
                {form.password && (
                  <div className={`password-strength ${passwordStrong ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak'}`}>
                    <span>Password strength: {passwordStrong ? 'Strong' : form.password.length >= 6 ? 'Medium' : 'Weak'}</span>
                  </div>
                )}
                {form.confirmPassword && form.password !== form.confirmPassword && (
                  <small className="field-error-text">Passwords do not match.</small>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="signup-step">
                <h3>{role === 'trainer' ? 'Build your professional profile' : 'Build your learning profile'}</h3>
                <p className="step-copy">Personalize your experience with a few profile details.</p>
                <div className="field-grid">
                  <Field label="Organization / Institution" name="organization" value={form.organization} onChange={updateForm} placeholder="e.g. IMD New Delhi" />
                  <Field label={role === 'trainer' ? 'Designation' : 'Designation / Role'} name="designation" value={form.designation} onChange={updateForm} placeholder="e.g. Meteorologist" />
                  {role === 'trainer' ? (
                    <>
                      <Field label="Years of Experience" name="experience" value={form.experience} onChange={updateForm} placeholder="e.g. 5 years" />
                      <Field label="Highest Qualification" name="qualification" value={form.qualification} onChange={updateForm} placeholder="e.g. Master's degree" />
                    </>
                  ) : (
                    <Field label="Current Skill Level" name="level" value={form.level} onChange={updateForm} options={['Beginner', 'Intermediate', 'Advanced']} />
                  )}
                </div>
                <h4>{role === 'trainer' ? 'Your expertise' : 'Areas you are interested in'} <span>Select 3 to 10</span></h4>
                <div className="chip-grid">
                  {(role === 'trainer' ? trainerSkills : signupSkills).map((skill) => (
                    <button type="button" className={selectedSkills.includes(skill) ? 'chip selected' : 'chip'} onClick={() => toggle(skill, setSelectedSkills, selectedSkills)} key={skill}>
                      {selectedSkills.includes(skill) && '✓ '}{skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="signup-step review-step">
                <h3>Review your account</h3>
                <p className="step-copy">Make sure everything looks right before creating your profile.</p>
                <Review title="ACCOUNT" value={role === 'trainer' ? 'Trainer' : 'Trainee'} onEdit={() => setStep(1)} />
                <Review title="PERSONAL INFORMATION" value={`${form.firstName} ${form.lastName} · ${form.email}${form.mobile ? ` · ${form.mobile}` : ''}`} onEdit={() => setStep(2)} />
                <Review title="PROFILE" value={`${form.organization || 'Organization not added'} · ${form.designation || 'Role not added'}`} onEdit={() => setStep(3)} />
                <div className="review-block">
                  <div>
                    <b>COMPETENCIES</b>
                    <div className="review-chips">
                      {selectedSkills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </div>
                  <button onClick={() => setStep(3)}>Edit</button>
                </div>
              </div>
            )}

            <div className="signup-actions">
              {step > 1 && <button className="btn-secondary-action" onClick={previous}>← Back</button>}
              {step < 4 ? (
                <button className="btn-primary-action" disabled={!canContinue} onClick={next}>Continue →</button>
              ) : (
                <button className="btn-primary-action" disabled={loading} onClick={handleCreateAccount}>
                  {loading ? 'Creating account...' : 'Create Account →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoleOption({ selected, icon, title, text, onClick }) {
  return (
    <button type="button" className={selected ? 'role-option selected' : 'role-option'} onClick={onClick}>
      <span className="role-option-icon">{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
        <em>{selected ? '✓ Selected' : 'Select this role'}</em>
      </span>
    </button>
  )
}

function Field({ label, name, type = 'text', value, onChange, placeholder, options }) {
  return (
    <label className="signup-field">
      {label}
      {options ? (
        <select name={name} value={value} onChange={onChange}>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={['firstName', 'lastName', 'email', 'password', 'confirmPassword'].includes(name)} />
      )}
    </label>
  )
}

function Review({ title, value, onEdit }) {
  return (
    <div className="review-block">
      <div>
        <b>{title}</b>
        <p>{value}</p>
      </div>
      <button onClick={onEdit}>Edit</button>
    </div>
  )
}

const dashboardCourses = [
  ['Numerical Weather Prediction', 'Meteorology', 68, 'Dr. Rahul Sharma'],
  ['Python for Data Analysis', 'Data Science', 52, 'Dr. P. Mehta'],
  ['Climate Science Fundamentals', 'Climate Science', 100, 'Dr. R. Verma'],
]
const dashboardSkills = [['Python', 88, 'Strong'], ['Meteorology', 81, 'Strong'], ['Data Analysis', 72, 'Strong'], ['GIS', 54, 'Developing'], ['Machine Learning', 42, 'Needs Attention']]
const dashboardTrainers = [['Dr. Rahul Sharma', 'Meteorology', 'Weather Data Analysis', 'Python', '92%'], ['Dr. R. Verma', 'Climate Science', 'GIS', 'Remote Sensing', '86%'], ['Dr. P. Mehta', 'Data Science', 'Machine Learning', 'Scientific Computing', '81%']]

function TraineeDashboard({ onBack }) {
  return (
    <TraineePortal
      onBack={onBack}
      onOpenTrainerProfile={() => {
        window.location.hash = '#trainer-profile'
      }}
    />
  )
}

function TrainerDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [navSection, setNavSection] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [activeModal, setActiveModal] = useState(null)
  const [selectedTrainee, setSelectedTrainee] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

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

  const openTrainerProfile = () => { window.location.hash = '#trainer-profile' }

  const showToast = (msg) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3800)
  }

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

  const navItems = [
    ['▦', 'Dashboard'],
    ['▱', 'My Courses'],
    ['♟', 'Trainees'],
    ['▤', 'Assessments'],
    ['◎', 'Competencies'],
    ['▣', 'Content'],
    ['◌', 'Announcements'],
    ['✧', 'Feedback']
  ]
  const navBottomItems = [
    ['▥', 'Analytics'],
    ['?', 'Help & Support'],
    ['⚙', 'Settings']
  ]

  return (
    <div className="trainer-dashboard">
      <aside className={drawerOpen ? 'trainer-sidebar open' : 'trainer-sidebar'}>
        <div className="trainer-brand">
          <Logo onClick={onBack} />
          <small>TRAINER PORTAL</small>
        </div>
        <nav className="trainer-nav">
          {navItems.map(([icon, label]) => (
            <button
              className={navSection === label ? 'active' : ''}
              key={label}
              onClick={() => {
                setNavSection(label)
                setDrawerOpen(false)
              }}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
          <hr />
          {navBottomItems.map(([icon, label]) => (
            <button
              className={navSection === label ? 'active' : ''}
              key={label}
              onClick={() => {
                setNavSection(label)
                setDrawerOpen(false)
              }}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
          <button onClick={onBack}>
            <span>←</span>Logout
          </button>
        </nav>
        <div className="trainer-profile clickable-profile-trigger" onClick={openTrainerProfile} title="Click to view Dr. Rahul Sharma's Trainer Profile">
          <div className="trainer-avatar large">RS</div>
          <div>
            <strong>Dr. Rahul Sharma</strong>
            <small>Senior Meteorologist</small>
            <small className="profile-badge-link">Trainer (View Profile ↗)</small>
          </div>
          <span className="trainer-complete"><i style={{ width: '92%' }} /></span>
          <small>Profile 92% complete · Click to view</small>
        </div>
      </aside>

      <div className="trainer-main">
        <header className="trainer-header">
          <button className="trainer-menu" onClick={() => setDrawerOpen(!drawerOpen)}>☰</button>
          <div className="trainer-breadcrumb">
            Home <span>/</span> Trainer Dashboard {navSection !== 'Dashboard' && <><span>/</span> <b>{navSection}</b></>}
          </div>
          <div className="trainer-header-actions">
            <label className="trainer-search">
              ⌕
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search trainees, courses, assessments..."
              />
            </label>
            <button className="trainer-notification" onClick={() => setNoticeOpen(!noticeOpen)}>
              ♧<i>4</i>
            </button>
            <div className="trainer-user clickable-profile-trigger" onClick={openTrainerProfile} title="Click to view Dr. Rahul Sharma's Trainer Profile">
              <div className="trainer-avatar">RS</div>
              <span><strong>Dr. Rahul Sharma</strong><small>Trainer · View Profile ↗</small></span>
            </div>
          </div>
          {noticeOpen && (
            <div className="trainer-notice">
              <b>Notifications</b>
              <span>3 trainees need attention in NWP module</span>
              <span>Mid-term Assessment results are ready</span>
              <span>New trainee feedback received from IMD Pune</span>
              <span>Cloud cluster quota updated</span>
            </div>
          )}
        </header>

        <main className="trainer-content">
          {navSection === 'Dashboard' && (
            <div>
              <div className="trainer-welcome">
                <div>
                  <span className="trainer-kicker">TRAINER WORKSPACE</span>
                  <h1>Good morning, Dr. Sharma <em>👋</em></h1>
                  <p>Monitor your trainees, manage learning experiences and improve competency outcomes.</p>
                </div>
                <div className="quick-actions">
                  <button className="btn-primary-action" onClick={() => setActiveModal('create-course')}>+ Create Course</button>
                  <button className="btn-secondary-action" onClick={() => setActiveModal('create-assessment')}>+ Create Assessment</button>
                </div>
              </div>

              <div className="trainer-stats">
                <TrainerStat icon="▱" label="Active Courses" value={`0${courses.length}`} note={`${courses.filter(c => c.status === 'Published').length} published · ${courses.filter(c => c.status === 'Draft').length} draft`} />
                <TrainerStat icon="♟" label="Total Trainees" value="486" note="+24 this month" />
                <TrainerStat icon="▤" label="Assessments" value={`0${assessments.length}`} note={`${assessments.filter(a => a.status === 'Published').length} active`} />
                <TrainerStat icon="◷" label="Average Completion" value="78%" note="+6% above benchmark" />
              </div>

              <section className="trainer-courses dashboard-panel">
                <div className="trainer-section-title">
                  <div>
                    <h2>My Courses</h2>
                    <p>Manage your active learning programs.</p>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn-secondary-action small" onClick={() => setNavSection('My Courses')}>View All Courses →</button>
                    <button className="btn-primary-action small" onClick={() => setActiveModal('create-course')}>+ Create Course</button>
                  </div>
                </div>
                <div className="trainer-course-grid">
                  {courses.slice(0, 3).map((course) => (
                    <article className="trainer-course-card" key={course.id}>
                      <div className="trainer-course-icon">◈</div>
                      <span className="published-status">{course.status}</span>
                      <h3>{course.title}</h3>
                      <p>{course.category} · {course.level}</p>
                      <div className="course-detail-row">
                        <span>{course.traineesCount} trainees</span>
                        <span>{course.modulesCount} modules</span>
                      </div>
                      <div className="trainer-course-progress">
                        <span style={{ width: `${course.completionRate}%` }} />
                      </div>
                      <div className="course-detail-row">
                        <b>{course.completionRate}% average completion</b>
                        <button className="text-button" onClick={() => setNavSection('My Courses')}>Manage Course →</button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div className="trainer-two-col">
                <section className="dashboard-panel performance-panel">
                  <TrainerPanelTitle title="Trainee Performance" subtitle="Monitor learning progress and assessment outcomes." />
                  <div className="performance-summary">
                    <span><b>82%</b><small>Average Score</small></span>
                    <span><b>78%</b><small>Completion Rate</small></span>
                    <span><b>+14%</b><small>Competency Growth</small></span>
                    <span><b>12</b><small>At-Risk</small></span>
                  </div>
                  <div className="trainer-chart">
                    <div className="chart-grid">
                      <i style={{ height: '43%' }} />
                      <i style={{ height: '57%' }} />
                      <i style={{ height: '66%' }} />
                      <i style={{ height: '81%' }} />
                    </div>
                    <div className="chart-labels">
                      <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                    </div>
                  </div>
                </section>

                <section className="dashboard-panel attention-panel">
                  <TrainerPanelTitle title="Needs Attention" subtitle="Trainees who may benefit from support." />
                  <Attention
                    name="Aditya Jaiswal"
                    course="Weather Data Analysis"
                    progress="32%"
                    score="48%"
                    skill="Data Analysis — 41%"
                    onView={() => {
                      setSelectedTrainee(trainees[0]);
                      setActiveModal('trainee-details');
                    }}
                  />
                  <Attention
                    name="Rahul Verma"
                    course="Numerical Weather Prediction"
                    progress="28%"
                    score="54%"
                    skill="Physics Modeling — 48%"
                    onView={() => {
                      setSelectedTrainee(trainees[1]);
                      setActiveModal('trainee-details');
                    }}
                  />
                </section>
              </div>

              <div className="trainer-two-col">
                <section className="dashboard-panel competency-analytics">
                  <TrainerPanelTitle title="Competency Analytics" subtitle="Understand how trainees are developing." />
                  {competencies.map((c) => (
                    <div className="trainer-skill" key={c.name}>
                      <div>
                        <b>{c.name}</b>
                        <span className={c.status === 'Strong' ? 'strong' : c.status === 'Developing' ? 'developing' : 'needs'}>{c.status}</span>
                        <em>{c.score}%</em>
                      </div>
                      <span><i style={{ width: `${c.score}%` }} /></span>
                    </div>
                  ))}
                  <button className="text-button" onClick={() => setNavSection('Competencies')}>View Detailed Matrix →</button>
                </section>

                <section className="dashboard-panel assessment-management">
                  <TrainerPanelTitle title="Assessment Management" subtitle="Create, manage and evaluate assessments." />
                  {assessments.slice(0, 3).map((asm) => (
                    <div className="assessment-management-row" key={asm.id}>
                      <span>▤</span>
                      <div>
                        <b>{asm.title}</b>
                        <small>{asm.questionsCount} Questions · {asm.attemptsCount} Attempts · Avg {asm.avgScore}%</small>
                      </div>
                      <em>{asm.status}</em>
                      <button className="text-button" onClick={() => setNavSection('Assessments')}>View</button>
                    </div>
                  ))}
                  <button className="btn-secondary-action small" onClick={() => setActiveModal('create-assessment')}>+ Create Assessment</button>
                </section>
              </div>
            </div>
          )}

          {navSection === 'My Courses' && (
            <TrainerCoursesView courses={courses} onOpenModal={setActiveModal} onSelectCourse={(c) => console.log(c)} />
          )}

          {navSection === 'Trainees' && (
            <TrainerTraineesView trainees={trainees} onOpenModal={setActiveModal} onSelectTrainee={setSelectedTrainee} />
          )}

          {navSection === 'Assessments' && (
            <TrainerAssessmentsView assessments={assessments} onOpenModal={setActiveModal} />
          )}

          {navSection === 'Competencies' && (
            <TrainerCompetenciesView competencies={competencies} />
          )}

          {navSection === 'Content' && (
            <TrainerContentView contentList={contentList} onOpenModal={setActiveModal} />
          )}

          {navSection === 'Announcements' && (
            <TrainerAnnouncementsView announcements={announcements} onOpenModal={setActiveModal} />
          )}

          {navSection === 'Feedback' && (
            <TrainerFeedbackView feedbackList={feedbackList} onHelpful={showToast} />
          )}

          {navSection === 'Analytics' && (
            <TrainerAnalyticsView analytics={initialAnalytics} />
          )}

          {navSection === 'Help & Support' && (
            <TrainerSupportView faqs={initialFaqs} />
          )}

          {navSection === 'Settings' && (
            <TrainerSettingsView onSave={showToast} />
          )}
        </main>
      </div>

      <TrainerPortalModals
        activeModal={activeModal}
        modalData={selectedTrainee}
        onClose={() => setActiveModal(null)}
        onActionSuccess={handleActionSuccess}
      />

      {toastMessage && (
        <div className="profile-toast" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>✓</span> {toastMessage}
        </div>
      )}
    </div>
  )
}

const adminCompetencies = [['Python & Programming', 82], ['Data Analysis', 74], ['Weather Data Analysis', 68], ['GIS', 61], ['Remote Sensing', 54], ['Machine Learning', 47]]
const adminCourses = [['Python Fundamentals', '324', '86%', '82%', 'Excellent'], ['Weather Data Analysis', '286', '74%', '76%', 'Good'], ['GIS Basics', '194', '61%', '68%', 'Needs Attention']]
const adminTrainers = [['Dr. Rahul Sharma', 'Weather Data Analysis', '92%', '84 trainees'], ['Dr. Neha Verma', 'Remote Sensing', '89%', '71 trainees'], ['Dr. Amit Kumar', 'Python & Data Analysis', '86%', '96 trainees']]

function AdminDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [navSection, setNavSection] = useState('Dashboard')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [period, setPeriod] = useState('30 Days')
  const [modal, setModal] = useState(null)

  const adminNavItems = [
    ['▦', 'Dashboard'],
    ['▱', 'Courses'],
    ['▤', 'Assessments'],
    ['▣', 'Learning Content'],
    ['♟', 'Trainees'],
    ['♙', 'Trainers'],
    ['◎', 'Competencies'],
    ['◇', 'Trainer Matching'],
    ['▥', 'Analytics'],
    ['◌', 'Announcements'],
    ['✧', 'Feedback'],
    ['▤', 'Reports'],
    ['▰', 'Certificates'],
    ['⌁', 'Audit Log'],
    ['⚙', 'Settings']
  ]

  const openTrainerProfile = () => { window.location.hash = '#trainer-profile' }

  return (
    <div className="admin-dashboard">
      <aside className={drawerOpen ? 'admin-sidebar open' : 'admin-sidebar'}>
        <div className="admin-brand">
          <Logo onClick={onBack} />
          <small>ADMIN PORTAL</small>
        </div>
        <nav className="admin-nav">
          {adminNavItems.map(([icon, label]) => (
            <button
              className={navSection === label ? 'active' : ''}
              key={label}
              onClick={() => {
                setNavSection(label)
                setDrawerOpen(false)
              }}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
          <hr />
          <button onClick={onBack}><span>←</span>Logout</button>
        </nav>
        <div className="admin-profile">
          <div className="admin-avatar">AD</div>
          <div>
            <strong>Admin Workspace</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="admin-menu" onClick={() => setDrawerOpen(!drawerOpen)}>☰</button>
          <div>
            <b>{navSection === 'Dashboard' ? 'Institutional Dashboard' : navSection}</b>
            <small>Monitor learning activity, capacity growth, and institutional performance.</small>
          </div>
          <div className="admin-header-actions">
            <label className="admin-search">
              ⌕
              <input placeholder="Search courses, trainers, competencies..." />
            </label>
            <button className="admin-notification" onClick={() => setNoticeOpen(!noticeOpen)}>
              ♧<i>5</i>
            </button>
            <div className="admin-avatar">AD</div>
          </div>
          {noticeOpen && (
            <div className="admin-notice">
              <b>Notifications</b>
              <span>12 competency gaps need attention in Satellite Climatology</span>
              <span>3 trainer accreditation requests pending review</span>
              <span>New trainee feedback received from Pune center</span>
            </div>
          )}
        </header>

        <main className="admin-content">
          {navSection === 'Dashboard' && (
            <div>
              <div className="admin-welcome">
                <div>
                  <span>ADMIN OVERVIEW</span>
                  <h1>Good morning, Admin <em>👋</em></h1>
                  <p>Monitor learning activity, workforce competencies and institutional capacity growth.</p>
                </div>
                <div className="admin-actions">
                  <button className="btn-primary-action" onClick={() => setModal('Add Trainee')}>+ Add Trainee</button>
                  <button className="btn-secondary-action" onClick={() => setModal('Add Trainer')}>+ Add Trainer</button>
                  <button className="btn-secondary-action" onClick={() => setModal('Create Course')}>+ Create Course</button>
                </div>
              </div>

              <div className="admin-kpis">
                <AdminKpi icon="♟" label="Total Trainees" value="2,486" change="+12.4%" />
                <AdminKpi icon="♙" label="Active Trainers" value="148" change="+8 this month" />
                <AdminKpi icon="▱" label="Active Courses" value="64" change="12 currently running" />
                <AdminKpi icon="▤" label="Assessments" value="186" change="24 scheduled" />
                <AdminKpi icon="◎" label="Avg. Competency Score" value="74.8%" change="+5.2%" />
              </div>

              <div className="admin-primary-grid">
                <section className="admin-panel activity-admin">
                  <AdminTitle
                    title="Platform Learning Activity"
                    subtitle="Learning activity across the institution"
                    action={
                      <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                        <option>7 Days</option>
                        <option>30 Days</option>
                        <option>6 Months</option>
                        <option>1 Year</option>
                      </select>
                    }
                  />
                  <div className="admin-chart">
                    <div className="admin-chart-bars">
                      {[52, 67, 48, 75, 61, 84, 72, 91].map((height, index) => (
                        <i style={{ height: `${height}%` }} key={index} />
                      ))}
                    </div>
                    <div className="admin-chart-labels">
                      <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                    </div>
                  </div>
                  <div className="activity-admin-metrics">
                    <span><b>12,840</b><small>Total Learning Hours</small></span>
                    <span><b>78.4%</b><small>Course Completion</small></span>
                    <span><b>81.2%</b><small>Avg. Assessment Score</small></span>
                  </div>
                </section>

                <section className="admin-panel competency-health">
                  <AdminTitle title="Institutional Competency Health" subtitle="Current average across active learners" />
                  {adminCompetencies.map(([name, score]) => (
                    <div className="admin-health-row" key={name}>
                      <div><b>{name}</b><strong>{score}%</strong></div>
                      <span><i style={{ width: `${score}%` }} /></span>
                    </div>
                  ))}
                  <button className="text-button" onClick={() => setNavSection('Competencies')}>View Competency Analytics →</button>
                </section>
              </div>

              <div className="admin-primary-grid">
                <section className="admin-panel gap-alerts">
                  <AdminTitle title="Competency Gaps Requiring Attention" subtitle="Prioritize institutional learning actions" />
                  {[
                    ['Machine Learning', '47%', '75%', '28%', '126'],
                    ['Remote Sensing', '54%', '75%', '21%', '94'],
                    ['GIS', '61%', '75%', '14%', '72']
                  ].map(([name, current, target, gap, affected]) => (
                    <div className="gap-alert-row" key={name}>
                      <span className="gap-alert-icon">!</span>
                      <div>
                        <b>{name}</b>
                        <small>Current {current} · Target {target} · <strong>Gap {gap}</strong></small>
                      </div>
                      <em>{affected} trainees</em>
                      <button className="text-button" onClick={() => setModal(`View ${name} Gap`)}>View Gap</button>
                    </div>
                  ))}
                </section>

                <section className="admin-panel top-trainers">
                  <AdminTitle title="Top Performing Trainers" action={<button className="text-button" onClick={() => setNavSection('Trainers')}>View All Trainers →</button>} />
                  {adminTrainers.map(([name, expertise, score, trained]) => (
                    <div className="top-trainer-row" key={name} style={{ cursor: 'pointer' }} onClick={openTrainerProfile}>
                      <div className="admin-avatar">{name.split(' ').slice(-2).map((part) => part[0]).join('')}</div>
                      <div>
                        <b>{name}</b>
                        <small>{expertise} · {trained}</small>
                      </div>
                      <strong>{score}<small>success</small></strong>
                    </div>
                  ))}
                </section>
              </div>

              <div className="admin-primary-grid">
                <section className="admin-panel admin-table-panel">
                  <AdminTitle title="Course Performance" subtitle="Compare course outcomes at a glance" />
                  <div className="admin-table">
                    <div className="admin-table-head">
                      <span>Course</span>
                      <span>Enrolled</span>
                      <span>Completion</span>
                      <span>Avg Score</span>
                      <span>Status</span>
                    </div>
                    {adminCourses.map(([course, enrolled, completion, score, status]) => (
                      <div className="admin-table-row" key={course}>
                        <b>{course}</b>
                        <span>{enrolled}</span>
                        <span>{completion}</span>
                        <span>{score}</span>
                        <em className={status === 'Needs Attention' ? 'warning' : 'good'}>{status}</em>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="admin-panel matching-panel">
                  <AdminTitle title="Intelligent Trainer Matching" subtitle="AI Match Recommendation" />
                  <div className="matching-course">
                    <small>TARGET COURSE</small>
                    <b>Weather Data Analysis & Forecasting</b>
                    <span>Python · Statistics · Doppler Radar Meteorology</span>
                  </div>
                  <div className="matching-result" style={{ cursor: 'pointer' }} onClick={openTrainerProfile}>
                    <div className="admin-avatar">RS</div>
                    <div>
                      <b>Dr. Rahul Sharma</b>
                      <small>Weather Data Analysis · 8+ yrs exp</small>
                    </div>
                    <strong>92%<small>Match Score</small></strong>
                  </div>
                  <button className="btn-primary-action" onClick={() => setModal('Assign Trainer to Cohort')}>Assign Trainer →</button>
                </section>
              </div>
            </div>
          )}

          {navSection === 'Courses' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Institutional Courses Catalog</h1>
                  <p>Manage courses, syllabi, enrollments, and competency requirements.</p>
                </div>
                <button className="btn-primary-action" onClick={() => setModal('Create Course')}>+ Add New Course</button>
              </div>
              <div className="admin-table">
                <div className="admin-table-head">
                  <span>Course</span>
                  <span>Enrolled</span>
                  <span>Completion</span>
                  <span>Avg Score</span>
                  <span>Status</span>
                </div>
                {adminCourses.map(([course, enrolled, completion, score, status]) => (
                  <div className="admin-table-row" key={course}>
                    <b>{course}</b>
                    <span>{enrolled}</span>
                    <span>{completion}</span>
                    <span>{score}</span>
                    <em className={status === 'Needs Attention' ? 'warning' : 'good'}>{status}</em>
                  </div>
                ))}
              </div>
            </div>
          )}

          {navSection === 'Trainers' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Faculty & Verified Trainers Directory</h1>
                  <p>Accredited instructors and domain specialists across MoES / IMD institutions.</p>
                </div>
                <button className="btn-primary-action" onClick={() => setModal('Add Trainer')}>+ Invite Trainer</button>
              </div>
              <div className="portal-grid-cards">
                {adminTrainers.map(([name, expertise, score, trained]) => (
                  <div className="portal-card" key={name} style={{ cursor: 'pointer' }} onClick={openTrainerProfile}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                      <div className="admin-avatar large">{name.split(' ').slice(-2).map((part) => part[0]).join('')}</div>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: 16, margin: 0 }}>{name}</h3>
                        <small style={{ color: '#8492a6', fontSize: 12 }}>{expertise}</small>
                      </div>
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 12px' }}>Trained {trained} · Verification Badge Active</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="portal-badge good">{score} Success Rate</span>
                      <button className="text-button">View Profile →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {navSection === 'Trainees' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Institutional Trainees Management</h1>
                  <p>2,486 active learners across meteorological centers and training divisions.</p>
                </div>
                <button className="btn-primary-action" onClick={() => setModal('Add Trainee')}>+ Register Trainee</button>
              </div>
              <div className="admin-table">
                <div className="admin-table-head">
                  <span>Trainee Name</span>
                  <span>Department</span>
                  <span>Courses</span>
                  <span>Avg Score</span>
                  <span>Status</span>
                </div>
                {[
                  ['Aditya Jaiswal', 'Meteorology Division', '6 Enrolled', '74%', 'Active'],
                  ['Rahul Verma', 'Climatology Unit', '4 Enrolled', '68%', 'Active'],
                  ['Pooja Sharma', 'Remote Sensing Lab', '5 Enrolled', '88%', 'Distinction'],
                  ['Amit Kumar', 'Hydrology Division', '3 Enrolled', '58%', 'Needs Attention']
                ].map(([name, dept, enrolled, score, status]) => (
                  <div className="admin-table-row" key={name}>
                    <b>{name}</b>
                    <span>{dept}</span>
                    <span>{enrolled}</span>
                    <span>{score}</span>
                    <em className={status === 'Needs Attention' ? 'warning' : 'good'}>{status}</em>
                  </div>
                ))}
              </div>
            </div>
          )}

          {navSection === 'Competencies' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Institutional Competency Framework</h1>
                  <p>Benchmark standards and developmental gap analytics for workforce planning.</p>
                </div>
              </div>
              <div className="portal-two-col-grid">
                <div>
                  <h3 style={{ color: '#fff', fontSize: 16, marginBottom: 14 }}>Core Domain Competencies</h3>
                  {adminCompetencies.map(([name, score]) => (
                    <div className="portal-competency-card" key={name}>
                      <div className="portal-comp-header">
                        <div>
                          <strong>{name}</strong>
                          <span className={`portal-badge ${score >= 70 ? 'good' : score >= 55 ? 'draft' : 'urgent'}`} style={{ marginLeft: 10 }}>
                            {score >= 70 ? 'Strong' : score >= 55 ? 'Developing' : 'Action Required'}
                          </span>
                        </div>
                        <span>{score}%</span>
                      </div>
                      <div className="portal-progress-track">
                        <div className="portal-progress-fill" style={{ width: `${score}%`, background: score >= 70 ? 'linear-gradient(90deg, #2583ff, #2cd0d3)' : score >= 55 ? 'linear-gradient(90deg, #eab308, #ca8a04)' : 'linear-gradient(90deg, #ef4444, #dc2626)' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="portal-info-card">
                  <h3>Priority Institutional Actions</h3>
                  <p>Machine Learning and Remote Sensing competencies are below the target 75% institutional threshold. 220 trainees are currently queued for supplemental capacity workshops.</p>
                  <button className="btn-primary-action" onClick={() => setModal('Schedule Supplemental Training')}>Schedule Workshops →</button>
                </div>
              </div>
            </div>
          )}

          {navSection === 'Trainer Matching' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>AI Trainer Matching Engine</h1>
                  <p>Intelligent algorithm matching course syllabus competencies with accredited faculty profiles.</p>
                </div>
              </div>
              <div className="portal-two-col-grid">
                <div className="portal-info-card">
                  <h3>Active Match Recommendation</h3>
                  <div className="matching-course" style={{ marginTop: 14 }}>
                    <small>TARGET COURSE</small>
                    <b>Weather Data Analysis & Forecasting</b>
                    <span>Python · Doppler Radar · Numerical Weather Prediction</span>
                  </div>
                  <div className="matching-result" style={{ cursor: 'pointer' }} onClick={openTrainerProfile}>
                    <div className="admin-avatar large">RS</div>
                    <div>
                      <b>Dr. Rahul Sharma</b>
                      <small>Senior Meteorology & Data Analytics Trainer</small>
                    </div>
                    <strong>92%<small>Match</small></strong>
                  </div>
                  <button className="btn-primary-action" onClick={() => setModal('Allocate Trainer')}>Confirm Faculty Allocation →</button>
                </div>
                <div className="portal-info-card">
                  <h3>Matching Algorithm Criteria</h3>
                  <p>Match scores are computed using 4 verified dimensions:</p>
                  <ul style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.8, paddingLeft: 18 }}>
                    <li>Past trainee assessment outcomes (35% weight)</li>
                    <li>Verified competency skill matrix (30% weight)</li>
                    <li>Domain experience & publications (20% weight)</li>
                    <li>Trainee qualitative satisfaction ratings (15% weight)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {navSection === 'Analytics' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Institutional Capacity & Learning Analytics</h1>
                  <p>Executive reports on completion rates, competency gains, and training ROI.</p>
                </div>
              </div>
              <div className="portal-kpi-row">
                <div className="portal-kpi-card">
                  <div className="kpi-icon">◷</div>
                  <div className="kpi-label">Learning Hours</div>
                  <div className="kpi-val">12,840</div>
                  <div className="kpi-note">+18% vs last quarter</div>
                </div>
                <div className="portal-kpi-card">
                  <div className="kpi-icon">✓</div>
                  <div className="kpi-label">Completion Rate</div>
                  <div className="kpi-val">78.4%</div>
                  <div className="kpi-note">Above national avg</div>
                </div>
                <div className="portal-kpi-card">
                  <div className="kpi-icon">◎</div>
                  <div className="kpi-label">Competency Index</div>
                  <div className="kpi-val">74.8%</div>
                  <div className="kpi-note">+5.2% institutional growth</div>
                </div>
                <div className="portal-kpi-card">
                  <div className="kpi-icon">✦</div>
                  <div className="kpi-label">Certified Learners</div>
                  <div className="kpi-val">1,894</div>
                  <div className="kpi-note">Accredited cohort</div>
                </div>
              </div>
            </div>
          )}

          {navSection === 'Announcements' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Institutional Broadcasts & Announcements</h1>
                  <p>Send platform-wide notices to trainers, trainees, and department heads.</p>
                </div>
                <button className="btn-primary-action" onClick={() => setModal('New Broadcast')}>+ Create Broadcast</button>
              </div>
              <div className="course-list">
                {[
                  ['Q3 Capacity Building Schedule Released', 'Published to all 148 verified trainers and 2,486 trainees across MoES/IMD centers.', 'Yesterday'],
                  ['HPC Weather Modeling Cluster Upgrade Complete', 'Trainees now have access to high-resolution WRF computational nodes.', '3 days ago']
                ].map(([title, desc, time]) => (
                  <div className="portal-card" key={title} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ color: '#fff', fontSize: 15, margin: 0 }}>{title}</h3>
                      <small style={{ color: '#8492a6', fontSize: 11 }}>{time}</small>
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: 13, margin: '8px 0 0', lineHeight: 1.5 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {navSection === 'Settings' && (
            <div className="portal-view-container">
              <div className="portal-page-header">
                <div className="portal-title-block">
                  <h1>Platform & Institutional Governance Settings</h1>
                  <p>Security protocols, user roles, API integration keys, and audit controls.</p>
                </div>
              </div>
              <div className="portal-settings-grid">
                <div className="portal-settings-card">
                  <h3>Institutional Security</h3>
                  <div className="portal-form-group">
                    <label>Institution Name</label>
                    <input defaultValue="India Meteorological Department (MoES)" readOnly />
                  </div>
                  <div className="portal-form-group">
                    <label>SSO / SAML Identity Provider</label>
                    <input defaultValue="GovID Auth Service (Configured)" readOnly />
                  </div>
                </div>
                <div className="portal-settings-card">
                  <h3>System Status</h3>
                  <p style={{ color: '#34d399', fontWeight: 600, fontSize: 13 }}>● All platform services operating normally</p>
                  <p style={{ color: '#8492a6', fontSize: 12, marginTop: 8 }}>Database: Connected · HPC Cluster: Active · AI Match Engine: Operational</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {modal && (
        <div className="admin-modal-backdrop" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModal(null)}>×</button>
            <span className="modal-sym">◇</span>
            <h2>{modal}</h2>
            <p>Action triggered successfully in platform administrative control environment.</p>
            <button className="btn-primary-action" onClick={() => setModal(null)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminKpi({ icon, label, value, change }) {
  return (
    <article className="admin-kpi">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
      <p>{change}</p>
      <i />
    </article>
  )
}

function AdminTitle({ title, subtitle, action }) {
  return (
    <div className="admin-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {typeof action === 'string' ? <button className="text-button">{action} →</button> : action}
    </div>
  )
}

function TrainerStat({ icon, label, value, note }) {
  return (
    <article className="trainer-stat">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  )
}

function TrainerPanelTitle({ title, subtitle, action }) {
  return (
    <div className="trainer-panel-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <button className="text-button">{action}</button>}
    </div>
  )
}

function Attention({ name, course, progress, score, skill, onView }) {
  return (
    <div className="attention-row">
      <div className="trainer-avatar">{name.split(' ').map((part) => part[0]).join('')}</div>
      <div>
        <b>{name}</b>
        <small>{course}</small>
        <p>Progress <strong>{progress}</strong> · Assessment <strong>{score}</strong></p>
        <em>{skill}</em>
      </div>
      <button className="text-button" onClick={onView}>View →</button>
    </div>
  )
}

function Stat({ icon, label, value, suffix, note }) {
  return (
    <article className="stat-card">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value} <em>{suffix}</em></strong>
      <p>{note}</p>
    </article>
  )
}

function PanelTitle({ title, subtitle, action }) {
  return (
    <div className="panel-title">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <button className="text-button">{action}</button>}
    </div>
  )
}

function CourseRow({ title, category, progress, instructor }) {
  return (
    <div className="course-row">
      <span className="course-cover">{progress === 100 ? '✓' : '◈'}</span>
      <div>
        <h3>{title}</h3>
        <p>{category} · {instructor}</p>
        <span className="course-track"><i style={{ width: `${progress}%` }} /></span>
      </div>
      <strong>{progress}%</strong>
      <button className="text-button">{progress === 100 ? 'View' : 'Continue'}</button>
    </div>
  )
}

function Recommendation({ icon, title, level, time, match }) {
  return (
    <div className="recommendation-row">
      <span>{icon}</span>
      <div>
        <b>{title}</b>
        <small>{level} · {time}</small>
      </div>
      <strong>{match}<small>relevance</small></strong>
    </div>
  )
}

export default App
