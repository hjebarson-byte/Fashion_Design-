import { ChevronDown } from 'lucide-react'
import { SORT_OPTIONS } from '../../utils/sortProducts'

/** Native select styled to match the brand (best accessibility + mobile UX). */
export default function ProductSort({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-select" className="sr-only">Sort products</label>
      <span className="mr-3 hidden text-[11px] font-medium uppercase tracking-[0.16em] text-muted sm:inline" aria-hidden="true">Sort by</span>
      <div className="relative">
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border border-line bg-white py-2.5 pl-4 pr-10 text-[13px] font-medium focus:border-ink focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
      </div>
    </div>
  )
}
