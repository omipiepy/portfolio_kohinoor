import { motion } from 'framer-motion'
import ContactInfo from '@/components/ContactInfo'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl" />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 md:gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <ContactInfo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
