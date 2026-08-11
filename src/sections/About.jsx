import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiGithub } from 'react-icons/fi'
import SectionTitle from '@/components/SectionTitle'
import { personalInfo, aboutSummary, education, interests } from '@/data/portfolio'

const fade = {
  initial: { opacity: 0, y: 21 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5 },
}

export default function About() {
  return (
    <section id="about" className="phi-section">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          kicker="about"
          title="About Me"
          subtitle="A vibecoder who builds across the stack — from ML models to full-stack apps."
        />

        <div className="grid md:grid-cols-[38.2fr_61.8fr] gap-[55px] items-start">
          <motion.div {...fade} className="flex flex-col items-center md:items-start gap-[34px]">
            <div className="w-[144px] h-[144px] rounded-[34px] overflow-hidden border border-[var(--color-line-2)] ring-8 ring-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-[13px] text-left">
              <span className="flex items-center gap-[13px] phi-meta">
                <FiMapPin size={13} className="text-[var(--color-accent)]" />
                {personalInfo.location}
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-[13px] phi-meta hover:text-[var(--color-accent)] transition-colors"
              >
                <FiMail size={13} className="text-[var(--color-accent)]" />
                {personalInfo.email}
              </a>
              <a
                href="https://github.com/omipiepy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[13px] phi-meta hover:text-[var(--color-accent)] transition-colors"
              >
                <FiGithub size={13} className="text-[var(--color-accent)]" />
                github.com/omipiepy
              </a>
            </div>
          </motion.div>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="phi-meta uppercase mb-[8px] text-[var(--color-accent)]">{personalInfo.title}</p>
            <h3 className="phi-h2 mb-[21px]">{personalInfo.name}</h3>
            {aboutSummary.split('\n\n').map((paragraph) => (
              <p key={paragraph} className="phi-body mb-[21px] last:mb-0">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-[13px] mt-[34px]">
              {interests.map((interest) => (
                <span key={interest} className="net-chip">
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...fade} transition={{ duration: 0.5, delay: 0.15 }} className="mt-[89px] max-w-[61.8%] min-w-[320px]">
          <h3 className="phi-h3 mb-[34px]">
            <span className="phi-meta uppercase mr-[21px] text-[var(--color-accent)]">edu</span>
            Education
          </h3>
          <div className="relative pl-[34px] border-l border-[var(--color-line-2)]">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -13 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pb-[34px] last:pb-0"
              >
                <span className="absolute -left-[37px] top-[6px] w-[13px] h-[13px] rounded-full bg-[var(--color-accent)] ring-4 ring-[color-mix(in_srgb,var(--color-accent)_15%,transparent)]" />
                <h4 className="phi-h3 mb-[8px]">{edu.degree}</h4>
                <p className="phi-meta text-[var(--color-accent)] mb-[8px]">
                  {edu.institution} · {edu.period}
                </p>
                <p className="phi-body text-[13px]">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
