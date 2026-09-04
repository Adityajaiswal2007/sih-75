import React from 'react';
import {
  Compass,
  Cpu,
  CheckSquare,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function TrainingApproach() {
  const approaches = [
    {
      step: '01',
      title: 'Practical Learning',
      subtitle: 'Real-world forecasting & meteorological data workflows',
      description: 'Learners work directly with live radar feeds, satellite image archives, and operational weather datasets to build hands-on competency rather than pure theoretical knowledge.',
      icon: Compass,
      color: 'blue'
    },
    {
      step: '02',
      title: 'Data-Driven Exercises',
      subtitle: 'Applied Python, statistical modeling & automation',
      description: 'Structured Jupyter notebook workflows, numerical scripts, and automated weather anomaly detection pipelines that reflect modern institutional practice.',
      icon: Cpu,
      color: 'cyan'
    },
    {
      step: '03',
      title: 'Assessment-Based Progress',
      subtitle: 'Continuous milestone checks & targeted feedback',
      description: 'Diagnostic assessments identify trainee skill gaps early, enabling tailored micro-interventions and continuous performance improvement.',
      icon: CheckSquare,
      color: 'teal'
    },
    {
      step: '04',
      title: 'Competency Development',
      subtitle: 'Direct alignment with institutional skill frameworks',
      description: 'Every lesson, quiz, and exercise connects directly to recognized national meteorological and data analytics capability matrices.',
      icon: TrendingUp,
      color: 'indigo'
    }
  ];

  return (
    <section className="profile-section-card approach-card" id="section-approach">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-badge">
            <Compass size={13} />
            METHODOLOGY & PEDAGOGY
          </span>
          <h2 className="section-title">Training Approach</h2>
          <p className="section-subtitle">
            How Dr. Rahul Sharma aligns instructional delivery with CapacityConnect's capacity-building mission.
          </p>
        </div>
      </div>

      <div className="approach-grid">
        {approaches.map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.step} className={`approach-card-item approach-${item.color}`}>
              <div className="approach-card-top">
                <span className="approach-number">{item.step}</span>
                <div className="approach-icon-box">
                  <IconComp size={20} />
                </div>
              </div>

              <h3 className="approach-title">{item.title}</h3>
              <span className="approach-subtitle">{item.subtitle}</span>
              <p className="approach-desc">{item.description}</p>

              <div className="approach-card-glow" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
