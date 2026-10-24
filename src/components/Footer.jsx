import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { articles } from '../data/articles'
import { site } from '../data/site'
import { IconMail, IconPhone, IconPin } from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()
  const { contact, policies, social } = site
  const hasContact = contact.phone || contact.email || contact.address

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <img src="/assets/logo-hi-sarma.svg" alt={`نشان ${site.name}`} />
              <span>
                <b className="ltr">HI SARMA</b>
                <span>{site.name} — {site.tagline}</span>
              </span>
            </div>
            <p>{site.description}</p>
          </div>

          <nav aria-label="دسته‌بندی محصولات">
            <h3>دسته‌بندی محصولات</h3>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/products">همه محصولات</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="راهنمای خرید">
            <h3>راهنمای خرید</h3>
            <ul>
              {articles.slice(0, 4).map((a) => (
                <li key={a.slug}>
                  <Link to={`/guides/${a.slug}`}>{a.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/guides">همه راهنماها</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="دسترسی سریع">
            <h3>دسترسی سریع</h3>
            <ul>
              <li>
                <Link to="/about">درباره ما</Link>
              </li>
              <li>
                <Link to="/contact">تماس با ما</Link>
              </li>
              <li>
                <Link to="/brands">برندها</Link>
              </li>
              <li>
                <Link to="/compatibility">تطبیق کمپرسور</Link>
              </li>
              <li>
                <Link to="/account">حساب کاربری</Link>
              </li>
            </ul>

            <h3 style={{ marginBlockStart: '18px' }}>تماس</h3>
            {hasContact ? (
              <ul>
                {contact.phone && (
                  <li>
                    <a href={`tel:${contact.phone}`}>
                      <IconPhone size={15} /> <span className="ltr">{contact.phone}</span>
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`}>
                      <IconMail size={15} /> <span className="ltr">{contact.email}</span>
                    </a>
                  </li>
                )}
                {contact.address && (
                  <li>
                    <IconPin size={15} /> {contact.address}
                  </li>
                )}
              </ul>
            ) : (
              <p style={{ opacity: 0.7 }}>
                اطلاعات تماس هنوز در تنظیمات سایت ثبت نشده است.
              </p>
            )}

            {social.length > 0 && (
              <ul>
                {social.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener noreferrer" target="_blank">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>

        <p className="footer__note">
          این نسخه از فروشگاه با <b>داده نمونه</b> کار می‌کند: قیمت‌ها، موجودی و مشخصات
          فنی، داده‌های نمایشی هستند و پیش از فروش واقعی باید با اطلاعات تأییدشده کسب‌وکار
          جایگزین شوند. پرداخت آنلاین نیز فعال نشده است.
        </p>

        <div className="footer__bottom">
          <span>
            © {year} {site.name} (<span className="ltr">HI SARMA</span>) — کلیه حقوق محفوظ
            است.
          </span>
          <span>
            {policies.privacy && <Link to={policies.privacy}>حریم خصوصی</Link>}
            {policies.terms && <Link to={policies.terms}>قوانین و مقررات</Link>}
            {policies.shipping && <Link to={policies.shipping}>ارسال و مرجوعی</Link>}
            {!policies.privacy && !policies.terms && !policies.shipping && (
              <span style={{ opacity: 0.7 }}>
                صفحات حقوقی پس از تأیید کسب‌وکار منتشر می‌شود.
              </span>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}
