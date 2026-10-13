import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import SearchOverlay from './SearchOverlay'
import CartDrawer from '../cart/CartDrawer'
import Toast from '../common/Toast'
import ScrollToTop from '../common/ScrollToTop'
import LoadingState from '../common/LoadingState'

/** Shared page chrome: announcement bar, header, routed content, footer and global overlays. */
export default function MainLayout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only z-[200] bg-white px-4 py-3 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<LoadingState />}>
          {/* Fade-in page transition (keyed by path) */}
          <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <Outlet />
          </motion.div>
        </Suspense>
      </main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <Toast />
    </div>
  )
}
