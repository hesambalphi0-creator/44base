import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import { IconCheck, IconInfo } from '../components/Icons'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { useStore } from '../context/StoreContext'
import { site } from '../data/site'
import { formatPrice, toFa } from '../lib/format'

const STATUS = {
  requested: 'درخواست ثبت‌شده — در انتظار تأیید',
  confirmed: 'تأییدشده',
  cancelled: 'لغوشده',
}

const DELIVERY_LABEL = {
  coordination: 'هماهنگی تلفنی برای ارسال',
  freight: 'ارسال با باربری',
  pickup: 'تحویل حضوری',
}

export default function OrderSuccess() {
  const { id } = useParams()
  const { getOrder } = useStore()
  const order = getOrder(id)

  if (!order) {
    return (
      <>
        <Seo title="سفارش یافت نشد" />
        <div className="container section">
          <EmptyState
            title="این سفارش پیدا نشد"
            text="سفارش‌ها در همین مرورگر ذخیره می‌شوند؛ ممکن است سفارش در دستگاه یا مرورگر دیگری ثبت شده باشد."
            actions={
              <Link className="btn btn--primary" to="/products">
                بازگشت به محصولات
              </Link>
            }
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title={`سفارش ${order.id}`} />
      <div className="container">
        <Breadcrumbs items={[{ label: 'تأیید سفارش' }]} />
        <div className="section" style={{ paddingBlockStart: 0, maxWidth: 820 }}>
          <div className="notice notice--success" style={{ marginBlockEnd: 20 }}>
            <IconCheck size={18} />
            <div>
              <b>سفارش شما ثبت شد.</b>
              <div>
                کد سفارش: <span className="ltr">{order.id}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ fontSize: 18 }}>جزئیات سفارش</h2>
            <div className="summary__row">
              <span>وضعیت</span>
              <b>{STATUS[order.status] || order.status}</b>
            </div>
            <div className="summary__row">
              <span>وضعیت پرداخت</span>
              <b>{order.payment === 'unpaid' ? 'پرداخت‌نشده' : order.payment}</b>
            </div>
            <div className="summary__row">
              <span>روش تحویل</span>
              <b>{DELIVERY_LABEL[order.deliveryMethod] || 'هماهنگی تلفنی'}</b>
            </div>
            <div className="summary__row">
              <span>تاریخ ثبت</span>
              <b>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</b>
            </div>

            <h3 style={{ fontSize: 15, marginBlockStart: 18 }}>کالاها</h3>
            {order.items.map((i) => (
              <div className="summary__row" key={i.id}>
                <span>
                  {i.name} × {toFa(i.qty)} <span className="ltr">({i.sku})</span>
                </span>
                <b>{formatPrice(i.price) || 'استعلام'}</b>
              </div>
            ))}
            <div className="summary__row summary__total">
              <span>جمع کالاها</span>
              <b>{formatPrice(order.total)}</b>
            </div>

            <h3 style={{ fontSize: 15, marginBlockStart: 18 }}>اطلاعات تحویل</h3>
            <p className="field__hint">
              {order.customer.name} — <span className="ltr">{order.customer.phone}</span>
              <br />
              {order.customer.city}، {order.customer.address}
              {order.customer.email && (
                <>
                  <br />
                  <span className="ltr">{order.customer.email}</span>
                </>
              )}
            </p>
            {order.note && (
              <p className="field__hint" style={{ marginBlockStart: 8 }}>
                یادداشت: {order.note}
              </p>
            )}
          </div>

          <div style={{ marginBlockStart: 18 }}>
            <Notice variant="warn" title="پرداخت انجام نشده است">
              هیچ مبلغی از حساب شما کسر نشده و پرداخت آنلاین در این نسخه فعال نیست. برای نهایی
              کردن سفارش، کارشناسان {site.name} با شما تماس می‌گیرند.
            </Notice>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBlockStart: 20, flexWrap: 'wrap' }}>
            <Link className="btn btn--primary" to="/products">
              ادامه خرید
            </Link>
            <Link className="btn btn--outline" to="/account">
              <IconInfo size={16} />
              مشاهده سفارش‌های من
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
