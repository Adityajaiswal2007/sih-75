import React from 'react';
import { allCourses } from './traineeData';

export default function TraineeCourseDetailView({ courseId, onNavigate, onEnrollClick, onOpenTrainerProfile }) {
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];

  return (
    <div className="trainee-course-detail-view" style={{ maxWidth: 1040, margin: '0 auto' }}>
      {/* Back Button */}
      <button
        className="trainee-panel-link"
        style={{ marginBottom: 20 }}
        onClick={() => onNavigate('catalog')}
      >
        ← Back to Course Catalog
      </button>

      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0A1B30 0%, #0D233F 50%, #101F31 100%)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 16,
          padding: '32px',
          marginBottom: 28,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span className="trainee-course-category-badge">{course.category}</span>
          <span style={{ fontSize: 11, color: '#94A3B8' }}>•</span>
          <span style={{ fontSize: 12, color: '#CBD5E1', fontWeight: 600 }}>{course.difficulty} Level</span>
        </div>

        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
          {course.title}
        </h1>
        <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.6, maxWidth: 740, margin: '0 0 24px' }}>
          {course.overview}
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
            <strong style={{ color: '#fff' }}>{course.rating}</strong>
            <span style={{ color: '#94A3B8', fontSize: 12 }}>({course.reviewsCount} reviews)</span>
          </div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>
            👥 <strong>{course.enrolledCount}</strong> trainees enrolled
          </div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>
            ⏱ <strong>{course.duration}</strong> estimated completion
          </div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>
            ▤ <strong>{course.modulesCount}</strong> structured modules
          </div>
        </div>

        {/* CTA Bar */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {course.enrolled ? (
            <>
              <button
                className="trainee-btn-primary"
                onClick={() => onNavigate('learning', { courseId: course.id })}
              >
                <span>▶</span> {course.progress === 100 ? 'Review Course Material' : 'Continue Learning (' + course.progress + '%)'}
              </button>
              <button
                className="trainee-btn-intel"
                onClick={() => onNavigate('assessment', { courseId: course.id })}
              >
                Take Assessment Test →
              </button>
            </>
          ) : (
            <button
              className="trainee-btn-primary"
              onClick={() => onEnrollClick && onEnrollClick(course)}
            >
              Enroll in this Course Now →
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Content: Left Details, Right Curriculum */}
      <div className="trainee-grid-two-col">
        {/* Left Column: Objectives, Prerequisites, Competencies */}
        <div>
          {/* Learning Objectives */}
          <section className="trainee-panel" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
              🎯 Learning Objectives
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#CBD5E1', fontSize: 13.5, lineHeight: 1.8 }}>
              {course.objectives.map((obj, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          {/* Competencies Developed */}
          <section className="trainee-panel" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
              ◎ Competencies Developed
            </h3>
            <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '0 0 16px' }}>
              Completing this course and passing the diagnostic assessment advances the following tracked competencies:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {course.competencies.map((comp, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#A5B4FC',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span style={{ color: '#6366F1' }}>✓</span> {comp}
                </span>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          <section className="trainee-panel" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
              📋 Prerequisites
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>
              {course.prerequisites.map((prereq, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>
                  {prereq}
                </li>
              ))}
            </ul>
          </section>

          {/* Faculty / Instructor Card */}
          <section className="trainee-panel">
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
              👨‍🏫 Course Faculty
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="trainee-trainer-avatar" style={{ width: 52, height: 52, fontSize: 16 }}>
                {course.instructorAvatar}
              </div>
              <div style={{ flexGrow: 1 }}>
                <strong style={{ color: '#fff', fontSize: 15, display: 'block' }}>
                  {course.instructor}
                </strong>
                <small style={{ color: '#94A3B8', fontSize: 12 }}>{course.instructorRole}</small>
              </div>
              <button
                className="trainee-panel-link"
                onClick={() => {
                  if (onOpenTrainerProfile) {
                    onOpenTrainerProfile();
                  } else {
                    onNavigate('trainers');
                  }
                }}
              >
                View Profile ↗
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Course Curriculum Modules */}
        <section className="trainee-panel">
          <div className="trainee-panel-header">
            <div className="trainee-panel-title-group">
              <h3>▤ Course Modules</h3>
              <p>{course.modulesCount} lessons · Practical exercises</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {course.modules.map((mod, idx) => (
              <div
                key={mod.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 10,
                  background:
                    mod.status === 'In Progress'
                      ? 'rgba(56, 189, 248, 0.08)'
                      : 'rgba(10, 22, 38, 0.6)',
                  border:
                    mod.status === 'In Progress'
                      ? '1px solid rgba(56, 189, 248, 0.3)'
                      : '1px solid #1E334A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background:
                        mod.status === 'Completed'
                          ? 'rgba(34, 197, 94, 0.2)'
                          : mod.status === 'In Progress'
                          ? 'rgba(56, 189, 248, 0.2)'
                          : 'rgba(30, 51, 74, 0.6)',
                      color:
                        mod.status === 'Completed'
                          ? '#22C55E'
                          : mod.status === 'In Progress'
                          ? '#38BDF8'
                          : '#64748B',
                      fontSize: 12,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {mod.status === 'Completed' ? '✓' : mod.status === 'In Progress' ? '●' : idx + 1}
                  </span>
                  <div>
                    <strong style={{ color: '#fff', fontSize: 13, display: 'block' }}>
                      {mod.title}
                    </strong>
                    <small style={{ color: '#94A3B8', fontSize: 11 }}>
                      {mod.type} · {mod.duration}
                    </small>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color:
                      mod.status === 'Completed'
                        ? '#4ADE80'
                        : mod.status === 'In Progress'
                        ? '#38BDF8'
                        : '#64748B'
                  }}
                >
                  {mod.status}
                </span>
              </div>
            ))}
          </div>

          {/* Quick jump to practical learning */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              className="trainee-btn-primary"
              style={{ width: '100%' }}
              onClick={() => onNavigate('learning', { courseId: course.id })}
            >
              Open Interactive Learning Player →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
