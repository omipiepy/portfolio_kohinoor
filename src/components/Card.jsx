import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  delay = 0,
  hover = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={`glass-card rounded-2xl p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}
