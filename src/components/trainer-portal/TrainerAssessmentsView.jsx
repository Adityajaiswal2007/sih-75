import React, { useState } from 'react';

const SAMPLE_PENDING_SUBMISSIONS = [
  {
    id: 'sub-1',
    traineeName: 'Aditya Jaiswal',
    traineeRole: 'Meteorologist-I (IMD Pune)',
    course: 'Numerical Weather Prediction',
    assessmentTitle: 'Atmospheric Primitive Equations & Staggered Grid Lab',
    submittedAt: 'Today, 14:20 IST',
    fileName: 'primitive_eq_staggered_grid.py',
    fileSize: '48.2 KB',
    physicsScore: 36,
    computationScore: 27,
    diagnosticsScore: 26,
    feedback: 'Accurate Arakawa C-grid implementation; Coriolis terms integrated correctly with Asselin time filter.'
  },
  {
    id: 'sub-2',
    traineeName: 'Pooja Sharma',
    traineeRole: 'Scientific Assistant (IMD Delhi)',
    course: 'Doppler Radar Meteorology',
    assessmentTitle: 'Doppler Velocity Dealiasing & Nyquist Algorithm',
    submittedAt: 'Yesterday, 18:45 IST',
    fileName: 'radar_dealiasing_4dvar.ipynb',
    fileSize: '1.2 MB',
    physicsScore: 38,
    computationScore: 29,
    diagnosticsScore: 28,
    feedback: 'Outstanding unfolding of dual-PRF aliased velocity fields in severe squall lines.'
  },
  {
    id: 'sub-3',
    traineeName: 'Vikram Singh',
    traineeRole: 'Junior Meteorologist (Kolkata)',
    course: 'Satellite Climatology',
    assessmentTitle: 'INSAT-3DR Multispectral Sounder Retrieval Analysis',
    submittedAt: '2 days ago',
    fileName: 'sounder_retrieval_insat3dr.nc.pdf',
    fileSize: '3.4 MB',
    physicsScore: 32,
    computationScore: 24,
    diagnosticsScore: 25,
    feedback: 'Good profile inversion; recommend comparing tropospheric dry air bias against ERA5 reanalysis.'
  }
];

