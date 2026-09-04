import React, { useState } from 'react';

export function TrainerContentView({ contentList, onOpenModal }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filtered = contentList.filter((item) => {
    const match = item.title.toLowerCase().includes(search.toLowerCase()) || item.course.toLowerCase().includes(search.toLowerCase());
    if (!match) return false;
    if (typeFilter === 'All') return true;
    return item.type === typeFilter;
  });

  return (
    <div className="portal-view-container">
      <div className="portal-page-header">
        <div className="portal-title-block">
          <h1>Learning Resources & Content Repository</h1>
          <p>Upload and distribute Jupyter notebooks, Doppler datasets, slide decks, and lab manuals.</p>
        </div>
        <div className="portal-header-actions">
          <button className="button small" onClick={() => onOpenModal('upload-content')}>+ Upload Resource</button>
        </div>
      </div>

      <div className="portal-filter-bar">
        <div className="portal-search-box">
          <span>⌕</span>
          <input
            placeholder="Search resources by title or linked course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="portal-tab-pills">
          {['All', 'Jupyter Notebook', 'PDF Document', 'Presentation', 'Video Lecture', 'Dataset (NetCDF)'].map((t) => (
            <button
              key={t}
              className={`portal-pill-btn ${typeFilter === t ? 'active' : ''}`}
              onClick={() => setTypeFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="portal-table-container">
        <table className="portal-table">
          <thead>
            <tr>
              <th>Resource Title</th>
              <th>Format</th>
              <th>Linked Course</th>
              <th>File Size</th>
              <th>Trainee Downloads</th>
              <th>Last Updated</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong style={{ color: '#f2f8ff', fontSize: 13 }}>{item.title}</strong>
                </td>
                <td>
                  <span className="portal-badge good" style={{ fontSize: 11 }}>
                    {item.type}
                  </span>
                </td>
                <td>
                  <span style={{ color: '#97bad9', fontSize: 12 }}>{item.course}</span>
                </td>
                <td>
                  <span style={{ color: '#cbdff5', fontSize: 12 }}>{item.size}</span>
                </td>
                <td>
                  <b style={{ color: '#38bdf8', fontSize: 13 }}>{item.downloads}</b>
                </td>
                <td>
                  <span style={{ color: '#7e9db8', fontSize: 12 }}>{item.updated}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="portal-btn-sm"
                    onClick={() => alert(`Downloading "${item.title}" (${item.size})`)}
                  >
                    Download 📥
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
