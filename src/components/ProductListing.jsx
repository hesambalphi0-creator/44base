import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { filterGroups } from '../data/categories'
import {
  activeFilterCount,
  ALL_FACETS,
  facetLabel,
  facetOptions,
  PAGE_SIZE,
  paginate,
  parseFilters,
  poolFor,
  SORTS,
  sortProducts,
  filterProducts,
} from '../lib/catalog'
import { toFa } from '../lib/format'
import { IconSliders } from './Icons'
import ProductGrid from './ProductGrid'

/**
 * Shared listing surface used by the catalogue page, category pages and search
 * results. All filter/sort/page state lives in the URL, so every listing view is
 * linkable and the browser back button behaves correctly.
 */
export default function ProductListing({ category, query = '', emptyActions }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const facetKeys = category?.filters || ALL_FACETS
  const sort = searchParams.get('sort') || 'relevance'
  const page = Number(searchParams.get('page') || 1)
  const paramsKey = searchParams.toString()

  const filters = useMemo(
    () => parseFilters(searchParams, facetKeys),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paramsKey, category?.id]
  )

  const pool = useMemo(
    () => poolFor({ categoryId: category?.id, query }),
    [category?.id, query]
  )

  const filtered = useMemo(() => filterProducts(pool, filters), [pool, filters])
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort])
  const { items, pages, current } = paginate(sorted, page)

  const update = (mutate) => {
    const next = new URLSearchParams(searchParams)
    mutate(next)
    next.delete('page')
    setSearchParams(next, { replace: false })
  }

  const toggleFacet = (key, value) => {
    const current = filters[key] || []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    update((p) => {
      if (next.length === 0) p.delete(`f_${key}`)
      else p.set(`f_${key}`, next.join(','))
      p.delete(key)
    })
  }

  const clearFilters = () => {
    update((p) => {
      facetKeys.forEach((k) => {
        p.delete(`f_${k}`)
        p.delete(k)
      })
    })
  }

  const setSort = (value) => update((p) => p.set('sort', value))
  const setPage = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value <= 1) next.delete('page')
    else next.set('page', String(value))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filterCount = activeFilterCount(filters)
  const optionsFor = (key) => facetOptions(key, pool)

  return (
    <div className="listing">
      <aside
        className="filters"
        aria-label="فیلتر محصولات"
        data-open={filtersOpen ? 'true' : 'false'}
      >
        <div className="filters__head">
          <b style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <IconSliders size={17} />
            فیلترها
          </b>
          {filterCount > 0 && (
            <button type="button" className="link-btn" onClick={clearFilters}>
              حذف همه ({toFa(filterCount)})
            </button>
          )}
        </div>

        {facetKeys.map((key) => {
          const options = optionsFor(key)
          if (options.length === 0) return null
          const group = filterGroups[key]
          const selected = filters[key] || []
          return (
            <fieldset className="filters__group" key={key} style={{ border: 0, padding: 0, margin: 0 }}>
              <legend style={{ padding: 0 }}>
                <h4>{group?.label || key}</h4>
              </legend>
              {options.map((o) => (
                <label className="filters__option" key={o.value}>
                  <input
                    type="checkbox"
                    checked={selected.includes(o.value)}
                    onChange={() => toggleFacet(key, o.value)}
                  />
                  <span>{facetLabel(key, o.value)}</span>
                  <span className="filters__count">{toFa(o.count)}</span>
                </label>
              ))}
            </fieldset>
          )
        })}

        {filterCount === 0 && (
          <p className="field__hint" style={{ marginBlockStart: 8 }}>
            برای محدودکردن نتایج، یکی از گزینه‌های فنی را انتخاب کنید.
          </p>
        )}
      </aside>

      <div>
        <div className="listing__bar">
          <span className="listing__count">
            {sorted.length > 0
              ? `${toFa(sorted.length)} کالا یافت شد`
              : 'کالایی با این مشخصات یافت نشد'}
          </span>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span className="field__hint">مرتب‌سازی</span>
            <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ProductGrid
          products={items}
          emptyTitle={
            query
              ? `نتیجه‌ای برای «${query}» یافت نشد`
              : 'محصولی با این مشخصات یافت نشد'
          }
          emptyText="فیلترها را تغییر دهید یا عبارت جستجو را ساده‌تر کنید. برای انتخاب تخصصی می‌توانید با کارشناسان ما تماس بگیرید."
          emptyActions={
            emptyActions || (
              <button type="button" className="btn btn--outline" onClick={clearFilters}>
                حذف فیلترها
              </button>
            )
          }
        />

        {pages > 1 && (
          <nav className="pagination" aria-label="صفحه‌بندی">
            <button
              type="button"
              onClick={() => setPage(current - 1)}
              disabled={current === 1}
            >
              قبلی
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                type="button"
                key={n}
                className={n === current ? 'is-active' : ''}
                aria-current={n === current ? 'page' : undefined}
                onClick={() => setPage(n)}
              >
                {toFa(n)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(current + 1)}
              disabled={current === pages}
            >
              بعدی
            </button>
          </nav>
        )}

        {sorted.length > 0 && sorted.length <= PAGE_SIZE && (
          <p className="field__hint" style={{ marginBlockStart: 16, textAlign: 'center' }}>
            همه {toFa(sorted.length)} کالای این بخش نمایش داده شد.
          </p>
        )}
      </div>
    </div>
  )
}
