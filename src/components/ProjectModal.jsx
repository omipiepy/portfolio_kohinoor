import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink, FiCheck, FiAlertCircle, FiBookOpen, FiTarget, FiLayers, FiBarChart2, FiCamera } from 'react-icons/fi'

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="min-h-screen flex items-center justify-center p-4 md:p-8"
        >
          <div className="w-full max-w-4xl glass-card rounded-3xl overflow-hidden my-10 shadow-2xl">
            <div className="relative">
              <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all cursor-pointer hover:scale-105"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
              <div className="absolute bottom-7 left-7 right-7">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-white/70 text-base">{project.tagline}</p>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
                    <FiLayers className="w-4 h-4 text-indigo-500" />
                  </span>
                  Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] pl-11">{project.overview}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                      <FiAlertCircle className="w-4 h-4 text-amber-500" />
                    </span>
                    Problem
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm pl-11">{project.problem}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                      <FiTarget className="w-4 h-4 text-emerald-500" />
                    </span>
                    Solution
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm pl-11">{project.solution}</p>
                </div>
              </div>

              {project.architecture && (
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center">
                      <FiCamera className="w-4 h-4 text-cyan-500" />
                    </span>
                    Architecture
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] pl-11">{project.architecture}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                    <FiCheck className="w-4 h-4 text-emerald-500" />
                  </span>
                  Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 pl-11">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                  <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
                    <FiBarChart2 className="w-4 h-4 text-purple-500" />
                  </span>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2 pl-11">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                      <FiAlertCircle className="w-4 h-4 text-amber-500" />
                    </span>
                    Challenges
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm pl-11">{project.challenges}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                      <FiBarChart2 className="w-4 h-4 text-emerald-500" />
                    </span>
                    Results
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm pl-11">{project.results}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2.5 mb-4 text-slate-800 dark:text-slate-200">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                    <FiBookOpen className="w-4 h-4 text-blue-500" />
                  </span>
                  Lessons Learned
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] pl-11">{project.learned}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
                >
                  <FiGithub className="w-4 h-4" />
                  View on GitHub
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-500/20"
                >
                  <FiExternalLink className="w-4 h-4" />
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
