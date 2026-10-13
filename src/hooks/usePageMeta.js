import { useEffect } from 'react'

const BASE = 'VELORA'

/** Sets the document title and meta description for the current page. */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} — Define Your Everyday`
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
