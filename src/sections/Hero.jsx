import { motion } from 'framer-motion'
import { FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa'
import Button from '@/components/Button'
import { useTypewriter } from '@/hooks/useTypewriter'
import { personalInfo, socialLinks } from '@/data/portfolio'

const iconMap = {
  FaGithub,
  FaEnvelope,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  const typewriterText = useTypewriter(personalInfo.rotatingTitles)

  return (
    <div className="relative h-full flex items-center justify-center px-5 pt-24 pb-8 overflow-hidden" style={{ background: 'transparent' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center w-full max-w-[1000px] pointer-events-auto flex flex-col gap-4 sm:gap-5"
      >
        <motion.p variants={itemVariants} className="font-mono text-sm tracking-[0.05em] text-[var(--color-accent)]">
          {'<'}hello, world {'/>'}
        </motion.p>

        <div className="font-serif font-extrabold text-[clamp(32px,6vw,56px)] leading-tight tracking-tight mb-2">
          {/* Kohinoor — staggered letter reveal with spring + gradient */}
          <span className="inline-block">
            {"Kohinoor".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -120, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                  delay: 0.4 + i * 0.07,
                }}
                className="inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite] cursor-default"
              >
                {char}
              </motion.span>
            ))}
          </span>
          {' '}
          {/* Dallakoti — sliding reveal */}
          <motion.span
            className="inline-block overflow-hidden align-bottom"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <span className="inline-block text-[var(--color-ink)]">
              Dallakoti
            </span>
          </motion.span>
        </div>

        <motion.div variants={itemVariants} className="flex items-center justify-center space-x-3">
          <span className="font-mono text-[16px] sm:text-[18px] md:text-[20px] text-[var(--color-muted)]">
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[2px] h-[1.1em] bg-[var(--color-accent)] ml-2 align-middle"
            />
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Button
              variant="primary"
              onClick={() => {
                const el = document.getElementById('projects')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View My Work
            </Button>
            <Button variant="outline" href={personalInfo.resumeUrl} icon={<FaDownload />}>
              Download Resume
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-12 h-12 grid place-items-center rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)] backdrop-blur-[12px] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors hover:shadow-lg"
                  aria-label={link.name}
                >
                  {Icon && <Icon size={20} />}
                </motion.a>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-10 text-[var(--color-ink)] text-[13px]"
          >
            <span className="status-dot mr-2 inline-block"></span>
            Currently available for freelance & full-time opportunities
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
