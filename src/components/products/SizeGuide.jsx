import { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import { categoryToChart, sizeGuide } from '../../data/sizeGuide'

/** Size guide modal. Opens on the chart that matches the product (gender + category). */
export default function SizeGuide({ open, onClose, gender = 'men', category = 'tshirts' }) {
  const [g, setG] = useState(gender)
  const [chart, setChart] = useState(categoryToChart[category] || 'tops')

  // Re-sync tabs each time the modal is opened for a (possibly different) product
  useEffect(() => {
    if (open) {
      setG(gender)
      const wanted = categoryToChart[category] || 'tops'
      setChart(sizeGuide[gender][wanted] ? wanted : 'tops')
    }
  }, [open, gender, category])

  const charts = sizeGuide[g]
  const current = charts[chart] || charts.tops

  return (
    <Modal open={open} onClose={onClose} title="Size guide" widthClass="max-w-2xl">
      <div className="overflow-y-auto px-5 pb-6 pt-5 sm:px-8">
        <div className="mb-5 inline-flex border border-line" role="tablist" aria-label="Gender">
          {['men', 'women'].map((x) => (
            <button
              key={x}
              type="button"
              role="tab"
              aria-selected={g === x}
              onClick={() => {
                setG(x)
                if (!sizeGuide[x][chart]) setChart('tops')
              }}
              className={`px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] ${g === x ? 'bg-ink text-white' : ''}`}
            >
              {x === 'men' ? "Men's" : "Women's"}
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-1 mb-5 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Garment type">
          {Object.entries(charts).map(([id, c]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={chart === id}
              onClick={() => setChart(id)}
              className={`shrink-0 border px-4 py-2 text-xs ${chart === id ? 'border-accent-dark bg-sand font-semibold' : 'border-line'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <caption className="sr-only">{current.label} size chart, measurements in inches</caption>
            <thead>
              <tr className="border-b-2 border-ink">
                {current.columns.map((c) => (
                  <th key={c} scope="col" className="py-3 pr-4 text-[11px] font-semibold uppercase tracking-[0.14em]">{c}{c !== 'Size' && ' (in)'}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {current.rows.map((r) => (
                <tr key={r[0]} className="border-b border-line">
                  {r.map((cell, i) => (
                    <td key={i} className={`py-3 pr-4 ${i === 0 ? 'font-semibold' : 'text-muted'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 bg-sand p-4 text-xs leading-relaxed text-muted">
          <strong className="text-ink">Please note:</strong> these measurements are illustrative body measurements for this demo and must be verified against actual product specifications before launch. Between sizes? We suggest sizing up for a relaxed fit.
        </p>
      </div>
    </Modal>
  )
}
