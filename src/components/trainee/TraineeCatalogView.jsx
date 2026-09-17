import React, { useState } from 'react';
import { allCourses } from './traineeData';

export default function TraineeCatalogView({ onNavigate, onEnrollClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = [
    { label: 'All Courses', value: 'All', icon: '🌐' },
    { label: 'Weather Data Analysis', value: 'Weather Data Analysis', icon: '⚡' },
    { label: 'Meteorology', value: 'Meteorology', icon: '🌪' },
    { label: 'Climate Science', value: 'Climate Science', icon: '🌱' },
    { label: 'Machine Learning', value: 'Machine Learning', icon: '🤖' },
    { label: 'Remote Sensing', value: 'Remote Sensing', icon: '🛰' },
    { label: 'GIS & Mapping', value: 'GIS & Spatial Mapping', icon: '🗺' },
    { label: 'Scientific Computing', value: 'Scientific Computing', icon: '💻' }
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.competencies && course.competencies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      selectedCategory === 'All' ||
      course.category === selectedCategory ||
      course.domain === selectedCategory ||
      (course.competencies && course.competencies.some(c => c.includes(selectedCategory)));

    const matchesDifficulty =
      selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return { bg: '#E8F5E9', text: '#2E7D32', border: '#C8E6C9' };
      case 'Intermediate':
        return { bg: '#E3F2FD', text: '#1565C0', border: '#BBDEFB' };
      case 'Advanced':
        return { bg: '#F3E5F5', text: '#7B1FA2', border: '#E1BEE7' };
      default:
        return { bg: '#EEF6EA', text: '#2F5233', border: '#D6E3D8' };
    }
  };

  return (
    <div className="trainee-catalog-view-wrapper">
      {/* 1. Page Header */}
      <div className="trainee-catalog-header">
        <div className="trainee-catalog-kicker-row">
          <span className="trainee-catalog-kicker">ACADEMIC CURRICULUM · IMD &amp; MoES NODAL CATALOG</span>
          <span className="trainee-catalog-live-badge">● 2026 Active Cohorts</span>
        </div>
        <h1 className="trainee-catalog-title">Course Catalog</h1>
        <p className="trainee-catalog-subtitle">
          Discover accredited meteorological training programs, radar polarimetry labs, and atmospheric computing courses mapped to institutional competency benchmarks.
        </p>
      </div>

      {/* 2. Interactive Search & Filter Controls Bar */}
      <div className="trainee-catalog-controls-card">
        <div className="trainee-catalog-controls-top">
          {/* Main Search Input */}
          <div className="trainee-catalog-search-box">
            <svg
              className="trainee-catalog-search-svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="trainee-catalog-search-input"
              placeholder="Search by course title, competency, or faculty instructor..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="trainee-catalog-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="trainee-catalog-select-group">
            <label className="trainee-catalog-select-label">Difficulty Level:</label>
            <div className="trainee-catalog-select-wrapper">
              <select
                className="trainee-catalog-select"
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map(d => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Difficulties' : `${d} Level`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="trainee-catalog-category-scroll">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                className={`trainee-catalog-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span className="trainee-pill-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Results Telemetry & Active Filters */}
      <div className="trainee-catalog-results-meta">
        <div className="trainee-catalog-count-text">
          Showing <strong>{filteredCourses.length}</strong> accredited {filteredCourses.length === 1 ? 'course' : 'courses'}
          {selectedCategory !== 'All' && <span className="trainee-catalog-filter-tag">Category: {selectedCategory}</span>}
          {selectedDifficulty !== 'All' && <span className="trainee-catalog-filter-tag">Level: {selectedDifficulty}</span>}
          {searchQuery && <span className="trainee-catalog-filter-tag">Query: "{searchQuery}"</span>}
        </div>
        {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
          <button
            type="button"
            className="trainee-catalog-reset-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* 4. Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="trainee-catalog-empty-state">
          <div className="trainee-catalog-empty-icon">🔍</div>
          <h3 className="trainee-catalog-empty-title">No Courses Match Your Filter Criteria</h3>
          <p className="trainee-catalog-empty-desc">
            Try adjusting your search terms or choosing a different category or difficulty level.
          </p>
          <button
            type="button"
            className="trainee-btn-primary"
            style={{ marginTop: 14 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
          >
            Show All Courses
          </button>
        </div>
      ) : (
        <div className="trainee-catalog-grid">
          {filteredCourses.map(course => {
            const diffStyle = getDifficultyColor(course.difficulty);

            return (
              <div className="trainee-catalog-card" key={course.id}>
                {/* Top Row: Icon + Category Badge + Difficulty Pill */}
                <div className="trainee-catalog-card-header">
                  <div className="trainee-catalog-card-thumb">
                    <span>{course.thumbnailIcon}</span>
                  </div>
                  <div className="trainee-catalog-card-badges">
                    <span className="trainee-catalog-badge-category">
                      {course.category}
                    </span>
                    <span
                      className="trainee-catalog-badge-diff"
                      style={{
                        background: diffStyle.bg,
                        color: diffStyle.text,
                        borderColor: diffStyle.border
                      }}
                    >
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                {/* Course Title & Overview */}
                <h3
                  className="trainee-catalog-card-title"
                  onClick={() => onNavigate('course-detail', { courseId: course.id })}
                  title={course.title}
                >
                  {course.title}
                </h3>
                <p className="trainee-catalog-card-desc">
                  {course.description || course.overview}
                </p>

                {/* Competency Tags */}
                {course.competencies && course.competencies.length > 0 && (
                  <div className="trainee-catalog-comp-chips">
                    {course.competencies.slice(0, 2).map((comp, idx) => (
                      <span key={idx} className="trainee-catalog-comp-chip">
                        <span style={{ color: '#2F6B3C', fontWeight: 800 }}>✓</span> {comp}
                      </span>
                    ))}
                    {course.competencies.length > 2 && (
                      <span className="trainee-catalog-comp-chip-more">
                        +{course.competencies.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                {/* Progress Bar (if already enrolled) */}
                {course.enrolled && (
                  <div className="trainee-catalog-enrolled-box">
                    <div className="trainee-catalog-enrolled-top">
                      <span className="trainee-catalog-enrolled-label">
                        <span className="trainee-catalog-enrolled-dot" /> Active Enrollment
                      </span>
                      <strong className="trainee-catalog-enrolled-percent">{course.progress}%</strong>
                    </div>
                    <div className="trainee-progress-bar-wrap" style={{ height: 6 }}>
                      <div
                        className="trainee-progress-bar-fill"
                        style={{
                          width: `${course.progress}%`,
                          background: course.progress === 100 ? '#2F6B3C' : 'linear-gradient(90deg, #527A5A, #2F5233)'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Meta Row: Duration · Modules · Rating */}
                <div className="trainee-catalog-meta-bar">
                  <div className="trainee-catalog-meta-item">
                    <span>⏱</span>
                    <span>{course.duration}</span>
                  </div>
                  <span className="trainee-catalog-meta-dot">•</span>
                  <div className="trainee-catalog-meta-item">
                    <span>▤</span>
                    <span>{course.modulesCount} lessons</span>
                  </div>
                  <span className="trainee-catalog-meta-dot">•</span>
                  <div className="trainee-catalog-meta-item rating">
                    <span>★</span>
                    <strong>{course.rating}</strong>
                    <small>({course.enrolledCount})</small>
                  </div>
                </div>

                {/* Faculty Instructor Row */}
                <div className="trainee-catalog-faculty-row">
                  <div className="trainee-catalog-faculty-avatar">
                    {course.instructorAvatar || 'FC'}
                  </div>
                  <div className="trainee-catalog-faculty-info">
                    <strong className="trainee-catalog-faculty-name">{course.instructor}</strong>
                    <small className="trainee-catalog-faculty-role">{course.instructorRole}</small>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="trainee-catalog-card-footer">
                  <button
                    type="button"
                    className="trainee-catalog-btn-details"
                    onClick={() => onNavigate('course-detail', { courseId: course.id })}
                  >
                    View Details →
                  </button>

                  {course.enrolled ? (
                    <button
                      type="button"
                      className="trainee-catalog-btn-action primary"
                      onClick={() => onNavigate('learning', { courseId: course.id })}
                    >
                      {course.progress === 100 ? 'Review Course' : 'Continue ▶'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="trainee-catalog-btn-action enroll"
                      onClick={() => onEnrollClick && onEnrollClick(course)}
                    >
                      Enroll Now +
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
