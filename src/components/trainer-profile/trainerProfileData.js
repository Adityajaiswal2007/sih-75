export const initialTrainerData = {
  id: 'rahul-sharma',
  name: 'Dr. Rahul Sharma',
  avatarInitials: 'RS',
  designation: 'Senior Meteorology & Data Analytics Trainer',
  organization: 'National Weather Training Center',
  location: 'New Delhi, India',
  status: 'Active Trainer',
  approvalStatus: 'Approved',
  experienceYears: '8 Years',
  totalCourses: 12,
  totalTrainees: 486,
  successRate: '92%',
  averageRating: '4.8',
  specializations: [
    'Weather Data Analysis',
    'Meteorology',
    'Python',
    'Statistics',
    'Numerical Prediction',
    'GIS & Remote Sensing'
  ]
};

export const trainerStats = {
  courses: '12',
  trainees: '486',
  experience: '8 Years',
  successRate: '92%',
  averageRating: '4.8'
};

export const competencyMatchData = {
  score: 92,
  targetRole: 'Weather Data Analysis',
  description: 'This trainer closely matches the competencies required for Weather Data Analysis, demonstrating strong mastery across computational meteorology, statistical workflows, and operational forecast pipelines.',
  matchedCompetencies: [
    {
      name: 'Python',
      role: 'Core Scripting & Automation',
      target: 80,
      score: 92,
      matched: true
    },
    {
      name: 'Statistics',
      role: 'Atmospheric Data Modeling',
      target: 75,
      score: 88,
      matched: true
    },
    {
      name: 'Meteorology',
      role: 'Synoptic & Dynamic Physics',
      target: 85,
      score: 96,
      matched: true
    },
    {
      name: 'Weather Data Analysis',
      role: 'Radar & Satellite Workflows',
      target: 80,
      score: 94,
      matched: true
    }
  ]
};

export const aboutData = {
  bio: 'Dr. Rahul Sharma specializes in meteorological data analysis, forecasting workflows, and applied Python for weather analytics. He focuses on helping professionals translate technical concepts into practical forecasting and data-driven workflows.',
  extendedBio: 'With over 8 years of instructional leadership across national research organizations, Dr. Sharma has authored comprehensive curriculum modules in automated atmospheric processing, Python-based radar data interpretation, and quantitative weather prediction models. His teaching methodology bridges complex theoretical meteorological principles with deployable institutional workflows.',
  specializations: [
    'Weather Data Analysis',
    'Meteorology',
    'Python',
    'Statistics',
    'Satellite Data Processing',
    'Numerical Weather Prediction (NWP)'
  ],
  education: [
    {
      degree: 'Ph.D. in Atmospheric Sciences',
      institution: 'Indian Institute of Technology (IIT) Delhi',
      year: '2017'
    },
    {
      degree: 'M.Sc. in Meteorology',
      institution: 'National University of Atmospheric Studies',
      year: '2013'
    }
  ],
  languages: [
    { name: 'English', level: 'Fluent / Instructional' },
    { name: 'Hindi', level: 'Native / Instructional' }
  ]
};

export const competenciesList = [
  {
    name: 'Meteorology',
    score: 96,
    category: 'Meteorology & Forecasting',
    description: 'Dynamic atmospheric physics, synoptic chart analysis, boundary layer thermodynamics, and cyclogenesis modeling.',
    evaluationsCount: 148
  },
  {
    name: 'Weather Data Analysis',
    score: 94,
    category: 'Data & Analytics',
    description: 'GRIB/NetCDF processing, Doppler radar interpretation, anomaly detection, and gridded spatial transformations.',
    evaluationsCount: 182
  },
  {
    name: 'Python',
    score: 92,
    category: 'Data & Analytics',
    description: 'Applied scientific Python stack (NumPy, SciPy, Xarray, Cartopy, Pandas, Matplotlib, MetPy).',
    evaluationsCount: 210
  },
  {
    name: 'Data Analysis',
    score: 91,
    category: 'Data & Analytics',
    description: 'Exploratory data analysis, time-series decomposition, spatial interpolation, and automated metric dashboards.',
    evaluationsCount: 165
  },
  {
    name: 'Statistics',
    score: 88,
    category: 'Data & Analytics',
    description: 'Probabilistic forecasting, regression modeling, ensemble spread verification, and extreme value theory.',
    evaluationsCount: 134
  },
  {
    name: 'GIS',
    score: 72,
    category: 'Geospatial & Tools',
    description: 'Geographic information systems, vector/raster overlay, QGIS integrations, and spatial layer mapping.',
    evaluationsCount: 92
  },
  {
    name: 'Remote Sensing',
    score: 68,
    category: 'Geospatial & Tools',
    description: 'INSAT-3D/3DR satellite imagery interpretation, radiance calibration, and multispectral cloud masking.',
    evaluationsCount: 88
  }
];

