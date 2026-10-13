import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Accessible overlay panel used for the cart drawer, mobile menu, filter drawer
 * (side="left"|"right") and centered modals (side="center").
 * Handles: Escape to close, backdrop click, focus trap + restore, body scroll lock.
 */
export default function Drawer({ open, onClose, title, side = 'right', children, widthClass = 'max-w-md', hideHeader = false, labelledBy, className = '' }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    previouslyFocused.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Move focus into the panel
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector('[data-autofocus]') || panelRef.current?.querySelector(FOCUSABLE)
      first?.focus()
    }, 60)

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose])

  const variants = {
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
    center: { initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 16, scale: 0.98 } },
  }[side]

  const position = side === 'right' ? 'right-0 top-0 h-full' : side === 'left' ? 'left-0 top-0 h-full' : 'left-1/2 top-1/2 max-h-[90vh] -translate-x-1/2 -translate-y-1/2'
  const wrapper = side === 'center' ? 'fixed inset-0 z-[90] flex items-center justify-center p-4' : 'fixed inset-0 z-[90]'
  const titleId = labelledBy || 'drawer-title'

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={wrapper}>
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          {side === 'center' ? (
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              className={`relative z-10 flex max-h-[90vh] w-full ${widthClass} flex-col overflow-hidden bg-white shadow-2xl ${className}`}
              {...variants}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <PanelHeader hideHeader={hideHeader} title={title} titleId={titleId} onClose={onClose} />
              {children}
            </motion.div>
          ) : (
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              className={`absolute ${position} flex w-full ${widthClass} flex-col bg-white shadow-2xl ${className}`}
              {...variants}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PanelHeader hideHeader={hideHeader} title={title} titleId={titleId} onClose={onClose} />
              {children}
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function PanelHeader({ hideHeader, title, titleId, onClose }) {
  if (hideHeader) return null
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-6">
      <h2 id={titleId} className="text-sm font-semibold uppercase tracking-[0.2em]">{title}</h2>
      <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 grid h-10 w-10 place-items-center transition-transform hover:rotate-90">
        <X size={20} />
      </button>
    </div>
  )
}
