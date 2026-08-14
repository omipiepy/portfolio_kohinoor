import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'
import Button from '@/components/Button'
import { useTypewriter } from '@/hooks/useTypewriter'
import { personalInfo, socialLinks } from '@/data/portfolio'

const iconMap = {
  FaGithub,
  FaLinkedin,
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
  hidden: { opacity: 0, y: 21 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Hero() {
  const typewriterText = useTypewriter(personalInfo.rotatingTitles)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-[21px] overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-[61.8%] min-w-[320px] pointer-events-auto"
      >
        <motion.p variants={itemVariants} className="phi-meta mb-[34px]">
          <span className="text-[var(--color-accent)]">&lt;</span>hello, world<span className="text-[var(--color-accent)]"> /&gt;</span>
        </motion.p>

        <motion.h1 variants={itemVariants} className="phi-h1 mb-[21px]">
          {personalInfo.name.split(' ')[0]}
          <br />
          <span className="phi-gradient-text">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="h-[34px] flex items-center justify-center mb-[34px]">
          <span className="font-mono text-[clamp(13px,2vw,21px)] text-[var(--color-muted)]">
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[3px] h-[1em] bg-[var(--color-accent)] ml-[8px] align-middle"
            />
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-[21px] mb-[55px]">
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
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center gap-[21px]">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon]
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="w-[55px] h-[55px] grid place-items-center rounded-[21px] border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] backdrop-blur-[12px] text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                aria-label={link.name}
              >
                {Icon && <Icon size={21} />}
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
