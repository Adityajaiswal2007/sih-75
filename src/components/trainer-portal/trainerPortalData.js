// Realistic static mock data for Dr. Rahul Sharma's Trainer Portal

export const initialCourses = [
  {
    id: 'crs-101',
    title: 'Numerical Weather Prediction',
    category: 'Meteorology',
    level: 'Advanced',
    traineesCount: 128,
    modulesCount: 12,
    completionRate: 68,
    status: 'Published',
    description: 'Comprehensive course covering barotropic and baroclinic models, spectral transform methods, and parameterization schemes for atmospheric flow.',
    rating: 4.9,
    lastUpdated: '2 hours ago',
    competencies: ['Meteorology', 'Numerical Weather Prediction', 'Atmospheric Modeling'],
    modules: [
      { num: 1, title: 'Atmospheric Dynamics & Primitive Equations', duration: '3.5 hrs', status: 'Active' },
      { num: 2, title: 'Finite Difference & Spectral Methods', duration: '4.0 hrs', status: 'Active' },
      { num: 3, title: 'Data Assimilation & Radar Doppler Integration', duration: '5.0 hrs', status: 'Active' },
      { num: 4, title: 'Boundary Layer Parameterization', duration: '3.0 hrs', status: 'Active' },
    ]
  },
  {
    id: 'crs-102',
    title: 'Weather Data Analysis with Python',
    category: 'Data Science',
    level: 'Intermediate',
    traineesCount: 84,
    modulesCount: 10,
    completionRate: 76,
    status: 'Published',
    description: 'Hands-on practical training utilizing Xarray, MetPy, and Cartopy for NetCDF climatological data processing and radar interpretation.',
    rating: 4.8,
    lastUpdated: 'Yesterday',
    competencies: ['Python', 'Weather Data Analysis', 'Data Analysis'],
    modules: [
      { num: 1, title: 'Xarray & NetCDF4 Gridded File Manipulation', duration: '4.0 hrs', status: 'Active' },
      { num: 2, title: 'MetPy Thermodynamic Soundings & Skew-T Charts', duration: '4.5 hrs', status: 'Active' },
      { num: 3, title: 'Cartopy Geospatial Map Projections', duration: '3.5 hrs', status: 'Active' },
    ]
  },
  {
    id: 'crs-103',
    title: 'Climate Science Fundamentals',
    category: 'Climate Science',
    level: 'Beginner',
    traineesCount: 102,
    modulesCount: 8,
    completionRate: 91,
    status: 'Published',
    description: 'Foundational principles of earth radiation balance, ocean-atmosphere coupling, greenhouse forcing, and monsoonal variability.',
    rating: 4.7,
    lastUpdated: '3 days ago',
    competencies: ['Climatology', 'Meteorology', 'Scientific Computing'],
    modules: [
      { num: 1, title: 'Earth Energy Balance & Radiative Equilibrium', duration: '2.5 hrs', status: 'Active' },
      { num: 2, title: 'Global General Circulation & Rossby Waves', duration: '3.0 hrs', status: 'Active' },
      { num: 3, title: 'El Niño-Southern Oscillation (ENSO) Dynamics', duration: '3.5 hrs', status: 'Active' },
    ]
  },
  {
    id: 'crs-104',
    title: 'Machine Learning for Weather Forecasting',
    category: 'AI & ML',
    level: 'Advanced',
    traineesCount: 45,
    modulesCount: 14,
    completionRate: 42,
    status: 'Draft',
    description: 'Applying convolutional neural networks and LSTM sequence models to precipitation nowcasting and extreme event anomaly detection.',
    rating: 4.9,
    lastUpdated: '1 week ago',
    competencies: ['Machine Learning', 'Python', 'Weather Data Analysis'],
    modules: [
      { num: 1, title: 'Temporal Weather Time Series with PyTorch', duration: '4.0 hrs', status: 'Draft' },
      { num: 2, title: 'Radar Echo Nowcasting with U-Net Architectures', duration: '5.5 hrs', status: 'Draft' },
    ]
  },
  {
    id: 'crs-105',
    title: 'GIS & Satellite Remote Sensing for Hydrology',
    category: 'GIS',
    level: 'Intermediate',
    traineesCount: 62,
    modulesCount: 9,
    completionRate: 58,
    status: 'Published',
    description: 'Satellite imagery analysis using QGIS, Google Earth Engine, and Sentinel-2 spectral indices for river basin precipitation mapping.',
    rating: 4.8,
    lastUpdated: '4 days ago',
    competencies: ['GIS', 'Remote Sensing', 'Data Analysis'],
    modules: [
      { num: 1, title: 'Multi-spectral Satellite Bands Calibration', duration: '3.0 hrs', status: 'Active' },
      { num: 2, title: 'NDVI & NDWI Hydrological Flood Delineation', duration: '4.0 hrs', status: 'Active' },
    ]
  }
];

