import React, { useState } from 'react';

export function TrainerPortalModals({ activeModal, modalData, onClose, onActionSuccess }) {
  if (!activeModal) return null;

  return (
    <div className="trainer-modal-backdrop" onClick={onClose}>
      <div className="trainer-modal" style={{ maxWidth: '540px', textAlign: 'left' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: '#9dbad8', fontSize: '22px', cursor: 'pointer' }}>✕</button>

        {activeModal === 'create-course' && (
          <CreateCourseModal onClose={onClose} onActionSuccess={onActionSuccess} />
        )}

        {activeModal === 'create-assessment' && (
          <CreateAssessmentModal onClose={onClose} onActionSuccess={onActionSuccess} />
        )}

        {activeModal === 'post-announcement' && (
          <PostAnnouncementModal onClose={onClose} onActionSuccess={onActionSuccess} />
        )}

        {activeModal === 'upload-content' && (
          <UploadContentModal onClose={onClose} onActionSuccess={onActionSuccess} />
        )}

        {activeModal === 'trainee-details' && (
          <TraineeDetailsModal trainee={modalData} onClose={onClose} onActionSuccess={onActionSuccess} />
        )}
      </div>
    </div>
  );
}

function CreateCourseModal({ onClose, onActionSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Meteorology',
    level: 'Intermediate',
    modulesCount: 8,
    description: '',
    competencies: 'Meteorology, Python, Data Analysis'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onActionSuccess(`Course "${formData.title}" created successfully as Draft!`, {
      ...formData,
      id: `crs-${Date.now()}`,
      traineesCount: 0,
      completionRate: 0,
      status: 'Draft',
      rating: 5.0,
      lastUpdated: 'Just now',
      competencies: formData.competencies.split(',').map((c) => c.trim())
    }, 'course');
    onClose();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#134773', display: 'grid', placeItems: 'center', color: '#38bdf8', fontSize: 20 }}>◈</div>
        <div>
          <h2 style={{ fontSize: 20, color: '#f3f8ff', margin: 0 }}>Create New Course</h2>
          <p style={{ fontSize: 12, color: '#8daac4', margin: 0 }}>Publish an institutional training module</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <div className="portal-form-group">
          <label>Course Title</label>
          <input
            placeholder="e.g. Advanced Radar Doppler Analysis"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="portal-form-group">
            <label>Domain Category</label>
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option>Meteorology</option>
              <option>Data Science</option>
              <option>Climate Science</option>
              <option>AI & ML</option>
              <option>GIS & Remote Sensing</option>
            </select>
          </div>
          <div className="portal-form-group">
            <label>Proficiency Level</label>
            <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
        <div className="portal-form-group">
          <label>Mapped Competencies (comma-separated)</label>
          <input
            placeholder="e.g. Synoptic Meteorology, MetPy, Doppler"
            value={formData.competencies}
            onChange={(e) => setFormData({ ...formData, competencies: e.target.value })}
          />
        </div>
        <div className="portal-form-group">
          <label>Course Syllabus & Description</label>
          <textarea
            rows={3}
            placeholder="Outline objectives, modules, and diagnostic goals..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
          <button type="button" className="button outline small" onClick={onClose}>Cancel</button>
          <button type="submit" className="button small">Create Course →</button>
        </div>
      </form>
    </div>
  );
}

