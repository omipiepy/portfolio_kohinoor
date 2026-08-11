export const personalInfo = {
  name: 'Kohinoor Dallakoti',
  title: 'Web Developer',
  tagline: 'Jack of all trades, master of none — but oftentimes better than a master of one.',
  email: 'dallakotikohinoor@gmail.com',
  phone: '+977-9800000000',
  location: 'Kathmandu, Nepal',
  resumeUrl: '#download',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=kohinoor',
  rotatingTitles: [
    'Web Developer',
    'AI/ML Engineer',
  ],
}

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/omipiepy', icon: 'FaGithub' },
  { name: 'Email', url: 'mailto:dallakotikohinoor@gmail.com', icon: 'FaEnvelope' },
]

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const skillCategories = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', level: 85, icon: 'FaPython' },
      { name: 'JavaScript', level: 80, icon: 'FaJs' },
      { name: 'HTML', level: 85, icon: 'FaHtml5' },
      { name: 'CSS', level: 80, icon: 'FaCss3' },
      { name: 'C++', level: 70, icon: 'FaCode' },
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      { name: 'PyTorch', level: 75, icon: 'SiPytorch' },
      { name: 'NumPy', level: 80, icon: 'SiNumpy' },
      { name: 'Pandas', level: 80, icon: 'SiPandas' },
      { name: 'Matplotlib', level: 75, icon: 'FaChartBar' },
      { name: 'scikit-learn', level: 70, icon: 'SiScikitlearn' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 75, icon: 'FaNodeJs' },
      { name: 'Express', level: 75, icon: 'SiExpress' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', level: 75, icon: 'SiMongodb' },
      { name: 'PostgreSQL', level: 70, icon: 'SiPostgresql' },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', level: 65, icon: 'FaDocker' },
      { name: 'Git', level: 80, icon: 'FaGitAlt' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'VS Code', level: 90, icon: 'SiVscodium' },
      { name: 'Jupyter', level: 80, icon: 'SiJupyter' },
    ],
  },
]

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'fullstack', label: 'Web' },
  { id: 'research', label: 'Research' },
]

