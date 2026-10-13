import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import FormField from '../components/common/FormField'
import Button from '../components/common/Button'
import SmartImage from '../components/common/SmartImage'
import { useAuth } from '../context/AuthContext'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { validateEmail, required } from '../utils/validation'
import { campaign } from '../data/images'

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/account'
  const { login } = useAuth()
  const toast = useToast()

  usePageMeta('Log In', 'Sign in to your VELORA account.')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (validateEmail(formData.email)) errs.email = validateEmail(formData.email)
    if (required(formData.password, 'Password')) errs.password = required(formData.password, 'Password')

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    login({ email: formData.email, remember: formData.remember })
    toast.success('Welcome back! You are now signed in (demo).')
    navigate(redirect)
  }

  return (
    <div className="grid min-h-[calc(100vh-200px)] lg:grid-cols-12">
      <div className="relative hidden bg-sand lg:col-span-5 lg:block">
        <SmartImage
          src={campaign.authSide}
          alt="VELORA editorial style"
          width={1000}
          className="absolute inset-0 h-full w-full"
          imgClassName="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-serif text-2xl uppercase leading-tight">Define Your Everyday</p>
          <p className="mt-2 text-xs text-white/80">Access your order history, saved addresses and curated wishlist.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16 sm:px-8 lg:col-span-7 lg:py-24">
        <div className="w-full max-w-md">
          <header className="mb-8">
            <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">Sign In</h1>
            <p className="mt-2 text-sm text-muted">
              Enter your email and password to access your account.
            </p>
          </header>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <FormField
              label="Email address"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="name@example.com"
            />

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="login-password" className="label !mb-0">Password</label>
                <Link to="/forgot-password" className="text-xs text-muted underline underline-offset-4 hover:text-ink">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`field pr-11 ${errors.password ? 'field-error' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p role="alert" className="error-text">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2.5 text-xs text-muted">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-line accent-ink"
                />
                Remember me on this device
              </label>
            </div>

            <Button type="submit" full className="!py-4">
              Sign In
            </Button>

            <p className="border-t border-line pt-6 text-center text-xs text-muted">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-ink underline underline-offset-4">
                Create one now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
