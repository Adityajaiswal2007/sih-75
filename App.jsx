import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import FeaturesGrid from './components/FeaturesGrid';
import TrainerMatchingSection from './components/TrainerMatchingSection';
import HowItWorks from './components/HowItWorks';
import RoleSection from './components/RoleSection';
import ImpactSection from './components/ImpactSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

import AuthModal from './components/AuthModal';
import TrainerModal from './components/TrainerModal';
import CourseModal from './components/CourseModal';
import DemoSimulatorModal from './components/DemoSimulatorModal';

export default function App() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [trainerModal, setTrainerModal] = useState({ isOpen: false, name: 'Dr. A. Sharma' });
  const [courseModal, setCourseModal] = useState({ isOpen: false, title: 'Advanced Meteorology' });
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleOpenTrainer = (name = 'Dr. A. Sharma') => {
    setTrainerModal({ isOpen: true, name });
  };

  const handleOpenCourse = (title = 'Advanced Meteorology') => {
    setCourseModal({ isOpen: true, title });
  };

  const handleSelectRole = (roleId) => {
    handleOpenAuth('register');
  };

  const handleSelectFeature = (feature) => {
    handleOpenCourse(feature.title);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Navbar 
        onOpenAuth={handleOpenAuth} 
        onOpenDemo={() => setDemoModalOpen(true)} 
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero 
          onOpenAuth={handleOpenAuth}
          onOpenTrainer={handleOpenTrainer}
          onOpenCourse={handleOpenCourse}
          onOpenDemo={() => setDemoModalOpen(true)}
        />

        {/* Government & Institutional Trust Badges */}
        <TrustBanner />

        {/* 6 Features Grid */}
        <FeaturesGrid onSelectFeature={handleSelectFeature} />

        {/* AI Intelligent Trainer Matching Pipeline */}
        <TrainerMatchingSection 
          onOpenTrainer={handleOpenTrainer}
          onOpenDemo={() => setDemoModalOpen(true)}
        />

        {/* 4-Step How It Works Flow */}
        <HowItWorks onOpenAuth={handleOpenAuth} />

        {/* Built for Every Role (Trainees, Trainers, Admins) */}
        <RoleSection onSelectRole={handleSelectRole} />

        {/* Impact Highlights */}
        <ImpactSection />

        {/* Bottom Call to Action Banner */}
        <CtaSection 
          onOpenAuth={handleOpenAuth}
          onOpenDemo={() => setDemoModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenAuth={handleOpenAuth}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AuthModal 
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
      />

      <TrainerModal 
        isOpen={trainerModal.isOpen}
        trainerName={trainerModal.name}
        onClose={() => setTrainerModal({ isOpen: false, name: '' })}
      />

      <CourseModal 
        isOpen={courseModal.isOpen}
        courseTitle={courseModal.title}
        onClose={() => setCourseModal({ isOpen: false, title: '' })}
      />

      <DemoSimulatorModal 
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
