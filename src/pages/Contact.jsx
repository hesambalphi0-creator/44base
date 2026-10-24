import { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { IconClock, IconMail, IconPhone, IconPin } from '../components/Icons'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { site } from '../data/site'

/**
 * Contact page. Contact channels render only when the business has supplied
 * them; nothing is invented. The form validates but is explicitly marked as not
 * yet connected to a submission service — it never shows a fake success state.
 */
export default function Contact() {
  const { contact } = site
  const hasChannel = contact.phone || contact.mobile || contact.email || contact.address

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((x) => ({ ...x, [key]: undefined }))
    setResult(null)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'نام خود را وارد کنید.'
    if (!form.phone.trim()) next.phone = 'شماره تماس را وارد کنید.'
    else if (!/^0?9\d{9}$/.test(form.phone.trim())) next.phone = 'شماره موبایل معتبر نیست.'
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = 'قالب ایمیل درست نیست.'
    if (!form.message.trim()) next.message = 'متن پیام را وارد کنید.'
    else if (form.message.trim().length < 10)
      next.message = 'پیام را کامل‌تر بنویسید (حداقل ۱۰ نویسه).'
    setErrors(next)
    if (Object.keys(next).length) return

    // No form-submission service is configured for this project.
    setResult({
      variant: 'warn',
      title: 'فرم تماس به سرویس ارسال متصل نیست',
      body: 'اطلاعات فرم معتبر است، اما هیچ سرویس ارسال ایمیل یا پیام برای این پروژه تنظیم نشده است؛ بنابراین پیام شما ثبت و ارسال نشد. برای ارتباط، از راه‌های تماس فهرست‌شده در همین صفحه استفاده کنید یا سرویس ارسال را برای پروژه فعال کنید.',
    })
  }

  return (
    <>
      <Seo
        title="تماس با ما"
        description={`راه‌های ارتباط با ${site.name} و فرم درخواست مشاوره تخصصی.`}
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'تماس با ما' }]} />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>تماس با ما</h1>
            <p>
              برای مشاوره انتخاب قطعه برودتی، اعلام کد فنی سیستم یا پیگیری سفارش با ما در
              ارتباط باشید.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="cart-layout">
          <form className="card" style={{ padding: 22 }} onSubmit={onSubmit} noValidate>
            <h2 style={{ fontSize: 17, marginBlockEnd: 14 }}>فرم درخواست مشاوره</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="c-name">
                  نام <span className="req">*</span>
                </label>
                <input
                  id="c-name"
                  value={form.name}
                  onChange={set('name')}
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="c-phone">
                  شماره تماس <span className="req">*</span>
                </label>
                <input
                  id="c-phone"
                  className="ltr"
                  inputMode="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  aria-invalid={Boolean(errors.phone)}
                  placeholder="09xxxxxxxxx"
                  autoComplete="tel"
                />
                {errors.phone && <span className="field__error">{errors.phone}</span>}
              </div>
              <div className="field field--full">
                <label htmlFor="c-email">ایمیل (اختیاری)</label>
                <input
                  id="c-email"
                  type="email"
                  className="ltr"
                  value={form.email}
                  onChange={set('email')}
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
              <div className="field field--full">
                <label htmlFor="c-message">
                  متن پیام <span className="req">*</span>
                </label>
                <textarea
                  id="c-message"
                  rows="5"
                  value={form.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(errors.message)}
                  placeholder="مدل سیستم، مبرد و کد فنی قطعه مورد نیاز را بنویسید."
                />
                {errors.message && <span className="field__error">{errors.message}</span>}
              </div>
            </div>

            {result && (
              <div style={{ marginBlockStart: 16 }}>
                <Notice variant={result.variant} title={result.title}>
                  {result.body}
                </Notice>
              </div>
            )}

            <button className="btn btn--primary" type="submit" style={{ marginBlockStart: 18 }}>
              ارسال پیام
            </button>
          </form>

          <aside className="summary">
            <h2>راه‌های ارتباطی</h2>
            {hasChannel ? (
              <ul>
                {contact.phone && (
                  <li className="summary__row">
                    <span>
                      <IconPhone size={16} /> تلفن
                    </span>
                    <b>
                      <a href={`tel:${contact.phone}`} className="ltr">
                        {contact.phone}
                      </a>
                    </b>
                  </li>
                )}
                {contact.mobile && (
                  <li className="summary__row">
                    <span>
                      <IconPhone size={16} /> همراه
                    </span>
                    <b>
                      <a href={`tel:${contact.mobile}`} className="ltr">
                        {contact.mobile}
                      </a>
                    </b>
                  </li>
                )}
                {contact.email && (
                  <li className="summary__row">
                    <span>
                      <IconMail size={16} /> ایمیل
                    </span>
                    <b>
                      <a href={`mailto:${contact.email}`} className="ltr">
                        {contact.email}
                      </a>
                    </b>
                  </li>
                )}
                {contact.address && (
                  <li className="summary__row">
                    <span>
                      <IconPin size={16} /> نشانی
                    </span>
                    <b>{contact.address}</b>
                  </li>
                )}
                {contact.hours && (
                  <li className="summary__row">
                    <span>
                      <IconClock size={16} /> ساعات کاری
                    </span>
                    <b>{contact.hours}</b>
                  </li>
                )}
              </ul>
            ) : (
              <Notice variant="warn" title="اطلاعات تماس ثبت نشده است">
                شماره تلفن، ایمیل و نشانی هنوز در تنظیمات سایت وارد نشده‌اند. این اطلاعات
                باید توسط کسب‌وکار تأیید و ثبت شود تا در سایت نمایش داده شود.
              </Notice>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}
