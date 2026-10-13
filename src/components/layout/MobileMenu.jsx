import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Heart, LogIn, Search, ShoppingBag, User } from 'lucide-react'
import Drawer from '../common/Drawer'
import { mainNav, megaMenus } from '../../data/navigation'
import { useShop } from '../../context/ShopContext'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

/** Slide-in mobile navigation with accordion sections for Men / Women / Collections. */
export default function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu, openSearch, openCart } = useShop()
  const { isLoggedIn } = useAuth()
  const { wishlistCount } = useWishlist()
  const { itemCount } = useCart()
  const [expanded, setExpanded] = useState(null)

  return (
    <Drawer open={mobileMenuOpen} onClose={closeMobileMenu} title="Menu" side="left" widthClass="max-w-[340px]">
      <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-line">
          {mainNav.map((item) => {
            const menu = item.menu ? megaMenus[item.menu] : null
            const open = expanded === item.label
            return (
              <li key={item.label}>
                {menu ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setExpanded(open ? null : item.label)}
                      className="flex w-full items-center justify-between px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.16em]"
                    >
                      {item.label}
                      <ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {open && (
                      <ul className="bg-sand px-6 py-3">
                        {menu.links.map((l) => (
                          <li key={l.label}>
                            <Link to={l.to} onClick={closeMobileMenu} className="block py-3 text-sm text-muted hover:text-ink">{l.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.to} onClick={closeMobileMenu} className={`block px-6 py-5 text-[13px] font-semibold uppercase tracking-[0.16em] ${item.sale ? 'text-sale' : ''}`}>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <ul className="space-y-1 px-3 py-4 text-sm">
          <li>
            <button type="button" onClick={() => { closeMobileMenu(); window.setTimeout(openSearch, 150) }} className="flex w-full items-center gap-3 px-3 py-3"><Search size={18} /> Search</button>
          </li>
          <li>
            <Link to={isLoggedIn ? '/account' : '/login'} onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-3">
              {isLoggedIn ? <User size={18} /> : <LogIn size={18} />} {isLoggedIn ? 'My account' : 'Log in / Register'}
            </Link>
          </li>
          <li>
            <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center gap-3 px-3 py-3"><Heart size={18} /> Wishlist {wishlistCount > 0 && <span className="text-xs text-muted">({wishlistCount})</span>}</Link>
          </li>
          <li>
            <button type="button" onClick={() => { closeMobileMenu(); window.setTimeout(openCart, 150) }} className="flex w-full items-center gap-3 px-3 py-3"><ShoppingBag size={18} /> Bag {itemCount > 0 && <span className="text-xs text-muted">({itemCount})</span>}</button>
          </li>
        </ul>
      </nav>
      <div className="border-t border-line px-6 py-4 text-xs text-muted">
        <Link to="/contact" onClick={closeMobileMenu} className="underline underline-offset-4">Help &amp; contact</Link>
      </div>
    </Drawer>
  )
}
