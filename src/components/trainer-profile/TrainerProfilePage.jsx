import React, { useState, useEffect } from 'react';
import './TrainerProfile.css';

// Subcomponents
import TrainerHero from './TrainerHero';
import ProfileStats from './ProfileStats';
import MatchBanner from './MatchBanner';
import AboutSection from './AboutSection';
import CoreCompetencies from './CoreCompetencies';
import CompetencyMatchDetail from './CompetencyMatchDetail';
import ExperienceTimeline from './ExperienceTimeline';
import CoursesTaught from './CoursesTaught';
import TrainingPerformance from './TrainingPerformance';
import TrainingApproach from './TrainingApproach';
import TraineeFeedback from './TraineeFeedback';
import AvailabilitySection from './AvailabilitySection';
import RelatedTrainers from './RelatedTrainers';
import TrainerModals from './TrainerModals';
import ToastNotification from './ToastNotification';

// Mock Data
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
} from './trainerProfileData';

// Icons
import {
  ArrowLeft,
  ChevronRight,
  Shield,
  User,
  Sparkles,
  Layers,
  BookOpen,
  Calendar,
  Share2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function TrainerProfilePage({ onBack, defaultRole = 'trainee' }) {
  // Main State
  const [isAdminView, setIsAdminView] = useState(defaultRole === 'admin');
  const [trainer, setTrainer] = useState(initialTrainerData);
  const [stats, setStats] = useState(trainerStats);
  const [matchData, setMatchData] = useState(competencyMatchData);
  const [competencies, setCompetencies] = useState(competenciesList);
  const [experiences, setExperiences] = useState(experienceList);
  const [courses, setCourses] = useState(coursesList);
  const [performance, setPerformance] = useState(performanceMetrics);
  const [reviews, setReviews] = useState(traineeReviews);
  const [similarTrainers, setSimilarTrainers] = useState(similarTrainersList);

  // Modal & Toast State
  const [activeModal, setActiveModal] = useState(null); // 'contact', 'request', 'match-details', 'assign-course', 'edit-profile', 'all-competencies', 'course-details', 'all-feedback'
  const [modalData, setModalData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('Trainer profile link copied to clipboard!');
    } else {
      triggerToast('Trainer profile link: ' + window.location.href);
    }
  };

  const handleAdminAction = (actionName) => {
    if (actionName === 'Assign Course') {
      setActiveModal('assign-course');
    } else if (actionName === 'Edit Profile') {
      setActiveModal('edit-profile');
    } else if (actionName === 'View Analytics') {
      // Scroll to performance section
      const el = document.getElementById('section-performance');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      triggerToast('Navigated to Performance & Training Analytics');
    } else if (actionName === 'Deactivate Trainer') {
      triggerToast('Trainer status toggled (Frontend demo only)');
    }
  };

  const handleSelectSimilarTrainer = (selectedTrainer) => {
    triggerToast(`Viewing profile of ${selectedTrainer.name}`);
    // Smoothly scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCourseDetails = (course) => {
    setModalData(course);
    setActiveModal('course-details');
  };

  const handleUpdateTrainer = (updatedData) => {
    setTrainer((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  return (
    <div className="trainer-profile-page-wrapper">
      {/* 1. Sticky Navigation & Breadcrumb Topbar */}
      <header className="profile-topbar">
        <div className="profile-container topbar-content">
          <div className="breadcrumb-group">
            <button
              className="back-link-btn"
              onClick={onBack || (() => { window.location.hash = ''; window.location.reload(); })}
              aria-label="Back to Trainers Directory"
            >
              <ArrowLeft size={16} />
              <span>Back to Trainers</span>
            </button>

            <nav className="breadcrumb-trail" aria-label="Breadcrumb">
              <a href="#top" onClick={(e) => { e.preventDefault(); if (onBack) onBack(); }}>Home</a>
              <ChevronRight size={14} />
              <a href="#trainers" onClick={(e) => { e.preventDefault(); if (onBack) onBack(); }}>Trainers Directory</a>
              <ChevronRight size={14} />
              <span className="current-crumb">Trainer Profile ({trainer.name})</span>
            </nav>
          </div>

          {/* Interactive Role Switcher for Evaluation */}
          <div className="role-perspective-switch">
            <button
              className={`role-switch-btn ${!isAdminView ? 'active' : ''}`}
              onClick={() => {
                setIsAdminView(false);
                triggerToast('Switched to Trainee Perspective View');
              }}
              title="View as a trainee / general learner"
            >
              <User size={13} />
              <span>Trainee View</span>
            </button>

            <button
              className={`role-switch-btn ${isAdminView ? 'active' : ''}`}
              onClick={() => {
                setIsAdminView(true);
                triggerToast('Switched to Administrator Control View');
              }}
              title="View with institutional administrator controls"
            >
              <Shield size={13} />
              <span>Admin View</span>
            </button>
          </div>
        </div>
      </header>

      <main className="profile-container">
        {/* 2. Trainer Hero Card */}
        <TrainerHero
          trainer={trainer}
          isAdminView={isAdminView}
          onContactClick={() => setActiveModal('contact')}
          onRequestClick={() => setActiveModal('request')}
          onViewCoursesClick={() => {
            const el = document.getElementById('section-courses');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onAdminAction={handleAdminAction}
          onShareClick={handleShareClick}
          onToast={triggerToast}
        />

        {/* 3. Key Profile Stats */}
        <ProfileStats stats={stats} />

        {/* 4. Top Recommended / Match Banner */}
        <MatchBanner
          matchData={matchData}
          onViewMatchDetails={() => setActiveModal('match-details')}
        />

        {/* 5. About the Trainer */}
        <AboutSection aboutData={aboutData} />

        {/* 6. Core Competencies */}
        <CoreCompetencies
          competencies={competencies}
          onViewAllModal={() => setActiveModal('all-competencies')}
        />

        {/* 7. Competency Match Detail (Why this trainer matches) */}
        <CompetencyMatchDetail
          matchData={matchData}
          onOpenMatchModal={() => setActiveModal('match-details')}
        />

        {/* 8. Professional Experience Timeline */}
        <ExperienceTimeline experiences={experiences} />

        {/* 9. Courses Taught */}
        <CoursesTaught
          courses={courses}
          onViewCourseModal={handleViewCourseDetails}
        />

        {/* 10. Training Performance Analytics */}
        <TrainingPerformance performanceData={performance} />

        {/* 11. Training Approach */}
        <TrainingApproach />

        {/* 12. Trainee Feedback */}
        <TraineeFeedback
          reviews={reviews}
          onOpenAllFeedbackModal={() => setActiveModal('all-feedback')}
        />

        {/* 13. Training Availability */}
        <AvailabilitySection
          onRequestTrainingModal={() => setActiveModal('request')}
        />

        {/* 14. Related / Similar Trainers */}
        <RelatedTrainers
          similarTrainers={similarTrainers}
          onSelectTrainer={handleSelectSimilarTrainer}
        />
      </main>

      {/* Floating Interactive Toast */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

      {/* Interactive Frontend Modals */}
      <TrainerModals
        activeModal={activeModal}
        modalData={modalData}
        onClose={() => setActiveModal(null)}
        onToast={triggerToast}
        trainer={trainer}
        matchData={matchData}
        competencies={competencies}
        courses={courses}
        reviews={reviews}
        onUpdateTrainer={handleUpdateTrainer}
      />
    </div>
  );
}
