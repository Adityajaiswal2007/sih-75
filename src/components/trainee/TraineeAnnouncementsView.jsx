import React, { useState } from 'react';
import { mockAnnouncements } from './traineeData';

export default function TraineeAnnouncementsView({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Course', 'Assessment', 'Platform', 'Training'];

  const filteredAnnouncements = mockAnnouncements.filter(
    a => activeCategory === 'All' || a.category === activeCategory
  );

  return (
    <div className="trainee-announcements-view" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#38BDF8', textTransform: 'uppercase' }}>
            DIRECTORATE DISPATCH
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: 0 }}>Announcements</h1>
        <p style={{ color: '#94A3B8', fontSize: 13.5, margin: '4px 0 0' }}>
          Official notices, cohort updates, and assessment schedules from the academic board.
        </p>
      </div>

      {/* Categories */}
      <div className="trainee-catalog-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`trainee-filter-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredAnnouncements.map(ann => (
          <div
            key={ann.id}
            style={{
              background: '#0D1B2A',
              border: ann.important ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid #1E334A',
              borderRadius: 14,
              padding: '22px',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 12,
                    background: `${ann.categoryColor}20`,
                    color: ann.categoryColor,
                    border: `1px solid ${ann.categoryColor}40`
                  }}
                >
                  {ann.category}
                </span>
                {ann.important && (
                  <span style={{ fontSize: 10, background: '#EF4444', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                    Urgent Notice
                  </span>
                )}
              </div>
              <span style={{ fontSize: 12, color: '#64748B' }}>{ann.date}</span>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
              {ann.title}
            </h3>

            <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.6, margin: '0 0 14px' }}>
              {ann.summary}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, color: '#94A3B8' }}>
              <span>Issued by: <strong style={{ color: '#E2E8F0' }}>{ann.author}</strong></span>
              {ann.category === 'Course' && (
                <button
                  className="trainee-panel-link"
                  onClick={() => onNavigate('catalog')}
                >
                  View Course Catalog →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
