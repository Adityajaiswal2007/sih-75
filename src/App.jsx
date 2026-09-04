import { useEffect, useState } from 'react'
import './App.css'
import TrainerProfilePage from './components/trainer-profile/TrainerProfilePage'
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
  ['01', 'Personalized Learning', 'Personalized learning paths and course recommendations based on your skills and interests.', '◆'],
  ['02', 'Competency Mapping', 'Identify skills, competency gaps and track development with an intelligent mapping engine.', '◎'],
  ['03', 'Intelligent Trainer Matching', 'AI-driven matching to connect you with the right trainer for each competency requirement.', '✦'],
  ['04', 'Assessments & Progress', 'Take assessments, evaluate performance and monitor your improvement continuously.', '▤'],
  ['05', 'Learning Resources', 'Access curated learning materials, videos, documents and practical resources in one place.', '▣'],
  ['06', 'Analytics & Insights', 'Data-driven insights for trainees, trainers and administrators to make better decisions.', '▥'],
]

const roles = [
  { title: 'For Trainees', icon: '●', color: 'blue', items: ['Discover relevant courses', 'Learn with structured content', 'Take assessments', 'Track progress & improve skills'], action: 'Explore as Trainee' },
  { title: 'For Trainers', icon: '◉', color: 'teal', items: ['Create & manage learning content', 'Design assessments', 'Monitor trainee progress', 'Showcase your competencies'], action: 'Explore as Trainer' },
  { title: 'For Administrators', icon: '⬟', color: 'violet', items: ['Manage users & roles', 'Manage courses & content', 'Monitor analytics & reports', 'Oversee platform operations'], action: 'Explore as Admin' },
]

const impacts = [
  ['▰', 'Centralized Learning', 'All learning resources in one secure platform'],
  ['◎', 'Better Competency Visibility', 'Clear visibility of skills and competency gaps'],
  ['▥', 'Data-Driven Training', 'Make informed decisions with real-time insights'],
  ['♟', 'Efficient Trainer Selection', 'Match the right trainer with the right competencies'],
  ['⌁', 'Personalized Development', 'Empower individuals with personalized learning paths'],
]

