import { useState } from 'react'
import './App.css'

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

  if (showLogin) return <LoginPage onBack={() => setShowLogin(false)} />

  return (
    <div id="top">
      <header className="site-header shell"><Logo /><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button><nav className={menuOpen ? 'nav open' : 'nav'}><div className="nav-links"><a className="active" href="#top">Home</a><a href="#features">Learn</a><a href="#how">How It Works</a><a href="#roles">For Institutions</a><a href="#about">About Us</a></div><button className="button small nav-cta" onClick={() => setShowLogin(true)}><span>Get Started</span><b>→</b></button></nav></header>
      <main>
        <section className="hero shell"><div className="hero-copy"><div className="eyebrow">✦ An initiative under MoES | IMD</div><h1>Build Skills. Strengthen<br />Competencies. <em>Empower People.</em></h1><p>CapacityConnect is a unified digital platform for capacity building, learning, assessments and intelligent trainer matching for a future-ready workforce.</p><div className="actions"><a className="button" href="#get-started">Get Started Now <b>→</b></a><a className="button outline" href="#features">Explore Platform</a></div><div className="trust-row"><span>♧ <b>Secure & Reliable</b><small>Institutional Grade</small></span><span>♧ <b>Role-Based Access</b><small>Trainer · Trainee · Admin</small></span><span>♧ <b>Data-Driven Insights</b><small>Track · Assess · Improve</small></span><span>♧ <b>Scalable & Flexible</b><small>Built for Institutions</small></span></div></div><div className="product-preview"><div className="preview-top"><span className="logo-mark">◇</span><b>Welcome back, Rahul! 👋</b><small>Let's continue your learning journey.</small></div><div className="preview-body"><aside><strong>▣ Dashboard</strong><span>▱ My Learning</span><span>◫ Courses</span><span>▤ Assessments</span><span>♙ Profile</span><span>⌁ Analytics</span><span>▰ Messages</span><span>⚙ Settings</span></aside><div className="dashboard"><div className="dash-grid"><div className="dash-card progress"><small>Learning Progress</small><div className="ring">72%</div><p>12 Courses Enrolled<br />8 Courses Completed<br />24 Assessments Taken</p></div><div className="dash-card score"><small>Competency Score</small><strong>85<span>/100</span></strong><i>Advanced</i><MiniChart /></div></div><div className="recommend"><small>Recommended for You</small><div className="rec-items"><span>Advanced<br />Meteorology <b>98% Match</b></span><span>Python for<br />Data Analysis <b>90% Match</b></span><span>Climate Data<br />Visualization <b>78% Match</b></span></div></div></div></div></div></section>
        <div className="institution-strip shell"><b>Trusted by Government Institutions</b><span>◈ Designed for<br />Institutional Use</span><span>♟ Role-Based<br />Access Control</span><span>▣ Secure Data<br />Architecture</span><span>◉ SIH 2026<br />Prototype</span><span className="india">◒ Digital India</span></div>
        <section id="features" className="section shell"><SectionHeading title="Everything You Need for" accent="Smarter Capacity Building" /><div className="feature-grid">{features.map(([number, title, body, icon]) => <article className="feature-card" key={number}><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <section id="how" className="section process-section"><div className="shell"><SectionHeading title="From Skills to the" accent="Right Trainer" /><p className="section-subtitle">Our intelligent engine matches competencies with the most suitable trainers</p><div className="process"><Step icon="▤" title="Course Requirements" text="Course defines the skills and knowledge needed" /><Step icon="◈" title="Required Competencies" text="Extract and map core competencies" /><Step icon="✣" title="Trainer Database" text="Search in verified trainer competency profiles" /><Step icon="◇" title="Intelligent Matching Engine" text="AI matches competencies with best-fit trainers" /><Step icon="♟" title="Recommended Trainers" text="Get the best matched trainers with match score" /></div></div></section>
        <section className="section shell"><SectionHeading title="How" accent="CapacityConnect Works" /><div className="works-grid">{[['01', 'Create Profile', 'Sign up as Trainee or Trainer and build your competency profile.'], ['02', 'Discover & Enroll', 'Extract courses and learning programs that match your interests and goals.'], ['03', 'Learn & Assess', 'Access content, learn at your pace and take assessments to test your skills.'], ['04', 'Improve & Grow', 'Get insights, close your gaps and grow your competencies continuously.']].map(([num, title, text]) => <article className="work-card" key={num}><b>{num}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section id="roles" className="section shell"><SectionHeading title="Built for" accent="Every Role" /><div className="role-grid">{roles.map(role => <article className={`role-card ${role.color}`} key={role.title}><div className="role-icon">{role.icon}</div><h3>{role.title}</h3><ul>{role.items.map(item => <li key={item}>✓ {item}</li>)}</ul><a className="button role-button" href="#get-started">{role.action} →</a></article>)}</div></section>
        <section className="impact-section shell"><SectionHeading title="Driving Impact Through" accent="Effective Capacity Building" /><div className="impact-grid">{impacts.map(([icon, title, text]) => <article className="impact-card" key={title}><div className="impact-icon">{icon}</div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
        <section id="get-started" className="cta shell"><div><h2>Ready to Build a <em>Smarter</em> Learning Ecosystem?</h2><p>Bring learning, competency development and training management into one connected platform.</p><div className="actions"><a className="button" href="#top">Get Started Now →</a><a className="button outline" href="#features">Explore Platform</a></div></div><div className="journey"><b>Your Growth Journey Starts Here</b><span>✓ Personalized Learning</span><span>✓ Skill Development</span><span>✓ Competency Mastery</span><span>✓ Career Advancement</span></div></section>
      </main><footer className="footer shell"><Logo /><span>© 2026 CapacityConnect. All rights reserved.</span><div><b>Platform</b><small>Courses<br />Assessments<br />Trainer Directory</small></div><div><b>Resources</b><small>Help Center<br />User Guides<br />FAQs</small></div><div><b>For Institutions</b><small>Institutional Login<br />Request Demo<br />API Access</small></div><div><b>Legal</b><small>Privacy Policy<br />Terms of Use<br />Accessibility</small></div></footer>
    </div>
  )
}

function SectionHeading({ title, accent }) { return <h2 className="section-heading">{title} <em>{accent}</em></h2> }
function Step({ icon, title, text }) { return <div className="step"><div className="step-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div> }

function LoginPage({ onBack }) {
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return <div className="login-page"><div className="login-shell"><button className="back-home" onClick={onBack}>← Back to home</button><div className="login-layout"><div className="login-intro"><Logo /><div className="eyebrow">✦ Welcome to CapacityConnect</div><h1>Build your next chapter with <em>confidence.</em></h1><p>Continue your learning journey, track your competencies and connect with the right opportunities.</p><div className="login-points"><span>✓ Personalized learning paths</span><span>✓ Verified trainer network</span><span>✓ Progress that moves with you</span></div></div><form className="login-card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><div className="login-card-heading"><span className="login-symbol">◇</span><div><h2>Welcome back</h2><p>Sign in to your learning workspace</p></div></div>{submitted ? <div className="login-success"><strong>You're signed in!</strong><p>Your CapacityConnect workspace is ready to explore.</p><button type="button" className="button" onClick={onBack}>Continue to home →</button></div> : <><label>Account type<select defaultValue="Trainee"><option>Trainee</option><option>Trainer</option><option>Administrator</option></select></label><label>Email address<input type="email" placeholder="you@example.com" required /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? '◉' : '◌'}</button></div></label><div className="form-row"><label className="check-label"><input type="checkbox" /> Remember me</label><a href="#forgot">Forgot password?</a></div><button className="button login-submit" type="submit">Sign In <b>→</b></button><p className="signup-text">New to CapacityConnect? <a href="#get-started">Create an account</a></p></>}</form></div></div></div>
}

export default App
