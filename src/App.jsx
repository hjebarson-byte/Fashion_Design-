import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { ShopProvider } from './context/ShopContext'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './components/layout/MainLayout'

// Page Components
import Home from './pages/Home'
import MenCollection from './pages/MenCollection'
import WomenCollection from './pages/WomenCollection'
import NewArrivalsPage from './pages/NewArrivalsPage'
import BestSellersPage from './pages/BestSellersPage'
import SalePage from './pages/SalePage'
import ProductDetails from './pages/ProductDetails'
import SearchResults from './pages/SearchResults'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Account from './pages/Account'
import OrderHistory from './pages/OrderHistory'
import OrderConfirmation from './pages/OrderConfirmation'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import ShippingReturns from './pages/ShippingReturns'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ShopProvider>
          <WishlistProvider>
            <CartProvider>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    {/* Collections */}
                    <Route path="collections/men" element={<MenCollection />} />
                    <Route path="collections/men/:category" element={<MenCollection />} />
                    <Route path="collections/women" element={<WomenCollection />} />
                    <Route path="collections/women/:category" element={<WomenCollection />} />
                    <Route path="collections/new-arrivals" element={<NewArrivalsPage />} />
                    <Route path="collections/best-sellers" element={<BestSellersPage />} />
                    <Route path="collections/sale" element={<SalePage />} />

                    {/* Product Details & Search */}
                    <Route path="products/:slug" element={<ProductDetails />} />
                    <Route path="search" element={<SearchResults />} />

                    {/* Shopping & Checkout */}
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />

                    {/* Authentication */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />

                    {/* Account & Orders */}
                    <Route path="account" element={<Account />} />
                    <Route path="account/orders" element={<OrderHistory />} />
                    <Route path="orders/confirmation" element={<OrderConfirmation />} />

                    {/* Editorial & Information */}
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="shipping-returns" element={<ShippingReturns />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms" element={<Terms />} />

                    {/* 404 Fallback */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </CartProvider>
          </WishlistProvider>
        </ShopProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
