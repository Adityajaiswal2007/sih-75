import React, { useState } from 'react'
import './LoginPage.css'
import signinIllustration from '../../assets/signin-illustration.jpg'
import ForgotPasswordPage from '../forgot-password/ForgotPasswordPage'
import SignupPage from '../signup/SignupPage'
import { api } from '../../services/api'

// Demo accounts for instant preview/testing
const DEMO_ACCOUNTS = {
  trainee: {
    email: 'ananya.verma@imd.gov.in',
    password: 'DemoPassword123!',
    role: 'trainee'
  },
  trainer: {
    email: 'dr.priya.nair@imd.gov.in',
    password: 'DemoPassword123!',
    role: 'trainer'
  },
  admin: {
    email: 'admin.directorate@imd.gov.in',
    password: 'DemoPassword123!',
    role: 'admin'
  }
}

export default function LoginPage({ onBack, onDashboard, initialRole = 'trainee', initialView = 'login' }) {
  const [email, setEmail] = useState(() => (initialRole && DEMO_ACCOUNTS[initialRole] ? DEMO_ACCOUNTS[initialRole].email : ''))
  const [password, setPassword] = useState(() => (initialRole && DEMO_ACCOUNTS[initialRole] ? DEMO_ACCOUNTS[initialRole].password : ''))
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showForgot, setShowForgot] = useState(initialView === 'forgot')
  const [showSignup, setShowSignup] = useState(initialView === 'signup')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailTrimmed = email.trim()
    const passwordTrimmed = password.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailTrimmed) {
      setErrorMessage('Please enter your institutional email address.')
      return
    }

    if (!emailRegex.test(emailTrimmed)) {
      setErrorMessage('Please enter a valid email address containing "@" and domain (e.g., name@imd.gov.in).')
      return
    }

    if (!passwordTrimmed) {
      setErrorMessage('Please enter your account password.')
      return
    }

    setErrorMessage('')
    setLoading(true)

    // Detect role from email or target role
    let resolvedRole = initialRole
    const lowerEmail = emailTrimmed.toLowerCase()
    if (lowerEmail.includes('admin') || lowerEmail.includes('directorate')) {
      resolvedRole = 'admin'
    } else if (lowerEmail.includes('trainer') || lowerEmail.includes('priya') || lowerEmail.includes('dr.') || lowerEmail.includes('rahul') || lowerEmail.includes('neha') || lowerEmail.includes('faculty')) {
      resolvedRole = 'trainer'
    } else {
      resolvedRole = 'trainee'
    }

    try {
      const res = await api.login({ email: emailTrimmed, password: passwordTrimmed, role: resolvedRole })
      const finalRole = res?.user?.role || resolvedRole || 'trainee'
      setLoading(false)
      onDashboard(finalRole)
    } catch {
      setLoading(false)
      onDashboard(resolvedRole || 'trainee')
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setErrorMessage('')
    try {
      const demoUser = DEMO_ACCOUNTS[initialRole] || DEMO_ACCOUNTS.trainee
      const res = await api.login({ email: demoUser.email, password: demoUser.password, role: initialRole })
      setLoading(false)
      onDashboard(initialRole || res?.user?.role || 'trainee')
    } catch {
      setLoading(false)
      onDashboard(initialRole || 'trainee')
    }
  }

  if (showSignup) {
    return (
      <SignupPage
        onBack={onBack}
        onLogin={() => {
          setShowSignup(false)
          setShowForgot(false)
        }}
        onDashboard={onDashboard}
        initialRole={initialRole === 'admin' ? 'trainer' : initialRole || 'trainer'}
      />
    )
  }

  if (showForgot) {
    return <ForgotPasswordPage onBack={() => setShowForgot(false)} />
  }

  return (
    <div className="signin-page-wrap">
      <div className="signin-page-container">
        {/* Top Header Navigation Bar */}
        <div className="signin-top-nav-bar">
          <button type="button" className="btn-back-home-pill" onClick={onBack}>
            <span className="back-arrow">←</span> Back to Home
          </button>
          <div className="signin-nav-right-actions">
            <div className="signin-slogan-pill">
              <span>Skill Today &nbsp;•&nbsp; Better Tomorrow</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="signin-main-layout">
          {/* LEFT COLUMN: Brand, Headline, Features, Illustration & Quote */}
          <div className="signin-left-showcase">
            {/* Brand Logo Header */}
            <div className="signin-brand-block" onClick={onBack}>
              <div className="signin-logo-icon">🎓</div>
              <div className="signin-logo-text-group">
                <div className="signin-logo-brand">
                  <span className="brand-capacity">Capacity</span>
                  <span className="brand-connect">Connect</span>
                </div>
                <p className="signin-logo-sub">Digital Capacity Building &amp; Learning Portal</p>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="signin-showcase-heading">
              Learn. Assess. Grow.<br />
              <span className="heading-green-accent">Build Your Future.</span>
            </h1>

            {/* Description */}
            <p className="signin-showcase-desc">
              Access personalized learning pathways, assess your skills, track your competency and develop the skills you need for a better tomorrow.
            </p>

            {/* Interactive Grid: Features + Illustration side-by-side */}
            <div className="signin-bottom-grid">
              {/* Left Sub-column: Features + Quote Card */}
              <div className="signin-features-col">
                <div className="signin-feature-card">
                  <div className="feature-icon-square">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                  </div>
                  <div className="feature-text-block">
                    <strong>Skill Gap Analysis</strong>
                    <small>Identify your strengths and areas for improvement</small>
                  </div>
                </div>

                <div className="signin-feature-card">
                  <div className="feature-icon-square">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                  <div className="feature-text-block">
                    <strong>Personalized Learning Path</strong>
                    <small>Get recommended courses based on your goals</small>
                  </div>
                </div>

                <div className="signin-feature-card">
                  <div className="feature-icon-square">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                  <div className="feature-text-block">
                    <strong>Competency Tracking</strong>
                    <small>Track your progress and achieve your learning goals</small>
                  </div>
                </div>

                {/* Quote Card */}
                <div className="signin-quote-card">
                  <div className="quote-mark-symbol">“</div>
                  <div className="quote-content-wrap">
                    <p className="quote-body-text">
                      "Continuous learning leads to brighter opportunities."
                    </p>
                    <div className="quote-author-row">
                      <span className="quote-dash">—</span>
                      <span className="quote-author-name">CapacityConnect</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sub-column: Compact Learner Artwork */}
              <div className="signin-illustration-container">
                <img
                  src={signinIllustration}
                  alt="Student learning with CapacityConnect"
                  className="signin-artwork-img"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sign In Card */}
          <div className="signin-right-card-column">
            <form className="signin-card-surface" onSubmit={handleSubmit}>
              {/* Card Header with Icon Box */}
              <div className="signin-card-header">
                <div className="signin-user-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="signin-card-title-meta">
                  <h2 className="signin-card-heading">Welcome Back</h2>
                  <p className="signin-card-subheading">Sign in to continue your learning journey</p>
                </div>
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div className="signin-alert-box">
                  <span>⚠️</span> {errorMessage}
                </div>
              )}

              {/* Quick Demo Account Selector Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#557060' }}>Quick Demo:</span>
                {[
                  { key: 'trainee', label: 'Trainee' },
                  { key: 'trainer', label: 'Trainer' },
                  { key: 'admin', label: 'Admin' }
                ].map(({ key, label }) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setEmail(DEMO_ACCOUNTS[key].email)
                      setPassword(DEMO_ACCOUNTS[key].password)
                      setErrorMessage('')
                    }}
                    style={{
                      background: email === DEMO_ACCOUNTS[key].email ? '#1B4332' : '#EAF4EE',
                      color: email === DEMO_ACCOUNTS[key].email ? '#FFFFFF' : '#1B4332',
                      border: '1px solid #C4DFC9',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Institutional Email Field */}
              <div className="signin-field-group">
                <label className="signin-field-label">Institutional Email</label>
                <div className="signin-input-wrapper">
                  <span className="field-prefix-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6C8273" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setErrorMessage('')
                    }}
                    placeholder="you@college.edu.in"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="signin-field-group">
                <label className="signin-field-label">Password</label>
                <div className="signin-input-wrapper">
                  <span className="field-prefix-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6C8273" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setErrorMessage('')
                    }}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6C8273" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6C8273" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="signin-options-row">
                <label className="signin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-custom-box" />
                  <span className="checkbox-text">Remember me on this device</span>
                </label>

                <button
                  type="button"
                  className="btn-forgot-password-link"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                className="btn-signin-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="signin-loading-text">
                    <span className="loading-spinner-circle" /> Signing in...
                  </span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="btn-arrow-icon">→</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="signin-or-divider">
                <span className="divider-line" />
                <span className="divider-text">OR</span>
                <span className="divider-line" />
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                className="btn-google-signin"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="google-g-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Create Account Link */}
              <div className="signin-footer-signup-row">
                <span>Don't have an account yet? </span>
                <button
                  type="button"
                  className="btn-create-account-link"
                  onClick={() => setShowSignup(true)}
                >
                  Create an account →
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Right Decorative Footer Tagline */}
        <div className="signin-bottom-tagline">
          <span className="tagline-leaf-icon">🍃</span>
          <span className="tagline-text">Empowering people through learning.</span>
        </div>
      </div>
    </div>
  )
}
