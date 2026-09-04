import React, { useState } from 'react';

export function TrainerAssessmentsView({ assessments, onOpenModal }) {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');

  const filtered = assessments.filter((a) => {
    const match = a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase());
    if (!match) return false;
    if (tab === 'All') return true;
    return a.status === tab;
  });

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Assessment Management & Grading</h1>
          <p>Create quizzes, coding challenges, diagnostic tests and monitor pass thresholds.</p>
        </div>
        <div className="portal-header-actions">
          <button className="button small" onClick={() => onOpenModal('create-assessment')}>+ Create Assessment</button>
        </div>
      </div>

      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">▤</div>
          <div className="kpi-label">Published Assessments</div>
          <div className="kpi-val">{assessments.filter((a) => a.status === 'Published').length}</div>
          <div className="kpi-note">Across active courses</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">♟</div>
          <div className="kpi-label">Total Graded Attempts</div>
          <div className="kpi-val">{assessments.reduce((acc, a) => acc + a.attemptsCount, 0)}</div>
          <div className="kpi-note">Automated evaluations</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✓</div>
          <div className="kpi-label">Average Pass Rate</div>
          <div className="kpi-val">91%</div>
          <div className="kpi-note">Institutional pass mark: 70%</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">◎</div>
          <div className="kpi-label">Average Score</div>
          <div className="kpi-val">81.6%</div>
          <div className="kpi-note">+6.4% improvement</div>
        </div>
      </div>

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
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((asm) => (
              <tr key={asm.id}>
                <td>
                  <strong style={{ color: '#f2f8ff', fontSize: 13 }}>{asm.title}</strong>
                  <small style={{ display: 'block', color: '#7ba0c1', fontSize: 11 }}>Due Date: {asm.dueDate}</small>
                </td>
                <td>
                  <span style={{ color: '#97b8d8', fontSize: 12 }}>{asm.course}</span>
                </td>
                <td>
                  <span style={{ color: '#cbdff5', fontSize: 12 }}>{asm.questionsCount} Questions</span>
                  <small style={{ display: 'block', color: '#7ba0c1', fontSize: 11 }}>Duration: {asm.duration}</small>
                </td>
                <td>
                  <b style={{ color: '#38bdf8', fontSize: 13 }}>{asm.attemptsCount}</b>
                </td>
                <td>
                  {asm.attemptsCount > 0 ? (
                    <div>
                      <strong style={{ color: '#34d399', fontSize: 13 }}>{asm.avgScore}% avg</strong>
                      <small style={{ display: 'block', color: '#7ba0c1', fontSize: 11 }}>{asm.passRate}% pass rate</small>
                    </div>
                  ) : (
                    <span style={{ color: '#7a96b0', fontSize: 12 }}>No attempts yet</span>
                  )}
                </td>
                <td>
                  <span className={`portal-badge ${asm.status === 'Published' ? 'published' : 'draft'}`}>
                    {asm.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="portal-btn-sm"
                    onClick={() => alert(`Reviewing question bank for "${asm.title}"`)}
                  >
                    Manage →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
