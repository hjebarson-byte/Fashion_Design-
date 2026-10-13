import SmartImage from '../common/SmartImage'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import { campaign } from '../../data/images'

const PANELS = [
  { id: 'men', title: 'The modern man', text: 'Everyday essentials. Elevated style.', cta: 'Shop men', to: '/collections/men', image: campaign.men, pos: 'object-[50%_20%]' },
  { id: 'women', title: 'The modern woman', text: 'Confident looks for every moment.', cta: 'Shop women', to: '/collections/women', image: campaign.women, pos: 'object-[50%_20%]' },
]

/** Two side-by-side promotional panels (stacked on small screens). */
export default function GenderPanels() {
  return (
    <section className="grid md:grid-cols-2" aria-label="Shop men and women">
      {PANELS.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.1} y={0} className="group relative isolate min-h-[520px] overflow-hidden md:min-h-[720px]">
          <SmartImage src={p.image} alt="" width={1100} className="absolute inset-0 -z-10" imgClassName={`${p.pos} transition-transform duration-[1600ms] ease-out group-hover:scale-105`} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="on-dark flex h-full min-h-[520px] flex-col justify-end p-8 text-white md:min-h-[720px] md:p-14">
            <h2 className="display text-4xl uppercase md:text-6xl">{p.title}</h2>
            <p className="mt-3 max-w-xs text-white/85">{p.text}</p>
            <Button variant="light" to={p.to} className="mt-7 self-start">{p.cta}</Button>
          </div>
        </Reveal>
      ))}
    </section>
  )
}