function Logo() { return <a className="logo" href="#top" aria-label="CapacityConnect home"><span className="logo-mark">◇</span>Capacity<span>Connect</span></a> }
function MiniChart() { return <div className="chart" aria-label="Learning progress chart"><i /><i /><i /><i /><i /><i /><i /></div> }

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

  if (dashboardRole === 'trainer') return <TrainerDashboard onBack={() => setDashboardRole(null)} />
  if (dashboardRole === 'trainee') return <TraineeDashboard onBack={() => setDashboardRole(null)} />
  if (showLogin) return <LoginPage onBack={() => { window.location.hash = ''; setShowLogin(false); setCurrentHash('') }} onDashboard={(role = 'trainee') => setDashboardRole(role)} />

  return (
    <div id="top">
      <header className="site-header shell">
        <Logo />
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <div className="nav-links">
            <a className="active" href="#top">Home</a>
            <a href="#features">Learn</a>
            <a href="#how">How It Works</a>
            <a href="#roles">For Institutions</a>
            <a href="#about">About Us</a>
          </div>
          <button className="button small nav-cta" onClick={() => setShowLogin(true)}><span>Get Started</span><b>→</b></button>
        </nav>
      </header>
      <main>
        <section className="hero shell"><div className="hero-copy"><div className="eyebrow">✦ An initiative under MoES | IMD</div><h1>Build Skills. Strengthen<br />Competencies. <em>Empower People.</em></h1><p>CapacityConnect is a unified digital platform for capacity building, learning, assessments and intelligent trainer matching for a future-ready workforce.</p><div className="actions"><a className="button" href="#get-started">Get Started Now <b>→</b></a><a className="button outline" href="#features">Explore Platform</a></div><div className="trust-row"><span>♧ <b>Secure & Reliable</b><small>Institutional Grade</small></span><span>♧ <b>Role-Based Access</b><small>Trainer · Trainee · Admin</small></span><span>♧ <b>Data-Driven Insights</b><small>Track · Assess · Improve</small></span><span>♧ <b>Scalable & Flexible</b><small>Built for Institutions</small></span></div></div><div className="product-preview"><div className="preview-top"><span className="logo-mark">◇</span><b>Welcome back, Rahul! 👋</b><small>Let's continue your learning journey.</small></div><div className="preview-body"><aside><strong>▣ Dashboard</strong><span>▱ My Learning</span><span>◫ Courses</span><span>▤ Assessments</span><span>♙ Profile</span><span>⌁ Analytics</span><span>▰ Messages</span><span>⚙ Settings</span></aside><div className="dashboard"><div className="dash-grid"><div className="dash-card progress"><small>Learning Progress</small><div className="ring">72%</div><p>12 Courses Enrolled<br />8 Courses Completed<br />24 Assessments Taken</p></div><div className="dash-card score"><small>Competency Score</small><strong>85<span>/100</span></strong><i>Advanced</i><MiniChart /></div></div><div className="recommend"><small>Recommended for You</small><div className="rec-items"><span>Advanced<br />Meteorology <b>98% Match</b></span><span>Python for<br />Data Analysis <b>90% Match</b></span><span>Climate Data<br />Visualization <b>78% Match</b></span></div></div></div></div></div></section>
        <div className="institution-strip shell"><b>Trusted by Government Institutions</b><span>◈ Designed for<br />Institutional Use</span><span>♟ Role-Based<br />Access Control</span><span>▣ Secure Data<br />Architecture</span><span>◉ SIH 2026<br />Prototype</span><span className="india">◒ Digital India</span></div>
        <section id="features" className="section shell"><SectionHeading title="Everything You Need for" accent="Smarter Capacity Building" /><div className="feature-grid">{features.map(([number, title, body, icon]) => <article className="feature-card" key={number}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <section id="how" className="section process-section"><div className="shell"><SectionHeading title="From Skills to the" accent="Right Trainer" /><p className="section-subtitle">Our intelligent engine matches competencies with the most suitable trainers</p><div className="process"><Step icon="▤" title="Course Requirements" text="Course defines the skills and knowledge needed" /><Step icon="◈" title="Required Competencies" text="Extract and map core competencies" /><Step icon="✣" title="Trainer Database" text="Search in verified trainer competency profiles" /><Step icon="◇" title="Intelligent Matching Engine" text="AI matches competencies with best-fit trainers" /><Step icon="♟" title="Recommended Trainers" text="Get the best matched trainers with match score" /></div></div></section>
        <section className="section shell"><SectionHeading title="How" accent="CapacityConnect Works" /><div className="works-grid">{[['01', 'Create Profile', 'Sign up as Trainee or Trainer and build your competency profile.'], ['02', 'Discover & Enroll', 'Extract courses and learning programs that match your interests and goals.'], ['03', 'Learn & Assess', 'Access content, learn at your pace and take assessments to test your skills.'], ['04', 'Improve & Grow', 'Get insights, close your gaps and grow your competencies continuously.']].map(([num, title, text]) => <article className="work-card" key={num}><b>{num}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section id="roles" className="section shell"><SectionHeading title="Built for" accent="Every Role" /><div className="role-grid">{roles.map(role => <article className={`role-card ${role.color}`} key={role.title}><div className="role-icon">{role.icon}</div><h3>{role.title}</h3><ul>{role.items.map(item => <li key={item}>✓ {item}</li>)}</ul><button className="button role-button" onClick={() => { if (role.title.includes('Trainer')) setDashboardRole('trainer'); else if (role.title.includes('Admin')) setDashboardRole('admin'); else setDashboardRole('trainee'); }}>{role.action} →</button></article>)}</div></section>
        <section className="impact-section shell"><SectionHeading title="Driving Impact Through" accent="Effective Capacity Building" /><div className="impact-grid">{impacts.map(([icon, title, text]) => <article className="impact-card" key={title}><div className="impact-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
        <section id="get-started" className="cta shell"><div><h2>Ready to Build a <em>Smarter</em> Learning Ecosystem?</h2><p>Bring learning, competency development and training management into one connected platform.</p><div className="actions"><a className="button" href="#top">Get Started Now →</a><a className="button outline" href="#features">Explore Platform</a></div></div><div className="journey"><b>Your Growth Journey Starts Here</b><span>✓ Personalized Learning</span><span>✓ Skill Development</span><span>✓ Competency Mastery</span><span>✓ Career Advancement</span></div></section>
      </main><footer className="footer shell"><Logo /><span>© 2026 CapacityConnect. All rights reserved.</span><div><b>Platform</b><small>Courses<br />Assessments<br />Trainer Directory</small></div><div><b>Resources</b><small>Help Center<br />User Guides<br />FAQs</small></div><div><b>For Institutions</b><small>Institutional Login<br />Request Demo<br />API Access</small></div><div><b>Legal</b><small>Privacy Policy<br />Terms of Use<br />Accessibility</small></div></footer>
    </div>
  )
}

function SectionHeading({ title, accent }) { return <h2 className="section-heading">{title} <em>{accent}</em></h2> }
function Step({ icon, title, text }) { return <div className="step"><div className="step-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div> }

function LoginPage({ onBack, onDashboard }) {
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [selectedRole, setSelectedRole] = useState('Trainer')

  useEffect(() => {
    if (submitted) {
      const role = selectedRole.toLowerCase() === 'trainer' ? 'trainer' : selectedRole.toLowerCase() === 'administrator' ? 'admin' : 'trainee'
      onDashboard(role)
    }
  }, [submitted, onDashboard, selectedRole])

  useEffect(() => {
    const handleForgotClick = (event) => {
      const link = event.target.closest('a[href="#forgot"]')
      if (!link) return
      event.preventDefault()
      setShowForgot(true)
    }
    document.addEventListener('click', handleForgotClick)
    return () => document.removeEventListener('click', handleForgotClick)
  }, [])
  const [showSignup, setShowSignup] = useState(window.location.hash === '#get-started')

  useEffect(() => {
    const handleHashChange = () => setShowSignup(window.location.hash === '#get-started')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const handleSignupClick = (event) => {
      const link = event.target.closest('a[href="#get-started"]')
      if (!link) return
      event.preventDefault()
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      setShowSignup(true)
    }
    document.addEventListener('click', handleSignupClick)
    return () => document.removeEventListener('click', handleSignupClick)
  }, [])

  if (showSignup) return <SignupPage onBack={() => { window.location.hash = ''; setShowSignup(false) }} onLogin={() => { window.location.hash = ''; setShowSignup(false) }} onDashboard={onDashboard} />

  if (showForgot) return <ForgotPasswordPage onBack={() => setShowForgot(false)} />

  return <div className="login-page"><div className="login-shell"><button className="back-home" onClick={onBack}>← Back to home</button><div className="login-layout"><div className="login-intro"><Logo /><div className="eyebrow">✦ Welcome to CapacityConnect</div><h1>Build your next chapter with <em>confidence.</em></h1><p>Continue your learning journey, track your competencies and connect with the right opportunities.</p><div className="login-points"><span>✓ Personalized learning paths</span><span>✓ Verified trainer network</span><span>✓ Progress that moves with you</span></div></div><form className="login-card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><div className="login-card-heading"><span className="login-symbol">◇</span><div><h2>Welcome back</h2><p>Sign in to your learning workspace</p></div></div>{submitted ? <div className="login-success"><strong>You're signed in!</strong><p>Your CapacityConnect workspace is ready to explore.</p><button type="button" className="button" onClick={onBack}>Continue to home →</button></div> : <><label>Account type<select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}><option value="Trainer">Trainer</option><option value="Trainee">Trainee</option><option value="Administrator">Administrator</option></select></label><label>Email address<input type="email" defaultValue="dr.rahul.sharma@imd.gov.in" placeholder="you@example.com" required /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} defaultValue="Password123" placeholder="Enter your password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '◉' : '◌'}</button></div></label><div className="form-row"><label className="check-label"><input type="checkbox" defaultChecked /> Remember me</label><a href="#forgot">Forgot password?</a></div><button className="button login-submit" type="submit">Sign In <b>→</b></button><p className="signup-text">New to CapacityConnect? <a href="#get-started">Create an account</a></p></>}</form></div></div></div>
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

  const resend = () => { if (!seconds) { setSent(false); setSending(true); window.setTimeout(() => { setSending(false); setSent(true); setSeconds(30) }, 700) } }

  return <div className="forgot-page"><header className="forgot-header"><Logo /><button onClick={onBack}>← Back to Sign In</button></header><div className="forgot-layout"><section className="forgot-intro"><span className="forgot-kicker">ACCOUNT RECOVERY</span><h1>Build Skills.<br />Strengthen <em>Competencies.</em><br />Empower People.</h1><p>Your learning journey is always within reach.</p><div className="recovery-visual"><span>◇</span><i>✓</i><b>Secure recovery<br />for your learning journey</b></div></section><section className="forgot-card">{sent ? <div className="forgot-success"><div className="forgot-success-icon">✓</div><h2>Check your inbox</h2><p>We've prepared a password reset link for your account.</p><div className="sent-email"><small>Reset link sent to</small><strong>{email}</strong></div><div className="resend-row"><span>Didn't receive the email?</span><button disabled={seconds > 0} onClick={resend}>{seconds ? `Resend available in ${seconds}s` : 'Resend Link'}</button></div><button className="forgot-secondary" onClick={onBack}>← Back to Sign In</button></div> : <><div className="forgot-card-heading"><div className="forgot-icon">⌑</div><div><h2>Forgot your password?</h2><p>Enter your registered email address and we'll help you reset your password.</p></div></div><form onSubmit={sendResetLink}><label className="forgot-label">Email Address<input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} placeholder="Enter your email address" aria-invalid={Boolean(error)} />{error && <small className="forgot-error">{error}</small>}</label><button className="button forgot-submit" disabled={sending}>{sending ? <><span className="loading-spinner" /> Sending...</> : <>Send Reset Link <b>→</b></>}</button></form><p className="forgot-back-text">Remember your password? <button onClick={onBack}>Back to Sign In</button></p></>}</section></div></div>
}

const signupSkills = ['Meteorology', 'Climate Science', 'Weather Data Analysis', 'Python', 'Data Analysis', 'Remote Sensing', 'GIS', 'Machine Learning', 'Scientific Computing', 'Visualization']
const trainerSkills = ['Meteorology', 'Climatology', 'Weather Forecasting', 'Data Analysis', 'Python', 'Machine Learning', 'Remote Sensing', 'GIS', 'Numerical Weather Prediction', 'Climate Modeling']
const learningGoals = ['Improve technical skills', 'Prepare for assessments', 'Develop professional competencies', 'Learn new tools', 'Advance domain knowledge']

function SignupPage({ onBack, onLogin, onDashboard }) {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('trainer')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedGoals, setSelectedGoals] = useState([])
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', mobile: '', organization: '', designation: '', level: 'Beginner', experience: '', qualification: '', specialization: '', bio: '', certifications: '' })
  const [submitted, setSubmitted] = useState(false)

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const toggle = (value, setter, values) => setter(values.includes(value) ? values.filter((item) => item !== value) : values.length < 10 ? [...values, value] : values)
  const passwordStrong = form.password.length >= 8 && /[A-Z]/.test(form.password) && /\d/.test(form.password)
  const canContinue = step === 1 ? role : step === 2 ? form.firstName && form.lastName && form.email && form.password && form.password === form.confirmPassword : step === 3 ? selectedSkills.length >= 3 : true

  const next = () => { if (canContinue) setStep(Math.min(4, step + 1)) }
  const previous = () => setStep(Math.max(1, step - 1))

  if (submitted) return <div className="signup-page"><div className="signup-success"><div className="success-mark">✓</div><h1>Account created successfully</h1><p>Your CapacityConnect profile is ready. Let's continue building your learning journey.</p><button className="button" onClick={() => onDashboard(role)}>Go to {role === 'trainer' ? 'Trainer' : 'Trainee'} Dashboard →</button></div></div>

  return <div className="signup-page"><header className="signup-header"><Logo /><div>Already have an account? <button onClick={onLogin}>Sign In</button></div></header><button className="signup-back" onClick={onBack}>← Back to Home</button><div className="signup-layout"><aside className="signup-intro"><span className="eyebrow">CREATE YOUR CAPACITYCONNECT ACCOUNT</span><h1>Start Your<br /><em>Learning Journey</em><br />with CapacityConnect.</h1><p>Create your profile, discover relevant learning opportunities, track your competencies, and connect with the right trainers.</p><div className="signup-benefits"><span>✓ Personalized learning recommendations</span><span>✓ Competency-based development</span><span>✓ Intelligent trainer matching</span><span>✓ Progress and assessment tracking</span></div><small>One connected platform for learning, assessment and capacity development.</small></aside><section className="signup-card"><div className="signup-card-top"><div className="signup-symbol">◇</div><div><h2>Create your account</h2><p>Build your learning and competency profile.</p></div></div><div className="signup-progress">{[['01', 'Account'], ['02', 'Profile'], ['03', 'Skills'], ['04', 'Review']].map(([number, label], index) => <div className={step >= index + 1 ? 'progress-item active' : 'progress-item'} key={number}><span>{number}</span><b>{label}</b>{index < 3 && <i />}</div>)}</div>{step === 1 && <div className="signup-step"><h3>Choose your account type</h3><p className="step-copy">Select how you'll use CapacityConnect.</p><div className="role-options"><RoleOption selected={role === 'trainee'} icon="⌂" title="Trainee" text="Learn, assess your skills, track your progress, and build your competencies." onClick={() => setRole('trainee')} /><RoleOption selected={role === 'trainer'} icon="▣" title="Trainer" text="Create learning content, conduct assessments, mentor trainees, and showcase your expertise." onClick={() => setRole('trainer')} /></div></div>}{step === 2 && <div className="signup-step"><h3>Tell us about yourself</h3><p className="step-copy">Start with the details that identify your profile.</p><div className="field-grid"><Field label="First Name" name="firstName" value={form.firstName} onChange={updateForm} placeholder="Enter your first name" /><Field label="Last Name" name="lastName" value={form.lastName} onChange={updateForm} placeholder="Enter your last name" /><Field label="Email Address" name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" /><Field label="Mobile Number" name="mobile" value={form.mobile} onChange={updateForm} placeholder="Enter your mobile number" /><Field label="Password" name="password" type="password" value={form.password} onChange={updateForm} placeholder="Create a strong password" /><Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateForm} placeholder="Re-enter your password" /></div>{form.password && <div className={`password-strength ${passwordStrong ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak'}`}><span>Password strength: {passwordStrong ? 'Strong' : form.password.length >= 6 ? 'Medium' : 'Weak'}</span><small>8+ characters, one uppercase letter and one number</small></div>}{form.confirmPassword && form.password !== form.confirmPassword && <small className="field-error">Passwords do not match.</small>}</div>}{step === 3 && <div className="signup-step"><h3>{role === 'trainer' ? 'Build your professional profile' : 'Build your learning profile'}</h3><p className="step-copy">Personalize your experience with a few profile details.</p><div className="field-grid"><Field label="Organization / Institution" name="organization" value={form.organization} onChange={updateForm} placeholder="Enter your organization" /><Field label={role === 'trainer' ? 'Designation' : 'Designation / Role'} name="designation" value={form.designation} onChange={updateForm} placeholder="Your current role" />{role === 'trainer' ? <><Field label="Years of Experience" name="experience" value={form.experience} onChange={updateForm} placeholder="e.g. 5 years" /><Field label="Highest Qualification" name="qualification" value={form.qualification} onChange={updateForm} placeholder="e.g. Master's degree" /></> : <Field label="Current Skill Level" name="level" value={form.level} onChange={updateForm} options={['Beginner', 'Intermediate', 'Advanced']} />}</div><h4>{role === 'trainer' ? 'Your expertise' : 'Areas you are interested in'} <span>Select 3 to 10</span></h4><div className="chip-grid">{(role === 'trainer' ? trainerSkills : signupSkills).map((skill) => <button type="button" className={selectedSkills.includes(skill) ? 'chip selected' : 'chip'} onClick={() => toggle(skill, setSelectedSkills, selectedSkills)} key={skill}>{selectedSkills.includes(skill) && '✓ '}{skill}</button>)}</div>{role === 'trainee' && <><h4>Learning goals</h4><div className="chip-grid goals">{learningGoals.map((goal) => <button type="button" className={selectedGoals.includes(goal) ? 'chip selected' : 'chip'} onClick={() => toggle(goal, setSelectedGoals, selectedGoals)} key={goal}>{selectedGoals.includes(goal) && '✓ '}{goal}</button>)}</div></>}</div>}{step === 4 && <div className="signup-step review-step"><h3>Review your account</h3><p className="step-copy">Make sure everything looks right before creating your profile.</p><Review title="ACCOUNT" value={role === 'trainer' ? 'Trainer' : 'Trainee'} onEdit={() => setStep(1)} /><Review title="PERSONAL INFORMATION" value={`${form.firstName} ${form.lastName} · ${form.email}${form.mobile ? ` · ${form.mobile}` : ''}`} onEdit={() => setStep(2)} /><Review title="PROFILE" value={`${form.organization || 'Organization not added'} · ${form.designation || 'Role not added'}`} onEdit={() => setStep(3)} /><div className="review-block"><div><b>COMPETENCIES</b><div className="review-chips">{selectedSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></div><button onClick={() => setStep(3)}>Edit</button></div>{role === 'trainee' && <div className="review-block"><div><b>LEARNING GOALS</b><p>{selectedGoals.length ? selectedGoals.join(' · ') : 'No goals selected'}</p></div><button onClick={() => setStep(3)}>Edit</button></div>}<label className="terms"><input type="checkbox" /> I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</label></div>}<div className="signup-actions">{step > 1 && <button className="button outline" onClick={previous}>← Back</button>}{step < 4 ? <button className="button" disabled={!canContinue} onClick={next}>Continue <b>→</b></button> : <button className="button" onClick={() => setSubmitted(true)}>Create Account <b>→</b></button>}</div></section></div></div>
}

function RoleOption({ selected, icon, title, text, onClick }) { return <button type="button" className={selected ? 'role-option selected' : 'role-option'} onClick={onClick}><span className="role-option-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small><em>✓ {selected ? 'Selected' : 'Select this role'}</em></span></button> }
function Field({ label, name, type = 'text', value, onChange, placeholder, options }) { return <label className="signup-field">{label}{options ? <select name={name} value={value} onChange={onChange}>{options.map((option) => <option key={option}>{option}</option>)}</select> : <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={['firstName', 'lastName', 'email', 'password', 'confirmPassword'].includes(name)} />}</label> }
function Review({ title, value, onEdit }) { return <div className="review-block"><div><b>{title}</b><p>{value}</p></div><button onClick={onEdit}>Edit</button></div> }

const dashboardCourses = [
  ['Numerical Weather Prediction', 'Meteorology', 68, 'Dr. Rahul Sharma'],
  ['Python for Data Analysis', 'Data Science', 52, 'Dr. P. Mehta'],
  ['Climate Science Fundamentals', 'Climate Science', 100, 'Dr. R. Verma'],
]
const dashboardSkills = [['Python', 88, 'Strong'], ['Meteorology', 81, 'Strong'], ['Data Analysis', 72, 'Strong'], ['GIS', 54, 'Developing'], ['Machine Learning', 42, 'Needs Attention']]
const dashboardTrainers = [['Dr. Rahul Sharma', 'Meteorology', 'Weather Data Analysis', 'Python', '92%'], ['Dr. R. Verma', 'Climate Science', 'GIS', 'Remote Sensing', '86%'], ['Dr. P. Mehta', 'Data Science', 'Machine Learning', 'Scientific Computing', '81%']]

function TraineeDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [courseTab, setCourseTab] = useState('All')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [search, setSearch] = useState('')
  const openTrainerProfile = () => { window.location.hash = '#trainer-profile' }
  const filteredCourses = dashboardCourses.filter(([title]) => !search || title.toLowerCase().includes(search.toLowerCase())).filter(([, , progress]) => courseTab === 'All' || (courseTab === 'Completed' ? progress === 100 : progress < 100))

  return <div className="trainee-dashboard"><aside className={drawerOpen ? 'dashboard-sidebar open' : 'dashboard-sidebar'}><div className="dashboard-brand"><Logo /><small>TRAINEE PORTAL</small></div><nav className="dashboard-nav">{[['▦', 'Dashboard'], ['▱', 'My Learning'], ['◫', 'Course Catalog'], ['▤', 'Assessments'], ['◎', 'Competencies'], ['♟', 'Trainers'], ['▣', 'Certificates'], ['◌', 'Announcements']].map(([icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label} onClick={label === 'Trainers' ? openTrainerProfile : undefined}><span>{icon}</span>{label}</button>)}<hr />{[['?', 'Help & Support'], ['⚙', 'Settings']].map(([icon, label]) => <button key={label}><span>{icon}</span>{label}</button>)}</nav><div className="sidebar-profile clickable-profile-trigger" onClick={openTrainerProfile} title="View Profile"><div className="avatar">AJ</div><div><strong>Aditya Jaiswal</strong><small>Trainee</small></div><span className="profile-mini-progress"><i /></span><small>Profile 85% complete · Click to view</small></div></aside><div className="dashboard-main"><header className="dashboard-header"><button className="dashboard-menu" onClick={() => setDrawerOpen(!drawerOpen)}>☰</button><div className="dashboard-breadcrumb">Home <span>/</span> <b>Dashboard</b></div><div className="dashboard-header-actions"><label className="dashboard-search">⌕<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses, skills, trainers..." /></label><button className="notification-button" onClick={() => setNoticeOpen(!noticeOpen)}>♧<i>3</i></button><div className="header-user clickable-profile-trigger" onClick={openTrainerProfile} title="View Profile"><div className="avatar">AJ</div><span><strong>Aditya Jaiswal</strong><small>Trainee ↗</small></span></div></div>{noticeOpen && <div className="notification-pop"><b>Notifications</b><span>New course available</span><span>Assessment schedule updated</span><span>Profile is 85% complete</span></div>}</header><main className="dashboard-content"><div className="dashboard-welcome"><div><span className="dashboard-eyebrow">TRAINEE DASHBOARD</span><h1>Good morning, Aditya <em>👋</em></h1><p>Continue your learning journey and strengthen your competencies.</p></div><div className="completion-ring"><strong>85%</strong><small>Profile<br />complete</small></div></div><div className="dashboard-stats"><Stat icon="▱" label="Courses Enrolled" value="06" note="2 completed" /><Stat icon="✓" label="Courses Completed" value="02" note="Keep going" /><Stat icon="◷" label="Learning Hours" value="24.5" suffix="hrs" note="This month" /><Stat icon="◎" label="Competency Score" value="74%" note="+8% this month" /></div><section className="dashboard-feature"><div><span className="section-kicker">CONTINUE LEARNING</span><h2>Numerical Weather Prediction</h2><p className="feature-category">Meteorology · Module 4 of 8</p><div className="feature-progress"><span style={{ width: '68%' }} /></div><div className="feature-meta"><b>68%</b><span>Atmospheric Models · Last accessed 2 hours ago</span></div><button className="button">Continue Learning →</button></div><div className="weather-visual"><span>☁</span><b>ATMOSPHERIC<br />MODELS</b><i>◌</i></div></section><div className="dashboard-grid-two"><section className="dashboard-panel courses-panel"><PanelTitle title="My Courses" subtitle="Your active learning paths" action="View All Courses →" /><div className="dashboard-tabs">{['All', 'In Progress', 'Completed'].map((tab) => <button className={courseTab === tab ? 'active' : ''} onClick={() => setCourseTab(tab)} key={tab}>{tab}</button>)}</div><div className="course-list">{filteredCourses.map(([title, category, progress, instructor]) => <CourseRow title={title} category={category} progress={progress} instructor={instructor} key={title} />)}</div></section><section className="dashboard-panel competency-panel"><PanelTitle title="Your Competency Profile" subtitle="Track strengths and areas to improve" action="View Full Profile →" /><div className="competency-score"><strong>74%</strong><span>Overall competency score</span></div>{dashboardSkills.map(([name, progress, status]) => <div className="skill-row" key={name}><div><b>{name}</b><span className={status === 'Strong' ? 'good' : status === 'Developing' ? 'developing' : 'attention'}>{status}</span><strong>{progress}%</strong></div><span className="skill-track"><i style={{ width: `${progress}%` }} /></span></div>)}</section></div><div className="dashboard-grid-two"><section className="dashboard-panel gap-panel"><PanelTitle title="Areas to Improve" subtitle="A focused next step for your growth" /><div className="gap-highlight"><div className="gap-icon">✦</div><div><h3>Machine Learning</h3><p>Current <b>42%</b> <span>→</span> Target <b>70%</b></p><div className="gap-track"><i /></div></div></div><p className="gap-note">Improving this competency can unlock more advanced learning opportunities.</p><button className="text-button">Improve This Skill →</button></section><section className="dashboard-panel recommendations-panel"><PanelTitle title="Recommended for You" subtitle="Based on your interests and progress" action="Explore More Courses →" /><div className="recommendation-list"><Recommendation icon="◈" title="Weather Data Analysis" level="Intermediate" time="4.5 hrs" match="92%" /><Recommendation icon="▥" title="Climate Data Visualization" level="Intermediate" time="3.2 hrs" match="87%" /><Recommendation icon="◇" title="Python for Scientific Computing" level="Advanced" time="6.5 hrs" match="81%" /></div></section></div><div className="dashboard-grid-two"><section className="dashboard-panel trainers-panel"><PanelTitle title="Recommended Trainers" subtitle="Connect with trainers who match your goals" action="View All Trainers →" /><div className="trainer-list">{dashboardTrainers.map(([name, one, two, three, match]) => <div className="trainer-row" key={name} style={{ cursor: 'pointer' }} onClick={openTrainerProfile}><div className="trainer-avatar">{name.split(' ').slice(-2).map((part) => part[0]).join('')}</div><div><h3>{name}</h3><p>{one} · {two}</p><div className="trainer-tags"><span>{three}</span><span>Competency Match</span></div></div><strong>{match}</strong><button className="text-button" onClick={(e) => { e.stopPropagation(); openTrainerProfile(); }}>View Profile</button></div>)}</div></section><section className="dashboard-panel assessments-panel"><PanelTitle title="Upcoming Assessments" subtitle="Stay on top of your learning goals" action="View All →" />{[['Python Fundamentals', '15 Questions', 'Due Tomorrow', 'Due Soon'], ['Weather Data Analysis', '20 Questions', 'Due 15 Sep', 'Upcoming'], ['GIS Basics', '10 Questions', 'Due 18 Sep', 'Upcoming']].map(([title, questions, due, status]) => <div className="assessment-row" key={title}><span className="assessment-icon">▤</span><div><b>{title}</b><small>{questions} · {due}</small></div><em className={status === 'Due Soon' ? 'due' : ''}>{status}</em></div>)}</section></div><div className="dashboard-bottom-grid"><section className="dashboard-panel activity-panel"><PanelTitle title="Learning Activity" subtitle="Your learning activity over the past week" /><div className="activity-total"><strong>12.5 hrs</strong><span>+18% from last week</span></div><div className="bar-chart">{[['Mon', 45], ['Tue', 66], ['Wed', 37], ['Thu', 82], ['Fri', 58], ['Sat', 72], ['Sun', 49]].map(([day, height]) => <div key={day}><i style={{ height: `${height}%` }} /><small>{day}</small></div>)}</div></section><section className="dashboard-panel achievements-panel"><PanelTitle title="Achievements" action="View Certificates →" />{['Python Fundamentals', 'Weather Data Analysis', 'Climate Science Basics'].map((item) => <div className="achievement-row" key={item}><span>✧</span><b>{item}</b><small>Completed</small></div>)}</section><section className="dashboard-panel announcements-panel"><PanelTitle title="Announcements" action="View All →" />{[['New course available', 'Advanced Weather Data Analysis', '2 hours ago'], ['Assessment schedule updated', 'Python Fundamentals', 'Yesterday'], ['New learning resources added', 'Remote Sensing', '2 days ago']].map(([title, detail, time]) => <div className="announcement-row" key={title}><span>◌</span><div><b>{title}</b><small>{detail}</small></div><time>{time}</time></div>)}</section></div></main></div></div>
}

function TrainerDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [navSection, setNavSection] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [activeModal, setActiveModal] = useState(null)
  const [selectedTrainee, setSelectedTrainee] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  // Sub-feature states
  const [courses, setCourses] = useState(initialCourses)
  const [trainees, setTrainees] = useState(initialTrainees)
  const [assessments, setAssessments] = useState(initialAssessments)
  const [competencies, setCompetencies] = useState(initialCompetencies)
  const [contentList, setContentList] = useState(initialContent)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [feedbackList, setFeedbackList] = useState(initialFeedback)

  const openTrainerProfile = () => { window.location.hash = '#trainer-profile' }

  const showToast = (msg) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3800)
  }

  const handleActionSuccess = (msg, newItem, type) => {
    if (newItem && type === 'course') setCourses([newItem, ...courses])
    if (newItem && type === 'assessment') setAssessments([newItem, ...assessments])
    if (newItem && type === 'announcement') setAnnouncements([newItem, ...announcements])
    if (newItem && type === 'content') setContentList([newItem, ...contentList])
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
          <Logo />
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
        </nav>
        <div className="trainer-profile clickable-profile-trigger" onClick={openTrainerProfile} title="Click to view Dr. Rahul Sharma's Trainer Profile">
          <div className="trainer-avatar large">RS</div>
          <div>
            <strong>Dr. Rahul Sharma</strong>
            <small>Senior Meteorologist</small>
            <small className="profile-badge-link">Trainer (View Profile ↗)</small>
          </div>
          <span className="trainer-complete"><i /></span>
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
          {/* 1. Dashboard Main Overview */}
          {navSection === 'Dashboard' && (
            <div>
              <div className="trainer-welcome">
                <div>
                  <span className="trainer-kicker">TRAINER WORKSPACE</span>
                  <h1>Good morning, Dr. Sharma <em>👋</em></h1>
                  <p>Monitor your trainees, manage learning experiences and improve competency outcomes.</p>
                </div>
                <div className="quick-actions">
                  <button className="button" onClick={() => setActiveModal('create-course')}>+ Create Course</button>
                  <button className="button outline" onClick={() => setActiveModal('create-assessment')}>+ Create Assessment</button>
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
                    <button className="button outline small" onClick={() => setNavSection('My Courses')}>View All Courses →</button>
                    <button className="button small" onClick={() => setActiveModal('create-course')}>+ Create Course</button>
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
                  <button className="button outline small" onClick={() => setActiveModal('create-assessment')}>+ Create Assessment</button>
                </section>
              </div>
            </div>
          )}

          {/* 2. My Courses View */}
          {navSection === 'My Courses' && (
            <TrainerCoursesView
              courses={courses}
              onOpenModal={setActiveModal}
              onSelectCourse={(c) => console.log(c)}
            />
          )}

          {/* 3. Trainees View */}
          {navSection === 'Trainees' && (
            <TrainerTraineesView
              trainees={trainees}
              onOpenModal={setActiveModal}
              onSelectTrainee={setSelectedTrainee}
            />
          )}

          {/* 4. Assessments View */}
          {navSection === 'Assessments' && (
            <TrainerAssessmentsView
              assessments={assessments}
              onOpenModal={setActiveModal}
            />
          )}

          {/* 5. Competencies View */}
          {navSection === 'Competencies' && (
            <TrainerCompetenciesView
              competencies={competencies}
            />
          )}

          {/* 6. Content Library View */}
          {navSection === 'Content' && (
            <TrainerContentView
              contentList={contentList}
              onOpenModal={setActiveModal}
            />
          )}

          {/* 7. Announcements View */}
          {navSection === 'Announcements' && (
            <TrainerAnnouncementsView
              announcements={announcements}
              onOpenModal={setActiveModal}
            />
          )}

          {/* 8. Feedback View */}
          {navSection === 'Feedback' && (
            <TrainerFeedbackView
              feedbackList={feedbackList}
              onHelpful={showToast}
            />
          )}

          {/* 9. Analytics View */}
          {navSection === 'Analytics' && (
            <TrainerAnalyticsView
              analytics={initialAnalytics}
            />
          )}

          {/* 10. Help & Support View */}
          {navSection === 'Help & Support' && (
            <TrainerSupportView
              faqs={initialFaqs}
            />
          )}

          {/* 11. Settings View */}
          {navSection === 'Settings' && (
            <TrainerSettingsView
              onSave={showToast}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <TrainerPortalModals
        activeModal={activeModal}
        modalData={selectedTrainee}
        onClose={() => setActiveModal(null)}
        onActionSuccess={handleActionSuccess}
      />

      {/* Floating Toast Notification */}
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
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [period, setPeriod] = useState('30 Days')
  const [modal, setModal] = useState(null)
  return <div className="admin-dashboard"><aside className={drawerOpen ? 'admin-sidebar open' : 'admin-sidebar'}><div className="admin-brand"><Logo /><small>ADMIN PORTAL</small></div><nav className="admin-nav">{[['▦', 'Dashboard'], ['▱', 'Courses'], ['▤', 'Assessments'], ['▣', 'Learning Content'], ['♟', 'Trainees'], ['♙', 'Trainers'], ['◎', 'Competencies'], ['◇', 'Trainer Matching'], ['▥', 'Analytics'], ['◌', 'Announcements'], ['✧', 'Feedback'], ['▤', 'Reports'], ['▰', 'Certificates'], ['⌁', 'Audit Log'], ['⚙', 'Settings']].map(([icon, label], index) => <button className={index === 0 ? 'active' : ''} key={label}><span>{icon}</span>{label}</button>)}</nav><div className="admin-profile"><div className="admin-avatar">AD</div><div><strong>Admin Workspace</strong><small>Administrator</small></div><button onClick={onBack}>Logout</button></div></aside><div className="admin-main"><header className="admin-header"><button className="admin-menu" onClick={() => setDrawerOpen(!drawerOpen)}>☰</button><div><b>Dashboard</b><small>Monitor learning activity and institutional performance.</small></div><div className="admin-header-actions"><label className="admin-search">⌕<input placeholder="Search anything..." /></label><button className="admin-notification" onClick={() => setNoticeOpen(!noticeOpen)}>♧<i>5</i></button><div className="admin-avatar">AD</div></div>{noticeOpen && <div className="admin-notice"><b>Notifications</b><span>12 competency gaps need attention</span><span>3 trainer approvals pending</span><span>New feedback received</span></div>}</header><main className="admin-content"><div className="admin-welcome"><div><span>ADMIN OVERVIEW</span><h1>Good morning, Admin <em>👋</em></h1><p>Monitor learning activity, workforce competencies and institutional capacity growth.</p></div><div className="admin-actions"><button className="button" onClick={() => setModal('Add Trainee')}>+ Add Trainee</button><button className="button outline" onClick={() => setModal('Add Trainer')}>+ Add Trainer</button><button className="button outline" onClick={() => setModal('Create Course')}>+ Create Course</button></div></div><div className="admin-kpis"><AdminKpi icon="♟" label="Total Trainees" value="2,486" change="+12.4%" /><AdminKpi icon="♙" label="Active Trainers" value="148" change="+8 this month" /><AdminKpi icon="▱" label="Active Courses" value="64" change="12 currently running" /><AdminKpi icon="▤" label="Assessments" value="186" change="24 scheduled" /><AdminKpi icon="◎" label="Avg. Competency Score" value="74.8%" change="+5.2%" /></div><div className="admin-primary-grid"><section className="admin-panel activity-admin"><AdminTitle title="Platform Learning Activity" subtitle="Learning activity across the institution" action={<select value={period} onChange={(event) => setPeriod(event.target.value)}><option>7 Days</option><option>30 Days</option><option>6 Months</option><option>1 Year</option></select>} /><div className="admin-chart"><div className="admin-chart-bars">{[52,67,48,75,61,84,72,91].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}</div><div className="admin-chart-labels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></div><div className="activity-admin-metrics"><span><b>12,840</b><small>Total Learning Hours</small></span><span><b>78.4%</b><small>Course Completion</small></span><span><b>81.2%</b><small>Avg. Assessment Score</small></span></div></section><section className="admin-panel competency-health"><AdminTitle title="Institutional Competency Health" subtitle="Current average across active learners" />{adminCompetencies.map(([name, score]) => <div className="admin-health-row" key={name}><div><b>{name}</b><strong>{score}%</strong></div><span><i style={{ width: `${score}%` }} /></span></div>)}<button className="text-button">View Competency Analytics →</button></section></div><div className="admin-primary-grid"><section className="admin-panel gap-alerts"><AdminTitle title="Competency Gaps Requiring Attention" subtitle="Prioritize institutional learning actions" />{[['Machine Learning','47%','75%','28%','126'],['Remote Sensing','54%','75%','21%','94'],['GIS','61%','75%','14%','72']].map(([name,current,target,gap,affected]) => <div className="gap-alert-row" key={name}><span className="gap-alert-icon">!</span><div><b>{name}</b><small>Current {current} · Target {target} · <strong>Gap {gap}</strong></small></div><em>{affected} trainees</em><button className="text-button" onClick={() => setModal(`View ${name} Gap`)}>View Gap</button></div>)}</section><section className="admin-panel top-trainers"><AdminTitle title="Top Performing Trainers" action="View All Trainers" />{adminTrainers.map(([name, expertise, score, trained]) => <div className="top-trainer-row" key={name}><div className="admin-avatar">{name.split(' ').slice(-2).map((part) => part[0]).join('')}</div><div><b>{name}</b><small>{expertise} · {trained}</small></div><strong>{score}<small>success</small></strong></div>)}</section></div><div className="admin-primary-grid"><section className="admin-panel admin-table-panel"><AdminTitle title="Course Performance" subtitle="Compare course outcomes at a glance" /><div className="admin-table"><div className="admin-table-head"><span>Course</span><span>Enrolled</span><span>Completion</span><span>Avg Score</span><span>Status</span></div>{adminCourses.map(([course,enrolled,completion,score,status]) => <div className="admin-table-row" key={course}><b>{course}</b><span>{enrolled}</span><span>{completion}</span><span>{score}</span><em className={status === 'Needs Attention' ? 'warning' : 'good'}>{status}</em></div>)}</div></section><section className="admin-panel matching-panel"><AdminTitle title="Intelligent Trainer Matching" subtitle="Static demo recommendation" /><div className="matching-course"><small>COURSE</small><b>Weather Data Analysis</b><span>Python · Statistics · Meteorology</span></div><div className="matching-result"><div className="admin-avatar">RS</div><div><b>Dr. Rahul Sharma</b><small>Weather Data Analysis · 8 years</small></div><strong>92%<small>Competency Match</small></strong></div><div className="match-ring">92%</div><button className="button" onClick={() => setModal('Assign Trainer')}>Assign Trainer →</button></section></div><div className="admin-bottom-grid"><section className="admin-panel admin-timeline"><AdminTitle title="Recent Activity" action="View All" />{['New trainer approved · 5 minutes ago','Course “GIS Advanced” published · 32 minutes ago','Assessment created · 1 hour ago','24 trainees enrolled · 2 hours ago','Announcement published · Yesterday'].map((item, index) => <div key={item}><span>{['✓','▱','▤','♟','◌'][index]}</span><p>{item}</p></div>)}</section><section className="admin-panel admin-announcements"><AdminTitle title="Announcements" action="View All →" />{['New Climate Analytics Course','Assessment Schedule Updated','Trainer Workshop Registration'].map((item, index) => <div key={item}><b>{item}</b><small>Posted {index === 0 ? '2 hours ago' : index === 1 ? 'yesterday' : '3 days ago'}</small></div>)}<button className="button outline small" onClick={() => setModal('Create Announcement')}>+ Create Announcement</button></section><section className="admin-panel admin-action-panel"><AdminTitle title="Quick Actions" /><button className="button" onClick={() => setModal('Create Course')}>+ Create Course</button><button className="button outline" onClick={() => setModal('Create Assessment')}>+ Create Assessment</button><button className="button outline" onClick={() => setModal('Generate Report')}>Generate Report</button></section></div></main></div>{modal && <div className="admin-modal-backdrop" onClick={() => setModal(null)}><div className="admin-modal" onClick={(event) => event.stopPropagation()}><button onClick={() => setModal(null)}>×</button><span>◇</span><h2>{modal}</h2><p>Frontend-only prototype action. This workflow will connect to backend services in a future implementation.</p><button className="button" onClick={() => setModal(null)}>Got it</button></div></div>}</div>
}

function AdminKpi({ icon, label, value, change }) { return <article className="admin-kpi"><span>{icon}</span><small>{label}</small><strong>{value}</strong><p>{change}</p><i /></article> }
function AdminTitle({ title, subtitle, action }) { return <div className="admin-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{typeof action === 'string' ? <button className="text-button">{action} →</button> : action}</div> }

function TrainerStat({ icon, label, value, note }) { return <article className="trainer-stat"><span>{icon}</span><small>{label}</small><strong>{value}</strong><p>{note}</p></article> }
function TrainerPanelTitle({ title, subtitle, action }) { return <div className="trainer-panel-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-button">{action}</button>}</div> }
function Attention({ name, course, progress, score, skill }) { return <div className="attention-row"><div className="trainer-avatar">{name.split(' ').map((part) => part[0]).join('')}</div><div><b>{name}</b><small>{course}</small><p>Progress <strong>{progress}</strong> · Assessment <strong>{score}</strong></p><em>{skill}</em></div><button className="text-button">View →</button></div> }
function Stat({ icon, label, value, suffix, note }) { return <article className="stat-card"><span>{icon}</span><small>{label}</small><strong>{value} <em>{suffix}</em></strong><p>{note}</p></article> }
function PanelTitle({ title, subtitle, action }) { return <div className="panel-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-button">{action}</button>}</div> }
function CourseRow({ title, category, progress, instructor }) { return <div className="course-row"><span className="course-cover">{progress === 100 ? '✓' : '◈'}</span><div><h3>{title}</h3><p>{category} · {instructor}</p><span className="course-track"><i style={{ width: `${progress}%` }} /></span></div><strong>{progress}%</strong><button className="text-button">{progress === 100 ? 'View' : 'Continue'}</button></div> }
function Recommendation({ icon, title, level, time, match }) { return <div className="recommendation-row"><span>{icon}</span><div><b>{title}</b><small>{level} · {time}</small></div><strong>{match}<small>relevance</small></strong></div> }

export default App