export const initialTrainees = [
  {
    id: 'trn-001',
    name: 'Aditya Jaiswal',
    initials: 'AJ',
    email: 'aditya.j@imd.gov.in',
    course: 'Weather Data Analysis with Python',
    progress: 82,
    assessmentScore: 88,
    status: 'On Track',
    organization: 'IMD Pune Regional Center',
    role: 'Junior Meteorologist',
    joinedDate: '12 Jan 2026',
    completedModules: 8,
    totalModules: 10,
    strengths: ['Python', 'Data Wrangling'],
    needsHelp: ['Spatial Projections']
  },
  {
    id: 'trn-002',
    name: 'Rahul Verma',
    initials: 'RV',
    email: 'r.verma@incois.gov.in',
    course: 'Numerical Weather Prediction',
    progress: 45,
    assessmentScore: 61,
    status: 'Falling Behind',
    organization: 'INCOIS Hyderabad',
    role: 'Research Fellow',
    joinedDate: '28 Jan 2026',
    completedModules: 5,
    totalModules: 12,
    strengths: ['Physics Concepts'],
    needsHelp: ['Spectral Math', 'Fortran Interop']
  },
  {
    id: 'trn-003',
    name: 'Priya Sharma',
    initials: 'PS',
    email: 'priya.s@ncrmwf.gov.in',
    course: 'Climate Science Fundamentals',
    progress: 94,
    assessmentScore: 95,
    status: 'Excellent',
    organization: 'NCMRWF Noida',
    role: 'Senior Scientific Officer',
    joinedDate: '05 Jan 2026',
    completedModules: 8,
    totalModules: 8,
    strengths: ['Climatology', 'Scientific Rigor'],
    needsHelp: ['None']
  },
  {
    id: 'trn-004',
    name: 'Sneha Patel',
    initials: 'SP',
    email: 'sneha.patel@isro.gov.in',
    course: 'GIS & Satellite Remote Sensing for Hydrology',
    progress: 78,
    assessmentScore: 84,
    status: 'On Track',
    organization: 'ISRO SAC Ahmedabad',
    role: 'GIS Analyst',
    joinedDate: '15 Jan 2026',
    completedModules: 7,
    totalModules: 9,
    strengths: ['QGIS', 'Satellite Optics'],
    needsHelp: ['Python Automation']
  },
  {
    id: 'trn-005',
    name: 'Vikram Singh',
    initials: 'VS',
    email: 'vikram.singh@cwc.gov.in',
    course: 'Numerical Weather Prediction',
    progress: 32,
    assessmentScore: 48,
    status: 'Falling Behind',
    organization: 'Central Water Commission',
    role: 'Hydrology Engineer',
    joinedDate: '02 Feb 2026',
    completedModules: 3,
    totalModules: 12,
    strengths: ['Field Data'],
    needsHelp: ['Numerical Methods', 'Matrix Solvers']
  },
  {
    id: 'trn-006',
    name: 'Ananya Roy',
    initials: 'AR',
    email: 'ananya.roy@iitm.res.in',
    course: 'Weather Data Analysis with Python',
    progress: 90,
    assessmentScore: 92,
    status: 'Excellent',
    organization: 'IITM Pune',
    role: 'Doctoral Scholar',
    joinedDate: '10 Jan 2026',
    completedModules: 9,
    totalModules: 10,
    strengths: ['MetPy', 'Statistical Modeling'],
    needsHelp: ['Cartopy Styling']
  }
];

