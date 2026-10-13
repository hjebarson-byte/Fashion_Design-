import { Instagram } from '../common/SocialIcons'
import SmartImage from '../common/SmartImage'
import Reveal from '../common/Reveal'
import { campaign } from '../../data/images'
import { storeConfig } from '../../data/storeConfig'

/**
 * Instagram-inspired gallery. Each tile links to storeConfig.instagramProfileUrl —
 * replace with individual post URLs once a real account is connected.
 */
export default function InstagramGallery() {
  return (
    <section className="section-y" aria-labelledby="gallery-title">
      <div className="container-x">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow mb-3">{storeConfig.instagramHandle}</p>
          <h2 id="gallery-title" className="section-title">Wear it your way</h2>
        </Reveal>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
          {campaign.gallery.slice(0, 10).map((src, i) => (
            <li key={src} className={i >= 6 ? 'hidden lg:block' : i >= 4 ? 'hidden sm:block lg:block' : ''}>
              <a href={storeConfig.instagramProfileUrl} target="_blank" rel="noreferrer noopener" className="group relative block aspect-square overflow-hidden" aria-label={`View style inspiration ${i + 1} on Instagram`}>
                <SmartImage src={src} alt="" width={500} sizes="(min-width:1024px) 20vw, 33vw" className="absolute inset-0" imgClassName="transition-transform duration-[1000ms] group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Instagram size={28} className="text-white" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
