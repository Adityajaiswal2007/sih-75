import { useEffect, useState } from 'react'
import './App.css'
import api from './services/api'
import LoginPage from './components/login/LoginPage'
import LandingPage from './components/landing/LandingPage'
import TrainerProfilePage from './components/trainer-profile/TrainerProfilePage'
import TraineePortal from './components/trainee/TraineePortal'
import AdminDashboard from './components/admin/AdminDashboard'
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

function Logo({ onClick }) {
  return (
    <a className="logo" href="#top" onClick={onClick} aria-label="CapacityConnect home">
      <span className="logo-mark">◇</span>
      <span className="logo-text">Capacity<span className="logo-accent">Connect</span></span>
    </a>
  )
}

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [loginRole, setLoginRole] = useState('trainee')
  const [dashboardRole, setDashboardRole] = useState(null)
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  const [loginView, setLoginView] = useState('login')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      setCurrentHash(hash)
      if (hash === '#get-started' || hash === '#login') {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        setLoginRole('trainee')
        setLoginView('login')
        setShowLogin(true)
      } else if (hash === '#signup') {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        setLoginRole('trainee')
        setLoginView('signup')
        setShowLogin(true)
      } else if (hash === '#forgot-password') {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
        setLoginView('forgot')
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
  if (showLogin) return <LoginPage onBack={() => { window.location.hash = ''; setShowLogin(false); setCurrentHash('') }} onDashboard={(role = 'trainee') => { setShowLogin(false); setDashboardRole(role); }} initialRole={loginRole} initialView={loginView} />

  return (
    <LandingPage
      onLogin={(role = 'trainee') => {
        setLoginRole(role)
        setShowLogin(true)
      }}
      onGetStarted={(role = 'trainee') => {
        setLoginRole(role)
        setShowLogin(true)
      }}
      onNavigateRole={(role = 'trainee') => {
        setLoginRole(role)
        setShowLogin(true)
      }}
    />
  )
}

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


// AdminDashboard is imported from './components/admin/AdminDashboard'

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

export default App
