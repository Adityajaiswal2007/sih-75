// Static mock data for Trainee Portal adhering to CapacityConnect design specifications

export const traineeUser = {
  id: 'tr-001',
  name: 'Ananya Verma',
  avatar: 'AV',
  role: 'Trainee',
  organization: 'National Weather Training Center',
  designation: 'Meteorological Research Fellow',
  location: 'New Delhi, India',
  email: 'ananya.verma@imd.gov.in',
  mobile: '+91 98765 43210',
  level: 'Intermediate',
  profileCompletion: 92,
  interests: [
    'Meteorology',
    'Weather Data Analysis',
    'Python',
    'Data Analysis',
    'Remote Sensing',
    'GIS'
  ],
  goals: [
    'Improve technical forecasting skills',
    'Prepare for advanced domain assessments',
    'Develop professional competencies in NWP',
    'Master satellite data visualization tools',
    'Advance domain knowledge for climate research'
  ],
  stats: {
    enrolledCourses: 6,
    completedCourses: 3,
    learningHours: 42.5,
    averageScore: 87,
    competencyProgress: 74,
    certificatesEarned: 3
  }
};

export const traineeCompetencies = [
  { id: 'c1', name: 'Python for Meteorology', level: 92, status: 'Strong', category: 'Computing', change: '+6%' },
  { id: 'c2', name: 'Data Analysis & Wrangling', level: 84, status: 'Strong', category: 'Data Science', change: '+8%' },
  { id: 'c3', name: 'Weather Data Analysis', level: 76, status: 'Developing', category: 'Meteorology', change: '+12%', target: 90 },
  { id: 'c4', name: 'Statistical Climatology', level: 71, status: 'Developing', category: 'Analytics', change: '+4%', target: 85 },
  { id: 'c5', name: 'GIS & Spatial Mapping', level: 58, status: 'Developing', category: 'Geospatial', change: '+9%', target: 75 },
  { id: 'c6', name: 'Satellite Remote Sensing', level: 51, status: 'Needs Attention', category: 'Satellite', change: '+3%', target: 70 },
  { id: 'c7', name: 'Machine Learning for NWP', level: 43, status: 'Needs Attention', category: 'AI/ML', change: '+5%', target: 70 }
];

export const competencyHistory = [
  { month: 'Jan', score: 58 },
  { month: 'Feb', score: 61 },
  { month: 'Mar', score: 65 },
  { month: 'Apr', score: 68 },
  { month: 'May', score: 71 },
  { month: 'Jun', score: 74 }
];

export const skillGaps = [
  {
    id: 'sg-1',
    skill: 'Weather Data Analysis',
    current: 76,
    target: 90,
    gap: 14,
    priority: 'High',
    priorityColor: '#F59E0B',
    domain: 'Meteorology',
    impact: 'Required for Severe Weather Nowcasting certification and automated alert pipeline development.',
    recommendedCourse: 'Advanced Weather Data Analysis',
    recommendedCourseId: 'crs-002',
    recommendedTrainer: {
      name: 'Dr. Rahul Sharma',
      role: 'Meteorology & Data Analytics Specialist',
      match: 92,
      avatar: 'RS',
      experience: '14+ yrs'
    }
  },
  {
    id: 'sg-2',
    skill: 'Machine Learning for NWP',
    current: 43,
    target: 70,
    gap: 27,
    priority: 'High',
    priorityColor: '#EF4444',
    domain: 'AI/ML',
    impact: 'Prerequisite for automated radar precipitation estimation and convective storm classification.',
    recommendedCourse: 'Machine Learning for Meteorological Applications',
    recommendedCourseId: 'crs-005',
    recommendedTrainer: {
      name: 'Dr. Amit Kumar',
      role: 'Scientific Computing & ML Lead',
      match: 86,
      avatar: 'AK',
      experience: '11+ yrs'
    }
  },
  {
    id: 'sg-3',
    skill: 'GIS & Spatial Mapping',
    current: 58,
    target: 75,
    gap: 17,
    priority: 'Medium',
    priorityColor: '#38BDF8',
    domain: 'Geospatial',
    impact: 'Crucial for hazard vulnerability mapping and multi-layer meteorological GIS overlay analysis.',
    recommendedCourse: 'Advanced GIS for Climate Risk Mapping',
    recommendedCourseId: 'crs-004',
    recommendedTrainer: {
      name: 'Dr. Neha Verma',
      role: 'Remote Sensing & GIS Authority',
      match: 89,
      avatar: 'NV',
      experience: '12+ yrs'
    }
  },
  {
    id: 'sg-4',
    skill: 'Statistical Climatology',
    current: 71,
    target: 85,
    gap: 14,
    priority: 'Medium',
    priorityColor: '#38BDF8',
    domain: 'Analytics',
    impact: 'Enables long-term precipitation decadal variability studies and extreme event anomaly detection.',
    recommendedCourse: 'Statistical Climatology & Extremes Modeling',
    recommendedCourseId: 'crs-006',
    recommendedTrainer: {
      name: 'Dr. Rahul Sharma',
      role: 'Meteorology & Data Analytics Specialist',
      match: 92,
      avatar: 'RS',
      experience: '14+ yrs'
    }
  }
];

