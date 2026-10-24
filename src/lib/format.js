const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** Latin digits → Persian digits (for Persian explanatory content). */
export const toFa = (value) => String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)])

/** Thousands-separated Persian number, e.g. 5450000 → ۵٫۴۵۰٫۰۰۰ */
export const faNumber = (value) => toFa(Number(value).toLocaleString('en-US'))

/**
 * Price display. Returns null when the product has no confirmed price, so the
 * UI can render an "استعلام قیمت" state instead of inventing a number.
 */
export const formatPrice = (value) =>
  value === null || value === undefined ? null : `${faNumber(value)} تومان`

export const PRICE_ON_REQUEST = 'استعلام قیمت'

/** English digits for technical identifiers (SKU, model) stay LTR. */
export const technical = (value) => String(value ?? '')

export const discountPercent = (price, salePrice) =>
  price && salePrice ? Math.round(((price - salePrice) / price) * 100) : 0
