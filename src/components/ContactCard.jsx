import { motion } from 'framer-motion'

export default function ContactCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 21 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={`net-panel ${className}`}
    >
      {children}
    </motion.div>
  )
}
