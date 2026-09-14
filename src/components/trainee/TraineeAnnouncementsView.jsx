import React, { useState } from 'react';
import { mockAnnouncements } from './traineeData';

export default function TraineeAnnouncementsView({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Course', 'Assessment', 'Platform', 'Training'];

  const filteredAnnouncements = mockAnnouncements.filter(
    a => activeCategory === 'All' || a.category === activeCategory
  );

  return (
    <div className="trainee-announcements-view" style={{ maxWidth: 940, margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', color: '#2F5233', textTransform: 'uppercase' }}>
            OFFICIAL DISPATCH & NOTICES
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#16251B', margin: 0, letterSpacing: '-0.3px' }}>
          Platform Announcements
        </h1>
        <p style={{ color: '#485563', fontSize: 13.5, margin: '6px 0 0', lineHeight: 1.5 }}>
          Verified notifications, academic schedules, cohort guidelines, and training alerts from the CapacityConnect directorate.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 24,
          flexWrap: 'wrap',
          background: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #D6E3D8',
          boxShadow: '0 2px 8px rgba(22, 37, 27, 0.03)'
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: '#2F5233', marginRight: 4, textTransform: 'uppercase', letterSpacing: 0.4 }}>
          Filter By:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: activeCategory === cat ? '1px solid #2F5233' : '1px solid #D6E3D8',
              background: activeCategory === cat ? '#2F5233' : '#F9F9F6',
              color: activeCategory === cat ? '#FFFFFF' : '#485563'
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat} {cat === 'All' ? `(${mockAnnouncements.length})` : ''}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredAnnouncements.map(ann => (
          <div
            key={ann.id}
            style={{
              background: '#FFFFFF',
              border: ann.important ? '1.5px solid #B58B32' : '1px solid #D6E3D8',
              borderRadius: 14,
              padding: '24px',
              position: 'relative',
              boxShadow: ann.important
                ? '0 4px 16px rgba(181, 139, 50, 0.08)'
                : '0 2px 10px rgba(22, 37, 27, 0.04)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 20,
                    background: `${ann.categoryColor}15`,
                    color: ann.categoryColor,
                    border: `1px solid ${ann.categoryColor}35`
                  }}
                >
                  {ann.category}
                </span>
                {ann.important && (
                  <span
                    style={{
                      fontSize: 10.5,
                      background: '#FDF2F2',
                      color: '#B94A48',
                      border: '1px solid rgba(185, 74, 72, 0.3)',
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}
                  >
                    <span>⚠</span> Priority Alert
                  </span>
                )}
              </div>
              <span style={{ fontSize: 12.5, color: '#718078', fontWeight: 500 }}>
                📅 {ann.date}
              </span>
            </div>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#16251B', margin: '0 0 10px', lineHeight: 1.4 }}>
              {ann.title}
            </h3>

            <p style={{ fontSize: 13.5, color: '#485563', lineHeight: 1.65, margin: '0 0 16px' }}>
              {ann.summary}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12,
                color: '#485563',
                paddingTop: 12,
                borderTop: '1px solid #EEF2EE',
                flexWrap: 'wrap',
                gap: 8
              }}
            >
              <span>
                Issued by: <strong style={{ color: '#16251B', fontWeight: 600 }}>{ann.author}</strong>
              </span>
              {ann.category === 'Course' && (
                <button
                  style={{
                    background: '#E6F4EA',
                    color: '#2F5233',
                    border: '1px solid #D6E3D8',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                  onClick={() => onNavigate('catalog')}
                >
                  Explore Course Catalog →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
