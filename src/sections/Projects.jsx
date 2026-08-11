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
    <section id="projects" className="section-padding section-container">
      <SectionTitle
        title="Featured Projects"
        subtitle="A selection of projects that showcase my expertise in AI, backend, and full-stack development."
      />

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {projectCategories.map((cat) => (
          <motion.button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setShowAll(false) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                : 'glass text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + String(showAll)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="space-y-20 md:space-y-28"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-500 text-lg">No projects in this category yet.</p>
            </div>
          ) : (
            filtered.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
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
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium glass text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg transition-all cursor-pointer"
          >
            <FiGrid className="w-4 h-4" />
            {showAll ? 'Show Less' : 'View All Projects'}
            <FiArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}

      {caseStudy && (
        <ProjectModal project={caseStudy} onClose={() => setCaseStudy(null)} />
      )}
    </section>
  )
}
