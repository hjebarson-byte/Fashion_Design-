import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PRICE_MAX, PRICE_MIN } from '../../utils/filterProducts'
import { formatPrice } from '../../utils/formatCurrency'
import { CATEGORY_LABELS } from '../../data/categories'

/** One collapsible filter group. */
function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line py-5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-[12px] font-semibold uppercase tracking-[0.16em]"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}

function Check({ checked, onChange, label, swatch }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border border-muted transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-dark">
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" aria-hidden="true"><path d="M2 6.5l2.5 2.5L10 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
        )}
      </span>
      {swatch && <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: swatch }} aria-hidden="true" />}
      <span>{label}</span>
    </label>
  )
}

/**
 * Filter panel used in the desktop sidebar and the mobile drawer.
 * `filters` / `onChange(nextFilters)` are controlled by <CollectionView />.
 * `options` comes from getFilterOptions(products).
 */
export default function ProductFilters({ filters, onChange, options, showCategories = true }) {
  const toggle = (key, value) => {
    const list = filters[key]
    onChange({ ...filters, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] })
  }

  // Keep min <= max when either slider moves
  const setMin = (v) => onChange({ ...filters, priceMin: Math.min(Number(v), filters.priceMax - 100) })
  const setMax = (v) => onChange({ ...filters, priceMax: Math.max(Number(v), filters.priceMin + 100) })

  return (
    <div>
      {showCategories && options.categories.length > 1 && (
        <Group title="Category">
          {options.categories.map((c) => (
            <Check key={c} label={CATEGORY_LABELS[c] || c} checked={filters.categories.includes(c)} onChange={() => toggle('categories', c)} />
          ))}
        </Group>
      )}

      <Group title="Price">
        <div className="mb-4 flex items-center justify-between text-sm font-medium tabular-nums">
          <span>{formatPrice(filters.priceMin)}</span>
          <span aria-hidden="true">—</span>
          <span>{formatPrice(filters.priceMax)}</span>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="sr-only">Minimum price</span>
            <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={100} value={filters.priceMin} onChange={(e) => setMin(e.target.value)} className="w-full accent-ink" />
          </label>
          <label className="block">
            <span className="sr-only">Maximum price</span>
            <input type="range" min={PRICE_MIN} max={PRICE_MAX} step={100} value={filters.priceMax} onChange={(e) => setMax(e.target.value)} className="w-full accent-ink" />
          </label>
        </div>
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-2">
          {options.sizes.map((s) => {
            const on = filters.sizes.includes(s)
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => toggle('sizes', s)}
                className={`h-10 min-w-12 border px-3 text-[13px] transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-line hover:border-ink'}`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </Group>

      <Group title="Color">
        <div className="grid grid-cols-2 gap-x-2">
          {options.colors.map((c) => (
            <Check key={c.name} label={c.name} swatch={c.hex} checked={filters.colors.includes(c.name)} onChange={() => toggle('colors', c.name)} />
          ))}
        </div>
      </Group>

      <Group title="Product type">
        {options.styles.map((s) => (
          <Check key={s} label={s} checked={filters.styles.includes(s)} onChange={() => toggle('styles', s)} />
        ))}
      </Group>

      <Group title="Availability & offers">
        <Check label="In stock only" checked={filters.inStockOnly} onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })} />
        <Check label="Sale items" checked={filters.saleOnly} onChange={() => onChange({ ...filters, saleOnly: !filters.saleOnly })} />
      </Group>
    </div>
  )
}
