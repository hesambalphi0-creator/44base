import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import { IconArrowForward, IconCart, IconTrash } from '../components/Icons'
import QuantitySelector from '../components/QuantitySelector'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { useStore } from '../context/StoreContext'
import { site } from '../data/site'
import { formatPrice, toFa } from '../lib/format'

export default function Cart() {
  const { cartDetailed, subtotal, setQty, removeFromCart, clearCart, cartCount } = useStore()

  if (cartDetailed.length === 0) {
    return (
      <>
        <Seo title="سبد خرید" />
        <div className="container section">
          <Breadcrumbs items={[{ label: 'سبد خرید' }]} />
          <EmptyState
            icon={<IconCart size={34} />}
            title="سبد خرید شما خالی است"
            text="برای شروع، از دسته‌بندی محصولات یا نتایج جستجو کالا اضافه کنید."
            actions={
              <>
                <Link className="btn btn--primary" to="/products">
                  مشاهده محصولات
                  <IconArrowForward size={16} />
                </Link>
                <Link className="btn btn--outline" to="/category/compressors">
                  کمپرسورهای برودتی
                </Link>
              </>
            }
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title="سبد خرید" />
      <div className="container">
        <Breadcrumbs items={[{ label: 'سبد خرید' }]} />
        <div style={{ marginBlockEnd: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>
            سبد خرید ({toFa(cartCount)} کالا)
          </h1>
        </div>

        <div className="cart-layout">
          <div className="card">
            {cartDetailed.map((line) => (
              <div className="cart-row" key={line.id}>
                <Link className="cart-row__media" to={`/product/${line.product.slug}`}>
                  <img src={line.product.image} alt={line.product.name} loading="lazy" />
                </Link>
                <div>
                  <Link className="cart-row__title" to={`/product/${line.product.slug}`}>
                    {line.product.name}
                  </Link>
                  <div className="cart-row__meta">
                    کد فنی: <span className="ltr">{line.product.sku}</span>
                  </div>
                  <div className="cart-row__controls">
                    <QuantitySelector
                      value={line.qty}
                      onChange={(q) => setQty(line.id, q)}
                      min={0}
                      max={20}
                      label={`تعداد ${line.product.name}`}
                    />
                    <button
                      type="button"
                      className="link-danger"
                      onClick={() => removeFromCart(line.id)}
                    >
                      <IconTrash size={15} /> حذف از سبد
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'end' }}>
                  <div style={{ fontWeight: 700 }}>{formatPrice(line.lineTotal)}</div>
                  <div className="cart-row__meta">
                    واحد: {formatPrice(line.product.price) ?? 'استعلام'}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                padding: 16,
                flexWrap: 'wrap',
              }}
            >
              <Link className="btn btn--outline" to="/products">
                ادامه خرید
              </Link>
              <button type="button" className="link-danger" onClick={clearCart}>
                خالی کردن سبد خرید
              </button>
            </div>
          </div>

          <aside className="summary">
            <h2>خلاصه سفارش</h2>
            <div className="summary__row">
              <span>جمع کالاها</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
            <div className="summary__row">
              <span>هزینه ارسال</span>
              <b>پس از هماهنگی</b>
            </div>
            <div className="summary__row summary__total">
              <span>مبلغ قابل پرداخت</span>
              <b>{formatPrice(subtotal)}</b>
            </div>

            <div style={{ marginBlockStart: 16 }}>
              <Notice variant="info">
                هزینه ارسال بر اساس مقصد و حجم سفارش تعیین می‌شود و در این مرحله محاسبه
                نمی‌شود.
              </Notice>
            </div>

            <Link
              className="btn btn--primary btn--block"
              to="/checkout"
              style={{ marginBlockStart: 16 }}
            >
              ادامه و ثبت سفارش
            </Link>

            {!site.paymentEnabled && (
              <p className="field__hint" style={{ marginBlockStart: 12 }}>
                پرداخت آنلاین فعال نیست؛ سفارش به‌صورت درخواست ثبت و توسط کارشناسان پیگیری
                می‌شود.
              </p>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}
