import React, { useState, useEffect } from 'react'
import './ForgotPasswordPage.css'
import illustrationImg from '../../assets/forgot-illustration.jpg'

export default function ForgotPasswordPage({ onBack }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [seconds, setSeconds] = useState(30)

  useEffect(() => {
    if (!sent || seconds === 0) return undefined
    const timer = window.setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [sent, seconds])

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailTrimmed = email.trim()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailTrimmed) {
      setError('Please enter your institutional email address.')
      return
    }
    if (!emailRegex.test(emailTrimmed)) {
      setError('Please enter a valid email format containing "@" and domain (e.g., name@imd.gov.in).')
      return
    }
    setError('')
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setSeconds(30)
    }, 800)
  }

  const handleResend = () => {
    if (seconds === 0) {
      setSending(true)
      setTimeout(() => {
        setSending(false)
        setSeconds(30)
      }, 600)
    }
  }

  return (
    <div className="cc-forgot-container">
      {/* Ambient background decoration */}
      <div className="cc-bg-wave-left" aria-hidden="true" />
      <div className="cc-bg-wave-right" aria-hidden="true" />
      <div className="cc-dot-matrix cc-dots-top-left" aria-hidden="true" />
      <div className="cc-dot-matrix cc-dots-top-right" aria-hidden="true" />

      {/* Top Navigation Bar */}
      <header className="cc-header">
        <div className="cc-brand">
          <div className="cc-logo-icon">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="3" width="13" height="13" rx="2.5" transform="rotate(45 10 3)" stroke="#162D20" strokeWidth="2.5" />
              <rect x="19" y="12" width="13" height="13" rx="2.5" transform="rotate(45 19 12)" stroke="#2F5B3C" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="cc-brand-title">
            <span className="cc-brand-main">Capacity</span> <span className="cc-brand-accent">Connect</span>
          </div>
          <div className="cc-brand-divider">|</div>
          <div className="cc-brand-tagline">
            Learn &bull; Grow &bull; Build Together
          </div>
        </div>

        <button type="button" className="cc-back-link" onClick={onBack}>
          <span className="cc-back-arrow">←</span> Back to sign in
        </button>
      </header>

      {/* Main Content Area */}
      <main className="cc-main-layout">
        {/* Left Section: Value Proposition & Brand Assurance */}
        <section className="cc-left-pane">
          <div className="cc-kicker">ACCOUNT RECOVERY</div>
          
          <h1 className="cc-heading">
            Build skills.<br />
            Strengthen <span className="cc-serif-italic">competencies.</span><br />
            Empower people.
          </h1>

          <p className="cc-subtext">
            Your learning journey is always within reach — resetting your password only takes a minute.
          </p>

          <div className="cc-features-list">
            {/* Feature 1 */}
            <div className="cc-feature-item">
              <div className="cc-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div className="cc-feature-content">
                <h3>Secure recovery</h3>
                <p>Your data stays safe.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="cc-feature-item">
              <div className="cc-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="cc-feature-content">
                <h3>Verified by email</h3>
                <p>We'll send you a secure link.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="cc-feature-item">
              <div className="cc-feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className="cc-feature-content">
                <h3>Back to learning in minutes</h3>
                <p>Get back to what matters.</p>
              </div>
            </div>
          </div>

          {/* Testimonial / Quote Banner */}
          <div className="cc-quote-banner">
            <span className="cc-quote-glyph">“</span>
            <div className="cc-quote-body">
              <p className="cc-quote-line1">Learning today.</p>
              <p className="cc-quote-line2">A stronger tomorrow.</p>
              <div className="cc-quote-divider" />
              <p className="cc-quote-org">Capacity Connect</p>
            </div>
          </div>
        </section>

        {/* Center Section: Workspace Illustration & Interactive Learning Badges */}
        <section className="cc-center-pane">
          <div className="cc-illustration-wrapper">
            {/* Note Memo Card with curved pointer */}
            <div className="cc-memo-card">
              <div className="cc-memo-clip" />
              <p className="cc-memo-text">
                Same Account.<br />
                <em>Greater Possibilities.</em>
              </p>
              <svg className="cc-memo-arrow" width="48" height="40" viewBox="0 0 48 40" fill="none">
                <path d="M 12 5 C 18 20, 24 26, 40 32" stroke="#6C8775" strokeWidth="1.6" strokeDasharray="3 3" />
                <polyline points="34,34 42,32 38,25" stroke="#6C8775" strokeWidth="1.6" fill="none" />
              </svg>
            </div>

            {/* Center Visual Art */}
            <div className="cc-artwork-container">
              <img 
                src={illustrationImg} 
                alt="Capacity Connect Learning Workspace" 
                className="cc-illustration-img"
              />

              {/* Learning Journey Floating Badges */}
              <div className="cc-badge-stack">
                <div className="cc-badge-pill">
                  <span className="cc-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                  </span>
                  <span className="cc-badge-label">Learn</span>
                </div>

                <div className="cc-badge-pill">
                  <span className="cc-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  </span>
                  <span className="cc-badge-label">Practice</span>
                </div>

                <div className="cc-badge-pill">
                  <span className="cc-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </span>
                  <span className="cc-badge-label">Grow</span>
                </div>

                <div className="cc-badge-pill">
                  <span className="cc-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M4 22h16"/>
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34"/>
                      <path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                    </svg>
                  </span>
                  <span className="cc-badge-label">Succeed</span>
                </div>
              </div>
            </div>

            {/* Bottom Progress Flourish */}
            <div className="cc-bottom-flourish">
              <span className="cc-flourish-text">People</span>
              <span className="cc-flourish-cross">×</span>
              <span className="cc-flourish-text">Learning</span>
              <span className="cc-flourish-cross">×</span>
              <span className="cc-flourish-text">Progress</span>
              <span className="cc-flourish-arrow">⟶</span>
            </div>
          </div>
        </section>

        {/* Right Section: Forgot Password Reset Card */}
        <section className="cc-right-pane">
          <div className="cc-reset-card">
            {/* Lock Icon */}
            <div className="cc-lock-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#254331" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            {sent ? (
              <div className="cc-sent-success">
                <div className="cc-success-tick">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E5C3B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="cc-card-title">Check your inbox</h2>
                <p className="cc-card-desc">
                  We've sent a password reset link to your registered email address.
                </p>

                <div className="cc-email-receipt">
                  <span className="cc-receipt-label">Sent to:</span>
                  <span className="cc-receipt-value">{email}</span>
                </div>

                <div className="cc-resend-wrap">
                  <span className="cc-resend-note">Didn't receive the email?</span>
                  <button
                    type="button"
                    className="cc-resend-btn"
                    onClick={handleResend}
                    disabled={seconds > 0 || sending}
                  >
                    {sending ? 'Sending...' : seconds > 0 ? `Resend in ${seconds}s` : 'Resend link'}
                  </button>
                </div>

                <button type="button" className="cc-btn-primary cc-btn-full" onClick={onBack}>
                  Return to Sign In
                </button>
              </div>
            ) : (
              <>
                <h2 className="cc-card-title">Forgot your password?</h2>
                <p className="cc-card-desc">
                  Enter your registered email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="cc-reset-form" noValidate>
                  <div className="cc-form-group">
                    <label htmlFor="recovery-email" className="cc-input-label">
                      Email address
                    </label>
                    <div className={`cc-input-wrapper ${error ? 'has-error' : ''}`}>
                      <span className="cc-input-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#75887C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </span>
                      <input
                        id="recovery-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError('')
                        }}
                        placeholder="Enter your email address"
                        className="cc-text-input"
                        autoComplete="email"
                        autoFocus
                      />
                    </div>
                    {error && (
                      <p className="cc-error-message" role="alert">
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="cc-btn-primary cc-btn-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <span className="cc-loading-row">
                        <span className="cc-spinner" /> Sending reset link...
                      </span>
                    ) : (
                      <span>Send reset link →</span>
                    )}
                  </button>
                </form>

                <div className="cc-card-footer">
                  <span className="cc-footer-muted">Remember your password? </span>
                  <button type="button" className="cc-footer-link" onClick={onBack}>
                    Back to sign in
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Bottom Right Brand Mission Tag */}
      <footer className="cc-bottom-footer">
        <div className="cc-footer-tagline">
          <span className="cc-leaf-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#386B49">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
            </svg>
          </span>
          <span className="cc-footer-text">
            Building capable people for a better tomorrow.
          </span>
        </div>
      </footer>
    </div>
  )
}
