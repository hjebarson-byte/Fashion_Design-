import { useToastContext } from '../context/ToastContext'

/** Convenience hook: const toast = useToast(); toast.success('Done!') */
export default function useToast() {
  return useToastContext()
}
