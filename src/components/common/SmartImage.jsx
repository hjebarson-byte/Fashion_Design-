import { useState } from 'react'
import { FALLBACK_IMAGE, optimize } from '../../data/images'

/**
 * Image with lazy loading, responsive srcSet (Unsplash) and a graceful fallback
 * when the remote image fails to load.
 *  - `width`: the largest rendered width we need (px)
 *  - `eager`: set true for above-the-fold images (hero) to skip lazy loading
 */
export default function SmartImage({ src, alt, width = 800, sizes, eager = false, className = '', imgClassName = '', style, ...rest }) {
  const [failed, setFailed] = useState(false)
  const isRemote = src && src.includes('images.unsplash.com')

  const srcSet = isRemote && !failed
    ? [Math.round(width / 2), width, Math.round(width * 1.6)].map((w) => `${optimize(src, w)} ${w}w`).join(', ')
    : undefined

  return (
    <div className={`overflow-hidden bg-sand ${className}`} style={style}>
      <img
        src={failed || !src ? FALLBACK_IMAGE : optimize(src, width)}
        srcSet={srcSet}
        sizes={sizes || `${width}px`}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : undefined}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
        {...rest}
      />
    </div>
  )
}
