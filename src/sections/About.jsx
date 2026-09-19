import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiGithub } from 'react-icons/fi'
import SectionTitle from '@/components/SectionTitle'
import { personalInfo, aboutSummary, education } from '@/data/portfolio'

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-40px' },
  transition: { duration: 0.4 },
}

export default function About() {
  return (
    <section className="phi-section">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle title="About Me" />

        <div className="grid md:grid-cols-[3fr_5fr] gap-14 items-start">
          {/* Left: photo only */}
          <motion.div {...fade} className="flex justify-center md:justify-start">
            <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] rounded-[20px] sm:rounded-[24px] overflow-hidden border border-[var(--color-line-2)] ring-6 sm:ring-8 ring-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: name, contact, bio, education */}
          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="font-sans text-[28px] font-bold text-[var(--color-ink)] mb-4">{personalInfo.name}</h3>

            {/* Contact info */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
              <span className="flex items-center gap-2 font-mono text-[13px] text-[var(--color-faint)]">
                <FiMapPin size={14} className="text-[var(--color-accent)]" />
                {personalInfo.location}
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 font-mono text-[13px] text-[var(--color-faint)] hover:text-[var(--color-accent)] transition-colors"
              >
                <FiMail size={14} className="text-[var(--color-accent)]" />
                {personalInfo.email}
              </a>
              <a
                href="https://github.com/omipiepy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[13px] text-[var(--color-faint)] hover:text-[var(--color-accent)] transition-colors"
              >
                <FiGithub size={14} className="text-[var(--color-accent)]" />
                github.com/omipiepy
              </a>
            </div>

            {/* Bio */}
            {aboutSummary.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="font-sans text-[16px] leading-relaxed text-[var(--color-ink)] mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}

            {/* Education */}
            <div className="mt-10">
              <h3 className="font-sans text-[20px] font-semibold mb-6">
                Education
              </h3>
              <div className="relative pl-8 border-l border-[var(--color-line-2)]">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="relative pb-0 last:pb-0"
                  >
                    <h4 className="font-sans text-[18px] font-semibold text-[var(--color-ink)] mb-2">{edu.degree}</h4>
                    <p className="font-mono text-[13px] text-[var(--color-accent)] mb-2">
                      {edu.institution} · {edu.period}
                    </p>
                    <p className="font-sans text-[15px] text-[var(--color-ink)]">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
