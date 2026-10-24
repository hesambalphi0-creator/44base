import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { useStore } from '../context/StoreContext'
import { site } from '../data/site'
import { formatPrice, toFa } from '../lib/format'

const DELIVERY = [
  { id: 'coordination', label: 'هماهنگی تلفنی برای ارسال' },
  { id: 'freight', label: 'ارسال با باربری' },
  { id: 'pickup', label: 'تحویل حضوری' },
]

const PHONE_RE = /^0?9\d{9}$/

export default function Checkout() {
  const { cartDetailed, subtotal, placeOrder, user } = useStore()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    city: '',
    note: '',
    deliveryMethod: DELIVERY[0].id,
  })

  if (cartDetailed.length === 0) return <Navigate to="/cart" replace />

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((x) => ({ ...x, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'نام و نام خانوادگی را وارد کنید.'
    if (!form.phone.trim()) next.phone = 'شماره تماس را وارد کنید.'
    else if (!PHONE_RE.test(form.phone.trim()))
      next.phone = 'شماره موبایل معتبر نیست. نمونه: 09123456789'
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = 'قالب ایمیل درست نیست.'
    if (!form.address.trim()) next.address = 'نشانی تحویل را وارد کنید.'
    else if (form.address.trim().length < 10)
      next.address = 'نشانی را کامل‌تر وارد کنید (حداقل ۱۰ نویسه).'
    if (!form.city.trim()) next.city = 'شهر را وارد کنید.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      const first = document.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }
    setSubmitting(true)
    const order = placeOrder({
      customer: {
        name: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        address: form.address.trim(),
        city: form.city.trim(),
      },
      note: form.note.trim(),
      deliveryMethod: form.deliveryMethod,
    })
    navigate(`/order/${order.id}`, { replace: true })
  }

  return (
    <>
      <Seo title="تکمیل سفارش" />
      <div className="container">
        <Breadcrumbs
          items={[{ label: 'سبد خرید', to: '/cart' }, { label: 'تکمیل سفارش' }]}
        />
        <div style={{ marginBlockEnd: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>تکمیل سفارش</h1>
          <p className="section-sub">
            اطلاعات تحویل را وارد کنید. پس از ثبت، سفارش شما به‌صورت «درخواست» ثبت می‌شود و
            کارشناسان برای تأیید موجودی و هماهنگی نهایی تماس می‌گیرند.
          </p>
        </div>

        <div className="cart-layout" style={{ paddingBlockEnd: 64 }}>
          <form className="card" style={{ padding: 22 }} onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="fullName">
                  نام و نام خانوادگی <span className="req">*</span>
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={set('fullName')}
                  aria-invalid={Boolean(errors.fullName)}
                  autoComplete="name"
                />
                {errors.fullName && <span className="field__error">{errors.fullName}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">
                  شماره تماس <span className="req">*</span>
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={set('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  inputMode="tel"
                  autoComplete="tel"
                  className="ltr"
                  placeholder="09xxxxxxxxx"
                />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">ایمیل (اختیاری)</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  className="ltr"
                />
                {errors.email ? (
                  <span className="field__error">{errors.email}</span>
                ) : (
                  <span className="field__hint">
                    در صورت ثبت، پیگیری سفارش در حساب کاربری ساده‌تر است.
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="city">
                  شهر <span className="req">*</span>
                </label>
                <input
                  id="city"
                  value={form.city}
                  onChange={set('city')}
                  aria-invalid={Boolean(errors.city)}
                />
                {errors.city && <span className="field__error">{errors.city}</span>}
              </div>

              <div className="field field--full">
                <label htmlFor="address">
                  نشانی تحویل <span className="req">*</span>
                </label>
                <textarea
                  id="address"
                  rows="3"
                  value={form.address}
                  onChange={set('address')}
                  aria-invalid={Boolean(errors.address)}
                  autoComplete="street-address"
                />
                {errors.address && <span className="field__error">{errors.address}</span>}
              </div>

              <div className="field">
                <label htmlFor="deliveryMethod">روش تحویل</label>
                <select id="deliveryMethod" value={form.deliveryMethod} onChange={set('deliveryMethod')}>
                  {DELIVERY.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field field--full">
                <label htmlFor="note">توضیحات سفارش (اختیاری)</label>
                <textarea
                  id="note"
                  rows="3"
                  value={form.note}
                  onChange={set('note')}
                  placeholder="مثلاً مدل سیستم، کد فنی قطعه فعلی یا زمان مناسب تماس"
                />
              </div>
            </div>

            <div style={{ marginBlockStart: 18 }}>
              <Notice variant="warn" title="پرداخت آنلاین فعال نیست">
                در این نسخه هیچ درگاه پرداختی متصل نشده است. با ثبت این فرم، مبلغی از حساب
                شما کسر نمی‌شود؛ سفارش فقط ثبت می‌شود و هماهنگی پرداخت به‌صورت تلفنی انجام
                می‌گیرد.
              </Notice>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                marginBlockStart: 20,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'در حال ثبت سفارش...' : 'ثبت درخواست سفارش'}
              </button>
              <Link className="btn btn--outline" to="/cart">
                بازگشت به سبد خرید
              </Link>
            </div>
          </form>

          <aside className="summary">
            <h2>خلاصه سفارش</h2>
            {cartDetailed.map((l) => (
              <div className="summary__row" key={l.id}>
                <span>
                  {l.product.name} × {toFa(l.qty)}
                </span>
                <b>{formatPrice(l.lineTotal)}</b>
              </div>
            ))}
            <div className="summary__row">
              <span>هزینه ارسال</span>
              <b>پس از هماهنگی</b>
            </div>
            <div className="summary__row summary__total">
              <span>جمع کالاها</span>
              <b>{formatPrice(subtotal)}</b>
            </div>
            <p className="field__hint" style={{ marginBlockStart: 12 }}>
              هزینه ارسال در این مرحله محاسبه نمی‌شود و پس از هماهنگی اعلام می‌گردد.
            </p>
          </aside>
        </div>
      </div>
    </>
  )
}
