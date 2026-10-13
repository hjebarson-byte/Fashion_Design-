import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, Phone, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import FormField from '../components/common/FormField'
import Button from '../components/common/Button'
import Breadcrumbs from '../components/common/Breadcrumbs'
import usePageMeta from '../hooks/usePageMeta'
import { validateEmail, required } from '../utils/validation'
import { storeConfig } from '../data/storeConfig'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const initialSubject = searchParams.get('subject') || 'General Inquiry'

  usePageMeta('Contact Us', 'Get in touch with the VELORA client service and styling team.')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Contact Us' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (required(formData.name, 'Name')) errs.name = required(formData.name, 'Name')
    if (validateEmail(formData.email)) errs.email = validateEmail(formData.email)
    if (required(formData.message, 'Message')) errs.message = required(formData.message, 'Message')

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitted(true)
  }

  return (
    <div className="container-x py-8 md:py-16">
      <Breadcrumbs items={crumbs} className="mb-8" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Customer Care</p>
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-5xl">
          Get In Touch
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Whether you have an inquiry regarding fit, order status, or styling recommendations, our client service team is here to assist.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Form Column */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="border border-line bg-sand/40 p-8 text-center sm:p-12">
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white text-success shadow-sm">
                <CheckCircle2 size={32} />
              </span>
              <h2 className="font-serif text-2xl uppercase">Message Received</h2>
              <p className="mt-2 text-sm text-muted">
                Thank you, <strong className="text-ink">{formData.name}</strong>. We have simulated receiving your message regarding &quot;{formData.subject}&quot;.
              </p>
              <p className="mt-4 border-t border-line pt-4 text-xs text-muted">
                <em>Notice: This is a frontend demo application. No actual message is sent or stored on a server.</em>
              </p>
              <div className="mt-8">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5 border border-line bg-white p-6 sm:p-8">
              <h2 className="text-base font-semibold uppercase tracking-wider">Send Us A Message</h2>

              <FormField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="e.g. Rahul Verma"
              />

              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="name@example.com"
              />

              <FormField
                as="select"
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order & Delivery Status">Order & Delivery Status</option>
                <option value="Sizing & Style Advice">Sizing & Style Advice</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Careers">Careers & Press</option>
              </FormField>

              <div>
                <label htmlFor="contact-msg" className="label">Your Message</label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we assist you today?"
                  className={`field resize-y ${errors.message ? 'field-error' : ''}`}
                />
                {errors.message && <p role="alert" className="error-text">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <Button type="submit" full className="!py-4">
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Information Sidebar */}
        <div className="lg:col-span-5">
          <div className="space-y-8 border border-line bg-sand/50 p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">Client Care Office</h2>

            <div className="space-y-6 text-sm text-muted">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-ink" />
                <div>
                  <p className="font-semibold text-ink">Email Concierge</p>
                  <a href={`mailto:${storeConfig.contact.email}`} className="hover:underline">
                    {storeConfig.contact.email}
                  </a>
                  <p className="mt-0.5 text-xs">Response typically within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-ink" />
                <div>
                  <p className="font-semibold text-ink">Client Support Phone</p>
                  <p>{storeConfig.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-ink" />
                <div>
                  <p className="font-semibold text-ink">Operating Hours</p>
                  <p>{storeConfig.contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-ink" />
                <div>
                  <p className="font-semibold text-ink">Flagship Studio</p>
                  <p>{storeConfig.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-line pt-6 text-xs text-muted">
              <p className="font-semibold text-ink mb-1">Looking for immediate answers?</p>
              <p>Check out our frequently asked questions for ordering, shipping, and return policies.</p>
              <Button variant="outline" to="/faq" className="mt-4 !py-2.5 !text-[11px]">
                Read FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
