import { motion } from 'framer-motion'

export default function SectionTitle({ kicker, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 21 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mb-14 text-center"
    >
      {kicker && (
        <p className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--color-faint)] mb-3">
          {kicker}
        </p>
      )}
      <h2 className="font-sans text-[32px] md:text-[36px] font-bold text-[var(--color-ink)] mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-[16px] text-[var(--color-muted)] mx-auto leading-relaxed" style={{ maxWidth: '580px', minWidth: '280px' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
