import React, { useState } from 'react';
import { allCourses } from './traineeData';

export default function TraineeMyLearningView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('All');

  const enrolledCourses = allCourses.filter(c => c.enrolled);

  const filteredCourses = enrolledCourses.filter(c => {
    if (activeTab === 'In Progress') return c.progress < 100;
    if (activeTab === 'Completed') return c.progress === 100;
    if (activeTab === 'Saved') return c.badge === 'Recommended' || c.progress === 68;
    return true;
  });

  return (
    <div className="trainee-my-learning-view">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#38BDF8', textTransform: 'uppercase' }}>
            ACADEMIC PROGRESS
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>My Learning</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Track active courses, module completion milestones, and earned competencies.
        </p>
      </div>

      {/* Tabs */}
      <div className="trainee-catalog-filters">
        {['All', 'In Progress', 'Completed', 'Saved'].map(tab => (
          <button
            key={tab}
            className={`trainee-filter-chip ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} {tab === 'All' ? `(${enrolledCourses.length})` : ''}
          </button>
        ))}
      </div>

      {/* Course List Grid */}
      <div className="trainee-course-grid">
        {filteredCourses.map(course => (
          <div className="trainee-course-card" key={course.id}>
            <div className="trainee-course-top">
              <div className="trainee-course-icon">{course.thumbnailIcon}</div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 12,
                  background:
                    course.progress === 100
                      ? 'rgba(34, 197, 94, 0.15)'
                      : 'rgba(56, 189, 248, 0.15)',
                  color: course.progress === 100 ? '#4ADE80' : '#38BDF8',
                  border:
                    course.progress === 100
                      ? '1px solid rgba(34, 197, 94, 0.3)'
                      : '1px solid rgba(56, 189, 248, 0.3)'
                }}
              >
                {course.progress === 100 ? 'Completed ✓' : `${course.progress}% Completed`}
              </span>
            </div>

            <h3 className="trainee-course-title">{course.title}</h3>
            <p className="trainee-course-desc">{course.currentModule}</p>

            {/* Progress Bar */}
            <div style={{ marginBottom: 16 }}>
              <div className="trainee-progress-bar-wrap" style={{ height: 6 }}>
                <div
                  className="trainee-progress-bar-fill"
                  style={{
                    width: `${course.progress}%`,
                    background: course.progress === 100 ? '#22C55E' : 'linear-gradient(90deg, #3B82F6, #38BDF8)'
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#94A3B8', marginTop: 4 }}>
                <span>Last accessed: {course.lastAccessed || 'Recently'}</span>
                <span>{course.duration}</span>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
              Faculty: <strong style={{ color: '#E2E8F0' }}>{course.instructor}</strong>
            </div>

            {/* Actions */}
            <div className="trainee-course-footer">
              <button
                className="trainee-panel-link"
                onClick={() => onNavigate('course-detail', { courseId: course.id })}
              >
                Syllabus
              </button>

              <button
                className="trainee-btn-primary"
                style={{ padding: '8px 16px', fontSize: 12.5 }}
                onClick={() => onNavigate('learning', { courseId: course.id })}
              >
                {course.progress === 100 ? 'Review Material' : 'Resume Learning →'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
