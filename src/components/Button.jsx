import { motion } from 'framer-motion'

const base =
  'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer'

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105',
  secondary:
    'bg-slate-800 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100',
  outline:
    'border border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon,
  type = 'button',
}) {
  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${base} ${variants[variant]} ${className}`}
        {...motionProps}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...motionProps}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  )
}
