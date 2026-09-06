import React, { useState } from 'react';
import { allCourses } from './traineeData';

export default function TraineeCatalogView({ onNavigate, onEnrollClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const categories = [
    'All',
    'Weather Data Analysis',
    'Meteorology',
    'Climate Science',
    'Python',
    'GIS',
    'Machine Learning',
    'Remote Sensing',
    'Scientific Computing'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      course.category === selectedCategory ||
      course.domain === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="trainee-catalog-view">
      {/* Top Banner */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#38BDF8', textTransform: 'uppercase' }}>
            ACADEMIC CURRICULUM
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Course Catalog</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 20px' }}>
          Find accredited courses that match your developmental goals and bridge diagnosed competency gaps.
        </p>

        {/* Search and Secondary Filter Row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="trainee-search-input-wrap" style={{ width: 340, position: 'relative' }}>
            <span className="trainee-search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search courses, modules, faculty..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 34 }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              style={{
                background: '#0D1B2A',
                border: '1px solid #1E334A',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: 12.5,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {difficulties.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="trainee-catalog-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`trainee-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            background: '#0D1B2A',
            border: '1px solid #1E334A',
            borderRadius: 16
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <h3 style={{ color: '#fff', fontSize: 18, margin: '0 0 6px' }}>No courses match your filter criteria</h3>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>Try adjusting your search query or selecting a different category filter.</p>
          <button
            className="trainee-btn-secondary"
            style={{ marginTop: 16 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="trainee-course-grid">
          {filteredCourses.map(course => (
            <div className="trainee-course-card" key={course.id}>
              <div className="trainee-course-top">
                <div className="trainee-course-icon">{course.thumbnailIcon}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className="trainee-course-category-badge">{course.category}</span>
                  <span
                    style={{
                      fontSize: 10.5,
                      padding: '3px 6px',
                      borderRadius: 4,
                      background: 'rgba(30, 51, 74, 0.7)',
                      color: '#94A3B8',
                      border: '1px solid #1E334A'
                    }}
                  >
                    {course.difficulty}
                  </span>
                </div>
              </div>

              <h3 className="trainee-course-title">{course.title}</h3>
              <p className="trainee-course-desc">{course.description}</p>

              {/* Progress if already enrolled */}
              {course.enrolled && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}>
                    <span style={{ color: '#38BDF8', fontWeight: 600 }}>Enrolled</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{course.progress}%</span>
                  </div>
                  <div className="trainee-progress-bar-wrap" style={{ height: 5 }}>
                    <div className="trainee-progress-bar-fill" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              )}

              {/* Meta stats */}
              <div className="trainee-course-meta-row">
                <span>⏱ {course.duration}</span>
                <span>•</span>
                <span>▤ {course.modulesCount} modules</span>
                <span>•</span>
                <span>★ {course.rating} ({course.enrolledCount})</span>
              </div>

              <div style={{ fontSize: 11.5, color: '#94A3B8', marginBottom: 16 }}>
                Instructor: <strong style={{ color: '#CBD5E1' }}>{course.instructor}</strong>
              </div>

              {/* Card Footer Actions */}
              <div className="trainee-course-footer">
                <button
                  className="trainee-panel-link"
                  onClick={() => onNavigate('course-detail', { courseId: course.id })}
                >
                  View Details →
                </button>

                {course.enrolled ? (
                  <button
                    className="trainee-btn-primary"
                    style={{ padding: '8px 16px', fontSize: 12.5 }}
                    onClick={() => onNavigate('learning', { courseId: course.id })}
                  >
                    {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </button>
                ) : (
                  <button
                    className="trainee-btn-secondary"
                    style={{ padding: '8px 16px', fontSize: 12.5 }}
                    onClick={() => onEnrollClick && onEnrollClick(course)}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
