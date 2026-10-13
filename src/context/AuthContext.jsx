import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

/**
 * MOCK authentication (frontend demo only).
 * - No password is ever stored or checked: a real backend would verify credentials.
 * - Only the profile (name, email, mobile, addresses) is kept in localStorage.
 * To integrate a real API later, replace login/register/logout below with service calls.
 */
const AuthContext = createContext(null)

const isUser = (v) => v === null || (v && typeof v === 'object' && typeof v.email === 'string')

const DEMO_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    line1: '42, Lotus Residency',
    line2: 'MG Road',
    landmark: 'Near Central Park',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India',
  },
]

const nameFromEmail = (email) =>
  email
    .split('@')[0]
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('velora_user', null, isUser)

  const login = useCallback(
    ({ email, remember }) => {
      setUser((prev) =>
        prev && prev.email.toLowerCase() === email.toLowerCase()
          ? { ...prev, remember: !!remember }
          : { name: nameFromEmail(email), email, mobile: '', addresses: DEMO_ADDRESSES, remember: !!remember, createdAt: Date.now() },
      )
    },
    [setUser],
  )

  const register = useCallback(
    ({ name, email, mobile }) => {
      setUser({ name, email, mobile, addresses: [], remember: true, createdAt: Date.now() })
    },
    [setUser],
  )

  const logout = useCallback(() => setUser(null), [setUser])
  const updateProfile = useCallback((patch) => setUser((u) => (u ? { ...u, ...patch } : u)), [setUser])

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, login, register, logout, updateProfile }),
    [user, login, register, logout, updateProfile],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
