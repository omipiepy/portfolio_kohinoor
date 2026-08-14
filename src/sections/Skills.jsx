import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { skillCategories } from '@/data/portfolio'

const iconImages = {
  SiFigma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  SiIllustrator: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  SiSketch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg',
  SiHtml5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  SiCss3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  SiJavascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
}

const allSkills = skillCategories.flatMap((cat) => cat.skills)

export default function Skills() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allSkills : allSkills.slice(0, 10)

  return (
    <section id="skills" className="phi-section">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          title="Skills & Technologies"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[21px]">
          {visible.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, y: 21 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="net-panel net-panel-sm p-[34px] flex flex-col gap-[21px] cursor-default"
            >
              <div className="flex items-center gap-[21px]">
                {iconImages[skill.icon] ? (
                  <img src={iconImages[skill.icon]} alt="" className="w-[55px] h-[55px]" />
                ) : (
                  <span className="w-[55px] h-[55px] grid place-items-center rounded-[21px] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] text-[21px] font-bold">
                    {skill.name[0]}
                  </span>
                )}
                <h4 className="phi-h3">{skill.name}</h4>
              </div>
              <div className="flex items-center gap-[13px]">
                <div className="flex-1 h-[8px] rounded-full bg-[color-mix(in_srgb,var(--color-faint)_18%,transparent)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full bg-[var(--color-accent)]"
                  />
                </div>
                <span className="phi-meta text-[var(--color-accent)]">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        {allSkills.length > 10 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-[55px]"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-phi btn-phi--ghost btn-phi--sm"
            >
              {showAll ? 'Show Less' : `Show All (${allSkills.length})`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
