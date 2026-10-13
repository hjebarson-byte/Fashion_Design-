import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { storeConfig } from '../../data/storeConfig'

/** Thin top bar. Messages come from storeConfig.announcement and rotate when there are several. */
export default function AnnouncementBar() {
  const { messages, link } = storeConfig.announcement
  const [i, setI] = useState(0)

  useEffect(() => {
    if (messages.length < 2) return undefined
    const t = window.setInterval(() => setI((x) => (x + 1) % messages.length), 4500)
    return () => window.clearInterval(t)
  }, [messages.length])

  return (
    <div className="bg-ink text-white" role="region" aria-label="Announcement">
      <div className="container-x flex h-9 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <Link to={link} className="text-[10.5px] font-medium uppercase tracking-[0.24em] transition-colors hover:text-accent sm:text-[11px]">
              {messages[i]}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
