import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import { megaMenus } from '../../data/navigation'

/**
 * Dropdown / mega menu panel under the header.
 * Shows a link list plus a promotional image. Rendered by <Header />.
 */
export default function MegaMenu({ menuId, onNavigate }) {
  const menu = megaMenus[menuId]
  if (!menu) return null
  const [first, ...rest] = menu.links
  const twoCols = rest.length > 6

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full border-t border-line bg-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.25)]"
      id={`mega-${menuId}`}
    >
      <div className="container-x grid grid-cols-12 gap-10 py-10">
        <div className="col-span-5">
          <Link to={first.to} onClick={onNavigate} className="group mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em]">
            {first.label} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <ul className={`grid gap-x-8 gap-y-3 ${twoCols ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {rest.map((l) => (
              <li key={l.label}>
                <Link to={l.to} onClick={onNavigate} className="text-sm text-muted transition-colors hover:text-ink">
                  <span className="link-underline">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link to={menu.promo.to} onClick={onNavigate} className="group relative col-span-7 block h-64 overflow-hidden bg-sand" aria-label={`${menu.promo.eyebrow}: ${menu.promo.cta}`}>
          <SmartImage src={menu.promo.image} alt="" width={900} className="absolute inset-0" imgClassName="object-top transition-transform duration-[1200ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-xs flex-col justify-end p-8 text-white">
            <span className="text-[11px] uppercase tracking-[0.24em] text-white/80">{menu.promo.eyebrow}</span>
            <span className="mt-2 font-serif text-2xl leading-tight">{menu.promo.title}</span>
            <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">{menu.promo.cta} <ArrowRight size={14} /></span>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}
