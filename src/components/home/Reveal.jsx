import { motion, useReducedMotion } from 'framer-motion'

/**
 * Subtle fade/slide-in on first scroll into view. Respects reduced motion.
 * <Reveal as="div" delay={0.1} y={12} className>
 */
export default function Reveal({ children, delay = 0, y = 12, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
