import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiCheck, FiAlertCircle, FiBookOpen, FiTarget, FiLayers, FiBarChart2, FiArrowLeft,
} from 'react-icons/fi'

const categoryLabels = {
  fullstack: 'WEB',
  design: 'UI/UX DESIGN',
  'ai-ml': 'AI / ML',
  research: 'Research',
}

function ModalSection({ icon: Icon, label, children, tint = 8 }) {
  return (
    <div>
      <h3 className="flex items-center gap-3 mb-4">
        <span
          className="icon-tint"
          style={{
            background: `color-mix(in srgb, var(--color-accent) ${tint}%, transparent)`,
          }}
        >
          <Icon size={18} />
        </span>
        <span className="font-mono text-[13px] uppercase tracking-[0.05em] text-[var(--color-faint)]">{label}</span>
      </h3>
      <div className="space-y-3">{children}</div>
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
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="min-h-screen flex items-start justify-center p-4 pt-16 pb-16"
        >
          <div className="w-full max-w-[960px] overflow-hidden my-6 rounded-[20px] border border-[var(--color-line)] shadow-[0_24px_64px_rgba(0,0,0,0.3)]" style={{ background: 'color-mix(in srgb, var(--color-bg) 92%, transparent)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            {/* Cover Image */}
            <div className="relative h-[400px] md:h-[480px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Bottom-heavy gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Back link — top-left */}
              <button
                onClick={onClose}
                className="absolute top-6 left-6 back-link flex items-center gap-2 hover:underline cursor-pointer"
              >
                <FiArrowLeft size={14} />
                Back to Projects
              </button>

              {/* Content anchored bottom-left */}
              <div className="absolute bottom-0 left-0 p-8 max-w-[700px]">
                <span className="inline-block font-mono text-[12px] uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white mb-3">
                  {categoryLabels[project.category] || project.category}
                </span>
                <h2 className="font-sans text-[40px] md:text-[48px] font-bold text-white mb-2" style={{ lineHeight: 1.1 }}>
                  {project.title}
                </h2>
                <p className="font-sans text-[16px] text-white/85">{project.description}</p>
              </div>
            </div>

            {/* Body sections */}
            <div className="p-8 md:p-10 space-y-10">
              {/* Overview — full width */}
              <ModalSection icon={FiLayers} label="Overview" tint={8}>
                <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.overview}</p>
              </ModalSection>

              <hr className="net-divider" />

              {/* Problem / Solution — 2-col */}
              <div className="grid md:grid-cols-2 gap-8">
                <ModalSection icon={FiAlertCircle} label="Problem" tint={12}>
                  <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.problem}</p>
                </ModalSection>
                <ModalSection icon={FiTarget} label="Solution" tint={14}>
                  <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.solution}</p>
                </ModalSection>
              </div>

              <hr className="net-divider" />

              {/* Architecture — full width */}
              {project.architecture && (
                <ModalSection icon={FiLayers} label="Architecture" tint={8}>
                  <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.architecture}</p>
                </ModalSection>
              )}

              {/* Key Features — checklist */}
              <ModalSection icon={FiCheck} label="Key Features" tint={10}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-[var(--color-muted)] font-sans text-[15px]">
                      <FiCheck size={14} className="text-[var(--color-accent)] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </ModalSection>

              <hr className="net-divider" />

              {/* Technologies */}
              <ModalSection icon={FiBarChart2} label="Technologies" tint={12}>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="net-chip !px-3 !py-1.5 !text-[12px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </ModalSection>

              {/* Challenges / Results — 2-col */}
              <div className="grid md:grid-cols-2 gap-8">
                <ModalSection icon={FiAlertCircle} label="Challenges" tint={14}>
                  <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.challenges}</p>
                </ModalSection>
                <ModalSection icon={FiBarChart2} label="Results" tint={10}>
                  <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.results}</p>
                </ModalSection>
              </div>

              <hr className="net-divider" />

              {/* Lessons Learned */}
              <ModalSection icon={FiBookOpen} label="Lessons Learned" tint={8}>
                <p className="font-sans text-[16px] leading-relaxed text-[var(--color-muted)]">{project.learned}</p>
              </ModalSection>
            </div>

            {/* Close button */}
            <div className="flex justify-end px-8 md:px-10 pb-8">
              <motion.button
                onClick={onClose}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-phi btn-phi--accent btn-phi--sm"
              >
                <FiX size={16} />
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
