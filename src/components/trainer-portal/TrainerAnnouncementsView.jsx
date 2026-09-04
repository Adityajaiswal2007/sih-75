import React from 'react';

export function TrainerAnnouncementsView({ announcements, onOpenModal }) {
  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Cohort Announcements & Broadcasts</h1>
          <p>Post updates, assessment dates, lab schedules, and office hours to enrolled trainees.</p>
        </div>
        <div className="portal-header-actions">
          <button className="button small" onClick={() => onOpenModal('post-announcement')}>+ Post Announcement</button>
        </div>
      </div>

      <div className="portal-announcements-feed">
        {announcements.map((ann) => (
          <div className="portal-announcement-card" key={ann.id}>
            <div className="portal-ann-top">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={`portal-badge ${ann.priority === 'High' ? 'urgent' : ann.priority === 'Medium' ? 'warning' : 'good'}`}>
                  {ann.priority} Priority
                </span>
                <h3>{ann.title}</h3>
              </div>
              <small>{ann.date}</small>
            </div>
            <p>{ann.content}</p>
            <div className="portal-ann-footer">
              <span>Audience: <b>{ann.audience}</b></span>
              <span style={{ color: '#38bdf8', cursor: 'pointer' }} onClick={() => alert('Announcement link copied')}>
                Copy Broadcast Link ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
