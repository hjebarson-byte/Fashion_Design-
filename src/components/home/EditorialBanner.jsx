import { motion } from 'framer-motion'
import SmartImage from '../common/SmartImage'
import Button from '../common/Button'
import Reveal from '../common/Reveal'
import { campaign } from '../../data/images'

/** Large editorial banner: oversized serif type overlapping a tall fashion photograph. */
export default function EditorialBanner() {
  return (
    <section className="relative overflow-hidden bg-sand" aria-labelledby="editorial-title">
      <div className="container-x grid items-stretch gap-0 lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center py-16 lg:col-span-6 lg:py-28 lg:pr-10">
          <Reveal>
            <p className="eyebrow mb-6">The edit</p>
            <h2 id="editorial-title" className="display text-5xl uppercase sm:text-6xl xl:text-[5.5rem]">
              Less ordinary.
              <br />
              <em className="italic text-accent-dark">More you.</em>
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted">Elevate the everyday with pieces that feel as good as they look.</p>
            <Button className="mt-9" to="/collections/new-arrivals">Explore the collection</Button>
          </Reveal>
        </div>

        <div className="relative min-h-[420px] lg:col-span-6 lg:min-h-[640px]">
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 lg:-right-10"
          >
            <SmartImage src={campaign.editorial} alt="Editorial fashion photograph from the VELORA campaign" width={1200} className="absolute inset-0" imgClassName="object-[50%_20%]" />
          </motion.div>
          <div className="absolute -bottom-px left-0 hidden bg-sand px-8 py-6 lg:block">
            <p className="font-serif text-lg italic">Style that speaks before you do.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
