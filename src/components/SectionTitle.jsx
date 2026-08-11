import { motion } from 'framer-motion'

export default function SectionTitle({ kicker, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 21 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mb-[55px] text-center"
    >
      {kicker && <p className="phi-meta mb-[13px] uppercase">{kicker}</p>}
      <h2 className="phi-h2 mb-[13px]">{title}</h2>
      {subtitle && (
        <p className="phi-body mx-auto" style={{ maxWidth: '61.8%', minWidth: '280px' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
