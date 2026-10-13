import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import MegaMenu from './MegaMenu'
import { mainNav } from '../../data/navigation'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useShop } from '../../context/ShopContext'
import { useAuth } from '../../context/AuthContext'

/** Animated count badge — pops when the number changes. */
function Badge({ count }) {
  if (!count) return null
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 16 }}
      className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent-dark px-1 text-[10px] font-semibold leading-none text-white"
      aria-hidden="true"
    >
      {count > 99 ? '99+' : count}
    </motion.span>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const { itemCount, } = useCart()
  const { wishlistCount } = useWishlist()
  const { openCart, openSearch, openMobileMenu } = useShop()
  const { isLoggedIn } = useAuth()

  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const lastPointer = useRef('mouse')
  const headerRef = useRef(null)

  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation and on Escape
  useEffect(() => setOpenMenu(null), [pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenMenu(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const transparent = isHome && !scrolled && !openMenu
  const tone = transparent ? 'text-white' : 'text-ink'

  const isActive = (item) =>
    item.to === '/collections/best-sellers' && item.menu === 'collections'
      ? pathname.includes('best-sellers')
      : pathname === item.to || pathname.startsWith(`${item.to}/`)

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50"
      onMouseLeave={() => setOpenMenu(null)}
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget)) setOpenMenu(null)
      }}
    >
      <div className={`relative transition-colors duration-500 ${transparent ? 'bg-gradient-to-b from-black/45 to-transparent' : 'border-b border-line bg-white/95 backdrop-blur-md'} ${scrolled ? 'shadow-[0_6px_24px_-14px_rgba(0,0,0,0.25)]' : ''}`}>
        <div className={`container-x grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-[72px]'} ${tone}`}>
          {/* Left */}
          <div className="flex items-center">
            <button type="button" onClick={openMobileMenu} aria-label="Open menu" className="-ml-2 grid h-11 w-11 place-items-center lg:hidden">
              <Menu size={24} strokeWidth={1.6} />
            </button>
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-9">
                {mainNav.map((item) => {
                  const active = isActive(item)
                  const hasMenu = !!item.menu
                  const open = openMenu === item.menu && hasMenu
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenMenu(item.menu || null)}
                      onFocus={() => setOpenMenu(item.menu || null)}
                    >
                      <Link
                        to={item.to}
                        aria-expanded={hasMenu ? open : undefined}
                        aria-haspopup={hasMenu ? 'true' : undefined}
                        aria-controls={hasMenu ? `mega-${item.menu}` : undefined}
                        aria-current={active ? 'page' : undefined}
                        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                        onClick={(e) => {
                          // On touch devices the first tap opens the menu; the second follows the link
                          if (hasMenu && lastPointer.current === 'touch' && !open) {
                            e.preventDefault()
                            setOpenMenu(item.menu)
                          }
                        }}
                        className={`group relative flex items-center gap-1 py-6 text-[12px] font-medium uppercase tracking-[0.18em] ${item.sale ? (transparent ? 'text-[#ff9b9b]' : 'text-sale') : ''}`}
                      >
                        {item.label}
                        {hasMenu && <ChevronDown size={12} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />}
                        <span className={`absolute inset-x-0 bottom-[18px] h-px origin-left bg-accent transition-transform duration-300 ${active || open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Center: logo */}
          <Link to="/" aria-label="VELORA — home" className="select-none px-2 text-center font-serif text-[26px] font-medium tracking-[0.34em] sm:text-3xl">
            VELORA
          </Link>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button type="button" onClick={openSearch} aria-label="Search" className="grid h-11 w-11 place-items-center transition-transform hover:scale-110">
              <Search size={21} strokeWidth={1.6} />
            </button>
            <Link to={isLoggedIn ? '/account' : '/login'} aria-label={isLoggedIn ? 'My account' : 'Log in'} className="hidden h-11 w-11 place-items-center transition-transform hover:scale-110 sm:grid">
              <User size={21} strokeWidth={1.6} />
            </Link>
            <NavLink to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} className="relative grid h-11 w-11 place-items-center transition-transform hover:scale-110">
              <Heart size={21} strokeWidth={1.6} />
              <Badge count={wishlistCount} />
            </NavLink>
            <button type="button" onClick={openCart} aria-label={`Shopping bag, ${itemCount} items`} className="relative grid h-11 w-11 place-items-center transition-transform hover:scale-110">
              <ShoppingBag size={21} strokeWidth={1.6} />
              <Badge count={itemCount} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openMenu && <MegaMenu key={openMenu} menuId={openMenu} onNavigate={() => setOpenMenu(null)} />}
      </AnimatePresence>
    </header>
  )
}
