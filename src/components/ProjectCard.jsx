import { motion } from 'framer-motion'
import { FiEye, FiArrowUpRight, FiCheck, FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, onCaseStudy }) {
  const gallery = project.gallery?.length ? project.gallery : [project.image]
  const isFullstack = project.category === 'fullstack'

  return (
    <motion.div
      initial={{ opacity: 0, y: 21 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="net-panel relative overflow-hidden"
    >
      {/* Image */}
      {gallery.length > 0 && (
        <div className="relative">
          <img
            src={gallery[0]}
            alt={project.title}
            className="w-full h-[200px] object-cover"
          />
          {gallery.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-sm">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  className={`h-4 w-4 rounded-full transition-all duration-300 cursor-pointer ${
                    i === 0 ? 'w-6 bg-white' : 'w-4 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="phi-h2 mb-3">{project.title}</h3>
        <p className="phi-meta text-[var(--color-accent)] mb-3">{project.tagline}</p>
        <p className="phi-body mb-5">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span key={tech} className="net-chip px-3 py-1 text-[12px]">
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5 mb-5 text-[var(--color-muted)]">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)]">
                <FiCheck size={8} className="text-[var(--color-accent)]" />
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        {isFullstack && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border border-[var(--color-line-2)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] backdrop-blur-md text-[var(--color-ink)] font-medium text-[14px] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer"
              >
                <FiGithub size={16} />
                <span>GitHub</span>
                <FiArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </motion.a>
            )}
            {project.live && project.live !== '#' && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-[color-mix(in_srgb,var(--color-accent)_70%,#fff)] text-white font-semibold text-[14px] shadow-lg shadow-[color-mix(in_srgb,var(--color-accent)_25%,transparent)] hover:shadow-xl hover:shadow-[color-mix(in_srgb,var(--color-accent)_35%,transparent)] transition-all duration-300 cursor-pointer"
              >
                <FiExternalLink size={16} />
                <span>Live Demo</span>
                <FiArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}