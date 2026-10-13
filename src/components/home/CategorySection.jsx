import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import Reveal from '../common/Reveal'
import { HOME_CATEGORY_CARDS } from '../../data/categories'

/** "Find your style": four large image cards with a zoom-on-hover effect. */
export default function CategorySection() {
  return (
    <section id="find-your-style" className="section-y scroll-mt-20" aria-labelledby="find-style-title">
      <div className="container-x">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-3">Shop by category</p>
          <h2 id="find-style-title" className="section-title">Find your style</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {HOME_CATEGORY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link to={c.to} className="group relative block aspect-[3/4] overflow-hidden bg-sand" aria-label={`${c.title} — shop now`}>
                <SmartImage src={c.image} alt="" width={700} sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/75 md:text-[11px]">{c.label}</p>
                  <h3 className="mt-1.5 font-serif text-xl font-normal leading-tight md:text-3xl">{c.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 border-b border-white/60 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all group-hover:gap-3 group-hover:border-accent group-hover:text-accent">
                    Shop now <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
