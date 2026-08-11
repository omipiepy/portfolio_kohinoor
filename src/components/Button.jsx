import { motion } from 'framer-motion'

const variants = {
  primary: 'btn-phi--accent',
  outline: 'btn-phi--outline',
  ghost: 'btn-phi--ghost',
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon,
  type = 'button',
  small = false,
}) {
  const cls = `btn-phi ${variants[variant]} ${small ? 'btn-phi--sm' : ''} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={cls}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        {icon && <span className="text-[13px]">{icon}</span>}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cls}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {icon && <span className="text-[13px]">{icon}</span>}
      {children}
    </motion.button>
  )
}
