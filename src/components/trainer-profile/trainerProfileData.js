// Complete Trainer Profiles Database
export const TRAINERS_DATABASE = {
  'rahul-sharma': {
    id: 'rahul-sharma',
    name: 'Dr. Rahul Sharma',
    avatarInitials: 'RS',
    avatar: 'RS',
    designation: 'Senior Meteorology & Data Analytics Trainer',
    role: 'Senior Meteorology & Data Analytics Trainer',
    organization: 'India Meteorological Department (IMD)',
    location: 'New Delhi, India',
    status: 'Active Trainer',
    approvalStatus: 'Approved',
    experienceYears: '14+ Years',
    experience: '14+ Years',
    totalCourses: 12,
    totalTrainees: 890,
    traineesTrained: 890,
    successRate: '96%',
    averageRating: '4.9',
    rating: 4.9,
    reviewsCount: 142,
    matchScore: 92,
    specializations: [
      'Weather Data Analysis',
      'Meteorology',
      'Python',
      'Statistics',
      'Numerical Prediction',
      'Doppler Radar Diagnostics'
    ],
    stats: {
      courses: '12',
      trainees: '890',
      experience: '14+ Years',
      successRate: '96%',
      averageRating: '4.9'
    },
    competencyMatch: {
      score: 92,
      targetRole: 'Weather Data Analysis',
      description: 'This trainer closely matches the competencies required for Weather Data Analysis, demonstrating strong mastery across computational meteorology, statistical workflows, and operational forecast pipelines.',
      matchedCompetencies: [
        { name: 'Python for Meteorology', role: 'Core Scripting & Automation', target: 80, score: 98, matched: true },
        { name: 'Weather Data Analysis', role: 'Radar & Satellite Workflows', target: 80, score: 96, matched: true },
        { name: 'Numerical Weather Prediction', role: 'Dynamical Modeling', target: 85, score: 95, matched: true },
        { name: 'Statistical Climatology', role: 'Atmospheric Data Modeling', target: 75, score: 92, matched: true }
      ]
    },
    about: {
      bio: 'Dr. Rahul Sharma specializes in meteorological data analysis, forecasting workflows, and applied Python for weather analytics. He focuses on helping professionals translate technical concepts into practical forecasting and data-driven workflows.',
      extendedBio: 'With over 14 years of instructional leadership across national research organizations and IMD directorates, Dr. Sharma has authored comprehensive curriculum modules in automated atmospheric processing, Python-based radar data interpretation, and quantitative weather prediction models.',
      specializations: [
        'Weather Data Analysis',
        'Meteorology',
        'Python for Meteorology',
        'Statistics',
        'Satellite Data Processing',
        'Numerical Weather Prediction (NWP)'
      ],
      education: [
        { degree: 'Ph.D. in Atmospheric Sciences', institution: 'Indian Institute of Technology (IIT) Delhi', year: '2015' },
        { degree: 'M.Sc. in Meteorology', institution: 'National University of Atmospheric Studies', year: '2011' }
      ],
      languages: [
        { name: 'English', level: 'Fluent / Instructional' },
        { name: 'Hindi', level: 'Native / Instructional' }
      ]
    },
    competencies: [
      { name: 'Meteorology', score: 98, category: 'Meteorology & Forecasting', description: 'Dynamic atmospheric physics, synoptic chart analysis, and boundary layer thermodynamics.', evaluationsCount: 168 },
      { name: 'Weather Data Analysis', score: 96, category: 'Data & Analytics', description: 'GRIB/NetCDF processing, Doppler radar interpretation, and anomaly detection.', evaluationsCount: 182 },
      { name: 'Python for Meteorology', score: 98, category: 'Data & Analytics', description: 'Applied scientific Python stack (NumPy, SciPy, Xarray, Cartopy, MetPy).', evaluationsCount: 210 },
      { name: 'Numerical Weather Prediction', score: 95, category: 'Meteorology & Forecasting', description: 'WRF modeling, primitive equations, and parameterization schemes.', evaluationsCount: 145 },
      { name: 'Statistical Climatology', score: 92, category: 'Data & Analytics', description: 'Ensemble verification, extreme value distributions, and anomaly analysis.', evaluationsCount: 134 }
    ],
    experiences: [
      {
        period: '2020 — Present',
        title: 'Lead Instructor & Senior Scientist',
        organization: 'India Meteorological Department (IMD)',
        location: 'New Delhi, India',
        isCurrent: true,
        description: 'Directs curriculum development and leads intensive capacity-building cohorts on numerical weather modeling and forecasting automation.',
        highlights: [
          'Trained over 450+ operational meteorologists across national training centers.',
          'Designed end-to-end Python pipeline labs for automated cyclone and severe storm tracking.',
          'Authored standardized competency assessments integrated into CapacityConnect.'
        ]
      },
      {
        period: '2016 — 2020',
        title: 'Atmospheric Data Scientist',
        organization: 'National Center for Medium Range Weather Forecasting (NCMRWF)',
        location: 'Noida, India',
        isCurrent: false,
        description: 'Led data assimilation workflows and high-volume satellite observation modeling pipelines.',
        highlights: [
          'Developed 14 modular Jupyter notebooks utilized by 200+ trainees.',
          'Maintained a 96% positive student satisfaction rating over 4 consecutive years.'
        ]
      }
    ],
    courses: [
      {
        id: 'c1',
        title: 'Python for Weather Analytics',
        level: 'Intermediate',
        duration: '6 Weeks',
        modulesCount: 6,
        traineesCount: 240,
        completionRate: 94,
        rating: 4.9,
        icon: 'code',
        description: 'Master practical Python workflows for processing meteorological data, radar arrays, and geospatial atmospheric variables.',
        tags: ['Python', 'Xarray', 'MetPy', 'NetCDF']
      },
      {
        id: 'c2',
        title: 'Advanced Weather Data Analysis',
        level: 'Advanced',
        duration: '8 Weeks',
        modulesCount: 7,
        traineesCount: 180,
        completionRate: 91,
        rating: 4.9,
        icon: 'database',
        description: 'Deep-dive into multi-sensor weather telemetry, Doppler radar datasets, synoptic pattern decomposition, and forecast validation.',
        tags: ['Weather Analysis', 'Doppler Radar', 'Forecasting']
      },
      {
        id: 'c3',
        title: 'Numerical Weather Prediction Systems',
        level: 'Intermediate',
        duration: '12 Hours',
        modulesCount: 8,
        traineesCount: 162,
        completionRate: 93,
        rating: 4.8,
        icon: 'cloud',
        description: 'Comprehensive study of governing dynamical equations, parameterizations, and WRF model configuration.',
        tags: ['NWP', 'WRF Model', 'Dynamics']
      }
    ],
    performance: {
      averageScore: 88,
      completionRate: 93,
      successRate: 96,
      averageFeedback: '4.9',
      monthlyTrend: [
        { month: 'Apr', score: 82, completion: 86, count: 72 },
        { month: 'May', score: 85, completion: 89, count: 80 },
        { month: 'Jun', score: 88, completion: 91, count: 85 },
        { month: 'Jul', score: 91, completion: 93, count: 94 },
        { month: 'Aug', score: 94, completion: 95, count: 88 },
        { month: 'Sep', score: 96, completion: 97, count: 90 }
      ]
    },
    reviews: [
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
        rating: 5,
        quote: 'Very useful sessions, especially the Python exercises and real-time radar data labs. The hands-on notebooks are now our everyday reference.'
      }
    ]
  },

  'neha-verma': {
    id: 'neha-verma',
    name: 'Dr. Neha Verma',
    avatarInitials: 'NV',
    avatar: 'NV',
    designation: 'Head of Geospatial Systems & Earth Observation',
    role: 'Head of Geospatial Systems & Earth Observation',
    organization: 'Space Applications Centre (ISRO) / SAC',
    location: 'Ahmedabad, Gujarat',
    status: 'Active Trainer',
    approvalStatus: 'Approved',
    experienceYears: '12+ Years',
    experience: '12+ Years',
    totalCourses: 9,
    totalTrainees: 620,
    traineesTrained: 620,
    successRate: '94%',
    averageRating: '4.85',
    rating: 4.85,
    reviewsCount: 98,
    matchScore: 89,
    specializations: [
      'Remote Sensing',
      'Satellite Meteorology',
      'GIS & Spatial Mapping',
      'INSAT Soundings',
      'Disaster Risk Modeling'
    ],
    stats: {
      courses: '9',
      trainees: '620',
      experience: '12+ Years',
      successRate: '94%',
      averageRating: '4.85'
    },
    competencyMatch: {
      score: 89,
      targetRole: 'Remote Sensing & GIS',
      description: 'Dr. Verma is a nationally recognized authority on satellite atmospheric soundings, INSAT-3DR optical data retrieval, and multispectral hazard GIS modeling.',
      matchedCompetencies: [
        { name: 'Satellite Remote Sensing', role: 'Soundings & Optical Retrievals', target: 80, score: 96, matched: true },
        { name: 'GIS & Spatial Mapping', role: 'QGIS & Geoprocessing', target: 75, score: 95, matched: true },
        { name: 'Climate Science Fundamentals', role: 'Radiative Transfer', target: 70, score: 92, matched: true },
        { name: 'Cartographic Visualization', role: 'Spatial Map Standards', target: 75, score: 90, matched: true }
      ]
    },
    about: {
      bio: 'Dr. Neha Verma leads Earth Observation research at SAC/ISRO, focusing on satellite precipitation estimation, INSAT sounder profiling, and GIS-based multi-hazard mapping.',
      extendedBio: 'Dr. Verma has led numerous international satellite calibration missions and trained over 600 meteorologists in utilizing high-resolution geostationary payload telemetry for severe storm and flood vulnerability prediction.',
      specializations: [
        'Satellite Remote Sensing',
        'GIS & Spatial Mapping',
        'INSAT-3DR Atmospheric Soundings',
        'Disaster Risk Reduction',
        'Climate Teleconnections'
      ],
      education: [
        { degree: 'Ph.D. in Remote Sensing & GIS', institution: 'Indian Institute of Remote Sensing (IIRS)', year: '2016' },
        { degree: 'M.Tech in Geoinformatics', institution: 'Anna University', year: '2012' }
      ],
      languages: [
        { name: 'English', level: 'Fluent / Instructional' },
        { name: 'Hindi', level: 'Native / Instructional' }
      ]
    },
    competencies: [
      { name: 'Satellite Remote Sensing', score: 96, category: 'Geospatial & Tools', description: 'Radiative transfer, INSAT-3D/3DR sounder channel processing, and aerosol optical depth retrieval.', evaluationsCount: 140 },
      { name: 'GIS & Spatial Mapping', score: 95, category: 'Geospatial & Tools', description: 'Vector geoprocessing, QGIS scripting, digital elevation models, and spatial flood risk overlays.', evaluationsCount: 162 },
      { name: 'Climate Science Fundamentals', score: 92, category: 'Meteorology & Forecasting', description: 'Earth radiation balance, monsoon teleconnections, and long-term climate projections.', evaluationsCount: 118 },
      { name: 'Cartographic Visualization', score: 90, category: 'Geospatial & Tools', description: 'Production map generation, coordinate system transformations, and GIS web services.', evaluationsCount: 104 }
    ],
    experiences: [
      {
        period: '2021 — Present',
        title: 'Head of Geospatial Systems',
        organization: 'Space Applications Centre (ISRO)',
        location: 'Ahmedabad, India',
        isCurrent: true,
        description: 'Directs satellite meteorology payload calibration and coordinates national geospatial capacity building.',
        highlights: [
          'Trained over 400 state disaster managers and meteorologists in satellite precipitation retrieval.',
          'Authored ISRO training handbooks on INSAT-3DR sounder inversion techniques.'
        ]
      },
      {
        period: '2017 — 2021',
        title: 'Senior Remote Sensing Scientist',
        organization: 'National Remote Sensing Centre (NRSC)',
        location: 'Hyderabad, India',
        isCurrent: false,
        description: 'Developed automated multi-sensor GIS pipelines for flood inundation mapping and extreme rain analysis.',
        highlights: [
          'Delivered 18 workshops on QGIS and Python GDAL workflows.',
          'Published 12 research papers on monsoon rainfall estimation.'
        ]
      }
    ],
    courses: [
      {
        id: 'c5',
        title: 'Satellite Remote Sensing for Atmospheric Soundings',
        level: 'Intermediate',
        duration: '9 Hours',
        modulesCount: 6,
        traineesCount: 115,
        completionRate: 92,
        rating: 4.85,
        icon: 'compass',
        description: 'Retrieval algorithms for atmospheric temperature, moisture profiles, and cloud optical properties from INSAT and Megha-Tropiques.',
        tags: ['Remote Sensing', 'INSAT-3D', 'Sounders', 'GIS']
      },
      {
        id: 'c6',
        title: 'Climate Science Fundamentals',
        level: 'Beginner',
        duration: '7 Hours',
        modulesCount: 5,
        traineesCount: 210,
        completionRate: 96,
        rating: 4.9,
        icon: 'cloud',
        description: 'Earth energy balance, monsoon dynamics, teleconnections (ENSO, IOD), and long-term climate projections.',
        tags: ['Climate Science', 'Monsoon', 'Radiation']
      }
    ],
    performance: {
      averageScore: 86,
      completionRate: 94,
      successRate: 94,
      averageFeedback: '4.85',
      monthlyTrend: [
        { month: 'Apr', score: 80, completion: 85, count: 60 },
        { month: 'May', score: 83, completion: 88, count: 68 },
        { month: 'Jun', score: 86, completion: 90, count: 75 },
        { month: 'Jul', score: 89, completion: 92, count: 82 },
        { month: 'Aug', score: 92, completion: 94, count: 80 },
        { month: 'Sep', score: 94, completion: 96, count: 84 }
      ]
    },
    reviews: [
      {
        author: 'Vikram Singh',
        course: 'Satellite Remote Sensing',
        organization: 'State Remote Sensing Centre',
        date: 'August 2026',
        rating: 5,
        quote: 'Dr. Neha explains satellite physics with remarkable clarity. Her hands-on labs with INSAT data were directly applicable to our regional weather monitoring center.'
      },
      {
        author: 'Deepa Krishnan',
        course: 'Climate Science Fundamentals',
        organization: 'Environmental Studies Center',
        date: 'July 2026',
        rating: 5,
        quote: 'Outstanding faculty. The energy balance and monsoon teleconnection modules were exceptionally structured and engaging.'
      }
    ]
  },

  'amit-kumar': {
    id: 'amit-kumar',
    name: 'Dr. Amit Kumar',
    avatarInitials: 'AK',
    avatar: 'AK',
    designation: 'Scientific Computing & AI/ML Lead Scientist',
    role: 'Scientific Computing & AI/ML Lead Scientist',
    organization: 'Centre for Development of Advanced Computing (C-DAC)',
    location: 'Pune, Maharashtra',
    status: 'Active Trainer',
    approvalStatus: 'Approved',
    experienceYears: '11+ Years',
    experience: '11+ Years',
    totalCourses: 14,
    totalTrainees: 512,
    traineesTrained: 512,
    successRate: '93%',
    averageRating: '4.8',
    rating: 4.8,
    reviewsCount: 110,
    matchScore: 86,
    specializations: [
      'Machine Learning for NWP',
      'Scientific Computing',
      'Deep Learning Nowcasting',
      'HPC Optimization',
      'Python & CUDA'
    ],
    stats: {
      courses: '14',
      trainees: '512',
      experience: '11+ Years',
      successRate: '93%',
      averageRating: '4.8'
    },
    competencyMatch: {
      score: 86,
      targetRole: 'AI/ML & Scientific Computing',
      description: 'Expertise in applying neural networks (CNNs, ConvLSTM, Physics-Informed NNs) to atmospheric simulations and optimizing large-scale numerical codebases on PARAM supercomputers.',
      matchedCompetencies: [
        { name: 'Machine Learning for NWP', role: 'Deep Learning & Nowcasting', target: 80, score: 95, matched: true },
        { name: 'Scientific Computing', role: 'HPC & Parallel Solvers', target: 80, score: 96, matched: true },
        { name: 'Python for Meteorology', role: 'High Performance AI', target: 75, score: 94, matched: true },
        { name: 'Data Science', role: 'Statistical Model Scoring', target: 75, score: 90, matched: true }
      ]
    },
    about: {
      bio: 'Dr. Amit Kumar leads AI/ML meteorological solutions at C-DAC Pune, developing deep learning models for extreme precipitation nowcasting and optimizing parallel numerical algorithms on PARAM supercomputers.',
      extendedBio: 'Dr. Kumar has mentored over 500 scientists across Indian universities and meteorological centers, specializing in high-performance computing, ConvLSTM spatio-temporal modeling, and GPU acceleration with CuPy/CUDA.',
      specializations: [
        'Machine Learning for Meteorology',
        'Deep Learning Nowcasting (ConvLSTM, U-Net)',
        'Scientific Computing & MPI/OpenMP',
        'GPU Compute (CUDA / Numba)',
        'High Performance Atmospheric Simulation'
      ],
      education: [
        { degree: 'Ph.D. in Computational Science & AI', institution: 'Indian Institute of Science (IISc) Bangalore', year: '2016' },
        { degree: 'M.Tech in High Performance Computing', institution: 'IIT Roorkee', year: '2012' }
      ],
      languages: [
        { name: 'English', level: 'Fluent / Instructional' },
        { name: 'Hindi', level: 'Native / Instructional' }
      ]
    },
    competencies: [
      { name: 'Machine Learning for NWP', score: 95, category: 'Data & Analytics', description: 'CNNs, ConvLSTMs, physics-informed neural networks, and automated precipitation nowcasting.', evaluationsCount: 145 },
      { name: 'Scientific Computing', score: 96, category: 'Data & Analytics', description: 'MPI domain decomposition, OpenMP multi-threading, sparse matrix solvers, and cache optimization.', evaluationsCount: 160 },
      { name: 'Python for Meteorology', score: 94, category: 'Data & Analytics', description: 'CuPy, Numba GPU acceleration, PyTorch for meteorological tensors, and Dask parallel arrays.', evaluationsCount: 180 },
      { name: 'Algorithm Design', score: 92, category: 'Data & Analytics', description: 'Explicit/implicit time-stepping, CFL criteria evaluation, and numerical dispersion minimization.', evaluationsCount: 110 }
    ],
    experiences: [
      {
        period: '2020 — Present',
        title: 'Lead AI/ML Research Scientist',
        organization: 'Centre for Development of Advanced Computing (C-DAC)',
        location: 'Pune, India',
        isCurrent: true,
        description: 'Oversees AI weather applications on National Supercomputing Mission infrastructure.',
        highlights: [
          'Deployed radar nowcasting U-Net models achieving 91% critical success index.',
          'Conducted 15 HPC masterclasses for atmospheric researchers.'
        ]
      },
      {
        period: '2016 — 2020',
        title: 'HPC Scientific Officer',
        organization: 'Indian Institute of Tropical Meteorology (IITM)',
        location: 'Pune, India',
        isCurrent: false,
        description: 'Optimized coupled ocean-atmosphere climate simulation codes for multi-core supercomputing clusters.',
        highlights: [
          'Accelerated global climate model post-processing pipelines by 4x.',
          'Mentored 120 graduate research trainees in MPI parallelization.'
        ]
      }
    ],
    courses: [
      {
        id: 'c7',
        title: 'Machine Learning for Meteorological Applications',
        level: 'Advanced',
        duration: '14 Hours',
        modulesCount: 8,
        traineesCount: 88,
        completionRate: 90,
        rating: 4.9,
        icon: 'code',
        description: 'Convolutional neural networks and LSTM models for nowcasting extreme rainfall and temperature anomaly prediction.',
        tags: ['Machine Learning', 'Deep Learning', 'Nowcasting', 'PyTorch']
      },
      {
        id: 'c8',
        title: 'Scientific Computing & Numerical Algorithms',
        level: 'Advanced',
        duration: '11 Hours',
        modulesCount: 7,
        traineesCount: 76,
        completionRate: 92,
        rating: 4.8,
        icon: 'database',
        description: 'High-performance computing, OpenMP, MPI, and linear algebra solvers for large-scale geophysical fluid dynamic simulations.',
        tags: ['HPC', 'Parallel Computing', 'MPI', 'Algorithms']
      }
    ],
    performance: {
      averageScore: 87,
      completionRate: 92,
      successRate: 93,
      averageFeedback: '4.8',
      monthlyTrend: [
        { month: 'Apr', score: 81, completion: 84, count: 55 },
        { month: 'May', score: 84, completion: 87, count: 62 },
        { month: 'Jun', score: 86, completion: 90, count: 70 },
        { month: 'Jul', score: 89, completion: 91, count: 78 },
        { month: 'Aug', score: 91, completion: 93, count: 74 },
        { month: 'Sep', score: 93, completion: 95, count: 76 }
      ]
    },
    reviews: [
      {
        author: 'Siddharth Roy',
        course: 'Machine Learning for NWP',
        organization: 'National Forecasting Center',
        date: 'August 2026',
        rating: 5,
        quote: 'Dr. Amit’s deep learning for nowcasting course is second to none. He guided us through building and validating ConvLSTM models on real INSAT radar data.'
      },
      {
        author: 'Kavita Joshi',
        course: 'Scientific Computing',
        organization: 'Atmospheric Physics Wing',
        date: 'July 2026',
        rating: 5,
        quote: 'The parallel computing exercises and GPU acceleration workshops were transformative for our model simulation runtimes.'
      }
    ]
  },

  'priya-mehta': {
    id: 'priya-mehta',
    name: 'Dr. Priya Mehta',
    avatarInitials: 'PM',
    avatar: 'PM',
    designation: 'Climatological Dynamics & Monsoon Specialist',
    role: 'Climatological Dynamics & Monsoon Specialist',
    organization: 'Indian Institute of Tropical Meteorology (IITM)',
    location: 'Pune, Maharashtra',
    status: 'Active Trainer',
    approvalStatus: 'Approved',
    experienceYears: '10+ Years',
    experience: '10+ Years',
    totalCourses: 8,
    totalTrainees: 395,
    traineesTrained: 395,
    successRate: '95%',
    averageRating: '4.9',
    rating: 4.9,
    reviewsCount: 86,
    matchScore: 84,
    specializations: [
      'Monsoon Dynamics',
      'Climate Teleconnections',
      'Aerosol-Cloud Interactions',
      'CMIP6 Diagnostics',
      'Seasonal Forecasting'
    ],
    stats: {
      courses: '8',
      trainees: '395',
      experience: '10+ Years',
      successRate: '95%',
      averageRating: '4.9'
    },
    competencyMatch: {
      score: 84,
      targetRole: 'Climatology & Earth Dynamics',
      description: 'Specializes in Indian summer monsoon variability, Indian Ocean Dipole (IOD) oscillations, and regional climate change impact projections.',
      matchedCompetencies: [
        { name: 'Climate Science Fundamentals', role: 'Monsoon Dynamics', target: 80, score: 96, matched: true },
        { name: 'Weather Data Analysis', role: 'Spatial Climatology', target: 75, score: 92, matched: true },
        { name: 'Statistical Climatology', role: 'ENSO Diagnostics', target: 75, score: 94, matched: true },
        { name: 'Atmospheric Physics', role: 'Radiative Forcing', target: 70, score: 90, matched: true }
      ]
    },
    about: {
      bio: 'Dr. Priya Mehta is a Senior Scientist at IITM Pune focusing on monsoon dynamics, climate teleconnections, and extreme rainfall attribution studies.',
      extendedBio: 'Dr. Mehta has contributed to national climate vulnerability reports and authored pedagogical curricula on decoding CMIP6 ensembles and evaluating coupled ocean-atmospheric models.',
      specializations: [
        'Monsoon Dynamics & Teleconnections',
        'Coupled Climate Modeling',
        'Aerosol Radiative Forcing',
        'CMIP6 Scenario Projections',
        'Seasonal Climatology Diagnostics'
      ],
      education: [
        { degree: 'Ph.D. in Climate Sciences', institution: 'IIT Kharagpur', year: '2017' },
        { degree: 'M.Sc. in Physics & Meteorology', institution: 'Pune University', year: '2013' }
      ],
      languages: [
        { name: 'English', level: 'Fluent / Instructional' },
        { name: 'Hindi', level: 'Native / Instructional' }
      ]
    },
    competencies: [
      { name: 'Climate Science Fundamentals', score: 96, category: 'Meteorology & Forecasting', description: 'Monsoon dynamics, teleconnection indices (ENSO, IOD, MJO), and CMIP6 climate scenarios.', evaluationsCount: 130 },
      { name: 'Statistical Climatology', score: 94, category: 'Data & Analytics', description: 'Empirical orthogonal function (EOF) analysis, multi-taper spectral analysis, and attribution.', evaluationsCount: 145 },
      { name: 'Weather Data Analysis', score: 92, category: 'Data & Analytics', description: 'Gridded precipitation datasets (IMD, ERA5, MERRA-2) and climatological anomaly calculations.', evaluationsCount: 155 },
      { name: 'Atmospheric Physics', score: 90, category: 'Meteorology & Forecasting', description: 'Cloud microphysics, aerosol optical properties, and boundary layer energy budgets.', evaluationsCount: 110 }
    ],
    experiences: [
      {
        period: '2021 — Present',
        title: 'Senior Climate Dynamics Scientist',
        organization: 'Indian Institute of Tropical Meteorology (IITM)',
        location: 'Pune, India',
        isCurrent: true,
        description: 'Directs monsoon diagnostic cohorts and regional climate change impact workshops.',
        highlights: [
          'Trained over 250 researchers in CMIP6 multi-model ensemble evaluation.',
          'Lead author on national monsoon teleconnection assessment chapters.'
        ]
      },
      {
        period: '2017 — 2021',
        title: 'Atmospheric Research Fellow',
        organization: 'National Institute of Oceanography (NIO)',
        location: 'Goa, India',
        isCurrent: false,
        description: 'Investigated air-sea interaction and Indian Ocean Dipole influence on monsoon depressions.',
        highlights: [
          'Conducted 8 national workshops on ocean-atmosphere coupling.',
          'Received Young Climate Scientist Award in 2020.'
        ]
      }
    ],
    courses: [
      {
        id: 'c9',
        title: 'Monsoon Dynamics & Teleconnections',
        level: 'Intermediate',
        duration: '8 Hours',
        modulesCount: 6,
        traineesCount: 145,
        completionRate: 94,
        rating: 4.9,
        icon: 'cloud',
        description: 'In-depth analysis of Indian monsoon seasonal progression, onset diagnostics, and Pacific-Indian Ocean teleconnections.',
        tags: ['Monsoon', 'ENSO', 'Climatology', 'Teleconnections']
      },
      {
        id: 'c10',
        title: 'CMIP6 Climate Scenarios & Diagnostics',
        level: 'Advanced',
        duration: '10 Hours',
        modulesCount: 7,
        traineesCount: 110,
        completionRate: 91,
        rating: 4.85,
        icon: 'database',
        description: 'Analyzing CMIP6 netCDF model arrays, evaluating SSP radiative scenarios, and localized downscaling.',
        tags: ['CMIP6', 'Climate Scenarios', 'Downscaling', 'Xarray']
      }
    ],
    performance: {
      averageScore: 89,
      completionRate: 95,
      successRate: 95,
      averageFeedback: '4.9',
      monthlyTrend: [
        { month: 'Apr', score: 83, completion: 86, count: 50 },
        { month: 'May', score: 86, completion: 89, count: 58 },
        { month: 'Jun', score: 88, completion: 92, count: 64 },
        { month: 'Jul', score: 91, completion: 94, count: 70 },
        { month: 'Aug', score: 93, completion: 95, count: 68 },
        { month: 'Sep', score: 95, completion: 97, count: 72 }
      ]
    },
    reviews: [
      {
        author: 'Arjun Nambiar',
        course: 'Monsoon Dynamics',
        organization: 'State Climatology Board',
        date: 'August 2026',
        rating: 5,
        quote: 'Dr. Priya’s passion for monsoon science is contagious. Her EOF analysis workflows gave our forecasting office immediate tools for seasonal outlooks.'
      },
      {
        author: 'Meenakshi Sundaram',
        course: 'CMIP6 Climate Scenarios',
        organization: 'Water Resources Planning Authority',
        date: 'June 2026',
        rating: 5,
        quote: 'Extremely clear breakdown of complex IPCC scenarios and multi-model averaging techniques. Highly recommended.'
      }
    ]
  }
};

