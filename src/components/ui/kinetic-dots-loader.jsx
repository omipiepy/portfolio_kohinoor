import { motion } from 'framer-motion'

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

const bounceTransition = (delay) => ({
  y: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 0.3,
    delay,
    times: [0, 0.3, 0.5, 0.75, 1],
    ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'],
  },
  scaleY: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 0.3,
    delay,
    times: [0, 0.3, 0.5, 0.75, 1],
    ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'],
  },
  scaleX: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 0.3,
    delay,
    times: [0, 0.3, 0.5, 0.75, 1],
    ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'],
  },
})

export default function KineticDotsLoader() {
  const size = IS_MOBILE ? 24 : 32

  return (
    <div className='flex items-end justify-center gap-5 sm:gap-7' style={{ height: IS_MOBILE ? 80 : 100 }}>
      {[0, 1, 2, 3].map((i) => {
        const delay = i * 0.15
        return (
          <div key={i} className='relative' style={{ width: size, height: size + 20 }}>
            {/* Shadow */}
            <motion.div
              animate={{
                scaleX: [1, 1.3, 0.6, 1.1, 1],
                opacity: [0.4, 0.6, 0.15, 0.45, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay,
                times: [0, 0.1, 0.35, 0.6, 1],
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                x: '-50%',
                width: size,
                height: 4,
                borderRadius: '50%',
                background: `color-mix(in srgb, var(--color-primary) 40%, transparent)`,
              }}
            />
            {/* Ball */}
            <motion.div
              animate={{
                y: [0, -50, 0, -25, 0],
                scaleX: [1, 0.95, 1.15, 0.98, 1],
                scaleY: [1, 1.05, 0.85, 1.02, 1],
              }}
              transition={bounceTransition(delay)}
              style={{
                position: 'absolute',
                bottom: 4,
                left: 0,
                width: size,
                height: size,
                borderRadius: '50%',
                background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 50%, var(--color-accent) 100%)`,
                boxShadow: `0 0 12px color-mix(in srgb, var(--color-primary) 50%, transparent)`,
              }}
            >
              {/* Highlight */}
              {!IS_MOBILE && (
                <>
                  <div style={{ position: 'absolute', top: 4, left: 5, width: 10, height: 8, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.9), transparent 70%)', transform: 'rotate(-25deg)' }} />
                  <div style={{ position: 'absolute', top: 3, left: 4, width: 5, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', filter: 'blur(1px)', transform: 'rotate(-25deg)' }} />
                </>
              )}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