export const projects = [
  {
    title: '3D Indoor Scene Reconstruction',
    category: 'ai-ml',
    tagline: 'Single image to full 3D scene with object-level understanding.',
    description:
      'A generalizable pipeline that takes a single RGB image and reconstructs the entire 3D indoor scene with object-aware segmentation and depth estimation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop',
    technologies: ['PyTorch', 'Computer Vision', '3D Reconstruction', 'Deep Learning'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Single image to 3D scene',
      'Object-aware segmentation',
      'Generalizable across scenes',
      'Depth estimation + meshes',
    ],
    overview: 'A deep learning pipeline that reconstructs full 3D indoor scenes from a single RGB image, identifying and segmenting individual objects within the scene.',
    problem: 'Traditional 3D reconstruction requires multiple viewpoints or depth sensors. Single-image reconstruction remains challenging due to depth ambiguity and occlusion.',
    solution: 'A multi-stage architecture combining monocular depth estimation, object detection, and neural implicit surface reconstruction to produce object-aware 3D scenes.',
    architecture: 'Encoder-decoder with attention, depth estimation head, object segmentation branch, and a neural rendering module for mesh generation.',
    features: [
      'Single image to 3D scene reconstruction',
      'Object-aware segmentation',
      'Generalizable across indoor scenes',
      'Depth estimation and mesh generation',
    ],
    challenges: 'Achieving accurate depth estimation and object segmentation from a single viewpoint while maintaining generalization across diverse indoor environments.',
    results: 'State-of-the-art reconstruction quality on indoor benchmark datasets with robust generalization to unseen scenes.',
    learned: 'Deep understanding of 3D computer vision, monocular depth estimation, and object-aware neural rendering techniques.',
  },
  {
    title: 'Optimizing GRU Networks',
    category: 'research',
    tagline: 'Model compression via Lottery Ticket, Knowledge Distillation & QAT.',
    description:
      'A research project exploring three model compression techniques on GRU networks to reduce size while maintaining accuracy.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    technologies: ['PyTorch', 'Lottery Ticket', 'Knowledge Distillation', 'QAT'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Lottery Ticket Hypothesis',
      'Knowledge distillation',
      'Quantization-aware training',
      'Compression vs accuracy',
    ],
    overview: 'Comparative study of three model compression techniques applied to Gated Recurrent Unit networks, analyzing trade-offs between size reduction and accuracy retention.',
    problem: 'Deep learning models are increasingly deployed on edge devices with limited memory and compute, requiring effective compression without significant accuracy loss.',
    solution: 'Implemented and compared Lottery Ticket Hypothesis pruning, Knowledge Distillation, and Quantization-Aware Training on GRU-based models.',
    architecture: 'GRU-based sequence model with three compression branches for comparative analysis.',
    features: [
      'Lottery Ticket Hypothesis implementation',
      'Knowledge distillation pipeline',
      'Quantization-aware training',
      'Comparative performance analysis',
    ],
    challenges: 'Balancing model compression ratios with accuracy retention across different optimization techniques.',
    results: 'Up to 10x compression with less than 2% accuracy degradation across all three methods.',
    learned: 'Advanced model optimization techniques and research methodology for deep learning experiments.',
  },
  {
    title: 'DBMS-Based Chat System',
    category: 'fullstack',
    tagline: 'Real-time messaging powered by database management principles.',
    description:
      'A real-time chat system leveraging DBMS concepts — normalized schemas, indexed queries, and ACID transactions for reliable messaging.',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=450&fit=crop',
    technologies: ['Python', 'SQL', 'DBMS', 'React'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Real-time messaging',
      'User authentication',
      'Message threading',
      'Optimized queries',
    ],
    overview: 'A real-time chat application designed with database-first principles — normalized schema design, query optimization, and ACID-compliant transactions.',
    problem: 'Many chat applications suffer from slow message retrieval and poor scalability due to denormalized or poorly indexed database designs.',
    solution: 'Designed a normalized relational schema with strategic indexing and optimized queries for fast message retrieval and real-time sync.',
    architecture: 'PostgreSQL backend with normalized schema, React frontend, REST API for message threading and user management.',
    features: [
      'Real-time messaging with DBMS backend',
      'User authentication and profiles',
      'Message threading and search',
      'Query-optimized data retrieval',
    ],
    challenges: 'Designing normalized database schemas for efficient message retrieval and maintaining real-time sync without performance degradation.',
    results: 'Sub-100ms query times for message retrieval even under concurrent loads.',
    learned: 'Practical application of database normalization, indexing strategies, and ACID properties in a real-time application.',
  },
  {
    title: 'MERN Blogging Platform',
    category: 'fullstack',
    tagline: 'Full-featured blog with rich editing and user roles.',
    description:
      'A complete blogging platform built with the MERN stack featuring rich text editing, role-based access, and a responsive design.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Rich text editor',
      'JWT authentication',
      'Categories & tags',
      'Responsive design',
    ],
    overview: 'A full-stack blogging platform with user authentication, role-based access control, and a rich content editing experience.',
    problem: 'Existing blogging platforms are either too complex or lack customization. A clean, self-hosted solution was needed.',
    solution: 'Built from scratch using MERN stack with JWT authentication, role-based authorization, and a rich text editor for content creation.',
    architecture: 'MongoDB for flexible content storage, Express + Node.js REST API, React frontend with role-based routing.',
    features: [
      'Rich text editor for blog posts',
      'User authentication and roles',
      'Categories and tags',
      'Responsive design',
    ],
    challenges: 'Implementing secure JWT authentication and designing a flexible content management system that supports rich media.',
    results: 'Fully functional blogging platform deployed with support for multiple user roles and rich media content.',
    learned: 'Full-stack development patterns with MERN, JWT authentication, and building responsive UIs with React.',
  },
]

export const experiences = [
  {
    title: 'AI/ML Intern',
    company: 'Alpinist Studios',
    period: 'Current',
    description:
      'Working on AI/ML projects, applying machine learning concepts to real-world problems, and building intelligent solutions.',
    technologies: ['Python', 'PyTorch', 'Machine Learning', 'Deep Learning'],
  },
]

export const education = [
  {
    degree: 'B.E. in Computer Engineering',
    institution: 'Thapathali Campus, Tribhuvan University',
    period: 'Graduated',
    description: 'Completed Bachelor in Computer Engineering with projects spanning ML, web development, and database systems.',
  },
]

export const certifications = [
  {
    title: 'MERN Stack Development Course',
    issuer: 'letslearn.asia',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    credentialUrl: '#',
  },
]

export const achievements = [
  {
    title: 'Projects Built',
    value: 10,
    suffix: '+',
    description: 'Basic to intermediate level projects',
  },
  {
    title: 'Tech Stack',
    value: 12,
    suffix: '+',
    description: 'Languages and frameworks explored',
  },
  {
    title: 'Certifications',
    value: 1,
    suffix: '',
    description: 'MERN Stack Development',
  },
  {
    title: 'GitHub Repos',
    value: 10,
    suffix: '+',
    description: 'Academic and personal projects',
  },
]

export const testimonials = []

export const interests = [
  'Vibecoding',
  'AI Research',
  'Open Source',
  'Reading',
  'Chess',
  'Photography',
]

export const aboutSummary =
  'I am a Computer Engineering graduate from Thapathali Campus, Tribhuvan University, currently working as an AI/ML Intern at Alpinist Studios. I have built projects across ML, full-stack web development, and database systems. I believe in the philosophy "Jack of all trades, master of none" — I enjoy exploring diverse technologies and frameworks. I am basically a vibecoder who loves building things and learning along the way.'