// Helper function to resolve trainer by ID or name
export function getTrainerProfile(identifier) {
  if (!identifier) return TRAINERS_DATABASE['rahul-sharma'];

  if (typeof identifier === 'object') {
    const key = identifier.id || identifier.name;
    if (key && TRAINERS_DATABASE[key]) return TRAINERS_DATABASE[key];
    // Match by name
    const foundByName = Object.values(TRAINERS_DATABASE).find(
      t => t.name.toLowerCase() === (identifier.name || '').toLowerCase() ||
           t.id.toLowerCase() === (identifier.id || '').toLowerCase() ||
           (identifier.name && t.name.includes(identifier.name))
    );
    if (foundByName) return foundByName;
  }

  if (typeof identifier === 'string') {
    const clean = identifier.toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (clean.includes('neha') || clean.includes('nv') || clean.includes('sac')) return TRAINERS_DATABASE['neha-verma'];
    if (clean.includes('amit') || clean.includes('ak') || clean.includes('cdac')) return TRAINERS_DATABASE['amit-kumar'];
    if (clean.includes('priya') || clean.includes('pm') || clean.includes('iitm')) return TRAINERS_DATABASE['priya-mehta'];
    if (clean.includes('rahul') || clean.includes('rs') || clean.includes('imd')) return TRAINERS_DATABASE['rahul-sharma'];
  }

  return TRAINERS_DATABASE['rahul-sharma'];
}

