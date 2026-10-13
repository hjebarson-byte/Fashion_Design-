import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { validateEmail } from '../../utils/validation'

/**
 * Newsletter signup (frontend demo — nothing is sent or stored on a server).
 * variant: 'light' (on white/sand) | 'dark' (footer)
 */
export default function NewsletterForm({ variant = 'light', id = 'newsletter' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const dark = variant === 'dark'

  const submit = (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) return setError(err)
    setError('')
    setDone(true)
    setEmail('')
  }

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`flex items-start gap-3 border px-5 py-4 text-sm ${dark ? 'border-white/20' : 'border-success/30 bg-white'}`}
          >
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.1 }}>
              <CheckCircle2 className="text-success" size={22} />
            </motion.span>
            <div>
              <p className="font-semibold">Thanks — you&apos;re on the list (demo).</p>
              <p className={`mt-0.5 text-xs ${dark ? 'text-white/60' : 'text-muted'}`}>This is a frontend demo: no email was sent or saved.</p>
              <button type="button" onClick={() => setDone(false)} className="mt-2 text-xs underline underline-offset-4">Use a different email</button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
            <div className={`flex border ${error ? 'border-sale' : dark ? 'border-white/30 focus-within:border-white' : 'border-ink/30 focus-within:border-ink'} transition-colors`}>
              <input
                id={`${id}-email`}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="Your email address"
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : `${id}-consent`}
                className={`min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none ${dark ? 'placeholder:text-white/50' : 'placeholder:text-[#9a9a9a]'}`}
              />
              <button type="submit" className={`inline-flex items-center gap-2 px-5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors ${dark ? 'bg-white text-ink hover:bg-accent' : 'bg-ink text-white hover:bg-accent-dark'}`}>
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
            {error && <p id={`${id}-err`} role="alert" className={`mt-2 text-xs ${dark ? 'text-[#ff9b9b]' : 'text-sale'}`}>{error}</p>}
            <p id={`${id}-consent`} className={`mt-3 text-[11px] leading-relaxed ${dark ? 'text-white/55' : 'text-muted'}`}>
              By subscribing you agree to receive marketing emails from VELORA and to our Privacy Policy. You can unsubscribe at any time. (Demo — submissions are not stored.)
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
