import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { skillCategories } from '@/data/portfolio'

const iconImages = {
  FaPython: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  FaJs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  FaCode: '',
  FaHtml5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  FaCss3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  FaNodeJs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  FaDocker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  FaGitAlt: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  FaChartBar: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
  FaDatabase: '',
  SiPytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  SiNumpy: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  SiPandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  SiScikitlearn: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
  SiExpress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  SiMongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  SiPostgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  SiVscodium: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  SiJupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
}

const allSkills = skillCategories.flatMap((cat) => cat.skills)

export default function Skills() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allSkills : allSkills.slice(0, 10)

  return (
    <section id="skills" className="section-padding section-container">
      <SectionTitle
        title="Skills & Technologies"
        subtitle="Technologies I work with on a daily basis to build intelligent solutions."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        {visible.map((skill, i) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="aspect-square glass-card rounded-2xl p-3 flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-300/50 dark:hover:border-indigo-700/50 transition-all duration-300"
          >
            {iconImages[skill.icon] ? (
              <img src={iconImages[skill.icon]} alt="" className="w-8 h-8 md:w-10 md:h-10" />
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500 text-base md:text-lg font-bold">
                {skill.name[0]}
              </div>
            )}
            <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12 md:mt-14"
      >
        <motion.button
          onClick={() => setShowAll(!showAll)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl text-sm font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          {showAll ? 'Show Less' : `Show All (${allSkills.length})`}
        </motion.button>
      </motion.div>
    </section>
  )
}