export const experienceList = [
  {
    period: '2022 — Present',
    title: 'Senior Meteorology Trainer',
    organization: 'National Weather Training Center',
    location: 'New Delhi, India',
    isCurrent: true,
    description: 'Directs curriculum development and leads intensive capacity-building cohorts on numerical weather modeling and forecasting automation for institutional meteorologists.',
    highlights: [
      'Trained over 300+ operational meteorologists across 12 institutional workshops.',
      'Designed end-to-end Python pipeline labs for automated cyclone and severe storm tracking.',
      'Authored standardized competency assessments integrated into CapacityConnect.'
    ]
  },
  {
    period: '2019 — 2022',
    title: 'Data Analytics Instructor',
    organization: 'Climate Research Institute',
    location: 'Pune, India',
    isCurrent: false,
    description: 'Conducted intermediate and advanced training in high-volume atmospheric dataset processing, scientific Python libraries, and statistical validation of forecast models.',
    highlights: [
      'Developed 14 modular Jupyter notebooks utilized by 180+ trainees.',
      'Maintained a 94% positive student satisfaction rating over 3 consecutive academic years.',
      'Mentored junior research fellows in spatial climatology analysis.'
    ]
  },
  {
    period: '2017 — 2019',
    title: 'Research Associate',
    organization: 'Environmental Data Division',
    location: 'New Delhi, India',
    isCurrent: false,
    description: 'Focused on numerical weather prediction models, regional climate downscaling simulations, and high-performance computing data workflows.',
    highlights: [
      'Co-authored 4 peer-reviewed publications on extreme monsoon precipitation patterns.',
      'Automated quality-control pipelines for automated weather station (AWS) telemetry.'
    ]
  }
];

export const coursesList = [
  {
    id: 'c1',
    title: 'Python for Weather Analytics',
    level: 'Intermediate',
    duration: '6 Weeks',
    modulesCount: 12,
    traineesCount: 128,
    completionRate: 91,
    rating: 4.9,
    icon: 'code',
    description: 'Master practical Python workflows for processing meteorological data, radar arrays, and geospatial atmospheric variables.',
    tags: ['Python', 'Xarray', 'MetPy', 'NetCDF']
  },
  {
    id: 'c2',
    title: 'Weather Data Analysis',
    level: 'Advanced',
    duration: '8 Weeks',
    modulesCount: 14,
    traineesCount: 164,
    completionRate: 87,
    rating: 4.8,
    icon: 'database',
    description: 'Deep-dive into multi-sensor weather telemetry, Doppler radar datasets, synoptic pattern decomposition, and forecast validation.',
    tags: ['Weather Analysis', 'Doppler Radar', 'Forecasting']
  },
  {
    id: 'c3',
    title: 'Applied Meteorology',
    level: 'Intermediate',
    duration: '5 Weeks',
    modulesCount: 10,
    traineesCount: 94,
    completionRate: 93,
    rating: 4.9,
    icon: 'cloud',
    description: 'Practical atmospheric physics, thermodynamical diagrams (Tephigrams/Skew-T), convective storm initiation, and numerical models.',
    tags: ['Meteorology', 'Thermodynamics', 'Synoptic Physics']
  },
  {
    id: 'c4',
    title: 'GIS Fundamentals for Earth Sciences',
    level: 'Beginner',
    duration: '4 Weeks',
    modulesCount: 8,
    traineesCount: 100,
    completionRate: 89,
    rating: 4.7,
    icon: 'compass',
    description: 'Foundational spatial coordinate systems, digital elevation models, QGIS toolsets, and overlaying meteorological raster layers.',
    tags: ['GIS', 'Spatial Mapping', 'QGIS']
  }
];

export const performanceMetrics = {
  averageScore: 84,
  completionRate: 89,
  successRate: 92,
  averageFeedback: '4.8',
  monthlyTrend: [
    { month: 'Apr', score: 76, completion: 82, count: 68 },
    { month: 'May', score: 79, completion: 85, count: 74 },
    { month: 'Jun', score: 83, completion: 88, count: 82 },
    { month: 'Jul', score: 86, completion: 89, count: 91 },
    { month: 'Aug', score: 90, completion: 93, count: 85 },
    { month: 'Sep', score: 94, completion: 96, count: 86 }
  ]
};

export const traineeReviews = [
  {
    author: 'Ananya Verma',
    course: 'Weather Data Analysis',
    organization: 'Regional Meteorological Center',
    date: 'August 2026',
    rating: 5,
    quote: 'Clear explanations and excellent practical examples. Dr. Sharma helped our batch automate cyclone tracking datasets in Python, reducing analysis time by half.'
  },
  {
    author: 'Rohan Mehta',
    course: 'Python for Weather Analytics',
    organization: 'State Disaster Management Authority',
    date: 'July 2026',
    rating: 4,
    quote: 'Very useful sessions, especially the Python exercises and real-time radar data labs. The hands-on notebooks are now our everyday reference.'
  },
  {
    author: 'Priya Nair',
    course: 'Applied Meteorology',
    organization: 'Climate Science Division',
    date: 'June 2026',
    rating: 5,
    quote: 'The practical workflows made complex atmospheric physics concepts much easier to understand. His dedication to resolving learner questions was exceptional.'
  }
];

export const similarTrainersList = [
  {
    id: 'neha-verma',
    name: 'Dr. Neha Verma',
    avatarInitials: 'NV',
    designation: 'Earth Observation Specialist',
    organization: 'National Remote Sensing Center',
    skills: ['Remote Sensing', 'Satellite Imagery', 'GIS', 'Python'],
    matchScore: 89,
    coursesCount: 9,
    traineesCount: 340,
    rating: 4.8
  },
  {
    id: 'amit-kumar',
    name: 'Dr. Amit Kumar',
    avatarInitials: 'AK',
    designation: 'Scientific Computing Instructor',
    organization: 'Indian Meteorological Society',
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics'],
    matchScore: 86,
    coursesCount: 14,
    traineesCount: 512,
    rating: 4.7
  },
  {
    id: 'priya-mehta',
    name: 'Dr. Priya Mehta',
    avatarInitials: 'PM',
    designation: 'Geospatial Analytics Lead',
    organization: 'Earth Sciences Institute',
    skills: ['GIS & Remote Sensing', 'Spatial Analytics', 'Climate Data'],
    matchScore: 84,
    coursesCount: 8,
    traineesCount: 295,
    rating: 4.9
  }
];