function CreateAssessmentModal({ onClose, onActionSuccess }) {
  const [asmData, setAsmData] = useState({
    title: '',
    course: 'Numerical Weather Prediction',
    questionsCount: 15,
    duration: '45 mins',
    passingMark: 75,
    dueDate: '15 Oct 2026'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!asmData.title.trim()) return;
    onActionSuccess(`Assessment "${asmData.title}" published!`, {
      ...asmData,
      id: `asm-${Date.now()}`,
      attemptsCount: 0,
      avgScore: 0,
      passRate: 0,
      status: 'Published'
    }, 'assessment');
    onClose();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#134773', display: 'grid', placeItems: 'center', color: '#38bdf8', fontSize: 20 }}>▤</div>
        <div>
          <h2 style={{ fontSize: 20, color: '#f3f8ff', margin: 0 }}>Create Diagnostic Assessment</h2>
          <p style={{ fontSize: 12, color: '#8daac4', margin: 0 }}>Evaluate trainee competency progress</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <div className="portal-form-group">
          <label>Assessment Title</label>
          <input
            placeholder="e.g. Atmospheric Primitive Equations Quiz"
            value={asmData.title}
            onChange={(e) => setAsmData({ ...asmData, title: e.target.value })}
            required
          />
        </div>
        <div className="portal-form-group">
          <label>Target Course</label>
          <select value={asmData.course} onChange={(e) => setAsmData({ ...asmData, course: e.target.value })}>
            <option>Numerical Weather Prediction</option>
            <option>Weather Data Analysis with Python</option>
            <option>Climate Science Fundamentals</option>
            <option>Machine Learning for Weather Forecasting</option>
            <option>GIS & Satellite Remote Sensing for Hydrology</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <div className="portal-form-group">
            <label>Questions</label>
            <input type="number" min="5" max="100" value={asmData.questionsCount} onChange={(e) => setAsmData({ ...asmData, questionsCount: e.target.value })} />
          </div>
          <div className="portal-form-group">
            <label>Duration</label>
            <input value={asmData.duration} onChange={(e) => setAsmData({ ...asmData, duration: e.target.value })} />
          </div>
          <div className="portal-form-group">
            <label>Pass %</label>
            <input type="number" min="50" max="100" value={asmData.passingMark} onChange={(e) => setAsmData({ ...asmData, passingMark: e.target.value })} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
          <button type="button" className="button outline small" onClick={onClose}>Cancel</button>
          <button type="submit" className="button small">Publish Assessment →</button>
        </div>
      </form>
    </div>
  );
}

function PostAnnouncementModal({ onClose, onActionSuccess }) {
  const [ann, setAnn] = useState({ title: '', priority: 'Medium', audience: 'All Enrolled Trainees', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ann.title.trim()) return;
    onActionSuccess(`Announcement broadcasted to ${ann.audience}!`, {
      ...ann,
      id: `anc-${Date.now()}`,
      date: 'Just now'
    }, 'announcement');
    onClose();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#134773', display: 'grid', placeItems: 'center', color: '#38bdf8', fontSize: 20 }}>◌</div>
        <div>
          <h2 style={{ fontSize: 20, color: '#f3f8ff', margin: 0 }}>Broadcast Announcement</h2>
          <p style={{ fontSize: 12, color: '#8daac4', margin: 0 }}>Notify cohorts of assessments, schedule updates or notes</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <div className="portal-form-group">
          <label>Subject / Title</label>
          <input placeholder="e.g. Schedule Update for Atmospheric Lab" value={ann.title} onChange={(e) => setAnn({ ...ann, title: e.target.value })} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="portal-form-group">
            <label>Target Audience</label>
            <select value={ann.audience} onChange={(e) => setAnn({ ...ann, audience: e.target.value })}>
              <option>All Enrolled Trainees</option>
              <option>NWP Trainees</option>
              <option>Python Weather Cohort</option>
              <option>Climate Science Learners</option>
            </select>
          </div>
          <div className="portal-form-group">
            <label>Priority</label>
            <select value={ann.priority} onChange={(e) => setAnn({ ...ann, priority: e.target.value })}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <div className="portal-form-group">
          <label>Message Content</label>
          <textarea rows={4} placeholder="Type announcement details..." value={ann.content} onChange={(e) => setAnn({ ...ann, content: e.target.value })} required />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
          <button type="button" className="button outline small" onClick={onClose}>Cancel</button>
          <button type="submit" className="button small">Send Announcement →</button>
        </div>
      </form>
    </div>
  );
}

