import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export const contactInfo = {
  heading: "Let's Connect",
  intro:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out — I'd love to hear from you.",
  email: 'dallakotikohinoor@gmail.com',
  phone: '+977-9800000000',
  location: 'Kathmandu, Nepal',
  availability: 'Open to Opportunities',
  resumeUrl: '#download',
  callout: "Let's build something amazing together.",
}

export const contactDetails = [
  {
    key: 'email',
    icon: FiMail,
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    copyable: true,
  },
  {
    key: 'phone',
    icon: FiPhone,
    label: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
    copyable: true,
  },
  {
    key: 'location',
    icon: FiMapPin,
    label: 'Location',
    value: contactInfo.location,
    href: null,
    copyable: false,
  },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/omipiepy', icon: 'FaGithub', color: 'hover:text-gray-900 dark:hover:text-white' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/', icon: 'FaLinkedinIn', color: 'hover:text-blue-600' },
  { name: 'Email', url: 'mailto:dallakotikohinoor@gmail.com', icon: 'FaEnvelope', color: 'hover:text-indigo-500' },
]
