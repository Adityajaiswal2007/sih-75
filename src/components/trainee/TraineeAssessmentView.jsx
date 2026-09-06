import React, { useState, useEffect } from 'react';
import { mockAssessmentQuestions } from './traineeData';

export default function TraineeAssessmentView({ onNavigate, onCompleteAssessment }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(1104); // ~18m 24s mock timer

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = secs => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const question = mockAssessmentQuestions[currentQuestionIndex];
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

  return (
    <div className="trainee-assessment-container">
      {/* Assessment Top Header */}
      <div className="trainee-assessment-header-bar">
        <div>
          <button
            className="trainee-panel-link"
            style={{ marginBottom: 4 }}
            onClick={() => onNavigate('learning')}
          >
            ← Exit to Learning Modules
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>
            Python for Weather Analytics Assessment
          </h2>
          <small style={{ color: '#94A3B8', fontSize: 12 }}>
            Standard Competency Verification · 10 Multiple Choice Questions
          </small>
        </div>

        <div className="trainee-assessment-timer">
          <span>⏱</span>
          <span>Time Remaining: <b>{formatTimer(secondsLeft)}</b></span>
        </div>
      </div>

      {/* Progress Strip */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
          <span>
            Question <strong style={{ color: '#fff' }}>{currentQuestionIndex + 1}</strong> of {totalQuestions}
          </span>
          <span>
            Answered: <strong style={{ color: '#38BDF8' }}>{answeredCount}</strong> / {totalQuestions}
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
                <div className="trainee-option-circle">{letter}</div>
                <span style={{ fontSize: 14, color: isSelected ? '#fff' : '#CBD5E1', fontWeight: isSelected ? 600 : 400 }}>
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
                  background: 'linear-gradient(135deg, #22C55E, #16A34A)',
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
          background: '#0D1B2A',
          border: '1px solid #1E334A',
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
                  ? '2px solid #38BDF8'
                  : isAnswered
                  ? '1px solid #22C55E'
                  : '1px solid #1E334A',
                background: isCurrent
                  ? 'rgba(56, 189, 248, 0.2)'
                  : isAnswered
                  ? 'rgba(34, 197, 94, 0.15)'
                  : '#101F31',
                color: isCurrent ? '#38BDF8' : isAnswered ? '#4ADE80' : '#94A3B8',
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
