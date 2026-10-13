import { Headset, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import Reveal from '../common/Reveal'
import { storeConfig } from '../../data/storeConfig'

const ICONS = { Truck, RotateCcw, ShieldCheck, Headset }

/** Customer benefits strip. All wording comes from storeConfig.benefits. */
export default function BrandBenefits() {
  return (
    <section className="border-y border-line" aria-label="Why shop with VELORA">
      <div className="container-x grid grid-cols-1 gap-x-8 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {storeConfig.benefits.map((b, i) => {
          const Icon = ICONS[b.icon]
          return (
            <Reveal key={b.title} delay={i * 0.07} className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line text-accent-dark">
                <Icon size={24} strokeWidth={1.3} />
              </span>
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em]">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
