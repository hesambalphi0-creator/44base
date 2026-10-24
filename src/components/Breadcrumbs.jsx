import { Link } from 'react-router-dom'
import { IconChevronStart } from './Icons'

/**
 * Breadcrumbs. Trail order follows the RTL reading direction, so the separator
 * chevron points from the current page back toward the home page.
 */
export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="مسیر صفحه">
      <Link to="/">صفحه اصلی</Link>
      {items.map((item) => (
        <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <IconChevronStart size={14} className="breadcrumbs__sep" />
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
