import React, { useState, useEffect } from 'react';
import { mockAssessmentQuestions } from './traineeData';

export default function TraineeAssessmentView({ onNavigate, onCompleteAssessment }) {
  const [activeTestId, setActiveTestId] = useState(null); // null means in Directory/Hub mode
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(1200); // 20:00

  // Timer only runs when an active test is started
  useEffect(() => {
    if (!activeTestId) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTestId]);

  const availableAssessments = [
    {
      id: 'test-python-weather',
      title: 'Python for Weather Analytics Diagnostic Exam',
      domain: 'Scientific Computing',
      questionsCount: 10,
      duration: '20 Minutes',
      durationSeconds: 1200,
      passingScore: 70,
      difficulty: 'Intermediate',
      status: 'Ready to Start',
      description: 'Verifies proficiency in vectorized computation using NumPy, atmospheric geospatial mapping with Cartopy, and xarray dataset pipelines for radar contour visualization.',
      competencies: ['Python 3.11', 'Cartopy', 'Numerical Analytics']
    },
    {
      id: 'test-nwp-ops',
      title: 'Numerical Weather Prediction (NWP) Operational Evaluation',
      domain: 'Meteorology',
      questionsCount: 15,
      duration: '30 Minutes',
      durationSeconds: 1800,
      passingScore: 75,
      difficulty: 'Advanced',
      status: 'Ready to Start',
      description: 'Assesses understanding of synoptic boundary initializations, mesoscale assimilation, and ensemble forecasting diagnostics.',
      competencies: ['NWP Modeling', 'Data Assimilation', 'Synoptic Analysis']
    },
    {
      id: 'test-doppler-radar',
      title: 'Doppler Weather Radar Interpretation Diagnostic',
      domain: 'Radar Meteorology',
      questionsCount: 10,
      duration: '20 Minutes',
      durationSeconds: 1200,
      passingScore: 70,
      difficulty: 'Intermediate',
      status: 'Ready to Start',
      description: 'Examines real-time interpretation of dual-polarization radar moments: reflectivity factor (Z), differential reflectivity (ZDR), and velocity dealiasing.',
      competencies: ['Doppler Radar', 'Convective Analysis', 'Early Warning']
    }
  ];

  const completedAssessments = [
    {
      id: 'test-thermo-01',
      title: 'Atmospheric Thermodynamics & Skew-T Diagnostics',
      score: 92,
      passed: true,
      completedDate: '2026-08-28',
      certificateIssued: true
    },
    {
      id: 'test-gis-02',
      title: 'Geospatial Information Systems for Meteorology',
      score: 86,
      passed: true,
      completedDate: '2026-08-14',
      certificateIssued: true
    }
  ];

  const handleStartAssessment = (test) => {
    setActiveTestId(test.id);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setSecondsLeft(test.durationSeconds || 1200);
  };

  const handleExitTest = () => {
    if (window.confirm('Are you sure you want to pause or exit this assessment? Your current progress will be reset.')) {
      setActiveTestId(null);
    }
  };

  const formatTimer = secs => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const question = mockAssessmentQuestions[currentQuestionIndex] || mockAssessmentQuestions[0];
  const totalQuestions = mockAssessmentQuestions.length;

  const handleSelectOption = optionIndex => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleSubmit = () => {
    if (onCompleteAssessment) {
      onCompleteAssessment(selectedAnswers);
    } else {
      onNavigate('result');
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // VIEW 1: Assessments Directory Hub (Default Landing)
  if (!activeTestId) {
    return (
      <div className="trainee-assessment-hub">
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#2F5233', textTransform: 'uppercase' }}>
              ACCREDITED EVALUATIONS
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#16251B', margin: 0 }}>Assessments & Diagnostics</h1>
          <p style={{ color: '#485563', fontSize: 13.5, margin: '4px 0 0' }}>
            Verify your meteorological and computing capabilities. Passing evaluations unlocks official certificates and updates your competency indices.
          </p>
        </div>

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
          <div style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid #D6E3D8', borderRadius: 12 }}>
            <span style={{ fontSize: 11, color: '#2F5233', fontWeight: 600 }}>AVAILABLE EVALUATIONS</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#16251B', marginTop: 4 }}>3 Tests</div>
            <small style={{ color: '#2F6B3C', fontSize: 11.5, fontWeight: 600 }}>Ready to take</small>
          </div>

          <div style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid #D6E3D8', borderRadius: 12 }}>
            <span style={{ fontSize: 11, color: '#2F6B3C', fontWeight: 600 }}>COMPLETED ASSESSMENTS</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#16251B', marginTop: 4 }}>2 Passed</div>
            <small style={{ color: '#485563', fontSize: 11.5 }}>100% Pass rate</small>
          </div>

          <div style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid #D6E3D8', borderRadius: 12 }}>
            <span style={{ fontSize: 11, color: '#B58B32', fontWeight: 600 }}>AVERAGE SCORE</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#16251B', marginTop: 4 }}>89.0%</div>
            <small style={{ color: '#2F6B3C', fontSize: 11.5 }}>Above national cutoff</small>
          </div>

          <div style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid #D6E3D8', borderRadius: 12 }}>
            <span style={{ fontSize: 11, color: '#718078', fontWeight: 600 }}>PASSING THRESHOLD</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#16251B', marginTop: 4 }}>70%</div>
            <small style={{ color: '#485563', fontSize: 11.5 }}>Required for accreditation</small>
          </div>
        </div>

        {/* Available Tests Section */}
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#16251B', margin: '0 0 16px' }}>
          Available Diagnostic Assessments
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
          {availableAssessments.map(test => (
            <div
              key={test.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D6E3D8',
                borderRadius: 14,
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
                boxShadow: '0 2px 8px rgba(22, 37, 27, 0.04)',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, background: '#EEF6EA', color: '#2F5233', padding: '2px 8px', borderRadius: 12 }}>
                    {test.domain}
                  </span>
                  <span style={{ fontSize: 10.5, fontWeight: 600, background: '#E6F4EA', color: '#2F6B3C', padding: '2px 8px', borderRadius: 12 }}>
                    {test.difficulty}
                  </span>
                  <span style={{ fontSize: 11, color: '#718078' }}>
                    Passing: {test.passingScore}%
                  </span>
                </div>

                <h4 style={{ fontSize: 17, fontWeight: 800, color: '#16251B', margin: '0 0 6px' }}>
                  {test.title}
                </h4>

                <p style={{ fontSize: 13, color: '#485563', margin: '0 0 12px', lineHeight: 1.5 }}>
                  {test.description}
                </p>

                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#718078', alignItems: 'center' }}>
                  <span>⏱ Duration: <strong>{test.duration}</strong></span>
                  <span>•</span>
                  <span>▤ Total Questions: <strong>{test.questionsCount} MCQs</strong></span>
                  <span>•</span>
                  <span>Verified Competencies: <strong>{test.competencies.join(', ')}</strong></span>
                </div>
              </div>

              <div>
                <button
                  className="trainee-btn-primary"
                  style={{ padding: '10px 24px', fontSize: 13.5, whiteSpace: 'nowrap' }}
                  onClick={() => handleStartAssessment(test)}
                >
                  Start Assessment →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed Tests Summary */}
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#16251B', margin: '0 0 16px' }}>
          Completed Assessments History
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {completedAssessments.map(item => (
            <div
              key={item.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #D6E3D8',
                borderRadius: 12,
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#2F6B3C', fontWeight: 700 }}>✓ Passed</span>
                  <span style={{ fontSize: 11, color: '#718078' }}>· Completed {item.completedDate}</span>
                </div>
                <strong style={{ fontSize: 14, color: '#16251B', display: 'block', marginBottom: 2 }}>
                  {item.title}
                </strong>
                <small style={{ fontSize: 11.5, color: '#485563' }}>
                  Score: <strong style={{ color: '#2F6B3C' }}>{item.score}%</strong> (Certificate Issued)
                </small>
              </div>

              <button
                className="trainee-btn-secondary"
                style={{ fontSize: 12, padding: '6px 14px' }}
                onClick={() => onNavigate('certificates')}
              >
                View Cert ↗
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 2: Active Assessment Mode (Live Exam with Ticking Timer)
  const activeTest = availableAssessments.find(t => t.id === activeTestId) || availableAssessments[0];

  return (
    <div className="trainee-assessment-container">
      {/* Assessment Top Header */}
      <div className="trainee-assessment-header-bar">
        <div>
          <button
            className="trainee-panel-link"
            style={{ marginBottom: 4 }}
            onClick={handleExitTest}
          >
            ← Exit Assessment
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#16251B', margin: 0 }}>
            {activeTest.title}
          </h2>
          <small style={{ color: '#485563', fontSize: 12 }}>
            Standard Competency Verification · {totalQuestions} Multiple Choice Questions
          </small>
        </div>

        <div className="trainee-assessment-timer">
          <span>⏱</span>
          <span>Time Remaining: <b>{formatTimer(secondsLeft)}</b></span>
        </div>
      </div>

      {/* Progress Strip */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#485563', marginBottom: 6 }}>
          <span>
            Question <strong style={{ color: '#16251B' }}>{currentQuestionIndex + 1}</strong> of {totalQuestions}
          </span>
          <span>
            Answered: <strong style={{ color: '#2F5233' }}>{answeredCount}</strong> / {totalQuestions}
          </span>
        </div>
        <div className="trainee-progress-bar-wrap" style={{ height: 6 }}>
          <div className="trainee-progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question Card */}
      <div className="trainee-question-card">
        <div className="trainee-question-header">
          QUESTION {currentQuestionIndex + 1} · SINGLE CHOICE
        </div>

        <div className="trainee-question-text">{question.question}</div>

        <div className="trainee-options-list">
          {question.options.map((optionText, optIdx) => {
            const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

            return (
              <div
                key={optIdx}
                className={`trainee-option-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(optIdx)}
              >
                <div
                  className="trainee-option-circle"
                  style={{
                    background: isSelected ? '#2F5233' : '#EEF6EA',
                    color: isSelected ? '#FFFFFF' : '#2F5233',
                    borderColor: isSelected ? '#2F5233' : '#D6E3D8'
                  }}
                >
                  {letter}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: '#16251B',
                    fontWeight: isSelected ? 600 : 400
                  }}
                >
                  {optionText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Navigation Actions */}
        <div className="trainee-question-actions">
          <button
            className="trainee-btn-secondary"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1 }}
          >
            ← Previous Question
          </button>

          <div style={{ display: 'flex', gap: 12 }}>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                className="trainee-btn-primary"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next Question →
              </button>
            ) : (
              <button
                className="trainee-btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #2F6B3C, #2F6B3C)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.4)'
                }}
                onClick={handleSubmit}
              >
                Submit Assessment Test ✓
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Quick Jump Dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
          padding: '16px',
          background: '#FFFFFF',
          border: '1px solid #D6E3D8',
          borderRadius: 12
        }}
      >
        {mockAssessmentQuestions.map((q, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined;
          const isCurrent = currentQuestionIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: isCurrent
                  ? '2px solid #2F5233'
                  : isAnswered
                  ? '1px solid #2F6B3C'
                  : '1px solid #D6E3D8',
                background: isCurrent
                  ? '#E6F4EA'
                  : isAnswered
                  ? '#EEF6EA'
                  : '#FFFFFF',
                color: isCurrent ? '#2F5233' : isAnswered ? '#2F6B3C' : '#485563',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
