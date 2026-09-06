import React, { useState } from 'react';
import { allCourses, mockLearningModuleContent } from './traineeData';

export default function TraineeLearningView({ courseId, onNavigate, showToast }) {
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];
  const [activeModuleIndex, setActiveModuleIndex] = useState(3); // Module 4 (0-indexed 3)
  const [completedModules, setCompletedModules] = useState([0, 1, 2]); // First 3 completed
  const [playingVideo, setPlayingVideo] = useState(false);

  const modules = course.modules || [];
  const currentModule = modules[activeModuleIndex] || modules[0];

  const handleMarkComplete = () => {
    if (!completedModules.includes(activeModuleIndex)) {
      setCompletedModules([...completedModules, activeModuleIndex]);
      if (showToast) {
        showToast(`Marked "${currentModule.title}" as completed! Progress updated.`);
      }
    }
    if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    }
  };

  const progressPercent = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="trainee-learning-view">
      {/* Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <button
            className="trainee-panel-link"
            style={{ marginBottom: 4 }}
            onClick={() => onNavigate('course-detail', { courseId: course.id })}
          >
            ← Back to Course Overview
          </button>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>
            {course.title}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="trainee-btn-secondary"
            onClick={() => onNavigate('catalog')}
          >
            Catalog
          </button>
          <button
            className="trainee-btn-intel"
            onClick={() => onNavigate('assessment', { courseId: course.id })}
          >
            Take Assessment →
          </button>
        </div>
      </div>

      {/* 3-Column Learning Interface */}
      <div className="trainee-learning-layout">
        {/* Left Column: Course Modules Curriculum */}
        <aside className="trainee-player-nav">
          <h4>Course Curriculum</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {modules.map((mod, index) => {
              const isDone = completedModules.includes(index);
              const isActive = activeModuleIndex === index;

              return (
                <div
                  key={mod.id}
                  className={`trainee-module-nav-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                  onClick={() => setActiveModuleIndex(index)}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, width: 20 }}>
                    {isDone ? '✓' : isActive ? '●' : index + 1}
                  </span>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: isActive ? 700 : 500 }}>
                      {mod.title}
                    </div>
                    <small style={{ fontSize: 10.5, color: '#64748B' }}>{mod.duration}</small>
                  </div>
                </div>
              );
            })}

            {/* Assessment item in nav */}
            <div
              className="trainee-module-nav-item"
              style={{ marginTop: 12, borderTop: '1px solid #1E334A', paddingTop: 10, color: '#A5B4FC' }}
              onClick={() => onNavigate('assessment', { courseId: course.id })}
            >
              <span>▤</span>
              <div>
                <strong>Final Assessment Test</strong>
                <small style={{ display: 'block', fontSize: 10.5, color: '#818CF8' }}>10 Questions · Certified</small>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column: Main Learning Content */}
        <main className="trainee-player-center">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: '#38BDF8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Active Module · Lesson {activeModuleIndex + 1} of {modules.length}
            </span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>⏱ {currentModule.duration}</span>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>
            {currentModule.title}
          </h2>

          {/* Video / Interactive Media Placeholder */}
          <div className="trainee-player-video-placeholder">
            {playingVideo ? (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
                <strong style={{ color: '#fff', fontSize: 15 }}>Interactive Meteorological Video Stream Active</strong>
                <p style={{ color: '#94A3B8', fontSize: 12, margin: '6px 0 12px' }}>
                  Simulating Doppler Radar polarimetry data rendering with Cartopy...
                </p>
                <button
                  className="trainee-btn-secondary"
                  style={{ padding: '6px 14px', fontSize: 12 }}
                  onClick={() => setPlayingVideo(false)}
                >
                  Pause Stream ❚❚
                </button>
              </div>
            ) : (
              <>
                <div className="trainee-play-btn-circle" onClick={() => setPlayingVideo(true)} title="Play Lecture">
                  ▶
                </div>
                <strong style={{ color: '#fff', fontSize: 14 }}>
                  Watch Video Lecture: Geospatial Radar Plotting in Cartopy
                </strong>
                <span style={{ color: '#94A3B8', fontSize: 12 }}>
                  Duration: {currentModule.duration} · High Definition 1080p
                </span>
              </>
            )}
          </div>

          {/* Learning Objective */}
          <div
            style={{
              padding: '14px 18px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 10,
              marginBottom: 20
            }}
          >
            <strong style={{ color: '#38BDF8', fontSize: 13, display: 'block', marginBottom: 4 }}>
              📌 Module Learning Objective
            </strong>
            <p style={{ color: '#E2E8F0', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              {mockLearningModuleContent.learningObjective}
            </p>
          </div>

          {/* Reading Material */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>
              📖 Technical Reading & Synoptic Theory
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>
              {mockLearningModuleContent.readingMaterial}
            </p>
          </div>

          {/* Key Concepts */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
              💡 Core Meteorological Concepts
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {mockLearningModuleContent.keyConcepts.map((kc, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(10, 22, 38, 0.6)',
                    border: '1px solid #1E334A',
                    borderRadius: 8
                  }}
                >
                  <strong style={{ color: '#38BDF8', fontSize: 12.5, display: 'block', marginBottom: 3 }}>
                    {kc.title}
                  </strong>
                  <span style={{ color: '#94A3B8', fontSize: 11.5, lineHeight: 1.4, display: 'block' }}>
                    {kc.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Python Code Snippet */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>
                💻 Practical Implementation (Python & Cartopy)
              </h3>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Interactive Python 3.11</span>
            </div>
            <pre className="trainee-player-code-block">{mockLearningModuleContent.codeSnippet}</pre>
          </div>

          {/* Downloadable Lab Resources */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 10px' }}>
              📥 Downloadable Datasets & Notebooks
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mockLearningModuleContent.downloadableResources.map((res, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'rgba(13, 27, 42, 0.6)',
                    border: '1px solid #1E334A',
                    borderRadius: 8
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📁</span>
                    <span style={{ fontSize: 12.5, color: '#E2E8F0' }}>{res.name}</span>
                    <small style={{ color: '#64748B', fontSize: 11 }}>({res.size})</small>
                  </div>
                  <button
                    className="trainee-panel-link"
                    style={{ fontSize: 11.5 }}
                    onClick={() => showToast && showToast(`Downloaded ${res.name}`)}
                  >
                    Download ↗
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Module Bottom Navigation Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 20,
              borderTop: '1px solid #1E334A'
            }}
          >
            <button
              className="trainee-btn-secondary"
              disabled={activeModuleIndex === 0}
              onClick={() => setActiveModuleIndex(Math.max(0, activeModuleIndex - 1))}
              style={{ opacity: activeModuleIndex === 0 ? 0.5 : 1 }}
            >
              ← Previous Module
            </button>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="trainee-btn-primary"
                onClick={handleMarkComplete}
              >
                {completedModules.includes(activeModuleIndex) ? 'Completed ✓ (Next)' : 'Mark as Complete ✓'}
              </button>

              {activeModuleIndex < modules.length - 1 && (
                <button
                  className="trainee-btn-secondary"
                  onClick={() => setActiveModuleIndex(activeModuleIndex + 1)}
                >
                  Next Module →
                </button>
              )}
            </div>
          </div>
        </main>

        {/* Right Column: Progress & Competency Alignment */}
        <aside className="trainee-player-right">
          <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 14px' }}>
            Course Progress
          </h4>

          <div style={{ textAlign: 'center', padding: '16px 0', borderBottom: '1px solid #1E334A', marginBottom: 18 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#38BDF8', lineHeight: 1, marginBottom: 4 }}>
              {progressPercent}%
            </div>
            <small style={{ fontSize: 12, color: '#94A3B8' }}>
              {completedModules.length} of {modules.length} modules completed
            </small>
            <div className="trainee-progress-bar-wrap" style={{ marginTop: 12, height: 6 }}>
              <div className="trainee-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Tracked Competencies in this Course */}
          <div style={{ marginBottom: 20 }}>
            <h5 style={{ fontSize: 12.5, fontWeight: 600, color: '#A5B4FC', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              ◎ Tracked Competencies
            </h5>
            {course.competencies.map((comp, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: '#CBD5E1' }}>{comp}</span>
                  <span style={{ color: '#38BDF8', fontWeight: 700 }}>Active</span>
                </div>
                <div className="trainee-progress-bar-wrap" style={{ height: 4 }}>
                  <div
                    className="trainee-progress-bar-fill"
                    style={{
                      width: `${75 + idx * 6}%`,
                      background: 'linear-gradient(90deg, #6366F1, #38BDF8)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Assessment Ready Callout */}
          <div
            style={{
              padding: '14px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 10,
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: 20, display: 'block', marginBottom: 4 }}>🏆</span>
            <strong style={{ fontSize: 12.5, color: '#fff', display: 'block' }}>
              Ready to test your skills?
            </strong>
            <p style={{ fontSize: 11, color: '#94A3B8', margin: '4px 0 12px' }}>
              Pass the 10-question evaluation to unlock your verified credential and update competency scores.
            </p>
            <button
              className="trainee-btn-intel"
              style={{ width: '100%', fontSize: 12, padding: '8px' }}
              onClick={() => onNavigate('assessment', { courseId: course.id })}
            >
              Start Assessment →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
