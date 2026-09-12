import React, { useState, useRef } from 'react'
import './SignupPage.css'
import signupIllustration from '../../assets/signup-illustration.jpg'
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
  const [step, setStep] = useState(1)
  const [role, setRole] = useState(initialRole || 'trainer')
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
    organization: '',
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

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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

  const isPasswordValid = form.password.length >= 8 && /\d/.test(form.password)
  const passwordsMatch = form.password === form.confirmPassword && form.password.length > 0

  // Validation per step
  const canProceedStep1 = form.firstName.trim() && form.lastName.trim() && form.email.trim() && isPasswordValid && passwordsMatch
  const canProceedStep2 = form.organization.trim()
  const canProceedStep3 = role === 'trainer' ? selectedExpertise.length > 0 : selectedInterests.length > 0

  const handleNext = () => {
    if (step === 1 && !canProceedStep1) return
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
    setSubmitted(true)
  }

  // Post Submission Screen
  if (submitted) {
    if (role === 'trainer') {
      return (
        <div className="signup-page-wrap">
          <div className="signup-success-container">
            <div className="signup-success-card trainer-pending-card">
              <div className="pending-badge-pill">
                <span className="pending-pulse-dot" /> Document Verification In Review
              </div>
              <div className="success-icon-wrap pending-icon-glow">
                <span className="success-emoji">📑</span>
              </div>
              <h1 className="success-title">Trainer Account Created!</h1>
              <p className="success-subtitle">
                Welcome, <strong>Dr./Prof. {form.firstName} {form.lastName}</strong>. Your profile has been created successfully.
              </p>

              <div className="verification-status-box">
                <div className="status-header">
                  <span className="status-label">DOCUMENT VERIFICATION STATUS</span>
                  <span className="status-tag pending">Under Institutional Review</span>
                </div>
                <p className="status-desc">
                  Our central institutional verification committee is currently reviewing your uploaded credentials (
                  <strong>{uploadedDocuments.length > 0 ? uploadedDocuments.map((d) => d.name).join(', ') : 'Affiliation_ID_Credentials.pdf'}</strong>
                  ). Standard review takes <strong>24 to 48 hours</strong>.
                </p>
                <div className="verification-steps-list">
                  <div className="v-step done">
                    <span className="v-step-num">✓</span>
                    <span>Account Profile Initialized</span>
                  </div>
                  <div className="v-step active">
                    <span className="v-step-num">2</span>
                    <span>Institutional Credentials Review (Pending)</span>
                  </div>
                  <div className="v-step">
                    <span className="v-step-num">3</span>
                    <span>Verified Badge &amp; Course Publishing Rights</span>
                  </div>
                </div>
              </div>

              <div className="success-action-row">
                <button
                  type="button"
                  className="btn-primary-signup"
                  onClick={() => onDashboard('trainer')}
                >
                  Continue to Trainer Suite →
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

    // Trainee Success
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
                <span>Learning Mode</span>
                <strong>{form.trainingMode}</strong>
              </div>
              <div className="summary-stat-pill">
                <span>Level</span>
                <strong>{form.skillLevel}</strong>
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
      <div className="signup-main-grid">
        {/* LEFT COLUMN: Hero, Brand, Features & Stylized Graphic */}
        <div className="signup-showcase-column">
          {/* Top Back & Sign In Navigation */}
          <div className="signup-top-nav-bar">
            <button type="button" className="signup-nav-back" onClick={onBack}>
              ← Back to home
            </button>
            <div className="signup-nav-signin">
              Already have an account?{' '}
              <button type="button" className="inline-signin-link" onClick={onLogin}>
                Sign in
              </button>
            </div>
          </div>

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
            Create your profile, discover relevant learning opportunities, track your competencies, and connect with verified trainers.
          </p>

          {/* Feature Bullets with green icons */}
          <div className="signup-benefits-list">
            <div className="signup-benefit-item">
              <div className="benefit-circle-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <span>Personalized learning recommendations</span>
            </div>

            <div className="signup-benefit-item">
              <div className="benefit-circle-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              </div>
              <span>Competency-based development &amp; mapping</span>
            </div>

            <div className="signup-benefit-item">
              <div className="benefit-circle-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span>Intelligent, verified trainer matching</span>
            </div>

            <div className="signup-benefit-item">
              <div className="benefit-circle-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F5233" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="2" r="2"></circle>
                </svg>
              </div>
              <span>Real-time progress and assessment tracking</span>
            </div>
          </div>

          {/* Centerpiece 3D Illustration matching design */}
          <div className="signup-illustration-wrapper">
            <img
              src={signupIllustration}
              alt="CapacityConnect Learning Ecosystem"
              className="signup-illustration-img"
            />
            <div className="illustration-caption">
              <span>People</span> × <span>Learning</span> × <span>Progress</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Multi-Step Registration Card */}
        <div className="signup-form-column">
          <div className="signup-card-surface">
            {/* Card Top Icon & Title */}
            <div className="card-top-identity">
              <span className="card-diamond-icon">◇</span>
              <h2 className="card-title">Create your account</h2>
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

            {/* Step 1: Account Information & Role Selection */}
            {step === 1 && (
              <div className="step-content-box animate-fadeIn">
                <p className="step-instruction">
                  Tell us about yourself — enter your personal details to set up your profile.
                </p>

                <div className="form-two-col">
                  <div className="input-group">
                    <label>First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={updateForm}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={updateForm}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="input-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateForm}
                      placeholder="name@imd.gov.in"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Mobile number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={updateForm}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="form-two-col">
                  <div className="input-group">
                    <label>Password</label>
                    <div className="password-input-wrap">
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
                        className="btn-eye-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password"
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Confirm password</label>
                    <div className="password-input-wrap">
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
                        className="btn-eye-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label="Toggle confirm password"
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="password-hint-text">
                  <span>At least 8 characters, with a number</span>
                  {form.password && form.confirmPassword && !passwordsMatch && (
                    <span className="pwd-error-inline"> • Passwords do not match</span>
                  )}
                </div>

                {/* Role Selector Card Deck */}
                <div className="role-selection-section">
                  <h3 className="role-section-title">Select your role</h3>
                  <p className="role-section-subtitle">Choose how you want to use Capacity Connect.</p>

                  <div className="role-cards-grid">
                    {/* Trainer Option */}
                    <div
                      className={`role-option-card ${role === 'trainer' ? 'selected' : ''}`}
                      onClick={() => setRole('trainer')}
                    >
                      <div className="role-card-icon-box trainer-color">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </div>
                      <div className="role-card-content">
                        <strong>Trainer</strong>
                        <p>Create courses, train learners and share knowledge</p>
                      </div>
                      <div className="role-card-radio">
                        <span className={`custom-radio-circle ${role === 'trainer' ? 'checked' : ''}`} />
                      </div>
                    </div>

                    {/* Trainee Option */}
                    <div
                      className={`role-option-card ${role === 'trainee' ? 'selected' : ''}`}
                      onClick={() => setRole('trainee')}
                    >
                      <div className="role-card-icon-box trainee-color">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <div className="role-card-content">
                        <strong>Trainee</strong>
                        <p>Learn new skills, take courses and track your progress</p>
                      </div>
                      <div className="role-card-radio">
                        <span className={`custom-radio-circle ${role === 'trainee' ? 'checked' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Role-Specific Profile Details */}
            {step === 2 && (
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
            {step === 3 && (
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
                        <label>15. Preferred Learning Mode</label>
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
                          <option>Beginner &amp; Foundation</option>
                          <option>Intermediate Level</option>
                          <option>Advanced &amp; Intensive</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label>17. Available Learning Time</label>
                        <select name="learningTime" value={form.learningTime} onChange={updateForm}>
                          <option>2 - 4 hrs / week</option>
                          <option>5 - 10 hrs / week</option>
                          <option>10 - 15 hrs / week</option>
                          <option>Full-time / 20+ hrs / week</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label>18. Preferred Training Schedule</label>
                        <select name="preferredSchedule" value={form.preferredSchedule} onChange={updateForm}>
                          <option>Evening / Weekend Batches</option>
                          <option>Morning Batches (7 AM - 10 AM)</option>
                          <option>Self-Paced Flexible Hours</option>
                          <option>Live Weekend Masterclasses</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Certifications, Bio, Documents (Trainer) & Review */}
            {step === 4 && (
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
                      <span>Mode:</span>
                      <strong>{form.trainingMode} ({form.skillLevel})</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="card-actions-row">
              {step > 1 ? (
                <button
                  type="button"
                  className="btn-card-back"
                  onClick={handlePrev}
                >
                  ← Back
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-card-back"
                  onClick={onBack}
                >
                  ← Back
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  className="btn-primary-signup"
                  onClick={handleNext}
                  disabled={step === 1 && !canProceedStep1}
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
          </div>
        </div>
      </div>
    </div>
  )
}
