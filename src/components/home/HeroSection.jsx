import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import SmartImage from '../common/SmartImage'
import Button from '../common/Button'
import { campaign } from '../../data/images'

const ease = [0.22, 1, 0.36, 1]

/** Full-bleed cinematic hero: two campaign photos (men + women) with editorial type over them. */
export default function HeroSection() {
  const scrollDown = () => document.getElementById('find-your-style')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="on-dark relative -mt-[72px] isolate flex min-h-[640px] h-[100svh] max-h-[1000px] items-end overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      {/* Imagery: two panels on desktop, one on mobile */}
      <div className="absolute inset-0 -z-10 grid md:grid-cols-2">
        <div className="relative overflow-hidden">
          <SmartImage src={campaign.heroWomen} alt="Model wearing VELORA women's collection" width={1400} eager className="absolute inset-0" imgClassName="kenburns object-[50%_20%]" />
        </div>
        <div className="relative hidden overflow-hidden md:block">
          <SmartImage src={campaign.heroMen} alt="Model wearing VELORA men's collection" width={1400} eager className="absolute inset-0" imgClassName="kenburns object-[50%_25%]" />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <div className="container-x pb-24 pt-40 md:pb-28">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }} className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-white/80">
          New season · {new Date().getFullYear()}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          id="hero-title"
          className="display max-w-4xl text-[2.9rem] uppercase leading-[0.98] sm:text-7xl lg:text-[7rem]"
        >
          Style is a <em className="font-serif italic text-accent">statement.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.55, ease }} className="mt-6 max-w-md text-[15px] leading-relaxed text-white/85 md:text-base">
          Discover timeless essentials and contemporary pieces designed for every version of you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }} className="mt-9 flex flex-wrap gap-3">
          <Button variant="light" to="/collections/men">Shop men</Button>
          <Button variant="ghost-light" to="/collections/women">Shop women</Button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 right-6 hidden flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/80 md:flex lg:right-10"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={18} /></motion.span>
      </motion.button>
    </section>
  )
}