function UploadContentModal({ onClose, onActionSuccess }) {
  const [cnt, setCnt] = useState({ title: '', type: 'Jupyter Notebook', course: 'Weather Data Analysis with Python' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cnt.title.trim()) return;
    onActionSuccess(`Content "${cnt.title}" added to resource repository!`, {
      ...cnt,
      id: `cnt-${Date.now()}`,
      size: '2.4 MB',
      updated: 'Just now',
      downloads: 0
    }, 'content');
    onClose();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#134773', display: 'grid', placeItems: 'center', color: '#38bdf8', fontSize: 20 }}>▣</div>
        <div>
          <h2 style={{ fontSize: 20, color: '#f3f8ff', margin: 0 }}>Upload Learning Resource</h2>
          <p style={{ fontSize: 12, color: '#8daac4', margin: 0 }}>Share notebooks, slides, lab guides, or datasets</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <div className="portal-form-group">
          <label>Resource Title</label>
          <input placeholder="e.g. NetCDF Time Series Extraction Guide" value={cnt.title} onChange={(e) => setCnt({ ...cnt, title: e.target.value })} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="portal-form-group">
            <label>Resource Type</label>
            <select value={cnt.type} onChange={(e) => setCnt({ ...cnt, type: e.target.value })}>
              <option>Jupyter Notebook</option>
              <option>PDF Document</option>
              <option>Presentation</option>
              <option>Video Lecture</option>
              <option>Dataset (NetCDF)</option>
            </select>
          </div>
          <div className="portal-form-group">
            <label>Linked Course</label>
            <select value={cnt.course} onChange={(e) => setCnt({ ...cnt, course: e.target.value })}>
              <option>Weather Data Analysis with Python</option>
              <option>Numerical Weather Prediction</option>
              <option>Climate Science Fundamentals</option>
            </select>
          </div>
        </div>
        <div style={{ border: '2px dashed #26547e', borderRadius: 8, padding: 22, textAlign: 'center', background: '#07182c' }}>
          <span style={{ fontSize: 26, color: '#38bdf8' }}>☁</span>
          <p style={{ margin: '8px 0 0', color: '#97b8d8', fontSize: 12 }}>Drag & drop file or click to browse (Demo mock upload)</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
          <button type="button" className="button outline small" onClick={onClose}>Cancel</button>
          <button type="submit" className="button small">Save Resource →</button>
        </div>
      </form>
    </div>
  );
}

function TraineeDetailsModal({ trainee, onClose, onActionSuccess }) {
  if (!trainee) return null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, borderBottom: '1px solid #1c4263', paddingBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #1b62b3, #153966)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          {trainee.initials}
        </div>
        <div>
          <h2 style={{ fontSize: 20, color: '#f3f8ff', margin: 0 }}>{trainee.name}</h2>
          <p style={{ fontSize: 12, color: '#8daac4', margin: 0 }}>{trainee.role} · {trainee.organization}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        <div style={{ padding: 12, background: '#071b30', borderRadius: 8, border: '1px solid #1c4263' }}>
          <small style={{ color: '#7b9bb8', fontSize: 11 }}>Active Enrolled Course</small>
          <strong style={{ display: 'block', color: '#f0f7ff', fontSize: 13, marginTop: 4 }}>{trainee.course}</strong>
        </div>
        <div style={{ padding: 12, background: '#071b30', borderRadius: 8, border: '1px solid #1c4263' }}>
          <small style={{ color: '#7b9bb8', fontSize: 11 }}>Assessment Score</small>
          <strong style={{ display: 'block', color: '#34d399', fontSize: 18, marginTop: 4 }}>{trainee.assessmentScore}%</strong>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8daac4', marginBottom: 6 }}>
          <span>Course Completion</span>
          <b>{trainee.progress}% ({trainee.completedModules}/{trainee.totalModules} modules)</b>
        </div>
        <div className="portal-progress-track">
          <div className="portal-progress-fill" style={{ width: `${trainee.progress}%` }} />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ fontSize: 12, color: '#8bb0d4', margin: '0 0 8px', textTransform: 'uppercase' }}>Focus Diagnostic Areas</h4>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {trainee.strengths?.map((s) => (
            <span key={s} style={{ padding: '4px 8px', borderRadius: 4, background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', fontSize: 11, border: '1px solid rgba(52, 211, 153, 0.3)' }}>✓ {s}</span>
          ))}
          {trainee.needsHelp?.map((h) => (
            <span key={h} style={{ padding: '4px 8px', borderRadius: 4, background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', fontSize: 11, border: '1px solid rgba(248, 113, 113, 0.3)' }}>! Needs: {h}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button type="button" className="button outline small" onClick={onClose}>Close</button>
        <button
          type="button"
          className="button small"
          onClick={() => {
            onActionSuccess(`Feedback & targeted guidance note sent to ${trainee.name}!`);
            onClose();
          }}
        >
          Send Guidance Note →
        </button>
      </div>
    </div>
  );
}
