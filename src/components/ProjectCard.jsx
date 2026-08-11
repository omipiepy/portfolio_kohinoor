import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight, FiCheck } from 'react-icons/fi'

export default function ProjectCard({ project, index, total, onCaseStudy }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-[61.8fr_38.2fr] gap-[55px] items-center max-w-[1280px] mx-auto"
    >
      <motion.div
        className={`relative group ${isEven ? 'md:order-1' : 'md:order-2'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="relative aspect-video rounded-[21px] overflow-hidden border border-[var(--color-line)] bg-[var(--color-panel)]">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-[13px] right-[13px] flex gap-[8px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[8px] group-hover:translate-y-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-[34px] h-[34px] grid place-items-center rounded-[13px] bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
              aria-label="View on GitHub"
            >
              <FiGithub size={13} />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-[34px] h-[34px] grid place-items-center rounded-[13px] bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
              aria-label="Live demo"
            >
              <FiExternalLink size={13} />
            </motion.a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 21 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={isEven ? 'md:order-2' : 'md:order-1'}
      >
        <p className="phi-meta mb-[13px]">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
        <h3 className="phi-h2 mb-[13px]">{project.title}</h3>
        <p className="phi-meta text-[var(--color-accent)] mb-[21px]">{project.tagline}</p>
        <p className="phi-body mb-[34px] text-[14px] line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-[8px] mb-[34px]">
          {project.technologies.map((tech) => (
            <span key={tech} className="net-chip !px-[8px] !py-[4px] !text-[12px]">
              {tech}
            </span>
          ))}
        </div>

        <ul className="space-y-[13px] mb-[34px]">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-[13px] text-[13px] text-[var(--color-muted)]">
              <span className="mt-[2px] w-[13px] h-[13px] rounded-full bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] grid place-items-center shrink-0">
                <FiCheck size={8} className="text-[var(--color-accent)]" />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-[13px]">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-phi btn-phi--outline btn-phi--sm"
          >
            <FiGithub size={13} />
            GitHub
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-phi btn-phi--accent btn-phi--sm"
          >
            <FiExternalLink size={13} />
            Live Demo
          </motion.a>
          <motion.button
            onClick={() => onCaseStudy(project)}
            whileHover={{ x: 3 }}
            className="btn-phi btn-phi--ghost btn-phi--sm cursor-pointer"
          >
            Case Study
            <FiArrowUpRight size={13} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