export const allCourses = [
  {
    id: 'crs-001',
    title: 'Python for Weather Analytics',
    category: 'Weather Data Analysis',
    domain: 'Python',
    difficulty: 'Intermediate',
    duration: '8 Hours',
    modulesCount: 6,
    enrolledCount: 128,
    rating: 4.8,
    reviewsCount: 34,
    instructor: 'Dr. Rahul Sharma',
    instructorAvatar: 'RS',
    instructorRole: 'Senior Scientist, IMD',
    enrolled: true,
    progress: 68,
    currentModule: 'Module 4: Data Cleaning & Visualization',
    lastAccessed: '2 hours ago',
    thumbnailIcon: '⚡',
    badge: 'In Progress',
    description: 'Master practical Python workflows, pandas, xarray, and cartopy for high-resolution meteorological analysis.',
    overview: 'This comprehensive course equips trainees with computational skills to ingest, clean, filter, analyze, and visualize multi-dimensional meteorological datasets including NetCDF, GRIB2, and radar raw files.',
    objectives: [
      'Ingest and parse NetCDF and GRIB2 meteorological formats',
      'Clean noisy sensor observations and atmospheric soundings',
      'Generate publication-ready thermodynamic and spatial visualizations with Cartopy',
      'Apply vectorized Python workflows for rapid grid computation',
      'Interpret statistical anomalies and synoptic patterns'
    ],
    prerequisites: ['Basic Python programming syntax', 'Fundamental atmospheric physics concepts'],
    competencies: ['Python for Meteorology', 'Weather Data Analysis', 'Statistical Climatology', 'Data Visualization'],
    modules: [
      { id: 'm1', title: 'Module 1: Introduction to Weather Data Structures', duration: '50 mins', status: 'Completed', type: 'Video & Lab' },
      { id: 'm2', title: 'Module 2: Ingesting GRIB2 & NetCDF Datasets with Xarray', duration: '1 hr 15 mins', status: 'Completed', type: 'Hands-on Lab' },
      { id: 'm3', title: 'Module 3: Quality Control & Automated Outlier Cleaning', duration: '1 hr 10 mins', status: 'Completed', type: 'Coding Exercise' },
      { id: 'm4', title: 'Module 4: Advanced Geospatial Plotting with Cartopy', duration: '1 hr 30 mins', status: 'In Progress', type: 'Interactive Notebook' },
      { id: 'm5', title: 'Module 5: Statistical Distribution of Temperature & Winds', duration: '1 hr 20 mins', status: 'Locked', type: 'Lecture & Practice' },
      { id: 'm6', title: 'Module 6: Capstone Weather Analytics Assessment', duration: '45 mins', status: 'Locked', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-002',
    title: 'Advanced Weather Data Analysis',
    category: 'Weather Data Analysis',
    domain: 'Meteorology',
    difficulty: 'Advanced',
    duration: '10 Hours',
    modulesCount: 7,
    enrolledCount: 94,
    rating: 4.9,
    reviewsCount: 28,
    instructor: 'Dr. Rahul Sharma',
    instructorAvatar: 'RS',
    instructorRole: 'Senior Scientist, IMD',
    enrolled: true,
    progress: 42,
    currentModule: 'Module 3: Doppler Radar Reflectivity Algorithms',
    lastAccessed: 'Yesterday',
    thumbnailIcon: '🌪',
    badge: 'In Progress',
    description: 'Deep dive into Doppler radar algorithms, satellite precipitation estimation, and numerical weather model validation.',
    overview: 'Designed for meteorological officers and researchers seeking mastery in multi-sensor data fusion, synoptic diagnosis, and extreme rainfall forecasting frameworks.',
    objectives: [
      'Calibrate Doppler weather radar reflectivity and velocity azimuth displays',
      'Merge INSAT-3D infrared imagery with ground rain gauges',
      'Validate numerical weather prediction outputs against radiosonde soundings',
      'Automate convective storm tracking and nowcasting warnings'
    ],
    prerequisites: ['Python for Weather Analytics', 'Synoptic Meteorology fundamentals'],
    competencies: ['Weather Data Analysis', 'Radar Meteorology', 'Satellite Remote Sensing'],
    modules: [
      { id: 'm2-1', title: 'Module 1: Synoptic Diagnostics Fundamentals', duration: '1 hr', status: 'Completed', type: 'Video' },
      { id: 'm2-2', title: 'Module 2: Radar Polarimetry & Dual-Doppler Concepts', duration: '1 hr 30 mins', status: 'Completed', type: 'Lab' },
      { id: 'm2-3', title: 'Module 3: Doppler Radar Reflectivity Algorithms', duration: '1 hr 45 mins', status: 'In Progress', type: 'Interactive' },
      { id: 'm2-4', title: 'Module 4: Satellite Rain Estimation Products', duration: '1 hr 30 mins', status: 'Locked', type: 'Reading & Lab' },
      { id: 'm2-5', title: 'Module 5: Numerical Model Skill Scoring & Verification', duration: '1 hr 15 mins', status: 'Locked', type: 'Notebook' },
      { id: 'm2-6', title: 'Module 6: Severe Weather Automated Nowcasting', duration: '1 hr 30 mins', status: 'Locked', type: 'Case Study' },
      { id: 'm2-7', title: 'Module 7: Comprehensive Diagnostic Assessment', duration: '45 mins', status: 'Locked', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-003',
    title: 'Numerical Weather Prediction Systems',
    category: 'Meteorology',
    domain: 'Meteorology',
    difficulty: 'Intermediate',
    duration: '12 Hours',
    modulesCount: 8,
    enrolledCount: 162,
    rating: 4.8,
    reviewsCount: 45,
    instructor: 'Dr. Rahul Sharma',
    instructorAvatar: 'RS',
    instructorRole: 'Senior Scientist, IMD',
    enrolled: true,
    progress: 100,
    currentModule: 'Course Completed',
    lastAccessed: '3 days ago',
    thumbnailIcon: '🌐',
    badge: 'Completed',
    description: 'Comprehensive study of governing dynamical equations, parameterizations, and WRF model configuration.',
    overview: 'Learn how modern numerical weather prediction systems work from hydrodynamic governing equations to planetary boundary layer physics and HPC parallel runs.',
    objectives: [
      'Understand primitive atmospheric equations and finite difference methods',
      'Configure and run nested WRF (Weather Research & Forecasting) models',
      'Analyze ensemble forecasting spreads and probability distributions',
      'Generate automated synoptic surface charts and thermodynamic soundings'
    ],
    prerequisites: ['Vector Calculus', 'Atmospheric Thermodynamics'],
    competencies: ['Numerical Weather Prediction', 'Atmospheric Physics', 'Scientific Computing'],
    modules: [
      { id: 'm3-1', title: 'Module 1: Atmospheric Dynamics & Governing Equations', duration: '1 hr 30 mins', status: 'Completed', type: 'Lecture' },
      { id: 'm3-2', title: 'Module 2: Grid Systems, Discretization & Time Integration', duration: '1 hr 45 mins', status: 'Completed', type: 'Lab' },
      { id: 'm3-3', title: 'Module 3: Boundary Layer & Cumulus Parameterization', duration: '2 hrs', status: 'Completed', type: 'Lecture' },
      { id: 'm3-4', title: 'Module 4: WRF Preprocessing & Boundary Conditions', duration: '2 hrs', status: 'Completed', type: 'Hands-on Lab' },
      { id: 'm3-5', title: 'Module 5: Ensemble Prediction & Probabilistic Forecasting', duration: '1 hr 30 mins', status: 'Completed', type: 'Lab' },
      { id: 'm3-6', title: 'Module 6: Model Verification with Radiosondes & Radar', duration: '1 hr 45 mins', status: 'Completed', type: 'Case Study' },
      { id: 'm3-7', title: 'Module 7: HPC Job Scheduling & Post-Processing', duration: '1 hr', status: 'Completed', type: 'Interactive' },
      { id: 'm3-8', title: 'Module 8: Final Certification Examination', duration: '1 hr', status: 'Completed', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-004',
    title: 'GIS Fundamentals for Climate Risk Mapping',
    category: 'GIS',
    domain: 'GIS',
    difficulty: 'Beginner',
    duration: '6 Hours',
    modulesCount: 5,
    enrolledCount: 140,
    rating: 4.7,
    reviewsCount: 31,
    instructor: 'Dr. Neha Verma',
    instructorAvatar: 'NV',
    instructorRole: 'Head of Geospatial Systems, SAC',
    enrolled: true,
    progress: 100,
    currentModule: 'Course Completed',
    lastAccessed: '1 week ago',
    thumbnailIcon: '🗺',
    badge: 'Completed',
    description: 'Spatial analysis and cartographic representation of climate vulnerabilities using QGIS and Python GDAL.',
    overview: 'Build foundational capabilities in handling coordinate reference systems, digital elevation models, raster slope analysis, and inundation zone vector mapping.',
    objectives: [
      'Master CRS reprojection, vector geoprocessing, and raster algebra',
      'Map flood and cyclone surge inundation zones',
      'Incorporate socioeconomic vulnerability data with meteorological grids',
      'Export production-quality maps for disaster management authorities'
    ],
    prerequisites: ['Basic computer operations', 'Interest in cartography'],
    competencies: ['GIS & Spatial Mapping', 'Cartographic Visualization', 'Disaster Risk Mapping'],
    modules: [
      { id: 'm4-1', title: 'Module 1: Principles of Coordinate Systems & Projections', duration: '1 hr', status: 'Completed', type: 'Lecture' },
      { id: 'm4-2', title: 'Module 2: QGIS Interface & Vector Geoprocessing', duration: '1 hr 15 mins', status: 'Completed', type: 'Hands-on Lab' },
      { id: 'm4-3', title: 'Module 3: Raster Operations & Topographic Indices', duration: '1 hr 30 mins', status: 'Completed', type: 'Lab' },
      { id: 'm4-4', title: 'Module 4: Multi-criteria Risk Modeling', duration: '1 hr 15 mins', status: 'Completed', type: 'Project' },
      { id: 'm4-5', title: 'Module 5: Practical Risk Atlas Assessment', duration: '45 mins', status: 'Completed', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-005',
    title: 'Climate Science Fundamentals',
    category: 'Climate Science',
    domain: 'Climate Science',
    difficulty: 'Beginner',
    duration: '7 Hours',
    modulesCount: 5,
    enrolledCount: 210,
    rating: 4.9,
    reviewsCount: 52,
    instructor: 'Dr. Neha Verma',
    instructorAvatar: 'NV',
    instructorRole: 'Senior Climate Researcher, MoES',
    enrolled: true,
    progress: 100,
    currentModule: 'Course Completed',
    lastAccessed: '2 weeks ago',
    thumbnailIcon: '🌱',
    badge: 'Completed',
    description: 'Earth energy balance, monsoon dynamics, teleconnections (ENSO, IOD), and long-term climate projections.',
    overview: 'Essential institutional orientation covering atmospheric radiation, greenhouse forcing, oceanic circulation, and IPCC assessment report frameworks.',
    objectives: [
      'Understand the global radiation budget and greenhouse mechanisms',
      'Analyze Indian summer monsoon variability and teleconnection indices',
      'Evaluate climate projections using CMIP6 multi-model ensembles',
      'Articulate climate adaptation strategies for regional planning'
    ],
    prerequisites: ['High school physics and geography'],
    competencies: ['Climate Science Fundamentals', 'Atmospheric Physics', 'Climate Teleconnections'],
    modules: [
      { id: 'm5-1', title: 'Module 1: Global Energy Balance & Radiative Forcing', duration: '1 hr 15 mins', status: 'Completed', type: 'Lecture' },
      { id: 'm5-2', title: 'Module 2: Atmospheric & Ocean Circulation Patterns', duration: '1 hr 30 mins', status: 'Completed', type: 'Lecture' },
      { id: 'm5-3', title: 'Module 3: Monsoon Dynamics & ENSO Teleconnections', duration: '1 hr 45 mins', status: 'Completed', type: 'Case Study' },
      { id: 'm5-4', title: 'Module 4: CMIP6 Climate Scenarios & Scenarios Analysis', duration: '1 hr 30 mins', status: 'Completed', type: 'Lab' },
      { id: 'm5-5', title: 'Module 5: Climate Literacy Examination', duration: '45 mins', status: 'Completed', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-006',
    title: 'Machine Learning for Meteorological Applications',
    category: 'Machine Learning',
    domain: 'Machine Learning',
    difficulty: 'Advanced',
    duration: '14 Hours',
    modulesCount: 8,
    enrolledCount: 88,
    rating: 4.9,
    reviewsCount: 22,
    instructor: 'Dr. Amit Kumar',
    instructorAvatar: 'AK',
    instructorRole: 'AI/ML Lead Scientist, CDAC',
    enrolled: false,
    progress: 0,
    currentModule: 'Not Started',
    lastAccessed: null,
    thumbnailIcon: '🤖',
    badge: 'Recommended',
    description: 'Convolutional neural networks and LSTM models for nowcasting extreme rainfall and temperature anomaly prediction.',
    overview: 'State-of-the-art training on applying deep learning architectures to spatio-temporal radar sequences, satellite cloud imagery, and weather station time series.',
    objectives: [
      'Train CNNs for convective cloud segmentation on INSAT-3D imagery',
      'Implement ConvLSTM and U-Net for radar reflectivity nowcasting up to 3 hours',
      'Apply Random Forests and XGBoost for localized surface wind speed downscaling',
      'Deploy physics-informed neural networks (PINNs) for fluid dynamics approximations'
    ],
    prerequisites: ['Python for Weather Analytics', 'Linear Algebra & Basic Neural Networks'],
    competencies: ['Machine Learning for NWP', 'Python for Meteorology', 'Data Science'],
    modules: [
      { id: 'm6-1', title: 'Module 1: Machine Learning Foundations for Earth Observations', duration: '1 hr 30 mins', status: 'Not Started', type: 'Lecture' },
      { id: 'm6-2', title: 'Module 2: Feature Engineering on Gridded Atmospheric Data', duration: '1 hr 45 mins', status: 'Not Started', type: 'Lab' },
      { id: 'm6-3', title: 'Module 3: Tree Ensembles for Temperature & Precipitation Downscaling', duration: '2 hrs', status: 'Not Started', type: 'Hands-on' },
      { id: 'm6-4', title: 'Module 4: Convolutional Neural Networks for Satellite Pattern Recognition', duration: '2 hrs 15 mins', status: 'Not Started', type: 'Lab' },
      { id: 'm6-5', title: 'Module 5: Spatio-Temporal Nowcasting with ConvLSTM & U-Net', duration: '2 hrs 30 mins', status: 'Not Started', type: 'Advanced Lab' },
      { id: 'm6-6', title: 'Module 6: Model Interpretability & Explainable AI (SHAP/Grad-CAM)', duration: '1 hr 30 mins', status: 'Not Started', type: 'Lecture' },
      { id: 'm6-7', title: 'Module 7: Operational Inference Pipeline Deployment', duration: '1 hr 30 mins', status: 'Not Started', type: 'Workshop' },
      { id: 'm6-8', title: 'Module 8: Capstone ML Radar Prediction Project & Exam', duration: '1 hr', status: 'Not Started', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-007',
    title: 'Satellite Remote Sensing for Atmospheric Soundings',
    category: 'Remote Sensing',
    domain: 'Remote Sensing',
    difficulty: 'Intermediate',
    duration: '9 Hours',
    modulesCount: 6,
    enrolledCount: 115,
    rating: 4.7,
    reviewsCount: 29,
    instructor: 'Dr. Neha Verma',
    instructorAvatar: 'NV',
    instructorRole: 'Head of Geospatial Systems, SAC',
    enrolled: false,
    progress: 0,
    currentModule: 'Not Started',
    lastAccessed: null,
    thumbnailIcon: '🛰',
    badge: 'Popular',
    description: 'Retrieval algorithms for atmospheric temperature, moisture profiles, and cloud optical properties from INSAT and Megha-Tropiques.',
    overview: 'Explore passive and active sensor physics, radiative transfer calculations, and validation of satellite atmospheric profiles against global radiosonde networks.',
    objectives: [
      'Extract atmospheric water vapor and temperature profiles from sounder radiances',
      'Process scatterometer surface ocean wind vectors',
      'Quantify aerosol optical depth (AOD) during dust storm and pollution episodes',
      'Integrate satellite soundings into automated data assimilation pipelines'
    ],
    prerequisites: ['Basic Physics of Radiation', 'GIS Fundamentals'],
    competencies: ['Satellite Remote Sensing', 'Weather Data Analysis', 'Atmospheric Physics'],
    modules: [
      { id: 'm7-1', title: 'Module 1: Radiative Transfer & Atmospheric Absorption Bands', duration: '1 hr 30 mins', status: 'Not Started', type: 'Lecture' },
      { id: 'm7-2', title: 'Module 2: INSAT-3DR Sounder Channel Characteristics', duration: '1 hr 30 mins', status: 'Not Started', type: 'Technical' },
      { id: 'm7-3', title: 'Module 3: Profile Inversion & Retrieval Techniques', duration: '1 hr 45 mins', status: 'Not Started', type: 'Lab' },
      { id: 'm7-4', title: 'Module 4: Ocean Wind Scatterometry Processing', duration: '1 hr 30 mins', status: 'Not Started', type: 'Lab' },
      { id: 'm7-5', title: 'Module 5: Aerosol Optical Depth Retrieval Case Studies', duration: '1 hr 30 mins', status: 'Not Started', type: 'Case Study' },
      { id: 'm7-6', title: 'Module 6: Remote Sensing Soundings Certification Test', duration: '45 mins', status: 'Not Started', type: 'Assessment' }
    ]
  },
  {
    id: 'crs-008',
    title: 'Scientific Computing & Numerical Algorithms',
    category: 'Scientific Computing',
    domain: 'Scientific Computing',
    difficulty: 'Advanced',
    duration: '11 Hours',
    modulesCount: 7,
    enrolledCount: 76,
    rating: 4.8,
    reviewsCount: 19,
    instructor: 'Dr. Amit Kumar',
    instructorAvatar: 'AK',
    instructorRole: 'AI/ML Lead Scientist, CDAC',
    enrolled: false,
    progress: 0,
    currentModule: 'Not Started',
    lastAccessed: null,
    thumbnailIcon: '💻',
    badge: 'Advanced',
    description: 'High-performance computing, OpenMP, MPI, and linear algebra solvers for large-scale geophysical fluid dynamic simulations.',
    overview: 'Learn memory-efficient algorithm design, cache optimization, parallel domain decomposition, and numerical stability criteria for atmospheric codebases.',
    objectives: [
      'Implement multi-grid solvers for Poisson pressure equations',
      'Parallelize spatial finite-difference operators using OpenMP and MPI',
      'Optimize memory bandwidth and GPU compute utilization with CUDA/Numba',
      'Benchmark speedup and scalability on multi-node supercomputing clusters'
    ],
    prerequisites: ['Proficiency in C/Fortran or Python', 'Calculus and Linear Algebra'],
    competencies: ['Scientific Computing', 'Numerical Weather Prediction', 'Algorithm Design'],
    modules: [
      { id: 'm8-1', title: 'Module 1: Architecture of Supercomputing Clusters in Meteorology', duration: '1 hr 30 mins', status: 'Not Started', type: 'Lecture' },
      { id: 'm8-2', title: 'Module 2: Vectorization, Memory Hierarchy & Cache Tuning', duration: '1 hr 45 mins', status: 'Not Started', type: 'Lab' },
      { id: 'm8-3', title: 'Module 3: Parallel Domain Decomposition with MPI', duration: '2 hrs', status: 'Not Started', type: 'Coding Lab' },
      { id: 'm8-4', title: 'Module 4: Iterative Sparse Matrix Solvers & Preconditioners', duration: '1 hr 45 mins', status: 'Not Started', type: 'Lecture & Lab' },
      { id: 'm8-5', title: 'Module 5: GPU Acceleration with CuPy and Numba CUDA', duration: '2 hrs', status: 'Not Started', type: 'Advanced Lab' },
      { id: 'm8-6', title: 'Module 6: Profiling & Performance Debugging Tools (VTune, gprof)', duration: '1 hr 15 mins', status: 'Not Started', type: 'Interactive' },
      { id: 'm8-7', title: 'Module 7: Supercomputing Benchmarking Exam', duration: '45 mins', status: 'Not Started', type: 'Assessment' }
    ]
  }
];

export const recommendedTrainers = [
  {
    id: 'tr-rahul',
    name: 'Dr. Rahul Sharma',
    avatar: 'RS',
    role: 'Senior Scientist & Lead Instructor',
    organization: 'India Meteorological Department (IMD)',
    experience: '14+ Years',
    rating: 4.9,
    reviewsCount: 142,
    traineesTrained: 890,
    matchScore: 92,
    isBestMatch: true,
    expertise: 'Meteorology & Weather Data Analytics',
    tagline: 'Leading meteorological data analysis workflows, synoptic modeling, and extreme precipitation diagnostics.',
    matchReasons: [
      'Perfect match for your current growth area in Weather Data Analysis (+14% gap)',
      'Top instructor for Python for Weather Analytics & NWP curriculum',
      'Mentors 90+ IMD trainees annually with 96% competency advancement rate',
      'Authored 24 peer-reviewed publications on Doppler radar nowcasting'
    ],
    requiredCompetencies: ['Python for Meteorology', 'Weather Data Analysis', 'Statistical Climatology', 'Numerical Weather Prediction'],
    trainerCompetencies: [
      { name: 'Python for Meteorology', level: 98, matched: true },
      { name: 'Weather Data Analysis', level: 96, matched: true },
      { name: 'Statistical Climatology', level: 92, matched: true },
      { name: 'Numerical Weather Prediction', level: 95, matched: true }
    ],
    coursesTaught: [
      'Python for Weather Analytics',
      'Advanced Weather Data Analysis',
      'Numerical Weather Prediction Systems'
    ]
  },
  {
    id: 'tr-neha',
    name: 'Dr. Neha Verma',
    avatar: 'NV',
    role: 'Head of Geospatial Systems',
    organization: 'Space Applications Centre (ISRO) / SAC',
    experience: '12+ Years',
    rating: 4.85,
    reviewsCount: 98,
    traineesTrained: 620,
    matchScore: 89,
    isBestMatch: false,
    expertise: 'Remote Sensing & GIS Climate Mapping',
    tagline: 'Specializing in satellite precipitation retrieval, INSAT-3DR sounder products, and hazard vulnerability GIS modeling.',
    matchReasons: [
      'Matches your development need in GIS & Spatial Mapping (current 58% vs target 75%)',
      'Principal investigator on satellite multi-sensor precipitation estimation',
      'Expert instructor for QGIS, Python GDAL, and satellite sounder data processing'
    ],
    requiredCompetencies: ['GIS & Spatial Mapping', 'Satellite Remote Sensing', 'Climate Science Fundamentals'],
    trainerCompetencies: [
      { name: 'GIS & Spatial Mapping', level: 95, matched: true },
      { name: 'Satellite Remote Sensing', level: 94, matched: true },
      { name: 'Climate Science Fundamentals', level: 92, matched: true },
      { name: 'Cartographic Visualization', level: 90, matched: true }
    ],
    coursesTaught: [
      'GIS Fundamentals for Climate Risk Mapping',
      'Satellite Remote Sensing for Atmospheric Soundings',
      'Climate Science Fundamentals'
    ]
  },
  {
    id: 'tr-amit',
    name: 'Dr. Amit Kumar',
    avatar: 'AK',
    role: 'AI/ML Lead Scientist',
    organization: 'Centre for Development of Advanced Computing (C-DAC)',
    experience: '11+ Years',
    rating: 4.88,
    reviewsCount: 84,
    traineesTrained: 510,
    matchScore: 86,
    isBestMatch: false,
    expertise: 'Python, Machine Learning & HPC',
    tagline: 'Pioneering physics-informed deep learning, convective storm radar nowcasting, and scalable parallel compute pipelines.',
    matchReasons: [
      'Matches your strategic need in Machine Learning for NWP (current 43% vs target 70%)',
      'Conducts hands-on supercomputing and GPU acceleration masterclasses',
      'Leader in ConvLSTM and U-Net architectures applied to radar and satellite imagery'
    ],
    requiredCompetencies: ['Machine Learning for NWP', 'Python for Meteorology', 'Scientific Computing'],
    trainerCompetencies: [
      { name: 'Machine Learning for NWP', level: 96, matched: true },
      { name: 'Python for Meteorology', level: 94, matched: true },
      { name: 'Scientific Computing', level: 95, matched: true },
      { name: 'Data Science', level: 92, matched: true }
    ],
    coursesTaught: [
      'Machine Learning for Meteorological Applications',
      'Scientific Computing & Numerical Algorithms'
    ]
  }
];

export const mockAssessmentQuestions = [
  {
    id: 1,
    question: 'Which Python library is standard in meteorological workflows for multi-dimensional gridded datasets (e.g. NetCDF, GRIB2) with labeled dimensions and coordinates?',
    options: [
      'NumPy raw arrays only',
      'Xarray',
      'Flask',
      'BeautifulSoup'
    ],
    correctAnswer: 1,
    explanation: 'Xarray introduces labels in the form of dimensions, coordinates and attributes on top of raw NumPy-like arrays, making NetCDF and GRIB2 dataset manipulation intuitive and expressive.'
  },
  {
    id: 2,
    question: 'In atmospheric thermodynamics, what chart is commonly used to evaluate convective available potential energy (CAPE) and sounding profiles?',
    options: [
      'Gantt Chart',
      'Skew-T ln-P Diagram',
      'Barometric Pie Chart',
      'Pareto Distribution Graph'
    ],
    correctAnswer: 1,
    explanation: 'The Skew-T ln-P diagram is the standard thermodynamic diagram used by weather forecasters to plot temperature, dew point, and evaluate atmospheric stability and CAPE.'
  },
  {
    id: 3,
    question: 'When performing quality control on automated weather station (AWS) temperature observations, which check flags a reading that increases by 18°C within 10 minutes?',
    options: [
      'Range Consistency Check',
      'Step / Rate-of-Change Check',
      'Internal Persistence Check',
      'Spatial Geostationary Check'
    ],
    correctAnswer: 1,
    explanation: 'A Step or Rate-of-Change check evaluates consecutive measurements to ensure physical rates of temperature fluctuation are not exceeded by sensor noise or electrical faults.'
  },
  {
    id: 4,
    question: 'Which cartographic projection is standard for polar meteorological visualizations in Cartopy to avoid conformal distortion at high latitudes?',
    options: [
      'Mercator',
      'Stereographic / NorthPolarStereo',
      'Gall-Peters',
      'Equirectangular'
    ],
    correctAnswer: 1,
    explanation: 'NorthPolarStereo or SouthPolarStereo projections maintain true conformal perspective around polar caps and are universally favored for high-latitude synoptic charts.'
  },
  {
    id: 5,
    question: 'What is the primary function of Doppler weather radar reflectivity factor (Z, expressed in dBZ)?',
    options: [
      'Measures wind azimuth angle directly',
      'Estimates precipitation droplet size and concentration in the radar volume',
      'Measures atmospheric surface pressure',
      'Determines solar UV index attenuation'
    ],
    correctAnswer: 1,
    explanation: 'Radar reflectivity factor Z is proportional to the sixth power of drop diameters, allowing meteorologists to assess rain intensity and cloud hail content.'
  },
  {
    id: 6,
    question: 'In numerical weather prediction (NWP), what numerical condition dictates maximum allowable time-step size to maintain computational stability in explicit advection schemes?',
    options: [
      'Courant-Friedrichs-Lewy (CFL) condition',
      'Navier-Stokes compressibility limit',
      'Planck blackbody threshold',
      'Bernoulli friction factor'
    ],
    correctAnswer: 0,
    explanation: 'The CFL condition states that the numerical domain of dependence must contain the physical domain of dependence (i.e. c * dt / dx <= 1).'
  },
  {
    id: 7,
    question: 'When reading GRIB2 meteorological files in Python, which backend engine is typically wrapped by cfgrib and xarray?',
    options: [
      'TensorFlow Lite',
      'ECMWF ecCodes library',
      'SQLite3',
      'Node.js stream parser'
    ],
    correctAnswer: 1,
    explanation: 'ECMWF ecCodes is the official C library for encoding and decoding WMO GRIB and BUFR formats, wrapped in Python via cfgrib.'
  },
  {
    id: 8,
    question: 'Which statistical metric is standard for validating continuous NWP forecast variables like 2-meter surface temperature against station observations?',
    options: [
      'Root Mean Square Error (RMSE) and Mean Absolute Error (MAE)',
      'Confusion Matrix Accuracy only',
      'Perplexity score',
      'F1-Score for categorical text'
    ],
    correctAnswer: 0,
    explanation: 'Continuous forecast evaluation relies on RMSE to penalize large outliers and MAE to represent average deviation magnitude.'
  },
  {
    id: 9,
    question: 'What does an anomalous Southern Oscillation Index (SOI) with sustained deeply negative values typically signal?',
    options: [
      'Strong La Niña conditions',
      'El Niño conditions with reduced Indian summer monsoon probability',
      'Sudden stratospheric warming over Antarctica',
      'Enhanced Western Disturbance frequency in August'
    ],
    correctAnswer: 1,
    explanation: 'Sustained negative SOI values reflect higher atmospheric pressure at Darwin relative to Tahiti, indicating classic El Niño warming in the central-eastern equatorial Pacific.'
  },
  {
    id: 10,
    question: 'Which Python geospatial package provides the geometry engine (buffer, intersect, convex hull) utilized beneath GeoPandas?',
    options: [
      'Shapely (leveraging GEOS)',
      'Pillow (PIL)',
      'Flask-CORS',
      'Jupyterlab-git'
    ],
    correctAnswer: 0,
    explanation: 'Shapely provides the planar geometric operations and interfaces with the industry standard C++ GEOS library for spatial computations.'
  }
];

export const mockAssessmentResult = {
  assessmentId: 'asm-py-01',
  title: 'Python for Weather Analytics Assessment',
  submittedAt: 'Today, 11:42 AM',
  score: 87,
  passingScore: 70,
  status: 'Passed',
  totalQuestions: 10,
  correctAnswers: 9,
  incorrectAnswers: 1,
  accuracy: 90,
  timeTaken: '18 min 24 sec',
  timeAllowed: '30 min',
  performanceBreakdown: [
    { domain: 'Python Fundamentals & Data Structures', score: 92, status: 'Mastery' },
    { domain: 'Gridded Data Analysis (Xarray & GRIB2)', score: 84, status: 'Proficient' },
    { domain: 'Geospatial Visualization & Cartopy', score: 81, status: 'Proficient' },
    { domain: 'Thermodynamics & Radar Metrics', score: 88, status: 'Mastery' }
  ],
  competencyImpact: [
    { skill: 'Python for Meteorology', before: 82, after: 87, delta: '+5%' },
    { skill: 'Data Analysis & Wrangling', before: 76, after: 81, delta: '+5%' },
    { skill: 'Weather Data Analysis', before: 71, after: 76, delta: '+5%' }
  ],
  feedback: 'Outstanding performance! You displayed exceptional grasp of multi-dimensional dataset parsing with Xarray, CFL stability criteria, and Skew-T diagram thermodynamic interpretation. Your competency indices have automatically updated across the institutional ledger.'
};

export const mockCertificates = [
  {
    id: 'cert-001',
    code: 'CC-PY-2026-001',
    title: 'Python for Weather Analytics',
    issueDate: '28 Aug 2026',
    score: 91,
    grade: 'Distinction',
    recipient: 'Ananya Verma',
    authority: 'CapacityConnect · Ministry of Earth Sciences (MoES) | IMD',
    signatory: 'Dr. M. Ravichandran, Secretary MoES',
    credentialUrl: 'https://capacityconnect.gov.in/verify/CC-PY-2026-001',
    competencies: ['Python for Meteorology', 'Weather Data Analysis', 'Cartopy Visualization'],
    verified: true
  },
  {
    id: 'cert-002',
    code: 'CC-NWP-2026-042',
    title: 'Numerical Weather Prediction Systems',
    issueDate: '15 Jul 2026',
    score: 88,
    grade: 'Distinction',
    recipient: 'Ananya Verma',
    authority: 'CapacityConnect · Ministry of Earth Sciences (MoES) | IMD',
    signatory: 'Dr. Mrutyunjay Mohapatra, Director General IMD',
    credentialUrl: 'https://capacityconnect.gov.in/verify/CC-NWP-2026-042',
    competencies: ['Numerical Weather Prediction', 'Atmospheric Dynamics', 'WRF Modeling'],
    verified: true
  },
  {
    id: 'cert-003',
    code: 'CC-GIS-2026-109',
    title: 'GIS Fundamentals for Climate Risk Mapping',
    issueDate: '02 Jun 2026',
    score: 85,
    grade: 'Merit',
    recipient: 'Ananya Verma',
    authority: 'CapacityConnect · Space Applications Centre (SAC)',
    signatory: 'Dr. Nilesh M. Desai, Director SAC/ISRO',
    credentialUrl: 'https://capacityconnect.gov.in/verify/CC-GIS-2026-109',
    competencies: ['GIS & Spatial Mapping', 'QGIS Geoprocessing', 'Risk Atlas Modeling'],
    verified: true
  }
];

export const mockAnnouncements = [
  {
    id: 'anc-1',
    title: 'New Course Launch: Advanced Weather Data Analysis (Cohort 4)',
    category: 'Course',
    categoryColor: '#38BDF8',
    date: '2 hours ago',
    author: 'IMD Central Academic Directorate',
    summary: 'Registrations are open for the flagship Doppler radar reflectivity algorithm and convective storm nowcasting modules led by Dr. Rahul Sharma.',
    important: true
  },
  {
    id: 'anc-2',
    title: 'Assessment Deadline Updated: Python Mid-Term Diagnostic',
    category: 'Assessment',
    categoryColor: '#F59E0B',
    date: 'Yesterday',
    author: 'Evaluation Board',
    summary: 'The submission window for the Python Fundamentals practical assessment has been extended by 48 hours to accommodate cloud cluster maintenance.',
    important: false
  },
  {
    id: 'anc-3',
    title: 'AI Trainer Recommendation Engine Upgrade',
    category: 'Platform',
    categoryColor: '#6366F1',
    date: '3 days ago',
    author: 'CapacityConnect Tech Team',
    summary: 'The competency matching engine now correlates live assessment question performance directly with verified faculty research profiles for higher match precision.',
    important: false
  },
  {
    id: 'anc-4',
    title: 'Guest Lecture: AI Weather Nowcasting with Deep Learning',
    category: 'Training',
    categoryColor: '#22C55E',
    date: '5 days ago',
    author: 'C-DAC / MoES Joint Faculty',
    summary: 'Dr. Amit Kumar will deliver a 90-minute live demonstration on training ConvLSTM models over Doppler radar sequences this Thursday at 3:00 PM IST.',
    important: true
  }
];

export const mockNotifications = [
  {
    id: 'nt-1',
    title: 'Assessment result available',
    description: 'You scored 87% (Passed) in Python for Weather Analytics Assessment.',
    time: '15 mins ago',
    read: false,
    type: 'success',
    actionRoute: 'result'
  },
  {
    id: 'nt-2',
    title: 'Competency Milestone Reached',
    description: 'Your Python for Meteorology competency reached 92% (Mastery Level).',
    time: '2 hours ago',
    read: false,
    type: 'intel',
    actionRoute: 'competencies'
  },
  {
    id: 'nt-3',
    title: 'Top Trainer Match Found',
    description: 'Dr. Rahul Sharma has a 92% competency match with your skill gap profile.',
    time: '1 day ago',
    read: true,
    type: 'recommendation',
    actionRoute: 'trainers'
  },
  {
    id: 'nt-4',
    title: 'New Course Recommended',
    description: 'Machine Learning for Meteorological Applications matches your growth goals.',
    time: '2 days ago',
    read: true,
    type: 'info',
    actionRoute: 'catalog'
  }
];

export const mockLearningModuleContent = {
  courseId: 'crs-001',
  courseTitle: 'Python for Weather Analytics',
  activeModuleId: 'm4',
  activeModuleTitle: 'Module 4: Advanced Geospatial Plotting with Cartopy',
  duration: '1 hr 30 mins',
  learningObjective: 'Master the generation of georeferenced atmospheric contour plots, wind barbs, and thermodynamic fields projected onto regional Indian meteorological grids.',
  readingMaterial: `Cartopy is a Python package designed for geospatial data processing in order to produce maps and other geospatial data analyses. Unlike standard matplotlib plotting, Cartopy is built on top of PROJ and Shapely to deliver mathematically rigorous coordinate transformations between geographical coordinate systems (such as latitude/longitude WGS84) and target map projections (e.g. Lambert Conformal, Plate Carree, and North Polar Stereo).

In numerical meteorological analysis, gridded atmospheric fields from model outputs (WRF, GFS, ERA5) are indexed by latitude and longitude. When visualizing wind barbs and pressure isolines over South Asia, utilizing the Lambert Conformal Conic projection with standard parallels at 12°N and 28°N provides minimal shape and area distortion.`,
  keyConcepts: [
    { title: 'Coordinate Reference System (CRS)', desc: 'The mathematical framework defining how latitude/longitude are mapped onto the 2D plane.' },
    { title: 'Feature Layers', desc: 'Pre-bundled Natural Earth shapefiles including coastlines, national borders, rivers, and terrain.' },
    { title: 'Gridliners & Formatting', desc: 'Automated labeling of parallels and meridians with degree formatting and custom tick intervals.' },
    { title: 'Streamplot & Wind Barbs', desc: 'Vector visualization depicting atmospheric flow velocities in knots or meters/second.' }
  ],
  codeSnippet: `import cartopy.crs as ccrs
import cartopy.feature as cfeature
import matplotlib.pyplot as plt
import xarray as xr

# Load meteorological surface pressure & temperature
ds = xr.open_dataset('imd_surface_analysis_2026.nc')
lats, lons = ds.latitude, ds.longitude
slp = ds.surface_pressure / 100.0  # Convert Pa to hPa

# Setup Lambert Conformal Map Projection
fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(1, 1, 1, projection=ccrs.LambertConformal(central_longitude=78.0))
ax.set_extent([66, 98, 6, 38], crs=ccrs.PlateCarree())

# Add Geographic Features
ax.add_feature(cfeature.COASTLINE.with_scale('50m'), linewidth=1.2)
ax.add_feature(cfeature.BORDERS, linestyle=':', edgecolor='#94A3B8')

# Plot Pressure Isobars
cs = ax.contour(lons, lats, slp, levels=range(990, 1025, 2),
                transform=ccrs.PlateCarree(), cmap='coolwarm', linewidths=1.5)
ax.clabel(cs, inline=True, fmt='%1.0f hPa', fontsize=9)
plt.title('IMD Regional Synoptic Surface Pressure (hPa)', fontsize=13, fontweight='bold')
plt.show()`,
  practicalExample: 'Trainees apply Cartopy to overlay Doppler Radar precipitation echoes atop India district boundaries during the southwest monsoon onset.',
  downloadableResources: [
    { name: 'cartopy_weather_starter_pack.ipynb', size: '1.8 MB' },
    { name: 'imd_sample_surface_pressure_2026.nc', size: '14.2 MB' },
    { name: 'cheatsheet_met_cartopy_projections.pdf', size: '420 KB' }
  ]
};

export const mockFaqs = [
  {
    q: 'How does the CapacityConnect Competency Score work?',
    a: 'Your competency score (0-100%) reflects your cumulative performance across coursework, hands-on lab submissions, diagnostic assessments, and module completion milestones. Each question and exercise is weighted against our institutional competency framework.'
  },
  {
    q: 'How does Intelligent Trainer Matching calculate the 92% match score?',
    a: 'The engine evaluates your identified Skill Gaps against verified trainer subject specializations, past cohort success metrics, and research publications. For example, your gap in Weather Data Analysis (+14% needed) directly maps to Dr. Rahul Sharma’s verified expertise in radar and meteorological data workflows.'
  },
  {
    q: 'Are certificates earned on CapacityConnect officially accredited?',
    a: 'Yes. All completed certifications carry cryptographic credential verification IDs issued under the auspices of the Ministry of Earth Sciences (MoES) and partner institutions including IMD and ISRO/SAC.'
  },
  {
    q: 'Can I retake assessments if I want to improve my competency level?',
    a: 'Yes! Formative diagnostics can be retaken after a mandatory 24-hour review period, during which the system recommends targeted learning modules to address specific question domains you missed.'
  }
];
