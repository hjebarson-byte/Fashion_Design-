import Breadcrumbs from '../components/common/Breadcrumbs'
import usePageMeta from '../hooks/usePageMeta'

export default function Terms() {
  usePageMeta('Terms & Conditions', 'Terms of service and website usage rules for VELORA.')

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Terms & Conditions' },
  ]

  return (
    <div className="container-x py-8 md:py-16">
      <Breadcrumbs items={crumbs} className="mb-8" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm text-muted">
          Last updated: October 2026. This is a demonstration agreement document.
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">1. Acceptance of Terms</h2>
          <p className="mt-3">
            By accessing and shopping on VELORA, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions along with our Privacy Policy.
          </p>
        </section>

        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">2. Product Descriptions & Pricing</h2>
          <p className="mt-3">
            We endeavor to describe all items, garments, colors, and compositions as accurately as possible. However, actual garment shades may slightly vary depending on screen calibration and photographic lighting. All prices are listed in Indian Rupees (INR).
          </p>
        </section>

        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">3. Prototype Demonstration Notice</h2>
          <p className="mt-3">
            This storefront is a demonstration frontend interface. No contracts of sale are formed, no financial charges will be incurred, and no real delivery services have been commissioned through this website.
          </p>
        </section>

        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">4. Intellectual Property</h2>
          <p className="mt-3">
            VELORA brand names, typography, graphics, and interface designs are proprietary. Photography displayed on this website is for non-commercial editorial mock demonstration purposes under the Unsplash license.
          </p>
        </section>
      </div>
    </div>
  )
}
