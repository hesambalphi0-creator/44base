import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { brandName } from '../data/brands'
import { site } from '../data/site'
import { IconHeart } from './Icons'
import Price from './Price'
import StockBadge from './StockBadge'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWished } = useStore()
  const navigate = useNavigate()
  const wished = isWished(product.id)
  const purchasable = product.price !== null && product.stockStatus !== 'unavailable'

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width="220"
            height="200"
          />
        </Link>
        <button
          type="button"
          className={`product-card__wish${wished ? ' is-on' : ''}`}
          aria-label={wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          aria-pressed={wished}
          onClick={() => toggleWishlist(product.id)}
        >
          <IconHeart size={17} filled={wished} />
        </button>
        {product.priceType === 'sample' && (
          <span className="product-card__sample" title="رکورد داده نمونه">
            داده نمونه
          </span>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__brand">{brandName(product.brand)}</span>
        <h3 className="product-card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="product-card__sku">
          کد فنی: <span className="ltr">{product.sku}</span>
        </span>

        <div className="product-card__foot">
          <Price product={product} />
          <div style={{ marginBlockStart: 8 }}>
            <StockBadge status={product.stockStatus} />
          </div>
          <div className="product-card__actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!purchasable}
              title={purchasable ? undefined : 'این کالا برای سفارش آنلاین در دسترس نیست'}
              onClick={() => addToCart(product.id, 1)}
            >
              افزودن به سبد
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              جزئیات
            </button>
          </div>
          {!purchasable && (
            <p className="field__hint" style={{ marginBlockStart: 8 }}>
              برای این کالا با{' '}
              <Link to="/contact" className="link-btn">
                کارشناسان {site.name}
              </Link>{' '}
              هماهنگ کنید.
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
