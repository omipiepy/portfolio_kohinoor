import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiGithub, FiExternalLink, FiCheck, FiAlertCircle, FiBookOpen, FiTarget, FiLayers, FiBarChart2, FiCamera,
} from 'react-icons/fi'

function ModalSection({ icon: Icon, label, accent, children }) {
  return (
    <div>
      <h3 className="flex items-center gap-[13px] mb-[13px]">
        <span
          className="w-[34px] h-[34px] grid place-items-center rounded-[13px]"
          style={{
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
            color: accent,
          }}
        >
          <Icon size={13} />
        </span>
        <span className="phi-meta uppercase">{label}</span>
      </h3>
      <div className="pl-[47px]">{children}</div>
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto pointer-events-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 34, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="min-h-screen flex items-center justify-center p-[21px]"
        >
          <div className="w-full max-w-4xl net-panel overflow-hidden my-[34px]">
            <div className="relative">
              <div className="aspect-video overflow-hidden bg-[var(--color-panel)]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <button
                onClick={onClose}
                className="absolute top-[13px] right-[13px] w-[34px] h-[34px] grid place-items-center rounded-[13px] bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all cursor-pointer"
                aria-label="Close"
              >
                <FiX size={13} />
              </button>
              <div className="absolute bottom-[21px] left-[21px] right-[21px]">
                <p className="phi-meta mb-[8px]">{project.category.replace('-', ' / ')}</p>
                <h2 className="phi-h2 text-white mb-[8px]">{project.title}</h2>
                <p className="phi-meta text-white/60">{project.tagline}</p>
              </div>
            </div>

            <div className="p-[34px] space-y-[34px]">
              <ModalSection icon={FiLayers} label="Overview" accent="var(--color-accent)">
                <p className="phi-body text-[14px]">{project.overview}</p>
              </ModalSection>

              <div className="grid md:grid-cols-2 gap-[34px]">
                <ModalSection icon={FiAlertCircle} label="Problem" accent="var(--color-accent-2)">
                  <p className="phi-body text-[14px]">{project.problem}</p>
                </ModalSection>
                <ModalSection icon={FiTarget} label="Solution" accent="var(--color-accent)">
                  <p className="phi-body text-[14px]">{project.solution}</p>
                </ModalSection>
              </div>

              {project.architecture && (
                <ModalSection icon={FiCamera} label="Architecture" accent="var(--color-accent-2)">
                  <p className="phi-body text-[14px]">{project.architecture}</p>
                </ModalSection>
              )}

              <ModalSection icon={FiCheck} label="Key Features" accent="var(--color-accent)">
                <div className="flex flex-col gap-[13px]">
                  {project.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-[13px] text-[13px] text-[var(--color-muted)]"
                    >
                      <span className="w-[8px] h-[8px] rounded-full bg-[var(--color-accent)] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </ModalSection>

              <ModalSection icon={FiBarChart2} label="Technologies" accent="var(--color-accent-2)">
                <div className="flex flex-wrap gap-[8px]">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="net-chip !px-[8px] !py-[4px] !text-[12px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </ModalSection>

              <div className="grid md:grid-cols-2 gap-[34px]">
                <ModalSection icon={FiAlertCircle} label="Challenges" accent="var(--color-accent-2)">
                  <p className="phi-body text-[14px]">{project.challenges}</p>
                </ModalSection>
                <ModalSection icon={FiBarChart2} label="Results" accent="var(--color-accent)">
                  <p className="phi-body text-[14px]">{project.results}</p>
                </ModalSection>
              </div>

              <ModalSection icon={FiBookOpen} label="Lessons Learned" accent="var(--color-accent)">
                <p className="phi-body text-[14px]">{project.learned}</p>
              </ModalSection>

              <div className="flex flex-wrap gap-[13px] pt-[21px] border-t border-[var(--color-line)]">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-phi btn-phi--outline btn-phi--sm"
                >
                  <FiGithub size={13} />
                  View on GitHub
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
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
