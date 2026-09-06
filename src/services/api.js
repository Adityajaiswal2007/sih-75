/**
 * CapacityConnect API Service Layer
 * Connects frontend UI with backend REST API services.
 * Features automatic fallback to local data if backend is offline.
 */

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
} from '../components/trainer-portal/trainerPortalData'

import {
  initialTrainerData,
  trainerStats,
  competencyMatchData,
  aboutData,
  competenciesList,
  experienceList,
  coursesList,
  performanceMetrics,
  traineeReviews,
  similarTrainersList
} from '../components/trainer-profile/trainerProfileData'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

class ApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.token = localStorage.getItem('cc_auth_token') || null
  }

  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('cc_auth_token', token)
    } else {
      localStorage.removeItem('cc_auth_token')
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    }

    try {
      const response = await fetch(url, config)
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.warn(`[CC-API] Network request to ${url} failed. Using offline fallback mode.`, error.message)
      throw error
    }
  }

  // Health check
  async checkHealth() {
    try {
      const data = await this.request('/health', { method: 'GET' })
      return { connected: true, data }
    } catch {
      return { connected: false, message: 'Backend is offline. Using local data.' }
    }
  }

  // Helper to read local registered accounts
  getRegisteredUsers() {
    try {
      const data = localStorage.getItem('cc_registered_users')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  saveRegisteredUser(user) {
    try {
      const users = this.getRegisteredUsers()
      const existingIdx = users.findIndex(u => u.email?.toLowerCase() === user.email?.toLowerCase())
      if (existingIdx >= 0) {
        users[existingIdx] = { ...users[existingIdx], ...user }
      } else {
        users.push(user)
      }
      localStorage.setItem('cc_registered_users', JSON.stringify(users))
    } catch (err) {
      console.warn('Failed to persist user in localStorage', err)
    }
  }

  // Auth Endpoints
  async login(credentials) {
    try {
      const data = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
      if (data.token) this.setToken(data.token)
      return { success: true, user: data.user || credentials }
    } catch {
      // Automatic Role Determination Fallback
      const normalizedEmail = (credentials.email || '').toLowerCase().trim()
      const registeredUsers = this.getRegisteredUsers()
      const existingUser = registeredUsers.find(u => u.email?.toLowerCase() === normalizedEmail)

      let resolvedRole = 'trainee'
      let resolvedName = normalizedEmail.split('@')[0] || 'User'

      if (credentials.role) {
        resolvedRole = credentials.role
      } else if (existingUser && existingUser.role) {
        resolvedRole = existingUser.role
        resolvedName = `${existingUser.firstName || ''} ${existingUser.lastName || ''}`.trim() || resolvedName
      } else if (normalizedEmail.includes('admin')) {
        resolvedRole = 'admin'
        resolvedName = 'Institutional Admin'
      } else if (
        normalizedEmail.includes('priya') ||
        normalizedEmail.includes('nair') ||
        normalizedEmail.includes('trainer') ||
        normalizedEmail.includes('faculty') ||
        normalizedEmail.includes('dr.rahul')
      ) {
        resolvedRole = 'trainer'
        resolvedName = 'Dr. Priya Nair'
      } else if (
        normalizedEmail.includes('ananya') ||
        normalizedEmail.includes('trainee') ||
        normalizedEmail.includes('rahul.sharma')
      ) {
        resolvedRole = 'trainee'
        resolvedName = 'Ananya Verma'
      }

      const user = {
        name: resolvedName,
        email: credentials.email,
        role: resolvedRole,
      }

      // Generate a session token
      const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      this.setToken(mockToken)

      return { success: true, user, isFallback: true }
    }
  }

  async register(userData) {
    try {
      const data = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
      if (data.token) this.setToken(data.token)
      this.saveRegisteredUser(userData)
      return { success: true, user: data.user || userData }
    } catch {
      this.saveRegisteredUser(userData)
      const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      this.setToken(mockToken)
      return { success: true, user: userData, isFallback: true }
    }
  }

  logout() {
    this.setToken(null)
    return { success: true }
  }

  // Courses
  async getCourses() {
    try {
      return await this.request('/courses')
    } catch {
      return initialCourses
    }
  }

  async createCourse(courseData) {
    try {
      return await this.request('/courses', {
        method: 'POST',
        body: JSON.stringify(courseData),
      })
    } catch {
      const newCourse = {
        id: `c_${Date.now()}`,
        title: courseData.title,
        category: courseData.category || 'Meteorology',
        level: courseData.level || 'Beginner',
        status: courseData.status || 'Published',
        traineesCount: 0,
        modulesCount: Number(courseData.modules) || 1,
        completionRate: 0,
        ...courseData,
      }
      return newCourse
    }
  }

  // Trainees
  async getTrainees() {
    try {
      return await this.request('/trainees')
    } catch {
      return initialTrainees
    }
  }

  // Assessments
  async getAssessments() {
    try {
      return await this.request('/assessments')
    } catch {
      return initialAssessments
    }
  }

  async createAssessment(assessmentData) {
    try {
      return await this.request('/assessments', {
        method: 'POST',
        body: JSON.stringify(assessmentData),
      })
    } catch {
      const newAssessment = {
        id: `asm_${Date.now()}`,
        title: assessmentData.title,
        course: assessmentData.course || 'Weather Data Analysis',
        type: assessmentData.type || 'Quiz',
        questionsCount: Number(assessmentData.questions) || 10,
        duration: `${assessmentData.duration || 30} mins`,
        status: 'Published',
        attemptsCount: 0,
        avgScore: 0,
        dueDate: 'Due in 7 days',
        ...assessmentData,
      }
      return newAssessment
    }
  }

  // Competencies
  async getCompetencies() {
    try {
      return await this.request('/competencies')
    } catch {
      return initialCompetencies
    }
  }

  // Content Library
  async getContent() {
    try {
      return await this.request('/content')
    } catch {
      return initialContent
    }
  }

  async createContent(contentData) {
    try {
      return await this.request('/content', {
        method: 'POST',
        body: JSON.stringify(contentData),
      })
    } catch {
      return {
        id: `cnt_${Date.now()}`,
        title: contentData.title,
        type: contentData.type || 'Document',
        course: contentData.course || 'General',
        size: '1.2 MB',
        uploadedAt: 'Just now',
        downloads: 0,
        ...contentData,
      }
    }
  }

  // Announcements
  async getAnnouncements() {
    try {
      return await this.request('/announcements')
    } catch {
      return initialAnnouncements
    }
  }

  async createAnnouncement(announcementData) {
    try {
      return await this.request('/announcements', {
        method: 'POST',
        body: JSON.stringify(announcementData),
      })
    } catch {
      return {
        id: `ann_${Date.now()}`,
        title: announcementData.title,
        message: announcementData.message || announcementData.detail,
        target: announcementData.target || 'All Trainees',
        timestamp: 'Just now',
        status: 'Sent',
        ...announcementData,
      }
    }
  }

  // Feedback
  async getFeedback() {
    try {
      return await this.request('/feedback')
    } catch {
      return initialFeedback
    }
  }

  // Analytics
  async getAnalytics() {
    try {
      return await this.request('/analytics')
    } catch {
      return initialAnalytics
    }
  }

  // FAQs
  async getFaqs() {
    try {
      return await this.request('/faqs')
    } catch {
      return initialFaqs
    }
  }

  // Trainer Profile Data
  async getTrainerProfile(trainerId = 'rs-01') {
    try {
      return await this.request(`/trainers/${trainerId}`)
    } catch {
      return {
        trainer: initialTrainerData,
        stats: trainerStats,
        matchData: competencyMatchData,
        about: aboutData,
        competencies: competenciesList,
        experiences: experienceList,
        courses: coursesList,
        performance: performanceMetrics,
        reviews: traineeReviews,
        similarTrainers: similarTrainersList,
      }
    }
  }
}

export const api = new ApiClient()
export default api
