import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import {
  IconArrowForward,
  IconClose,
  IconHeart,
  IconInfo,
  IconPhone,
  IconZoom,
} from '../components/Icons'
import Price from '../components/Price'
import ProductGrid from '../components/ProductGrid'
import QuantitySelector from '../components/QuantitySelector'
import Seo from '../components/Seo'
import StockBadge from '../components/StockBadge'
import { Notice } from '../components/Toaster'
import { useStore } from '../context/StoreContext'
import { brandFa, brandName } from '../data/brands'
import { getCategory } from '../data/categories'
import { getProduct, relatedProducts } from '../data/products'
import { site } from '../data/site'
import { toFa } from '../lib/format'

const TABS = [
  { id: 'specs', label: 'مشخصات فنی' },
  { id: 'description', label: 'توضیحات محصول' },
  { id: 'docs', label: 'فایل‌های فنی' },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWished } = useStore()
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)
  const [tab, setTab] = useState('specs')
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    setQty(1)
    setActive(0)
    setTab('specs')
  }, [slug])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => e.key === 'Escape' && setLightbox(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox])

  if (!product) {
    return (
      <div className="container section">
        <EmptyState
          title="این محصول یافت نشد"
          text="ممکن است نشانی صفحه تغییر کرده باشد."
          actions={
            <Link className="btn btn--primary" to="/products">
              مشاهده همه محصولات
            </Link>
          }
        />
      </div>
    )
  }

  const category = getCategory(product.category)
  const wished = isWished(product.id)
  const purchasable = product.price !== null && product.stockStatus !== 'unavailable'
  const related = relatedProducts(product, 3)

  return (
    <>
      <Seo title={product.seo?.title || product.name} description={product.seo?.description} />

      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'محصولات', to: '/products' },
            { label: category?.name, to: `/category/${category?.slug}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container">
        <div className="pdp">
          <div>
            <div className="gallery__main">
              <img
                src={product.gallery[active]}
                alt={product.name}
                width="440"
                height="420"
                /* hero-adjacent image: loaded eagerly on purpose */
              />
              <button
                type="button"
                className="gallery__zoom"
                onClick={() => setLightbox(true)}
                aria-label="نمایش تصویر در اندازه کامل"
              >
                <IconZoom size={16} />
                نمایش کامل
              </button>
            </div>
            {product.gallery.length > 1 && (
              <div className="gallery__thumbs" role="tablist" aria-label="تصاویر محصول">
                {product.gallery.map((src, i) => (
                  <button
                    type="button"
                    key={src + i}
                    role="tab"
                    aria-selected={i === active}
                    className={`gallery__thumb${i === active ? ' is-active' : ''}`}
                    onClick={() => setActive(i)}
                  >
                    <img src={src} alt={`تصویر ${toFa(i + 1)}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="pdp__brand">
              {brandName(product.brand)} — {brandFa(product.brand)}
            </span>
            <h1>{product.name}</h1>

            <div className="pdp__ids">
              <span>
                کد فنی: <b className="ltr">{product.sku}</b>
              </span>
              {product.model && (
                <span>
                  مدل: <b className="ltr">{product.model}</b>
                </span>
              )}
              <span>
                دسته: <b>{category?.name}</b>
              </span>
            </div>

            <p className="section-sub" style={{ marginBlockStart: 14 }}>
              {product.shortDescription}
            </p>

            <div className="pdp__price-box">
              <Price product={product} size="lg" />
              <div style={{ marginBlockStart: 10 }}>
                <StockBadge status={product.stockStatus} />
              </div>

              {product.priceType === 'sample' && (
                <div style={{ marginBlockStart: 14 }}>
                  <Notice variant="warn" title="قیمت و موجودی تأییدشده نیست">
                    این کالا در حال حاضر یک <b>رکورد داده نمونه</b> است. قیمت نمایش‌داده‌شده
                    نمونه است و موجودی باید پیش از خرید تأیید شود.
                  </Notice>
                </div>
              )}

              <div className="pdp__buy">
                <QuantitySelector value={qty} onChange={setQty} max={20} />
                <button
                  type="button"
                  className="btn btn--primary"
                  disabled={!purchasable}
                  title={purchasable ? undefined : 'سفارش آنلاین برای این کالا فعال نیست'}
                  onClick={() => {
                    addToCart(product.id, qty)
                    navigate('/cart')
                  }}
                >
                  افزودن به سبد خرید
                </button>
                <button
                  type="button"
                  className={`btn btn--outline${wished ? ' is-on' : ''}`}
                  aria-pressed={wished}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <IconHeart size={17} filled={wished} />
                  {wished ? 'در علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                </button>
              </div>

              {!site.paymentEnabled && (
                <p className="field__hint" style={{ marginBlockStart: 12 }}>
                  پرداخت آنلاین در این فروشگاه فعال نشده است؛ سفارش شما به‌صورت درخواست ثبت
                  می‌شود و کارشناسان برای هماهنگی نهایی تماس می‌گیرند.
                </p>
              )}
            </div>

            <div style={{ marginBlockStart: 16 }}>
              <Notice variant="info" title="تأیید سازگاری">
                تطبیق این کالا با سیستم شما نیازمند بررسی همزمان مبرد، ظرفیت و مشخصات برقی
                است.{' '}
                <Link to={`/compatibility?product=${product.slug}`} className="link-btn">
                  بررسی تطبیق <IconArrowForward size={13} />
                </Link>
              </Notice>
            </div>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="اطلاعات محصول">
          {TABS.map((t) => (
            <button
              type="button"
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? 'is-active' : ''}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ paddingBlock: '10px 56px' }}>
          {tab === 'specs' &&
            (product.specs?.length ? (
              <table className="spec-table">
                <caption className="field__hint" style={{ textAlign: 'start', paddingBlockEnd: 8 }}>
                  مقادیر بر اساس مشخصات اعلام‌شده برند سازنده.
                </caption>
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label}>
                      <th scope="row">{s.label}</th>
                      <td className={s.latin ? 'ltr' : undefined}>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Notice variant="info">
                مشخصات فنی این کالا ثبت نشده است. برای دریافت اطلاعات، با کارشناسان تماس
                بگیرید.
              </Notice>
            ))}

          {tab === 'description' && (
            <div className="prose">
              <p>{product.description}</p>
              <p className="field__hint">
                <IconInfo size={14} /> هیچ ادعایی درباره گارانتی، استاندارد یا تأییدیه این کالا
                در این صفحه مطرح نشده است؛ این اطلاعات تنها در صورت تأیید کسب‌وکار اضافه
                می‌شود.
              </p>
            </div>
          )}

          {tab === 'docs' && (
            <Notice variant="info" title="فایل فنی ثبت نشده است">
              برای این کالا دیتاشیت یا کاتالوگ در سیستم بارگذاری نشده است. برای دریافت فایل
              فنی با کارشناسان {site.name} تماس بگیرید.
              <div style={{ marginBlockStart: 10 }}>
                <Link className="btn btn--outline" to="/contact">
                  <IconPhone size={16} />
                  درخواست فایل فنی
                </Link>
              </div>
            </Notice>
          )}
        </div>

        {related.length > 0 && (
          <section style={{ paddingBlockEnd: 56 }}>
            <div className="section-head">
              <span className="section-label">پیشنهاد مرتبط</span>
              <h2 className="section-title">کالاهای مرتبط</h2>
              <p className="section-sub">
                موارد زیر بر اساس دسته و برند مشابه پیشنهاد شده‌اند، نه به‌عنوان تأیید
                سازگاری فنی.
              </p>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`تصویر بزرگ ${product.name}`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="بستن تصویر"
            onClick={() => setLightbox(false)}
          >
            <IconClose size={20} />
          </button>
          <img src={product.gallery[active]} alt={product.name} />
        </div>
      )}
    </>
  )
}
