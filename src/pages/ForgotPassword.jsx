import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import FormField from '../components/common/FormField'
import Button from '../components/common/Button'
import usePageMeta from '../hooks/usePageMeta'
import { validateEmail } from '../utils/validation'

export default function ForgotPassword() {
  usePageMeta('Reset Password', 'Recover your VELORA account access.')

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) {
      setError(err)
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <div className="container-x py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <Link
          to="/login"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <ArrowLeft size={14} /> Back to Sign In
        </Link>

        {submitted ? (
          <div className="rounded-sm border border-line bg-sand/40 p-8 text-center">
            <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-white text-success shadow-sm">
              <CheckCircle2 size={32} />
            </span>
            <h1 className="font-serif text-2xl uppercase">Reset Link Dispatched</h1>
            <p className="mt-3 text-sm text-muted">
              We have simulated sending password recovery instructions to <strong className="text-ink">{email}</strong>.
            </p>
            <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
              <em>Note: This is a frontend demo. No real email is sent or stored.</em>
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button to="/login">Return to Sign In</Button>
            </div>
          </div>
        ) : (
          <div>
            <header className="mb-8">
              <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">
                Reset Password
              </h1>
              <p className="mt-2 text-sm text-muted">
                Enter your registered email address and we will provide password reset instructions.
              </p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <FormField
                label="Email address"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                error={error}
                placeholder="name@example.com"
              />

              <Button type="submit" full className="!py-4">
                Send Reset Link
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
