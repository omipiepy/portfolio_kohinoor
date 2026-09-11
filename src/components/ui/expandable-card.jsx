import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ExpandableCard({ project }) {
  const [isOpen, setIsOpen] = useState(false)
  const layoutId = `project-card-${project.id}`

  return (
    <>
      {/* Collapsed card */}
      <motion.div
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer overflow-hidden rounded-xl border border-[var(--color-line)] hover:border-[var(--color-accent)]/30 transition-colors group shadow-sm"
        style={{ background: 'var(--color-bg)' }}
      >
        <motion.div layoutId={`image-${layoutId}`} className="relative h-48 w-full overflow-hidden">
          <motion.img
            layoutId={`img-${layoutId}`}
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
        <div className="p-5 sm:p-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-accent)]">
            {project.categoryLabel}
          </span>
          <motion.h3
            layoutId={`title-${layoutId}`}
            className="text-base font-semibold tracking-tight text-[var(--color-ink)] mt-1 mb-1"
          >
            {project.title}
          </motion.h3>
          <motion.p
            layoutId={`desc-${layoutId}`}
            className="text-[var(--color-muted)] text-xs tracking-wide line-clamp-2"
          >
            {project.tagline || project.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden border border-[var(--color-line)] z-10 flex flex-col shadow-xl max-h-[90vh]"
        style={{ background: 'var(--color-card)' }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors backdrop-blur-sm"
                style={{ background: 'color-mix(in srgb, var(--color-bg) 50%, transparent)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>

              {/* Image */}
              <motion.div layoutId={`image-${layoutId}`} className="relative h-56 sm:h-72 w-full overflow-hidden shrink-0">
                <motion.img
                  layoutId={`img-${layoutId}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <motion.h3
                  layoutId={`title-${layoutId}`}
                  className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-ink)] mb-1"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`desc-${layoutId}`}
                  className="text-[var(--color-accent)] text-xs font-medium tracking-wide uppercase mb-6"
                >
                  {project.categoryLabel}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0, delay: 0.1 }}
                  className="text-[var(--color-muted)] text-sm leading-relaxed space-y-4"
                >
                  <p>{project.description}</p>

                  {project.overview && (
                    <p className="text-[var(--color-faint)]">{project.overview}</p>
                  )}

                  {project.technologies && (
                    <div>
                      <h4 className="text-[var(--color-ink)] font-semibold mt-6 mb-2 tracking-tight">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)] text-[var(--color-accent)] border border-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.features && (
                    <div>
                      <h4 className="text-[var(--color-ink)] font-semibold mt-6 mb-2 tracking-tight">Features</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-[var(--color-muted)]">
                        {project.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--color-line-2)] text-[var(--color-ink)] font-medium text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <FiGithub size={16} />
                        View Code
                      </a>
                    )}
                    <a
                      href={project.live || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-primary-foreground)] font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
                    >
                      <FiExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
