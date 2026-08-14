import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiArrowUpRight, FiCheck } from 'react-icons/fi'

export default function ProjectCard({ project, index, total, onCaseStudy }) {
  const isEven = index % 2 === 0
  const gallery = project.gallery?.length ? project.gallery : [project.image]
  const [active, setActive] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-[61.8fr_38.2fr] gap-[55px] items-center max-w-[1280px] mx-auto"
    >
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => onCaseStudy(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onCaseStudy(project)
          }
        }}
        aria-label={`Open case study for ${project.title}`}
        className={`relative group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-[21px] ${
          isEven ? 'md:order-1' : 'md:order-2'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="relative aspect-video rounded-[21px] overflow-hidden border border-[var(--color-line)] bg-[var(--color-panel)] transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)]">
          <motion.img
            key={gallery[active]}
            src={gallery[active]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {gallery.length > 1 && (
            <div className="absolute bottom-[13px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] px-[13px] py-[8px] rounded-full bg-black/40 backdrop-blur-md">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setActive(i)
                  }}
                  className={`h-[8px] rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? 'w-[21px] bg-white' : 'w-[8px] bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`View image ${i + 1} of ${gallery.length}`}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-[13px] right-[13px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[8px] group-hover:translate-y-0">
            <span className="flex items-center gap-[13px] px-[21px] py-[13px] rounded-full bg-black/50 backdrop-blur-md text-white text-[13px] font-medium tracking-[0.06em]">
              <FiEye size={13} />
              View Case Study
            </span>
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
          <motion.button
            onClick={() => onCaseStudy(project)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-phi btn-phi--accent btn-phi--sm !gap-[13px] !px-[21px] !py-[13px] !tracking-[0.08em] cursor-pointer"
          >
            <FiEye size={13} />
            View Case Study
            <FiArrowUpRight size={13} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
