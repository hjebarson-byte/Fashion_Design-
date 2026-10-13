// Small, dependency-free form validators. Each returns an error string or ''.

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())

/** Indian mobile: 10 digits starting 6-9, optional +91 / 0 prefix. */
export function isIndianMobile(v) {
  const digits = String(v).replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '')
  return /^[6-9]\d{9}$/.test(digits)
}

/** Indian PIN code: 6 digits, cannot start with 0. */
export const isPincode = (v) => /^[1-9]\d{5}$/.test(String(v).trim())

export const required = (v, label = 'This field') =>
  String(v ?? '').trim() ? '' : `${label} is required.`

export const validateEmail = (v) => {
  if (!String(v).trim()) return 'Email is required.'
  return isEmail(v) ? '' : 'Please enter a valid email address.'
}

export const validateMobile = (v) => {
  if (!String(v).trim()) return 'Mobile number is required.'
  return isIndianMobile(v) ? '' : 'Enter a valid 10-digit Indian mobile number.'
}

export const validatePincode = (v) => {
  if (!String(v).trim()) return 'Postal code is required.'
  return isPincode(v) ? '' : 'Enter a valid 6-digit postal code.'
}

export function validatePassword(v) {
  if (!v) return 'Password is required.'
  if (v.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Include at least one letter and one number.'
  return ''
}

/** Returns true if an errors object has no messages. */
export const isValid = (errors) => Object.values(errors).every((e) => !e)
