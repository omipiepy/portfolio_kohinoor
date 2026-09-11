export const personalInfo = {
  name: 'Kohinoor Dallakoti',
  title: 'UI/UX Designer',
  email: 'dallakotikohinoor@gmail.com',
  phone: '+977-9800000000',
  location: 'Kathmandu, Nepal',
  resumeUrl: '/resume.pdf',
  avatar: '/pic3.jpeg',
  rotatingTitles: [
    'UI/UX Designer',
    'Web Developer',
    'Backend Developer',
    'Full Stack Developer',
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
    category: 'Frontend',
    skills: [
      { name: 'HTML', level: 90, icon: 'SiHtml5' },
      { name: 'CSS', level: 85, icon: 'SiCss3' },
      { name: 'JavaScript', level: 85, icon: 'SiJavascript' },
      { name: 'React', level: 80, icon: 'SiReact' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 85, icon: 'SiNodejs' },
      { name: 'Python', level: 80, icon: 'SiPython' },
    ],
  },
  {
    category: 'Data & ML',
    skills: [
      { name: 'MongoDB', level: 80, icon: 'SiMongodb' },
      { name: 'PostgreSQL', level: 75, icon: 'SiPostgresql' },
      { name: 'Scikit-learn', level: 65, icon: 'SiScikitlearn' },
    ],
  },
  {
    category: 'Design Tools',
    skills: [
      { name: 'Figma', level: 90, icon: 'SiFigma' },
      { name: 'Adobe Illustrator', level: 85, icon: 'SiIllustrator' },
    ],
  },
]

