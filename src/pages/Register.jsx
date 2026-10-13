import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import FormField from '../components/common/FormField'
import Button from '../components/common/Button'
import SmartImage from '../components/common/SmartImage'
import { useAuth } from '../context/AuthContext'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { validateEmail, validateMobile, validatePassword, required } from '../utils/validation'
import { campaign } from '../data/images'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const toast = useToast()

  usePageMeta('Create Account', 'Join VELORA for exclusive drops, easy order tracking and more.')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
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
    if (required(formData.name, 'Full name')) errs.name = required(formData.name, 'Full name')
    if (validateEmail(formData.email)) errs.email = validateEmail(formData.email)
    if (validateMobile(formData.mobile)) errs.mobile = validateMobile(formData.mobile)
    if (validatePassword(formData.password)) errs.password = validatePassword(formData.password)
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }
    if (!formData.acceptTerms) {
      errs.acceptTerms = 'You must accept the terms and privacy policy to continue.'
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    register({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    })
    toast.success('Your VELORA demo account has been created!')
    navigate('/account')
  }

  return (
    <div className="grid min-h-[calc(100vh-200px)] lg:grid-cols-12">
      <div className="relative hidden bg-sand lg:col-span-5 lg:block">
        <SmartImage
          src={campaign.authSide}
          alt="VELORA community"
          width={1000}
          className="absolute inset-0 h-full w-full"
          imgClassName="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="font-serif text-2xl uppercase leading-tight">Join the Collective</p>
          <p className="mt-2 text-xs text-white/80">
            Enjoy seamless checkout, track every parcel, and curate your personalized fashion wishlist.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16 sm:px-8 lg:col-span-7 lg:py-20">
        <div className="w-full max-w-md">
          <header className="mb-8">
            <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">Create Account</h1>
            <p className="mt-2 text-sm text-muted">
              Enter your information below to register with VELORA.
            </p>
          </header>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormField
              label="Full name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g. Ananya Sharma"
            />

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

            <FormField
              label="Mobile number"
              type="tel"
              name="mobile"
              autoComplete="tel"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
              placeholder="10-digit Indian mobile"
            />

            <div>
              <label htmlFor="reg-password" className="label">Password</label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`field pr-11 ${errors.password ? 'field-error' : ''}`}
                  placeholder="Min 8 chars, 1 letter, 1 number"
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

            <FormField
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Re-enter your password"
            />

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-xs text-muted">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-line accent-ink"
                />
                <span>
                  I agree to VELORA&apos;s{' '}
                  <Link to="/terms" className="underline underline-offset-4 hover:text-ink">Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="underline underline-offset-4 hover:text-ink">Privacy Policy</Link>.
                </span>
              </label>
              {errors.acceptTerms && <p role="alert" className="error-text">{errors.acceptTerms}</p>}
            </div>

            <div className="pt-2">
              <Button type="submit" full className="!py-4">
                Register
              </Button>
            </div>

            <p className="border-t border-line pt-6 text-center text-xs text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-ink underline underline-offset-4">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
