import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ShieldCheck, Lock } from 'lucide-react'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import ShippingForm from '../components/checkout/ShippingForm'
import DeliveryOptions from '../components/checkout/DeliveryOptions'
import PaymentOptions from '../components/checkout/PaymentOptions'
import OrderReview from '../components/checkout/OrderReview'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import useOrders from '../hooks/useOrders'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { calculateTotals } from '../utils/cartCalculations'
import { storeConfig } from '../data/storeConfig'
import { validateEmail, validateMobile, validatePincode, required } from '../utils/validation'

export default function Checkout() {
  const navigate = useNavigate()
  const { lineItems, couponCode, clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()
  const toast = useToast()

  usePageMeta('Checkout', 'Complete your order with VELORA.')

  const [step, setStep] = useState(0)

  // Form State
  const defaultAddress = user?.addresses?.[0]
  const [formData, setFormData] = useState({
    contact: {
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    },
    address: {
      house: defaultAddress?.line1 || '',
      street: defaultAddress?.line2 || '',
      landmark: defaultAddress?.landmark || '',
      city: defaultAddress?.city || '',
      state: defaultAddress?.state || 'Karnataka',
      postalCode: defaultAddress?.postalCode || '',
      country: defaultAddress?.country || 'India',
    },
    delivery: 'standard',
    payment: 'upi',
  })

  const [errors, setErrors] = useState({})

  // Re-calculate totals using the chosen delivery method
  const checkoutTotals = useMemo(() => {
    return calculateTotals(lineItems, couponCode, formData.delivery)
  }, [lineItems, couponCode, formData.delivery])

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateStep = (currentStep) => {
    const errs = {}
    if (currentStep === 0) {
      const { name, email, mobile } = formData.contact
      if (required(name, 'Full name')) errs.name = required(name, 'Full name')
      if (validateEmail(email)) errs.email = validateEmail(email)
      if (validateMobile(mobile)) errs.mobile = validateMobile(mobile)
    } else if (currentStep === 1) {
      const { house, street, city, state, postalCode } = formData.address
      if (required(house, 'House / Flat')) errs.house = required(house, 'House / Flat')
      if (required(street, 'Street address')) errs.street = required(street, 'Street address')
      if (required(city, 'City')) errs.city = required(city, 'City')
      if (required(state, 'State')) errs.state = required(state, 'State')
      if (validatePincode(postalCode)) errs.postalCode = validatePincode(postalCode)
    } else if (currentStep === 2) {
      if (!formData.delivery) errs.delivery = 'Please select a delivery option.'
    } else if (currentStep === 3) {
      if (!formData.payment) errs.payment = 'Please select a payment method.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(4, s + 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePlaceOrder = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '')
    const orderNumber = `VEL-${dateStr}-${randomSuffix}`

    const newOrder = {
      id: orderNumber,
      orderNumber,
      createdAt: Date.now(),
      status: 'Confirmed',
      isDemo: true,
      items: lineItems.map((l) => ({
        productId: l.productId,
        name: l.product.name,
        image: l.product.colors.find((c) => c.name === l.color)?.image || l.product.images[0],
        color: l.color,
        size: l.size,
        price: l.product.price,
        quantity: l.quantity,
      })),
      totals: checkoutTotals,
      shippingAddress: {
        name: formData.contact.name,
        line1: `${formData.address.house}, ${formData.address.street}`,
        landmark: formData.address.landmark,
        city: formData.address.city,
        state: formData.address.state,
        postalCode: formData.address.postalCode,
        country: formData.address.country,
      },
      deliveryMethod: storeConfig.shipping[formData.delivery].label,
      paymentMethod: formData.payment.toUpperCase(),
    }

    addOrder(newOrder)
    clearCart()
    toast.success('Demo order created successfully!')
    navigate('/orders/confirmation', { state: { order: newOrder } })
  }

  if (lineItems.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-serif text-3xl uppercase">Your Bag is Empty</h1>
        <p className="mt-3 text-muted">Add some items before proceeding to checkout.</p>
        <Button to="/collections/new-arrivals" className="mt-6">Shop New Arrivals</Button>
      </div>
    )
  }

  return (
    <div className="container-x py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted hover:text-ink">
          <ArrowLeft size={14} /> Back to Bag
        </Link>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Lock size={13} className="text-accent-dark" /> Secure Demo Checkout
        </span>
      </div>

      <div className="mb-10">
        <CheckoutSteps current={step} onGo={(s) => setStep(s)} />
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Step Forms */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="rounded-sm border border-line bg-white p-6 sm:p-8">
            {step === 0 && (
              <div>
                <h2 className="mb-2 text-xl font-semibold">Contact Information</h2>
                <p className="mb-6 text-xs text-muted">We will use these details to send your order confirmation and demo tracking.</p>
                <ShippingForm part="contact" values={formData.contact} onChange={handleContactChange} errors={errors} />
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="mb-2 text-xl font-semibold">Shipping Address</h2>
                <p className="mb-6 text-xs text-muted">Where should we deliver your order?</p>
                <ShippingForm part="address" values={formData.address} onChange={handleAddressChange} errors={errors} />
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-2 text-xl font-semibold">Delivery Method</h2>
                <p className="mb-6 text-xs text-muted">Choose your preferred shipping speed.</p>
                <DeliveryOptions
                  value={formData.delivery}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, delivery: val }))
                    setErrors((prev) => ({ ...prev, delivery: '' }))
                  }}
                  subtotal={checkoutTotals.subtotal}
                  couponCode={couponCode}
                  error={errors.delivery}
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-2 text-xl font-semibold">Payment Option</h2>
                <p className="mb-6 text-xs text-muted">Select how you would like to pay.</p>
                <PaymentOptions
                  value={formData.payment}
                  onChange={(val) => {
                    setFormData((prev) => ({ ...prev, payment: val }))
                    setErrors((prev) => ({ ...prev, payment: '' }))
                  }}
                  error={errors.payment}
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="mb-2 text-xl font-semibold">Review Your Order</h2>
                <p className="mb-6 text-xs text-muted">Verify your details before placing this demo order.</p>
                <OrderReview lineItems={lineItems} data={formData} onEdit={(s) => setStep(s)} />
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <Link to="/cart" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink">
                  Return to bag
                </Link>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="btn btn-primary !bg-success !border-success !py-4"
                >
                  <ShieldCheck size={18} /> Place Demo Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28">
            <CartSummary totals={checkoutTotals} showPromo={false} showCheckout={false} />
            <div className="mt-4 border border-line bg-sand/50 p-4 text-xs leading-relaxed text-muted">
              <strong className="text-ink">Demonstration Notice:</strong> No real payment is required or executed. This transaction creates a local demo order saved solely to your browser.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
