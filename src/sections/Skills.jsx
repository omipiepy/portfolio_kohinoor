import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { skillCategories } from '@/data/portfolio'

const iconImages = {
  SiFigma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  SiIllustrator: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  SiHtml5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  SiCss3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  SiJavascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  SiReact: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg',
  SiNodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  SiPython: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  SiMongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg',
  SiPostgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  SiScikitlearn: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
}

const allSkills = skillCategories.flatMap((cat) => cat.skills)

export default function Skills() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allSkills : allSkills.slice(0, 5)

  return (
    <section id="skills" className="phi-section">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          title="What I Work With"
        />

        <motion.div
          initial={{ opacity: 0, y: 21 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {visible.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="net-panel net-panel-sm p-5 sm:p-6 flex flex-col items-center gap-3 sm:gap-4 cursor-default"
              >
                {iconImages[skill.icon] ? (
                  <img
                    src={iconImages[skill.icon]}
                    alt={skill.name}
                    className="w-10 h-10"
                    loading="lazy"
                  />
                ) : (
                  <span className="w-10 h-10 grid place-items-center rounded-lg bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] text-xl font-bold">
                    {skill.name[0]}
                  </span>
                )}
                <h4 className="font-sans text-[14px] font-semibold text-[var(--color-ink)]">{skill.name}</h4>
                <div className="w-full flex items-center gap-2 px-1">
                  <div className="flex-1 h-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-faint)_18%,transparent)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                      className="h-full rounded-full bg-[var(--color-accent)]"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[var(--color-accent)] shrink-0">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {allSkills.length > 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-phi btn-phi--ghost btn-phi--sm"
            >
              {showAll ? 'Show Less' : `Show All (${allSkills.length})`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
