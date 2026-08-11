import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaPython, FaReact, FaDocker } from 'react-icons/fa'
import { SiPytorch, SiFastapi } from 'react-icons/si'
import { FiChevronDown } from 'react-icons/fi'
import Button from '@/components/Button'
import { useTypewriter } from '@/hooks/useTypewriter'
import { personalInfo, socialLinks } from '@/data/portfolio'

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
}

const floatingIcons = [
  { Icon: FaPython, delay: 0, x: '15%', y: '20%', size: 24 },
  { Icon: SiPytorch, delay: 0.5, x: '80%', y: '25%', size: 22 },
  { Icon: FaReact, delay: 1, x: '85%', y: '70%', size: 26 },
  { Icon: FaDocker, delay: 1.5, x: '10%', y: '75%', size: 28 },
  { Icon: SiFastapi, delay: 2, x: '20%', y: '55%', size: 20 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function MagneticButton({ children, className = '', style = {} }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.2, y: y * 0.2 })
  }, [])

  const handleLeave = useCallback(() => setPos({ x: 0, y: 0 }), [])

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const typewriterText = useTypewriter(personalInfo.rotatingTitles)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden px-4 sm:px-6 py-24"
    >
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob w-96 h-96 -top-20 -left-20 bg-indigo-500/30 dark:bg-indigo-500/20" style={{ animationDelay: '0s' }} />
        <div className="aurora-blob w-80 h-80 top-40 right-10 bg-cyan-500/30 dark:bg-cyan-500/20" style={{ animationDelay: '-5s' }} />
        <div className="aurora-blob w-72 h-72 bottom-20 left-1/3 bg-purple-500/20 dark:bg-purple-500/15" style={{ animationDelay: '-10s' }} />
      </div>

      {floatingIcons.map(({ Icon, delay, x, y, size }) => (
        <motion.div
          key={delay}
          className="absolute pointer-events-none text-slate-300 dark:text-slate-700"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [0, 1, 1, 0],
            y: [0, -30, -30, -60],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        >
          <Icon size={size} />
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center relative z-10 px-4"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-3xl overflow-hidden ring-2 ring-indigo-500/20 shadow-2xl shadow-indigo-500/10 relative group"
          >
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-indigo-600 dark:text-indigo-400 font-mono text-sm md:text-base mb-4 tracking-wider"
        >
          &lt;Hello, World! /&gt;
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="h-10 md:h-12 flex items-center justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-600 dark:text-slate-400">
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[3px] h-[1em] bg-indigo-500 ml-1 align-middle"
            />
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <MagneticButton>
            <Button
              href="#projects"
              variant="primary"
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              href={personalInfo.resumeUrl}
              variant="outline"
              icon={<FaDownload className="w-4 h-4" />}
            >
              Download Resume
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3"
        >
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm hover:shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                {Icon && <Icon className="w-5 h-5" />}
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <span className="text-xs font-medium">Scroll</span>
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
