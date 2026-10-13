// -----------------------------------------------------------------
// VELORA store configuration.
// Everything that a store owner may want to change lives here:
// messages, shipping rules, policy numbers, contact info, etc.
// All numbers are in whole Indian Rupees (INR).
// NOTE: policy values below are illustrative demo values and must be
// confirmed before launch.
// -----------------------------------------------------------------

const FREE_SHIPPING_THRESHOLD = 2999
const RETURN_WINDOW_DAYS = 15

export const storeConfig = {
  brand: {
    name: 'VELORA',
    tagline: 'Define Your Everyday.',
    secondaryTagline: 'Style that speaks before you do.',
  },

  // Announcement bar — add more strings to rotate through several messages.
  announcement: {
    messages: ['NEW SEASON COLLECTION — DISCOVER YOUR STYLE'],
    link: '/collections/new-arrivals',
  },

  currency: { code: 'INR', locale: 'en-IN' },

  shipping: {
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD, // free standard delivery above this subtotal
    standard: { id: 'standard', label: 'Standard Delivery', price: 149, minDays: 4, maxDays: 6 },
    express: { id: 'express', label: 'Express Delivery', price: 349, minDays: 1, maxDays: 2 },
  },

  returns: { windowDays: RETURN_WINDOW_DAYS },

  // Max units of a single variant per order (also capped by mock stock).
  maxQuantityPerItem: 10,

  // Homepage "customer benefits" — all claims derive from the numbers above.
  benefits: [
    {
      icon: 'Truck',
      title: 'Free Shipping',
      text: `Complimentary standard delivery on orders above ₹${FREE_SHIPPING_THRESHOLD.toLocaleString('en-IN')}.`,
    },
    {
      icon: 'RotateCcw',
      title: 'Easy Returns',
      text: `Demo policy: ${RETURN_WINDOW_DAYS}-day returns on unworn items with tags.`,
    },
    {
      icon: 'ShieldCheck',
      title: 'Secure Checkout UI',
      text: 'A clean, simple checkout flow. This demo never takes real payments.',
    },
    {
      icon: 'Headset',
      title: 'Customer Support',
      text: 'Our style team is here to help, Monday to Saturday.',
    },
  ],

  contact: {
    email: 'care@velora.example',
    phone: '+91 80000 00000',
    hours: 'Mon–Sat, 10:00 – 18:00 IST',
    address: 'VELORA Studio, 12 Design District, Bengaluru 560001, India',
  },

  // Replace these hrefs with real profiles later.
  social: [
    { name: 'Instagram', icon: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'Facebook', icon: 'Facebook', href: 'https://www.facebook.com/' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://www.youtube.com/' },
  ],
  instagramHandle: '@velora.wear',
  instagramProfileUrl: 'https://www.instagram.com/',

  paymentMethods: ['UPI', 'VISA', 'Mastercard', 'RuPay', 'COD'],

  popularSearches: ['Black T-Shirt', 'Women\'s Dresses', 'Men\'s Jeans', 'White Shirt', 'Oversized Hoodie'],
}
