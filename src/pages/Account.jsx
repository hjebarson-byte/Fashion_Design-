import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Package, MapPin, Heart, LogOut, Settings, Plus, Check } from 'lucide-react'
import FormField from '../components/common/FormField'
import Button from '../components/common/Button'
import Breadcrumbs from '../components/common/Breadcrumbs'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import useOrders from '../hooks/useOrders'
import usePageMeta from '../hooks/usePageMeta'
import useToast from '../hooks/useToast'
import { formatCurrency } from '../utils/formatCurrency'

export default function Account() {
  const navigate = useNavigate()
  const { user, isLoggedIn, login, logout, updateProfile } = useAuth()
  const { wishlistCount } = useWishlist()
  const { orders } = useOrders()
  const toast = useToast()

  usePageMeta('My Account', 'Manage your VELORA profile, addresses and preferences.')

  const [activeTab, setActiveTab] = useState('profile')

  // Edit profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
  })
  const [editingProfile, setEditingProfile] = useState(false)

  // Demo new address form modal state
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [newAddr, setNewAddr] = useState({
    label: 'Home',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  })

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'My Account' },
  ]

  if (!isLoggedIn) {
    return (
      <div className="container-x py-16 text-center">
        <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-sand text-ink">
          <User size={32} strokeWidth={1.4} />
        </span>
        <h1 className="font-serif text-3xl uppercase tracking-tight md:text-4xl">Account Sign In</h1>
        <p className="mt-3 text-muted">Please sign in to access your dashboard, saved orders and preferences.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/login">Sign In</Button>
          <Button variant="outline" to="/register">Create Account</Button>
          <button
            type="button"
            onClick={() => {
              login({ email: 'demo.customer@velora.example', remember: true })
              toast.success('Logged in with Demo Account!')
            }}
            className="btn btn-outline"
          >
            Quick Demo Login
          </button>
        </div>
      </div>
    )
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateProfile(profileData)
    setEditingProfile(false)
    toast.success('Profile details updated!')
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    if (!newAddr.line1 || !newAddr.city || !newAddr.postalCode) {
      toast.error('Please fill in required address fields.')
      return
    }
    const updated = [...(user.addresses || []), { ...newAddr, id: `addr-${Date.now()}` }]
    updateProfile({ addresses: updated })
    setShowAddressModal(false)
    setNewAddr({ label: 'Home', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'India' })
    toast.success('Address saved to your address book.')
  }

  const handleDeleteAddress = (id) => {
    const updated = (user.addresses || []).filter((a) => a.id !== id)
    updateProfile({ addresses: updated })
    toast.info('Address removed.')
  }

  return (
    <div className="container-x py-8 md:py-12">
      <Breadcrumbs items={crumbs} className="mb-6 md:mb-8" />

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal uppercase tracking-tight md:text-4xl">
            My Account
          </h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back, <span className="font-semibold text-ink">{user.name || user.email}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout()
            toast.info('Signed out successfully.')
            navigate('/')
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted hover:text-sale"
        >
          <LogOut size={15} /> Log Out
        </button>
      </header>

      {/* Tabs */}
      <div className="grid gap-10 lg:grid-cols-12">
        <nav className="flex gap-2 overflow-x-auto border-b border-line pb-4 lg:col-span-3 lg:flex-col lg:border-b-0 lg:border-r lg:pr-6" aria-label="Account navigation">
          {[
            { id: 'profile', label: 'Personal Information', icon: User },
            { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'wishlist', label: 'My Wishlist', icon: Heart, badge: wishlistCount },
            { id: 'preferences', label: 'Preferences', icon: Settings },
          ].map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex shrink-0 items-center justify-between gap-3 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                activeTab === id ? 'bg-ink text-white' : 'hover:bg-sand text-muted hover:text-ink'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon size={16} /> {label}
              </span>
              {badge != null && (
                <span className={`text-[10px] font-bold ${activeTab === id ? 'text-white' : 'text-muted'}`}>
                  ({badge})
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="lg:col-span-9">
          {activeTab === 'profile' && (
            <div className="max-w-2xl border border-line bg-white p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                {!editingProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileData({ name: user.name || '', email: user.email || '', mobile: user.mobile || '' })
                      setEditingProfile(true)
                    }}
                    className="text-xs font-semibold uppercase tracking-[0.14em] underline underline-offset-4"
                  >
                    Edit details
                  </button>
                )}
              </div>

              {editingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <FormField
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                  <FormField
                    label="Email address"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                  <FormField
                    label="Mobile number"
                    type="tel"
                    value={profileData.mobile}
                    onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value })}
                  />
                  <div className="flex gap-3 pt-4">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="outline" type="button" onClick={() => setEditingProfile(false)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <dl className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Full Name</dt>
                    <dd className="mt-1 text-sm font-medium">{user.name || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Email</dt>
                    <dd className="mt-1 text-sm font-medium">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Mobile</dt>
                    <dd className="mt-1 text-sm font-medium">{user.mobile || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Member Since</dt>
                    <dd className="mt-1 text-sm font-medium">
                      {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Order History ({orders.length})</h2>
                <Link to="/collections/new-arrivals" className="text-xs font-semibold uppercase tracking-[0.14em] underline underline-offset-4">
                  Shop new arrivals
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="border border-line bg-sand/30 p-8 text-center">
                  <p className="text-sm text-muted">You haven&apos;t placed any demo orders yet.</p>
                  <Button to="/collections/new-arrivals" className="mt-4">Start Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="border border-line bg-white p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Order Number</p>
                          <p className="font-semibold text-ink">{ord.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Date</p>
                          <p className="text-sm text-muted">{new Date(ord.createdAt).toLocaleDateString('en-IN')}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Total</p>
                          <p className="font-semibold">{formatCurrency(ord.totals.total)}</p>
                        </div>
                        <div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                            ord.status === 'Delivered' ? 'bg-[#e7f5ec] text-success' : 'bg-sand text-ink'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {ord.items.slice(0, 3).map((item, idx) => (
                            <img
                              key={idx}
                              src={item.image}
                              alt={item.name}
                              className="h-14 w-12 object-cover bg-sand"
                            />
                          ))}
                          {ord.items.length > 3 && (
                            <span className="text-xs text-muted">+{ord.items.length - 3} more</span>
                          )}
                        </div>
                        <Link
                          to="/orders/confirmation"
                          state={{ order: ord }}
                          className="btn btn-outline !py-2.5 !text-[11px]"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Saved Addresses</h2>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="btn btn-outline !py-2.5 !text-[11px]"
                >
                  <Plus size={14} /> Add New Address
                </button>
              </div>

              {(!user.addresses || user.addresses.length === 0) ? (
                <div className="border border-line bg-sand/30 p-8 text-center text-muted">
                  No saved addresses yet.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {user.addresses.map((addr) => (
                    <div key={addr.id} className="relative border border-line bg-white p-5">
                      <span className="mb-2 inline-block rounded-xs bg-sand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                        {addr.label || 'Address'}
                      </span>
                      <p className="font-medium text-ink">{addr.line1}</p>
                      {addr.line2 && <p className="text-sm text-muted">{addr.line2}</p>}
                      <p className="text-sm text-muted">{addr.city}, {addr.state} {addr.postalCode}</p>
                      <p className="text-sm text-muted">{addr.country}</p>
                      <div className="mt-4 border-t border-line pt-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-xs text-sale hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="w-full max-w-lg bg-white p-6 shadow-2xl">
                    <h3 className="mb-4 text-lg font-semibold">Add New Address</h3>
                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <FormField label="Label (e.g. Home, Work)" value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })} />
                      <FormField label="Flat / House / Building" value={newAddr.line1} onChange={(e) => setNewAddr({ ...newAddr, line1: e.target.value })} />
                      <FormField label="Street address" value={newAddr.line2} onChange={(e) => setNewAddr({ ...newAddr, line2: e.target.value })} />
                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="City" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} />
                        <FormField label="State" value={newAddr.state} onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} />
                      </div>
                      <FormField label="Postal code" value={newAddr.postalCode} onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })} />
                      <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" type="button" onClick={() => setShowAddressModal(false)}>Cancel</Button>
                        <Button type="submit">Save Address</Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Saved Items</h2>
                <Link to="/wishlist" className="text-xs font-semibold uppercase tracking-[0.14em] underline underline-offset-4">
                  View Full Wishlist Page
                </Link>
              </div>
              <p className="text-sm text-muted">
                You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved to your wishlist.
              </p>
              <Button to="/wishlist" className="mt-4">Go to Wishlist</Button>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="max-w-xl border border-line bg-white p-6 sm:p-8">
              <h2 className="mb-4 text-lg font-semibold">Account Preferences</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <p className="font-medium">Currency Display</p>
                    <p className="text-xs text-muted">Indian Rupee (INR — ₹)</p>
                  </div>
                  <span className="text-xs font-semibold text-accent-dark">Default</span>
                </div>
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <p className="font-medium">Newsletter Updates</p>
                    <p className="text-xs text-muted">Receive new season drop announcements</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-ink" />
                </div>
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <p className="font-medium">Demo Data Storage</p>
                    <p className="text-xs text-muted">Preferences stored in browser localStorage</p>
                  </div>
                  <Check size={16} className="text-success" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
