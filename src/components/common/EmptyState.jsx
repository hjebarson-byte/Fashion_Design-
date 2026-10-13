import { motion } from 'framer-motion'
import Button from './Button'

/**
 * Friendly empty / error state.
 * actions: [{ label, to?, onClick?, variant? }]
 */
export default function EmptyState({ icon: Icon, title, text, actions = [], className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center md:py-24 ${className}`}
    >
      {Icon && (
        <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-sand text-accent-dark">
          <Icon size={26} strokeWidth={1.4} />
        </span>
      )}
      <h2 className="font-serif text-3xl font-normal uppercase tracking-wide md:text-4xl">{title}</h2>
      {text && <p className="mt-3 max-w-md text-muted">{text}</p>}
      {actions.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions.map((a) => (
            <Button key={a.label} variant={a.variant || 'primary'} to={a.to} onClick={a.onClick}>
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
