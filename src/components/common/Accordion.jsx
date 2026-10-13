import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

/**
 * Accessible accordion.  items: [{ id, title, content }]  (content is a node).
 * Only one panel is open at a time unless `multiple` is true.
 */
export default function Accordion({ items, defaultOpen = null, multiple = false, className = '' }) {
  const [open, setOpen] = useState(() => (defaultOpen === null ? [] : [defaultOpen]))
  const base = useId()

  const toggle = (id) =>
    setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id]))

  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        const btnId = `${base}-btn-${item.id}`
        const panelId = `${base}-panel-${item.id}`
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[13px] font-semibold uppercase tracking-[0.12em]"
              >
                {item.title}
                <Plus size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-sm leading-relaxed text-muted">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
