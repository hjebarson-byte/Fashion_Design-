import { Star } from 'lucide-react'

/** Compact star rating with accessible text. */
export default function StarRating({ rating, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`Rated ${rating} out of 5${count ? ` from ${count} reviews` : ''}`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={size} className={n <= Math.round(rating) ? 'fill-accent text-accent' : 'text-line'} />
        ))}
      </span>
      <span className="text-xs text-muted" aria-hidden="true">
        {rating.toFixed(1)}
        {count != null && ` (${count})`}
      </span>
    </div>
  )
}
