import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { skillCategories } from '@/data/portfolio'

const iconImages = {
  SiPython: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  SiTypescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  SiJavascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  SiHtml5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  SiCss3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  SiCplusplus: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  SiPytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  SiTensorflow: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  SiNumpy: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  SiPandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  SiScikitlearn: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
  SiLangchain: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/langchain/langchain-original.svg',
  SiReact: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  SiNextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  SiTailwindcss: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  SiVite: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg',
  SiNodedotjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  SiExpress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  SiFastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  SiMongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  SiPostgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  SiDocker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  SiGit: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  SiVscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  SiJupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
  SiLinux: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
}

const allSkills = skillCategories.flatMap((cat) => cat.skills)

export default function Skills() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allSkills : allSkills.slice(0, 10)

  return (
    <section id="skills" className="phi-section">
      <div className="phi-wrap pointer-events-auto">
        <SectionTitle
          kicker="skills"
          title="Skills & Technologies"
          subtitle="Technologies I work with on a daily basis to build intelligent solutions."
        />

        <div className="flex flex-wrap justify-center gap-[13px]">
          {visible.map((skill, i) => (
            <motion.span
              key={skill.name}
              layout
              initial={{ opacity: 0, y: 13 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className="net-chip cursor-default"
            >
              {iconImages[skill.icon] ? (
                <img src={iconImages[skill.icon]} alt="" className="w-[21px] h-[21px]" />
              ) : (
                <span className="w-[21px] h-[21px] grid place-items-center rounded-[8px] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] text-[13px] font-bold">
                  {skill.name[0]}
                </span>
              )}
              {skill.name}
            </motion.span>
          ))}
        </div>

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
      </div>
    </section>
  )
}
