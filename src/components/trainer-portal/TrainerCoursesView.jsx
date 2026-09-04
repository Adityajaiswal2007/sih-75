import React, { useState } from 'react';

export function TrainerCoursesView({ courses, onOpenModal, onSelectCourse }) {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (activeTab === 'All') return true;
    return c.status === activeTab;
  });

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>My Courses & Curricula</h1>
          <p>Design, manage and monitor course modules, syllabus requirements and trainee progress.</p>
        </div>
        <div className="portal-header-actions">
          <button className="button small" onClick={() => onOpenModal('create-course')}>+ Create Course</button>
        </div>
      </div>

      <div className="portal-kpi-row">
        <div className="portal-kpi-card">
          <div className="kpi-icon">◈</div>
          <div className="kpi-label">Active Published Courses</div>
          <div className="kpi-val">{courses.filter((c) => c.status === 'Published').length}</div>
          <div className="kpi-note">Across 3 core disciplines</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">♟</div>
          <div className="kpi-label">Enrolled Trainees</div>
          <div className="kpi-val">{courses.reduce((acc, c) => acc + c.traineesCount, 0)}</div>
          <div className="kpi-note">+24 this month</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">▱</div>
          <div className="kpi-label">Average Completion</div>
          <div className="kpi-val">76%</div>
          <div className="kpi-note">+8% above benchmark</div>
        </div>
        <div className="portal-kpi-card">
          <div className="kpi-icon">✧</div>
          <div className="kpi-label">Average Course Rating</div>
          <div className="kpi-val">4.8 <small style={{ fontSize: 13, color: '#8daac4' }}>/ 5.0</small></div>
          <div className="kpi-note">Based on 142 verified reviews</div>
        </div>
      </div>

      <div className="portal-filter-bar">
        <div className="portal-search-box">
          <span>⌕</span>
          <input
            placeholder="Search by course title, category, or competency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="portal-tab-pills">
          {['All', 'Published', 'Draft'].map((tab) => (
            <button
              key={tab}
              className={`portal-pill-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} ({tab === 'All' ? courses.length : courses.filter((c) => c.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      <div className="portal-grid-cards">
        {filtered.map((course) => (
          <div className="portal-card" key={course.id}>
            <div>
              <div className="portal-card-top">
                <span className={`portal-badge ${course.status === 'Published' ? 'published' : 'draft'}`}>
                  {course.status}
                </span>
                <span style={{ fontSize: 11, color: '#8aa6c1' }}>{course.level}</span>
              </div>
              <h3>{course.title}</h3>
              <p className="card-desc">{course.description}</p>
              
              <div className="card-tags">
                {course.competencies?.map((comp) => (
                  <span key={comp}>{comp}</span>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8ba7c2', marginTop: 14 }}>
                <span>{course.traineesCount} Trainees Enrolled</span>
                <b>{course.completionRate}% Avg Completion</b>
              </div>
              <div className="portal-progress-track">
                <div className="portal-progress-fill" style={{ width: `${course.completionRate}%` }} />
              </div>
              <div className="portal-card-meta">
                <span>{course.modulesCount} Modules · Updated {course.lastUpdated}</span>
                <button
                  className="portal-btn-sm"
                  onClick={() => onOpenModal('create-assessment')}
                >
                  Add Quiz →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
