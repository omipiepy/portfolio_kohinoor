import { motion } from 'framer-motion'

export default function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="w-12 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500" />
        <span className="w-2 h-2 rounded-full bg-indigo-500" />
        <span className="w-12 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
      </div>
    </motion.div>
  )
}
