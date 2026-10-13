import SmartImage from '../components/common/SmartImage'
import Reveal from '../components/common/Reveal'
import Button from '../components/common/Button'
import Breadcrumbs from '../components/common/Breadcrumbs'
import usePageMeta from '../hooks/usePageMeta'
import { campaign } from '../data/images'

export default function About() {
  usePageMeta('Our Story', 'Learn about VELORA — philosophy, craftsmanship and the pursuit of modern timeless style.')

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Our Story' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden bg-ink text-white md:min-h-[580px]">
        <SmartImage
          src={campaign.aboutWide}
          alt="VELORA editorial mood"
          width={1800}
          eager
          className="absolute inset-0 -z-10"
          imgClassName="object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="container-x py-20 text-center">
          <p className="eyebrow mb-4 !text-accent">About VELORA</p>
          <h1 className="display mx-auto max-w-3xl text-4xl uppercase sm:text-6xl md:text-7xl">
            Define Your Everyday
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/80 md:text-lg">
            We build clothing for considered lives — combining effortless silhouettes, enduring materials, and modern tailoring.
          </p>
        </div>
      </section>

      <div className="container-x py-12 md:py-20">
        <Breadcrumbs items={crumbs} className="mb-12" />

        {/* Section 1: Our Story */}
        <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <span className="eyebrow">Origins</span>
            <h2 className="section-title mt-2">Born From A Desire For Restraint</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              VELORA was founded on the belief that personal style should feel intuitive rather than overwhelming. In a world saturated with ephemeral micro-trends and disposable garments, we set out to craft a contemporary wardrobe rooted in timeless silhouettes, rich textures, and architectural precision.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Every garment in our menswear and womenswear collections begins with an obsession over proportion: how an oversized collar falls, how a heavyweight cotton jersey drapes over the shoulders, and how a straight-leg trouser breaks at the shoe.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="aspect-[4/5] overflow-hidden bg-sand shadow-lg">
              <SmartImage src={campaign.aboutStory} alt="VELORA studio process" width={800} className="h-full" />
            </div>
          </Reveal>
        </section>

        {/* Section 2: Philosophy */}
        <section className="mt-20 border-t border-line pt-20 md:mt-32 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Our Philosophy</span>
            <blockquote className="display mt-6 text-3xl uppercase leading-tight md:text-5xl">
              “Style that speaks before you do.”
            </blockquote>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              We create clothes that allow you to move with quiet confidence through the day. Pieces that seamlessly transition from morning studio sessions to late dinner conversations.
            </p>
          </div>
        </section>

        {/* Section 3: Design & Craft */}
        <section className="mt-20 grid items-center gap-10 md:grid-cols-2 md:gap-16 md:mt-32">
          <Reveal className="order-2 md:order-1">
            <div className="aspect-[4/5] overflow-hidden bg-sand shadow-lg">
              <SmartImage src={campaign.aboutDesign} alt="Fabric and design craftsmanship" width={800} className="h-full" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="order-1 md:order-2">
            <span className="eyebrow">Our Design Approach</span>
            <h2 className="section-title mt-2">Every Detail Considered</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              From combed 220 GSM compact cotton to fine-gauge merino wool and structured recycled twills, we source materials designed to soften with wear while retaining structural integrity over years of regular rotation.
            </p>
            <ul className="mt-6 space-y-3 text-xs uppercase tracking-wider text-ink font-semibold">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" /> Heavyweight breathable natural fibers
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" /> Reinforced flatlock and double-needle stitching
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-dark" /> Muted, seasonless tonal color harmonies
              </li>
            </ul>
          </Reveal>
        </section>

        {/* Section 4: Commitment */}
        <section id="commitment" className="mt-20 rounded-sm bg-sand p-8 sm:p-14 md:mt-32">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <span className="eyebrow">Responsibility</span>
              <h2 className="mt-2 font-serif text-2xl uppercase md:text-4xl">Our Commitment to Quality</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Fast fashion produces waste; intentional design creates permanence. We release small, curated capsule edits, partner with transparent manufacturing facilities, and use recyclable packaging across all customer deliveries.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button to="/collections/new-arrivals">Explore Collection</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
