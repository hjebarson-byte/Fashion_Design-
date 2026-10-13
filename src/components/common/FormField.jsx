import { useId } from 'react'

/** Labelled input with inline error message and ARIA wiring. */
export default function FormField({ label, error, hint, as = 'input', className = '', children, ...props }) {
  const id = useId()
  const errId = `${id}-err`
  const hintId = `${id}-hint`
  const Comp = as
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      {as === 'select' ? (
        <select id={id} aria-invalid={!!error} aria-describedby={error ? errId : hint ? hintId : undefined} className={`field ${error ? 'field-error' : ''}`} {...props}>
          {children}
        </select>
      ) : (
        <Comp id={id} aria-invalid={!!error} aria-describedby={error ? errId : hint ? hintId : undefined} className={`field ${error ? 'field-error' : ''}`} {...props} />
      )}
      {hint && !error && <p id={hintId} className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && <p id={errId} role="alert" className="error-text">{error}</p>}
    </div>
  )
}
