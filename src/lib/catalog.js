import { brandName } from '../data/brands'
import { getCategory } from '../data/categories'
import { getByCategory, products, searchProducts } from '../data/products'

export const PAGE_SIZE = 9

export const SORTS = [
  { id: 'relevance', label: 'پیشنهاد های سرما' },
  { id: 'price-asc', label: 'ارزان‌ترین' },
  { id: 'price-desc', label: 'گران‌ترین' },
  { id: 'name', label: 'نام محصول (الفبا)' },
]

/** Product pool for a listing: a category, a search query, or the whole catalogue. */
export function poolFor({ categoryId, query }) {
  if (query) return searchProducts(query, products.length)
  if (categoryId) return getByCategory(categoryId)
  return products
}

/** Selected facet values come from the URL: `f_brand=embraco,secop`. */
export function parseFilters(searchParams, facetKeys) {
  const out = {}
  for (const key of facetKeys) {
    // Accepts both the grouped form (`f_brand=a,b`) and a plain shareable
    // link form (`brand=a`), e.g. from the brand tiles on the homepage.
    const raw = searchParams.get(`f_${key}`) ?? searchParams.get(key)
    if (raw) out[key] = raw.split(',').filter(Boolean)
  }
  return out
}

export function activeFilterCount(filters) {
  return Object.values(filters).reduce((n, arr) => n + (arr?.length || 0), 0)
}

/** Facet keys offered on the whole-catalogue listing. */
export const ALL_FACETS = ['category', 'brand', 'refrigerant', 'application']

export function filterProducts(list, filters) {
  return list.filter((p) =>
    Object.entries(filters).every(([key, values]) => {
      if (!values || values.length === 0) return true
      if (key === 'brand') return values.includes(p.brand)
      if (key === 'category') return values.includes(p.category)
      const v = p.facets?.[key]
      if (Array.isArray(v)) return v.some((x) => values.includes(x))
      return values.includes(v)
    })
  )
}

/** Human label for a facet value (brand ids and category ids need mapping). */
export const facetLabel = (key, value) => {
  if (key === 'brand') return brandName(value)
  if (key === 'category') return getCategory(value)?.shortName || value
  return value
}

export function sortProducts(list, sort) {
  const sorted = [...list]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    case 'price-desc':
      return sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fa'))
    default:
      return sorted
  }
}

/**
 * Facet options derived from the current product pool (never from a static
 * list), so a filter can never offer a value that yields zero results.
 */
export function facetOptions(facetKey, list) {
  const set = new Set()
  for (const p of list) {
    if (facetKey === 'brand' || facetKey === 'category') {
      set.add(p[facetKey])
      continue
    }
    const v = p.facets?.[facetKey]
    if (Array.isArray(v)) v.forEach((x) => set.add(x))
    else if (v) set.add(v)
  }
  return [...set].map((value) => ({
    value,
    count: list.filter((p) =>
      facetKey === 'brand' || facetKey === 'category'
        ? p[facetKey] === value
        : Array.isArray(p.facets?.[facetKey])
        ? p.facets[facetKey].includes(value)
        : p.facets?.[facetKey] === value
    ).length,
  }))
}

export const paginate = (list, page, size = PAGE_SIZE) => {
  const pages = Math.max(1, Math.ceil(list.length / size))
  const current = Math.min(Math.max(1, page), pages)
  return {
    pages,
    current,
    items: list.slice((current - 1) * size, current * size),
  }
}
