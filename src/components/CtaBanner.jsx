import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { IconArrowForward, IconPhone } from './Icons'

export default function CtaBanner() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-banner">
          <div>
            <h2>برای انتخاب تجهیزات مناسب، همراه شما هستیم</h2>
            <p>
              برای بررسی نیاز پروژه و انتخاب محصولات برودتی مناسب، از راهنمایی تخصصی{' '}
              {site.name} استفاده کنید.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Link className="btn btn--primary" to="/products">
              مشاهده محصولات
              <IconArrowForward size={17} />
            </Link>
            <Link className="btn btn--ghost-light" to="/contact">
              <IconPhone size={17} />
              تماس با ما
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
