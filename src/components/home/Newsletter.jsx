import Reveal from '../common/Reveal'
import NewsletterForm from './NewsletterForm'

export default function Newsletter() {
  return (
    <section className="section-y bg-sand" aria-labelledby="newsletter-title">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">The VELORA letter</p>
          <h2 id="newsletter-title" className="display text-4xl uppercase md:text-5xl">A little style in your inbox</h2>
          <p className="mx-auto mt-4 max-w-md text-muted">Get first access to new arrivals, exclusive edits, and special offers.</p>
          <div className="mx-auto mt-8 max-w-lg text-left">
            <NewsletterForm id="home-newsletter" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
