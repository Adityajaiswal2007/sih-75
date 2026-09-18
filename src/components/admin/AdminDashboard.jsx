import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'
import cloverIcon from '../../assets/landing/arcticons-clover0.svg'

// Initial Mock Data
const INITIAL_COMPETENCIES = [
  { name: 'Python & Programming', score: 82, target: 80, trainees: 324, status: 'Strong', domain: 'Programming' },
  { name: 'Data Analysis', score: 74, target: 75, trainees: 286, status: 'Developing', domain: 'Meteorology' },
  { name: 'Weather Data Analysis', score: 68, target: 75, trainees: 210, status: 'Developing', domain: 'Meteorology' },
  { name: 'GIS & Spatial Analytics', score: 61, target: 75, trainees: 194, status: 'Developing', domain: 'Geospatial' },
  { name: 'Satellite Remote Sensing', score: 54, target: 75, trainees: 165, status: 'Action Required', domain: 'Remote Sensing' },
  { name: 'Machine Learning in Weather', score: 47, target: 75, trainees: 126, status: 'Action Required', domain: 'Modeling' }
]

const INITIAL_COURSES = [
  { id: 'C101', name: 'Python Fundamentals for Earth Science', enrolled: 324, completion: '86%', avgScore: '82%', status: 'Excellent', domain: 'Programming' },
  { id: 'C102', name: 'Weather Data Analysis & Forecasting', enrolled: 286, completion: '74%', avgScore: '76%', status: 'Good', domain: 'Meteorology' },
  { id: 'C103', name: 'GIS & Spatial Mapping Basics', enrolled: 194, completion: '61%', avgScore: '68%', status: 'Needs Attention', domain: 'Geospatial' },
  { id: 'C104', name: 'Satellite Climatology & Radar Systems', enrolled: 165, completion: '58%', avgScore: '64%', status: 'Needs Attention', domain: 'Remote Sensing' },
  { id: 'C105', name: 'Numerical Weather Prediction (NWP)', enrolled: 142, completion: '79%', avgScore: '80%', status: 'Good', domain: 'Modeling' }
]

const INITIAL_TRAINERS = [
  { name: 'Dr. Rahul Sharma', expertise: 'Weather Data Analysis', score: '92%', trained: '84 trainees', rating: '4.9/5', status: 'Accredited' },
  { name: 'Dr. Neha Verma', expertise: 'Remote Sensing & GIS', score: '89%', trained: '71 trainees', rating: '4.8/5', status: 'Accredited' },
  { name: 'Dr. Amit Kumar', expertise: 'Python & Data Analysis', score: '86%', trained: '96 trainees', rating: '4.7/5', status: 'Accredited' },
  { name: 'Dr. Priya Nair', expertise: 'Atmospheric Physics & NWP', score: '94%', trained: '112 trainees', rating: '4.9/5', status: 'Senior Faculty' }
]

const INITIAL_TRAINEES = [
  { id: 'TR-1082', name: 'Aditya Jaiswal', dept: 'Meteorology Division', enrolled: '6 Enrolled', score: '74%', status: 'Active' },
  { id: 'TR-1094', name: 'Rahul Verma', dept: 'Climatology Unit', enrolled: '4 Enrolled', score: '68%', status: 'Active' },
  { id: 'TR-1105', name: 'Pooja Sharma', dept: 'Remote Sensing Lab', enrolled: '5 Enrolled', score: '88%', status: 'Distinction' },
  { id: 'TR-1112', name: 'Amit Kumar', dept: 'Hydrology Division', enrolled: '3 Enrolled', score: '58%', status: 'Needs Attention' },
  { id: 'TR-1120', name: 'Sneha Patel', dept: 'Numerical Modeling Unit', enrolled: '5 Enrolled', score: '82%', status: 'Active' },
  { id: 'TR-1135', name: 'Vikram Singh', dept: 'Ocean Science Wing', enrolled: '4 Enrolled', score: '76%', status: 'Active' }
]

const INITIAL_ASSESSMENTS = [
  { id: 'ASM-01', title: 'Radar Meteorology Mid-Term Assessment', course: 'Satellite Climatology & Radar Systems', candidates: 142, date: 'Sept 18, 2026', avgScore: '71%', status: 'Scheduled' },
  { id: 'ASM-02', title: 'Python for Earth Sciences Lab Exam', course: 'Python Fundamentals for Earth Science', candidates: 310, date: 'Sept 10, 2026', avgScore: '84%', status: 'Completed' },
  { id: 'ASM-03', title: 'GIS Spatial Analytics Practical Exam', course: 'GIS & Spatial Mapping Basics', candidates: 185, date: 'Sept 04, 2026', avgScore: '68%', status: 'Completed' },
  { id: 'ASM-04', title: 'Numerical Weather Prediction Evaluation', course: 'Numerical Weather Prediction (NWP)', candidates: 130, date: 'Sept 25, 2026', avgScore: '--', status: 'Upcoming' }
]

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Competency Gap Alert', desc: '12 competency gaps need attention in Satellite Climatology & Radar.', time: '10m ago', unread: true },
  { id: 2, title: 'Faculty Accreditation Request', desc: 'Dr. Sunita Rao submitted faculty verification credentials.', time: '1h ago', unread: true },
  { id: 3, title: 'Trainee Cohort Feedback', desc: 'New trainee evaluation reports uploaded from IMD Pune Center.', time: '3h ago', unread: false },
  { id: 4, title: 'Scheduled Platform Audit', desc: 'System integrity and security logs synchronized with MoES server.', time: '1d ago', unread: false }
]

// Mock Dataset for Trainer & Trainee Approvals (Step 1 Registration Requests)
const INITIAL_TRAINER_APPROVALS = [
  {
    id: 'REQ-IMD-2026-8941',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@imd.gov.in',
    role: 'Trainer',
    organization: 'India Meteorological Department (IMD HQ New Delhi)',
    submissionDate: 'Today, 09:30 IST',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-7723',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@iitm.res.in',
    role: 'Trainer',
    organization: 'Indian Institute of Tropical Meteorology (IITM Pune)',
    submissionDate: 'Yesterday, 16:15 IST',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-6819',
    name: 'Dr. Meenakshi Sundaram',
    email: 'm.sundaram@incois.gov.in',
    role: 'Trainer',
    organization: 'INCOIS (MoES Hyderabad)',
    submissionDate: 'Yesterday, 11:20 IST',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-6150',
    name: 'Dr. Alok Sengupta',
    email: 'alok.sengupta@ncmrwf.gov.in',
    role: 'Trainer',
    organization: 'NCMRWF (Ministry of Earth Sciences, Noida)',
    submissionDate: '16 Sep 2026',
    slaTime: 'Approved',
    status: 'Approved',
    approvalMemo: 'MoES/APP/2026/092'
  }
]

const INITIAL_TRAINEE_APPROVALS = [
  {
    id: 'REQ-IMD-2026-9284',
    name: 'Aditya Jaiswal',
    email: 'aditya.jaiswal@imd.gov.in',
    role: 'Trainee',
    organization: 'India Meteorological Department (Pune Node)',
    submissionDate: 'Today, 11:45 IST',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-9102',
    name: 'Ananya Verma',
    email: 'ananya.verma@du.ac.in',
    role: 'Trainee',
    organization: 'Department of Physics & Astrophysics, Delhi University',
    submissionDate: 'Yesterday, 14:20 IST',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-8840',
    name: 'Suresh Menon',
    email: 'suresh.menon@incois.gov.in',
    role: 'Trainee',
    organization: 'INCOIS Hyderabad (Ocean Science Wing)',
    submissionDate: 'Yesterday, 09:10 IST',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-8219',
    name: 'Sneha Patel',
    email: 'sneha.patel@iitk.ac.in',
    role: 'Trainee',
    organization: 'IIT Kanpur (Earth Sciences Division)',
    submissionDate: '16 Sep 2026',
    slaTime: 'Up to 2 working days',
    status: 'Pending'
  },
  {
    id: 'REQ-IMD-2026-5321',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@personalmail.com',
    role: 'Trainee',
    organization: 'Unverified Entity / Independent Applicant',
    submissionDate: '15 Sep 2026',
    slaTime: 'Rejected',
    status: 'Rejected',
    rejectionReason: 'Non-institutional email domain. Advised to contact the administrator or HR.'
  }
]

const MONTHLY_ANALYTICS = [
  { month: 'Apr', trainees: 1420, completed: 1100, hours: 8900, score: 72 },
  { month: 'May', trainees: 1680, completed: 1320, hours: 9800, score: 73 },
  { month: 'Jun', trainees: 1890, completed: 1480, hours: 10600, score: 75 },
  { month: 'Jul', trainees: 2150, completed: 1720, hours: 11400, score: 74 },
  { month: 'Aug', trainees: 2340, completed: 1890, hours: 12100, score: 77 },
  { month: 'Sep', trainees: 2486, completed: 1948, hours: 12840, score: 78 }
]

const DOMAIN_ANALYTICS = [
  { domain: 'Meteorology & NWP', percent: 38, count: 945, color: '#1B4332' },
  { domain: 'Satellite Remote Sensing', percent: 24, count: 597, color: '#2D6A4F' },
  { domain: 'GIS & Spatial Analytics', percent: 18, count: 447, color: '#40916C' },
  { domain: 'Python & HPC Computing', percent: 14, count: 348, color: '#74C69D' },
  { domain: 'Ocean & Climatology', percent: 6, count: 149, color: '#B7E4C7' }
]

const REGIONAL_CENTER_PERFORMANCE = [
  { name: 'IMD Pune Training Node', trainees: 642, passRate: 94, avgScore: 84.2, status: 'Top Performing' },
  { name: 'IMD New Delhi Directorate HQ', trainees: 720, passRate: 91, avgScore: 82.5, status: 'Top Performing' },
  { name: 'IITM Pune Atmospheric Wing', trainees: 480, passRate: 88, avgScore: 79.4, status: 'Strong' },
  { name: 'NCMRWF Noida Modeling Center', trainees: 390, passRate: 85, avgScore: 76.8, status: 'Developing' },
  { name: 'INCOIS Hyderabad Ocean Node', trainees: 254, passRate: 82, avgScore: 74.2, status: 'Developing' }
]

const GRADE_DISTRIBUTION = [
  { grade: 'Distinction (85%+)', percent: 34, count: 845, color: '#1B4332' },
  { grade: 'Proficient (70-84%)', percent: 42, count: 1044, color: '#2D6A4F' },
  { grade: 'Developing (55-69%)', percent: 18, count: 448, color: '#D97706' },
  { grade: 'Needs Remediation (<55%)', percent: 6, count: 149, color: '#DC2626' }
]

// Live Institutional Activities Feed
const LIVE_INSTITUTIONAL_ACTIVITIES = [
  { id: 1, type: 'Certification', icon: '🏆', title: 'Radar Meteorology Certification', desc: '18 trainees from IMD Pune Node completed distinction criteria (Avg 89%).', time: 'Just now', center: 'IMD Pune Node' },
  { id: 2, type: 'Enrollment', icon: '📥', title: 'New Cohort Enrolled', desc: '42 trainees enrolled in Numerical Weather Prediction (NWP) Module 3.', time: '12m ago', center: 'New Delhi HQ' },
  { id: 3, type: 'Faculty', icon: '👨‍🏫', title: 'Trainer Allocation Complete', desc: 'Dr. Priya Nair assigned as Lead Instructor for Advanced Earth Observation.', time: '34m ago', center: 'IITM Pune' },
  { id: 4, type: 'System', icon: '🛡️', title: 'Automated Competency Sync', desc: 'Workforce skill matrix synchronized with MoES Central Repository.', time: '1h ago', center: 'NCMRWF Noida' },
  { id: 5, type: 'Assessment', icon: '📝', title: 'Assessment Roster Released', desc: 'Python for Geospatial Data scheduled for Sept 22 with 130 candidates.', time: '2h ago', center: 'INCOIS Hyderabad' }
]

// 5 Official Regional Center Nodes
const REGIONAL_NODES_DATA = [
  {
    id: 'node-pune',
    name: 'IMD Pune Training Node',
    city: 'Pune, Maharashtra',
    lead: 'Dr. S. K. Roy (Director of Training)',
    capacity: 750,
    enrolled: 642,
    passRate: 94,
    avgScore: 84.2,
    status: 'Operational • Optimal',
    latency: '18ms',
    uptime: '99.98%',
    activeCohorts: 8,
    color: '#1B4332'
  },
  {
    id: 'node-delhi',
    name: 'IMD New Delhi Directorate HQ',
    city: 'Mausam Bhawan, New Delhi',
    lead: 'Dr. M. Mohapatra (Director General)',
    capacity: 850,
    enrolled: 720,
    passRate: 91,
    avgScore: 82.5,
    status: 'Operational • High Activity',
    latency: '12ms',
    uptime: '100%',
    activeCohorts: 10,
    color: '#2D6A4F'
  },
  {
    id: 'node-iitm',
    name: 'IITM Pune Atmospheric Wing',
    city: 'Pashan, Pune',
    lead: 'Dr. R. Krishnan (Director)',
    capacity: 550,
    enrolled: 480,
    passRate: 88,
    avgScore: 79.4,
    status: 'Operational • Normal',
    latency: '22ms',
    uptime: '99.94%',
    activeCohorts: 6,
    color: '#40916C'
  },
  {
    id: 'node-ncmrwf',
    name: 'NCMRWF Noida Modeling Center',
    city: 'Sector 62, Noida',
    lead: 'Dr. V. S. Prasad (Head of HPC)',
    capacity: 450,
    enrolled: 390,
    passRate: 85,
    avgScore: 76.8,
    status: 'Operational • Normal',
    latency: '15ms',
    uptime: '99.91%',
    activeCohorts: 5,
    color: '#52B788'
  },
  {
    id: 'node-incois',
    name: 'INCOIS Hyderabad Ocean Node',
    city: 'Pragathi Nagar, Hyderabad',
    lead: 'Dr. T. Srinivasa Kumar (Director)',
    capacity: 350,
    enrolled: 254,
    passRate: 82,
    avgScore: 74.2,
    status: 'Operational • Normal',
    latency: '26ms',
    uptime: '99.85%',
    activeCohorts: 4,
    color: '#74C69D'
  }
]

// 5-Stage Cohort Funnel Progression
const COHORT_FUNNEL_STAGES = [
  { stage: '1. Enrolled Candidates', count: 2486, pct: 100, desc: 'Registered personnel across all national nodes', color: '#1B4332' },
  { stage: '2. Active Learning', count: 2210, pct: 88.9, desc: 'Completed ≥3 study modules and assignments', color: '#2D6A4F' },
  { stage: '3. Mid-Term Evaluated', count: 1840, pct: 74.0, desc: 'Appeared in certified practical evaluations', color: '#40916C' },
  { stage: '4. Remedial Coaching', count: 149, pct: 6.0, desc: 'Assigned targeted 1-on-1 mentor sessions', color: '#D97706' },
  { stage: '5. Certified Distinction', count: 1691, pct: 68.0, desc: 'Accredited with official MoES competency badge', color: '#10B981' }
]

