import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiGithub, FiBook } from 'react-icons/fi'
import SectionTitle from '@/components/SectionTitle'
import Card from '@/components/Card'
import { personalInfo, aboutSummary, education, interests } from '@/data/portfolio'

export default function About() {
  return (
    <section id="about" className="section-padding section-container">
      <SectionTitle
        title="About Me"
        subtitle="A vibecoder who builds across the stack — from ML models to full-stack apps."
      />

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden ring-2 ring-indigo-500/20 shadow-2xl shadow-indigo-500/10">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold gradient-text mb-2">
            {personalInfo.name}
          </h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">
            {personalInfo.title}
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-[15px]">
            {aboutSummary}
          </p>
          <div className="flex flex-wrap gap-5 mb-8 text-sm">
            <span className="flex items-center gap-1.5 text-slate-500">
              <FiMapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <FiMail className="w-4 h-4" />
              Email
            </a>
            <a href="https://github.com/omipiepy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <FiGithub className="w-4 h-4" />
              omipiepy
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-2.5 mb-8">
          <FiBook className="text-indigo-500 w-5 h-5" />
          <h3 className="text-xl font-semibold">Education</h3>
        </div>
        <div className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pb-6 last:pb-0"
            >
              <div className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-950" />
              <Card delay={i * 0.1} hover={false}>
                <h4 className="font-semibold text-base">{edu.degree}</h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  {edu.institution}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1.5">
                  {edu.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
