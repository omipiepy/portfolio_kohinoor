import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGrid, FiArrowRight } from 'react-icons/fi'
import SectionTitle from '@/components/SectionTitle'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'
import { projects, projectCategories } from '@/data/portfolio'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [caseStudy, setCaseStudy] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(() => {
    let list = activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)
    return showAll ? list : list.slice(0, 3)
  }, [activeCategory, showAll])

  return (
    <section id="projects" className="phi-section">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          kicker="projects"
          title="Featured Projects"
          subtitle="A selection of projects that showcase my expertise in AI, backend, and full-stack development."
        />

        <div className="flex flex-wrap justify-center gap-[13px] mb-[55px]">
          {projectCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setShowAll(false)
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`net-chip uppercase cursor-pointer ${
                activeCategory === cat.id
                  ? '!border-[var(--color-accent)] !text-[var(--color-accent)]'
                  : ''
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + String(showAll)}
            initial={{ opacity: 0, y: 21 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -21 }}
            transition={{ duration: 0.4 }}
            className="space-y-[89px]"
          >
            {filtered.length === 0 ? (
              <div className="text-center py-[55px]">
                <p className="phi-body">No projects in this category yet.</p>
              </div>
            ) : (
              filtered.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  total={projects.length}
                  onCaseStudy={setCaseStudy}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {projects.filter((p) => activeCategory === 'all' || p.category === activeCategory).length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-[55px]"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-phi btn-phi--ghost btn-phi--sm"
            >
              <FiGrid size={13} />
              {showAll ? 'Show Less' : 'View All Projects'}
              <FiArrowRight size={13} />
            </motion.button>
          </motion.div>
        )}

        {caseStudy && <ProjectModal project={caseStudy} onClose={() => setCaseStudy(null)} />}
      </div>
    </section>
  )
}
