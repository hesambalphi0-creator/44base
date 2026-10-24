import { useEffect } from 'react'
import { site } from '../data/site'

/**
 * Sets the document title / meta description per route.
 * Keeps metadata unique without pulling in a head-management dependency.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`

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

  return null
}
