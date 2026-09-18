import React, { useState, useRef } from 'react'
import './SignupPage.css'
import cloverIcon from '../../assets/landing/arcticons-clover0.svg'
import { api } from '../../services/api'

// Preset lists for rich selection
const TRAINER_EXPERTISE_OPTIONS = [
  'Meteorology',
  'Numerical Weather Prediction (NWP)',
  'Radar Meteorology & Doppler Systems',
  'Satellite Remote Sensing',
  'Climate Modeling & Climatology',
  'GIS & Spatial Analytics',
  'Python for Earth Sciences',
  'Atmospheric Dynamics',
  'Machine Learning & AI in Weather',
  'Disaster Management & Early Warning',
  'Oceanography & Marine Forecasts',
  'Hydrometeorology & Flood Modeling'
]

const TRAINER_SKILLS_OPTIONS = [
  'Python',
  'WRF Modeling',
  'Radar Interpretation',
  'QGIS / ArcGIS',
  'Data Visualization',
  'Machine Learning',
  'High-Performance Computing (HPC)',
  'Fortran / C++',
  'NetCDF / GRIB Processing',
  'Synoptic Chart Analysis',
  'Curriculum Design',
  'Mentorship & Evaluation'
]

const TRAINEE_SKILLS_OPTIONS = [
  'Python Basics',
  'General Meteorology',
  'Data Analysis',
  'Excel / Spreadsheets',
  'Mathematics & Calculus',
  'GIS Fundamentals',
  'Linux & Shell Scripting',
  'Statistics & Probability',
  'Basic Physics',
  'Machine Learning Basics',
  'Scientific Reporting',
  'Problem Solving'
]

const TRAINEE_INTERESTS_OPTIONS = [
  'Weather Forecasting & Synoptics',
  'Satellite & Remote Sensing',
  'Climate Science & Global Warming',
  'Numerical Weather Modeling',
  'Radar Systems & Precipitation',
  'AI / ML in Climate Tech',
  'Geospatial Intelligence (GIS)',
  'Hydrology & Flood Tracking',
  'Severe Weather Warnings',
  'Renewable Energy Meteorology'
]

const TRAINEE_GOALS_OPTIONS = [
  'Build Operational Forecasting Skills',
  'Prepare for Government / IMD Exams & Roles',
  'Publish Academic Research Papers',
  'Gain Practical Hands-On Tool Proficiency',
  'Earn Recognized WMO / National Certifications',
  'Get 1-on-1 Mentorship from Senior Faculty',
  'Transition to Climate Data Science'
]