export const initialAssessments = [
  {
    id: 'asm-201',
    title: 'Python for Meteorology Diagnostic Test',
    course: 'Weather Data Analysis with Python',
    questionsCount: 20,
    attemptsCount: 126,
    avgScore: 81,
    passRate: 92,
    status: 'Published',
    duration: '45 mins',
    passingMark: 70,
    dueDate: '10 Sep 2026'
  },
  {
    id: 'asm-202',
    title: 'Atmospheric Dynamics & Primitive Equations',
    course: 'Numerical Weather Prediction',
    questionsCount: 15,
    attemptsCount: 84,
    avgScore: 76,
    passRate: 85,
    status: 'Published',
    duration: '60 mins',
    passingMark: 75,
    dueDate: '15 Sep 2026'
  },
  {
    id: 'asm-203',
    title: 'Climate Radiative Forcing Evaluation',
    course: 'Climate Science Fundamentals',
    questionsCount: 25,
    attemptsCount: 98,
    avgScore: 88,
    passRate: 96,
    status: 'Published',
    duration: '50 mins',
    passingMark: 70,
    dueDate: '20 Sep 2026'
  },
  {
    id: 'asm-204',
    title: 'Deep Learning & Radar Nowcasting Mid-Term',
    course: 'Machine Learning for Weather Forecasting',
    questionsCount: 18,
    attemptsCount: 0,
    avgScore: 0,
    passRate: 0,
    status: 'Draft',
    duration: '60 mins',
    passingMark: 75,
    dueDate: '01 Oct 2026'
  }
];

export const initialCompetencies = [
  { name: 'Meteorology', score: 84, benchmark: 75, status: 'Strong', description: 'Advanced synoptic and dynamical meteorology, atmospheric sounding analysis, and NWP parameterization.' },
  { name: 'Weather Data Analysis', score: 81, benchmark: 75, status: 'Strong', description: 'Handling big climate time-series, NetCDF4, GRIB2 datasets, and quality control routines.' },
  { name: 'Python for Atmospheric Science', score: 72, benchmark: 70, status: 'Developing', description: 'MetPy, Xarray, SciPy, Cartopy, and automated pipeline scripts.' },
  { name: 'GIS & Satellite Remote Sensing', score: 61, benchmark: 65, status: 'Developing', description: 'Doppler radar calibration, INSAT-3D/3DR product interpretation, QGIS spatial modeling.' },
  { name: 'Machine Learning in Climatology', score: 48, benchmark: 70, status: 'Needs Attention', description: 'Deep learning nowcasting architectures, random forests for bias correction.' },
  { name: 'Scientific Computing & HPC', score: 67, benchmark: 65, status: 'Developing', description: 'OpenMP/MPI parallelization, cluster job scheduling, GPU acceleration for weather codes.' }
];

export const initialContent = [
  { id: 'cnt-01', title: 'Atmospheric Physics & Soundings Lab Guide', type: 'PDF Document', size: '4.8 MB', course: 'Numerical Weather Prediction', updated: '2 hours ago', downloads: 142 },
  { id: 'cnt-02', title: 'MetPy Skew-T Plotting Workshop Notebook', type: 'Jupyter Notebook', size: '1.2 MB', course: 'Weather Data Analysis with Python', updated: 'Yesterday', downloads: 188 },
  { id: 'cnt-03', title: 'Satellite Doppler Radar Calibration Video', type: 'Video Lecture', size: '240 MB', course: 'GIS & Remote Sensing', updated: '3 days ago', downloads: 96 },
  { id: 'cnt-04', title: 'Radiative Equilibrium & ENSO Dynamics Slides', type: 'Presentation', size: '8.4 MB', course: 'Climate Science Fundamentals', updated: '5 days ago', downloads: 110 },
  { id: 'cnt-05', title: 'IMD High-Resolution NetCDF Test Dataset', type: 'Dataset (NetCDF)', size: '45.0 MB', course: 'Weather Data Analysis with Python', updated: '1 week ago', downloads: 165 }
];

