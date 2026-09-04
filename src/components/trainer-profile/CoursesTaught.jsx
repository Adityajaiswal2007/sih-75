import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
  BarChart,
  Layers,
  Code2,
  CloudRain,
  Compass,
  Database
} from 'lucide-react';

export default function CoursesTaught({ courses, onViewCourseModal }) {
  const [levelFilter, setLevelFilter] = useState('All');

  const filterOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((course) => {
    if (levelFilter === 'All') return true;
    return course.level.toLowerCase() === levelFilter.toLowerCase();
  });

  const getCourseIcon = (iconName) => {
    switch (iconName) {
      case 'code':
        return Code2;
      case 'cloud':
        return CloudRain;
      case 'compass':
        return Compass;
      case 'database':
      default:
        return Database;
    }
  };

  const getDifficultyClass = (lvl) => {
    switch (lvl.toLowerCase()) {
      case 'beginner':
        return 'level-beginner';
      case 'intermediate':
        return 'level-intermediate';
      case 'advanced':
        return 'level-advanced';
      default:
        return 'level-intermediate';
    }
  };

  return (
    <section className="profile-section-card courses-card" id="section-courses">
      <div className="section-header-flex">
        <div className="section-title-wrap">
          <span className="section-badge">
            <BookOpen size={13} />
            CURRICULUM & INSTRUCTION
          </span>
          <h2 className="section-title">Courses Taught</h2>
          <p className="section-subtitle">
            Active and ongoing capacity-building courses led by Dr. Rahul Sharma across CapacityConnect.
          </p>
        </div>

        {/* Level Filters */}
        <div className="course-filters-row">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              className={`course-filter-btn ${levelFilter === opt ? 'active' : ''}`}
              onClick={() => setLevelFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid-layout">
        {filteredCourses.map((course) => {
          const IconComp = getCourseIcon(course.icon);
          return (
            <div key={course.id} className="course-profile-card">
              <div className="course-card-top">
                <div className="course-icon-badge">
                  <IconComp size={22} />
                </div>
                <div className="course-badges-right">
                  <span className={`difficulty-pill ${getDifficultyClass(course.level)}`}>
                    {course.level}
                  </span>
                  <div className="course-rating-pill">
                    <Star size={12} className="star-icon" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>

              <h3 className="course-title">{course.title}</h3>
              <p className="course-short-desc">{course.description}</p>

              {/* Course Meta Info */}
              <div className="course-metrics-row">
                <div className="c-metric">
                  <Clock size={13} className="text-muted" />
                  <span>{course.duration} ({course.modulesCount} modules)</span>
                </div>
                <div className="c-metric">
                  <Users size={13} className="text-cyan" />
                  <span><b>{course.traineesCount}</b> Trainees</span>
                </div>
              </div>

              {/* Completion Rate Bar */}
              <div className="course-completion-block">
                <div className="completion-label-row">
                  <span>Completion Rate</span>
                  <strong>{course.completionRate}%</strong>
                </div>
                <div className="completion-track">
                  <div
                    className="completion-fill"
                    style={{ width: `${course.completionRate}%` }}
                  />
                </div>
              </div>

              {/* Course Skills Tags */}
              <div className="course-tags-strip">
                {course.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="course-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="course-card-footer">
                <button
                  className="cc-btn cc-btn-outline full-width"
                  onClick={() => onViewCourseModal(course)}
                  id={`btn-view-course-${course.id}`}
                >
                  <span>View Course Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