export default function SignupPage({ onBack, onLogin, onDashboard, initialRole = 'trainer' }) {
  const [stage, setStage] = useState('request') // 'request' | 'waiting' | 'approved' | 'rejected'
  const [step, setStep] = useState(1)
  const [role, setRole] = useState(initialRole || 'trainer')
  const [token, setToken] = useState('')
  const [requestEmail, setRequestEmail] = useState('')
  const [requestName, setRequestName] = useState('')
  const [requestOrg, setRequestOrg] = useState('India Meteorological Department (IMD)')
  const [requestRole, setRequestRole] = useState(initialRole || 'trainer')
  const [tokenLookupInput, setTokenLookupInput] = useState('')
  const [showTokenLookup, setShowTokenLookup] = useState(false)
  const [tokenLookupError, setTokenLookupError] = useState('')
  const [copiedToken, setCopiedToken] = useState(false)
  const [requestError, setRequestError] = useState('')
  const [requestLoading, setRequestLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Document & Photo upload state
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('')
  const [uploadedDocuments, setUploadedDocuments] = useState([])
  const photoInputRef = useRef(null)
  const docInputRef = useRef(null)

  // Common Form Fields
  const [form, setForm] = useState({
    // Step 1: Account
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',

    // Step 2: Institutional / Academic Profile
    organization: 'India Meteorological Department (IMD)',
    department: '',
    designation: '',
    highestQualification: "Master's Degree",
    educationLevel: 'Post-Graduate',
    experienceYears: '3-5 years',
    yearOfStudy: '3rd Year B.Tech / M.Sc',

    // Step 3: Skills, Teaching & Learning Preferences
    skillLevel: 'Intermediate',
    topicsTeaching: '',
    trainingMode: 'Hybrid',
    preferredLearnerLevel: 'All Levels',
    availabilitySchedule: 'Flexible / Weekdays & Evenings',
    learningTime: '5-10 hrs / week',
    preferredSchedule: 'Evening / Weekend Batches',
    skillsToDevelop: '',

    // Step 4: Certifications, Bio & Credentials
    certifications: '',
    bio: ''
  })

  // Multi-select state
  const [selectedExpertise, setSelectedExpertise] = useState(['Meteorology', 'Python for Earth Sciences'])
  const [selectedSkills, setSelectedSkills] = useState(['Python', 'Data Visualization'])
  const [selectedInterests, setSelectedInterests] = useState(['Weather Forecasting & Synoptics', 'Radar Systems & Precipitation'])
  const [selectedGoals, setSelectedGoals] = useState(['Build Operational Forecasting Skills', 'Gain Practical Hands-On Tool Proficiency'])

  // Validation rules & format helpers
  const isEmailValid = (em) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(em.trim())
  const isMobileValid = (mb) => /^\d{10}$/.test(mb.trim())
  const isFirstNameValid = form.firstName.trim().length >= 2
  const isLastNameValid = form.lastName.trim().length >= 1
  const isPasswordValid = form.password.length >= 8 && /\d/.test(form.password)
  const passwordsMatch = form.password === form.confirmPassword && form.password.length > 0

  const [touched, setTouched] = useState({})
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }))

  const updateForm = (e) => {
    const { name, value } = e.target
    // Strictly numeric only for mobile number (max 10 digits)
    if (name === 'mobile') {
      const numericOnly = value.replace(/[^\d]/g, '').slice(0, 10)
      setForm({ ...form, mobile: numericOnly })
      return
    }
    // Only letters and spaces for names
    if (name === 'firstName' || name === 'lastName') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '')
      setForm({ ...form, [name]: lettersOnly })
      return
    }
    setForm({ ...form, [name]: value })
  }

  const toggleArrayItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item))
    } else {
      setList([...list, item])
    }
  }

  // Handle Photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Document upload (for Trainer)
  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newDocs = files.map((f) => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: f.type || 'Document'
      }))
      setUploadedDocuments((prev) => [...prev, ...newDocs])
    }
  }

  const removeDoc = (index) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle Initial Access Request Submit
  const handleRequestSubmit = (e) => {
    if (e) e.preventDefault()
    const emailTrimmed = requestEmail.trim()
    if (!emailTrimmed) {
      setRequestError('Please enter your institutional email address.')
      return
    }
    if (!isEmailValid(emailTrimmed)) {
      setRequestError('Please enter a valid institutional email (e.g. name@imd.gov.in).')
      return
    }
    setRequestError('')
    setRequestLoading(true)

    const randomDigits = Math.floor(1000 + Math.random() * 9000)
    const generatedToken = `REQ-IMD-2026-${randomDigits}`

    setTimeout(() => {
      setToken(generatedToken)
      setRole(requestRole)
      setForm((prev) => {
        const nameParts = requestName.trim().split(' ')
        const fName = nameParts[0] || ''
        const lName = nameParts.slice(1).join(' ') || ''
        return {
          ...prev,
          email: emailTrimmed,
          firstName: fName || prev.firstName,
          lastName: lName || prev.lastName,
          organization: requestOrg.trim() || prev.organization
        }
      })
      setRequestLoading(false)
      setStage('waiting')
    }, 400)
  }

  // Simulate Approval
  const handleSimulateApprove = () => {
    setStage('approved')
    setStep(1)
  }

  // Simulate Rejection
  const handleSimulateReject = () => {
    setStage('rejected')
  }

  // Copy Token
  const handleCopyToken = () => {
    if (token) {
      navigator.clipboard?.writeText(token)
      setCopiedToken(true)
      setTimeout(() => setCopiedToken(false), 2000)
    }
  }

  // Token Lookup
  const handleLookupToken = (e) => {
    e.preventDefault()
    const trimmed = tokenLookupInput.trim().toUpperCase()
    if (!trimmed) {
      setTokenLookupError('Please enter a valid token number.')
      return
    }
    setTokenLookupError('')
    setToken(trimmed)
    if (trimmed.includes('REJ') || trimmed.includes('DENY')) {
      setStage('rejected')
    } else if (trimmed.includes('APP') || trimmed.endsWith('1') || trimmed.endsWith('7')) {
      setStage('approved')
      setStep(1)
    } else {
      setStage('waiting')
    }
  }

  // Validation per step
  const canProceedStep1 = isFirstNameValid && isLastNameValid && isEmailValid(form.email) && isMobileValid(form.mobile) && isPasswordValid && passwordsMatch
  const canProceedStep2 = form.organization.trim().length >= 2
  const canProceedStep3 = role === 'trainer' ? selectedExpertise.length > 0 : selectedInterests.length > 0

  const handleNext = () => {
    if (step === 1) {
      setTouched({ firstName: true, lastName: true, email: true, mobile: true, password: true, confirmPassword: true })
      if (!canProceedStep1) return
    }
    if (step === 2 && !canProceedStep2) return
    if (step === 3 && !canProceedStep3) return
    setStep((prev) => Math.min(4, prev + 1))
  }

  const handlePrev = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleFinalSubmit = async () => {
    setLoading(true)
    try {
      await api.register({
        ...form,
        role,
        profilePhoto: profilePhoto || 'default-avatar.png',
        expertise: selectedExpertise,
        skills: selectedSkills,
        interests: selectedInterests,
        goals: selectedGoals,
        documents: uploadedDocuments
      })
    } catch {
      // Fallback inside mock API
    }
    setLoading(false)
    if (role === 'trainer') {
      if (typeof onDashboard === 'function') {
        onDashboard('trainer')
      }
    } else {
      setSubmitted(true)
    }
  }

  // Post Submission Screen (Trainee)
  if (submitted) {
    return (
      <div className="signup-page-wrap">
        <div className="signup-success-container">
          <div className="signup-success-card">
            <div className="success-icon-wrap">
              <span className="success-emoji">🎓</span>
            </div>
            <h1 className="success-title">Welcome to CapacityConnect!</h1>
            <p className="success-subtitle">
              Hello <strong>{form.firstName} {form.lastName}</strong>, your personalized trainee learning profile is ready.
            </p>

            <div className="trainee-welcome-summary">
              <div className="summary-stat-pill">
                <span>Domain</span>
                <strong>{form.department || 'Meteorology & Data'}</strong>
              </div>
              <div className="summary-stat-pill">
                <span>Schedule</span>
                <strong>{form.preferredSchedule || 'Flexible Hours'}</strong>
              </div>
              <div className="summary-stat-pill">
                <span>Level</span>
                <strong>{form.skillLevel || form.preferredLearnerLevel || 'Intermediate'}</strong>
              </div>
            </div>

            <div className="success-action-row">
              <button
                type="button"
                className="btn-primary-signup"
                onClick={() => onDashboard('trainee')}
              >
                Go to Trainee Portal →
              </button>
              <button
                type="button"
                className="btn-secondary-signup"
                onClick={onBack}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-page-wrap">
      <div className="signup-page-container">
        {/* Top Back & Sign In Navigation spanning full width */}
        <div className="signup-top-nav-bar">
          <button type="button" className="btn-back-home-pill" onClick={onBack}>
            ← Back to home
          </button>
          <div className="signup-nav-signin">
            Already have an account?{' '}
            <button type="button" className="inline-signin-link" onClick={onLogin}>
              Sign in
            </button>
          </div>
        </div>

        <div className="signup-main-grid">
          {/* LEFT COLUMN: Hero, Brand & Features Showcase */}
          <div className="signup-showcase-column">
            {/* Brand & Subheader */}
            <div className="signup-brand-header">
              <div className="signup-brand-logo">
                <img src={cloverIcon} alt="Logo" className="signup-clover-icon" />
                <span>Capacity Connect</span>
              </div>
              <div className="signup-section-badge">+ Create your account</div>
            </div>

            {/* Main Headline */}
            <h1 className="signup-main-heading">
              Start your <em>learning journey</em> with CapacityConnect
            </h1>

            <p className="signup-main-desc">
              Create your profile, discover relevant learning opportunities, track your competencies, and connect with verified trainers and peer cohorts.
            </p>

            {/* Feature Cards with green icons */}
            <div className="signup-benefits-list">
              <div className="signup-benefit-item">
                <div className="benefit-circle-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <div className="benefit-text-group">
                  <strong>Personalized Recommendations</strong>
                  <span>AI-driven module matching tailored to your specific domain</span>
                </div>
              </div>

              <div className="signup-benefit-item">
                <div className="benefit-circle-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <div className="benefit-text-group">
                  <strong>Competency Mapping</strong>
                  <span>Standardized skill framework mapped to IMD requirements</span>
                </div>
              </div>

              <div className="signup-benefit-item">
                <div className="benefit-circle-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="benefit-text-group">
                  <strong>Verified Trainer Matching</strong>
                  <span>Direct connection with certified scientists and institutional faculty</span>
                </div>
              </div>

              <div className="signup-benefit-item">
                <div className="benefit-circle-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="2" r="2"></circle>
                  </svg>
                </div>
                <div className="benefit-text-group">
                  <strong>Real-Time Analytics</strong>
                  <span>Track certifications, assessments, and continuous training progress</span>
                </div>
              </div>
            </div>

            {/* Bottom Trust Badge */}
            <div className="signup-trust-bar">
              <div className="trust-pill-item">
                <span className="trust-icon">✓</span>
                <span>Institutional Credentials Verified</span>
              </div>
              <div className="trust-pill-item">
                <span className="trust-icon">✓</span>
                <span>Compliant with National Capacity Standards</span>
              </div>
            </div>
          </div>

        {/* RIGHT COLUMN: Approval Workflow & Multi-Step Registration Card */}
        <div className="signup-form-column">
          <div className="signup-card-surface">
            {/* STAGE 1: REQUEST FOR APPROVAL */}
            {stage === 'request' && (
              <div className="approval-stage-wrap animate-fadeIn">
                <div className="card-top-identity">
                  <span className="card-diamond-icon">◇</span>
                  <div className="card-title-with-badge">
                    <h2 className="card-title">Request Institutional Access</h2>
                    <span className="stage-badge-pill">Step 1 of 2: Approval Request</span>
                  </div>
                </div>

                <p className="step-instruction role-instruction-lead">
                  Select your role, enter your institutional email address, and submit your request for administrative review.
                </p>

                {requestError && (
                  <div className="request-alert-error">
                    <span>⚠️ {requestError}</span>
                  </div>
                )}

                <form onSubmit={handleRequestSubmit} className="request-access-form">
                  {/* Role Selector Cards */}
                  <div className="role-selection-section-compact">
                    <label className="input-group-heading-label">1. Choose your role <span className="req-star">*</span></label>
                    <div className="role-cards-selection-grid">
                      {/* Option 1: Trainer */}
                      <div
                        className={`role-selection-card ${requestRole === 'trainer' ? 'selected' : ''}`}
                        onClick={() => setRequestRole('trainer')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setRequestRole('trainer') }}
                      >
                        <div className="role-card-radio-indicator">
                          <div className={`custom-radio-dot ${requestRole === 'trainer' ? 'checked' : ''}`} />
                        </div>
                        <div className="role-card-header">
                          <div className="role-card-icon-badge trainer-badge">
                            <span>🎓</span>
                          </div>
                          <div className="role-card-title-group">
                            <h3 className="role-card-heading">Trainer &amp; Faculty</h3>
                            <span className="role-card-subtag">Subject Expert / Instructor</span>
                          </div>
                        </div>
                        <p className="role-card-description">
                          Create courses, conduct live training, evaluate assessments, and upload institutional credentials.
                        </p>
                      </div>

                      {/* Option 2: Trainee */}
                      <div
                        className={`role-selection-card ${requestRole === 'trainee' ? 'selected' : ''}`}
                        onClick={() => setRequestRole('trainee')}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setRequestRole('trainee') }}
                      >
                        <div className="role-card-radio-indicator">
                          <div className={`custom-radio-dot ${requestRole === 'trainee' ? 'checked' : ''}`} />
                        </div>
                        <div className="role-card-header">
                          <div className="role-card-icon-badge trainee-badge">
                            <span>📚</span>
                          </div>
                          <div className="role-card-title-group">
                            <h3 className="role-card-heading">Trainee &amp; Learner</h3>
                            <span className="role-card-subtag">Officer / Student / Researcher</span>
                          </div>
                        </div>
                        <p className="role-card-description">
                          Access domain modules, track meteorological competencies, and earn verifiable certifications.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Institutional Email */}
                  <div className="input-group">
                    <label>
                      2. Institutional Email Address <span className="req-star">*</span>
                    </label>
                    <input
                      type="email"
                      value={requestEmail}
                      onChange={(e) => {
                        setRequestEmail(e.target.value)
                        setRequestError('')
                      }}
                      placeholder="e.g. name@imd.gov.in or user@domain.gov.in"
                      className={
                        requestEmail.length > 0
                          ? isEmailValid(requestEmail)
                            ? 'input-success'
                            : 'input-error'
                          : ''
                      }
                      required
                    />
                    {requestEmail.length > 0 && isEmailValid(requestEmail) && (
                      <small className="input-feedback-success">✓ Valid institutional email format</small>
                    )}
                  </div>

                  {/* Full Name & Organization */}
                  <div className="form-two-col">
                    <div className="input-group">
                      <label>
                        3. Full Name
                      </label>
                      <input
                        type="text"
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Kumar"
                      />
                    </div>
                    <div className="input-group">
                      <label>
                        4. Organization / Affiliation
                      </label>
                      <input
                        type="text"
                        value={requestOrg}
                        onChange={(e) => setRequestOrg(e.target.value)}
                        placeholder="e.g. India Meteorological Department"
                      />
                    </div>
                  </div>

                  {/* Trust notice */}
                  <div className="request-security-note">
                    <span className="security-icon">🔒</span>
                    <span>All registration requests undergo institutional verification against departmental records.</span>
                  </div>

                  {/* Actions */}
                  <div className="card-actions-row">
                    <button
                      type="button"
                      className="btn-card-back"
                      onClick={onBack}
                    >
                      ← Back to Home
                    </button>
                    <button
                      type="submit"
                      className="btn-primary-signup"
                      disabled={requestLoading || !requestEmail}
                    >
                      {requestLoading ? (
                        <span className="btn-loading-spin">Submitting Request...</span>
                      ) : (
                        <>
                          <span>Request Approval →</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Token Lookup Toggle */}
                <div className="token-lookup-footer">
                  <button
                    type="button"
                    className="btn-toggle-lookup"
                    onClick={() => setShowTokenLookup(!showTokenLookup)}
                  >
                    {showTokenLookup ? '▲ Hide Token Tracker' : '🔍 Already submitted a request? Check token status →'}
                  </button>

                  {showTokenLookup && (
                    <form onSubmit={handleLookupToken} className="token-lookup-form animate-fadeIn">
                      <input
                        type="text"
                        value={tokenLookupInput}
                        onChange={(e) => setTokenLookupInput(e.target.value)}
                        placeholder="Enter Token ID (e.g. REQ-IMD-2026-8941)"
                        className="token-lookup-input"
                      />
                      <button type="submit" className="btn-token-lookup-submit">
                        Check Status
                      </button>
                      {tokenLookupError && (
                        <small className="input-feedback-error">{tokenLookupError}</small>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 2: WAITING FOR APPROVAL (TOKEN DISPLAY & 2-DAY SLA) */}
            {stage === 'waiting' && (
              <div className="waiting-stage-wrap animate-fadeIn">
                <div className="card-top-identity">
                  <span className="card-diamond-icon">⏳</span>
                  <div className="card-title-with-badge">
                    <h2 className="card-title">Awaiting Approval</h2>
                    <span className="status-badge-pending">⏳ In Directorate Review</span>
                  </div>
                </div>

                {/* Token & 2 Working Days Hero Box */}
                <div className="approval-token-hero-box">
                  <div className="token-hero-header">
                    <span className="token-hero-label">APPROVAL TRACKING TOKEN</span>
                    <button
                      type="button"
                      className="btn-copy-token"
                      onClick={handleCopyToken}
                    >
                      {copiedToken ? '✓ Copied!' : '📋 Copy Token'}
                    </button>
                  </div>
                  <div className="token-hero-value">{token || 'REQ-IMD-2026-8941'}</div>
                  
                  <div className="sla-timeline-pill">
                    <span className="sla-clock-icon">🕒</span>
                    <span className="sla-text">
                      Review &amp; Verification takes <strong>up to 2 working days</strong>
                    </span>
                  </div>
                </div>

                <p className="waiting-instruction-desc">
                  Your registration request has been assigned to the institutional verification committee. You will receive authorization clearance once verified.
                </p>

                {/* Request Details Summary */}
                <div className="waiting-details-table">
                  <div className="w-detail-row">
                    <span className="w-detail-key">Requested Role:</span>
                    <span className="w-detail-val">
                      <strong>{role === 'trainer' ? 'Trainer & Faculty' : 'Trainee & Learner'}</strong>
                    </span>
                  </div>
                  <div className="w-detail-row">
                    <span className="w-detail-key">Institutional Email:</span>
                    <span className="w-detail-val">{requestEmail || form.email || 'name@imd.gov.in'}</span>
                  </div>
                  <div className="w-detail-row">
                    <span className="w-detail-key">Organization:</span>
                    <span className="w-detail-val">{requestOrg || form.organization || 'India Meteorological Department'}</span>
                  </div>
                </div>

                {/* Workflow Steps Indicator */}
                <div className="waiting-workflow-track">
                  <div className="track-step done">
                    <div className="track-step-num">✓</div>
                    <div className="track-step-info">
                      <strong>Request Logged</strong>
                      <span>Token Generated</span>
                    </div>
                  </div>
                  <div className="track-step active">
                    <div className="track-step-num">2</div>
                    <div className="track-step-info">
                      <strong>Directorate Review</strong>
                      <span>Up to 2 working days</span>
                    </div>
                  </div>
                  <div className="track-step locked">
                    <div className="track-step-num">3</div>
                    <div className="track-step-info">
                      <strong>Account Creation</strong>
                      <span>Awaiting approval</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Simulation Panel for Immediate Testing */}
                <div className="simulation-control-box">
                  <div className="simulation-label">
                    <span>⚙️ PROTOTYPE SIMULATION CONTROLS</span>
                  </div>
                  <p className="simulation-desc">
                    Test the response flows instantly:
                  </p>
                  <div className="simulation-buttons-row">
                    <button
                      type="button"
                      className="btn-sim-approve"
                      onClick={handleSimulateApprove}
                    >
                      ✓ Simulate Approval (Unlock Account Creation) →
                    </button>
                    <button
                      type="button"
                      className="btn-sim-reject"
                      onClick={handleSimulateReject}
                    >
                      ✕ Simulate Rejection (View Rejection Page)
                    </button>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="card-actions-row">
                  <button
                    type="button"
                    className="btn-card-back"
                    onClick={onBack}
                  >
                    ← Back to Home
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-signup"
                    onClick={() => setStage('request')}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: REJECTED STATE SCREEN */}
            {stage === 'rejected' && (
              <div className="rejected-stage-wrap animate-fadeIn">
                <div className="card-top-identity">
                  <span className="rejected-top-icon">✕</span>
                  <div className="card-title-with-badge">
                    <h2 className="card-title">Request Not Approved</h2>
                    <span className="status-badge-rejected">Request Rejected</span>
                  </div>
                </div>

                {/* Rejection Notice Banner */}
                <div className="rejected-notice-card">
                  <div className="rejected-header-row">
                    <span className="rejected-tag-pill">Verification Status: NOT APPROVED</span>
                    <span className="rejected-token-ref">Token: {token || 'REQ-IMD-2026-8941'}</span>
                  </div>
                  <p className="rejected-message">
                    We regret to inform you that your registration request could not be approved at this time based on institutional domain criteria or administrative verification parameters.
                  </p>
                </div>

                {/* Contact Admin / Head / HR Advisory Box */}
                <div className="contact-advisory-box">
                  <div className="advisory-title-group">
                    <span className="advisory-icon">🏛️</span>
                    <div>
                      <h3 className="advisory-heading">Contact Administration or HR for Assistance</h3>
                      <p className="advisory-subtext">
                        If you believe this decision is in error, or require expedited authorization, please contact the administrative authorities directly:
                      </p>
                    </div>
                  </div>

                  <div className="contact-channels-grid">
                    <div className="contact-channel-card">
                      <div className="channel-icon">✉️</div>
                      <div className="channel-info">
                        <strong>Directorate Administrator</strong>
                        <a href="mailto:admin.directorate@imd.gov.in" className="channel-link">admin.directorate@imd.gov.in</a>
                      </div>
                    </div>

                    <div className="contact-channel-card">
                      <div className="channel-icon">🎓</div>
                      <div className="channel-info">
                        <strong>Department Head (Training)</strong>
                        <a href="mailto:head.training@imd.gov.in" className="channel-link">head.training@imd.gov.in</a>
                      </div>
                    </div>

                    <div className="contact-channel-card">
                      <div className="channel-icon">👥</div>
                      <div className="channel-info">
                        <strong>HR &amp; Capacity Division</strong>
                        <a href="mailto:hr-training@imd.gov.in" className="channel-link">hr-training@imd.gov.in</a>
                      </div>
                    </div>

                    <div className="contact-channel-card">
                      <div className="channel-icon">📞</div>
                      <div className="channel-info">
                        <strong>Central Secretariat Helpline</strong>
                        <span className="channel-text">+91-11-2461-1234 (Ext. 402 / 405)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions-row">
                  <button
                    type="button"
                    className="btn-card-back"
                    onClick={onBack}
                  >
                    ← Back to Home
                  </button>
                  <button
                    type="button"
                    className="btn-primary-signup"
                    onClick={() => setStage('request')}
                  >
                    Submit New Request →
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-signup"
                    onClick={onLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: APPROVED STATE -> CREATE ACCOUNT FORM */}
            {stage === 'approved' && (
              <>
                {/* Approval Clearance Banner */}
                <div className="approval-unlocked-banner animate-fadeIn">
                  <span className="banner-check-icon">✓</span>
                  <div className="banner-text-group">
                    <strong>Institutional Clearance Approved (Token: {token || 'REQ-IMD-2026-8941'})</strong>
                    <span>Please set your password and complete your profile details below.</span>
                  </div>
                </div>

                {/* Card Top Icon & Title */}
                <div className="card-top-identity">
                  <span className="card-diamond-icon">◇</span>
                  <div className="card-title-with-badge">
                    <h2 className="card-title">Create your account</h2>
                    <div className="role-active-badge-pill">
                      <span>Role: <strong>{role === 'trainer' ? 'Trainer / Faculty' : 'Trainee / Learner'}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Stepper Progress Bar */}
                <div className="stepper-bar-container">
                  <div className="stepper-progress-track">
                    <div
                      className="stepper-progress-fill"
                      style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />
                  </div>
                  <div className="stepper-labels-row">
                    <div className={`step-label-item ${step >= 1 ? 'active' : ''} ${step === 1 ? 'current' : ''}`} onClick={() => setStep(1)}>
                      <span className="step-num">01</span>
                      <span className="step-text">Account</span>
                    </div>
                    <div className={`step-label-item ${step >= 2 ? 'active' : ''} ${step === 2 ? 'current' : ''}`} onClick={() => step > 2 && setStep(2)}>
                      <span className="step-num">02</span>
                      <span className="step-text">Profile</span>
                    </div>
                    <div className={`step-label-item ${step >= 3 ? 'active' : ''} ${step === 3 ? 'current' : ''}`} onClick={() => step > 3 && setStep(3)}>
                      <span className="step-num">03</span>
                      <span className="step-text">{role === 'trainer' ? 'Expertise' : 'Preferences'}</span>
                    </div>
                    <div className={`step-label-item ${step >= 4 ? 'active' : ''} ${step === 4 ? 'current' : ''}`} onClick={() => step === 4 && setStep(4)}>
                      <span className="step-num">04</span>
                      <span className="step-text">{role === 'trainer' ? 'Documents' : 'Review'}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Account Information & Personal Details (When stage === 'approved') */}
            {stage === 'approved' && step === 1 && (
              <div className="step-content-box animate-fadeIn">
                <p className="step-instruction">
                  Tell us about yourself — enter your personal details to set up your profile.
                </p>

                <div className="form-two-col">
                  <div className="input-group">
                    <label>
                      First name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={updateForm}
                      onBlur={() => markTouched('firstName')}
                      placeholder="e.g. Ramesh"
                      className={touched.firstName && !isFirstNameValid ? 'input-error' : ''}
                      required
                    />
                    {touched.firstName && !isFirstNameValid && (
                      <small className="input-feedback-error">⚠️ First name is required (min 2 letters)</small>
                    )}
                  </div>
                  <div className="input-group">
                    <label>
                      Last name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={updateForm}
                      onBlur={() => markTouched('lastName')}
                      placeholder="e.g. Sharma"
                      className={touched.lastName && !isLastNameValid ? 'input-error' : ''}
                      required
                    />
                    {touched.lastName && !isLastNameValid && (
                      <small className="input-feedback-error">⚠️ Last name is required</small>
                    )}
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="input-group">
                    <label>
                      Email address <span className="req-star">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateForm}
                      onBlur={() => markTouched('email')}
                      placeholder="name@imd.gov.in"
                      className={
                        form.email.length > 0
                          ? isEmailValid(form.email)
                            ? 'input-success'
                            : 'input-error'
                          : touched.email
                          ? 'input-error'
                          : ''
                      }
                      required
                    />
                    {form.email.length > 0 && !isEmailValid(form.email) && (
                      <small className="input-feedback-error">⚠️ Enter valid email (e.g. name@domain.gov.in)</small>
                    )}
                    {form.email.length > 0 && isEmailValid(form.email) && (
                      <small className="input-feedback-success">✓ Valid email format</small>
                    )}
                  </div>
                  <div className="input-group">
                    <label>
                      Mobile number (10 digits) <span className="req-star">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={updateForm}
                      onBlur={() => markTouched('mobile')}
                      placeholder="9876543210"
                      maxLength={10}
                      className={
                        form.mobile.length > 0
                          ? isMobileValid(form.mobile)
                            ? 'input-success'
                            : 'input-warning'
                          : touched.mobile
                          ? 'input-error'
                          : ''
                      }
                      required
                    />
                    {form.mobile.length > 0 && form.mobile.length < 10 && (
                      <small className="input-feedback-warning">
                        ℹ️ Digits only — {10 - form.mobile.length} more digit{10 - form.mobile.length > 1 ? 's' : ''} needed
                      </small>
                    )}
                    {form.mobile.length === 10 && (
                      <small className="input-feedback-success">✓ Valid 10-digit mobile number</small>
                    )}
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="input-group">
                    <label>
                      Password <span className="req-star">*</span>
                    </label>
                    <div className="password-input-wrap">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={updateForm}
                        onBlur={() => markTouched('password')}
                        placeholder="Create a strong password"
                        className={touched.password && !isPasswordValid ? 'input-error' : ''}
                        required
                      />
                      <button
                        type="button"
                        className="btn-eye-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {form.password.length > 0 && !isPasswordValid && (
                      <small className="input-feedback-error">⚠️ At least 8 characters, with a number</small>
                    )}
                    {form.password.length > 0 && isPasswordValid && (
                      <small className="input-feedback-success">✓ Strong password</small>
                    )}
                  </div>

                  <div className="input-group">
                    <label>
                      Confirm password <span className="req-star">*</span>
                    </label>
                    <div className="password-input-wrap">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={updateForm}
                        onBlur={() => markTouched('confirmPassword')}
                        placeholder="Re-enter your password"
                        className={
                          form.confirmPassword.length > 0
                            ? passwordsMatch
                              ? 'input-success'
                              : 'input-error'
                            : touched.confirmPassword
                            ? 'input-error'
                            : ''
                        }
                        required
                      />
                      <button
                        type="button"
                        className="btn-eye-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Toggle confirm password"
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {form.confirmPassword.length > 0 && !passwordsMatch && (
                      <small className="input-feedback-error">⚠️ Passwords do not match</small>
                    )}
                    {form.confirmPassword.length > 0 && passwordsMatch && (
                      <small className="input-feedback-success">✓ Passwords match</small>
                    )}
                  </div>
                </div>
                <div className="password-hint-text">
                  <span>At least 8 characters, with a number</span>
                  {form.password && form.confirmPassword && !passwordsMatch && (
                    <span className="pwd-error-inline"> • Passwords do not match</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Role-Specific Profile Details */}
            {stage === 'approved' && step === 2 && (
              <div className="step-content-box animate-fadeIn">
                <p className="step-instruction">
                  {role === 'trainer'
                    ? 'Provide your professional background and institutional affiliation.'
                    : 'Tell us about your educational background and current affiliation.'}
                </p>

                {/* Profile Photo Upload */}
                <div className="photo-upload-row">
                  <div className="avatar-preview-box" onClick={() => photoInputRef.current?.click()}>
                    {profilePhotoPreview ? (
                      <img src={profilePhotoPreview} alt="Preview" className="avatar-preview-img" />
                    ) : (
                      <div className="avatar-placeholder-text">
                        <span>📷</span>
                        <small>Upload Photo</small>
                      </div>
                    )}
                  </div>
                  <div className="photo-upload-meta">
                    <strong>5. Profile Photo</strong>
                    <p>Upload a clear professional photo for your institutional profile card.</p>
                    <button
                      type="button"
                      className="btn-upload-trigger"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      {profilePhoto ? 'Change Photo' : 'Choose Photo...'}
                    </button>
                    <input
                      type="file"
                      ref={photoInputRef}
                      onChange={handlePhotoChange}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {role === 'trainer' ? (
                  /* Trainer Profile Fields 6 - 10 */
                  <>
                    <div className="form-two-col">
                      <div className="input-group">
                        <label>6. Organization / Institution *</label>
                        <input
                          type="text"
                          name="organization"
                          value={form.organization}
                          onChange={updateForm}
                          placeholder="e.g. India Meteorological Department (IMD)"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label>7. Department / Division</label>
                        <input
                          type="text"
                          name="department"
                          value={form.department}
                          onChange={updateForm}
                          placeholder="e.g. Radar Meteorology & Numerical Weather"
                        />
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>8. Current Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={form.designation}
                          onChange={updateForm}
                          placeholder="e.g. Senior Faculty / Lead Scientist"
                        />
                      </div>
                      <div className="input-group">
                        <label>9. Highest Qualification</label>
                        <select
                          name="highestQualification"
                          value={form.highestQualification}
                          onChange={updateForm}
                        >
                          <option>Doctorate (Ph.D.)</option>
                          <option>Master's Degree (M.Tech / M.Sc / M.S.)</option>
                          <option>Bachelor's Degree (B.Tech / B.Sc)</option>
                          <option>Post-Doctoral Fellow</option>
                          <option>Other Professional Diploma</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <label>10. Years of Teaching / Professional Experience</label>
                      <select
                        name="experienceYears"
                        value={form.experienceYears}
                        onChange={updateForm}
                      >
                        <option>1 - 3 years</option>
                        <option>3 - 5 years</option>
                        <option>5 - 10 years</option>
                        <option>10 - 15 years</option>
                        <option>15+ years (Senior Specialist)</option>
                      </select>
                    </div>
                  </>
                ) : (
                  /* Trainee Profile Fields 6 - 9 */
                  <>
                    <div className="form-two-col">
                      <div className="input-group">
                        <label>6. Organization / College *</label>
                        <input
                          type="text"
                          name="organization"
                          value={form.organization}
                          onChange={updateForm}
                          placeholder="e.g. Delhi University / IIT Kharagpur"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label>7. Department / Branch</label>
                        <input
                          type="text"
                          name="department"
                          value={form.department}
                          onChange={updateForm}
                          placeholder="e.g. Atmospheric Science / Computer Science"
                        />
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>8. Current Designation / Year</label>
                        <input
                          type="text"
                          name="yearOfStudy"
                          value={form.yearOfStudy}
                          onChange={updateForm}
                          placeholder="e.g. 3rd Year B.Tech / Trainee Fellow"
                        />
                      </div>
                      <div className="input-group">
                        <label>9. Education Level</label>
                        <select
                          name="educationLevel"
                          value={form.educationLevel}
                          onChange={updateForm}
                        >
                          <option>Undergraduate (Bachelor's)</option>
                          <option>Post-Graduate (Master's)</option>
                          <option>Doctoral Candidate (Ph.D.)</option>
                          <option>Vocational / Diploma</option>
                          <option>Working Professional</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Skills, Topics & Teaching / Learning Logistics */}
            {stage === 'approved' && step === 3 && (
              <div className="step-content-box animate-fadeIn">
                <p className="step-instruction">
                  {role === 'trainer'
                    ? 'Configure your expertise, teaching modes, and topics you deliver.'
                    : 'Personalize your learning interests, target skills, and schedule.'}
                </p>

                {role === 'trainer' ? (
                  /* Trainer Fields 11 - 17 */
                  <>
                    <div className="input-group">
                      <label className="section-field-label">
                        11. Area of Expertise <span>(Select all that apply)</span>
                      </label>
                      <div className="tags-chip-cloud">
                        {TRAINER_EXPERTISE_OPTIONS.map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={`tag-pill-btn ${selectedExpertise.includes(item) ? 'selected' : ''}`}
                            onClick={() => toggleArrayItem(item, selectedExpertise, setSelectedExpertise)}
                          >
                            {selectedExpertise.includes(item) && '✓ '}
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="section-field-label">
                        12. Core Skills <span>(Select 2 to 6)</span>
                      </label>
                      <div className="tags-chip-cloud">
                        {TRAINER_SKILLS_OPTIONS.map((skill) => (
                          <button
                            type="button"
                            key={skill}
                            className={`tag-pill-btn ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                            onClick={() => toggleArrayItem(skill, selectedSkills, setSelectedSkills)}
                          >
                            {selectedSkills.includes(skill) && '✓ '}
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>13. Skill Level / Mastery</label>
                        <select name="skillLevel" value={form.skillLevel} onChange={updateForm}>
                          <option>Intermediate Specialist</option>
                          <option>Advanced Practitioner</option>
                          <option>Principal Subject Matter Expert</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label>14. Subjects / Topics You Can Teach</label>
                        <input
                          type="text"
                          name="topicsTeaching"
                          value={form.topicsTeaching}
                          onChange={updateForm}
                          placeholder="e.g. Doppler Radar Calibration, NWP Ensembles"
                        />
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>15. Training Mode</label>
                        <div className="mode-toggle-group">
                          {['Online', 'Offline', 'Hybrid'].map((m) => (
                            <button
                              type="button"
                              key={m}
                              className={`mode-toggle-btn ${form.trainingMode === m ? 'active' : ''}`}
                              onClick={() => setForm({ ...form, trainingMode: m })}
                            >
                              {m === 'Online' ? '🌐 ' : m === 'Offline' ? '🏢 ' : '🔄 '}
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="input-group">
                        <label>16. Preferred Learner Level</label>
                        <select
                          name="preferredLearnerLevel"
                          value={form.preferredLearnerLevel}
                          onChange={updateForm}
                        >
                          <option>All Levels</option>
                          <option>Beginner &amp; Foundation</option>
                          <option>Intermediate Level</option>
                          <option>Advanced &amp; Research Specialists</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <label>17. Availability &amp; Schedule</label>
                      <input
                        type="text"
                        name="availabilitySchedule"
                        value={form.availabilitySchedule}
                        onChange={updateForm}
                        placeholder="e.g. Weekdays 4-7 PM, Weekend Cohorts, Flexible"
                      />
                    </div>
                  </>
                ) : (
                  /* Trainee Fields 10 - 18 */
                  <>
                    <div className="input-group">
                      <label className="section-field-label">
                        10. Current Skills <span>(Select your existing skillset)</span>
                      </label>
                      <div className="tags-chip-cloud">
                        {TRAINEE_SKILLS_OPTIONS.map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={`tag-pill-btn ${selectedSkills.includes(item) ? 'selected' : ''}`}
                            onClick={() => toggleArrayItem(item, selectedSkills, setSelectedSkills)}
                          >
                            {selectedSkills.includes(item) && '✓ '}
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>11. Current Skill Level</label>
                        <select name="skillLevel" value={form.skillLevel} onChange={updateForm}>
                          <option>Beginner / Fresh Learner</option>
                          <option>Intermediate / Developing</option>
                          <option>Advanced / Upskilling</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label>14. Skills You Want to Develop</label>
                        <input
                          type="text"
                          name="skillsToDevelop"
                          value={form.skillsToDevelop}
                          onChange={updateForm}
                          placeholder="e.g. Python for Radar Data, NWP Modeling"
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="section-field-label">
                        12. Areas of Interest <span>(Pick your focus areas)</span>
                      </label>
                      <div className="tags-chip-cloud">
                        {TRAINEE_INTERESTS_OPTIONS.map((item) => (
                          <button
                            type="button"
                            key={item}
                            className={`tag-pill-btn ${selectedInterests.includes(item) ? 'selected' : ''}`}
                            onClick={() => toggleArrayItem(item, selectedInterests, setSelectedInterests)}
                          >
                            {selectedInterests.includes(item) && '✓ '}
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="section-field-label">
                        13. Learning Goals
                      </label>
                      <div className="tags-chip-cloud">
                        {TRAINEE_GOALS_OPTIONS.map((goal) => (
                          <button
                            type="button"
                            key={goal}
                            className={`tag-pill-btn ${selectedGoals.includes(goal) ? 'selected' : ''}`}
                            onClick={() => toggleArrayItem(goal, selectedGoals, setSelectedGoals)}
                          >
                            {selectedGoals.includes(goal) && '✓ '}
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>14. Preferred Learner Level</label>
                        <select
                          name="preferredLearnerLevel"
                          value={form.preferredLearnerLevel}
                          onChange={updateForm}
                        >
                          <option>Beginner &amp; Foundation</option>
                          <option>Intermediate Level</option>
                          <option>Advanced &amp; Intensive</option>
                        </select>
                      </div>

                      <div className="input-group">
                        <label>15. Available Learning Time</label>
                        <select name="learningTime" value={form.learningTime} onChange={updateForm}>
                          <option>2 - 4 hrs / week</option>
                          <option>5 - 10 hrs / week</option>
                          <option>10 - 15 hrs / week</option>
                          <option>Full-time / 20+ hrs / week</option>
                        </select>
                      </div>
                    </div>

                    <div className="input-group">
                      <label>16. Preferred Training Schedule</label>
                      <select name="preferredSchedule" value={form.preferredSchedule} onChange={updateForm}>
                        <option>Evening / Weekend Batches</option>
                        <option>Morning Batches (7 AM - 10 AM)</option>
                        <option>Self-Paced Flexible Hours</option>
                        <option>Live Weekend Masterclasses</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Certifications, Bio, Document Upload & Final Summary */}
            {stage === 'approved' && step === 4 && (
              <div className="step-content-box animate-fadeIn">
                <p className="step-instruction">
                  {role === 'trainer'
                    ? 'Provide your certifications, bio, and upload official verification documents.'
                    : 'Add your achievements and a short bio to complete your profile.'}
                </p>

                <div className="input-group">
                  <label>{role === 'trainer' ? '18. Certifications & Credentials' : '19. Certifications / Achievements'}</label>
                  <input
                    type="text"
                    name="certifications"
                    value={form.certifications}
                    onChange={updateForm}
                    placeholder="e.g. WMO Certified Instructor, AWS ML Specialty, GATE Top Ranker"
                  />
                </div>

                <div className="input-group">
                  <label>{role === 'trainer' ? '19. Short Professional Bio' : '20. Short Bio / Statement of Purpose'}</label>
                  <textarea
                    rows={3}
                    name="bio"
                    value={form.bio}
                    onChange={updateForm}
                    placeholder={
                      role === 'trainer'
                        ? 'Summarize your academic focus, teaching experience, and key accomplishments...'
                        : 'Tell trainers and mentors about your background and what you hope to achieve...'
                    }
                  />
                </div>

                {/* Trainer Document Upload (Field 20) */}
                {role === 'trainer' && (
                  <div className="trainer-doc-upload-section">
                    <div className="doc-section-heading">
                      <strong>20. Verification Documents</strong>
                      <span className="badge-required">Institutional Verification Required</span>
                    </div>
                    <p className="doc-instruction-text">
                      Upload your Institutional ID card, Faculty Appointment Letter, or Highest Degree Certificate (PDF, PNG, JPG).
                    </p>

                    <div
                      className="dropzone-box"
                      onClick={() => docInputRef.current?.click()}
                    >
                      <div className="dropzone-inner">
                        <span className="dropzone-icon">📁</span>
                        <strong>Click or drag files here to upload</strong>
                        <small>Supports PDF, DOCX, JPG, PNG up to 10MB each</small>
                      </div>
                      <input
                        type="file"
                        ref={docInputRef}
                        onChange={handleDocUpload}
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Uploaded Documents List */}
                    {uploadedDocuments.length > 0 ? (
                      <div className="uploaded-docs-list">
                        {uploadedDocuments.map((doc, idx) => (
                          <div key={idx} className="doc-file-item">
                            <span className="doc-icon-mini">📄</span>
                            <div className="doc-details">
                              <strong className="doc-name">{doc.name}</strong>
                              <small className="doc-size">{doc.size}</small>
                            </div>
                            <span className="doc-status-badge">Ready</span>
                            <button
                              type="button"
                              className="btn-remove-doc"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeDoc(idx)
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="sample-doc-hint">
                        <span>ℹ️</span> Default demo document <strong>"Faculty_Credentials_IMD.pdf"</strong> will be submitted if no file is chosen.
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Summary Review Block */}
                <div className="profile-summary-recap">
                  <div className="recap-header">
                    <strong>Profile Overview</strong>
                    <span className="recap-role-pill">{role.toUpperCase()}</span>
                  </div>
                  <div className="recap-grid">
                    <div>
                      <span>Name:</span>
                      <strong>{form.firstName} {form.lastName}</strong>
                    </div>
                    <div>
                      <span>Email:</span>
                      <strong>{form.email}</strong>
                    </div>
                    <div>
                      <span>Organization:</span>
                      <strong>{form.organization || 'Not provided'}</strong>
                    </div>
                    <div>
                      <span>{role === 'trainer' ? 'Mode:' : 'Schedule:'}</span>
                      <strong>{role === 'trainer' ? `${form.trainingMode} (${form.skillLevel})` : `${form.preferredSchedule || 'Flexible'} (${form.skillLevel || 'Intermediate'})`}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar for Approved Account Creation Stepper */}
            {stage === 'approved' && (
              <div className="card-actions-row">
                {step === 1 ? (
                  <button
                    type="button"
                    className="btn-card-back"
                    onClick={() => setStage('waiting')}
                  >
                    ← Back to Status
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-card-back"
                    onClick={handlePrev}
                  >
                    ← Back
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    className="btn-primary-signup"
                    onClick={handleNext}
                    disabled={
                      (step === 1 && !canProceedStep1) ||
                      (step === 2 && !canProceedStep2) ||
                      (step === 3 && !canProceedStep3)
                    }
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary-signup submit-cta"
                    onClick={handleFinalSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="btn-loading-spin">Creating Account...</span>
                    ) : role === 'trainer' ? (
                      'Submit & Verify Documents →'
                    ) : (
                      'Complete Registration →'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