export default function AdminDashboard({ onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [period, setPeriod] = useState('30 Days')
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  // Interactive spotlight command palette
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [commandSearch, setCommandSearch] = useState('')
  const [selectedNode, setSelectedNode] = useState(null)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [activeActivityFilter, setActiveActivityFilter] = useState('All')

  // Analytics tab filters and interactive state
  const [analyticsPeriod, setAnalyticsPeriod] = useState('30 Days')
  const [analyticsCenter, setAnalyticsCenter] = useState('All Centers')
  const [hoveredMonth, setHoveredMonth] = useState(null)
  const [hoveredDomain, setHoveredDomain] = useState(null)

  // Global Ctrl+K Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Data states
  const [courses] = useState(INITIAL_COURSES)
  const [trainers, setTrainers] = useState(INITIAL_TRAINERS)
  const [trainees, setTrainees] = useState(INITIAL_TRAINEES)
  const [assessments] = useState(INITIAL_ASSESSMENTS)
  const [competencies] = useState(INITIAL_COMPETENCIES)

  // Modal & Notification States
  const [activeModal, setActiveModal] = useState(null)
  const [actionSuccessMsg, setActionSuccessMsg] = useState('')

  // User Management / Create User state
  const [userMgmtSubTab, setUserMgmtSubTab] = useState('directory') // 'directory' | 'single' | 'bulk'
  const [userDirectorySearch, setUserDirectorySearch] = useState('')
  const [userDirectoryRoleFilter, setUserDirectoryRoleFilter] = useState('All')
  const [userDirectoryDeptFilter, setUserDirectoryDeptFilter] = useState('All')
  const [directoryModalOpen, setDirectoryModalOpen] = useState(false)
  const [userMgmtStep, setUserMgmtStep] = useState('select') // 'select' | 'form-trainee' | 'form-trainer' | 'success'
  const [createdUserResult, setCreatedUserResult] = useState(null)
  const [traineeFormErrors, setTraineeFormErrors] = useState({})
  const [trainerFormErrors, setTrainerFormErrors] = useState({})

  // Deactivate / Suspend User State
  const [deactSearchQuery, setDeactSearchQuery] = useState('')
  const [deactRoleFilter, setDeactRoleFilter] = useState('All') // 'All' | 'Trainee' | 'Trainer' | 'Admin'
  const [deactStatusFilter, setDeactStatusFilter] = useState('All') // 'All' | 'Active' | 'Suspended'
  const [suspensionModalUser, setSuspensionModalUser] = useState(null)
  const [suspensionReason, setSuspensionReason] = useState('Official Transfer to Another Division / Ministry')
  const [suspensionMemoNumber, setSuspensionMemoNumber] = useState('MoES/EST/2026/891')
  const [suspensionEffectiveDate, setSuspensionEffectiveDate] = useState('2026-09-17')
  const [suspensionComments, setSuspensionComments] = useState('')

  // Registration & Access Approvals State (Trainers & Trainees)
  const [trainerApprovals, setTrainerApprovals] = useState(INITIAL_TRAINER_APPROVALS)
  const [traineeApprovals, setTraineeApprovals] = useState(INITIAL_TRAINEE_APPROVALS)
  const [approvalSubTab, setApprovalSubTab] = useState('trainers') // 'trainers' | 'trainees' | 'audit'
  const [approvalSearchQuery, setApprovalSearchQuery] = useState('')
  const [approvalStatusFilter, setApprovalStatusFilter] = useState('All') // 'All' | 'Pending' | 'Approved' | 'Rejected'
  const [approvalDeptFilter, setApprovalDeptFilter] = useState('All')
  const [selectedApprovalDetails, setSelectedApprovalDetails] = useState(null)
  const [rejectingApprovalItem, setRejectingApprovalItem] = useState(null)
  const [rejectionReasonInput, setRejectionReasonInput] = useState('Non-institutional domain or lack of official departmental sponsorship.')
  const [selectedApprovalIds, setSelectedApprovalIds] = useState([])

  const pendingTrainerCount = trainerApprovals.filter(a => a.status === 'Pending').length
  const pendingTraineeCount = traineeApprovals.filter(a => a.status === 'Pending').length
  const totalPendingCount = pendingTrainerCount + pendingTraineeCount

  const handleApproveRequest = (item) => {
    const memo = `MoES/APP/2026/${Math.floor(100 + Math.random() * 900)}`
    if (item.role === 'Trainer') {
      setTrainerApprovals(prev => prev.map(t => t.id === item.id ? { ...t, status: 'Approved', slaTime: 'Approved', approvalMemo: memo } : t))
      if (!trainers.some(tr => tr.name === item.name)) {
        setTrainers(prev => [
          {
            name: item.name,
            expertise: item.department || 'Meteorology & NWP',
            score: '94%',
            trained: '0 trainees',
            rating: '5.0/5',
            status: 'Accredited'
          },
          ...prev
        ])
      }
    } else {
      setTraineeApprovals(prev => prev.map(t => t.id === item.id ? { ...t, status: 'Approved', slaTime: 'Approved', approvalMemo: memo } : t))
      if (!trainees.some(tr => tr.name === item.name)) {
        setTrainees(prev => [
          {
            id: `TR-${Math.floor(1140 + Math.random() * 100)}`,
            name: item.name,
            dept: item.department || 'Meteorology Division',
            enrolled: '0 Enrolled',
            score: 'New',
            status: 'Active'
          },
          ...prev
        ])
      }
    }
    if (selectedApprovalDetails && selectedApprovalDetails.id === item.id) {
      setSelectedApprovalDetails(null)
    }
    setActionSuccessMsg(`✓ Access Approved for ${item.name} (${item.id})! Memo ${memo} generated and clearance notification dispatched.`)
    setTimeout(() => setActionSuccessMsg(''), 5000)
  }

  const handleInitiateReject = (item) => {
    setRejectingApprovalItem(item)
    setRejectionReasonInput('Non-institutional email domain or lack of official departmental sponsorship.')
  }

  const handleConfirmReject = () => {
    if (!rejectingApprovalItem) return
    const item = rejectingApprovalItem
    if (item.role === 'Trainer') {
      setTrainerApprovals(prev => prev.map(t => t.id === item.id ? { ...t, status: 'Rejected', slaTime: 'Rejected', rejectionReason: rejectionReasonInput } : t))
    } else {
      setTraineeApprovals(prev => prev.map(t => t.id === item.id ? { ...t, status: 'Rejected', slaTime: 'Rejected', rejectionReason: rejectionReasonInput } : t))
    }
    if (selectedApprovalDetails && selectedApprovalDetails.id === item.id) {
      setSelectedApprovalDetails(null)
    }
    setRejectingApprovalItem(null)
    setActionSuccessMsg(`✕ Access Request ${item.id} (${item.name}) rejected. Official notice logged with contact escalation advisory.`)
    setTimeout(() => setActionSuccessMsg(''), 5000)
  }

  const handleBatchApprove = () => {
    if (selectedApprovalIds.length === 0) return
    if (approvalSubTab === 'trainers') {
      setTrainerApprovals(prev => prev.map(t => selectedApprovalIds.includes(t.id) ? { ...t, status: 'Approved', slaTime: 'Approved', approvalMemo: `MoES/APP/2026/${Math.floor(100 + Math.random() * 900)}` } : t))
    } else if (approvalSubTab === 'trainees') {
      setTraineeApprovals(prev => prev.map(t => selectedApprovalIds.includes(t.id) ? { ...t, status: 'Approved', slaTime: 'Approved', approvalMemo: `MoES/APP/2026/${Math.floor(100 + Math.random() * 900)}` } : t))
    }
    setActionSuccessMsg(`✓ Batch Action Complete: Approved ${selectedApprovalIds.length} candidate registration requests!`)
    setSelectedApprovalIds([])
    setTimeout(() => setActionSuccessMsg(''), 5000)
  }

  const handleToggleSelectId = (id) => {
    setSelectedApprovalIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  const [suspensionLogs, setSuspensionLogs] = useState([
    {
      id: 'LOG-891',
      targetName: 'Kavita Deshmukh',
      targetId: 'TR-1049',
      role: 'Trainee',
      action: 'SUSPENDED',
      reason: 'Official Transfer to IMD Pune Center',
      memoNo: 'MoES/HR/2026/112',
      adminId: 'ADM-004 (Directorate)',
      timestamp: 'Today, 14:15 IST'
    },
    {
      id: 'LOG-890',
      targetName: 'Dr. Suresh Joshi',
      targetId: 'TRR-3012',
      role: 'Trainer',
      action: 'SUSPENDED',
      reason: 'Contract Term Completed',
      memoNo: 'IMD/FAC/2026/089',
      adminId: 'ADM-004 (Directorate)',
      timestamp: 'Yesterday, 11:30 IST'
    },
    {
      id: 'LOG-889',
      targetName: 'Rohit Aggarwal',
      targetId: 'TR-1066',
      role: 'Trainee',
      action: 'REACTIVATED',
      reason: 'Reinstated Post Sabbatical Leave',
      memoNo: 'MoES/ADM/2026/504',
      adminId: 'ADM-004 (Directorate)',
      timestamp: '15 Sep 2026'
    }
  ])

  const handleInitiateSuspend = (user) => {
    setSuspensionModalUser(user)
    setSuspensionReason('Official Transfer to Another Division / Ministry')
    setSuspensionMemoNumber(`MoES/ORD/2026/${Math.floor(100 + Math.random() * 900)}`)
    setSuspensionEffectiveDate(new Date().toISOString().split('T')[0])
    setSuspensionComments('')
  }

  const handleConfirmSuspend = () => {
    if (!suspensionModalUser) return
    const targetUser = suspensionModalUser

    if (targetUser.role === 'Trainee') {
      setTrainees(prev => prev.map(t => (t.id === targetUser.id || t.name === targetUser.name) ? { ...t, status: 'Suspended' } : t))
    } else if (targetUser.role === 'Trainer') {
      setTrainers(prev => prev.map(t => t.name === targetUser.name ? { ...t, status: 'Suspended' } : t))
    }

    const newLog = {
      id: `LOG-${Math.floor(892 + Math.random() * 100)}`,
      targetName: targetUser.name,
      targetId: targetUser.id,
      role: targetUser.role,
      action: 'SUSPENDED',
      reason: suspensionReason,
      memoNo: suspensionMemoNumber || 'MoES/GEN/2026/001',
      adminId: 'ADM-004 (Directorate)',
      timestamp: 'Just now'
    }

    setSuspensionLogs(prev => [newLog, ...prev])
    setSuspensionModalUser(null)
    setActionSuccessMsg(`Account access suspended for ${targetUser.name} (${targetUser.id}). Historical training records preserved in compliance with MoES directives.`)
    setTimeout(() => setActionSuccessMsg(''), 5000)
  }

  const handleReactivateUser = (user) => {
    if (user.role === 'Trainee') {
      setTrainees(prev => prev.map(t => (t.id === user.id || t.name === user.name) ? { ...t, status: 'Active' } : t))
    } else if (user.role === 'Trainer') {
      setTrainers(prev => prev.map(t => t.name === user.name ? { ...t, status: 'Accredited' } : t))
    }

    const newLog = {
      id: `LOG-${Math.floor(892 + Math.random() * 100)}`,
      targetName: user.name,
      targetId: user.id,
      role: user.role,
      action: 'REACTIVATED',
      reason: 'Administrative Reinstatement & Access Reactivation',
      memoNo: `MoES/REINSTATE/2026/${Math.floor(100 + Math.random() * 900)}`,
      adminId: 'ADM-004 (Directorate)',
      timestamp: 'Just now'
    }

    setSuspensionLogs(prev => [newLog, ...prev])
    setActionSuccessMsg(`Account reinstated and access permissions restored for ${user.name} (${user.id}) ✓`)
    setTimeout(() => setActionSuccessMsg(''), 5000)
  }

  const handleExportSuspensionAudit = () => {
    let csv = `Audit Log ID,Target Name,Staff ID,Role,Action,Reason,Official Memo / Order,Authorized Admin,Timestamp\n`
    suspensionLogs.forEach(l => {
      csv += `"${l.id}","${l.targetName}","${l.targetId}","${l.role}","${l.action}","${l.reason}","${l.memoNo}","${l.adminId}","${l.timestamp}"\n`
    })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `moes_access_revocation_audit_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setActionSuccessMsg(`Downloaded Access Revocation & Suspension Audit Log (${suspensionLogs.length} events)`)
    setTimeout(() => setActionSuccessMsg(''), 3500)
  }

  const handleDownloadFullDirectory = (format = 'csv') => {
    const allUsersList = [
      ...trainers.map((t, idx) => ({
        id: `TRR-700${idx + 1}`,
        name: t.name,
        role: 'Trainer',
        dept: 'Atmospheric Sciences Wing',
        designation: 'Senior Faculty / Scientist',
        email: `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@imd.gov.in`,
        status: 'Active'
      })),
      ...trainees.map(t => ({
        id: t.id,
        name: t.name,
        role: 'Trainee',
        dept: t.dept,
        designation: 'Scientific Officer',
        email: `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@imd.gov.in`,
        status: t.status
      }))
    ]
    let csv = `User / Name,Staff ID,Role,Department,Designation,Official Email,Status\n`
    allUsersList.forEach(u => {
      csv += `"${u.name}","${u.id}","${u.role}","${u.dept}","${u.designation}","${u.email}","${u.status}"\n`
    })
    const blob = new Blob([csv], { type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `capacityconnect_full_directory_${Date.now()}.${format === 'csv' ? 'csv' : 'xlsx'}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setActionSuccessMsg(`Downloaded full directory (${allUsersList.length} records)`)
    setTimeout(() => setActionSuccessMsg(''), 3500)
  }

  // Bulk Onboarding state
  const [bulkImportRole, setBulkImportRole] = useState('All') // 'All' | 'Trainer' | 'Trainee'
  const [bulkFile, setBulkFile] = useState(null)
  const [bulkRows, setBulkRows] = useState([])
  const [bulkStage, setBulkStage] = useState('upload') // 'upload' | 'preview' | 'processing' | 'result'
  const [bulkProgress, setBulkProgress] = useState(0)
  const [bulkStepMessage, setBulkStepMessage] = useState('')
  const [bulkSummary, setBulkSummary] = useState({ successCount: 0, failedCount: 0, successfulRows: [], failedRows: [] })
  const [bulkDragActive, setBulkDragActive] = useState(false)

  // Generated ID state for current creation session
  const [generatedSingleUserId, setGeneratedSingleUserId] = useState(() => `TRR-${Math.floor(10000 + Math.random() * 90000)}`)
  const [generatedTempPassword, setGeneratedTempPassword] = useState(() => `IMD#${Math.floor(1000 + Math.random() * 9000)}!x`)
  const [showPasswordInSuccess, setShowPasswordInSuccess] = useState(false)
  const [copiedKey, setCopiedKey] = useState(false)

  // Single User Form Fields (Role, Name, Email, Organization)
  const [singleUserRole, setSingleUserRole] = useState('Trainer') // 'Trainer' | 'Trainee'
  const [singleUserName, setSingleUserName] = useState('')
  const [singleUserEmail, setSingleUserEmail] = useState('')
  const [singleUserOrg, setSingleUserOrg] = useState('Meteorology Division, IMD')
  const [singleUserErrors, setSingleUserErrors] = useState({})

  // Bulk Demo Dataset for 1-Click Evaluation (Role, Name, Email, Organization)
  const DEMO_BULK_DATASET = [
    { rowNum: 1, role: 'Trainer', name: 'Dr. Suresh Rao', email: 'suresh.rao@imd.gov.in', organization: 'Atmospheric Sciences Wing', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 2, role: 'Trainer', name: 'Dr. Ananya Deshmukh', email: 'ananya.d@imd.gov.in', organization: 'Meteorology Division', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 3, role: 'Trainer', name: 'Dr. Rajesh Iyer', email: 'rajesh.iyer@iitm.res.in', organization: 'Numerical Modeling Unit', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 4, role: 'Trainer', name: 'Dr. Rahul Sharma', email: 'rahul.sharma@imd.gov.in', organization: 'Meteorology Division', status: 'duplicate', reason: 'Email already exists in database' },
    { rowNum: 5, role: 'Trainee', name: 'Dr. Meenakshi Sundaram', email: 'm.sundaram@incois.gov.in', organization: 'Ocean Science Wing', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 6, role: 'Trainee', name: 'Aditya Jaiswal', email: 'aditya.j@imd.gov.in', organization: 'Meteorology Division', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 7, role: 'Trainer', name: 'Dr. Kavita Menon', email: 'kavita.menon@imd.gov.in', organization: 'Remote Sensing Lab', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 8, role: 'Trainee', name: 'Alok Tripathi', email: '', organization: 'Hydrology Division', status: 'invalid', reason: 'Email address is required' },
    { rowNum: 9, role: 'Trainer', name: 'Dr. Shalini Pandey', email: 'shalini.p@imd.gov.in', organization: 'Climate Research Wing', status: 'valid', reason: 'Ready for ingestion' },
    { rowNum: 10, role: 'Trainee', name: 'Harish Babu', email: 'harish.babu@imd.gov.in', organization: 'Meteorology Division', status: 'valid', reason: 'Ready for ingestion' }
  ]

  const handleDownloadTemplate = (format = 'csv') => {
    const content = `Role,Name,Email,Organization\nTrainer,Dr. Suresh Rao,suresh.rao@imd.gov.in,Atmospheric Sciences Wing\nTrainer,Dr. Ananya Deshmukh,ananya.d@imd.gov.in,Meteorology Division\nTrainee,Aditya Jaiswal,aditya.j@imd.gov.in,Meteorology Division\nTrainee,Sneha Patel,sneha.patel@imd.gov.in,Numerical Modeling Unit\n`
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `capacityconnect_user_import_template.${format === 'csv' ? 'csv' : 'xlsx'}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLoadDemoCsv = () => {
    setBulkFile({ name: 'user_onboarding_cohort_sample.csv', size: '2.8 KB' })
    const enriched = DEMO_BULK_DATASET.map(row => ({
      ...row,
      autoId: row.role === 'Trainer' ? `TRR-${Math.floor(10000 + Math.random() * 90000)}` : `TRN-${Math.floor(10000 + Math.random() * 90000)}`,
      tempPwd: `IMD#${Math.floor(1000 + Math.random() * 9000)}!x`
    }))
    setBulkRows(enriched)
    setBulkStage('preview')
  }

  const handleCsvFileSelect = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setBulkFile({ name: file.name, size: `${(file.size / 1024).toFixed(1)} KB` })
    const reader = new FileReader()
    reader.onload = (evt) => {
      const text = evt.target.result
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
      if (lines.length <= 1) {
        handleLoadDemoCsv()
        return
      }
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z]/g, ''))
      const roleIdx = headers.findIndex(h => h.includes('role'))
      const nameIdx = headers.findIndex(h => h.includes('name'))
      const emailIdx = headers.findIndex(h => h.includes('email') || h.includes('mail'))
      const orgIdx = headers.findIndex(h => h.includes('org') || h.includes('dept') || h.includes('affiliation'))

      const rows = []
      const existingEmails = new Set(trainers.map(t => (t.name || '').toLowerCase()))
      
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map(c => c.replace(/^["']|["']$/g, '').trim())
        if (cols.length < 2) continue
        
        let role = (roleIdx !== -1 && cols[roleIdx]) ? cols[roleIdx] : 'Trainee'
        if (/trainer|faculty|instructor/i.test(role)) role = 'Trainer'
        else role = 'Trainee'

        const name = (nameIdx !== -1 && cols[nameIdx]) ? cols[nameIdx] : (cols[1] || `User_${i}`)
        const email = (emailIdx !== -1 && cols[emailIdx]) ? cols[emailIdx] : (cols[2] || `user${i}@imd.gov.in`)
        const organization = (orgIdx !== -1 && cols[orgIdx]) ? cols[orgIdx] : (cols[3] || 'Meteorology Division, IMD')

        let status = 'valid'
        let reason = 'Ready for ingestion'
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          status = 'invalid'
          reason = 'Invalid or missing email address'
        } else if (!name || name.trim().length === 0) {
          status = 'invalid'
          reason = 'Missing full name'
        } else if (existingEmails.has(name.toLowerCase()) || email.includes('rahul.sharma')) {
          status = 'duplicate'
          reason = 'Email already registered in system'
        }

        const autoId = role === 'Trainer' ? `TRR-${Math.floor(10000 + Math.random() * 90000)}` : `TRN-${Math.floor(10000 + Math.random() * 90000)}`
        const tempPwd = `IMD#${Math.floor(1000 + Math.random() * 9000)}!x`

        rows.push({
          rowNum: i,
          role,
          name,
          email,
          organization,
          status,
          reason,
          autoId,
          tempPwd
        })
      }
      setBulkRows(rows.length > 0 ? rows : DEMO_BULK_DATASET)
      setBulkStage('preview')
    }
    reader.readAsText(file)
  }

  const handleExecuteBulkImport = () => {
    setBulkStage('processing')
    setBulkProgress(15)
    setBulkStepMessage('Parsing Role, Name, and Email attributes against central schema...')

    setTimeout(() => {
      setBulkProgress(50)
      setBulkStepMessage('Generating role-based TRR/TRN identifiers & salted temp passwords...')
    }, 600)

    setTimeout(() => {
      setBulkProgress(80)
      setBulkStepMessage('Writing user records into directory & queuing SMTP onboarding dispatches...')
    }, 1200)

    setTimeout(() => {
      setBulkProgress(100)
      setBulkStepMessage('All valid records ingested and welcome credentials dispatched!')
      
      const validOnes = bulkRows.filter(r => r.status === 'valid')
      const failedOnes = bulkRows.filter(r => r.status !== 'valid')
      
      const newTrainers = validOnes.filter(r => r.role === 'Trainer').map(r => ({
        name: r.name,
        expertise: r.organization || 'Atmospheric Sciences',
        score: '92%',
        trained: '0 trainees',
        rating: '5.0/5',
        status: 'Accredited'
      }))
      const newTrainees = validOnes.filter(r => r.role === 'Trainee').map(r => ({
        id: r.autoId,
        name: r.name,
        dept: r.organization || 'Meteorology Division',
        enrolled: '1 Enrolled',
        score: '80%',
        status: 'Active'
      }))

      if (newTrainers.length > 0) setTrainers(prev => [...newTrainers, ...prev])
      if (newTrainees.length > 0) setTrainees(prev => [...newTrainees, ...prev])

      setBulkSummary({
        successCount: validOnes.length,
        failedCount: failedOnes.length,
        successfulRows: validOnes,
        failedRows: failedOnes
      })
      setBulkStage('result')
      setActionSuccessMsg(`Bulk Ingestion Complete: ${validOnes.length} users created (${newTrainers.length} Trainers, ${newTrainees.length} Trainees), ${failedOnes.length} skipped.`)
      setTimeout(() => setActionSuccessMsg(''), 5000)
    }, 1800)
  }

  const handleDownloadErrorReport = () => {
    if (!bulkSummary.failedRows.length) return
    let csv = `Row Number,Role,Name,Email,Organization,Failure Reason\n`
    bulkSummary.failedRows.forEach(r => {
      csv += `${r.rowNum},"${r.role}","${r.name}","${r.email}","${r.organization}","${r.reason}"\n`
    })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `onboarding_error_log_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSingleRoleChange = (role) => {
    setSingleUserRole(role)
    if (role === 'Trainer') {
      setGeneratedSingleUserId(`TRR-${Math.floor(10000 + Math.random() * 90000)}`)
    } else {
      setGeneratedSingleUserId(`TRN-${Math.floor(10000 + Math.random() * 90000)}`)
    }
  }

  const handleSingleUserSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!singleUserName.trim()) {
      errors.name = 'Full name is required'
    }
    if (!singleUserEmail.trim()) {
      errors.email = 'Official email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(singleUserEmail.trim())) {
      errors.email = 'Enter a valid institutional email (e.g. name@imd.gov.in)'
    }

    if (Object.keys(errors).length > 0) {
      setSingleUserErrors(errors)
      return
    }

    const trimmedName = singleUserName.trim()
    const trimmedEmail = singleUserEmail.trim()
    const trimmedOrg = singleUserOrg.trim() || 'Meteorology Division, IMD'
    const autoId = generatedSingleUserId || (singleUserRole === 'Trainer' ? `TRR-${Math.floor(10000 + Math.random() * 90000)}` : `TRN-${Math.floor(10000 + Math.random() * 90000)}`)

    if (singleUserRole === 'Trainer') {
      const newTrainerEntry = {
        name: trimmedName,
        expertise: trimmedOrg,
        score: '92%',
        trained: '0 trainees',
        rating: '5.0/5',
        status: 'Accredited'
      }
      setTrainers(prev => [newTrainerEntry, ...prev])
    } else {
      const newTraineeEntry = {
        id: autoId,
        name: trimmedName,
        dept: trimmedOrg,
        enrolled: '1 Enrolled',
        score: '80%',
        status: 'Active'
      }
      setTrainees(prev => [newTraineeEntry, ...prev])
    }

    setCreatedUserResult({
      name: trimmedName,
      role: singleUserRole,
      userId: autoId,
      email: trimmedEmail,
      tempPassword: generatedTempPassword,
      organization: trimmedOrg,
      status: 'Active'
    })
    setUserMgmtStep('success')
    setActionSuccessMsg(`${singleUserRole} account ${autoId} created successfully for ${trimmedName}!`)
    setTimeout(() => setActionSuccessMsg(''), 4500)
  }

  const handleCreateAnother = () => {
    setSingleUserName('')
    setSingleUserEmail('')
    setSingleUserErrors({})
    setCreatedUserResult(null)
    setGeneratedSingleUserId(singleUserRole === 'Trainer' ? `TRR-${Math.floor(10000 + Math.random() * 90000)}` : `TRN-${Math.floor(10000 + Math.random() * 90000)}`)
    setGeneratedTempPassword(`IMD#${Math.floor(1000 + Math.random() * 9000)}!x`)
    setUserMgmtStep('form')
  }

  const openTrainerProfile = () => {
    window.location.hash = '#trainer-profile'
  }

  const markAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const unreadCount = notifications.filter(n => n.unread).length

  // Sidebar navigation structure with SVGs
  const NAV_SECTIONS = [
    {
      group: 'Overview',
      items: [
        {
          id: 'Dashboard',
          label: 'Dashboard',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          )
        },
        {
          id: 'Analytics',
          label: 'Analytics',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Personnel & Access',
      items: [
        {
          id: 'Approvals',
          label: 'Approvals',
          badge: `${totalPendingCount} Pending`,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          )
        },
        {
          id: 'User Management',
          label: 'User Management',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          )
        },
        {
          id: 'Trainees',
          label: 'Trainees',
          badge: '2.4k',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          )
        },
        {
          id: 'Trainers',
          label: 'Trainers',
          badge: trainers.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          )
        },
        {
          id: 'Deactivate / Suspend User',
          label: 'Deactivate / Suspend',
          badge: 'Security',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="17" y1="8" x2="23" y2="14" />
              <line x1="23" y1="8" x2="17" y2="14" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Academic & Learning',
      items: [
        {
          id: 'Courses',
          label: 'Courses',
          badge: courses.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          )
        },
        {
          id: 'Assessments',
          label: 'Assessments',
          badge: assessments.length,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )
        },
        {
          id: 'Learning Content',
          label: 'Learning Content',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          )
        },
        {
          id: 'Competencies',
          label: 'Competencies',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          )
        },
        {
          id: 'Trainer Matching',
          label: 'Trainer Matching',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Administration & System',
      items: [
        {
          id: 'Settings',
          label: 'Settings',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )
        },
        {
          id: 'Reports',
          label: 'Reports & Audit',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          )
        },
        {
          id: 'Announcements',
          label: 'Announcements',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          )
        },
        {
          id: 'Feedback',
          label: 'Feedback',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )
        }
      ]
    }
  ]

  return (
    <div className="admin-layout-root">
      {/* SIDEBAR */}
      <aside className={`admin-sidebar-container ${drawerOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <button type="button" className="admin-sidebar-brand" onClick={onBack} title="Return to Landing Page">
            <div className="admin-sidebar-logo-icon">
              <img src={cloverIcon} alt="CapacityConnect" style={{ width: 18, height: 18 }} />
            </div>
            <div className="admin-sidebar-brand-text">
              <div className="admin-brand-name">
                <span className="admin-brand-part-cap">Capacity</span>
                <span className="admin-brand-part-conn">Connect</span>
              </div>
              <div className="admin-brand-portal-badge">ADMIN PORTAL</div>
            </div>
          </button>
        </div>

        {/* Scrollable Navigation Groups */}
        <nav className="admin-sidebar-nav-scroll">
          {NAV_SECTIONS.map((sec) => (
            <div className="admin-nav-group" key={sec.group}>
              <div className="admin-nav-group-title">{sec.group}</div>
              {sec.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`admin-nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(item.id)
                    setDrawerOpen(false)
                  }}
                >
                  <div className="admin-nav-btn-left">
                    <span className="admin-nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Institutional Live Sync Indicator */}
        <div className="admin-sidebar-status-card">
          <div className="admin-status-indicator">
            <span className="admin-status-ping" />
            <span className="admin-status-dot" />
          </div>
          <div className="admin-status-info">
            <span className="admin-status-title">MoES Network • Live</span>
            <span className="admin-status-subtitle">IMD Node Sync Active</span>
          </div>
        </div>

        {/* Sidebar Footer with Profile & Integrated Exit */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user-card" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
            <div className="admin-user-avatar">
              AD
              <span className="admin-online-indicator" />
            </div>
            <div className="admin-user-info">
              <strong className="admin-user-name">Admin Workspace</strong>
              <small className="admin-user-role">Administrator (MoES/IMD)</small>
            </div>
            <button
              type="button"
              className="admin-user-card-exit-btn"
              onClick={(e) => {
                e.stopPropagation()
                onBack()
              }}
              title="Exit to Home"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="admin-main-viewport">
        {/* TOP NAVBAR */}
        <header className="admin-top-navbar">
          <div className="admin-nav-left-meta">
            <button
              type="button"
              className="admin-mobile-drawer-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Drawer"
            >
              ☰
            </button>
            <div className="admin-nav-heading-wrap">
              <h1 className="admin-nav-heading-title">
                {activeTab === 'Dashboard' ? 'Admin Workspace' : activeTab}
              </h1>
              <span className="admin-nav-heading-sub">
                {activeTab === 'Dashboard'
                  ? 'Monitor learning activity, workforce competencies, and institutional performance.'
                  : activeTab === 'Analytics'
                  ? 'Institutional capacity telemetry, competency gain, and training analytics.'
                  : activeTab === 'User Management'
                  ? 'Create and provision authorized trainee and trainer accounts.'
                  : `Manage institutional ${activeTab.toLowerCase()} and capacity records.`}
              </span>
            </div>
          </div>

          <div className="admin-nav-actions-wrap">
            {/* Global Search Bar with adequate width and shortcut badge */}
            <div className="admin-search-wrapper" onClick={() => setCommandPaletteOpen(true)} style={{ cursor: 'pointer' }}>
              <span className="admin-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Quick search or jump (Ctrl + K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setCommandPaletteOpen(true)}
              />
              <kbd
                onClick={(e) => {
                  e.stopPropagation()
                  setCommandPaletteOpen(true)
                }}
                style={{
                  background: '#EEF4EF',
                  border: '1px solid #D2E2D6',
                  borderRadius: 4,
                  padding: '2px 6px',
                  fontSize: 10,
                  color: '#496653',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  marginRight: 6,
                  cursor: 'pointer'
                }}
              >⌘K</kbd>
            </div>

            {/* Notification Bell */}
            <div className="admin-bell-container">
              <button
                type="button"
                className={`admin-bell-btn ${noticeOpen ? 'active' : ''}`}
                onClick={() => setNoticeOpen(!noticeOpen)}
                title="View Admin Alerts"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && <span className="admin-bell-badge">{unreadCount}</span>}
              </button>

              {noticeOpen && (
                <div className="admin-notification-popover">
                  <div className="admin-notif-head">
                    <strong>Administrative Notifications</strong>
                    {unreadCount > 0 && (
                      <button type="button" className="admin-notif-mark-btn" onClick={markAllNotifsRead}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="admin-notif-list">
                    {notifications.map((item) => (
                      <div className="admin-notif-item" key={item.id} onClick={() => setNoticeOpen(false)}>
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                        <small>{item.time}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Header User Avatar Dropdown */}
            <div className="admin-user-menu-container">
              <button
                type="button"
                className="admin-header-avatar-btn"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <div className="admin-user-avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
                  AD
                </div>
              </button>

              {profileMenuOpen && (
                <div className="admin-user-menu-dropdown">
                  <div className="admin-user-menu-profile-summary">
                    <strong>Admin Director</strong>
                    <small>admin.directorate@imd.gov.in</small>
                  </div>
                  <button
                    type="button"
                    className="admin-user-menu-item"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      openTrainerProfile()
                    }}
                  >
                    <span>👨‍🏫</span> View Trainer Profile
                  </button>
                  <button
                    type="button"
                    className="admin-user-menu-item"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      setActiveTab('Settings')
                    }}
                  >
                    <span>⚙️</span> Governance Settings
                  </button>
                  <button
                    type="button"
                    className="admin-user-menu-item logout"
                    onClick={() => {
                      setProfileMenuOpen(false)
                      onBack()
                    }}
                  >
                    <span>←</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* FEEDBACK TOAST */}
        {actionSuccessMsg && (
          <div style={{
            margin: '16px 32px 0',
            padding: '12px 18px',
            borderRadius: '12px',
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            color: '#065F46',
            fontWeight: 600,
            fontSize: '13.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <span>✓</span> {actionSuccessMsg}
          </div>
        )}

        {/* MAIN SCROLLABLE CONTENT BODY */}
        <main className="admin-scrollable-content">
          {/* TAB: DASHBOARD */}
          {activeTab === 'Dashboard' && (
            <>
              {/* Top Overview Banner */}
              <div className="admin-welcome-hero">
                <div>
                  <div className="admin-welcome-kicker">
                    <span>INSTITUTIONAL PORTAL</span> • MoES / IMD Capacity Network
                  </div>
                  <h1 className="admin-welcome-title">Good morning, Admin 👋</h1>
                  <p className="admin-welcome-desc">
                    Monitor learning activity, workforce competencies and institutional capacity growth across all national centers.
                  </p>
                </div>
                <div className="admin-action-btn-group">
                  <button type="button" className="btn-admin-action primary" onClick={() => setActiveTab('User Management')}>
                    <span>👥</span> Manage Users
                  </button>
                  <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal('createNotice')}>
                    <span>📢</span> Broadcast Notice
                  </button>
                </div>
              </div>

              {/* 5 KPI Metric Cards with Sparkline Micro-Visualizations */}
              <div className="admin-kpis-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">👥</div>
                    <span className="admin-kpi-trend-pill">↑ +12.4%</span>
                  </div>
                  <span className="admin-kpi-label">Total Trainees</span>
                  <strong className="admin-kpi-value">2,486</strong>
                  <span className="admin-kpi-subtext">Active enrolled personnel</span>
                  <div className="admin-kpi-sparkline-wrap">
                    <svg viewBox="0 0 100 24" className="admin-kpi-sparkline-svg" preserveAspectRatio="none">
                      <path d="M0,20 Q20,18 40,12 T70,8 T100,2" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,20 Q20,18 40,12 T70,8 T100,2 L100,24 L0,24 Z" fill="rgba(45, 106, 79, 0.12)" />
                    </svg>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">🎓</div>
                    <span className="admin-kpi-trend-pill">+8 this mo</span>
                  </div>
                  <span className="admin-kpi-label">Active Trainers</span>
                  <strong className="admin-kpi-value">148</strong>
                  <span className="admin-kpi-subtext">Verified domain faculty</span>
                  <div className="admin-kpi-sparkline-wrap">
                    <svg viewBox="0 0 100 24" className="admin-kpi-sparkline-svg" preserveAspectRatio="none">
                      <path d="M0,22 Q30,16 60,10 T100,4" fill="none" stroke="#40916C" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,22 Q30,16 60,10 T100,4 L100,24 L0,24 Z" fill="rgba(64, 145, 108, 0.12)" />
                    </svg>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">📚</div>
                    <span className="admin-kpi-trend-pill">12 running</span>
                  </div>
                  <span className="admin-kpi-label">Active Courses</span>
                  <strong className="admin-kpi-value">{courses.length}</strong>
                  <span className="admin-kpi-subtext">Meteorological &amp; GIS tracks</span>
                  <div className="admin-kpi-sparkline-wrap">
                    <svg viewBox="0 0 100 24" className="admin-kpi-sparkline-svg" preserveAspectRatio="none">
                      <path d="M0,16 Q25,8 50,14 T100,6" fill="none" stroke="#52B788" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,16 Q25,8 50,14 T100,6 L100,24 L0,24 Z" fill="rgba(82, 183, 136, 0.12)" />
                    </svg>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">📋</div>
                    <span className="admin-kpi-trend-pill">24 scheduled</span>
                  </div>
                  <span className="admin-kpi-label">Assessments</span>
                  <strong className="admin-kpi-value">186</strong>
                  <span className="admin-kpi-subtext">Competency certifications</span>
                  <div className="admin-kpi-sparkline-wrap">
                    <svg viewBox="0 0 100 24" className="admin-kpi-sparkline-svg" preserveAspectRatio="none">
                      <path d="M0,20 Q35,22 65,8 T100,4" fill="none" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,20 Q35,22 65,8 T100,4 L100,24 L0,24 Z" fill="rgba(27, 67, 50, 0.12)" />
                    </svg>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top-row">
                    <div className="admin-kpi-icon-square">🎯</div>
                    <span className="admin-kpi-trend-pill">↑ +5.2%</span>
                  </div>
                  <span className="admin-kpi-label">Avg. Competency Score</span>
                  <strong className="admin-kpi-value">74.8%</strong>
                  <span className="admin-kpi-subtext">Institutional index</span>
                  <div className="admin-kpi-sparkline-wrap">
                    <svg viewBox="0 0 100 24" className="admin-kpi-sparkline-svg" preserveAspectRatio="none">
                      <path d="M0,18 Q30,12 60,14 T100,3" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,18 Q30,12 60,14 T100,3 L100,24 L0,24 Z" fill="rgba(16, 185, 129, 0.12)" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* LIVE INSTITUTIONAL PULSE & STREAM TICKER */}
              <div className="admin-live-pulse-container">
                <div className="admin-live-pulse-header">
                  <div className="admin-live-pulse-badge">
                    <span className="admin-pulse-beacon" />
                    <span>LIVE MOES PULSE</span>
                  </div>
                  <div className="admin-pulse-filters">
                    {['All', 'Certification', 'Enrollment', 'Faculty', 'System'].map((flt) => (
                      <button
                        type="button"
                        key={flt}
                        className={`admin-pulse-filter-pill ${activeActivityFilter === flt ? 'active' : ''}`}
                        onClick={() => setActiveActivityFilter(flt)}
                      >
                        {flt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="admin-live-activity-stream">
                  {LIVE_INSTITUTIONAL_ACTIVITIES
                    .filter(act => activeActivityFilter === 'All' || act.type === activeActivityFilter)
                    .map((act) => (
                      <div className="admin-stream-card" key={act.id}>
                        <div className="admin-stream-icon-box">{act.icon}</div>
                        <div className="admin-stream-content">
                          <div className="admin-stream-title-row">
                            <strong>{act.title}</strong>
                            <span className="admin-stream-tag">{act.center}</span>
                          </div>
                          <p className="admin-stream-desc">{act.desc}</p>
                          <small className="admin-stream-time">{act.time}</small>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* MOES / IMD NATIONAL TRAINING NODES & TOPOLOGY MATRIX */}
              <div className="admin-card-panel" style={{ marginTop: 20 }}>
                <div className="admin-panel-head">
                  <div className="admin-panel-title-wrap">
                    <h2 className="admin-panel-title">MoES &amp; IMD National Training Nodes Topology</h2>
                    <p className="admin-panel-subtitle">Distributed training infrastructure telemetry, capacity loads, and latency health.</p>
                  </div>
                  <button
                    type="button"
                    className="admin-panel-action-btn"
                    onClick={() => {
                      setActionSuccessMsg('Synchronizing node telemetry across 5 national training centers...')
                      setTimeout(() => setActionSuccessMsg(''), 3000)
                    }}
                  >
                    ⚡ Ping All Nodes
                  </button>
                </div>

                <div className="admin-nodes-grid">
                  {REGIONAL_NODES_DATA.map((node) => (
                    <div
                      key={node.id}
                      className="admin-node-card"
                      onClick={() => setSelectedNode(node)}
                      title="Click to inspect node performance"
                    >
                      <div className="admin-node-top">
                        <div className="admin-node-name-group">
                          <span className="admin-node-pin">📍 {node.city}</span>
                          <strong className="admin-node-name">{node.name}</strong>
                          <small className="admin-node-lead">{node.lead}</small>
                        </div>
                        <span className="admin-node-status-badge">{node.status}</span>
                      </div>

                      <div className="admin-node-metrics-bar">
                        <div className="admin-node-submetric">
                          <small>Enrolled Load</small>
                          <strong>{node.enrolled} / {node.capacity}</strong>
                        </div>
                        <div className="admin-node-submetric">
                          <small>Pass Benchmark</small>
                          <strong style={{ color: '#1B4332' }}>{node.passRate}%</strong>
                        </div>
                        <div className="admin-node-submetric">
                          <small>Latency</small>
                          <strong style={{ color: '#047857' }}>{node.latency}</strong>
                        </div>
                      </div>

                      {/* Capacity Progress Bar */}
                      <div className="admin-health-track" style={{ height: 6, marginTop: 10 }}>
                        <div
                          className="admin-health-fill"
                          style={{
                            width: `${(node.enrolled / node.capacity) * 100}%`,
                            background: 'linear-gradient(90deg, #1B4332, #40916C)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2-Column Grid: Platform Activity & Competency Health */}
              <div className="admin-two-col-grid">
                {/* Platform Learning Activity */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Platform Learning Activity</h2>
                      <p className="admin-panel-subtitle">Trainee engagement and study hours across cohorts</p>
                    </div>
                    <select
                      className="admin-period-select"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option>7 Days</option>
                      <option>30 Days</option>
                      <option>6 Months</option>
                      <option>1 Year</option>
                    </select>
                  </div>

                  <div className="admin-bar-chart-container">
                    <div className="admin-bars-wrapper">
                      {[
                        { label: 'W1', h: 54 },
                        { label: 'W2', h: 72 },
                        { label: 'W3', h: 63 },
                        { label: 'W4', h: 88 },
                        { label: 'W5', h: 79 },
                        { label: 'W6', h: 95 },
                        { label: 'W7', h: 68 },
                        { label: 'W8', h: 92 }
                      ].map((bar, idx) => (
                        <div className="admin-bar-col" key={idx}>
                          <div
                            className="admin-bar-fill"
                            style={{ height: `${bar.h}%` }}
                            title={`${bar.label}: ${bar.h}% activity`}
                          />
                          <span className="admin-bar-col-label">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-activity-metrics-row">
                    <div className="admin-submetric-card">
                      <strong className="admin-submetric-val">12,840</strong>
                      <span className="admin-submetric-label">Total Learning Hours</span>
                    </div>
                    <div className="admin-submetric-card">
                      <strong className="admin-submetric-val">78.4%</strong>
                      <span className="admin-submetric-label">Course Completion</span>
                    </div>
                    <div className="admin-submetric-card">
                      <strong className="admin-submetric-val">81.2%</strong>
                      <span className="admin-submetric-label">Avg. Assessment Score</span>
                    </div>
                  </div>
                </div>

                {/* Institutional Competency Health */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Institutional Competency Health</h2>
                      <p className="admin-panel-subtitle">Current average proficiency across active learners</p>
                    </div>
                    <button
                      type="button"
                      className="admin-panel-action-btn"
                      onClick={() => setActiveTab('Competencies')}
                    >
                      View Framework →
                    </button>
                  </div>

                  <div className="admin-health-stack">
                    {competencies.map((comp) => (
                      <div className="admin-health-item" key={comp.name}>
                        <div className="admin-health-meta">
                          <span className="admin-health-name">{comp.name}</span>
                          <strong className="admin-health-percent">{comp.score}%</strong>
                        </div>
                        <div className="admin-health-track">
                          <div
                            className="admin-health-fill"
                            style={{
                              width: `${comp.score}%`,
                              background: comp.score >= 75
                                ? 'linear-gradient(90deg, #1B4332, #40916C)'
                                : comp.score >= 60
                                  ? 'linear-gradient(90deg, #D97706, #F59E0B)'
                                  : 'linear-gradient(90deg, #DC2626, #EF4444)'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2-Column Grid: Gaps & Top Trainers */}
              <div className="admin-two-col-grid">
                {/* Competency Gaps Requiring Attention */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Competency Gaps Requiring Attention</h2>
                      <p className="admin-panel-subtitle">Prioritize institutional learning and workshops</p>
                    </div>
                  </div>

                  <div>
                    {[
                      { name: 'Machine Learning in Weather', current: '47%', target: '75%', gap: '-28%', trainees: '126' },
                      { name: 'Satellite Remote Sensing', current: '54%', target: '75%', gap: '-21%', trainees: '94' },
                      { name: 'GIS & Spatial Analytics', current: '61%', target: '75%', gap: '-14%', trainees: '72' }
                    ].map((gap) => (
                      <div className="admin-gap-item-card" key={gap.name}>
                        <div className="admin-gap-left">
                          <div className="admin-gap-icon-circle">!</div>
                          <div className="admin-gap-text-meta">
                            <strong>{gap.name}</strong>
                            <span>Current {gap.current} • Target {gap.target} (Gap: {gap.gap})</span>
                          </div>
                        </div>
                        <div className="admin-gap-right">
                          <span className="admin-gap-affected-pill">{gap.trainees} trainees</span>
                          <button
                            type="button"
                            className="admin-panel-action-btn"
                            onClick={() => setActiveModal({ type: 'gap', data: gap })}
                          >
                            View Gap
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Trainers */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Top Performing Trainers</h2>
                      <p className="admin-panel-subtitle">Highest rated faculty across institutional courses</p>
                    </div>
                    <button
                      type="button"
                      className="admin-panel-action-btn"
                      onClick={() => setActiveTab('Trainers')}
                    >
                      View All Faculty →
                    </button>
                  </div>

                  <div>
                    {trainers.slice(0, 4).map((tr) => (
                      <div className="admin-trainer-row" key={tr.name} onClick={openTrainerProfile} title="Click to view Trainer Profile">
                        <div className="admin-trainer-left">
                          <div className="admin-trainer-avatar">
                            {tr.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                          </div>
                          <div className="admin-trainer-details">
                            <strong>{tr.name}</strong>
                            <small>{tr.expertise} • {tr.trained}</small>
                          </div>
                        </div>
                        <div className="admin-trainer-score-badge">
                          <strong>{tr.score}</strong>
                          <small>success</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2-Column Grid: Course Performance & AI Matching */}
              <div className="admin-two-col-grid">
                {/* Course Performance Table */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Course Performance</h2>
                      <p className="admin-panel-subtitle">Compare course enrollments, completion and status</p>
                    </div>
                    <button
                      type="button"
                      className="admin-panel-action-btn"
                      onClick={() => setActiveTab('Courses')}
                    >
                      All Courses →
                    </button>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-custom-table">
                      <thead>
                        <tr>
                          <th>Course</th>
                          <th>Enrolled</th>
                          <th>Completion</th>
                          <th>Avg Score</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.slice(0, 4).map((c) => (
                          <tr key={c.id}>
                            <td><strong>{c.name}</strong></td>
                            <td>{c.enrolled}</td>
                            <td>{c.completion}</td>
                            <td>{c.avgScore}</td>
                            <td>
                              <span className={`admin-status-pill ${c.status === 'Excellent' ? 'excellent' : c.status === 'Good' ? 'good' : 'warning'}`}>
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Intelligent Trainer Matching */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h2 className="admin-panel-title">Intelligent Trainer Matching</h2>
                      <p className="admin-panel-subtitle">AI match algorithm recommendations for new cohorts</p>
                    </div>
                  </div>

                  <div className="admin-matching-preview-card">
                    <div className="admin-target-course-box">
                      <small>TARGET COURSE</small>
                      <strong>Weather Data Analysis &amp; Forecasting</strong>
                      <span>Python • Statistics • Doppler Radar Meteorology</span>
                    </div>

                    <div className="admin-matched-faculty-card" onClick={openTrainerProfile} title="Click to view Dr. Rahul Sharma profile">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="admin-trainer-avatar" style={{ width: 42, height: 42, fontSize: 14 }}>
                          RS
                        </div>
                        <div>
                          <strong style={{ fontSize: 14.5, color: '#12281B', display: 'block' }}>Dr. Rahul Sharma</strong>
                          <small style={{ color: '#4F6B58' }}>Senior Meteorology • 8+ yrs experience</small>
                        </div>
                      </div>
                      <div className="admin-match-score-pill">
                        <strong>92%</strong>
                        <small>Match Score</small>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-admin-action primary"
                      style={{ marginTop: 4, width: '100%', justifyContent: 'center' }}
                      onClick={() => setActiveModal('assignTrainer')}
                    >
                      Assign Trainer to Cohort →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB: COURSES */}
          {activeTab === 'Courses' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Courses Catalog</h2>
                  <p className="admin-panel-subtitle">Manage accredited syllabi, enrollments, and competency tracks.</p>
                </div>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 10 }}>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Title</th>
                      <th>Domain</th>
                      <th>Enrolled Learners</th>
                      <th>Completion</th>
                      <th>Avg. Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses
                      .filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.domain.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((c) => (
                        <tr key={c.id}>
                          <td><code>{c.id}</code></td>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.domain}</td>
                          <td>{c.enrolled} trainees</td>
                          <td>{c.completion}</td>
                          <td>{c.avgScore}</td>
                          <td>
                            <span className={`admin-status-pill ${c.status === 'Excellent' ? 'excellent' : c.status === 'Good' ? 'good' : 'warning'}`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ASSESSMENTS */}
          {activeTab === 'Assessments' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Competency Assessments &amp; Exams</h2>
                  <p className="admin-panel-subtitle">Centralized evaluation roster and credentialing checkpoints.</p>
                </div>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 10 }}>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Assessment Title</th>
                      <th>Related Course</th>
                      <th>Candidates</th>
                      <th>Date</th>
                      <th>Avg. Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((a) => (
                      <tr key={a.id}>
                        <td><code>{a.id}</code></td>
                        <td><strong>{a.title}</strong></td>
                        <td>{a.course}</td>
                        <td>{a.candidates}</td>
                        <td>{a.date}</td>
                        <td>{a.avgScore}</td>
                        <td>
                          <span className={`admin-status-pill ${a.status === 'Completed' ? 'excellent' : 'good'}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: LEARNING CONTENT */}
          {activeTab === 'Learning Content' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Content &amp; Lab Repositories</h2>
                  <p className="admin-panel-subtitle">Syllabi, computational notebooks, HPC datasets, and training modules.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 10 }}>
                {[
                  { title: 'WRF Numerical Modeling Lab', files: '18 Notebooks', size: '2.4 GB', tag: 'High Priority' },
                  { title: 'Doppler Radar Interpretation Modules', files: '32 Lessons', size: '1.8 GB', tag: 'Active' },
                  { title: 'NetCDF Geospatial Analysis Suite', files: '14 Datasets', size: '4.1 GB', tag: 'Updated' },
                  { title: 'Satellite Meteorology Fundamentals', files: '26 Modules', size: '940 MB', tag: 'Verified' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span className="admin-status-pill good">{item.tag}</span>
                      <small style={{ color: '#688273' }}>{item.size}</small>
                    </div>
                    <strong style={{ display: 'block', fontSize: 15, color: '#12281B', marginBottom: 4 }}>{item.title}</strong>
                    <span style={{ fontSize: 12.5, color: '#526E5D' }}>{item.files} available in cloud workspace</span>
                    <button type="button" className="btn-admin-action secondary" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
                      Inspect Syllabus &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: USER MANAGEMENT / AUTHORIZATION HUB */}
          {activeTab === 'User Management' && (
            <div className="admin-usermgmt-hub-container">
              {/* Header Panel */}
              <div className="admin-card-panel admin-usermgmt-header-card">
                <div className="admin-panel-head">
                  <div className="admin-panel-title-wrap">
                    <div className="admin-welcome-kicker" style={{ marginBottom: 6 }}>
                      <span>AUTHORIZATION &amp; WORKFORCE HUB</span> • MoES / IMD Access Control
                    </div>
                    <h2 className="admin-panel-title">User Management &amp; Access Control</h2>
                    <p className="admin-panel-subtitle">
                      Manage verified faculty instructors, trainee accounts, single account provisioning, and high-throughput bulk CSV/Excel onboarding.
                    </p>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  SUB-TAB 1: USER DIRECTORY & REPOSITORY SPACE
                  ========================================================= */}
              {userMgmtSubTab === 'directory' && (
                <div className="admin-usermgmt-directory-view">
                  {/* Quick Telemetry Metric Cards */}
                  <div className="admin-usermgmt-metrics-grid">
                    <div className="admin-usermgmt-metric-card">
                      <div className="metric-icon-box" style={{ background: '#E6F4EA', color: '#1B4332' }}>👥</div>
                      <div className="metric-info">
                        <span className="metric-label">Total Authorized Users</span>
                        <strong className="metric-num">2,490</strong>
                        <small className="metric-sub">Across 5 National Nodes</small>
                      </div>
                    </div>
                    <div className="admin-usermgmt-metric-card">
                      <div className="metric-icon-box" style={{ background: '#EEF6EA', color: '#2F5233' }}>👨‍🏫</div>
                      <div className="metric-info">
                        <span className="metric-label">Accredited Faculty</span>
                        <strong className="metric-num">{trainers.length + 42}</strong>
                        <small className="metric-sub">WMO &amp; IMD Certified</small>
                      </div>
                    </div>
                    <div className="admin-usermgmt-metric-card">
                      <div className="metric-icon-box" style={{ background: '#EBF4FF', color: '#1E40AF' }}>🎓</div>
                      <div className="metric-info">
                        <span className="metric-label">Active Trainees</span>
                        <strong className="metric-num">{trainees.length + 2440}</strong>
                        <small className="metric-sub">94% Active Completion</small>
                      </div>
                    </div>
                    <div className="admin-usermgmt-metric-card">
                      <div className="metric-icon-box" style={{ background: '#FEF3C7', color: '#92400E' }}>🔒</div>
                      <div className="metric-info">
                        <span className="metric-label">Security Compliance</span>
                        <strong className="metric-num">100%</strong>
                        <small className="metric-sub">Bcrypt &amp; MFA Enabled</small>
                      </div>
                    </div>
                  </div>

                  {/* Executive Action Cards Grid */}
                  <div className="admin-usermgmt-action-cards-grid">
                    {/* Card 1: Dedicated Roster Explorer */}
                    <div className="admin-usermgmt-hub-card highlight">
                      <div className="hub-card-icon-box" style={{ background: '#EEF6EA', color: '#143527' }}>
                        🗂️
                      </div>
                      <div className="hub-card-body">
                        <span className="hub-card-kicker">INTERACTIVE REGISTRY</span>
                        <h3 className="hub-card-title">Dedicated User Roster Explorer</h3>
                        <p className="hub-card-desc">
                          Access the separate institutional directory with granular filters by Department, Staff ID, Role, and Accreditation Status.
                        </p>
                      </div>
                      <div className="hub-card-footer">
                        <button
                          type="button"
                          className="btn-admin-action primary"
                          style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '13.5px' }}
                          onClick={() => setDirectoryModalOpen(true)}
                        >
                          👁 Open Dedicated User Roster (Full View) →
                        </button>
                      </div>
                    </div>

                    {/* Card 2: Export Directory */}
                    <div className="admin-usermgmt-hub-card">
                      <div className="hub-card-icon-box" style={{ background: '#EBF4FF', color: '#1E40AF' }}>
                        📑
                      </div>
                      <div className="hub-card-body">
                        <span className="hub-card-kicker">INSTITUTIONAL REPORTS</span>
                        <h3 className="hub-card-title">Download Personnel Directory</h3>
                        <p className="hub-card-desc">
                          Export verified personnel lists, department assignments, and security audit logs in standard CSV or Excel format.
                        </p>
                      </div>
                      <div className="hub-card-footer" style={{ display: 'flex', gap: 10 }}>
                        <button
                          type="button"
                          className="btn-admin-action secondary"
                          style={{ flex: 1, justifyContent: 'center' }}
                          onClick={() => handleDownloadFullDirectory('csv')}
                        >
                          📥 Download CSV
                        </button>
                        <button
                          type="button"
                          className="btn-admin-action secondary"
                          style={{ flex: 1, justifyContent: 'center' }}
                          onClick={() => handleDownloadFullDirectory('xlsx')}
                        >
                          📥 Excel (.xlsx)
                        </button>
                      </div>
                    </div>


                  </div>

                  {/* Regional Node Workforce Breakdown */}
                  <div className="admin-card-panel" style={{ padding: '22px 24px' }}>
                    <div className="admin-panel-head" style={{ marginBottom: 16 }}>
                      <div>
                        <h3 className="admin-panel-title">Regional Training Nodes &amp; Workforce Allocation</h3>
                        <p className="admin-panel-subtitle">Distribution of active faculty and trainee cohorts across nodal centers.</p>
                      </div>
                      <button
                        type="button"
                        className="btn-admin-action secondary"
                        onClick={() => setDirectoryModalOpen(true)}
                      >
                        Search All 2,490 Records →
                      </button>
                    </div>

                    <div className="admin-usermgmt-nodes-grid">
                      {[
                        { node: 'IMD Pune Training Node', city: 'Pune, Maharashtra', faculty: 14, trainees: 642, passRate: '94%', status: 'Optimal' },
                        { node: 'IMD New Delhi Directorate HQ', city: 'Mausam Bhawan, Delhi', faculty: 16, trainees: 720, passRate: '91%', status: 'High Activity' },
                        { node: 'IITM Pune Atmospheric Wing', city: 'Pashan, Pune', faculty: 8, trainees: 480, passRate: '88%', status: 'Normal' },
                        { node: 'NCMRWF Noida Modeling Center', city: 'Sector 62, Noida', faculty: 6, trainees: 390, passRate: '85%', status: 'Normal' },
                        { node: 'INCOIS Hyderabad Ocean Node', city: 'Pragathi Nagar, Hyd', faculty: 4, trainees: 254, passRate: '82%', status: 'Normal' }
                      ].map((item, idx) => (
                        <div key={idx} className="admin-usermgmt-node-card">
                          <div className="node-card-top">
                            <strong>{item.node}</strong>
                            <span className="admin-status-pill excellent">● {item.status}</span>
                          </div>
                          <small style={{ color: '#597363', display: 'block', marginBottom: 10 }}>📍 {item.city}</small>
                          <div className="node-card-stats">
                            <div>
                              <span className="stat-label">Faculty:</span>
                              <strong>{item.faculty}</strong>
                            </div>
                            <div>
                              <span className="stat-label">Trainees:</span>
                              <strong>{item.trainees}</strong>
                            </div>
                            <div>
                              <span className="stat-label">Pass Rate:</span>
                              <strong style={{ color: '#2F6B3C' }}>{item.passRate}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DEDICATED FULL-SCREEN / MODAL SPACE FOR USER ROSTER EXPLORER */}
              {directoryModalOpen && (
                <div className="admin-modal-backdrop" onClick={() => setDirectoryModalOpen(false)}>
                  <div
                    className="admin-directory-modal-box"
                    onClick={e => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="admin-directory-modal-header">
                      <div>
                        <div className="admin-welcome-kicker" style={{ marginBottom: 4 }}>
                          <span>OFFICIAL PERSONNEL ROSTER</span> • MoES / IMD Credential Registry
                        </div>
                        <h2 className="admin-panel-title">Authorized User Directory</h2>
                        <p className="admin-panel-subtitle">
                          Search and inspect verified faculty, scientists, and trainee profiles with real-time credential telemetry.
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button
                          type="button"
                          className="btn-admin-action secondary"
                          onClick={() => handleDownloadFullDirectory('csv')}
                        >
                          📥 Download CSV
                        </button>
                        <button
                          type="button"
                          className="admin-modal-close-btn"
                          onClick={() => setDirectoryModalOpen(false)}
                          title="Close Roster"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Filter Bar Inside Dedicated Space */}
                    <div className="admin-directory-modal-filter-bar">
                      <div className="admin-usermgmt-search-box">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search directory by name, staff ID, department, or email..."
                          value={userDirectorySearch}
                          onChange={e => setUserDirectorySearch(e.target.value)}
                        />
                        {userDirectorySearch && (
                          <button type="button" className="admin-search-clear-btn" onClick={() => setUserDirectorySearch('')}>✕</button>
                        )}
                      </div>

                      <select
                        className="admin-usermgmt-select"
                        value={userDirectoryRoleFilter}
                        onChange={e => setUserDirectoryRoleFilter(e.target.value)}
                      >
                        <option value="All">All Roles</option>
                        <option value="Trainer">Faculty / Trainers</option>
                        <option value="Trainee">Learners / Trainees</option>
                      </select>

                      <select
                        className="admin-usermgmt-select"
                        value={userDirectoryDeptFilter}
                        onChange={e => setUserDirectoryDeptFilter(e.target.value)}
                      >
                        <option value="All">All Departments</option>
                        <option value="Meteorology">Meteorology Division</option>
                        <option value="Atmospheric">Atmospheric Sciences</option>
                        <option value="Climatology">Climatology Unit</option>
                        <option value="Remote Sensing">Remote Sensing Lab</option>
                        <option value="Numerical">Numerical Modeling</option>
                        <option value="Ocean">Ocean Science Wing</option>
                      </select>

                      {(userDirectorySearch || userDirectoryRoleFilter !== 'All' || userDirectoryDeptFilter !== 'All') && (
                        <button
                          type="button"
                          className="btn-admin-action secondary"
                          onClick={() => {
                            setUserDirectorySearch('')
                            setUserDirectoryRoleFilter('All')
                            setUserDirectoryDeptFilter('All')
                          }}
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>

                    {/* Properly Styled Dedicated Table */}
                    <div className="admin-directory-table-container">
                      <table className="admin-usermgmt-table">
                        <thead>
                          <tr>
                            <th style={{ width: '24%' }}>User / Name</th>
                            <th style={{ width: '13%' }}>Staff ID</th>
                            <th style={{ width: '11%' }}>Role</th>
                            <th style={{ width: '22%' }}>Department &amp; Designation</th>
                            <th style={{ width: '16%' }}>Official Email</th>
                            <th style={{ width: '8%' }}>Status</th>
                            <th style={{ width: '6%' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ...trainers.map((t, idx) => ({
                              id: `TRR-700${idx + 1}`,
                              name: t.name,
                              role: 'Trainer',
                              dept: 'Atmospheric Sciences Wing',
                              designation: 'Senior Faculty / Scientist',
                              email: `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@imd.gov.in`,
                              status: 'Active'
                            })),
                            ...trainees.map(t => ({
                              id: t.id,
                              name: t.name,
                              role: 'Trainee',
                              dept: t.dept,
                              designation: 'Scientific Officer',
                              email: `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@imd.gov.in`,
                              status: t.status
                            }))
                          ]
                            .filter(user => {
                              const matchSearch = user.name.toLowerCase().includes(userDirectorySearch.toLowerCase()) ||
                                user.id.toLowerCase().includes(userDirectorySearch.toLowerCase()) ||
                                user.email.toLowerCase().includes(userDirectorySearch.toLowerCase()) ||
                                user.dept.toLowerCase().includes(userDirectorySearch.toLowerCase())
                              const matchRole = userDirectoryRoleFilter === 'All' || user.role === userDirectoryRoleFilter
                              const matchDept = userDirectoryDeptFilter === 'All' || user.dept.toLowerCase().includes(userDirectoryDeptFilter.toLowerCase())
                              return matchSearch && matchRole && matchDept
                            })
                            .map((u, i) => (
                              <tr key={i}>
                                <td>
                                  <div className="admin-user-cell">
                                    <div className={`admin-user-avatar ${u.role === 'Trainer' ? 'trainer' : 'trainee'}`}>
                                      {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="admin-user-info">
                                      <strong>{u.name}</strong>
                                      <small>MoES Accredited</small>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <code className="admin-id-badge">{u.id}</code>
                                </td>
                                <td>
                                  <span className={`admin-create-user-role-pill ${u.role === 'Trainer' ? 'trainer' : 'trainee'}`}>
                                    {u.role}
                                  </span>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontWeight: 600, color: '#16251B' }}>{u.dept}</span>
                                    <small style={{ color: '#597363' }}>{u.designation}</small>
                                  </div>
                                </td>
                                <td>
                                  <span style={{ fontSize: 13, color: '#2F5233' }}>{u.email}</span>
                                </td>
                                <td>
                                  <span className="admin-status-pill excellent">● {u.status}</span>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', gap: 6 }}>
                                    <button
                                      type="button"
                                      className="btn-admin-table-action"
                                      title="View Profile"
                                      onClick={() => {
                                        setDirectoryModalOpen(false)
                                        if (u.role === 'Trainer') openTrainerProfile()
                                        else setActiveTab('Trainees')
                                      }}
                                    >
                                      👁 View
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-admin-table-action"
                                      title="Copy ID"
                                      onClick={() => {
                                        navigator.clipboard.writeText(u.id)
                                        setActionSuccessMsg(`Copied ${u.id} to clipboard!`)
                                        setTimeout(() => setActionSuccessMsg(''), 2500)
                                      }}
                                    >
                                      📋
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Modal Footer */}
                    <div className="admin-directory-modal-footer">
                      <span style={{ fontSize: 13, color: '#597363' }}>
                        Showing verified personnel in MoES central database.
                      </span>
                      <button
                        type="button"
                        className="btn-admin-action primary"
                        onClick={() => setDirectoryModalOpen(false)}
                      >
                        Done / Close Roster
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================================
                  SUB-TAB 2: SINGLE USER CREATION
                  ========================================================= */}
              {userMgmtSubTab === 'single' && (
                <div className="admin-create-user-container">
                  <div className="admin-card-panel admin-create-user-panel">
                    <div className="admin-panel-head">
                      <div className="admin-panel-title-wrap">
                        <div className="admin-welcome-kicker" style={{ marginBottom: 6 }}>
                          <span>SINGLE ACCOUNT PROVISIONING</span> • Interactive Authorization Form
                        </div>
                        <h3 className="admin-panel-title">
                          {userMgmtStep === 'success' ? 'Account Provisioning Complete' : 'Create User Account'}
                        </h3>
                        <p className="admin-panel-subtitle">
                          {userMgmtStep === 'success'
                            ? 'Authorized profile and credentials have been provisioned in the CapacityConnect database.'
                            : 'Enter the role, full name, email, and organization to provision credentials with auto-generated ID and temporary password.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-admin-action secondary"
                        onClick={() => {
                          setUserMgmtSubTab('directory')
                          setUserMgmtStep('form')
                          setSingleUserErrors({})
                        }}
                      >
                        ← Back to User Management Hub
                      </button>
                    </div>

                    {/* SINGLE USER FORM */}
                    {userMgmtStep !== 'success' && (
                      <form className="admin-create-user-form" onSubmit={handleSingleUserSubmit}>
                        {/* Section 1: Role Selection */}
                        <div className="admin-create-user-section">
                          <div className="admin-create-user-section-title">
                            <span className="section-num">01</span> Select Account Role <span className="req-star">*</span>
                          </div>
                          <div className="admin-create-user-selection-grid" style={{ marginTop: 12 }}>
                            {/* Trainer Role Option */}
                            <div
                              className={`admin-create-user-role-card ${singleUserRole === 'Trainer' ? 'role-selected' : ''}`}
                              onClick={() => handleSingleRoleChange('Trainer')}
                              style={{
                                cursor: 'pointer',
                                border: singleUserRole === 'Trainer' ? '2px solid #2F6B3C' : '1px solid #DCE6DF',
                                background: singleUserRole === 'Trainer' ? 'rgba(47, 107, 60, 0.05)' : '#FFFFFF'
                              }}
                            >
                              <div className="admin-create-user-role-icon-box trainer-theme">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                              </div>
                              <div className="admin-create-user-role-info">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span className="admin-create-user-role-tag trainer-tag">Faculty &amp; Instructor</span>
                                  <input
                                    type="radio"
                                    name="singleUserRoleRadio"
                                    checked={singleUserRole === 'Trainer'}
                                    onChange={() => handleSingleRoleChange('Trainer')}
                                    style={{ accentColor: '#2F6B3C', transform: 'scale(1.2)' }}
                                  />
                                </div>
                                <h3 className="admin-create-user-role-title" style={{ marginTop: 4 }}>Trainer</h3>
                                <p className="admin-create-user-role-desc">
                                  Faculty account with instructor permissions, syllabus management, and assessment evaluations.
                                </p>
                              </div>
                            </div>

                            {/* Trainee Role Option */}
                            <div
                              className={`admin-create-user-role-card ${singleUserRole === 'Trainee' ? 'role-selected' : ''}`}
                              onClick={() => handleSingleRoleChange('Trainee')}
                              style={{
                                cursor: 'pointer',
                                border: singleUserRole === 'Trainee' ? '2px solid #2F6B3C' : '1px solid #DCE6DF',
                                background: singleUserRole === 'Trainee' ? 'rgba(47, 107, 60, 0.05)' : '#FFFFFF'
                              }}
                            >
                              <div className="admin-create-user-role-icon-box trainee-theme">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                              </div>
                              <div className="admin-create-user-role-info">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span className="admin-create-user-role-tag trainee-tag">Learner &amp; Officer</span>
                                  <input
                                    type="radio"
                                    name="singleUserRoleRadio"
                                    checked={singleUserRole === 'Trainee'}
                                    onChange={() => handleSingleRoleChange('Trainee')}
                                    style={{ accentColor: '#2F6B3C', transform: 'scale(1.2)' }}
                                  />
                                </div>
                                <h3 className="admin-create-user-role-title" style={{ marginTop: 4 }}>Trainee</h3>
                                <p className="admin-create-user-role-desc">
                                  Learner account with course enrollment, competency tracking, and assessment submissions.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Person's Information */}
                        <div className="admin-create-user-section">
                          <div className="admin-create-user-section-title">
                            <span className="section-num">02</span> Person Information
                          </div>
                          <div className="admin-create-user-grid-2col">
                            <div className="admin-form-group">
                              <label>Full Name of Person <span className="req-star">*</span></label>
                              <input
                                type="text"
                                placeholder={singleUserRole === 'Trainer' ? 'e.g. Dr. Vikram Sharma' : 'e.g. Sneha Patel'}
                                value={singleUserName}
                                onChange={(e) => {
                                  setSingleUserName(e.target.value)
                                  if (singleUserErrors.name) setSingleUserErrors({ ...singleUserErrors, name: '' })
                                }}
                              />
                              {singleUserErrors.name && <span className="admin-create-user-error-text">{singleUserErrors.name}</span>}
                            </div>
                            <div className="admin-form-group">
                              <label>Official Email Address <span className="req-star">*</span></label>
                              <input
                                type="email"
                                placeholder={singleUserRole === 'Trainer' ? 'e.g. vikram.sharma@imd.gov.in' : 'e.g. sneha.patel@imd.gov.in'}
                                value={singleUserEmail}
                                onChange={(e) => {
                                  setSingleUserEmail(e.target.value)
                                  if (singleUserErrors.email) setSingleUserErrors({ ...singleUserErrors, email: '' })
                                }}
                              />
                              {singleUserErrors.email && <span className="admin-create-user-error-text">{singleUserErrors.email}</span>}
                            </div>
                          </div>

                          <div className="admin-form-group" style={{ marginTop: 8 }}>
                            <label>Organization / Affiliation / Department</label>
                            <input
                              type="text"
                              placeholder="e.g. Meteorology Division, IMD HQ New Delhi"
                              value={singleUserOrg}
                              onChange={(e) => setSingleUserOrg(e.target.value)}
                            />
                            <small style={{ color: '#597363', marginTop: 4, display: 'block', fontSize: 12 }}>
                              Institutional affiliation (e.g. IMD, IITM, NCMRWF, INCOIS, or state nodal center).
                            </small>
                          </div>
                        </div>

                        {/* Section 3: Automated Credentials Preview */}
                        <div className="admin-create-user-section account-info-section">
                          <div className="admin-create-user-section-title">
                            <span className="section-num">03</span> Automated Credentials &amp; Access
                          </div>
                          <div className="admin-create-user-grid-3col">
                            <div className="admin-form-group">
                              <label>Auto-Generated ID</label>
                              <div className="admin-create-user-readonly-box">
                                <span className="readonly-icon">🆔</span>
                                <code>{generatedSingleUserId}</code>
                                <span className="readonly-badge">Auto Generated</span>
                              </div>
                            </div>
                            <div className="admin-form-group">
                              <label>Temporary Password</label>
                              <div className="admin-create-user-readonly-box">
                                <span className="readonly-icon">🔒</span>
                                <code>{generatedTempPassword}</code>
                                <span className="readonly-badge">Salted</span>
                              </div>
                            </div>
                            <div className="admin-form-group">
                              <label>Account Status</label>
                              <div className="admin-create-user-readonly-box">
                                <span className="admin-status-pill excellent" style={{ margin: 0 }}>
                                  ● Active
                                </span>
                                <small style={{ color: '#597363', marginLeft: 'auto' }}>Standard Access</small>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="admin-create-user-actions-row">
                          <button
                            type="button"
                            className="btn-admin-action secondary"
                            onClick={() => setUserMgmtSubTab('directory')}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn-admin-action primary"
                          >
                            Create {singleUserRole} Account ✓
                          </button>
                        </div>
                      </form>
                    )}

                    {/* SUCCESS CONFIRMATION SCREEN */}
                    {userMgmtStep === 'success' && createdUserResult && (
                      <div className="admin-create-user-success-wrap">
                        <div className="admin-create-user-success-card">
                          <div className="admin-create-user-success-badge-icon">
                            ✓
                          </div>
                          <h3 className="admin-create-user-success-title">Account Created Successfully</h3>
                          <p className="admin-create-user-success-sub">
                            The new {createdUserResult.role.toLowerCase()} profile has been provisioned and login credentials generated.
                          </p>

                          {/* Credentials / Details Summary Table */}
                          <div className="admin-create-user-summary-box">
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Full Name</span>
                              <strong className="summary-value">{createdUserResult.name}</strong>
                            </div>
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Assigned Role</span>
                              <span className={`admin-create-user-role-pill ${createdUserResult.role === 'Trainer' ? 'trainer' : 'trainee'}`}>
                                {createdUserResult.role}
                              </span>
                            </div>
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Generated User ID</span>
                              <div className="summary-id-wrap">
                                <code className="summary-code-id">{createdUserResult.userId}</code>
                                <button
                                  type="button"
                                  className="btn-copy-mini"
                                  onClick={() => {
                                    navigator.clipboard.writeText(createdUserResult.userId)
                                    setCopiedKey('userId')
                                    setTimeout(() => setCopiedKey(false), 2500)
                                  }}
                                  title="Copy User ID"
                                >
                                  {copiedKey === 'userId' ? '✓ Copied' : '📋 Copy'}
                                </button>
                              </div>
                            </div>
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Official Email</span>
                              <span className="summary-value">{createdUserResult.email}</span>
                            </div>
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Temporary Password</span>
                              <div className="summary-pwd-wrap">
                                <code className="summary-code-pwd">
                                  {showPasswordInSuccess ? createdUserResult.tempPassword : '••••••••••••'}
                                </code>
                                <button
                                  type="button"
                                  className="btn-copy-mini"
                                  onClick={() => setShowPasswordInSuccess(!showPasswordInSuccess)}
                                >
                                  {showPasswordInSuccess ? 'Hide' : 'Show'}
                                </button>
                                <button
                                  type="button"
                                  className="btn-copy-mini"
                                  onClick={() => {
                                    navigator.clipboard.writeText(createdUserResult.tempPassword)
                                    setCopiedKey('tempPwd')
                                    setTimeout(() => setCopiedKey(false), 2500)
                                  }}
                                  title="Copy Password"
                                >
                                  {copiedKey === 'tempPwd' ? '✓ Copied' : '📋 Copy'}
                                </button>
                              </div>
                            </div>
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Organization / Affiliation</span>
                              <span className="summary-value">{createdUserResult.organization}</span>
                            </div>
                            <div className="admin-create-user-summary-row">
                              <span className="summary-label">Account Status</span>
                              <span className="admin-status-pill excellent">
                                ● {createdUserResult.status}
                              </span>
                            </div>
                          </div>

                          {/* Email Confirmation Notice */}
                          <div className="admin-create-user-email-notice">
                            <span className="email-notice-icon">✉️</span>
                            <div className="email-notice-text">
                              <strong>Login credentials dispatched</strong>
                              <p>Welcome credentials have been routed to <code>{createdUserResult.email}</code>. The user will be required to change their temporary password upon initial sign-in.</p>
                            </div>
                          </div>

                          {/* Success Actions */}
                          <div className="admin-create-user-success-actions">
                            <button
                              type="button"
                              className="btn-admin-action secondary"
                              onClick={() => {
                                setUserMgmtSubTab('directory')
                                setUserMgmtStep('form')
                              }}
                            >
                              ← Back to User Directory
                            </button>
                            <button
                              type="button"
                              className="btn-admin-action primary"
                              onClick={handleCreateAnother}
                            >
                              + Create Another User
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =========================================================
                  SUB-TAB 3: BULK IMPORT (CSV / EXCEL)
                  ========================================================= */}
              {userMgmtSubTab === 'bulk' && (
                <div className="admin-bulk-import-container">
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 4 }}>
                    <button
                      type="button"
                      className="btn-admin-action secondary"
                      onClick={() => {
                        setUserMgmtSubTab('directory')
                        setBulkStage('upload')
                        setBulkFile(null)
                        setBulkRows([])
                      }}
                    >
                      ← Back to User Management Hub
                    </button>
                  </div>

                  {/* Step Progress Pills */}
                  <div className="admin-bulk-stages-bar">
                    <div className={`admin-bulk-stage-step ${bulkStage === 'upload' ? 'active' : 'done'}`}>
                      <span className="stage-num">1</span>
                      <span className="stage-title">Download Template &amp; Upload</span>
                    </div>
                    <span className="stage-sep">→</span>
                    <div className={`admin-bulk-stage-step ${bulkStage === 'preview' ? 'active' : bulkStage === 'processing' || bulkStage === 'result' ? 'done' : ''}`}>
                      <span className="stage-num">2</span>
                      <span className="stage-title">Schema Validation &amp; Preview</span>
                    </div>
                    <span className="stage-sep">→</span>
                    <div className={`admin-bulk-stage-step ${bulkStage === 'processing' ? 'active' : bulkStage === 'result' ? 'done' : ''}`}>
                      <span className="stage-num">3</span>
                      <span className="stage-title">Batch Ingestion &amp; Dispatch</span>
                    </div>
                    <span className="stage-sep">→</span>
                    <div className={`admin-bulk-stage-step ${bulkStage === 'result' ? 'active' : ''}`}>
                      <span className="stage-num">4</span>
                      <span className="stage-title">Telemetry Summary</span>
                    </div>
                  </div>

                  {/* STAGE 1: UPLOAD & TEMPLATE DOWNLOAD */}
                  {bulkStage === 'upload' && (
                    <div className="admin-card-panel admin-bulk-upload-card">
                      {/* Top Banner: Template Download */}
                      <div className="admin-bulk-template-box">
                        <div className="template-box-left">
                          <span className="template-icon">📑</span>
                          <div>
                            <strong className="template-title">Official User Ingestion Template</strong>
                            <p className="template-desc">
                              Pre-configured CSV and Excel templates with columns: <strong>Role</strong> (Trainer/Trainee), <strong>Name</strong>, <strong>Email</strong>, and <strong>Organization</strong>.
                            </p>
                          </div>
                        </div>
                        <div className="template-box-actions">
                          <button
                            type="button"
                            className="btn-admin-action secondary"
                            onClick={() => handleDownloadTemplate('csv')}
                          >
                            📥 Download CSV Template
                          </button>
                          <button
                            type="button"
                            className="btn-admin-action secondary"
                            onClick={() => handleDownloadTemplate('xlsx')}
                          >
                            📥 Excel (.xlsx)
                          </button>
                          <button
                            type="button"
                            className="btn-admin-action primary"
                            style={{ background: '#2F6B3C' }}
                            onClick={handleLoadDemoCsv}
                            title="Instant 1-Click evaluation test"
                          >
                            ✨ Load Demo Batch (10 Users)
                          </button>
                        </div>
                      </div>

                      {/* Drag & Drop Upload Zone */}
                      <div
                        className={`admin-bulk-dropzone ${bulkDragActive ? 'dragover' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setBulkDragActive(true); }}
                        onDragLeave={() => setBulkDragActive(false)}
                        onDrop={(e) => {
                          e.preventDefault()
                          setBulkDragActive(false)
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleCsvFileSelect({ target: { files: e.dataTransfer.files } })
                          }
                        }}
                      >
                        <div className="dropzone-icon-circle">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        <h4 className="dropzone-title">Drag &amp; Drop your CSV or Excel Spreadsheet</h4>
                        <p className="dropzone-subtitle">
                          Supported format: Role, Name, Email, Organization. Auto ID generation and validation will run instantly.
                        </p>
                        <div className="dropzone-pills">
                          <span>.CSV</span>
                          <span>.XLSX</span>
                          <span>.XLS</span>
                          <span>Max: 10 MB (up to 5,000 rows)</span>
                        </div>
                        <label className="btn-admin-action primary dropzone-browse-btn">
                          <span>Browse Files from Computer</span>
                          <input
                            type="file"
                            accept=".csv, .xlsx, .xls"
                            style={{ display: 'none' }}
                            onChange={handleCsvFileSelect}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* STAGE 2: PREVIEW & CLIENT-SIDE VALIDATION */}
                  {bulkStage === 'preview' && (
                    <div className="admin-card-panel admin-bulk-preview-card">
                      <div className="admin-panel-head" style={{ borderBottom: '1.5px solid #DCE6DF', paddingBottom: 14 }}>
                        <div>
                          <div className="admin-bulk-file-pill">
                            <span>📄 File: <strong>{bulkFile?.name}</strong> ({bulkFile?.size})</span>
                            <span className="role-tag">Multi-Role Batch Ingestion</span>
                          </div>
                          <h3 className="admin-panel-title" style={{ marginTop: 8 }}>Client-Side Validation &amp; Ingestion Preview</h3>
                          <p className="admin-panel-subtitle">
                            Review parsed rows before executing database insertion and credentials email dispatch.
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <button
                            type="button"
                            className="btn-admin-action secondary"
                            onClick={() => {
                              setBulkStage('upload')
                              setBulkFile(null)
                              setBulkRows([])
                            }}
                          >
                            ← Choose Different File
                          </button>
                          <button
                            type="button"
                            className="btn-admin-action primary"
                            style={{ background: '#2F6B3C', fontWeight: 800 }}
                            onClick={handleExecuteBulkImport}
                          >
                            🚀 Ingest &amp; Dispatch ({bulkRows.filter(r => r.status === 'valid').length} Valid Records)
                          </button>
                        </div>
                      </div>

                      {/* Validation Telemetry Banner */}
                      <div className="admin-bulk-validation-telemetry">
                        <div className="telemetry-chip total">
                          <span>Total Detected Rows:</span>
                          <strong>{bulkRows.length}</strong>
                        </div>
                        <div className="telemetry-chip valid">
                          <span>✔ Ready for Ingestion:</span>
                          <strong>{bulkRows.filter(r => r.status === 'valid').length}</strong>
                        </div>
                        <div className="telemetry-chip warning">
                          <span>⚠ Action / Duplicates:</span>
                          <strong>{bulkRows.filter(r => r.status !== 'valid').length}</strong>
                        </div>
                      </div>

                      {/* Preview Table */}
                      <div className="admin-bulk-preview-table-wrap">
                        <table className="admin-bulk-preview-table">
                          <thead>
                            <tr>
                              <th style={{ width: '6%' }}># Row</th>
                              <th style={{ width: '12%' }}>Role</th>
                              <th style={{ width: '20%' }}>Full Name</th>
                              <th style={{ width: '22%' }}>Official Email</th>
                              <th style={{ width: '18%' }}>Organization / Affiliation</th>
                              <th style={{ width: '11%' }}>Generated ID</th>
                              <th style={{ width: '11%' }}>Auto Password</th>
                              <th style={{ width: '12%' }}>Validation Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkRows.map((row, idx) => (
                              <tr key={idx} className={`preview-row-${row.status}`}>
                                <td><strong className="bulk-row-num">#{row.rowNum}</strong></td>
                                <td>
                                  <span className={`admin-create-user-role-pill ${row.role === 'Trainer' ? 'trainer' : 'trainee'}`}>
                                    {row.role}
                                  </span>
                                </td>
                                <td><strong className="bulk-user-name">{row.name}</strong></td>
                                <td><span className="admin-email-text">{row.email || <em style={{ color: '#DC2626' }}>Missing</em>}</span></td>
                                <td><span className="bulk-cell-text">{row.organization}</span></td>
                                <td><code className="admin-id-badge" style={{ whiteSpace: 'nowrap' }}>{row.autoId}</code></td>
                                <td><code className="bulk-pwd-badge">{row.tempPwd}</code></td>
                                <td>
                                  {row.status === 'valid' && (
                                    <span className="admin-status-pill excellent" style={{ whiteSpace: 'nowrap' }}>✔ Valid &amp; Ready</span>
                                  )}
                                  {row.status === 'duplicate' && (
                                    <span className="admin-status-pill warning" style={{ whiteSpace: 'nowrap' }} title={row.reason}>⚠ Duplicate Email</span>
                                  )}
                                  {row.status === 'invalid' && (
                                    <span className="admin-status-pill bad" style={{ whiteSpace: 'nowrap' }} title={row.reason}>✕ {row.reason}</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* STAGE 3: LIVE PROCESSING SIMULATION */}
                  {bulkStage === 'processing' && (
                    <div className="admin-card-panel admin-bulk-processing-card">
                      <div className="admin-bulk-spinner-circle">
                        <div className="spinner-inner" />
                      </div>
                      <h3 className="processing-title">Ingesting Records &amp; Dispatching Credentials...</h3>
                      <p className="processing-sub">{bulkStepMessage}</p>

                      {/* Progress Bar */}
                      <div className="admin-bulk-progress-bar-wrap">
                        <div className="admin-bulk-progress-bar-fill" style={{ width: `${bulkProgress}%` }} />
                      </div>
                      <span className="processing-percent">{bulkProgress}% Complete</span>

                      <div className="admin-bulk-stage-log-list">
                        <div className={`log-item ${bulkProgress >= 30 ? 'done' : 'active'}`}>
                          <span>{bulkProgress >= 30 ? '✔' : '⏳'}</span>
                          <span>Schema normalization for Role, Name, Email, and Organization</span>
                        </div>
                        <div className={`log-item ${bulkProgress >= 70 ? 'done' : bulkProgress >= 30 ? 'active' : ''}`}>
                          <span>{bulkProgress >= 70 ? '✔' : '⏳'}</span>
                          <span>Automated TRR/TRN ID allocation &amp; salted bcrypt credential hashing</span>
                        </div>
                        <div className={`log-item ${bulkProgress >= 100 ? 'done' : bulkProgress >= 70 ? 'active' : ''}`}>
                          <span>{bulkProgress >= 100 ? '✔' : '⏳'}</span>
                          <span>Asynchronous SMTP welcome email dispatch with initial credentials</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STAGE 4: TELEMETRY SUMMARY & RESULT */}
                  {bulkStage === 'result' && (
                    <div className="admin-card-panel admin-bulk-result-card">
                      <div className="admin-bulk-result-hero">
                        <div className="result-check-icon">✓</div>
                        <h3 className="result-hero-title">Bulk Ingestion Completed</h3>
                        <p className="result-hero-sub">
                          New profiles have been provisioned in the database and welcome onboarding emails have been queued.
                        </p>

                        {/* Result Counters */}
                        <div className="admin-bulk-result-counters">
                          <div className="result-stat-box success">
                            <strong>{bulkSummary.successCount}</strong>
                            <span>Successfully Onboarded &amp; Emailed</span>
                          </div>
                          <div className="result-stat-box failed">
                            <strong>{bulkSummary.failedCount}</strong>
                            <span>Skipped / Needs Action</span>
                          </div>
                        </div>
                      </div>

                      {/* Failed Rows Breakdown (If any) */}
                      {bulkSummary.failedRows.length > 0 && (
                        <div className="admin-bulk-failed-section">
                          <div className="failed-section-head">
                            <strong>⚠ Skipped Records Breakdown ({bulkSummary.failedCount} Rows)</strong>
                            <button
                              type="button"
                              className="btn-admin-action secondary"
                              onClick={handleDownloadErrorReport}
                            >
                              📥 Download Error Report (.csv)
                            </button>
                          </div>
                          <div className="admin-bulk-preview-table-wrap" style={{ maxHeight: 220, overflowY: 'auto' }}>
                            <table className="admin-bulk-preview-table">
                              <thead>
                                <tr>
                                  <th style={{ width: '8%' }}>Row #</th>
                                  <th style={{ width: '14%' }}>Role</th>
                                  <th style={{ width: '22%' }}>Full Name</th>
                                  <th style={{ width: '22%' }}>Email Address</th>
                                  <th style={{ width: '34%' }}>Identified Validation Issue</th>
                                </tr>
                              </thead>
                              <tbody>
                                {bulkSummary.failedRows.map((row, idx) => (
                                  <tr key={idx} className="preview-row-invalid">
                                    <td><strong className="bulk-row-num">#{row.rowNum}</strong></td>
                                    <td>
                                      <span className={`admin-create-user-role-pill ${row.role === 'Trainer' ? 'trainer' : 'trainee'}`}>
                                        {row.role}
                                      </span>
                                    </td>
                                    <td><strong>{row.name}</strong></td>
                                    <td><span className="admin-email-text">{row.email || 'None'}</span></td>
                                    <td><span className="admin-status-pill bad">✕ {row.reason}</span></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Result Action Buttons */}
                      <div className="admin-bulk-result-actions">
                        <button
                          type="button"
                          className="btn-admin-action secondary"
                          onClick={() => {
                            setBulkStage('upload')
                            setBulkFile(null)
                            setBulkRows([])
                          }}
                        >
                          🔄 Import Another Batch
                        </button>
                        <button
                          type="button"
                          className="btn-admin-action primary"
                          onClick={() => setUserMgmtSubTab('directory')}
                        >
                          👥 View in User Directory →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: DEACTIVATE / SUSPEND USER */}
          {activeTab === 'Deactivate / Suspend User' && (
            <div className="admin-deact-container">
              {/* Executive Header Banner */}
              <div className="admin-deact-hero-banner">
                <div className="admin-deact-hero-content">
                  <div className="admin-deact-hero-kicker">
                    <span className="kicker-shield">🛡️</span>
                    <span>GOVERNANCE &amp; ACCESS CONTROL</span>
                    <span className="kicker-dot">•</span>
                    <span>MoES Directive 4(B) Compliant</span>
                  </div>
                  <h2 className="admin-deact-hero-title">Personnel Deactivation &amp; Suspension Hub</h2>
                  <p className="admin-deact-hero-sub">
                    Manage institutional user lifecycle states. Suspending an account revokes active portal credentials and LMS access while permanently preserving all past course evaluations, certificates, and compliance audit history.
                  </p>
                </div>
                <div className="admin-deact-hero-badge">
                  <div className="badge-ring">
                    <span className="badge-val">100%</span>
                    <span className="badge-lbl">Audit Logged</span>
                  </div>
                </div>
              </div>

              {/* 4 Telemetry Metric KPI Cards */}
              <div className="admin-deact-metrics-grid">
                <div className="admin-deact-metric-card">
                  <div className="metric-icon-box active-bg">👥</div>
                  <div className="metric-info">
                    <span className="metric-label">Active Personnel</span>
                    <strong className="metric-val">
                      {trainers.filter(t => t.status !== 'Suspended').length + trainees.filter(t => t.status !== 'Suspended').length + 2}
                    </strong>
                    <small className="metric-sub text-green">● Full Portal Access Active</small>
                  </div>
                </div>

                <div className="admin-deact-metric-card">
                  <div className="metric-icon-box suspended-bg">⚠️</div>
                  <div className="metric-info">
                    <span className="metric-label">Suspended / Inactive</span>
                    <strong className="metric-val text-amber">
                      {trainers.filter(t => t.status === 'Suspended').length + trainees.filter(t => t.status === 'Suspended').length + 2}
                    </strong>
                    <small className="metric-sub text-amber">● Access Revoked (Data Preserved)</small>
                  </div>
                </div>

                <div className="admin-deact-metric-card">
                  <div className="metric-icon-box transfer-bg">🔄</div>
                  <div className="metric-info">
                    <span className="metric-label">Transfer / Offboarding</span>
                    <strong className="metric-val">3</strong>
                    <small className="metric-sub text-blue">● Regional Node Handover</small>
                  </div>
                </div>

                <div className="admin-deact-metric-card">
                  <div className="metric-icon-box security-bg">🔒</div>
                  <div className="metric-info">
                    <span className="metric-label">Protected Root Admins</span>
                    <strong className="metric-val">2</strong>
                    <small className="metric-sub text-purple">● Super Admin Locked</small>
                  </div>
                </div>
              </div>

              {/* Institutional Soft-Delete vs Hard-Delete Policy Banner */}
              <div className="admin-deact-policy-callout">
                <div className="callout-icon">ℹ️</div>
                <div className="callout-text">
                  <strong>MoES Institutional Data Retention Standard:</strong>
                  <span>
                    To prevent loss of legal records and national training telemetry, hard deletion is restricted. All account terminations are executed as <em>Cryptographically Signed Soft Suspensions</em> with mandatory memo references.
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-deact-export-audit"
                  onClick={handleExportSuspensionAudit}
                >
                  <span>⬇</span> Download Audit Log (.CSV)
                </button>
              </div>

              {/* Personnel Governance Directory Card */}
              <div className="admin-card-panel" style={{ marginTop: 20 }}>
                <div className="admin-panel-head" style={{ flexWrap: 'wrap', gap: 14 }}>
                  <div>
                    <h3 className="admin-panel-title">Personnel Access Directory</h3>
                    <p className="admin-panel-subtitle">Select any staff member to suspend access or reinstate credentials.</p>
                  </div>

                  {/* Filters & Search Toolbar */}
                  <div className="admin-deact-filters-wrap">
                    <div className="admin-deact-search-box">
                      <span>🔍</span>
                      <input
                        type="text"
                        placeholder="Search by name, staff ID, department, email..."
                        value={deactSearchQuery}
                        onChange={(e) => setDeactSearchQuery(e.target.value)}
                      />
                      {deactSearchQuery && (
                        <button type="button" className="clear-btn" onClick={() => setDeactSearchQuery('')}>✕</button>
                      )}
                    </div>

                    <div className="admin-deact-select-group">
                      <select
                        value={deactRoleFilter}
                        onChange={(e) => setDeactRoleFilter(e.target.value)}
                        className="admin-deact-select"
                      >
                        <option value="All">All Roles</option>
                        <option value="Trainee">Trainees Only</option>
                        <option value="Trainer">Trainers Only</option>
                        <option value="Admin">Admins (Root Protected)</option>
                      </select>

                      <select
                        value={deactStatusFilter}
                        onChange={(e) => setDeactStatusFilter(e.target.value)}
                        className="admin-deact-select"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active Access Only</option>
                        <option value="Suspended">Suspended / Revoked Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Structured Personnel Access Table */}
                <div className="admin-deact-table-wrap">
                  <table className="admin-deact-table">
                    <thead>
                      <tr>
                        <th style={{ width: '23%' }}>Personnel / Faculty</th>
                        <th style={{ width: '13%' }}>Staff ID</th>
                        <th style={{ width: '11%' }}>Role</th>
                        <th style={{ width: '21%' }}>Department &amp; Posting</th>
                        <th style={{ width: '16%' }}>Official Email</th>
                        <th style={{ width: '9%' }}>Access Status</th>
                        <th style={{ width: '7%' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ...trainers.map((t, idx) => ({
                          id: `TRR-700${idx + 1}`,
                          name: t.name,
                          role: 'Trainer',
                          dept: 'Atmospheric Sciences Wing',
                          designation: 'Senior Faculty / Scientist',
                          email: `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@imd.gov.in`,
                          status: t.status === 'Suspended' ? 'Suspended' : 'Active',
                          canModify: true
                        })),
                        ...trainees.map(t => ({
                          id: t.id,
                          name: t.name,
                          role: 'Trainee',
                          dept: t.dept,
                          designation: 'Scientific Officer',
                          email: `${t.name.toLowerCase().replace(/[^a-z]/g, '')}@imd.gov.in`,
                          status: t.status === 'Suspended' ? 'Suspended' : 'Active',
                          canModify: true
                        })),
                        {
                          id: 'ADM-004',
                          name: 'Dr. M. Mohapatra (Directorate)',
                          role: 'Super Admin',
                          dept: 'MoES / IMD Central Command',
                          designation: 'Director General of Meteorology',
                          email: 'dg.meteorology@imd.gov.in',
                          status: 'Active',
                          canModify: false,
                          lockReason: 'Root Authority (Super Admin Protected)'
                        },
                        {
                          id: 'ADM-012',
                          name: 'Dr. S. K. Roy',
                          role: 'Admin',
                          dept: 'IMD Pune Training Node',
                          designation: 'Director of Training',
                          email: 'director.pune@imd.gov.in',
                          status: 'Active',
                          canModify: false,
                          lockReason: 'Admin Account (Super Admin Access Required)'
                        }
                      ]
                        .filter(user => {
                          const query = deactSearchQuery.toLowerCase()
                          const matchesQuery = !query ||
                            user.name.toLowerCase().includes(query) ||
                            user.id.toLowerCase().includes(query) ||
                            user.dept.toLowerCase().includes(query) ||
                            user.email.toLowerCase().includes(query)

                          const matchesRole = deactRoleFilter === 'All' ||
                            (deactRoleFilter === 'Admin' ? user.role.includes('Admin') : user.role === deactRoleFilter)

                          const matchesStatus = deactStatusFilter === 'All' || user.status === deactStatusFilter

                          return matchesQuery && matchesRole && matchesStatus
                        })
                        .map((user, idx) => (
                          <tr key={idx} className={user.status === 'Suspended' ? 'row-suspended' : ''}>
                            <td>
                              <div className="admin-user-cell">
                                <div className={`admin-user-avatar ${user.role.toLowerCase().includes('admin') ? 'trainer' : user.role.toLowerCase()}`}>
                                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="admin-user-info">
                                  <strong>{user.name}</strong>
                                  <small>{user.designation}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <code className="admin-id-badge">{user.id}</code>
                            </td>
                            <td>
                              <span className={`admin-deact-role-pill ${user.role.toLowerCase().includes('admin') ? 'admin' : user.role.toLowerCase()}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>
                              <div className="admin-dept-cell">
                                <span className="admin-dept-name">{user.dept}</span>
                                <small className="admin-station-sub">MoES Verified Station</small>
                              </div>
                            </td>
                            <td>
                              <span className="admin-email-text">{user.email}</span>
                            </td>
                            <td>
                              <span className={`admin-deact-status-badge ${user.status === 'Active' ? 'active' : 'suspended'}`}>
                                {user.status === 'Active' ? '● Active' : '✕ Suspended'}
                              </span>
                            </td>
                            <td>
                              {user.canModify ? (
                                user.status === 'Active' ? (
                                  <button
                                    type="button"
                                    className="btn-deact-action suspend"
                                    onClick={() => handleInitiateSuspend(user)}
                                    title="Deactivate / Suspend User Access"
                                  >
                                    <span>⚠️</span> Suspend Access
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn-deact-action reactivate"
                                    onClick={() => handleReactivateUser(user)}
                                    title="Reactivate User Credentials"
                                  >
                                    <span>🔄</span> Reactivate
                                  </button>
                                )
                              ) : (
                                <span className="admin-locked-badge" title={user.lockReason}>
                                  🔒 Protected
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Real-Time Access Revocation & Suspension Audit Trail */}
              <div className="admin-card-panel" style={{ marginTop: 24 }}>
                <div className="admin-panel-head">
                  <div>
                    <h3 className="admin-panel-title">🛡️ System Suspension &amp; Reactivation Audit Trail</h3>
                    <p className="admin-panel-subtitle">Immutable chronological log of all account status modifications and official memos.</p>
                  </div>
                  <span className="admin-nav-badge" style={{ background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
                    ✔ Tamper-Proof Log
                  </span>
                </div>

                <div className="admin-deact-table-wrap" style={{ marginTop: 12 }}>
                  <table className="admin-deact-table admin-audit-log-table">
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>Log ID</th>
                        <th style={{ width: '18%' }}>Target Personnel</th>
                        <th style={{ width: '11%' }}>Staff ID</th>
                        <th style={{ width: '12%' }}>Action Taken</th>
                        <th style={{ width: '23%' }}>Institutional Reason</th>
                        <th style={{ width: '14%' }}>Official Memo / Order</th>
                        <th style={{ width: '12%' }}>Authorized By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suspensionLogs.map((log) => (
                        <tr key={log.id}>
                          <td><code>{log.id}</code></td>
                          <td>
                            <strong>{log.targetName}</strong>
                            <span style={{ fontSize: 11, color: '#597363', display: 'block' }}>{log.role}</span>
                          </td>
                          <td><code className="admin-id-badge">{log.targetId}</code></td>
                          <td>
                            <span className={`admin-deact-status-badge ${log.action === 'SUSPENDED' ? 'suspended' : 'active'}`}>
                              {log.action === 'SUSPENDED' ? '⚠️ SUSPENDED' : '✔ REACTIVATED'}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontSize: 13, color: '#16251B', fontWeight: 500 }}>{log.reason}</span>
                          </td>
                          <td>
                            <code style={{ background: '#F1F5F2', padding: '3px 6px', borderRadius: 4, fontSize: 11.5, color: '#1B4332' }}>
                              {log.memoNo}
                            </code>
                          </td>
                          <td>
                            <span style={{ fontSize: 12, color: '#2F5233', fontWeight: 600 }}>{log.adminId}</span>
                            <small style={{ display: 'block', color: '#799784' }}>{log.timestamp}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TRAINEES */}
          {activeTab === 'Trainees' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Trainees Directory</h2>
                  <p className="admin-panel-subtitle">2,486 active learners across MoES / IMD centers and universities.</p>
                </div>
                <button
                  type="button"
                  className="btn-admin-action secondary"
                  onClick={() => {
                    setActionSuccessMsg('Exporting Trainees Directory (CSV)...')
                    setTimeout(() => setActionSuccessMsg(''), 3000)
                  }}
                >
                  <span>⬇</span> Export Directory (CSV)
                </button>
              </div>

              <div style={{ overflowX: 'auto', marginTop: 10 }}>
                <table className="admin-custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Department / Center</th>
                      <th>Enrollments</th>
                      <th>Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainees
                      .filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.dept.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((t) => (
                        <tr key={t.id}>
                          <td><code>{t.id}</code></td>
                          <td><strong>{t.name}</strong></td>
                          <td>{t.dept}</td>
                          <td>{t.enrolled}</td>
                          <td>{t.score}</td>
                          <td>
                            <span className={`admin-status-pill ${t.status === 'Distinction' ? 'excellent' : t.status === 'Active' ? 'good' : 'warning'}`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: TRAINERS */}
          {activeTab === 'Trainers' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Accredited Faculty &amp; Trainers</h2>
                  <p className="admin-panel-subtitle">Verified subject matter experts across meteorological disciplines.</p>
                </div>
                <button
                  type="button"
                  className="btn-admin-action secondary"
                  onClick={() => {
                    setActionSuccessMsg('Exporting Faculty Registry (PDF)...')
                    setTimeout(() => setActionSuccessMsg(''), 3000)
                  }}
                >
                  <span>⬇</span> Export Registry (PDF)
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 10 }}>
                {trainers
                  .filter(tr => !searchQuery || tr.name.toLowerCase().includes(searchQuery.toLowerCase()) || tr.expertise.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((tr) => (
                    <div
                      key={tr.name}
                      style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB', cursor: 'pointer' }}
                      onClick={openTrainerProfile}
                      title="Click to view Trainer Profile"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div className="admin-trainer-avatar" style={{ width: 44, height: 44, fontSize: 14 }}>
                          {tr.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <strong style={{ fontSize: 15, color: '#12281B', display: 'block' }}>{tr.name}</strong>
                          <small style={{ color: '#567261' }}>{tr.expertise}</small>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: '#3A5545', margin: '8px 0 14px' }}>
                        <span>Trained: <strong>{tr.trained}</strong></span>
                        <span>Rating: <strong>{tr.rating}</strong></span>
                      </div>
                      <button type="button" className="btn-admin-action secondary" style={{ width: '100%', justifyContent: 'center' }}>
                        View Profile &rarr;
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB: COMPETENCIES */}
          {activeTab === 'Competencies' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Competency Framework &amp; Radar Analysis</h2>
                  <p className="admin-panel-subtitle">Multi-domain proficiency radar, threshold benchmarks, and workforce gap resolution.</p>
                </div>
                <button
                  type="button"
                  className="btn-admin-action secondary"
                  onClick={() => {
                    setActionSuccessMsg('Competency framework export dispatched to Directorate email.')
                    setTimeout(() => setActionSuccessMsg(''), 3500)
                  }}
                >
                  📥 Export Framework Matrix
                </button>
              </div>

              {/* Multi-Domain Competency Radar / Spider Chart */}
              <div className="admin-two-col-grid" style={{ marginTop: 14, alignItems: 'center' }}>
                <div className="admin-radar-chart-card">
                  <div className="admin-radar-header">
                    <strong>Competency Spider Radar</strong>
                    <div className="admin-radar-legend">
                      <span className="legend-item"><span className="legend-dot target" /> Benchmark (75%)</span>
                      <span className="legend-item"><span className="legend-dot actual" /> Trainee Avg</span>
                    </div>
                  </div>
                  
                  <div className="admin-radar-svg-wrap">
                    <svg viewBox="0 0 340 320" className="admin-radar-svg">
                      {/* Concentric Background Hexagons */}
                      {[0.25, 0.5, 0.75, 1.0].map((scale, i) => {
                        const r = 110 * scale
                        const pts = [0, 1, 2, 3, 4, 5].map(idx => {
                          const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2
                          const x = 170 + r * Math.cos(angle)
                          const y = 160 + r * Math.sin(angle)
                          return `${x},${y}`
                        }).join(' ')
                        return (
                          <polygon
                            key={i}
                            points={pts}
                            fill={scale === 1.0 ? 'rgba(27, 67, 50, 0.03)' : 'none'}
                            stroke="#D6E4DA"
                            strokeWidth="1"
                            strokeDasharray={scale === 0.75 ? '3 3' : 'none'}
                          />
                        )
                      })}

                      {/* Axis lines */}
                      {[0, 1, 2, 3, 4, 5].map((idx) => {
                        const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2
                        const x = 170 + 110 * Math.cos(angle)
                        const y = 160 + 110 * Math.sin(angle)
                        return <line key={idx} x1="170" y1="160" x2={x} y2={y} stroke="#DCE6DF" strokeWidth="1.2" />
                      })}

                      {/* Target Polygon (75% Benchmark) */}
                      {(() => {
                        const targetR = 110 * 0.75
                        const targetPts = [0, 1, 2, 3, 4, 5].map(idx => {
                          const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2
                          return `${170 + targetR * Math.cos(angle)},${160 + targetR * Math.sin(angle)}`
                        }).join(' ')
                        return (
                          <polygon
                            points={targetPts}
                            fill="rgba(217, 119, 6, 0.06)"
                            stroke="#D97706"
                            strokeWidth="1.8"
                            strokeDasharray="4 4"
                          />
                        )
                      })()}

                      {/* Actual Trainee Scores Polygon */}
                      {(() => {
                        const actualPts = competencies.map((comp, idx) => {
                          const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2
                          const r = 110 * (comp.score / 100)
                          return `${170 + r * Math.cos(angle)},${160 + r * Math.sin(angle)}`
                        }).join(' ')
                        return (
                          <polygon
                            points={actualPts}
                            fill="rgba(45, 106, 79, 0.22)"
                            stroke="#1B4332"
                            strokeWidth="2.5"
                          />
                        )
                      })()}

                      {/* Labels and Data Points */}
                      {competencies.map((comp, idx) => {
                        const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2
                        const r = 110 * (comp.score / 100)
                        const x = 170 + r * Math.cos(angle)
                        const y = 160 + r * Math.sin(angle)
                        const labelR = 132
                        const lx = 170 + labelR * Math.cos(angle)
                        const ly = 160 + labelR * Math.sin(angle)
                        return (
                          <g key={comp.name}>
                            <circle cx={x} cy={y} r="4.5" fill="#1B4332" stroke="#FFFFFF" strokeWidth="2" />
                            <text
                              x={lx}
                              y={ly}
                              textAnchor={lx > 170 ? 'start' : lx < 170 ? 'end' : 'middle'}
                              dominantBaseline="central"
                              fontSize="10"
                              fontWeight="700"
                              fill="#1B4332"
                            >
                              {comp.name.split(' ')[0]} ({comp.score}%)
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                </div>

                {/* Priority Gap Remediation Proposal */}
                <div style={{ padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#FBFDFB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>💡</span>
                    <strong style={{ fontSize: 15, color: '#12281B' }}>Automated Gap Resolution Plan</strong>
                  </div>
                  <p style={{ fontSize: 13, color: '#456150', lineHeight: 1.6, margin: '0 0 14px' }}>
                    Machine Learning and Remote Sensing tracks currently operate under the 75% national benchmark. The directorate has scheduled remedial workshops for 220 active candidates.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ padding: 12, borderRadius: 10, background: '#FEF3C7', border: '1px solid #FDE68A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#92400E' }}>Machine Learning in Weather (-28% Gap)</span>
                      <button type="button" className="btn-admin-action primary" style={{ padding: '4px 10px', fontSize: 11.5 }} onClick={() => setActiveModal({ type: 'gap', data: { name: 'Machine Learning in Weather', current: '47%', target: '75%', gap: '-28%', trainees: 126 } })}>
                        Launch Clinic
                      </button>
                    </div>
                    <div style={{ padding: 12, borderRadius: 10, background: '#FEF3C7', border: '1px solid #FDE68A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#92400E' }}>Satellite Remote Sensing (-21% Gap)</span>
                      <button type="button" className="btn-admin-action primary" style={{ padding: '4px 10px', fontSize: 11.5 }} onClick={() => setActiveModal({ type: 'gap', data: { name: 'Satellite Remote Sensing', current: '54%', target: '75%', gap: '-21%', trainees: 94 } })}>
                        Launch Clinic
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Progress Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
                {competencies.map((comp) => (
                  <div key={comp.name} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div>
                        <strong style={{ fontSize: 15, color: '#12281B' }}>{comp.name}</strong>
                        <span className={`admin-status-pill ${comp.status === 'Strong' ? 'excellent' : comp.status === 'Developing' ? 'good' : 'warning'}`} style={{ marginLeft: 10 }}>
                          {comp.status}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong style={{ fontSize: 16, color: '#1B4332' }}>{comp.score}%</strong>
                        <small style={{ color: '#688273', marginLeft: 6 }}>Target: {comp.target}%</small>
                      </div>
                    </div>
                    <div className="admin-health-track" style={{ height: 10 }}>
                      <div
                        className="admin-health-fill"
                        style={{
                          width: `${comp.score}%`,
                          background: comp.score >= 75 ? '#1B4332' : comp.score >= 60 ? '#D97706' : '#DC2626'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#688273', marginTop: 8 }}>
                      <span>Enrolled Learners in Track: {comp.trainees}</span>
                      <span>Gap: {comp.target - comp.score > 0 ? `-${comp.target - comp.score}%` : 'Target Achieved'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TRAINER MATCHING */}
          {activeTab === 'Trainer Matching' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">AI Trainer Matching Engine</h2>
                  <p className="admin-panel-subtitle">Automated algorithm aligning syllabus requirements with accredited faculty.</p>
                </div>
              </div>

              <div className="admin-two-col-grid" style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="admin-target-course-box">
                    <small>RECOMMENDED ALLOCATION</small>
                    <strong style={{ fontSize: 16 }}>Advanced Geospatial &amp; Remote Sensing</strong>
                    <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#557060' }}>
                      Target skills: QGIS, Doppler Radar Interpretation, NetCDF Pipeline
                    </p>
                  </div>

                  <div className="admin-matched-faculty-card" onClick={openTrainerProfile}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="admin-trainer-avatar" style={{ width: 46, height: 46, fontSize: 15 }}>
                        RS
                      </div>
                      <div>
                        <strong style={{ fontSize: 15, color: '#12281B', display: 'block' }}>Dr. Rahul Sharma</strong>
                        <small style={{ color: '#4F6B58' }}>Lead Faculty • 8+ yrs experience</small>
                      </div>
                    </div>
                    <div className="admin-match-score-pill">
                      <strong style={{ fontSize: 22 }}>92%</strong>
                      <small>Match Score</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-admin-action primary"
                    style={{ justifyContent: 'center' }}
                    onClick={() => setActiveModal('assignTrainer')}
                  >
                    Confirm Faculty Assignment &rarr;
                  </button>
                </div>

                <div style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: 15, color: '#12281B' }}>Algorithm Weight Matrix</h3>
                  <ul style={{ paddingLeft: 18, fontSize: 13, color: '#456150', lineHeight: 1.8 }}>
                    <li><strong>35% Weight:</strong> Historical Trainee Assessment Outcomes</li>
                    <li><strong>30% Weight:</strong> Verified Competency Skill Taxonomy</li>
                    <li><strong>20% Weight:</strong> Publications &amp; Operational Experience</li>
                    <li><strong>15% Weight:</strong> Trainee Qualitative Feedback Score</li>
                  </ul>
                  <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: '#EAF4EE', color: '#1B4332', fontSize: 12.5, fontWeight: 600 }}>
                    Algorithm status: Operational • 148 faculty members indexed.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANALYTICS (Redesigned with Rich Interactive SVG Charts, Donut Pie, Regional Benchmark & AI Insights) */}
          {activeTab === 'Analytics' && (
            <div className="admin-analytics-container">
              {/* Sleek Top Filter Bar */}
              <div className="admin-analytics-toolbar">
                <div className="admin-analytics-toolbar-left">
                  <div className="admin-analytics-time-pills">
                    {['7 Days', '30 Days', '90 Days', '1 Year'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`admin-analytics-time-btn ${analyticsPeriod === p ? 'active' : ''}`}
                        onClick={() => setAnalyticsPeriod(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <select
                    className="admin-center-filter-select"
                    value={analyticsCenter}
                    onChange={(e) => setAnalyticsCenter(e.target.value)}
                  >
                    <option>All National Centers</option>
                    <option>IMD New Delhi Directorate HQ</option>
                    <option>IMD Pune Training Node</option>
                    <option>IITM Pune Atmospheric Wing</option>
                    <option>NCMRWF Noida Modeling Center</option>
                    <option>INCOIS Hyderabad Ocean Node</option>
                  </select>
                </div>

                <div className="admin-analytics-toolbar-right">
                  <button
                    type="button"
                    className="btn-admin-action primary"
                    onClick={() => {
                      setActionSuccessMsg('Exporting Institutional Analytics Dossier (PDF)...')
                      setTimeout(() => setActionSuccessMsg(''), 4000)
                    }}
                  >
                    <span>📊</span> Export Dossier (PDF)
                  </button>
                </div>
              </div>

              {/* 4 Clean Glassmorphic KPI Cards */}
              <div className="admin-analytics-kpi-grid">
                <div className="admin-analytics-kpi-card">
                  <div className="kpi-top">
                    <span className="kpi-label">Total Learning Hours</span>
                    <span className="kpi-badge positive">↑ +18.4%</span>
                  </div>
                  <strong className="kpi-num">12,840 <small style={{ fontSize: 14, fontWeight: 600, color: '#597363' }}>hrs</small></strong>
                  <div className="kpi-mini-bar">
                    <div className="kpi-mini-fill" style={{ width: '84%', background: 'linear-gradient(90deg, #1B4332, #52B788)' }} />
                  </div>
                  <span className="kpi-foot">Avg 5.1 hrs/trainee this month</span>
                </div>

                <div className="admin-analytics-kpi-card">
                  <div className="kpi-top">
                    <span className="kpi-label">Completion Velocity</span>
                    <span className="kpi-badge positive">↑ +4.2%</span>
                  </div>
                  <strong className="kpi-num">78.4%</strong>
                  <div className="kpi-mini-bar">
                    <div className="kpi-mini-fill" style={{ width: '78.4%', background: 'linear-gradient(90deg, #2D6A4F, #74C69D)' }} />
                  </div>
                  <span className="kpi-foot">1,948 of 2,486 completed track</span>
                </div>

                <div className="admin-analytics-kpi-card">
                  <div className="kpi-top">
                    <span className="kpi-label">Certified Personnel</span>
                    <span className="kpi-badge positive">92% 1st Pass</span>
                  </div>
                  <strong className="kpi-num">1,894</strong>
                  <div className="kpi-mini-bar">
                    <div className="kpi-mini-fill" style={{ width: '92%', background: 'linear-gradient(90deg, #1B4332, #40916C)' }} />
                  </div>
                  <span className="kpi-foot">MoES / WMO accredited learners</span>
                </div>

                <div className="admin-analytics-kpi-card">
                  <div className="kpi-top">
                    <span className="kpi-label">Institutional Index</span>
                    <span className="kpi-badge positive">↑ +5.2% YoY</span>
                  </div>
                  <strong className="kpi-num">74.8%</strong>
                  <div className="kpi-mini-bar">
                    <div className="kpi-mini-fill" style={{ width: '74.8%', background: 'linear-gradient(90deg, #D97706, #F59E0B)' }} />
                  </div>
                  <span className="kpi-foot">Target threshold: 75.0%</span>
                </div>
              </div>

              {/* Row 1: Dual Interactive Charts (Bar & Spline Trend + Donut Pie) */}
              <div className="admin-analytics-charts-row">
                {/* Left (60%): Monthly Training Velocity & Assessment Outcomes */}
                <div className="admin-card-panel admin-chart-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h3 className="admin-panel-title">Training Velocity &amp; Completion Trajectory</h3>
                      <p className="admin-panel-subtitle">Monthly learner enrollments vs successful cohort completions</p>
                    </div>
                    <div className="admin-chart-legend">
                      <span className="legend-item"><span className="legend-dot enrolled" /> Enrolled</span>
                      <span className="legend-item"><span className="legend-dot completed" /> Completed</span>
                      <span className="legend-item"><span className="legend-dot score" /> Avg Score %</span>
                    </div>
                  </div>

                  <div className="admin-svg-chart-container">
                    <svg viewBox="0 0 540 220" className="admin-analytics-svg">
                      {/* Grid Lines */}
                      <line x1="40" y1="30" x2="520" y2="30" stroke="#EDF2EE" strokeDasharray="4 4" />
                      <line x1="40" y1="75" x2="520" y2="75" stroke="#EDF2EE" strokeDasharray="4 4" />
                      <line x1="40" y1="120" x2="520" y2="120" stroke="#EDF2EE" strokeDasharray="4 4" />
                      <line x1="40" y1="165" x2="520" y2="165" stroke="#EDF2EE" strokeDasharray="4 4" />
                      <line x1="40" y1="180" x2="520" y2="180" stroke="#D1E0D6" strokeWidth="1.5" />

                      {/* Y-Axis Labels */}
                      <text x="32" y="34" textAnchor="end" fontSize="10" fill="#789582">2.5k</text>
                      <text x="32" y="79" textAnchor="end" fontSize="10" fill="#789582">2.0k</text>
                      <text x="32" y="124" textAnchor="end" fontSize="10" fill="#789582">1.5k</text>
                      <text x="32" y="169" textAnchor="end" fontSize="10" fill="#789582">1.0k</text>

                      {/* Trend Spline Area & Line for Avg Score */}
                      <path
                        d="M 75 125 Q 155 120, 235 110 T 395 95 T 475 88"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Monthly Paired Bars */}
                      {MONTHLY_ANALYTICS.map((d, i) => {
                        const baseX = 75 + i * 80
                        const maxVal = 2600
                        const barHeightEnrolled = (d.trainees / maxVal) * 140
                        const barHeightCompleted = (d.completed / maxVal) * 140
                        const isHovered = hoveredMonth === d.month

                        return (
                          <g
                            key={d.month}
                            onMouseEnter={() => setHoveredMonth(d.month)}
                            onMouseLeave={() => setHoveredMonth(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            {/* Hover background column */}
                            {isHovered && (
                              <rect
                                x={baseX - 25}
                                y="20"
                                width="50"
                                height="160"
                                fill="rgba(167, 201, 87, 0.12)"
                                rx="8"
                              />
                            )}

                            {/* Enrolled Bar */}
                            <rect
                              x={baseX - 16}
                              y={180 - barHeightEnrolled}
                              width="14"
                              height={barHeightEnrolled}
                              rx="4"
                              fill="#1B4332"
                              opacity={isHovered ? 1 : 0.9}
                            />

                            {/* Completed Bar */}
                            <rect
                              x={baseX + 2}
                              y={180 - barHeightCompleted}
                              width="14"
                              height={barHeightCompleted}
                              rx="4"
                              fill="#52B788"
                              opacity={isHovered ? 1 : 0.9}
                            />

                            {/* Score dot on spline */}
                            <circle
                              cx={baseX}
                              cy={180 - (d.score / 100) * 140}
                              r={isHovered ? 5.5 : 4}
                              fill="#FFFFFF"
                              stroke="#F59E0B"
                              strokeWidth="2.5"
                            />

                            {/* X Axis Month Label */}
                            <text
                              x={baseX}
                              y="198"
                              textAnchor="middle"
                              fontSize="11"
                              fontWeight={isHovered ? '700' : '600'}
                              fill={isHovered ? '#1B4332' : '#557260'}
                            >
                              {d.month}
                            </text>
                          </g>
                        )
                      })}
                    </svg>

                    {/* Interactive Month Hover Banner */}
                    <div className="admin-chart-tooltip-banner">
                      {hoveredMonth ? (
                        (() => {
                          const mData = MONTHLY_ANALYTICS.find(m => m.month === hoveredMonth)
                          return (
                            <div className="tooltip-content-active">
                              <strong>📅 {mData.month} 2026 Telemetry:</strong>
                              <span>👥 Enrolled: <strong>{mData.trainees}</strong></span>
                              <span>✓ Completed: <strong>{mData.completed}</strong></span>
                              <span>⏱ Study: <strong>{mData.hours} hrs</strong></span>
                              <span>🎯 Avg Score: <strong>{mData.score}%</strong></span>
                            </div>
                          )
                        })()
                      ) : (
                        <div className="tooltip-content-default">
                          <span>💡 Hover over any monthly column above to inspect granular enrollment and outcome metrics.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right (40%): Domain Enrollment Distribution (Donut Pie Chart) */}
                <div className="admin-card-panel admin-donut-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h3 className="admin-panel-title">Domain Distribution</h3>
                      <p className="admin-panel-subtitle">Share of enrolled trainees across disciplines</p>
                    </div>
                  </div>

                  <div className="admin-donut-layout">
                    {/* SVG Donut Circle */}
                    <div className="admin-donut-svg-wrap">
                      <svg viewBox="0 0 180 180" className="admin-donut-svg">
                        <circle cx="90" cy="90" r="70" fill="none" stroke="#EDF2EE" strokeWidth="22" />
                        {(() => {
                          const circumference = 2 * Math.PI * 70 // ~439.82
                          let cumulativePercent = 0
                          return DOMAIN_ANALYTICS.map((dom) => {
                            const strokeDasharray = `${(dom.percent / 100) * circumference} ${circumference}`
                            const strokeDashoffset = -((cumulativePercent / 100) * circumference)
                            cumulativePercent += dom.percent
                            const isHovered = hoveredDomain === dom.domain

                            return (
                              <circle
                                key={dom.domain}
                                cx="90"
                                cy="90"
                                r="70"
                                fill="none"
                                stroke={dom.color}
                                strokeWidth={isHovered ? 26 : 22}
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="butt"
                                transform="rotate(-90 90 90)"
                                style={{
                                  transition: 'stroke-width 0.2s ease, filter 0.2s ease',
                                  cursor: 'pointer',
                                  filter: isHovered ? 'brightness(1.15) drop-shadow(0 2px 8px rgba(0,0,0,0.2))' : 'none'
                                }}
                                onMouseEnter={() => setHoveredDomain(dom.domain)}
                                onMouseLeave={() => setHoveredDomain(null)}
                              />
                            )
                          })
                        })()}
                      </svg>

                      {/* Donut Center Readout */}
                      <div className="admin-donut-center-readout">
                        {hoveredDomain ? (
                          (() => {
                            const h = DOMAIN_ANALYTICS.find(d => d.domain === hoveredDomain)
                            return (
                              <>
                                <strong className="donut-center-num">{h.percent}%</strong>
                                <span className="donut-center-label">{h.count} trainees</span>
                              </>
                            )
                          })()
                        ) : (
                          <>
                            <strong className="donut-center-num">2,486</strong>
                            <span className="donut-center-label">Active Learners</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Domain Breakdown Chips */}
                    <div className="admin-donut-legend-stack">
                      {DOMAIN_ANALYTICS.map((d) => (
                        <div
                          key={d.domain}
                          className={`admin-donut-legend-row ${hoveredDomain === d.domain ? 'hovered' : ''}`}
                          onMouseEnter={() => setHoveredDomain(d.domain)}
                          onMouseLeave={() => setHoveredDomain(null)}
                        >
                          <div className="legend-row-left">
                            <span className="legend-circle" style={{ backgroundColor: d.color }} />
                            <span className="legend-name">{d.domain}</span>
                          </div>
                          <div className="legend-row-right">
                            <strong className="legend-percent">{d.percent}%</strong>
                            <small className="legend-count">({d.count})</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Regional Center Benchmarks & Grade Band Distribution */}
              <div className="admin-analytics-charts-row">
                {/* Left: Regional Centers Benchmark */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h3 className="admin-panel-title">National Training Centers Benchmark</h3>
                      <p className="admin-panel-subtitle">Institutional throughput and passing thresholds across nodes</p>
                    </div>
                  </div>

                  <div className="admin-center-benchmark-stack">
                    {REGIONAL_CENTER_PERFORMANCE.map((c) => (
                      <div className="admin-center-row" key={c.name}>
                        <div className="admin-center-info">
                          <strong className="center-name">{c.name}</strong>
                          <span className="center-trainees">{c.trainees} registered trainees</span>
                        </div>
                        <div className="admin-center-bar-col">
                          <div className="admin-center-track">
                            <div
                              className="admin-center-fill"
                              style={{
                                width: `${c.passRate}%`,
                                background: c.passRate >= 90
                                  ? 'linear-gradient(90deg, #1B4332, #40916C)'
                                  : 'linear-gradient(90deg, #2D6A4F, #52B788)'
                              }}
                            />
                          </div>
                          <div className="admin-center-submeta">
                            <span>Pass Rate: <strong>{c.passRate}%</strong></span>
                            <span>Avg Score: <strong>{c.avgScore}%</strong></span>
                          </div>
                        </div>
                        <div className="admin-center-status-col">
                          <span className={`admin-status-pill ${c.status === 'Top Performing' ? 'excellent' : c.status === 'Strong' ? 'good' : 'warning'}`}>
                            {c.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Grade Band Distribution */}
                <div className="admin-card-panel">
                  <div className="admin-panel-head">
                    <div className="admin-panel-title-wrap">
                      <h3 className="admin-panel-title">Competency Grade Band Distribution</h3>
                      <p className="admin-panel-subtitle">Institutional cohort classification based on MoES assessment rubric</p>
                    </div>
                  </div>

                  {/* Stacked Percentage Bar */}
                  <div className="admin-stacked-grade-bar">
                    {GRADE_DISTRIBUTION.map((g) => (
                      <div
                        key={g.grade}
                        className="admin-grade-segment"
                        style={{ width: `${g.percent}%`, backgroundColor: g.color }}
                        title={`${g.grade}: ${g.percent}% (${g.count} trainees)`}
                      />
                    ))}
                  </div>

                  {/* 4 Grade Band Cards */}
                  <div className="admin-grade-cards-grid">
                    {GRADE_DISTRIBUTION.map((g) => (
                      <div className="admin-grade-item-card" key={g.grade}>
                        <div className="grade-header">
                          <span className="grade-indicator-dot" style={{ backgroundColor: g.color }} />
                          <span className="grade-title">{g.grade}</span>
                        </div>
                        <strong className="grade-big-num">{g.percent}%</strong>
                        <span className="grade-count-sub">{g.count} trainees</span>
                      </div>
                    ))}
                  </div>

                  {/* Remedial Notice Box */}
                  <div className="admin-grade-remedial-notice">
                    <span className="notice-icon">⚠️</span>
                    <div>
                      <strong>Remedial Support Active</strong>
                      <p style={{ margin: '2px 0 0' }}>149 trainees in the &lt;55% band have been automatically scheduled for 2-week mentor coaching clinics.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: AI Learning Insights & Strategic Interventions */}
              <div className="admin-card-panel">
                <div className="admin-panel-head">
                  <div className="admin-panel-title-wrap">
                    <h3 className="admin-panel-title">AI Learning Intelligence &amp; Strategic Observations</h3>
                    <p className="admin-panel-subtitle">Automated pattern recognition and proactive capacity enhancement recommendations</p>
                  </div>
                </div>

                <div className="admin-ai-insights-grid">
                  <div className="admin-insight-card">
                    <div className="insight-top">
                      <span className="insight-badge high-demand">High Demand</span>
                      <small>98% Confidence</small>
                    </div>
                    <strong className="insight-title">Numerical Weather Prediction Surge</strong>
                    <p className="insight-text">
                      Course enrollment in NWP Modeling increased by 42% this quarter. Additional WRF HPC compute nodes recommended.
                    </p>
                  </div>

                  <div className="admin-insight-card">
                    <div className="insight-top">
                      <span className="insight-badge faculty-focus">Faculty Focus</span>
                      <small>94% Confidence</small>
                    </div>
                    <strong className="insight-title">Radar Lab Completion Velocity</strong>
                    <p className="insight-text">
                      Dr. Rahul Sharma's Doppler Radar module achieved a 94% retention rate, highest among all practical laboratories.
                    </p>
                  </div>

                  <div className="admin-insight-card">
                    <div className="insight-top">
                      <span className="insight-badge resolved">Intervention Success</span>
                      <small>100% Verified</small>
                    </div>
                    <strong className="insight-title">Python Earth Science Remediation</strong>
                    <p className="insight-text">
                      Targeted refresher bootcamps reduced programming competency deficit by 16% over the preceding 60 days.
                    </p>
                  </div>

                  <div className="admin-insight-card">
                    <div className="insight-top">
                      <span className="insight-badge cloud-lab">Resource Alert</span>
                      <small>89% Peak</small>
                    </div>
                    <strong className="insight-title">Satellite Data Pipeline Throughput</strong>
                    <p className="insight-text">
                      Trainees actively querying INSAT-3D NetCDF datasets averaged 4.2 GB processed per session with zero latency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ANNOUNCEMENTS */}
          {activeTab === 'Announcements' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Broadcasts &amp; Notices</h2>
                  <p className="admin-panel-subtitle">Send notifications to trainers, trainees, and administrative departments.</p>
                </div>
                <button type="button" className="btn-admin-action primary" onClick={() => setActiveModal('createNotice')}>
                  + Create Broadcast
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                {[
                  { title: 'Q3 Capacity Building Schedule Released', desc: 'Published to all 148 verified trainers and 2,486 trainees across MoES/IMD centers.', time: 'Yesterday', sender: 'Directorate' },
                  { title: 'HPC Weather Modeling Cluster Upgrade Complete', desc: 'Trainees now have access to high-resolution WRF computational nodes and NetCDF parallel pipelines.', time: '3 days ago', sender: 'HPC Admin' },
                  { title: 'Annual Competency Audit Guidelines Updated', desc: 'All faculty and trainees must review the revised threshold criteria prior to final certifications.', time: '1 week ago', sender: 'Compliance Team' }
                ].map((notice, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <strong style={{ fontSize: 15, color: '#12281B' }}>{notice.title}</strong>
                      <small style={{ color: '#688273' }}>{notice.time}</small>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: 13, color: '#4F6B58', lineHeight: 1.5 }}>{notice.desc}</p>
                    <span className="admin-status-pill good">Broadcast by {notice.sender}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: FEEDBACK */}
          {activeTab === 'Feedback' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Trainee &amp; Faculty Feedback</h2>
                  <p className="admin-panel-subtitle">Post-course evaluations, learning outcomes, and trainer satisfaction.</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
                {[
                  { user: 'Pooja Sharma', role: 'Trainee • Remote Sensing Lab', rating: '5/5', text: 'Dr. Neha Verma’s practical radar interpretation module was exceptionally clear and helpful for field analysis.', course: 'Satellite Remote Sensing' },
                  { user: 'Aditya Jaiswal', role: 'Trainee • Meteorology Division', rating: '4.8/5', text: 'Great hands-on exercises in the Python for Earth Sciences course. The lab assignments simulated real forecasting.', course: 'Python Fundamentals' },
                  { user: 'Dr. Amit Kumar', role: 'Trainer • Data Analysis', rating: '4.9/5', text: 'Platform assessment tools make it simple to track individual learner bottlenecks and provide targeted interventions.', course: 'Faculty Review' }
                ].map((fb, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <strong style={{ fontSize: 14.5, color: '#12281B' }}>{fb.user}</strong>
                      <span className="admin-status-pill excellent">{fb.rating}</span>
                    </div>
                    <small style={{ display: 'block', color: '#688273', marginBottom: 8 }}>{fb.role} • Course: {fb.course}</small>
                    <p style={{ margin: 0, fontSize: 13, color: '#314D3C', lineHeight: 1.5 }}>“{fb.text}”</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: REPORTS */}
          {activeTab === 'Reports' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Audit Reports &amp; Compliance Logs</h2>
                  <p className="admin-panel-subtitle">Official records, accreditation audits, cohort progress funnel, and institutional compliance exports.</p>
                </div>
                <button
                  type="button"
                  className="btn-admin-action primary"
                  onClick={() => setReportModalOpen(true)}
                >
                  📑 Generate Directorate Report
                </button>
              </div>

              {/* COHORT PROGRESSION FUNNEL */}
              <div className="admin-funnel-container" style={{ margin: '14px 0 20px', padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <strong style={{ fontSize: 15, color: '#12281B' }}>National Trainee Lifecycle &amp; Conversion Funnel</strong>
                    <p style={{ margin: '3px 0 0', fontSize: 12.5, color: '#526E5D' }}>Progression from registration to accredited competency distinction.</p>
                  </div>
                  <span className="admin-status-pill excellent">68.0% Completion Rate</span>
                </div>

                <div className="admin-funnel-bars-stack">
                  {COHORT_FUNNEL_STAGES.map((stg, i) => (
                    <div key={i} className="admin-funnel-row">
                      <div className="admin-funnel-label-col">
                        <strong>{stg.stage}</strong>
                        <small>{stg.desc}</small>
                      </div>
                      <div className="admin-funnel-bar-col">
                        <div className="admin-health-track" style={{ height: 18, borderRadius: 8, background: '#EEF4EF' }}>
                          <div
                            className="admin-health-fill"
                            style={{
                              width: `${stg.pct}%`,
                              background: stg.color,
                              borderRadius: 8,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              paddingRight: 8,
                              color: '#FFFFFF',
                              fontSize: 11,
                              fontWeight: 800
                            }}
                          >
                            {stg.count.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="admin-funnel-pct-col">
                        <strong>{stg.pct}%</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DOWNLOADABLE AUDIT REPORTS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 10 }}>
                {[
                  { name: 'MoES Annual Capacity Audit Report 2026', date: 'Sept 2026', format: 'PDF • 4.2 MB' },
                  { name: 'Faculty Accreditation & Roster Verification', date: 'Aug 2026', format: 'Excel • 1.1 MB' },
                  { name: 'Institutional Competency Matrix Baseline', date: 'July 2026', format: 'PDF • 3.5 MB' },
                  { name: 'National Training Center Pass Rates', date: 'June 2026', format: 'Excel • 840 KB' }
                ].map((rep, idx) => (
                  <div key={idx} style={{ padding: 18, border: '1.5px solid #DCE6DF', borderRadius: 14, background: '#FBFDFB' }}>
                    <strong style={{ display: 'block', fontSize: 14.5, color: '#12281B', marginBottom: 6 }}>{rep.name}</strong>
                    <div style={{ fontSize: 12, color: '#688273', marginBottom: 14 }}>Generated: {rep.date} • {rep.format}</div>
                    <button
                      type="button"
                      className="btn-admin-action secondary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => {
                        setActionSuccessMsg(`Downloading ${rep.name}...`)
                        setTimeout(() => setActionSuccessMsg(''), 3000)
                      }}
                    >
                      Download Report &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: APPROVALS (SEPARATE TRAINER & TRAINEE PORTALS) */}
          {activeTab === 'Approvals' && (
            <div className="admin-card-panel admin-approvals-main-view">
              {/* Header & KPI Summary Banner */}
              <div className="admin-approvals-header">
                <div className="admin-approvals-title-wrap">
                  <div className="admin-approvals-badge-pill">
                    <span className="live-pulse-dot" />
                    <span>MoES Step 1 Onboarding Gateway</span>
                  </div>
                  <h2 className="admin-approvals-title">Registration &amp; Access Approvals</h2>
                  <p className="admin-approvals-subtitle">
                    Review initial access requests (Name, Email, Role, Organization / Affiliation) submitted by applicants before granting portal account creation.
                  </p>
                </div>
                <div className="admin-approvals-kpi-grid">
                  <div className="admin-app-kpi-card highlight-trainer">
                    <div className="kpi-icon-bubble">🎓</div>
                    <div className="kpi-data-col">
                      <span className="kpi-num">{pendingTrainerCount}</span>
                      <span className="kpi-lbl">Pending Trainers</span>
                      <small className="kpi-subtag">Faculty Clearance</small>
                    </div>
                  </div>
                  <div className="admin-app-kpi-card highlight-trainee">
                    <div className="kpi-icon-bubble">📚</div>
                    <div className="kpi-data-col">
                      <span className="kpi-num">{pendingTraineeCount}</span>
                      <span className="kpi-lbl">Pending Trainees</span>
                      <small className="kpi-subtag">Learner Clearance</small>
                    </div>
                  </div>
                  <div className="admin-app-kpi-card">
                    <div className="kpi-icon-bubble">✅</div>
                    <div className="kpi-data-col">
                      <span className="kpi-num">
                        {trainerApprovals.filter(t => t.status === 'Approved').length + traineeApprovals.filter(t => t.status === 'Approved').length}
                      </span>
                      <span className="kpi-lbl">Total Approved</span>
                      <small className="kpi-subtag">Cleared for Account Creation</small>
                    </div>
                  </div>
                  <div className="admin-app-kpi-card">
                    <div className="kpi-icon-bubble">⏱️</div>
                    <div className="kpi-data-col">
                      <span className="kpi-num">2 Days</span>
                      <span className="kpi-lbl">Standard SLA</span>
                      <small className="kpi-subtag">Up to 2 working days</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Tab Navigation Bar */}
              <div className="admin-approvals-nav-tabs">
                <button
                  type="button"
                  className={`admin-app-tab-btn ${approvalSubTab === 'trainers' ? 'active' : ''}`}
                  onClick={() => {
                    setApprovalSubTab('trainers')
                    setSelectedApprovalIds([])
                  }}
                >
                  <span className="tab-icon">🎓</span>
                  <span className="tab-title">Trainer Approvals</span>
                  {pendingTrainerCount > 0 ? (
                    <span className="admin-app-badge-counter alert">{pendingTrainerCount} Pending</span>
                  ) : (
                    <span className="admin-app-badge-counter clean">All Clear</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`admin-app-tab-btn ${approvalSubTab === 'trainees' ? 'active' : ''}`}
                  onClick={() => {
                    setApprovalSubTab('trainees')
                    setSelectedApprovalIds([])
                  }}
                >
                  <span className="tab-icon">📚</span>
                  <span className="tab-title">Trainee Approvals</span>
                  {pendingTraineeCount > 0 ? (
                    <span className="admin-app-badge-counter alert">{pendingTraineeCount} Pending</span>
                  ) : (
                    <span className="admin-app-badge-counter clean">All Clear</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`admin-app-tab-btn ${approvalSubTab === 'audit' ? 'active' : ''}`}
                  onClick={() => {
                    setApprovalSubTab('audit')
                    setSelectedApprovalIds([])
                  }}
                >
                  <span className="tab-icon">📋</span>
                  <span className="tab-title">Decision Audit Log</span>
                  <span className="admin-app-badge-counter neutral">
                    {trainerApprovals.filter(t => t.status !== 'Pending').length + traineeApprovals.filter(t => t.status !== 'Pending').length} Records
                  </span>
                </button>
              </div>

              {/* Toolbar Filters & Batch Operations */}
              <div className="admin-approvals-toolbar">
                <div className="toolbar-search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={`Search by Name, Email, Token ID, Organization...`}
                    value={approvalSearchQuery}
                    onChange={(e) => setApprovalSearchQuery(e.target.value)}
                  />
                  {approvalSearchQuery && (
                    <button type="button" className="btn-clear-search" onClick={() => setApprovalSearchQuery('')}>
                      ✕
                    </button>
                  )}
                </div>

                <div className="toolbar-filters-group">
                  <select
                    value={approvalStatusFilter}
                    onChange={(e) => setApprovalStatusFilter(e.target.value)}
                    className="admin-select-filter"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Waiting for Approval</option>
                    <option value="Approved">Approved &amp; Cleared</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  {selectedApprovalIds.length > 0 && (
                    <div className="batch-actions-wrap">
                      <button
                        type="button"
                        className="btn-batch-approve"
                        onClick={handleBatchApprove}
                      >
                        ✓ Batch Approve ({selectedApprovalIds.length})
                      </button>
                      <button
                        type="button"
                        className="btn-batch-clear"
                        onClick={() => setSelectedApprovalIds([])}
                      >
                        Deselect
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SUB-VIEW 1: TRAINER APPROVALS */}
              {approvalSubTab === 'trainers' && (
                <div className="admin-approvals-list-container">
                  {(() => {
                    const filteredTrainers = trainerApprovals.filter(item => {
                      const matchSearch = !approvalSearchQuery ||
                        item.name.toLowerCase().includes(approvalSearchQuery.toLowerCase()) ||
                        item.id.toLowerCase().includes(approvalSearchQuery.toLowerCase()) ||
                        item.email.toLowerCase().includes(approvalSearchQuery.toLowerCase()) ||
                        (item.organization && item.organization.toLowerCase().includes(approvalSearchQuery.toLowerCase()))
                      const matchStatus = approvalStatusFilter === 'All' || item.status === approvalStatusFilter
                      return matchSearch && matchStatus
                    })

                    if (filteredTrainers.length === 0) {
                      return (
                        <div className="admin-approvals-empty-state">
                          <div className="empty-icon">🎓</div>
                          <h3>No Trainer Requests Found</h3>
                          <p>No faculty access requests match your search or filter criteria.</p>
                          <button
                            type="button"
                            className="btn-admin-action secondary"
                            onClick={() => {
                              setApprovalSearchQuery('')
                              setApprovalStatusFilter('All')
                            }}
                          >
                            Reset Filters
                          </button>
                        </div>
                      )
                    }

                    return (
                      <div className="admin-approvals-cards-grid">
                        {filteredTrainers.map((item) => {
                          const isSelected = selectedApprovalIds.includes(item.id)
                          const isPending = item.status === 'Pending'

                          return (
                            <div
                              key={item.id}
                              className={`admin-approval-card ${isSelected ? 'selected' : ''} ${item.status.toLowerCase()}`}
                            >
                              {/* Card Header with Token & Status */}
                              <div className="card-top-row">
                                <div className="card-token-select">
                                  {isPending && (
                                    <input
                                      type="checkbox"
                                      className="app-card-checkbox"
                                      checked={isSelected}
                                      onChange={() => handleToggleSelectId(item.id)}
                                    />
                                  )}
                                  <span className="token-pill">
                                    <code>{item.id}</code>
                                  </span>
                                  <span className="role-pill trainer">Trainer</span>
                                </div>
                                <div className="card-status-badges">
                                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                                    {item.status === 'Pending' && '⏳ Waiting for Approval'}
                                    {item.status === 'Approved' && '✅ Approved'}
                                    {item.status === 'Rejected' && '❌ Rejected'}
                                  </span>
                                </div>
                              </div>

                              {/* Trainer Profile Main Info */}
                              <div className="card-body-meta">
                                <div className="user-avatar-lead trainer">
                                  {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="user-info-col">
                                  <h4 className="user-name">{item.name}</h4>
                                  <div className="user-designation" style={{ color: '#496653' }}>
                                    ✉️ {item.email}
                                  </div>
                                </div>
                              </div>

                              {/* Step 1 Collected Details: Organization & SLA */}
                              <div className="card-details-grid" style={{ gridTemplateColumns: '1fr' }}>
                                <div className="detail-item">
                                  <span className="detail-label">Organization / Affiliation:</span>
                                  <span className="detail-val" style={{ fontSize: 13, color: '#11281A', fontWeight: 700 }}>
                                    🏛️ {item.organization}
                                  </span>
                                </div>
                                <div className="detail-item" style={{ marginTop: 4 }}>
                                  <span className="detail-label">Request Submitted &amp; SLA:</span>
                                  <span className="detail-val" style={{ color: '#496653' }}>
                                    📅 {item.submissionDate} • ⏱️ <em>{item.slaTime}</em>
                                  </span>
                                </div>
                              </div>

                              {/* Rejection or Approval Memo Info */}
                              {item.status === 'Approved' && item.approvalMemo && (
                                <div className="card-memo-banner approved">
                                  <span>📜 <strong>Approval Clearance Memo:</strong> {item.approvalMemo} (Step 2 Unlocked)</span>
                                </div>
                              )}
                              {item.status === 'Rejected' && item.rejectionReason && (
                                <div className="card-memo-banner rejected">
                                  <span>⚠️ <strong>Reason:</strong> {item.rejectionReason}</span>
                                </div>
                              )}

                              {/* Card Action Buttons */}
                              {isPending && (
                                <div className="card-actions-row">
                                  <button
                                    type="button"
                                    className="btn-action-approve"
                                    style={{ flex: 1 }}
                                    onClick={() => handleApproveRequest(item)}
                                  >
                                    ✓ Approve Trainer
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-action-reject"
                                    onClick={() => handleInitiateReject(item)}
                                  >
                                    ✕ Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* SUB-VIEW 2: TRAINEE APPROVALS */}
              {approvalSubTab === 'trainees' && (
                <div className="admin-approvals-list-container">
                  {(() => {
                    const filteredTrainees = traineeApprovals.filter(item => {
                      const matchSearch = !approvalSearchQuery ||
                        item.name.toLowerCase().includes(approvalSearchQuery.toLowerCase()) ||
                        item.id.toLowerCase().includes(approvalSearchQuery.toLowerCase()) ||
                        item.email.toLowerCase().includes(approvalSearchQuery.toLowerCase()) ||
                        (item.organization && item.organization.toLowerCase().includes(approvalSearchQuery.toLowerCase()))
                      const matchStatus = approvalStatusFilter === 'All' || item.status === approvalStatusFilter
                      return matchSearch && matchStatus
                    })

                    if (filteredTrainees.length === 0) {
                      return (
                        <div className="admin-approvals-empty-state">
                          <div className="empty-icon">📚</div>
                          <h3>No Trainee Requests Found</h3>
                          <p>No learner access requests match your search or filter criteria.</p>
                          <button
                            type="button"
                            className="btn-admin-action secondary"
                            onClick={() => {
                              setApprovalSearchQuery('')
                              setApprovalStatusFilter('All')
                            }}
                          >
                            Reset Filters
                          </button>
                        </div>
                      )
                    }

                    return (
                      <div className="admin-approvals-cards-grid">
                        {filteredTrainees.map((item) => {
                          const isSelected = selectedApprovalIds.includes(item.id)
                          const isPending = item.status === 'Pending'

                          return (
                            <div
                              key={item.id}
                              className={`admin-approval-card ${isSelected ? 'selected' : ''} ${item.status.toLowerCase()}`}
                            >
                              {/* Card Header with Token & Status */}
                              <div className="card-top-row">
                                <div className="card-token-select">
                                  {isPending && (
                                    <input
                                      type="checkbox"
                                      className="app-card-checkbox"
                                      checked={isSelected}
                                      onChange={() => handleToggleSelectId(item.id)}
                                    />
                                  )}
                                  <span className="token-pill">
                                    <code>{item.id}</code>
                                  </span>
                                  <span className="role-pill trainee">Trainee</span>
                                </div>
                                <div className="card-status-badges">
                                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                                    {item.status === 'Pending' && '⏳ Waiting for Approval'}
                                    {item.status === 'Approved' && '✅ Approved'}
                                    {item.status === 'Rejected' && '❌ Rejected'}
                                  </span>
                                </div>
                              </div>

                              {/* Trainee Profile Main Info */}
                              <div className="card-body-meta">
                                <div className="user-avatar-lead trainee">
                                  {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div className="user-info-col">
                                  <h4 className="user-name">{item.name}</h4>
                                  <div className="user-designation" style={{ color: '#496653' }}>
                                    ✉️ {item.email}
                                  </div>
                                </div>
                              </div>

                              {/* Step 1 Collected Details: Organization & SLA */}
                              <div className="card-details-grid" style={{ gridTemplateColumns: '1fr' }}>
                                <div className="detail-item">
                                  <span className="detail-label">Organization / Affiliation:</span>
                                  <span className="detail-val" style={{ fontSize: 13, color: '#11281A', fontWeight: 700 }}>
                                    🏛️ {item.organization}
                                  </span>
                                </div>
                                <div className="detail-item" style={{ marginTop: 4 }}>
                                  <span className="detail-label">Request Submitted &amp; SLA:</span>
                                  <span className="detail-val" style={{ color: '#496653' }}>
                                    📅 {item.submissionDate} • ⏱️ <em>{item.slaTime}</em>
                                  </span>
                                </div>
                              </div>

                              {/* Rejection or Approval Memo Info */}
                              {item.status === 'Approved' && item.approvalMemo && (
                                <div className="card-memo-banner approved">
                                  <span>📜 <strong>Approval Clearance Memo:</strong> {item.approvalMemo} (Step 2 Unlocked)</span>
                                </div>
                              )}
                              {item.status === 'Rejected' && item.rejectionReason && (
                                <div className="card-memo-banner rejected">
                                  <span>⚠️ <strong>Reason:</strong> {item.rejectionReason}</span>
                                </div>
                              )}

                              {/* Card Action Buttons */}
                              {isPending && (
                                <div className="card-actions-row">
                                  <button
                                    type="button"
                                    className="btn-action-approve"
                                    style={{ flex: 1 }}
                                    onClick={() => handleApproveRequest(item)}
                                  >
                                    ✓ Approve Trainee
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-action-reject"
                                    onClick={() => handleInitiateReject(item)}
                                  >
                                    ✕ Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* SUB-VIEW 3: DECISION AUDIT LOG */}
              {approvalSubTab === 'audit' && (
                <div className="admin-approvals-audit-container">
                  <div className="audit-header-actions">
                    <div className="audit-info">
                      <h3>MoES Platform Registration Approvals Audit Ledger</h3>
                      <p>Record of all candidate approval and rejection decisions from Step 1 requests.</p>
                    </div>
                    <button
                      type="button"
                      className="btn-admin-action secondary"
                      onClick={() => {
                        let csv = `Token ID,Candidate Name,Email,Role,Organization / Affiliation,Decision,Official Memo / Order,Reason / Notes,Submission Date\n`
                        const logs = [
                          ...trainerApprovals.filter(t => t.status !== 'Pending').map(t => ({ ...t, role: 'Trainer' })),
                          ...traineeApprovals.filter(t => t.status !== 'Pending').map(t => ({ ...t, role: 'Trainee' }))
                        ]
                        logs.forEach(l => {
                          csv += `"${l.id}","${l.name}","${l.email}","${l.role}","${l.organization}","${l.status}","${l.approvalMemo || 'N/A'}","${l.rejectionReason || 'Access Granted'}","${l.submissionDate}"\n`
                        })
                        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', `registration_approvals_audit_${Date.now()}.csv`)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        setActionSuccessMsg('Downloaded Registration Approvals Audit Log (CSV)')
                        setTimeout(() => setActionSuccessMsg(''), 4000)
                      }}
                    >
                      📥 Export Audit Log (CSV)
                    </button>
                  </div>

                  <div className="admin-approvals-table-wrap">
                    <table className="admin-approvals-table">
                      <thead>
                        <tr>
                          <th>Token ID</th>
                          <th>Applicant Name &amp; Email</th>
                          <th>Role</th>
                          <th>Organization / Affiliation</th>
                          <th>Decision</th>
                          <th>Official Memo / Order</th>
                          <th>Notes / Reason</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ...trainerApprovals.filter(t => t.status !== 'Pending').map(t => ({ ...t, role: 'Trainer' })),
                          ...traineeApprovals.filter(t => t.status !== 'Pending').map(t => ({ ...t, role: 'Trainee' }))
                        ].map((row) => (
                          <tr key={row.id}>
                            <td>
                              <span className="token-pill"><code>{row.id}</code></span>
                            </td>
                            <td>
                              <strong>{row.name}</strong>
                              <div style={{ fontSize: 11, color: '#688273' }}>{row.email}</div>
                            </td>
                            <td>
                              <span className={`role-pill ${row.role.toLowerCase()}`}>{row.role}</span>
                            </td>
                            <td style={{ fontSize: 12.5 }}>{row.organization}</td>
                            <td>
                              <span className={`status-pill ${row.status.toLowerCase()}`}>
                                {row.status === 'Approved' ? '✅ Approved' : '❌ Rejected'}
                              </span>
                            </td>
                            <td>
                              <code style={{ fontSize: 11, color: '#1B4332', fontWeight: 600 }}>
                                {row.approvalMemo || 'REJ-NOTICE'}
                              </code>
                            </td>
                            <td style={{ fontSize: 12, color: '#496653', maxWidth: 240 }}>
                              {row.rejectionReason || 'Cleared for Account Creation'}
                            </td>
                            <td style={{ fontSize: 11.5, color: '#688273' }}>
                              {row.submissionDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="admin-card-panel">
              <div className="admin-panel-head">
                <div className="admin-panel-title-wrap">
                  <h2 className="admin-panel-title">Institutional Governance &amp; Security Settings</h2>
                  <p className="admin-panel-subtitle">Access control, identity providers, and MoES integration endpoints.</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 10 }}>
                <div style={{ padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#FFFFFF' }}>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16, color: '#12281B' }}>Institutional Identity</h3>
                  <div className="admin-form-group" style={{ marginBottom: 12 }}>
                    <label>Institution Legal Entity</label>
                    <input type="text" readOnly defaultValue="India Meteorological Department (MoES, Govt. of India)" />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 12 }}>
                    <label>SSO / SAML Identity Provider</label>
                    <input type="text" readOnly defaultValue="National Informatics Centre (NIC) SSO Enabled" />
                  </div>
                  <div className="admin-form-group">
                    <label>Administrative Contact</label>
                    <input type="email" readOnly defaultValue="admin.directorate@imd.gov.in" />
                  </div>
                </div>

                <div style={{ padding: 20, border: '1.5px solid #DCE6DF', borderRadius: 16, background: '#FFFFFF' }}>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16, color: '#12281B' }}>Platform Infrastructure Status</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: '#ECFDF5', color: '#047857', fontWeight: 600, fontSize: 13 }}>
                      <span>● High Performance Cluster</span>
                      <span>Operational</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: '#ECFDF5', color: '#047857', fontWeight: 600, fontSize: 13 }}>
                      <span>● AI Match Recommendation Engine</span>
                      <span>Active</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: '#ECFDF5', color: '#047857', fontWeight: 600, fontSize: 13 }}>
                      <span>● Competency Audit Service</span>
                      <span>Synchronized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==========================================================================
          MODALS & SPOTLIGHT SUITE
          ========================================================================== */}
      {/* COMMAND PALETTE (CTRL + K) SPOTLIGHT MODAL */}
      {commandPaletteOpen && (
        <div className="admin-modal-backdrop" onClick={() => setCommandPaletteOpen(false)}>
          <div className="admin-spotlight-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-spotlight-input-wrap">
              <span className="admin-spotlight-search-icon">🔍</span>
              <input
                type="text"
                autoFocus
                placeholder="Jump to tab, search trainees, faculty, courses, or actions..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="admin-spotlight-input"
              />
              <kbd className="admin-spotlight-esc" onClick={() => setCommandPaletteOpen(false)}>ESC</kbd>
            </div>

            <div className="admin-spotlight-results">
              {/* Quick Navigation Targets */}
              <div className="admin-spotlight-group">
                <span className="admin-spotlight-group-title">Navigation Tabs</span>
                {[
                  { id: 'Dashboard', icon: '📊', name: 'Dashboard Overview' },
                  { id: 'Approvals', icon: '🛡️', name: 'Registration & Access Approvals (Trainers & Trainees)' },
                  { id: 'Analytics', icon: '📈', name: 'Institutional Analytics' },
                  { id: 'User Management', icon: '👥', name: 'User Management (Create Trainee / Trainer)' },
                  { id: 'Courses', icon: '📚', name: 'Courses Catalog' },
                  { id: 'Assessments', icon: '📋', name: 'Assessments & Exams' },
                  { id: 'Trainees', icon: '🎓', name: 'Trainees Directory' },
                  { id: 'Trainers', icon: '👨‍🏫', name: 'Faculty & Trainers Directory' },
                  { id: 'Competencies', icon: '🎯', name: 'Competencies Framework & Radar' },
                  { id: 'Trainer Matching', icon: '🤖', name: 'AI Trainer Matching Engine' },
                  { id: 'Deactivate / Suspend User', icon: '⚠️', name: 'Deactivate / Suspend User Access' },
                  { id: 'Reports', icon: '📑', name: 'Audit Reports & Funnel' }
                ]
                  .filter(tab => !commandSearch || tab.name.toLowerCase().includes(commandSearch.toLowerCase()) || tab.id.toLowerCase().includes(commandSearch.toLowerCase()))
                  .map(tab => (
                    <div
                      key={tab.id}
                      className="admin-spotlight-item"
                      onClick={() => {
                        setActiveTab(tab.id)
                        setCommandPaletteOpen(false)
                        setCommandSearch('')
                      }}
                    >
                      <span className="admin-spotlight-item-icon">{tab.icon}</span>
                      <span className="admin-spotlight-item-name">{tab.name}</span>
                      <span className="admin-spotlight-item-badge">Jump &rarr;</span>
                    </div>
                  ))}
              </div>

              {/* Quick Actions */}
              <div className="admin-spotlight-group">
                <span className="admin-spotlight-group-title">Quick Administrative Actions</span>
                <div
                  className="admin-spotlight-item"
                  onClick={() => {
                    setCommandPaletteOpen(false)
                    setActiveTab('Approvals')
                  }}
                >
                  <span className="admin-spotlight-item-icon">🛡️</span>
                  <span className="admin-spotlight-item-name">Review Registration Approvals ({totalPendingCount} Pending)</span>
                  <span className="admin-spotlight-item-badge">Action</span>
                </div>
                <div
                  className="admin-spotlight-item"
                  onClick={() => {
                    setCommandPaletteOpen(false)
                    setActiveTab('User Management')
                    startCreateTrainee()
                  }}
                >
                  <span className="admin-spotlight-item-icon">➕</span>
                  <span className="admin-spotlight-item-name">Create Authorized Trainee Profile</span>
                  <span className="admin-spotlight-item-badge">Action</span>
                </div>
                <div
                  className="admin-spotlight-item"
                  onClick={() => {
                    setCommandPaletteOpen(false)
                    setActiveTab('User Management')
                    startCreateTrainer()
                  }}
                >
                  <span className="admin-spotlight-item-icon">👨‍🏫</span>
                  <span className="admin-spotlight-item-name">Create Authorized Trainer / Faculty Profile</span>
                  <span className="admin-spotlight-item-badge">Action</span>
                </div>
                <div
                  className="admin-spotlight-item"
                  onClick={() => {
                    setCommandPaletteOpen(false)
                    setActiveModal('createNotice')
                  }}
                >
                  <span className="admin-spotlight-item-icon">📢</span>
                  <span className="admin-spotlight-item-name">Broadcast Platform Notice to MoES Network</span>
                  <span className="admin-spotlight-item-badge">Action</span>
                </div>
                <div
                  className="admin-spotlight-item"
                  onClick={() => {
                    setCommandPaletteOpen(false)
                    setReportModalOpen(true)
                  }}
                >
                  <span className="admin-spotlight-item-icon">📑</span>
                  <span className="admin-spotlight-item-name">Generate Executive Directorate Report</span>
                  <span className="admin-spotlight-item-badge">Action</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REGIONAL TRAINING NODE INSPECTOR MODAL */}
      {selectedNode && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedNode(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setSelectedNode(null)}>✕</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>📍</span>
              <div>
                <h2 className="admin-modal-title" style={{ margin: 0 }}>{selectedNode.name}</h2>
                <small style={{ color: '#557060' }}>{selectedNode.city}</small>
              </div>
            </div>

            <div style={{ background: '#F4F8F5', border: '1px solid #D2E2D6', borderRadius: 12, padding: 14, margin: '14px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center' }}>
                <div>
                  <small style={{ color: '#688273' }}>Capacity Load</small>
                  <strong style={{ display: 'block', fontSize: 16, color: '#12281B' }}>{selectedNode.enrolled} / {selectedNode.capacity}</strong>
                </div>
                <div>
                  <small style={{ color: '#688273' }}>Pass Rate</small>
                  <strong style={{ display: 'block', fontSize: 16, color: '#1B4332' }}>{selectedNode.passRate}%</strong>
                </div>
                <div>
                  <small style={{ color: '#688273' }}>Server Uptime</small>
                  <strong style={{ display: 'block', fontSize: 16, color: '#047857' }}>{selectedNode.uptime}</strong>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13, color: '#3A5445', lineHeight: 1.6 }}>
              <strong>Center Directorate Lead:</strong> {selectedNode.lead}<br />
              <strong>Active Training Cohorts:</strong> {selectedNode.activeCohorts} parallel sessions (Radar Meteorology, NWP Modeling, GIS Data Processing).<br />
              <strong>Telemetry Ping:</strong> {selectedNode.latency} latency • Synchronized with MoES National Cloud Node.
            </p>

            <div className="admin-modal-actions-row" style={{ marginTop: 18 }}>
              <button type="button" className="btn-admin-action secondary" onClick={() => setSelectedNode(null)}>Close</button>
              <button
                type="button"
                className="btn-admin-action primary"
                onClick={() => {
                  setSelectedNode(null)
                  setActionSuccessMsg(`Node audit report generated for ${selectedNode.name}!`)
                  setTimeout(() => setActionSuccessMsg(''), 4000)
                }}
              >
                Run Node Integrity Audit &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIRECTORATE EXECUTIVE REPORT MODAL */}
      {reportModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setReportModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setReportModalOpen(false)}>✕</button>
            <div style={{ borderBottom: '2px solid #1B4332', paddingBottom: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: '#2D6A4F', letterSpacing: 1.2, textTransform: 'uppercase' }}>
                MINISTRY OF EARTH SCIENCES • GOVERNMENT OF INDIA
              </div>
              <h2 className="admin-modal-title" style={{ margin: '4px 0 2px' }}>CapacityConnect Institutional Intelligence Brief</h2>
              <p style={{ margin: 0, fontSize: 12, color: '#688273' }}>
                Executive summary for Q3 2026 Directorate Review • Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, margin: '14px 0' }}>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center', border: '1px solid #DCE6DF' }}>
                <small style={{ color: '#688273' }}>Total Trainees</small>
                <strong style={{ display: 'block', fontSize: 17, color: '#12281B' }}>2,486</strong>
              </div>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center', border: '1px solid #DCE6DF' }}>
                <small style={{ color: '#688273' }}>Accredited Faculty</small>
                <strong style={{ display: 'block', fontSize: 17, color: '#1B4332' }}>148</strong>
              </div>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center', border: '1px solid #DCE6DF' }}>
                <small style={{ color: '#688273' }}>Pass Rate</small>
                <strong style={{ display: 'block', fontSize: 17, color: '#047857' }}>78.4%</strong>
              </div>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center', border: '1px solid #DCE6DF' }}>
                <small style={{ color: '#688273' }}>Competency Index</small>
                <strong style={{ display: 'block', fontSize: 17, color: '#10B981' }}>74.8%</strong>
              </div>
            </div>

            <div style={{ fontSize: 12.5, color: '#314D3C', lineHeight: 1.6, background: '#F4F8F5', padding: 14, borderRadius: 12, border: '1px solid #D5E4D8' }}>
              <strong>Key Directorate Highlights:</strong>
              <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                <li>Top performing node: <strong>IMD Pune Training Node</strong> with 94% certification rate.</li>
                <li>Radar Meteorology &amp; Python HPC reached milestone completion thresholds (&gt;80%).</li>
                <li>Targeted remedial clinics initiated for 149 trainees in Machine Learning &amp; Satellite Remote Sensing.</li>
              </ul>
            </div>

            <div className="admin-modal-actions-row" style={{ marginTop: 18 }}>
              <button type="button" className="btn-admin-action secondary" onClick={() => setReportModalOpen(false)}>Close</button>
              <button
                type="button"
                className="btn-admin-action primary"
                onClick={() => {
                  setReportModalOpen(false)
                  setActionSuccessMsg('Official Directorate PDF Report generated & ready for download!')
                  setTimeout(() => setActionSuccessMsg(''), 4000)
                }}
              >
                📥 Download Official PDF Brief
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal: Assign Trainer */}
      {activeModal === 'assignTrainer' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Confirm Trainer Allocation</h2>
            <p className="admin-modal-subtitle">Assign Dr. Rahul Sharma to Weather Data Analysis &amp; Forecasting cohort.</p>
            <div style={{ padding: 14, borderRadius: 12, background: '#F4F8F5', border: '1px solid #D5E4D8', marginBottom: 16 }}>
              <strong>AI Match Score: 92%</strong>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#4F6B58' }}>
                Course matches 8+ years domain experience and highest student satisfaction metrics.
              </p>
            </div>
            <div className="admin-modal-actions-row">
              <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
              <button
                type="button"
                className="btn-admin-action primary"
                onClick={() => {
                  setActiveModal(null)
                  setActionSuccessMsg('Dr. Rahul Sharma successfully assigned to cohort!')
                  setTimeout(() => setActionSuccessMsg(''), 4000)
                }}
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Gap */}
      {activeModal?.type === 'gap' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">{activeModal.data.name}</h2>
            <p className="admin-modal-subtitle">Institutional competency gap analysis &amp; action proposal.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <small style={{ color: '#688273' }}>Current</small>
                <strong style={{ display: 'block', fontSize: 16, color: '#12281B' }}>{activeModal.data.current}</strong>
              </div>
              <div style={{ background: '#F8FAF8', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <small style={{ color: '#688273' }}>Target</small>
                <strong style={{ display: 'block', fontSize: 16, color: '#1B4332' }}>{activeModal.data.target}</strong>
              </div>
              <div style={{ background: '#FEF2F2', padding: 10, borderRadius: 10, textAlign: 'center' }}>
                <small style={{ color: '#991B1B' }}>Gap</small>
                <strong style={{ display: 'block', fontSize: 16, color: '#DC2626' }}>{activeModal.data.gap}</strong>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#456150', lineHeight: 1.5, marginBottom: 16 }}>
              {activeModal.data.trainees} trainees are currently performing below the benchmark 75% accuracy threshold. Recommending a 2-week supplementary intensive workshop.
            </p>
            <div className="admin-modal-actions-row">
              <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Close</button>
              <button
                type="button"
                className="btn-admin-action primary"
                onClick={() => {
                  setActiveModal(null)
                  setActionSuccessMsg(`Supplemental capacity workshop scheduled for ${activeModal.data.name}!`)
                  setTimeout(() => setActionSuccessMsg(''), 4000)
                }}
              >
                Schedule Workshop &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Notice */}
      {activeModal === 'createNotice' && (
        <div className="admin-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="admin-modal-close-btn" onClick={() => setActiveModal(null)}>✕</button>
            <h2 className="admin-modal-title">Create Platform Broadcast</h2>
            <p className="admin-modal-subtitle">Broadcast message to all 148 faculty and 2,486 registered trainees.</p>
            <div className="admin-modal-form">
              <div className="admin-form-group">
                <label>Notice Subject</label>
                <input type="text" placeholder="e.g. HPC Maintenance Window Notification" />
              </div>
              <div className="admin-form-group">
                <label>Message Content</label>
                <textarea rows={3} placeholder="Enter broadcast message text..." />
              </div>
              <div className="admin-modal-actions-row">
                <button type="button" className="btn-admin-action secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button
                  type="button"
                  className="btn-admin-action primary"
                  onClick={() => {
                    setActiveModal(null)
                    setActionSuccessMsg('Institutional notice broadcast successfully!')
                    setTimeout(() => setActionSuccessMsg(''), 4000)
                  }}
                >
                  Send Broadcast
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM PERSONNEL ACCESS SUSPENSION (Centered Viewport Modal) */}
      {suspensionModalUser && (
        <div className="admin-modal-backdrop" onClick={() => setSuspensionModalUser(null)}>
          <div className="admin-deact-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="admin-deact-modal-header">
              <div className="modal-icon-warn">⚠️</div>
              <div>
                <h3 className="admin-deact-modal-title">Confirm Access Suspension</h3>
                <p className="admin-deact-modal-sub">
                  Revoke active credentials and LMS portal access for this personnel record.
                </p>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setSuspensionModalUser(null)}
              >
                ✕
              </button>
            </div>

            {/* Target User Info Banner */}
            <div className="admin-deact-target-card">
              <div className={`admin-user-avatar ${suspensionModalUser.role.toLowerCase().includes('admin') ? 'trainer' : suspensionModalUser.role.toLowerCase()}`}>
                {suspensionModalUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="target-details">
                <strong>{suspensionModalUser.name}</strong>
                <span>{suspensionModalUser.role} • {suspensionModalUser.dept}</span>
                <small>Staff ID: <code>{suspensionModalUser.id}</code> | Email: {suspensionModalUser.email}</small>
              </div>
            </div>

            {/* Mandatory Reason Selector */}
            <div className="admin-form-group" style={{ marginTop: 18 }}>
              <label>
                Institutional Reason for Suspension <span className="req-star">*</span>
              </label>
              <select
                className="admin-deact-modal-select"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
              >
                <option value="Official Transfer to Another Division / Ministry">
                  Official Transfer to Another Division / Ministry
                </option>
                <option value="Contract / Project Tenure Completed">
                  Contract / Project Tenure Completed
                </option>
                <option value="Disciplinary Review / Administrative Freeze">
                  Disciplinary Review / Administrative Freeze
                </option>
                <option value="Voluntary Resignation / Superannuation">
                  Voluntary Resignation / Superannuation
                </option>
                <option value="Security Policy Non-Compliance">
                  Security Policy Non-Compliance
                </option>
                <option value="Extended Sabbatical / Medical Leave">
                  Extended Sabbatical / Medical Leave
                </option>
              </select>
            </div>

            {/* Grid of Memo No and Effective Date */}
            <div className="admin-create-user-grid-2col" style={{ marginTop: 12 }}>
              <div className="admin-form-group">
                <label>Official Memo / Order Number <span className="req-star">*</span></label>
                <input
                  type="text"
                  className="admin-deact-modal-input"
                  value={suspensionMemoNumber}
                  onChange={(e) => setSuspensionMemoNumber(e.target.value)}
                  placeholder="e.g. MoES/ORD/2026/891"
                />
              </div>
              <div className="admin-form-group">
                <label>Effective Date</label>
                <input
                  type="date"
                  className="admin-deact-modal-input"
                  value={suspensionEffectiveDate}
                  onChange={(e) => setSuspensionEffectiveDate(e.target.value)}
                />
              </div>
            </div>

            {/* Optional Comments */}
            <div className="admin-form-group" style={{ marginTop: 12 }}>
              <label>Additional Notes / Administrative Comments</label>
              <textarea
                rows={2}
                className="admin-deact-modal-textarea"
                placeholder="Enter any specific directives or handover remarks..."
                value={suspensionComments}
                onChange={(e) => setSuspensionComments(e.target.value)}
              />
            </div>

            {/* Retention Guarantee Notice */}
            <div className="admin-deact-modal-guarantee">
              <span className="guarantee-icon">🛡️</span>
              <div className="guarantee-text">
                <strong>Data Integrity Guarantee:</strong>
                <span>
                  Historical grades, certified badges, course completions, and assessment records remain 100% intact and exportable in future national capacity reports.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="admin-deact-modal-actions">
              <button
                type="button"
                className="btn-admin-action secondary"
                onClick={() => setSuspensionModalUser(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-deact-confirm-suspend"
                onClick={handleConfirmSuspend}
              >
                Confirm Access Suspension ⚠️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL (FOR STEP 1 REQUESTS) */}
      {rejectingApprovalItem && (
        <div className="admin-modal-backdrop" onClick={() => setRejectingApprovalItem(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <button
              type="button"
              className="admin-modal-close-btn"
              onClick={() => setRejectingApprovalItem(null)}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 26 }}>⚠️</span>
              <div>
                <h2 className="admin-modal-title" style={{ margin: 0, color: '#DC2626' }}>
                  Reject Step 1 Access Request
                </h2>
                <small style={{ color: '#688273' }}>
                  Token: <code>{rejectingApprovalItem.id}</code>
                </small>
              </div>
            </div>

            {/* Target applicant banner */}
            <div className="admin-deact-target-card" style={{ borderLeftColor: '#DC2626' }}>
              <div className={`admin-user-avatar ${rejectingApprovalItem.role.toLowerCase()}`}>
                {rejectingApprovalItem.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="target-details">
                <strong>{rejectingApprovalItem.name}</strong>
                <span>{rejectingApprovalItem.role} • 🏛️ {rejectingApprovalItem.organization}</span>
                <small>Email: {rejectingApprovalItem.email}</small>
              </div>
            </div>

            {/* Preset Reason Selector */}
            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <label>Reason for Rejection <span className="req-star">*</span></label>
              <select
                className="admin-deact-modal-select"
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
              >
                <option value="Non-institutional email domain. Please use your official organization email.">
                  Non-institutional email domain (e.g. personal email used)
                </option>
                <option value="Unverified institutional affiliation. Please submit with official departmental email.">
                  Unverified institutional affiliation or organization mismatch
                </option>
                <option value="Access quota full for the requested training center cohort.">
                  Access quota full for requested training center cohort
                </option>
                <option value="Duplicate registration token or existing account already active.">
                  Duplicate registration token or existing account already active
                </option>
                <option value="Other administrative discrepancy.">
                  Other administrative discrepancy
                </option>
              </select>
            </div>

            {/* Custom Notes */}
            <div className="admin-form-group" style={{ marginTop: 12 }}>
              <label>Rejection Directive / Advisory Note for User</label>
              <textarea
                rows={3}
                className="admin-deact-modal-textarea"
                placeholder="Enter specific notes or contact directives for the applicant..."
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
              />
            </div>

            {/* Escalation Advisory Notice */}
            <div className="admin-deact-modal-guarantee" style={{ background: '#FEF2F2', borderColor: '#FECACA' }}>
              <span className="guarantee-icon">ℹ️</span>
              <div className="guarantee-text" style={{ color: '#991B1B' }}>
                <strong>User Rejection Page:</strong>
                <span>
                  The applicant will see the official "Request Rejected" screen with instructions to contact the administrator, department head, or HR.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="admin-deact-modal-actions" style={{ marginTop: 18 }}>
              <button
                type="button"
                className="btn-admin-action secondary"
                onClick={() => setRejectingApprovalItem(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-action-reject"
                style={{ padding: '10px 20px', fontWeight: 700 }}
                onClick={handleConfirmReject}
              >
                Confirm Rejection ❌
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
