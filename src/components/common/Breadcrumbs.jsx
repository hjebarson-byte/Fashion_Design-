import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/** items: [{ label, to? }] — the last item is the current page. */
export default function Breadcrumbs({ items, light = false, className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={`flex flex-wrap items-center gap-1.5 text-[12px] ${light ? 'text-white/80' : 'text-muted'}`}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined} className={light ? 'text-white' : 'text-ink'}>{item.label}</span>
              ) : (
                <Link to={item.to} className="transition-colors hover:text-accent-dark">{item.label}</Link>
              )}
              {!last && <ChevronRight size={12} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
