import { motion } from 'framer-motion'

export default function ContactCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 21 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-[20px] border border-[var(--color-line)] p-8 lg:p-10 transition-all duration-300 hover:border-[var(--color-line-2)] ${className}`}
      style={{
        background: 'color-mix(in srgb, var(--color-bg) 55%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </motion.div>
  )
}
