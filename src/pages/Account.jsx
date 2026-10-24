import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import { IconPackage, IconUser } from '../components/Icons'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { useStore } from '../context/StoreContext'
import { formatPrice, toFa } from '../lib/format'

/* ------------------------------------------------------------------ shared */

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <>
      <Seo title={title} />
      <div className="container">
        <Breadcrumbs items={[{ label: title }]} />
        <div className="section" style={{ paddingBlockStart: 0 }}>
          <div className="auth-card">
            <h1 style={{ fontSize: 22 }}>{title}</h1>
            <p className="section-sub" style={{ marginBlockEnd: 18 }}>
              {subtitle}
            </p>
            {children}
            {footer}
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- sign in */

export function SignIn() {
  const { signIn } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.email.trim()) next.email = 'ایمیل را وارد کنید.'
    if (!form.password) next.password = 'رمز عبور را وارد کنید.'
    setErrors(next)
    if (Object.keys(next).length) return

    setBusy(true)
    const res = await signIn(form)
    setBusy(false)
    if (!res.ok) setErrors({ form: res.error })
    else navigate('/account')
  }

  return (
    <AuthShell
      title="ورود به حساب کاربری"
      subtitle="برای مشاهده سفارش‌ها و پیگیری خرید وارد شوید."
      footer={
        <p className="field__hint" style={{ marginBlockStart: 16 }}>
          حساب کاربری ندارید؟ <Link className="link-btn" to="/account/register">ثبت‌نام کنید</Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} noValidate>
        {errors.form && (
          <div style={{ marginBlockEnd: 14 }}>
            <Notice variant="error">{errors.form}</Notice>
          </div>
        )}
        <div className="field" style={{ marginBlockEnd: 14 }}>
          <label htmlFor="si-email">ایمیل</label>
          <input
            id="si-email"
            type="email"
            className="ltr"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>
        <div className="field" style={{ marginBlockEnd: 18 }}>
          <label htmlFor="si-pass">رمز عبور</label>
          <input
            id="si-pass"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            aria-invalid={Boolean(errors.password)}
            autoComplete="current-password"
          />
          {errors.password && <span className="field__error">{errors.password}</span>}
        </div>
        <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
          {busy ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </AuthShell>
  )
}

/* --------------------------------------------------------------- register */

export function Register() {
  const { register } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'نام و نام خانوادگی را وارد کنید.'
    if (!form.email.trim()) next.email = 'ایمیل را وارد کنید.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'قالب ایمیل درست نیست.'
    if (form.phone.trim() && !/^0?9\d{9}$/.test(form.phone.trim()))
      next.phone = 'شماره موبایل معتبر نیست.'
    if (!form.password) next.password = 'رمز عبور را وارد کنید.'
    else if (form.password.length < 8) next.password = 'رمز عبور باید حداقل ۸ نویسه باشد.'
    setErrors(next)
    if (Object.keys(next).length) return

    setBusy(true)
    const res = await register(form)
    setBusy(false)
    if (!res.ok) setErrors({ form: res.error })
    else navigate('/account')
  }

  return (
    <AuthShell
      title="ثبت‌نام"
      subtitle="با ساخت حساب، سفارش‌ها و علاقه‌مندی‌های شما قابل پیگیری می‌شود."
      footer={
        <p className="field__hint" style={{ marginBlockStart: 16 }}>
          حساب دارید؟ <Link className="link-btn" to="/account/sign-in">وارد شوید</Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} noValidate>
        {errors.form && (
          <div style={{ marginBlockEnd: 14 }}>
            <Notice variant="error">{errors.form}</Notice>
          </div>
        )}
        <div className="field" style={{ marginBlockEnd: 14 }}>
          <label htmlFor="rg-name">نام و نام خانوادگی</label>
          <input
            id="rg-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>
        <div className="field" style={{ marginBlockEnd: 14 }}>
          <label htmlFor="rg-email">ایمیل</label>
          <input
            id="rg-email"
            type="email"
            className="ltr"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>
        <div className="field" style={{ marginBlockEnd: 14 }}>
          <label htmlFor="rg-phone">شماره موبایل (اختیاری)</label>
          <input
            id="rg-phone"
            className="ltr"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
          />
          {errors.phone && <span className="field__error">{errors.phone}</span>}
        </div>
        <div className="field" style={{ marginBlockEnd: 18 }}>
          <label htmlFor="rg-pass">رمز عبور</label>
          <input
            id="rg-pass"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
          />
          {errors.password ? (
            <span className="field__error">{errors.password}</span>
          ) : (
            <span className="field__hint">حداقل ۸ نویسه.</span>
          )}
        </div>
        <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
          {busy ? 'در حال ایجاد حساب...' : 'ایجاد حساب'}
        </button>
      </form>
    </AuthShell>
  )
}

