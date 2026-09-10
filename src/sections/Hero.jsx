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
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Dark gradient scrim behind text */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-[640px] min-w-[320px] pointer-events-auto"
      >
        {/* Eyebrow */}
        <motion.p variants={itemVariants} className="font-mono text-[14px] tracking-[0.05em] text-[var(--color-accent)] mb-4">
          <span className="text-[var(--color-accent)]">{'<'}</span>hello, world <span className="text-[var(--color-accent)]">{'/>'}</span>
        </motion.p>

        {/* Name — two lines */}
        <motion.h1 variants={itemVariants} className="mb-6" style={{ lineHeight: 1.05 }}>
          <span className="block font-sans text-[64px] md:text-[72px] font-extrabold text-[var(--color-ink)] tracking-tight">
            {personalInfo.name.split(' ')[0]}
          </span>
          <span className="block font-sans text-[64px] md:text-[72px] font-extrabold tracking-tight" style={{ color: 'var(--color-accent)' }}>
            {personalInfo.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>

        {/* Tagline with typewriter and blinking cursor */}
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
          <span className="font-mono text-[20px] text-[var(--color-muted)]">
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[2px] h-[1.1em] bg-[var(--color-accent)] ml-2 align-middle"
            />
          </span>
        </motion.div>

        {/* CTA row + Social row as one connected group */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
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

          {/* Social icons */}
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
