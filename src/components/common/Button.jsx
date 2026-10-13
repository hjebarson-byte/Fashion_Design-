import { Link } from 'react-router-dom'

/**
 * Reusable button. Renders a router <Link> when `to` is given,
 * an <a> when `href` is given, otherwise a <button>.
 * variant: primary | outline | light | ghost-light
 */
export default function Button({ variant = 'primary', to, href, children, className = '', full = false, type = 'button', ...rest }) {
  const cls = `btn btn-${variant} ${full ? 'w-full' : ''} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button type={type} className={cls} {...rest}>{children}</button>
}