export function TrainerAssessmentsView({ assessments, onOpenModal }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [showStatsCard, setShowStatsCard] = useState(true);
  const [evaluatingSub, setEvaluatingSub] = useState(null);
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showLocalToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filtered = assessments.filter((a) => {
    const match = a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase());
    if (!match) return false;
    if (tab === 'All') return true;
    return a.status === tab;
  });

  return (
    <div className="portal-view-container">
      {/* Page Header */}
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: '#16251B' }}>
            Assessment Management & Grading Console
          </h1>
          <p style={{ color: '#485563', fontSize: 13, marginTop: 4 }}>
            Design diagnostic tests, evaluate trainee submissions with rubrics, and analyze cohort grade statistics.
          </p>
        </div>
        <div className="portal-header-actions" style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            className="btn-trainer-secondary small"
            onClick={() => setShowQuizBuilder(true)}
          >
            ✍ Manual Quiz Builder
          </button>
          <button
            type="button"
            className="btn-trainer-primary small"
            onClick={() => onOpenModal('create-assessment')}
          >
            + New Assessment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">▤</div>
          <div className="kpi-label">Published Tests</div>
          <div className="kpi-val">{assessments.filter((a) => a.status === 'Published').length}</div>
          <div className="kpi-note">Across active courses</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">♟</div>
          <div className="kpi-label">Total Submissions</div>
          <div className="kpi-val">{assessments.reduce((acc, a) => acc + a.attemptsCount, 0) + 3}</div>
          <div className="kpi-note">3 awaiting evaluation</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✓</div>
          <div className="kpi-label">Cohort Pass Rate</div>
          <div className="kpi-val">91.4%</div>
          <div className="kpi-note">Institutional pass mark: 70%</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">◎</div>
          <div className="kpi-label">Cohort Mean Score</div>
          <div className="kpi-val">81.6%</div>
          <div className="kpi-note">Std Dev: ±6.8%</div>
        </div>
      </div>

      {/* STATISTICAL GRADE DISTRIBUTION CURVE PANEL */}
      {showStatsCard && (
        <section className="trainer-card-panel" style={{ marginBottom: 24, padding: '18px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>📊</span>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#16251B', margin: 0 }}>
                  Batch Grade Distribution & Standard Normal Distribution
                </h3>
              </div>
              <p style={{ fontSize: 12, color: '#557260', margin: '3px 0 0' }}>
                Statistical performance curve calculated across 486 trainees in the 2026 MoES Meteorological Cadre.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, background: '#EEF6EA', color: '#2F5233', padding: '4px 10px', borderRadius: 6, fontWeight: 700 }}>
                Gaussian Fit • R² = 0.94
              </span>
              <button
                type="button"
                className="trainer-notif-mark-btn"
                onClick={() => setShowStatsCard(false)}
                title="Hide curve"
              >
                Hide
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.4fr) minmax(240px, 1fr)', gap: 24, alignItems: 'center' }}>
            {/* SVG Gaussian Bell Curve & Bins */}
            <div style={{ background: '#F8FAF8', border: '1px solid #DCE6DF', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6C8675', marginBottom: 6 }}>
                <span>Frequency of Scores</span>
                <span>Normal Curve (μ = 81.6%, σ = 6.8%)</span>
              </div>
              <svg viewBox="0 0 400 130" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="gradeCurveGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F5233" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#2F5233" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Score Bins Background Bars */}
                {/* <60% */}
                <rect x="25" y="102" width="45" height="18" fill="#FCA5A5" rx="3" opacity="0.8" />
                <text x="47" y="96" fontSize="9" fontWeight="700" fill="#991B1B" textAnchor="middle">18</text>

                {/* 60-69% */}
                <rect x="80" y="82" width="45" height="38" fill="#FDE68A" rx="3" opacity="0.8" />
                <text x="102" y="76" fontSize="9" fontWeight="700" fill="#92400E" textAnchor="middle">42</text>

                {/* 70-79% */}
                <rect x="135" y="44" width="45" height="76" fill="#D2ECC9" rx="3" opacity="0.85" />
                <text x="157" y="38" fontSize="9" fontWeight="700" fill="#2F5233" textAnchor="middle">138</text>

                {/* 80-89% */}
                <rect x="190" y="20" width="45" height="100" fill="#A7C957" rx="3" opacity="0.9" />
                <text x="212" y="14" fontSize="9" fontWeight="800" fill="#1B4332" textAnchor="middle">194</text>

                {/* 90-100% */}
                <rect x="245" y="58" width="45" height="62" fill="#6EE7B7" rx="3" opacity="0.85" />
                <text x="267" y="52" fontSize="9" fontWeight="700" fill="#065F46" textAnchor="middle">94</text>

                {/* Gaussian Bell Curve Overlay Line */}
                <path
                  d="M 20 118 C 80 115, 120 70, 160 38 C 190 14, 230 18, 260 55 C 290 85, 330 112, 380 118"
                  fill="url(#gradeCurveGrad)"
                  stroke="#2F5233"
                  strokeWidth="2.5"
                />

                {/* Mean marker line */}
                <line x1="218" y1="10" x2="218" y2="120" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="218" y="128" fontSize="8.5" fontWeight="700" fill="#047857" textAnchor="middle">μ = 81.6%</text>

                {/* Axis Labels */}
                <text x="47" y="128" fontSize="8.5" fill="#6C8675" textAnchor="middle">&lt;60%</text>
                <text x="102" y="128" fontSize="8.5" fill="#6C8675" textAnchor="middle">60-69%</text>
                <text x="157" y="128" fontSize="8.5" fill="#6C8675" textAnchor="middle">70-79%</text>
                <text x="267" y="128" fontSize="8.5" fill="#6C8675" textAnchor="middle">90-100%</text>
              </svg>
            </div>

            {/* Statistical Summary Metrics Table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #DCE6DF', borderRadius: 10, padding: 12 }}>
                <span style={{ fontSize: 11, color: '#6C8675', display: 'block' }}>Cohort Median</span>
                <strong style={{ fontSize: 18, color: '#16251B', fontWeight: 800 }}>83.0%</strong>
                <small style={{ fontSize: 10, color: '#10B981', display: 'block', marginTop: 2 }}>Above benchmark</small>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #DCE6DF', borderRadius: 10, padding: 12 }}>
                <span style={{ fontSize: 11, color: '#6C8675', display: 'block' }}>Standard Deviation</span>
                <strong style={{ fontSize: 18, color: '#16251B', fontWeight: 800 }}>±6.8%</strong>
                <small style={{ fontSize: 10, color: '#485563', display: 'block', marginTop: 2 }}>Tight dispersion</small>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #DCE6DF', borderRadius: 10, padding: 12 }}>
                <span style={{ fontSize: 11, color: '#6C8675', display: 'block' }}>Distinction Tier (≥85%)</span>
                <strong style={{ fontSize: 18, color: '#2F5233', fontWeight: 800 }}>42.8%</strong>
                <small style={{ fontSize: 10, color: '#557260', display: 'block', marginTop: 2 }}>208 Candidates</small>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #DCE6DF', borderRadius: 10, padding: 12 }}>
                <span style={{ fontSize: 11, color: '#6C8675', display: 'block' }}>Remedial Action (&lt;70%)</span>
                <strong style={{ fontSize: 18, color: '#DC2626', fontWeight: 800 }}>8.6%</strong>
                <small style={{ fontSize: 10, color: '#DC2626', display: 'block', marginTop: 2 }}>42 Trainees flagged</small>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PENDING SUBMISSIONS QUEUE CALLOUT */}
      <div style={{ background: 'linear-gradient(135deg, rgba(47, 82, 51, 0.08) 0%, rgba(167, 201, 87, 0.12) 100%)', border: '1px solid rgba(47, 82, 51, 0.25)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#2F5233', color: '#FFFFFF', display: 'grid', placeItems: 'center', fontSize: 16 }}>
            📝
          </div>
          <div>
            <strong style={{ fontSize: 14, color: '#16251B', display: 'block' }}>
              Pending Practical Lab Submissions ({SAMPLE_PENDING_SUBMISSIONS.length})
            </strong>
            <span style={{ fontSize: 12, color: '#485563' }}>
              Submissions requiring faculty rubric grading and official competency endorsement.
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {SAMPLE_PENDING_SUBMISSIONS.map((sub) => (
            <button
              key={sub.id}
              type="button"
              className="btn-trainer-primary small"
              onClick={() => setEvaluatingSub(sub)}
            >
              Grade {sub.traineeName.split(' ')[0]} ({sub.fileName.split('.')[1].toUpperCase()}) →
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="portal-filter-bar">
        <div className="portal-search-box">
          <span>⌕</span>
          <input
            placeholder="Search assessments or associated course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="portal-tab-pills">
          {['All', 'Published', 'Draft'].map((t) => (
            <button
              key={t}
              className={`portal-pill-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t} ({t === 'All' ? assessments.length : assessments.filter((a) => a.status === t).length})
            </button>
          ))}
        </div>
      </div>

      {/* Assessments Table */}
      <div className="portal-table-container">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Assessment Title</th>
              <th>Linked Course</th>
              <th>Questions & Time</th>
              <th>Attempts</th>
              <th>Avg Score / Pass Rate</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Faculty Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((asm) => (
              <tr key={asm.id}>
                <td>
                  <strong style={{ color: '#16251B', fontSize: 13 }}>{asm.title}</strong>
                  <small style={{ display: 'block', color: '#485563', fontSize: 11 }}>Due Date: {asm.dueDate}</small>
                </td>
                <td>
                  <span style={{ color: '#485563', fontSize: 12 }}>{asm.course}</span>
                </td>
                <td>
                  <span style={{ color: '#16251B', fontSize: 12 }}>{asm.questionsCount} Questions</span>
                  <small style={{ display: 'block', color: '#485563', fontSize: 11 }}>Duration: {asm.duration}</small>
                </td>
                <td>
                  <b style={{ color: '#2F5233', fontSize: 13 }}>{asm.attemptsCount}</b>
                </td>
                <td>
                  {asm.attemptsCount > 0 ? (
                    <div>
                      <strong style={{ color: '#2F6B3C', fontSize: 13 }}>{asm.avgScore}% avg</strong>
                      <small style={{ display: 'block', color: '#485563', fontSize: 11 }}>{asm.passRate}% pass rate</small>
                    </div>
                  ) : (
                    <span style={{ color: '#485563', fontSize: 12 }}>No attempts yet</span>
                  )}
                </td>
                <td>
                  <span className={`portal-badge ${asm.status === 'Published' ? 'published' : 'draft'}`}>
                    {asm.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: 6 }}>
                    <button
                      type="button"
                      className="portal-btn-sm"
                      onClick={() => setEvaluatingSub(SAMPLE_PENDING_SUBMISSIONS[0])}
                      title="Grade Trainee Submissions"
                    >
                      Rubric Grade
                    </button>
                    <button
                      type="button"
                      className="portal-btn-sm"
                      onClick={() => setShowQuizBuilder(true)}
                      title="Edit Questions in Quiz Builder"
                    >
                      Quiz Editor
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RUBRIC GRADING CONSOLE MODAL */}
      {evaluatingSub && (
        <RubricGradingModal
          submission={evaluatingSub}
          onClose={() => setEvaluatingSub(null)}
          onGraded={(msg) => {
            setEvaluatingSub(null);
            showLocalToast(msg);
          }}
        />
      )}

      {/* MANUAL QUIZ BUILDER MODAL */}
      {showQuizBuilder && (
        <ManualQuizBuilderModal
          onClose={() => setShowQuizBuilder(false)}
          onSaveQuiz={(quiz) => {
            setShowQuizBuilder(false);
            showLocalToast(`Quiz "${quiz.title}" with ${quiz.questions.length} questions added to question bank!`);
          }}
        />
      )}

      {/* Local Toast */}
      {toastMsg && (
        <div className="trainer-toast-notification">
          <span>✓</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}

function RubricGradingModal({ submission, onClose, onGraded }) {
  const [physics, setPhysics] = useState(submission.physicsScore || 35);
  const [comp, setComp] = useState(submission.computationScore || 25);
  const [diag, setDiag] = useState(submission.diagnosticsScore || 25);
  const [feedbackText, setFeedbackText] = useState(submission.feedback || '');

  const totalScore = Number(physics) + Number(comp) + Number(diag);

  const getGradeTier = (score) => {
    if (score >= 90) return { label: 'Distinction (A+)', color: '#065F46', bg: '#D1FAE5' };
    if (score >= 80) return { label: 'First Class (A)', color: '#1E40AF', bg: '#DBEAFE' };
    if (score >= 70) return { label: 'Competent / Pass (B)', color: '#92400E', bg: '#FEF3C7' };
    return { label: 'Remedial Action Required (F)', color: '#991B1B', bg: '#FEE2E2' };
  };

  const gradeTier = getGradeTier(totalScore);

  const handleSave = (e) => {
    e.preventDefault();
    onGraded(`Evaluation submitted for ${submission.traineeName}! Score: ${totalScore}/100 (${gradeTier.label})`);
  };

  return (
    <div className="trainer-modal-backdrop" onClick={onClose}>
      <div className="trainer-modal" style={{ maxWidth: 620 }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '1px solid #DCE6DF', paddingBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: '#2F5233', color: '#FFFFFF', display: 'grid', placeItems: 'center', fontSize: 18 }}>
            ⚖
          </div>
          <div>
            <h2 style={{ fontSize: 18, color: '#16251B', margin: 0, fontWeight: 800 }}>
              Faculty Rubric Grading Console
            </h2>
            <p style={{ fontSize: 12, color: '#485563', margin: '2px 0 0' }}>
              Standard institutional scoring based on MoES Meteorological Assessment Rubric
            </p>
          </div>
        </div>

        {/* Submission Meta Card */}
        <div style={{ background: '#F8FAF8', border: '1px solid #DCE6DF', borderRadius: 10, padding: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <strong style={{ fontSize: 14, color: '#16251B' }}>{submission.traineeName}</strong>
              <div style={{ fontSize: 11, color: '#557260' }}>{submission.traineeRole}</div>
              <div style={{ fontSize: 12, color: '#1B4332', fontWeight: 600, marginTop: 4 }}>
                {submission.assessmentTitle}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, background: '#EEF6EA', color: '#2F5233', padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>
                File: {submission.fileName} ({submission.fileSize})
              </span>
              <div style={{ fontSize: 10, color: '#6C8675', marginTop: 4 }}>Submitted: {submission.submittedAt}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          {/* Rubric Sliders */}
          <div style={{ display: 'grid', gap: 14, marginBottom: 16 }}>
            {/* Criterion 1 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2EBE5', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <strong>1. Atmospheric & Physical Formulation</strong>
                <span style={{ fontWeight: 800, color: '#2F5233' }}>{physics} / 40 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={physics}
                onChange={(e) => setPhysics(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2F5233' }}
              />
              <small style={{ fontSize: 10.5, color: '#6C8675' }}>
                Governing differential equations, boundary conditions, and thermodynamic assumptions.
              </small>
            </div>

            {/* Criterion 2 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2EBE5', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <strong>2. Computational Code Quality & MetPy/NumPy Syntax</strong>
                <span style={{ fontWeight: 800, color: '#2F5233' }}>{comp} / 30 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={comp}
                onChange={(e) => setComp(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2F5233' }}
              />
              <small style={{ fontSize: 10.5, color: '#6C8675' }}>
                Vectorization, grid discretization efficiency, memory optimization, and unit consistency.
              </small>
            </div>

            {/* Criterion 3 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2EBE5', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <strong>3. Meteorological Diagnostic Interpretation</strong>
                <span style={{ fontWeight: 800, color: '#2F5233' }}>{diag} / 30 pts</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={diag}
                onChange={(e) => setDiag(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2F5233' }}
              />
              <small style={{ fontSize: 10.5, color: '#6C8675' }}>
                Synthesized charts, error diagnostics, and severe weather alert readiness.
              </small>
            </div>
          </div>

          {/* Realtime Grade Tally */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: gradeTier.bg, borderRadius: 10, marginBottom: 16 }}>
            <div>
              <span style={{ fontSize: 12, color: gradeTier.color, fontWeight: 700 }}>Total Rubric Score:</span>
              <strong style={{ fontSize: 20, color: gradeTier.color, marginLeft: 8 }}>{totalScore} / 100</strong>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: gradeTier.color, border: `1px solid ${gradeTier.color}`, padding: '4px 10px', borderRadius: 20 }}>
              {gradeTier.label}
            </span>
          </div>

          {/* Feedback Notes */}
          <div className="portal-form-group" style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#16251B' }}>
              Faculty Feedback & Pedagogical Guidance
            </label>
            <textarea
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Provide constructive feedback for the trainee..."
              required
              style={{ width: '100%', borderRadius: 8, border: '1px solid #DCE6DF', padding: 8, fontSize: 12 }}
            />
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button type="button" className="btn-trainer-secondary small" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-trainer-primary small">
              ✓ Endorse & Sign Grade ({totalScore}/100)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ManualQuizBuilderModal({ onClose, onSaveQuiz }) {
  const [quizTitle, setQuizTitle] = useState('Atmospheric Dynamics & Radar Inversion Quiz');
  const [targetCourse, setTargetCourse] = useState('Radar Meteorology');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      prompt: 'Under standard atmospheric refraction, the effective radius of the Earth used in radar ray-path calculations is:',
      optA: '4/3 × True Earth Radius (R_e)',
      optB: '1/2 × True Earth Radius (R_e)',
      optC: '2 × True Earth Radius (R_e)',
      optD: 'Identical to True Earth Radius',
      correctKey: 'A',
      explanation: 'Under standard atmospheric refractivity (dN/dh = -39 N/km), the ray curvature corresponds to 4/3 R_e (approx 8500 km).'
    }
  ]);

  const [currentPrompt, setCurrentPrompt] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctKey, setCorrectKey] = useState('A');
  const [explanation, setExplanation] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;

    const newQ = {
      id: Date.now(),
      prompt: currentPrompt,
      optA: optA || 'Option A description',
      optB: optB || 'Option B description',
      optC: optC || 'Option C description',
      optD: optD || 'Option D description',
      correctKey,
      explanation: explanation || 'Standard atmospheric formulation applies.'
    };

    setQuestions([...questions, newQ]);
    setCurrentPrompt('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="trainer-modal-backdrop" onClick={onClose}>
      <div className="trainer-modal" style={{ maxWidth: 700 }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, borderBottom: '1px solid #DCE6DF', paddingBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: '#2F5233', color: '#FFFFFF', display: 'grid', placeItems: 'center', fontSize: 18 }}>
            ✍
          </div>
          <div>
            <h2 style={{ fontSize: 18, color: '#16251B', margin: 0, fontWeight: 800 }}>
              Manual Question Bank & Quiz Builder
            </h2>
            <p style={{ fontSize: 12, color: '#485563', margin: '2px 0 0' }}>
              Create scientific multiple-choice items and diagnostic problem sets
            </p>
          </div>
        </div>

        {/* Quiz Meta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginBottom: 16 }}>
          <div className="portal-form-group">
            <label style={{ fontSize: 12, fontWeight: 700 }}>Quiz / Exam Title</label>
            <input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="e.g. Synoptic Meteorological Analysis Test"
              style={{ width: '100%', borderRadius: 8, border: '1px solid #DCE6DF', padding: 8, fontSize: 12 }}
            />
          </div>
          <div className="portal-form-group">
            <label style={{ fontSize: 12, fontWeight: 700 }}>Associated Course</label>
            <select
              value={targetCourse}
              onChange={(e) => setTargetCourse(e.target.value)}
              style={{ width: '100%', borderRadius: 8, border: '1px solid #DCE6DF', padding: 8, fontSize: 12 }}
            >
              <option>Radar Meteorology</option>
              <option>Numerical Weather Prediction</option>
              <option>Satellite Climatology</option>
              <option>Synoptic Meteorology</option>
            </select>
          </div>
        </div>

        {/* Add Question Form Box */}
        <div style={{ background: '#F8FAF8', border: '1px solid #DCE6DF', borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <h4 style={{ fontSize: 13, fontWeight: 800, color: '#1B4332', margin: '0 0 10px' }}>
            + Add New Multiple-Choice Question ({questions.length + 1})
          </h4>
          <div className="portal-form-group" style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, fontWeight: 700 }}>Question Stem / Problem Statement</label>
            <textarea
              rows={2}
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              placeholder="Enter meteorological physics or diagnostic question..."
              style={{ width: '100%', borderRadius: 8, border: '1px solid #DCE6DF', padding: 8, fontSize: 12 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700 }}>Option A</label>
              <input
                value={optA}
                onChange={(e) => setOptA(e.target.value)}
                placeholder="Option A"
                style={{ width: '100%', borderRadius: 6, border: '1px solid #DCE6DF', padding: 6, fontSize: 12 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700 }}>Option B</label>
              <input
                value={optB}
                onChange={(e) => setOptB(e.target.value)}
                placeholder="Option B"
                style={{ width: '100%', borderRadius: 6, border: '1px solid #DCE6DF', padding: 6, fontSize: 12 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700 }}>Option C</label>
              <input
                value={optC}
                onChange={(e) => setOptC(e.target.value)}
                placeholder="Option C"
                style={{ width: '100%', borderRadius: 6, border: '1px solid #DCE6DF', padding: 6, fontSize: 12 }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700 }}>Option D</label>
              <input
                value={optD}
                onChange={(e) => setOptD(e.target.value)}
                placeholder="Option D"
                style={{ width: '100%', borderRadius: 6, border: '1px solid #DCE6DF', padding: 6, fontSize: 12 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700 }}>Correct Option Key</label>
              <select
                value={correctKey}
                onChange={(e) => setCorrectKey(e.target.value)}
                style={{ width: '100%', borderRadius: 6, border: '1px solid #DCE6DF', padding: 6, fontSize: 12 }}
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700 }}>Scientific Explanation / Key Solution</label>
              <input
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Rationale for the correct answer..."
                style={{ width: '100%', borderRadius: 6, border: '1px solid #DCE6DF', padding: 6, fontSize: 12 }}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn-trainer-primary small"
            onClick={handleAddQuestion}
            disabled={!currentPrompt.trim()}
          >
            + Add Question to Pool
          </button>
        </div>

        {/* Question Bank Items List */}
        <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: 16, border: '1px solid #E2EBE5', borderRadius: 8, padding: 8 }}>
          <strong style={{ fontSize: 12, color: '#16251B', display: 'block', marginBottom: 6 }}>
            Configured Questions in this Quiz ({questions.length})
          </strong>
          {questions.map((q, idx) => (
            <div key={q.id} style={{ padding: '8px 10px', background: '#FFFFFF', border: '1px solid #E8F0EA', borderRadius: 6, marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#16251B' }}>
                  {idx + 1}. {q.prompt}
                </span>
                <small style={{ display: 'block', color: '#557260', fontSize: 10.5 }}>
                  Key: Option {q.correctKey} · {q.explanation}
                </small>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(q.id)}
                style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: 14, marginLeft: 8 }}
                title="Remove question"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" className="btn-trainer-secondary small" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-trainer-primary small"
            onClick={() => onSaveQuiz({ title: quizTitle, course: targetCourse, questions })}
          >
            Save to Question Bank ({questions.length} Questions) →
          </button>
        </div>
      </div>
    </div>
  );
}
