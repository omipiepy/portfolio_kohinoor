import { motion } from 'framer-motion'
import ExpandableCard from '@/components/ui/expandable-card'
import { projects } from '@/data/portfolio'

const VISIBLE_COUNT = 3

export default function Projects({ showAll, onToggle }) {
  const visible = showAll ? projects : projects.slice(0, VISIBLE_COUNT)

  return (
    <section className="phi-section relative z-10 py-5">
      <div className="phi-wrap pointer-events-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="font-sans text-[32px] md:text-[36px] font-bold text-[var(--color-ink)]">
            Selected Projects
          </h2>
        </motion.div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {visible.map((project, idx) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ExpandableCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* See More */}
        {projects.length > VISIBLE_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: '-50px' }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={onToggle}
              className="btn-phi btn-phi--ghost btn-phi--sm"
            >
              {showAll ? 'Show Less' : 'See More'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
