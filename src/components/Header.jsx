import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { categories } from '../data/categories'
import { searchProducts } from '../data/products'
import { site } from '../data/site'
import { toFa } from '../lib/format'
import {
  IconCart,
  IconChevronDown,
  IconClose,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
} from './Icons'

const NAV = [
  { to: '/', label: 'صفحه اصلی', end: true },
  { to: '/products', label: 'محصولات', children: true },
  { to: '/brands', label: 'برندها' },
  { to: '/guides', label: 'راهنمای خرید' },
  { to: '/about', label: 'درباره ما' },
  { to: '/contact', label: 'تماس با ما' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const ddRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount, wishlist, user } = useStore()

  const suggestions = useMemo(() => searchProducts(query), [query])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDdOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onDocClick = (e) => {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDdOpen(false)
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setSearchOpen(false)
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className={`header${solid || menuOpen ? ' header--solid' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label={`${site.name} — صفحه اصلی`}>
          <img src="/assets/logo-hi-sarma.svg" alt={`نشان ${site.name}`} width="44" height="44" />
          <span className="header__brand-text">
            <b className="ltr">HI SARMA</b>
            <span>{site.name} | {site.tagline}</span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="ناوبری اصلی">
          {NAV.map((item) =>
            item.children ? (
              <div className="dropdown" key={item.to} ref={ddRef}>
                <button
                  type="button"
                  className={`header__link${
                    location.pathname.startsWith('/products') ||
                    location.pathname.startsWith('/category')
                      ? ' is-active'
                      : ''
                  }`}
                  aria-expanded={ddOpen}
                  aria-haspopup="true"
                  onClick={() => setDdOpen((v) => !v)}
                >
                  {item.label}
                  <IconChevronDown size={15} />
                </button>
                {ddOpen && (
                  <div className="dropdown__menu" role="menu">
                    <Link className="dropdown__item" to="/products" role="menuitem">
                      همه محصولات
                    </Link>
                    {categories.map((c) => (
                      <Link
                        className="dropdown__item"
                        key={c.id}
                        to={`/category/${c.slug}`}
                        role="menuitem"
                      >
                        {c.name}
                      </Link>
                    ))}
                    <Link className="dropdown__item" to="/compatibility" role="menuitem">
                      تطبیق کمپرسور با سیستم
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="header__tools">
          <form className="search" role="search" onSubmit={submitSearch} ref={searchRef}>
            <div className="search__field">
              <IconSearch size={17} />
              <label className="sr-only" htmlFor="site-search">
                جستجوی محصول
              </label>
              <input
                id="site-search"
                type="search"
                value={query}
                placeholder="جستجوی محصول، برند یا کد فنی ..."
                autoComplete="off"
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
              />
              {query && (
                <button
                  type="button"
                  className="search__clear"
                  aria-label="پاک کردن جستجو"
                  onClick={() => {
                    setQuery('')
                    setSearchOpen(false)
                  }}
                >
                  <IconClose size={15} />
                </button>
              )}
            </div>
            {searchOpen && query.trim() && (
              <div className="search__panel">
                {suggestions.length === 0 ? (
                  <p className="search__empty">
                    نتیجه‌ای یافت نشد. کد فنی یا نام برند را بررسی کنید.
                  </p>
                ) : (
                  suggestions.map((p) => (
                    <Link key={p.id} to={`/product/${p.slug}`} className="search__row">
                      <img src={p.image} alt="" />
                      <span>
                        <b>{p.name}</b>
                        <span className="ltr">{p.sku}</span>
                      </span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </form>

          <Link
            to={user ? '/account' : '/account/sign-in'}
            className="icon-btn"
            aria-label={user ? 'حساب کاربری' : 'ورود به حساب'}
            title={user ? `حساب ${user.name}` : 'ورود به حساب'}
          >
            <IconUser size={19} />
          </Link>

          <Link to="/wishlist" className="icon-btn" aria-label="علاقه‌مندی‌ها">
            <IconHeart size={19} />
            {wishlist.length > 0 && (
              <span className="icon-btn__badge">{toFa(wishlist.length)}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-btn" aria-label={`سبد خرید، ${cartCount} کالا`}>
            <IconCart size={19} />
            <span className="icon-btn__badge">{toFa(cartCount)}</span>
          </Link>

          <button
            type="button"
            className="icon-btn header__burger"
            aria-label="منوی اصلی"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose size={19} /> : <IconMenu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <div className="container">
            {/* The header search is hidden on phone widths, so it lives here. */}
            <form className="mobile-nav__search" role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="mobile-search">
                جستجوی محصول
              </label>
              <input
                id="mobile-search"
                type="search"
                value={query}
                placeholder="جستجوی محصول، برند یا کد فنی ..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn--primary" aria-label="جستجو">
                <IconSearch size={17} />
              </button>
            </form>

            {NAV.map((item) => (
              <div key={item.to}>
                <Link to={item.to}>{item.label}</Link>
                {item.children && (
                  <div className="mobile-nav__sub">
                    {categories.map((c) => (
                      <Link key={c.id} to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    ))}
                    <Link to="/compatibility">تطبیق کمپرسور با سیستم</Link>
                  </div>
                )}
              </div>
            ))}
            {site.contact.phone && (
              <a href={`tel:${site.contact.phone}`} className="mobile-nav__phone">
                تماس تلفنی: <span className="ltr">{site.contact.phone}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
