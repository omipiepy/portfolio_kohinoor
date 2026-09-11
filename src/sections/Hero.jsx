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

export default function Hero({ isDark }) {
  const typewriterText = useTypewriter(personalInfo.rotatingTitles)

  return (
    <section id="home" className="relative min-h-dvh flex items-center justify-center px-5 pt-24 pb-8 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center w-full max-w-[1000px] pointer-events-auto flex flex-col gap-4 sm:gap-5"
      >
        <motion.p variants={itemVariants} className="font-mono text-sm tracking-[0.05em] text-[var(--color-accent)]">
          {'<'}hello, world {'/>'}
        </motion.p>

        <div className="font-sans font-extrabold text-[clamp(28px,5vw,52px)] leading-tight tracking-tight">
          {/* Kohinoor — staggered letter reveal */}
          <div className="flex justify-center">
            {"Kohinoor".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.06,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block text-[#1E3A5F]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Dallakoti — sliding reveal + moving gradient */}
          <motion.div
            className="overflow-hidden"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite]">
              Dallakoti
            </span>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <span className="font-mono text-[16px] sm:text-[18px] md:text-[20px]" style={{ color: isDark ? '#1E3A5F' : 'var(--color-muted)' }}>
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
              Resume
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3">
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
                  className="w-11 h-11 grid place-items-center rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_50%,transparent)] backdrop-blur-[12px] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label={link.name}
                >
                  {Icon && <Icon size={18} />}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
