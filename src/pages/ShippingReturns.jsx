import Breadcrumbs from '../components/common/Breadcrumbs'
import Button from '../components/common/Button'
import usePageMeta from '../hooks/usePageMeta'
import { storeConfig } from '../data/storeConfig'
import { formatCurrency } from '../utils/formatCurrency'

export default function ShippingReturns() {
  usePageMeta('Shipping & Returns', 'Delivery information, shipping rates, and return policies for VELORA.')

  const { shipping, returns } = storeConfig

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Shipping & Returns' },
  ]

  return (
    <div className="container-x py-8 md:py-16">
      <Breadcrumbs items={crumbs} className="mb-8" />

      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-2">Policies</p>
        <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-5xl">
          Shipping & Returns
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Read about our delivery options, tracking processes, and simplified returns.
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-12">
        {/* Shipping section */}
        <section id="shipping" className="scroll-mt-24 border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-2xl uppercase">Shipping Information</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            All orders placed with VELORA are packaged with care in sustainable, fully recyclable outer cartons to ensure garments arrive in pristine condition.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-wider text-muted">
                  <th className="py-3">Method</th>
                  <th className="py-3">Estimated Time</th>
                  <th className="py-3">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="py-3.5 font-semibold">{shipping.standard.label}</td>
                  <td className="py-3.5 text-muted">{shipping.standard.minDays}–{shipping.standard.maxDays} Business Days</td>
                  <td className="py-3.5 font-medium">
                    {formatCurrency(shipping.standard.price)} (Free on orders over {formatCurrency(shipping.freeShippingThreshold, 0)})
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-semibold">{shipping.express.label}</td>
                  <td className="py-3.5 text-muted">{shipping.express.minDays}–{shipping.express.maxDays} Business Days</td>
                  <td className="py-3.5 font-medium">{formatCurrency(shipping.express.price)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-sm bg-sand/60 p-4 text-xs leading-relaxed text-muted">
            <strong>Important Notice:</strong> Delivery timeframes displayed on this website are illustrative demo estimates.
          </div>
        </section>

        {/* Returns section */}
        <section id="returns" className="scroll-mt-24 border border-line bg-white p-6 sm:p-8">
          <h2 className="font-serif text-2xl uppercase">Return & Exchange Policy</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We want you to be completely satisfied with every piece you purchase. If a garment does not fit quite right, we offer an illustrative {returns.windowDays}-day return window from the date of arrival.
          </p>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider">Return Conditions</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
            <li>Garments must be unworn, unwashed, and undamaged.</li>
            <li>All original designer swing tags and security ribbons must remain attached.</li>
            <li>Footwear and accessories must be returned in their original packaging.</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider">How To Initiate A Return</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            In our live store, you can initiate a return by visiting your Order History page, selecting the eligible order, and tapping &quot;Request Return&quot;. Our courier partner will schedule a doorstep collection.
          </p>
        </section>

        <div className="text-center">
          <p className="text-sm text-muted">Have a special inquiry regarding delivery to remote locations?</p>
          <Button to="/contact" className="mt-4">Contact Customer Service</Button>
        </div>
      </div>
    </div>
  )
}
