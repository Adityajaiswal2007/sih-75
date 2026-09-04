import React, { useState } from 'react';
import {
  X,
  Mail,
  Send,
  Zap,
  Cpu,
  BookOpen,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Star,
  Users,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  MapPin,
  Clock,
  Search
} from 'lucide-react';

export default function TrainerModals({
  activeModal,
  modalData,
  onClose,
  onToast,
  trainer,
  matchData,
  competencies,
  courses,
  reviews,
  onUpdateTrainer
}) {
  if (!activeModal) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window-wrapper" onClick={(e) => e.stopPropagation()}>
        {activeModal === 'contact' && (
          <ContactModal
            trainer={trainer}
            onClose={onClose}
            onToast={onToast}
          />
        )}

        {activeModal === 'request' && (
          <RequestTrainingModal
            trainer={trainer}
            onClose={onClose}
            onToast={onToast}
          />
        )}

        {activeModal === 'match-details' && (
          <MatchDetailsModal
            matchData={matchData}
            trainer={trainer}
            onClose={onClose}
          />
        )}

        {activeModal === 'assign-course' && (
          <AssignCourseModal
            trainer={trainer}
            courses={courses}
            onClose={onClose}
            onToast={onToast}
          />
        )}

        {activeModal === 'edit-profile' && (
          <EditProfileModal
            trainer={trainer}
            onClose={onClose}
            onToast={onToast}
            onUpdateTrainer={onUpdateTrainer}
          />
        )}

        {activeModal === 'all-competencies' && (
          <AllCompetenciesModal
            competencies={competencies}
            trainer={trainer}
            onClose={onClose}
          />
        )}

        {activeModal === 'course-details' && (
          <CourseDetailsModal
            course={modalData}
            trainer={trainer}
            onClose={onClose}
            onToast={onToast}
          />
        )}

        {activeModal === 'all-feedback' && (
          <AllFeedbackModal
            reviews={reviews}
            trainer={trainer}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

/* =======================================================
   1. Contact Trainer Modal
======================================================= */
function ContactModal({ trainer, onClose, onToast }) {
  const [formData, setFormData] = useState({
    name: 'Aditya Jaiswal',
    email: 'aditya.jaiswal@gov.in',
    subject: '',
    message: '',
    urgency: 'Standard'
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
      onToast(`Message sent successfully to ${trainer.name}.`);
    }, 600);
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="modal-title">Contact {trainer.name}</h3>
            <p className="modal-subtitle">Direct institutional messaging through CapacityConnect</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-row-two">
          <label className="form-group">
            <span className="form-label">Your Name</span>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </label>
          <label className="form-group">
            <span className="form-label">Official Email</span>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </label>
        </div>

        <label className="form-group">
          <span className="form-label">Subject</span>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Inquiry regarding Weather Analytics Workshop"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
        </label>

        <label className="form-group">
          <span className="form-label">Message</span>
          <textarea
            className="form-textarea"
            rows="4"
            placeholder="Write your message or inquiry details here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </label>

        <div className="modal-actions-bar">
          <button type="button" className="cc-btn cc-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cc-btn cc-btn-primary" disabled={sending}>
            {sending ? 'Sending...' : (
              <>
                <Send size={15} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =======================================================
   2. Request Training Modal
======================================================= */
function RequestTrainingModal({ trainer, onClose, onToast }) {
  const [reqForm, setReqForm] = useState({
    institution: 'India Meteorological Department (IMD)',
    programType: 'Online Training Cohort',
    traineeCount: '25-50 Trainees',
    preferredMonth: 'October 2026',
    notes: 'Looking for hands-on Python meteorological anomaly detection modules.'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onClose();
      onToast(`Training request for ${trainer.name} submitted successfully.`);
    }, 600);
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge zap-badge">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="modal-title">Request Training Cohort</h3>
            <p className="modal-subtitle">Initiate a capacity-building engagement with {trainer.name}</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <label className="form-group">
          <span className="form-label">Requesting Organization / Department</span>
          <input
            type="text"
            className="form-input"
            value={reqForm.institution}
            onChange={(e) => setReqForm({ ...reqForm, institution: e.target.value })}
            required
          />
        </label>

        <div className="form-row-two">
          <label className="form-group">
            <span className="form-label">Training Format</span>
            <select
              className="form-select"
              value={reqForm.programType}
              onChange={(e) => setReqForm({ ...reqForm, programType: e.target.value })}
            >
              <option>Online Training Cohort</option>
              <option>Institutional On-Site Workshop</option>
              <option>Full Course Delivery</option>
              <option>Assessment & Evaluation Support</option>
            </select>
          </label>

          <label className="form-group">
            <span className="form-label">Expected Trainees</span>
            <select
              className="form-select"
              value={reqForm.traineeCount}
              onChange={(e) => setReqForm({ ...reqForm, traineeCount: e.target.value })}
            >
              <option>10-25 Trainees</option>
              <option>25-50 Trainees</option>
              <option>50-100 Trainees</option>
              <option>100+ Trainees</option>
            </select>
          </label>
        </div>

        <label className="form-group">
          <span className="form-label">Target Timeframe</span>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Q4 2026 / November 2026"
            value={reqForm.preferredMonth}
            onChange={(e) => setReqForm({ ...reqForm, preferredMonth: e.target.value })}
          />
        </label>

        <label className="form-group">
          <span className="form-label">Specific Competency Objectives & Notes</span>
          <textarea
            className="form-textarea"
            rows="3"
            value={reqForm.notes}
            onChange={(e) => setReqForm({ ...reqForm, notes: e.target.value })}
          />
        </label>

        <div className="modal-actions-bar">
          <button type="button" className="cc-btn cc-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cc-btn cc-btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Request →'}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =======================================================
   3. Match Details Modal (Why 92% Match)
======================================================= */
function MatchDetailsModal({ matchData, trainer, onClose }) {
  return (
    <div className="modal-card wide-modal">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge match-badge">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="modal-title">Competency Match Intelligence Report</h3>
            <p className="modal-subtitle">AI-assisted discovery rationale for {matchData.targetRole}</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <div className="match-modal-body">
        <div className="match-modal-top-highlight">
          <div className="m-score-circle">
            <span>{matchData.score}%</span>
            <small>Compatibility</small>
          </div>
          <div className="m-score-explanation">
            <h4>Highest Match in Weather Analytics Domain</h4>
            <p>
              CapacityConnect evaluated 148 verified trainers against the institutional requirement for{' '}
              <b>Weather Data Analysis</b>. {trainer.name} scored <b>92%</b> based on verified competency mastery, past course completion rates (89%), and instructional evaluation scores.
            </p>
          </div>
        </div>

        <div className="match-criteria-breakdown">
          <h4 className="sub-heading">Competency Matrix Comparison</h4>
          <div className="criteria-table">
            <div className="table-row-head">
              <span>Required Area</span>
              <span>Baseline Requirement</span>
              <span>Trainer Score</span>
              <span>Match Status</span>
            </div>
            {matchData.matchedCompetencies.map((item) => (
              <div key={item.name} className="table-row-item">
                <span className="req-name"><b>{item.name}</b></span>
                <span className="req-target">{item.target}% Minimum</span>
                <span className="trainer-actual"><strong>{item.score}%</strong> Proficient</span>
                <span className="status-cell">
                  <CheckCircle2 size={13} className="text-teal" />
                  Optimal Match
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="match-factors-grid">
          <div className="factor-box">
            <ShieldCheck size={16} className="text-cyan" />
            <div>
              <strong>Domain Alignment</strong>
              <span>8+ years active training at National Weather Training Center</span>
            </div>
          </div>
          <div className="factor-box">
            <Users size={16} className="text-blue" />
            <div>
              <strong>Learner Retention</strong>
              <span>92% Trainee Success Rate across 486 learners</span>
            </div>
          </div>
        </div>

        <div className="modal-actions-bar">
          <button className="cc-btn cc-btn-primary full-width" onClick={onClose}>
            Done Exploring
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================================================
   4. Assign Course Modal (Admin View)
======================================================= */
function AssignCourseModal({ trainer, courses, onClose, onToast }) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.title || 'Weather Data Analysis');
  const [cohortName, setCohortName] = useState('IMD Batch 2026-Q4');
  const [startDate, setStartDate] = useState('2026-10-15');

  const handleAssign = (e) => {
    e.preventDefault();
    onClose();
    onToast(`Assigned course "${selectedCourse}" to ${trainer.name} for ${cohortName}.`);
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="modal-title">Assign Course to Trainer</h3>
            <p className="modal-subtitle">Administrator Allocation Control</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleAssign} className="modal-form">
        <label className="form-group">
          <span className="form-label">Select Course</span>
          <select
            className="form-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option>Numerical Weather Prediction (Advanced)</option>
            <option>Python for Weather Analytics (Intermediate)</option>
            <option>Weather Data Analysis (Advanced)</option>
            <option>Applied Meteorology (Intermediate)</option>
            <option>GIS & Satellite Data Processing (Intermediate)</option>
          </select>
        </label>

        <div className="form-row-two">
          <label className="form-group">
            <span className="form-label">Cohort / Batch Name</span>
            <input
              type="text"
              className="form-input"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
              required
            />
          </label>
          <label className="form-group">
            <span className="form-label">Target Start Date</span>
            <input
              type="date"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="cc-btn cc-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cc-btn cc-btn-primary">
            Confirm Course Assignment →
          </button>
        </div>
      </form>
    </div>
  );
}

/* =======================================================
   5. Edit Profile Modal (Admin View)
======================================================= */
function EditProfileModal({ trainer, onClose, onToast, onUpdateTrainer }) {
  const [formData, setFormData] = useState({
    name: trainer.name,
    designation: trainer.designation,
    organization: trainer.organization,
    location: trainer.location,
    experienceYears: trainer.experienceYears
  });

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateTrainer(formData);
    onClose();
    onToast('Trainer profile details updated successfully.');
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge">
            <Edit3 size={20} />
          </div>
          <div>
            <h3 className="modal-title">Edit Trainer Profile</h3>
            <p className="modal-subtitle">Modify institutional profile record</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSave} className="modal-form">
        <label className="form-group">
          <span className="form-label">Full Name & Title</span>
          <input
            type="text"
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>

        <label className="form-group">
          <span className="form-label">Designation / Role Title</span>
          <input
            type="text"
            className="form-input"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            required
          />
        </label>

        <div className="form-row-two">
          <label className="form-group">
            <span className="form-label">Organization</span>
            <input
              type="text"
              className="form-input"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
            />
          </label>
          <label className="form-group">
            <span className="form-label">Location</span>
            <input
              type="text"
              className="form-input"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </label>
        </div>

        <label className="form-group">
          <span className="form-label">Years of Experience</span>
          <input
            type="text"
            className="form-input"
            value={formData.experienceYears}
            onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
            required
          />
        </label>

        <div className="modal-actions-bar">
          <button type="button" className="cc-btn cc-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cc-btn cc-btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* =======================================================
   6. All Competencies Modal
======================================================= */
function AllCompetenciesModal({ competencies, trainer, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = competencies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-card wide-modal">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge">
            <Layers size={20} />
          </div>
          <div>
            <h3 className="modal-title">Complete Competency Map</h3>
            <p className="modal-subtitle">All verified skill domains for {trainer.name}</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <div className="modal-search-row">
        <div className="modal-search-box">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search competency, tool, or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="all-competencies-scroll-list">
        {filtered.map((comp) => (
          <div key={comp.name} className="modal-comp-item">
            <div className="comp-item-head">
              <div>
                <strong>{comp.name}</strong>
                <span className="m-cat-tag">{comp.category}</span>
              </div>
              <span className="m-comp-score">{comp.score}%</span>
            </div>
            <p className="m-comp-desc">{comp.description}</p>
            <div className="m-comp-bar-track">
              <div className="m-comp-bar-fill" style={{ width: `${comp.score}%` }} />
            </div>
            <div className="m-comp-meta">
              <span>Verified across {comp.evaluationsCount} trainee evaluations</span>
              <span className="text-teal">✓ Evaluated</span>
            </div>
          </div>
        ))}
      </div>

      <div className="modal-actions-bar">
        <button className="cc-btn cc-btn-primary full-width" onClick={onClose}>
          Close View
        </button>
      </div>
    </div>
  );
}

/* =======================================================
   7. Course Details Modal
======================================================= */
function CourseDetailsModal({ course, trainer, onClose, onToast }) {
  if (!course) return null;

  const handleEnroll = () => {
    onClose();
    onToast(`You have bookmarked course: "${course.title}".`);
  };

  return (
    <div className="modal-card">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge">
            <BookOpen size={20} />
          </div>
          <div>
            <h3 className="modal-title">{course.title}</h3>
            <p className="modal-subtitle">{course.level} Level • {course.duration}</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <div className="course-modal-content">
        <p className="course-modal-desc">{course.description}</p>

        <div className="course-modal-stats-grid">
          <div className="c-stat-box">
            <Users size={16} className="text-cyan" />
            <div>
              <strong>{course.traineesCount}</strong>
              <small>Enrolled Trainees</small>
            </div>
          </div>
          <div className="c-stat-box">
            <CheckCircle2 size={16} className="text-teal" />
            <div>
              <strong>{course.completionRate}%</strong>
              <small>Completion Rate</small>
            </div>
          </div>
          <div className="c-stat-box">
            <Star size={16} className="text-amber" />
            <div>
              <strong>{course.rating} / 5</strong>
              <small>Average Rating</small>
            </div>
          </div>
        </div>

        <div className="syllabus-preview-box">
          <h4>Curriculum Modules:</h4>
          <ul className="syllabus-list">
            <li>Module 1: Foundations and Atmospheric Data Formats (NetCDF, GRIB)</li>
            <li>Module 2: Automated Weather Analysis Pipelines with Python</li>
            <li>Module 3: Statistical Modeling, Anomaly Detection and Visualizations</li>
            <li>Module 4: Capstone Operational Forecasting Simulation</li>
          </ul>
        </div>

        <div className="modal-actions-bar">
          <button className="cc-btn cc-btn-outline" onClick={onClose}>
            Close
          </button>
          <button className="cc-btn cc-btn-primary" onClick={handleEnroll}>
            Bookmark Course
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================================================
   8. All Feedback Modal
======================================================= */
function AllFeedbackModal({ reviews, trainer, onClose }) {
  return (
    <div className="modal-card wide-modal">
      <div className="modal-header">
        <div className="modal-title-wrap">
          <div className="modal-icon-badge">
            <Star size={20} />
          </div>
          <div>
            <h3 className="modal-title">All Trainee Evaluations & Feedback</h3>
            <p className="modal-subtitle">Direct reviews for {trainer.name} (Average Rating: 4.8 / 5)</p>
          </div>
        </div>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
      </div>

      <div className="all-feedback-scroll-list">
        {reviews.map((r, i) => (
          <div key={i} className="modal-review-card">
            <div className="m-rev-top">
              <div className="stars-row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={13}
                    className={`star-svg ${s <= r.rating ? 'filled' : 'empty'}`}
                  />
                ))}
              </div>
              <span className="m-rev-date">{r.date}</span>
            </div>
            <p className="m-rev-quote">“{r.quote}”</p>
            <div className="m-rev-author">
              <strong>{r.author}</strong> — <span>{r.course}</span> ({r.organization})
            </div>
          </div>
        ))}
      </div>

      <div className="modal-actions-bar">
        <button className="cc-btn cc-btn-primary full-width" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