/* -------------------------------------------------------------- dashboard */

export default function Account() {
  const { user, signOut, orders, wishlist } = useStore()
  const navigate = useNavigate()

  if (!user) {
    return (
      <>
        <Seo title="حساب کاربری" />
        <div className="container section">
          <Breadcrumbs items={[{ label: 'حساب کاربری' }]} />
          <EmptyState
            icon={<IconUser size={34} />}
            title="برای مشاهده حساب وارد شوید"
            text="با ورود به حساب، سفارش‌ها و علاقه‌مندی‌های خود را پیگیری کنید."
            actions={
              <>
                <Link className="btn btn--primary" to="/account/sign-in">
                  ورود
                </Link>
                <Link className="btn btn--outline" to="/account/register">
                  ثبت‌نام
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
      <Seo title="حساب کاربری" />
      <div className="container">
        <Breadcrumbs items={[{ label: 'حساب کاربری' }]} />
        <div style={{ marginBlockEnd: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>سلام {user.name}</h1>
          <p className="section-sub">
            <span className="ltr">{user.email}</span>
            {user.phone && <> — <span className="ltr">{user.phone}</span></>}
          </p>
        </div>

        <div className="cart-layout" style={{ paddingBlockEnd: 64 }}>
          <div>
            <h2 style={{ fontSize: 18, marginBlockEnd: 12 }}>سفارش‌های من</h2>
            {orders.length === 0 ? (
              <EmptyState
                icon={<IconPackage size={30} />}
                title="سفارشی ثبت نشده است"
                text="سفارش‌هایی که با این ایمیل ثبت شوند، اینجا نمایش داده می‌شوند."
                actions={
                  <Link className="btn btn--primary" to="/products">
                    مشاهده محصولات
                  </Link>
                }
              />
            ) : (
              orders.map((o) => (
                <div className="card" key={o.id} style={{ padding: 18, marginBlockEnd: 12 }}>
                  <div className="summary__row">
                    <span>
                      کد سفارش: <span className="ltr">{o.id}</span>
                    </span>
                    <b>{new Date(o.createdAt).toLocaleDateString('fa-IR')}</b>
                  </div>
                  <div className="summary__row">
                    <span>وضعیت</span>
                    <b>{o.status === 'requested' ? 'در انتظار تأیید' : o.status}</b>
                  </div>
                  <div className="summary__row">
                    <span>{toFa(o.items.length)} قلم کالا</span>
                    <b>{formatPrice(o.total)}</b>
                  </div>
                  <Link className="link-btn" to={`/order/${o.id}`}>
                    مشاهده جزئیات سفارش
                  </Link>
                </div>
              ))
            )}
          </div>

          <aside className="summary">
            <h2>خلاصه حساب</h2>
            <div className="summary__row">
              <span>علاقه‌مندی‌ها</span>
              <b>{toFa(wishlist.length)} کالا</b>
            </div>
            <div className="summary__row">
              <span>سفارش‌ها</span>
              <b>{toFa(orders.length)} سفارش</b>
            </div>
            <Link className="btn btn--outline btn--block" to="/wishlist" style={{ marginBlockStart: 12 }}>
              مشاهده علاقه‌مندی‌ها
            </Link>
            <button
              type="button"
              className="btn btn--outline btn--block"
              style={{ marginBlockStart: 10 }}
              onClick={() => {
                signOut()
                navigate('/')
              }}
            >
              خروج از حساب
            </button>
            <div style={{ marginBlockStart: 14 }}>
              <Notice variant="info">
                این حساب در حالت نمایشی و به‌صورت محلی در مرورگر شما ذخیره می‌شود. برای حساب
                کاربری واقعی، اتصال به سرویس احراز هویت سمت سرور لازم است.
              </Notice>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