export const projects = [
  {
    title: 'ITKhoji',
    category: 'fullstack',
    categoryLabel: 'Web Development',
    tagline: 'Job portal for IT professionals',
    description: 'A MERN stack job board where IT professionals can search for roles, upload resumes, and employers can post jobs and manage applicants.',
    designFocus: ['UI Design', 'System Architecture', 'User Flow', 'Data Modeling'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
    gallery: ['/images/itkhoji1.png', '/images/itkhoji2.png'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Redux'],
    github: 'https://github.com/omipiepy/itkhoji',
    live: '#',
    highlights: [
      'Job search with filters',
      'Resume upload and parsing',
      'Employer dashboard',
      'Real-time notifications',
      'Secure authentication'
    ],
    overview: 'ITKhoji connects IT job seekers with employers through a responsive web application.',
    problem: 'Finding relevant IT jobs is scattered across multiple platforms; there was a need for a dedicated portal.',
    solution: 'Built a MERN stack application with MongoDB for job and user data, Express/Node.js for REST API with JWT auth, React frontend with Redux for state management.',
    architecture: 'MongoDB collections for users, jobs, applications; Express REST API with protected routes; React SPA with Redux store.',
    features: [
      'Secure login & signup with JWT',
      'Advanced job search and filtering',
      'Resume upload and parsing',
      'Employer job posting and applicant management',
      'Real-time notifications via WebSocket (optional)'
    ],
    challenges: 'Designing efficient search algorithms and ensuring file uploads/resume parsing worked smoothly.',
    results: 'A functional job portal where users can search, apply, and employers can manage hiring workflow.',
    learned: 'Full-stack development with MERN, integrating file handling, role-based access control, and real-time updates.'
  },
  {
    id: 4,
    title: 'BeautyKart',
    category: 'fullstack',
    categoryLabel: 'Web Development',
    tagline: 'Online cosmetic store',
    description: 'An e-commerce platform for cosmetics built with PostgreSQL, Prisma, Express, React, and Node.js.',
    designFocus: ['E-Commerce UX', 'Product UI', 'Checkout Flow'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop',
    gallery: ['/images/beautykart1.png', '/images/beautykart2.png'],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/omipiepy/beautykart',
    live: '#',
    highlights: [
      'Product catalog with search and filters',
      'Shopping cart and checkout',
      'User authentication and order history',
      'Admin panel for product management',
      'Responsive design'
    ],
    overview: 'BeautyKart offers a seamless shopping experience for cosmetic products.',
    problem: 'Existing cosmetic stores lacked a modern, user-friendly interface and robust backend.',
    solution: 'Used Prisma ORM with PostgreSQL for reliable data modeling, Express/Node.js for REST API, React for frontend with context API for state.',
    architecture: 'PostgreSQL database with Prisma schema defining products, users, orders; Express REST API; React SPA.',
    features: [
      'Secure authentication with JWT',
      'Product browsing, search, and filtering',
      'Shopping cart with persistence',
      'Checkout and order processing',
      'Admin dashboard for inventory and orders'
    ],
    challenges: 'Setting up Prisma migrations and ensuring smooth integration between PostgreSQL and the API.',
    results: 'A fully functional e-commerce site where users can browse, purchase, and track orders.',
    learned: 'Working with Prisma ORM, PostgreSQL, and building a complete e-commerce flow from product listing to order fulfillment.'
  },
  {
    id: 1,
    title: 'Controller Poster',
    category: 'design',
    categoryLabel: 'UI/UX',
    tagline: 'Poster design for a gaming controller.',
    description:
      'A bold promotional poster for a gaming controller, exploring strong typography, product composition, visual hierarchy, and color contrast.',
    designFocus: ['Typography', 'Composition', 'Color System', 'Product Presentation'],
    image: '/images/controller-poster.png',
    technologies: ['Figma', 'Adobe Illustrator'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Poster layout & composition',
      'Typography hierarchy',
      'Color grading',
    ],
    overview: 'A poster design of a gaming controller.',
    problem: 'Create a striking poster-worthy visual for a gaming controller.',
    solution: 'Designed a bold poster layout with strong typography, composition, and color grading.',
    architecture: 'Single-page poster composition combining product visual with typography and color.',
    features: [
      'Bold product-focused composition',
      'Clean typography hierarchy',
      'Polished color treatment',
    ],
    challenges: 'Balancing product visual with text elements without overcrowding.',
    results: 'A clean, professional poster highlighting the controller as the hero element.',
    learned: 'Poster design fundamentals — composition, hierarchy, and visual storytelling.',
  },
  {
    id: 2,
    title: 'The Converse Shoes',
    category: 'visual',
    categoryLabel: 'Web / Visual Design',
    tagline: 'Animated advertisement for shoes.',
    description:
      'An experimental digital shopping experience focused on bold editorial typography, product presentation, and immersive visual storytelling.',
    designFocus: ['Layout', 'Typography', 'Product UI', 'Navigation'],
    image: '/images/shoes-ads.png',
    technologies: ['Figma', 'Adobe Illustrator'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Animated product ad',
      'Motion design',
      'Brand-forward visuals',
    ],
    overview: 'An animated advertisement showcasing a pair of shoes with eye-catching motion.',
    problem: 'Create an ad that makes a shoe product feel dynamic and appealing.',
    solution: 'Designed the ad visual in Figma and Illustrator with a motion-ready layout for animation.',
    architecture: 'Ad frame design combining shoe product with animated motion elements.',
    features: [
      'Animated product showcase',
      'Motion-friendly layout',
      'Brand-forward styling',
    ],
    challenges: 'Designing frames that stay visually strong when animated.',
    results: 'A lively, product-focused animated ad.',
    learned: 'Designing for motion — layouts that hold up across animated frames.',
  },
]

export const education = [
  {
    degree: 'B.E. in Computer Engineering',
    institution: 'Thapathali Campus, Tribhuvan University',
    period: 'Graduated',
    description: 'Completed Bachelor in Computer Engineering with projects in ML, web development, and databases.',
  },
]

export const aboutSummary =
  'I am a Computer Engineering graduate working as an AI/ML Intern. I build ML models, AI applications, and full-stack web products.'