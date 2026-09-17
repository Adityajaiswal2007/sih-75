import React from 'react';
import { allCourses, recommendedTrainers } from './traineeData';

export default function TraineeCourseDetailView({ courseId, onNavigate, onEnrollClick, onOpenTrainerProfile }) {
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];

  // Match instructor with recommendedTrainers
  const instructorObj = recommendedTrainers.find(t => t.name === course.instructor) || {
    id: 'tr-instructor',
    name: course.instructor,
    avatar: course.instructorAvatar || 'FC',
    role: course.instructorRole,
    organization: 'India Meteorological Department (IMD)',
    experience: '10+ Years',
    rating: course.rating,
    reviewsCount: course.reviewsCount,
    traineesTrained: course.enrolledCount || 450,
    matchScore: 92,
    expertise: course.category,
    tagline: `${course.instructorRole} specializing in ${course.category} and meteorological operations.`,
    coursesTaught: [course.title]
  };

  const handleOpenTrainer = () => {
    if (onOpenTrainerProfile) {
      onOpenTrainerProfile(instructorObj);
    } else {
      onNavigate('trainers');
    }
  };

  return (
    <div className="trainee-course-detail-view" style={{ maxWidth: 1140, margin: '0 auto', paddingBottom: 40 }}>
      {/* Top Navigation Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          type="button"
          className="trainee-btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '8px 16px' }}
          onClick={() => onNavigate('catalog')}
        >
          <span>←</span> Back to Course Catalog
        </button>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="trainee-btn-secondary"
            style={{ fontSize: 12.5, padding: '8px 14px' }}
            onClick={() => onNavigate('trainers')}
          >
            Faculty Directory
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F4F8F5 100%)',
          border: '1.5px solid #D6E3D8',
          borderRadius: 20,
          padding: '32px',
          marginBottom: 28,
          position: 'relative',
          boxShadow: '0 8px 24px rgba(22, 37, 27, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              background: '#EEF6EA',
              color: '#2F5233',
              padding: '4px 10px',
              borderRadius: 20,
              border: '1px solid #D6E3D8'
            }}
          >
            {course.category}
          </span>
          <span style={{ fontSize: 12, color: '#718078' }}>•</span>
          <span style={{ fontSize: 12, color: '#2F5233', fontWeight: 700 }}>
            {course.difficulty} Level
          </span>
          {course.enrolled && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: '#2F6B3C',
                color: '#FFFFFF',
                padding: '3px 8px',
                borderRadius: 12,
                marginLeft: 'auto'
              }}
            >
              ✓ Enrolled ({course.progress}%)
            </span>
          )}
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#16251B', margin: '0 0 12px', lineHeight: 1.3 }}>
          {course.title}
        </h1>
        <p style={{ fontSize: 14.5, color: '#485563', lineHeight: 1.65, maxWidth: 840, margin: '0 0 24px' }}>
          {course.overview || course.description}
        </p>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            alignItems: 'center',
            marginBottom: 24,
            background: '#F9FCFA',
            padding: '14px 18px',
            borderRadius: 12,
            border: '1px solid #E2EDE6'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#B58B32', fontSize: 16 }}>★</span>
            <strong style={{ color: '#16251B', fontSize: 14 }}>{course.rating}</strong>
            <span style={{ color: '#718078', fontSize: 12 }}>({course.reviewsCount} reviews)</span>
          </div>
          <div style={{ color: '#16251B', fontSize: 13 }}>
            👥 <strong>{course.enrolledCount}</strong> enrolled
          </div>
          <div style={{ color: '#16251B', fontSize: 13 }}>
            ⏱ <strong>{course.duration}</strong> total duration
          </div>
          <div style={{ color: '#16251B', fontSize: 13 }}>
            ▤ <strong>{course.modulesCount}</strong> structured modules
          </div>
        </div>

        {/* CTA Bar */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          {course.enrolled ? (
            <>
              <button
                type="button"
                className="trainee-btn-primary"
                onClick={() => onNavigate('learning', { courseId: course.id })}
              >
                <span>▶</span> {course.progress === 100 ? 'Review Course Material' : `Continue Learning (${course.progress}%)`}
              </button>
              <button
                type="button"
                className="trainee-btn-intel"
                onClick={() => onNavigate('assessment', { courseId: course.id })}
              >
                Take Diagnostic Assessment →
              </button>
            </>
          ) : (
            <button
              type="button"
              className="trainee-btn-primary"
              style={{ fontSize: 14, padding: '12px 28px' }}
              onClick={() => onEnrollClick && onEnrollClick(course)}
            >
              Enroll in this Course Now →
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Content: Left Details, Right Curriculum */}
      <div className="trainee-grid-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 24 }}>
        {/* Left Column: Objectives, Prerequisites, Competencies, Instructor */}
        <div>
          {/* Learning Objectives */}
          <section
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #D6E3D8',
              borderRadius: 16,
              padding: 24,
              marginBottom: 20,
              boxShadow: '0 4px 16px rgba(22, 37, 27, 0.04)'
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#16251B', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🎯</span> Learning Objectives
            </h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {course.objectives.map((obj, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#485563', lineHeight: 1.55 }}>
                  <span style={{ color: '#2F6B3C', fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Competencies Developed */}
          <section
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #D6E3D8',
              borderRadius: 16,
              padding: 24,
              marginBottom: 20,
              boxShadow: '0 4px 16px rgba(22, 37, 27, 0.04)'
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#16251B', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>◎</span> Tracked Competencies Developed
            </h3>
            <p style={{ fontSize: 12.5, color: '#527A5A', margin: '0 0 14px' }}>
              Completing this curriculum and assessment advances your monitored benchmarks:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {course.competencies.map((comp, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#EEF6EA',
                    color: '#2F5233',
                    border: '1px solid #C4DFC9',
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span style={{ color: '#2F6B3C' }}>✓</span> {comp}
                </span>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          <section
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #D6E3D8',
              borderRadius: 16,
              padding: 24,
              marginBottom: 20,
              boxShadow: '0 4px 16px rgba(22, 37, 27, 0.04)'
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#16251B', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📋</span> Prerequisites
            </h3>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {course.prerequisites.map((prereq, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#485563' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#527A5A' }}></span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Faculty / Instructor Card */}
          <section
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #D6E3D8',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 4px 16px rgba(22, 37, 27, 0.04)'
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#16251B', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>👨‍🏫</span> Lead Course Faculty
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                className="trainee-trainer-avatar"
                style={{ width: 50, height: 50, fontSize: 16, background: '#16251B', color: '#FFFFFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}
              >
                {course.instructorAvatar}
              </div>
              <div style={{ flexGrow: 1 }}>
                <strong style={{ color: '#16251B', fontSize: 15, display: 'block' }}>
                  {course.instructor}
                </strong>
                <small style={{ color: '#527A5A', fontSize: 12, fontWeight: 600 }}>
                  {course.instructorRole}
                </small>
              </div>
              <button
                type="button"
                className="trainee-btn-secondary"
                style={{ fontSize: 12, padding: '7px 14px' }}
                onClick={handleOpenTrainer}
              >
                View Profile ↗
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Course Curriculum Modules */}
        <section
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #D6E3D8',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 4px 16px rgba(22, 37, 27, 0.04)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid #E2EDE6', paddingBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#16251B', margin: 0 }}>
                ▤ Course Curriculum &amp; Modules
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#718078' }}>
                {course.modulesCount} lessons · Interactive coding &amp; lab exercises
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexGrow: 1 }}>
            {course.modules.map((mod, idx) => {
              const isDone = mod.status === 'Completed';
              const isInProgress = mod.status === 'In Progress';

              return (
                <div
                  key={mod.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: isInProgress ? '#F4F9F5' : isDone ? '#FFFFFF' : '#FAFCFA',
                    border: isInProgress ? '1.5px solid #2F5233' : '1px solid #D6E3D8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: isDone ? '#2F6B3C' : isInProgress ? '#2F5233' : '#EEF4EF',
                        color: isDone || isInProgress ? '#FFFFFF' : '#718078',
                        fontSize: 12,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {isDone ? '✓' : isInProgress ? '●' : idx + 1}
                    </span>
                    <div>
                      <strong style={{ color: '#16251B', fontSize: 13.5, display: 'block', lineHeight: 1.4 }}>
                        {mod.title}
                      </strong>
                      <small style={{ color: '#527A5A', fontSize: 11.5, fontWeight: 600 }}>
                        {mod.type} · {mod.duration}
                      </small>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isDone ? '#2F6B3C' : isInProgress ? '#2F5233' : '#718078',
                      background: isDone ? '#EEF6EA' : isInProgress ? '#E8F3ED' : '#F1F5F2',
                      padding: '3px 8px',
                      borderRadius: 10,
                      flexShrink: 0
                    }}
                  >
                    {mod.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick jump to practical learning */}
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #E2EDE6' }}>
            <button
              type="button"
              className="trainee-btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: '12px' }}
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
