import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { Facebook, Instagram, Twitter, Youtube } from '../common/SocialIcons'
import NewsletterForm from '../home/NewsletterForm'
import { footerNav } from '../../data/navigation'
import { storeConfig } from '../../data/storeConfig'

const SOCIAL_ICONS = { Instagram, Facebook, Twitter, Youtube }

/** Simple visual payment badges (illustrations only — no payments are processed). */
const PAYMENT_STYLES = {
  UPI: 'bg-white text-[#4b2c83]',
  VISA: 'bg-white text-[#1a1f71] italic',
  Mastercard: 'bg-white text-[#eb001b]',
  RuPay: 'bg-white text-[#0b6bb5]',
  COD: 'bg-white text-ink',
}

export default function Footer() {
  const { brand, social, paymentMethods } = storeConfig
  return (
    <footer className="on-dark bg-ink text-white" aria-label="Site footer">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="font-serif text-3xl font-medium tracking-[0.34em]" aria-label="VELORA home">VELORA</Link>
            <p className="mt-5 font-serif text-xl italic text-white/90">{brand.tagline}</p>
            <p className="mt-1 text-sm text-white/60">{brand.secondaryTagline}</p>
            <div className="mt-8 max-w-sm">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">Join the list</p>
              <NewsletterForm variant="dark" id="footer-newsletter" />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-white">
                        <span className="link-underline">{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center">
          <ul className="flex items-center gap-2" aria-label="Social media">
            {social.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon]
              return (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener" aria-label={`VELORA on ${s.name}`} className="grid h-10 w-10 place-items-center border border-white/25 transition-colors hover:border-accent hover:bg-accent hover:text-ink">
                    <Icon size={17} />
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods (illustrative)">
            {paymentMethods.map((m) => (
              <span key={m} className={`grid h-8 min-w-12 place-items-center rounded-[3px] px-2.5 text-[11px] font-bold tracking-wide ${PAYMENT_STYLES[m] || 'bg-white text-ink'}`}>{m}</span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-accent"
          >
            Back to top <span className="grid h-9 w-9 place-items-center border border-white/25"><ArrowUp size={16} /></span>
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-white/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} VELORA. All rights reserved.</p>
          <p>Demo storefront — no real payments, orders or shipments are processed.</p>
        </div>
      </div>
    </footer>
  )
}
