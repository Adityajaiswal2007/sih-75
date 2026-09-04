import React from 'react';
import {
  User,
  Sparkles,
  GraduationCap,
  Globe2,
  FileCheck,
  Target,
  BookMarked,
  Layers
} from 'lucide-react';

export default function AboutSection({ aboutData }) {
  return (
    <section className="profile-section-card about-card" id="section-about">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge">
            <User size={13} />
            BIOGRAPHY & EXPERTISE
          </span>
          <h2 className="section-title">About the Trainer</h2>
        </div>
      </div>

      <div className="about-content-body">
        <p className="about-bio-text">
          {aboutData.bio}
        </p>

        <p className="about-sub-bio">
          {aboutData.extendedBio}
        </p>

        <div className="about-meta-grid">
          {/* Specialization List */}
          <div className="about-highlight-box">
            <div className="box-title">
              <Sparkles size={16} className="text-cyan" />
              <h3>Core Specializations</h3>
            </div>
            <div className="spec-tag-grid">
              {aboutData.specializations.map((spec, i) => (
                <div key={i} className="spec-badge">
                  <span className="spec-dot" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic & Professional Credentials */}
          <div className="about-highlight-box">
            <div className="box-title">
              <GraduationCap size={16} className="text-blue" />
              <h3>Academic Background</h3>
            </div>
            <ul className="credentials-list">
              {aboutData.education.map((edu, idx) => (
                <li key={idx} className="cred-item">
                  <strong>{edu.degree}</strong>
                  <span>{edu.institution} • {edu.year}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Languages & Focus */}
          <div className="about-highlight-box">
            <div className="box-title">
              <Globe2 size={16} className="text-teal" />
              <h3>Language & Delivery</h3>
            </div>
            <div className="language-pills">
              {aboutData.languages.map((lang, lIdx) => (
                <span key={lIdx} className="lang-pill">
                  {lang.name} <small>({lang.level})</small>
                </span>
              ))}
            </div>
            <div className="focus-area-note">
              <Target size={14} className="text-cyan" />
              <span>Focus: Institutional capacity development and operational forecasting automation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
