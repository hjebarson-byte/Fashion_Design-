import FormField from '../common/FormField'

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

/**
 * Checkout step 1 (part="contact") and step 2 (part="address").
 * Fully controlled: `values` + `onChange(field, value)` + `errors` come from <Checkout />.
 */
export default function ShippingForm({ part, values, onChange, errors }) {
  const bind = (name) => ({
    name,
    value: values[name] ?? '',
    onChange: (e) => onChange(name, e.target.value),
    error: errors[name],
  })

  if (part === 'contact') {
    return (
      <div className="grid gap-5">
        <FormField label="Full name" autoComplete="name" {...bind('name')} />
        <FormField label="Email" type="email" autoComplete="email" inputMode="email" {...bind('email')} />
        <FormField label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" hint="Used only for delivery updates (demo)." {...bind('mobile')} />
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <FormField label="House / flat number" autoComplete="address-line1" {...bind('house')} />
      <FormField label="Street address" autoComplete="address-line2" {...bind('street')} />
      <FormField className="sm:col-span-2" label="Landmark (optional)" {...bind('landmark')} />
      <FormField label="City" autoComplete="address-level2" {...bind('city')} />
      <FormField as="select" label="State" autoComplete="address-level1" {...bind('state')}>
        <option value="">Select state</option>
        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
      </FormField>
      <FormField label="Postal code" inputMode="numeric" maxLength={6} autoComplete="postal-code" {...bind('postalCode')} />
      <FormField label="Country" autoComplete="country-name" {...bind('country')} />
    </div>
  )
}
