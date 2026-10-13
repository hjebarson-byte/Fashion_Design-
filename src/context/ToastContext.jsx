import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

/**
 * Global toast notifications.
 * const toast = useToast();  toast.success('Saved'); toast.error('Oops');
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const push = useCallback(
    (message, type = 'info', duration = 3200) => {
      const id = ++idRef.current
      // keep at most 3 visible toasts
      setToasts((t) => [...t.slice(-2), { id, message, type }])
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  const api = useMemo(
    () => ({
      toasts,
      dismiss,
      show: push,
      success: (m) => push(m, 'success'),
      error: (m) => push(m, 'error', 4200),
      info: (m) => push(m, 'info'),
    }),
    [toasts, dismiss, push],
  )

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToastContext() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
