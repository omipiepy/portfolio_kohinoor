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
    category: 'UI/UX & Development',
    skills: [
      { name: 'Figma', level: 90, icon: 'SiFigma' },
      { name: 'Adobe Illustrator', level: 85, icon: 'SiIllustrator' },
      { name: 'Sketch', level: 75, icon: 'SiSketch' },
      { name: 'HTML', level: 85, icon: 'SiHtml5' },
      { name: 'CSS', level: 80, icon: 'SiCss3' },
      { name: 'JavaScript', level: 80, icon: 'SiJavascript' },
    ],
  },
]

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'fullstack', label: 'Web' },
  { id: 'design', label: 'UI/UX' },
]

export const projects = [
  {
    title: 'Guff App',
    category: 'fullstack',
    tagline: 'Social media app — log in to post, discover, and connect.',
    description:
      'My main project: a full social media platform where users log in to post updates, discover new content, browse their feed, see notifications, view profiles, and manage their inbox.',
    image: '/images/post.png',
    gallery: ['/images/post.png', '/images/login.png', '/images/discover.png', '/images/inbox.png'],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Login & authentication',
      'Create & share posts',
      'Discover new content',
      'Personalized feed',
      'Notifications',
      'Profiles & inbox',
    ],
    overview:
      'Guff App is a social media app where users log in to post, discover new content, see a personalized feed, get notifications, view profiles, and chat in their inbox.',
    problem:
      'Most social platforms are cluttered and hard to learn from. I wanted to build a clean, full-stack social app covering the core features people use every day.',
    solution:
      'Built with the MERN stack — MongoDB for user and post data, an Express + Node.js REST API with JWT authentication, and a React frontend for posting, feeds, discovery, notifications, profiles, and inbox.',
    architecture:
      'MongoDB collections for users, posts, likes, comments, and messages; Express REST API with JWT-protected routes; React single-page app for the UI.',
    features: [
      'Secure login & signup with JWT',
      'Create and share posts',
      'Discover feed for new content',
      'Notifications for activity',
      'User profiles',
      'Inbox for direct messages',
    ],
    challenges:
      'Designing clean data models for posts, likes, notifications, and messages while keeping the API fast and the UI responsive.',
    results:
      'A complete social app where you can log in, post, discover, see your feed and notifications, view profiles, and chat in your inbox.',
    learned:
      'Full-stack development with the MERN stack — authentication, REST APIs, data modeling, and building a responsive React UI.',
  },
  {
    title: 'Controller Poster',
    category: 'design',
    tagline: 'Poster design for a gaming controller.',
    description:
      'A poster design featuring a gaming controller — a graphic design project built with UI/UX design tools.',
    image: '/images/controller-poster.png',
    technologies: ['Figma', 'Adobe Illustrator'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Poster layout & composition',
      'Typography hierarchy',
      'Color grading',
    ],
    overview: 'A poster design of a gaming controller, crafted as a visual design project.',
    problem: 'Create a striking, poster-worthy visual for a gaming controller product.',
    solution: 'Designed a bold poster layout with strong typography, composition, and color grading in design tools.',
    architecture: 'Single-page poster composition combining the product visual with typography and color treatment.',
    features: [
      'Bold product-focused composition',
      'Clean typography hierarchy',
      'Polished color treatment',
    ],
    challenges: 'Balancing the product visual with text elements without overcrowding the poster.',
    results: 'A clean, professional poster that highlights the controller as the hero element.',
    learned: 'Poster design fundamentals — composition, hierarchy, and visual storytelling.',
  },
  {
    title: 'Animated Shoes Ad',
    category: 'design',
    tagline: 'Animated advertisement for shoes.',
    description:
      'An animated shoe advertisement — a motion and graphic design project for showcasing a product.',
    image: '/images/shoes-ads.png',
    technologies: ['Figma', 'Adobe Illustrator'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Animated product ad',
      'Motion design',
      'Brand-forward visuals',
    ],
    overview: 'An animated advertisement designed to showcase a pair of shoes with eye-catching motion.',
    problem: 'Create an ad that makes a shoe product feel dynamic and appealing.',
    solution: 'Designed the ad visual in Figma and Illustrator with a motion-ready layout for animation.',
    architecture: 'Ad frame design combining the shoe product with animated motion elements.',
    features: [
      'Animated product showcase',
      'Motion-friendly layout',
      'Brand-forward styling',
    ],
    challenges: 'Designing frames that stay visually strong when animated.',
    results: 'A lively, product-focused animated ad.',
    learned: 'Designing for motion — layouts that hold up across animated frames.',
  },
  {
    title: 'Food App',
    category: 'design',
    tagline: 'Restaurant food service UI designed in Figma.',
    description:
      'A restaurant food service app UI designed in Figma — food1, food2, and food3 show the food service screens.',
    image: '/images/food1.png',
    gallery: ['/images/food1.png', '/images/food2.png', '/images/food3.png'],
    technologies: ['Figma', 'UI/UX Design'],
    github: 'https://github.com/omipiepy',
    live: '#',
    highlights: [
      'Restaurant food service screens',
      'Figma-designed UI',
      'Menu & ordering experience',
    ],
    overview: 'A restaurant food service app UI designed entirely in Figma, covering the food ordering experience.',
    problem: 'Design a clean, appetizing UI for a restaurant food delivery service.',
    solution: 'Created multiple screens in Figma — food listings, ordering flow, and service screens — with a warm, food-first visual style.',
    architecture: 'Figma screen designs for the restaurant food service flow.',
    features: [
      'Restaurant food service screens',
      'Clean menu browsing UI',
      'Appetizing visual design',
    ],
    challenges: 'Making food photography and UI elements work together without clutter.',
    results: 'A polished food service UI with a clear browsing and ordering experience.',
    learned: 'UI/UX design in Figma — screen flow, components, and food-focused visual design.',
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
  'AI Research',
  'Open Source',
  'Reading',
  'Photography',
]

export const aboutSummary =
  'I am a Computer Engineering graduate from Thapathali Campus, Tribhuvan University, currently working as an AI/ML Intern at Alpinist Studios.\n\nI build across the stack — ML models, AI applications, and full-stack web products. I have shipped projects spanning deep learning, retrieval-augmented generation, and real-time web apps.'
