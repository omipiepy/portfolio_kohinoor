import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi'
import ProjectModal from '@/components/ProjectModal'
import { projects, projectCategories } from '@/data/portfolio'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [caseStudy, setCaseStudy] = useState(null)

  const filtered = useMemo(() => {
    return activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const padNumber = (n) => String(n).padStart(2, '0')

  return (
    <section id="projects" className="projects-section phi-section relative z-10">
      <div className="phi-wrap pointer-events-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 21 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-sans text-[32px] md:text-[36px] font-bold text-[var(--color-ink)]">
            Selected Projects
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="projects-filters"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`projects-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Editorial project list */}
        {filtered.length === 0 ? (
          <p className="font-sans text-[16px] text-[var(--color-muted)] text-center py-16">
            No projects in this category yet.
          </p>
        ) : (
          <div className="max-w-[1100px] mx-auto">
            {filtered.map((project, idx) => {
              const isFullstack = project.category === 'fullstack'
              return (
                <motion.article
                  key={project.id || project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="editorial-project"
                >
                  {/* Image */}
                  <div className="editorial-image">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="editorial-content">
                    <span className="editorial-number">
                      {padNumber(idx + 1)} / {project.categoryLabel}
                    </span>

                    <h3 className="editorial-title">{project.title}</h3>

                    <p className="editorial-description">{project.description}</p>

                    {project.technologies && (
                      <div className="editorial-meta-group">
                        <p className="editorial-meta-label">Tools</p>
                        <div className="editorial-meta-items">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="editorial-meta-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    {isFullstack && (
                      <div className="flex flex-col sm:flex-row gap-5 pt-6">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -4, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative flex items-center justify-center gap-3 px-12 py-6 rounded-2xl overflow-hidden border border-[var(--color-line-2)] bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)] backdrop-blur-xl text-[var(--color-ink)] font-semibold text-[16px] tracking-wide hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 shadow-md hover:shadow-xl"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <FiGithub size={18} className="relative z-10" />
                            <span className="relative z-10">GitHub</span>
                            <FiArrowUpRight size={15} className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </motion.a>
                        )}
                        <motion.a
                          href={project.live || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -4, scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="group relative flex items-center justify-center gap-3 px-12 py-6 rounded-2xl overflow-hidden bg-gradient-to-r from-[var(--color-accent)] via-[color-mix(in_srgb,var(--color-accent)_85%,#fff)] to-[var(--color-accent)] text-white font-bold text-[16px] tracking-wide shadow-lg shadow-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] hover:shadow-2xl hover:shadow-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] transition-all duration-300"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                          <FiExternalLink size={18} className="relative z-10" />
                          <span className="relative z-10">Live Demo</span>
                          <FiArrowUpRight size={15} className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>

      {/* Project modal */}
      {caseStudy && (
        <ProjectModal project={caseStudy} onClose={() => setCaseStudy(null)} />
      )}
    </section>
  )
}
