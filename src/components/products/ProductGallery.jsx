import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import Drawer from '../common/Drawer'

/**
 * Product gallery:
 *  - desktop: thumbnail rail + large image with hover zoom + lightbox
 *  - mobile: swipeable scroll-snap carousel with dots
 * `active` / `onChange` are controlled so choosing a colour can switch the image.
 */
export default function ProductGallery({ images, name, active, onChange }) {
  const [lightbox, setLightbox] = useState(false)
  const [zoom, setZoom] = useState(null) // {x, y} percent while hovering
  const railRef = useRef(null)
  const count = images.length

  const go = (delta) => onChange((active + delta + count) % count)

  // Keep the mobile carousel in sync when `active` changes from outside (colour swatch)
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const target = el.children[active]
    if (target && Math.abs(el.scrollLeft - target.offsetLeft) > 4) el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
  }, [active])

  const onScroll = (e) => {
    const el = e.currentTarget
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== active && idx >= 0 && idx < count) onChange(idx)
  }

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <div className="lg:grid lg:grid-cols-[84px_1fr] lg:gap-4">
      {/* Thumbnails (desktop) */}
      <ul className="hidden flex-col gap-3 lg:flex" aria-label="Product images">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => onChange(i)}
              aria-label={`Show image ${i + 1} of ${count}`}
              aria-current={i === active}
              className={`block aspect-[3/4] w-full overflow-hidden border transition-all ${i === active ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <SmartImage src={src} alt="" width={160} className="h-full" />
            </button>
          </li>
        ))}
      </ul>

      {/* Main image (desktop) */}
      <div className="relative hidden aspect-[4/5] overflow-hidden bg-sand lg:block">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.button
            key={images[active]}
            type="button"
            onClick={() => setLightbox(true)}
            onMouseMove={onMove}
            onMouseLeave={() => setZoom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            aria-label="Open image in full screen"
            className="absolute inset-0 cursor-zoom-in"
          >
            <SmartImage
              src={images[active]}
              alt={`${name} — image ${active + 1}`}
              width={1000}
              eager
              className="h-full"
              imgClassName="transition-transform duration-200"
            />
            {zoom && (
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-no-repeat"
                style={{ backgroundImage: `url(${images[active]}?auto=format&fit=crop&w=1800&q=75)`, backgroundSize: '170%', backgroundPosition: `${zoom.x}% ${zoom.y}%` }}
              />
            )}
          </motion.button>
        </AnimatePresence>
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90 hover:bg-white"><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90 hover:bg-white"><ChevronRight size={20} /></button>
          </>
        )}
        <span className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center bg-white/90"><Maximize2 size={16} /></span>
      </div>

      {/* Swipe carousel (mobile / tablet) */}
      <div className="lg:hidden">
        <div ref={railRef} onScroll={onScroll} className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto sm:mx-0" role="group" aria-label="Product images, swipe to browse">
          {images.map((src, i) => (
            <button key={src} type="button" onClick={() => setLightbox(true)} aria-label={`Open image ${i + 1} full screen`} className="aspect-[4/5] w-full shrink-0 snap-center">
              <SmartImage src={src} alt={`${name} — image ${i + 1}`} width={900} eager={i === 0} className="h-full" />
            </button>
          ))}
        </div>
        {count > 1 && (
          <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
            {images.map((src, i) => (
              <span key={src} className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-ink' : 'w-1.5 bg-line'}`} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Drawer open={lightbox} onClose={() => setLightbox(false)} side="center" hideHeader widthClass="max-w-5xl h-[90vh]" labelledBy="lightbox-title" className="bg-ink">
        <h2 id="lightbox-title" className="sr-only">{name} gallery</h2>
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-ink">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={images[active]}
              src={`${images[active]}?auto=format&fit=crop&w=1600&q=80`}
              alt={`${name} — image ${active + 1} of ${count}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-full max-w-full object-contain"
            />
          </AnimatePresence>
          <button type="button" onClick={() => setLightbox(false)} aria-label="Close full screen" className="absolute right-3 top-3 grid h-11 w-11 place-items-center bg-white/90"><X size={20} /></button>
          {count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/90"><ChevronRight size={20} /></button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}