// Generate similar trainers list dynamically (excluding the current active trainer)
export function getSimilarTrainers(currentTrainerId) {
  const all = Object.values(TRAINERS_DATABASE);
  return all
    .filter(t => t.id !== currentTrainerId && !currentTrainerId?.includes(t.id.split('-')[0]))
    .map(t => ({
      id: t.id,
      name: t.name,
      avatarInitials: t.avatarInitials,
      designation: t.designation,
      organization: t.organization,
      skills: t.specializations.slice(0, 4),
      matchScore: t.matchScore,
      coursesCount: t.totalCourses,
      traineesCount: t.totalTrainees,
      rating: t.rating
    }));
}

// Default export compatibility
export const initialTrainerData = TRAINERS_DATABASE['rahul-sharma'];
export const trainerStats = TRAINERS_DATABASE['rahul-sharma'].stats;
export const competencyMatchData = TRAINERS_DATABASE['rahul-sharma'].competencyMatch;
export const aboutData = TRAINERS_DATABASE['rahul-sharma'].about;
export const competenciesList = TRAINERS_DATABASE['rahul-sharma'].competencies;
export const experienceList = TRAINERS_DATABASE['rahul-sharma'].experiences;
export const coursesList = TRAINERS_DATABASE['rahul-sharma'].courses;
export const performanceMetrics = TRAINERS_DATABASE['rahul-sharma'].performance;
export const traineeReviews = TRAINERS_DATABASE['rahul-sharma'].reviews;
export const similarTrainersList = getSimilarTrainers('rahul-sharma');
