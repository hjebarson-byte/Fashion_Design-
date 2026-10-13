import { motion } from 'framer-motion'
import SmartImage from '../common/SmartImage'
import Button from '../common/Button'
import { campaign } from '../../data/images'

/** Full-width promotional banner with a slow background parallax-style zoom. */
export default function PromoBanner() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white" aria-labelledby="promo-title">
      <SmartImage src={campaign.promo} alt="" width={1800} className="absolute inset-0 -z-10" imgClassName="object-[50%_25%] opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
      <div className="container-x flex min-h-[460px] items-center py-20 md:min-h-[560px]">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl">
          <p className="eyebrow mb-5 !text-accent">New season</p>
          <h2 id="promo-title" className="display text-4xl uppercase sm:text-5xl md:text-6xl">Your next favorite is here.</h2>
          <p className="mt-5 max-w-md text-white/85">Discover new-season styles designed to go everywhere.</p>
          <Button variant="light" to="/collections/new-arrivals" className="mt-8">Shop the collection</Button>
        </motion.div>
      </div>
    </section>
  )
}
