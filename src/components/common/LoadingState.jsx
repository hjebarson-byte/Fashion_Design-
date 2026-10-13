/** Skeleton shown while a lazy route is loading. */
export default function LoadingState({ label = 'Loading' }) {
  return (
    <div className="container-x py-16" role="status" aria-live="polite">
      <span className="sr-only">{label}…</span>
      <div className="skeleton mb-8 h-10 w-64" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-[3/4] w-full" />
            <div className="skeleton mt-3 h-4 w-3/4" />
            <div className="skeleton mt-2 h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
