import Breadcrumbs from '../components/common/Breadcrumbs'
import usePageMeta from '../hooks/usePageMeta'

export default function PrivacyPolicy() {
  usePageMeta('Privacy Policy', 'How VELORA collects, uses, and safeguards customer personal data.')

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Privacy Policy' },
  ]

  return (
    <div className="container-x py-8 md:py-16">
      <Breadcrumbs items={crumbs} className="mb-8" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Legal</p>
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted">
          Last updated: October 2026. This is a demonstration policy document.
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">1. Information We Collect</h2>
          <p className="mt-3">
            In our live application, VELORA may collect personal identification information including your full name, email address, shipping destination, and phone number when you register an account or create an order.
          </p>
          <p className="mt-2">
            In this demonstration frontend, data entered into forms (such as addresses or mock orders) is strictly held in your browser&apos;s localStorage and is not transmitted to external database servers.
          </p>
        </section>

        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">2. How We Use Information</h2>
          <p className="mt-3">
            We use your data exclusively to process orders, facilitate doorstep deliveries, communicate crucial status updates, and provide personalized styling recommendations based on your browsing preferences.
          </p>
        </section>

        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">3. Data Security & Storage</h2>
          <p className="mt-3">
            We never store plaintext payment credentials, CVVs, or bank authentication numbers. All web traffic is transmitted via industry-standard SSL encryption.
          </p>
        </section>

        <section className="border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl uppercase text-ink">4. Disclaimer</h2>
          <p className="mt-3">
            This website is an e-commerce portfolio demonstration prototype. The policies outlined here are illustrative samples and should be reviewed with qualified legal counsel before production publication.
          </p>
        </section>
      </div>
    </div>
  )
}
