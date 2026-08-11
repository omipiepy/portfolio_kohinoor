import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiArrowUpRight, FiCheck } from 'react-icons/fi'

export default function ProjectCard({ project, index, onCaseStudy }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="grid md:grid-cols-2 gap-14 md:gap-24 items-stretch max-w-6xl mx-auto"
    >
      <motion.div
        className={`relative group ${isEven ? 'md:order-1' : 'md:order-2'} h-full`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="relative h-full min-h-[250px] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/15 bg-slate-100 dark:bg-slate-800">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 rounded-3xl opacity-25 group-hover:opacity-50 blur-xl transition-all duration-700 -z-10" />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
              aria-label="View on GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors shadow-lg"
              aria-label="Live demo"
            >
              <FiExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      <div className={`${isEven ? 'md:order-2' : 'md:order-1'} h-full flex items-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span className="text-xs text-indigo-500 dark:text-indigo-400 font-mono tracking-[0.2em] uppercase">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight">
            {project.title}
          </h3>
          <p className="text-indigo-600/70 dark:text-indigo-400/70 text-base font-medium mb-6">
            {project.tagline}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-[15px] line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-700/30 hover:shadow-md hover:shadow-indigo-500/10 transition-shadow"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <ul className="space-y-4 mb-10">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0">
                  <FiCheck className="w-3 h-3 text-white" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
            >
              <FiGithub className="w-4 h-4" />
              GitHub
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
            <motion.button
              onClick={() => onCaseStudy(project)}
              whileHover={{ x: 3 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ml-1"
            >
              View Case Study
              <FiArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
