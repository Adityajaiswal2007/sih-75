import { useEffect, useState } from 'react'
import './App.css'
import api from './services/api'
import LoginPage from './components/login/LoginPage'
import LandingPage from './components/landing/LandingPage'
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
                        <h3 style={{ color: '#16251B', fontSize: 16, margin: 0 }}>{name}</h3>
                        <small style={{ color: '#485563', fontSize: 12 }}>{expertise}</small>
                      </div>
                    </div>
                    <p style={{ color: '#485563', fontSize: 13, margin: '0 0 12px' }}>Trained {trained} · Verification Badge Active</p>
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
                  <h3 style={{ color: '#16251B', fontSize: 16, marginBottom: 14 }}>Core Domain Competencies</h3>
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
                        <div className="portal-progress-fill" style={{ width: `${score}%`, background: score >= 70 ? 'linear-gradient(90deg, #2F5233, #A7C957)' : score >= 55 ? 'linear-gradient(90deg, #B58B32, #D4A338)' : 'linear-gradient(90deg, #B94A48, #D96563)' }} />
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
                  <ul style={{ color: '#485563', fontSize: 13, lineHeight: 1.8, paddingLeft: 18 }}>
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
                      <h3 style={{ color: '#16251B', fontSize: 15, margin: 0 }}>{title}</h3>
                      <small style={{ color: '#485563', fontSize: 11 }}>{time}</small>
                    </div>
                    <p style={{ color: '#485563', fontSize: 13, margin: '8px 0 0', lineHeight: 1.5 }}>{desc}</p>
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
                  <p style={{ color: '#2F6B3C', fontWeight: 600, fontSize: 13 }}>● All platform services operating normally</p>
                  <p style={{ color: '#485563', fontSize: 12, marginTop: 8 }}>Database: Connected · HPC Cluster: Active · AI Match Engine: Operational</p>
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

export default App