export const initialAnnouncements = [
  { id: 'anc-01', title: 'Mid-term NWP Assessment Scheduled for Sep 15', priority: 'High', date: '2 hours ago', audience: 'All NWP Trainees', content: 'The theoretical and coding assessment on atmospheric primitive equations is scheduled for Tuesday, Sep 15 at 10:00 AM IST. Please ensure your Python environment is set up.' },
  { id: 'anc-02', title: 'New MetPy Jupyter Notebook Added to Module 3', priority: 'Medium', date: 'Yesterday', audience: 'Python Weather Cohort', content: 'A revised notebook demonstrating Skew-T soundings and automated CAPE/CIN calculation has been uploaded to the Content library.' },
  { id: 'anc-03', title: 'Optional Mentorship Office Hours on Friday', priority: 'Low', date: '3 days ago', audience: 'All Active Learners', content: 'Open Q&A office hours for trainees encountering challenges with Fortran wrappers or Cartopy map projections will take place this Friday at 4 PM.' }
];

export const initialFeedback = [
  {
    id: 'fdb-01',
    author: 'Aditya Jaiswal',
    avatar: 'AJ',
    role: 'Junior Meteorologist, IMD Pune',
    course: 'Weather Data Analysis with Python',
    rating: 5,
    date: '3 days ago',
    text: 'Dr. Sharma’s step-by-step walkthroughs using MetPy and Xarray made working with complex NetCDF files intuitive and highly applicable to our daily forecast duties.',
    helpful: 24
  },
  {
    id: 'fdb-02',
    author: 'Priya Sharma',
    avatar: 'PS',
    role: 'Senior Scientific Officer, NCMRWF',
    course: 'Climate Science Fundamentals',
    rating: 5,
    date: '1 week ago',
    text: 'Exceptionally structured course with rigorous institutional benchmarks. The diagnostic assessments gave immediate feedback on where our team needed reinforcement.',
    helpful: 31
  },
  {
    id: 'fdb-03',
    author: 'Ananya Roy',
    avatar: 'AR',
    role: 'Doctoral Scholar, IITM',
    course: 'Numerical Weather Prediction',
    rating: 5,
    date: '2 weeks ago',
    text: 'The pedagogical balance between theoretical primitive equations and real-world Doppler radar data assimilation is unparalleled in national training portals.',
    helpful: 18
  }
];

export const initialAnalytics = {
  monthlyTrends: [
    { month: 'Apr', completion: 62, avgScore: 78, trainees: 64 },
    { month: 'May', completion: 68, avgScore: 81, trainees: 72 },
    { month: 'Jun', completion: 74, avgScore: 80, trainees: 85 },
    { month: 'Jul', completion: 79, avgScore: 83, trainees: 96 },
    { month: 'Aug', completion: 82, avgScore: 85, trainees: 110 },
    { month: 'Sep', completion: 86, avgScore: 88, trainees: 128 }
  ],
  scoreDistribution: [
    { range: '90-100% (Distinction)', count: 98, pct: '40%' },
    { range: '75-89% (Proficient)', count: 112, pct: '45%' },
    { range: '60-74% (Developing)', count: 26, pct: '11%' },
    { range: '< 60% (At-Risk)', count: 10, pct: '4%' }
  ],
  topCompetenciesGrowth: [
    { name: 'Weather Data Analysis', uplift: '+18%', current: '81%' },
    { name: 'Atmospheric Modeling', uplift: '+14%', current: '84%' },
    { name: 'Python Automation', uplift: '+22%', current: '72%' }
  ]
};

export const initialFaqs = [
  { q: 'How are trainee competency benchmarks calculated?', a: 'Benchmarks are mapped against institutional standards (e.g., IMD/MoES competency frameworks). A 75% score represents the verified threshold for autonomous operational forecasting.' },
  { q: 'How do I schedule an assessment for an active cohort?', a: 'Navigate to the Assessments tab, click + Create Assessment, specify the associated course and questions, and set the duration and pass threshold.' },
  { q: 'Can I publish interactive Jupyter Notebooks for trainees?', a: 'Yes, in the Content tab, you can upload .ipynb notebooks, PDF references, and video walkthroughs directly linked to specific course modules.' },
  { q: 'What should I do if a trainee is marked "Falling Behind"?', a: 'Click on the Trainees tab, select the trainee card to view their diagnostic gaps, and use the Contact/Feedback trigger to assign targeted micro-modules or mentorship.' }
];
