import { formatPrice, PRICE_ON_REQUEST } from '../lib/format'

/**
 * Price display. Renders an "on request" state when no confirmed price exists
 * rather than showing an invented number.
 */
export default function Price({ product, size = 'md' }) {
  const { price, salePrice } = product

  if (price === null || price === undefined) {
    return <span className="price--onrequest">{PRICE_ON_REQUEST}</span>
  }

  const effective = salePrice ?? price
  return (
    <span className="price">
      <span className="price__value" style={size === 'lg' ? { fontSize: 24 } : undefined}>
        {formatPrice(effective)}
      </span>
      {salePrice && (
        <span className="price__was">{formatPrice(price)}</span>
      )}
      {product.priceType === 'sample' && (
        <span className="price__unit">(قیمت نمونه — نیازمند تأیید)</span>
      )}
    </span>
  )
}
