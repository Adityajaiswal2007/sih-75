import { useEffect, useState } from 'react'
import './App.css'
import api from './services/api'
import LoginPage from './components/login/LoginPage'
import LandingPage from './components/landing/LandingPage'
import TrainerProfilePage from './components/trainer-profile/TrainerProfilePage'
import TraineePortal from './components/trainee/TraineePortal'
import AdminDashboard from './components/admin/AdminDashboard'
import TrainerDashboard from './components/trainer-portal/TrainerDashboard'

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
  const [activeTrainer, setActiveTrainer] = useState(null)

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
      } else if (hash === '#trainer') {
        setDashboardRole('trainer')
      } else if (hash === '#admin') {
        setDashboardRole('admin')
      } else if (hash === '#trainee') {
        setDashboardRole('trainee')
      }
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (currentHash === '#admin') return <AdminDashboard onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }} />
  if (currentHash === '#trainer') return <TrainerDashboard onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }} />
  if (currentHash === '#trainer-profile') return (
    <TrainerProfilePage
      onBack={() => {
        const dest = dashboardRole || 'trainee'
        window.location.hash = `#${dest}`
        setCurrentHash(`#${dest}`)
      }}
      defaultRole={dashboardRole || 'trainee'}
      trainerData={activeTrainer}
    />
  )
  if (currentHash === '#trainee') return (
    <TraineeDashboard
      onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }}
      onOpenTrainerProfile={(trainer) => {
        setActiveTrainer(trainer)
        window.location.hash = '#trainer-profile'
        setCurrentHash('#trainer-profile')
      }}
    />
  )

  if (dashboardRole === 'trainer') return <TrainerDashboard onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }} />
  if (dashboardRole === 'trainee') return (
    <TraineeDashboard
      onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }}
      onOpenTrainerProfile={(trainer) => {
        setActiveTrainer(trainer)
        window.location.hash = '#trainer-profile'
        setCurrentHash('#trainer-profile')
      }}
    />
  )
  if (dashboardRole === 'admin') return <AdminDashboard onBack={() => { window.location.hash = ''; setDashboardRole(null); setCurrentHash('') }} />
  if (showLogin) return (
    <LoginPage
      onBack={() => { window.location.hash = ''; setShowLogin(false); setCurrentHash('') }}
      onDashboard={(role = 'trainee') => {
        setShowLogin(false)
        setDashboardRole(role)
        window.location.hash = `#${role}`
        setCurrentHash(`#${role}`)
      }}
      initialRole={loginRole}
      initialView={loginView}
    />
  )

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

function TraineeDashboard({ onBack, onOpenTrainerProfile }) {
  return (
    <TraineePortal
      onBack={onBack}
      onOpenTrainerProfile={onOpenTrainerProfile}
    />
  )
}

export default App

