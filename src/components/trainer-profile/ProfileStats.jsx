import React from 'react';
import {
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Star,
  Award,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export default function ProfileStats({ stats }) {
  const statItems = [
    {
      id: 'courses',
      icon: BookOpen,
      value: stats.courses,
      label: 'Courses',
      sublabel: 'Active curriculum',
      color: 'blue'
    },
    {
      id: 'trainees',
      icon: Users,
      value: stats.trainees,
      label: 'Trainees',
      sublabel: 'Trained & mentored',
      color: 'cyan'
    },
    {
      id: 'experience',
      icon: Calendar,
      value: stats.experience,
      label: 'Experience',
      sublabel: 'Domain expertise',
      color: 'indigo'
    },
    {
      id: 'success',
      icon: TrendingUp,
      value: stats.successRate,
      label: 'Success Rate',
      sublabel: 'Competency mastery',
      color: 'teal'
    },
    {
      id: 'rating',
      icon: Star,
      value: stats.averageRating,
      label: 'Average Rating',
      sublabel: 'Based on 320+ reviews',
      color: 'amber'
    }
  ];

  return (
    <div className="profile-stats-grid">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className={`stat-card stat-${item.color}`}>
            <div className="stat-icon-box">
              <Icon size={20} />
            </div>
            <div className="stat-content">
              <div className="stat-value-row">
                <span className="stat-number">{item.value}</span>
                {item.id === 'rating' && <span className="stat-scale">/ 5</span>}
              </div>
              <span className="stat-label">{item.label}</span>
              <span className="stat-sublabel">{item.sublabel}</span>
            </div>
            <div className="stat-accent-bar" />
          </div>
        );
      })}
    </div>
  );
}
