import { motion } from 'framer-motion'

/** Scroll-triggered fade/slide reveal. Plays once; respects reduced motion via MotionConfig. */
export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', amount = 0.15 }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}
