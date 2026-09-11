import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export const contactInfo = {
  heading: "Let's Connect",
  intro:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out — I'd love to hear from you.",
  email: 'dallakotikohinoor@gmail.com',
  phone: '+977-9800000000',
  location: 'Kathmandu, Nepal',
  availability: 'Open to Opportunities',
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
  { name: 'GitHub', url: 'https://github.com/omipiepy', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/', icon: 'FaLinkedinIn' },
  { name: 'Email', url: 'mailto:dallakotikohinoor@gmail.com', icon: 'FaEnvelope' },
]
