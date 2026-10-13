import { HelpCircle } from 'lucide-react'
import EmptyState from '../components/common/EmptyState'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page Not Found', 'The requested page could not be located on VELORA.')

  return (
    <div className="container-x py-20 md:py-32">
      <EmptyState
        icon={HelpCircle}
        title="404 — Page Not Found"
        text="The page you are looking for may have been moved, renamed, or is temporarily unavailable."
        actions={[
          { label: 'Return Home', to: '/' },
          { label: 'Shop Men', to: '/collections/men', variant: 'outline' },
          { label: 'Shop Women', to: '/collections/women', variant: 'outline' },
        ]}
      />
    </div>
  )
}
