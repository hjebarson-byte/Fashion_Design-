import { useState } from 'react'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Accordion from '../components/common/Accordion'
import Button from '../components/common/Button'
import usePageMeta from '../hooks/usePageMeta'
import { storeConfig } from '../data/storeConfig'
import { formatCurrency } from '../utils/formatCurrency'

export default function FAQ() {
  usePageMeta('FAQs', 'Frequently asked questions regarding VELORA orders, shipping, and sizing.')

  const [activeCategory, setActiveCategory] = useState('all')

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Customer Care', to: '/contact' },
    { label: 'FAQs' },
  ]

  const faqData = [
    {
      category: 'ordering',
      id: 'ord-1',
      title: 'How do I place an order with VELORA?',
      content: 'Browse our collections, select your desired size and colour, and click "Add to bag". Once you are ready, navigate to your bag or click "Checkout" to follow our streamlined five-step checkout process.',
    },
    {
      category: 'ordering',
      id: 'ord-2',
      title: 'Can I cancel or modify an order after it has been placed?',
      content: 'Since this is a demo environment, order modifications can be made by creating new demo orders in checkout or clearing browser storage. In production, changes can be requested within 1 hour of placing the order.',
    },
    {
      category: 'payments',
      id: 'pay-1',
      title: 'Which payment options are supported?',
      content: 'Our frontend checkout demonstrates UPI, major Credit/Debit cards (Visa, MasterCard, RuPay), and Cash on Delivery (COD). Please note that no actual payments are executed in this demonstration store.',
    },
    {
      category: 'payments',
      id: 'pay-2',
      title: 'How do promo codes and coupons work?',
      content: 'You can apply valid promotional codes such as WELCOME10 (10% off), STYLE15 (15% off orders over ₹1,999), or FREESHIP (free delivery) inside your Shopping Bag or Mini-Cart drawer.',
    },
    {
      category: 'shipping',
      id: 'ship-1',
      title: 'What are the delivery timescales and charges?',
      content: `Standard delivery takes 4–6 business days and is complimentary on all orders above ${formatCurrency(storeConfig.shipping.freeShippingThreshold, 0)} (otherwise ₹149). Express shipping takes 1–2 business days for ₹349. Note: all dates are illustrative for this demo.`,
    },
    {
      category: 'shipping',
      id: 'ship-2',
      title: 'How can I check delivery availability to my PIN code?',
      content: 'On any product detail page, use the "Check delivery" widget by typing your 6-digit postal code to calculate estimated arrival dates.',
    },
    {
      category: 'returns',
      id: 'ret-1',
      title: `What is your return and exchange policy?`,
      content: `We offer an illustrative ${storeConfig.returns.windowDays}-day return window from the date of delivery. Items must be unworn, unwashed, and returned in their original packaging with all brand tags intact.`,
    },
    {
      category: 'sizing',
      id: 'size-1',
      title: 'How do I determine the right size for me?',
      content: 'Each product page includes an interactive "Size guide" modal with specific measurement tables for tops, shirts, jeans, trousers, and dresses across both Men’s and Women’s sizing.',
    },
    {
      category: 'account',
      id: 'acc-1',
      title: 'Do I need an account to place an order?',
      content: 'No, you can complete the demonstration checkout without an account. However, registering or signing in allows you to save addresses and track demo orders in your Account dashboard.',
    },
  ]

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ordering', label: 'Ordering' },
    { id: 'payments', label: 'Payments' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'returns', label: 'Returns' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'account', label: 'Account' },
  ]

  const filtered = activeCategory === 'all'
    ? faqData
    : faqData.filter((item) => item.category === activeCategory)

  return (
    <div className="container-x py-8 md:py-16">
      <Breadcrumbs items={crumbs} className="mb-8" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Help Center</p>
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Find answers regarding ordering, shipping, returns, and styling.
        </p>
      </header>

      {/* Category Filter Pills */}
      <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto border-b border-line pb-4" role="tablist">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`shrink-0 border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeCategory === c.id
                ? 'border-ink bg-ink text-white'
                : 'border-line bg-white hover:border-ink text-muted hover:text-ink'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion items={filtered} multiple defaultOpen="ord-1" />

        <div className="mt-16 rounded-sm border border-line bg-sand/50 p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl uppercase">Still Have Questions?</h2>
          <p className="mt-2 text-sm text-muted">
            Our client care team is available to help you with bespoke sizing advice and questions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button to="/contact">Contact Client Care</Button>
            <Button variant="outline" to="/shipping-returns">Shipping & Returns Policy</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
