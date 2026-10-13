import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import useToast from '../../hooks/useToast'

const ICONS = {
  success: <CheckCircle2 size={18} className="text-[#7fd09c]" />,
  error: <XCircle size={18} className="text-[#ff8f8f]" />,
  info: <Info size={18} className="text-accent" />,
}

/** Renders the toast stack. Mounted once in MainLayout. aria-live announces messages. */
export default function Toast() {
  const { toasts, dismiss } = useToast()
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-20 z-[120] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            role={t.type === 'error' ? 'alert' : 'status'}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 bg-ink px-4 py-3.5 text-sm text-white shadow-2xl"
          >
            <span className="mt-0.5 shrink-0">{ICONS[t.type] || ICONS.info}</span>
            <p className="flex-1 leading-snug">{t.message}</p>
            <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="shrink-0 text-white/60 hover:text-white">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
