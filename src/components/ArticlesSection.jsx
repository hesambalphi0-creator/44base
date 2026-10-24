import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { IconArrowForward, IconBook } from './Icons'

export default function ArticlesSection({ limit = 3 }) {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className="section-head">
          <span className="section-label">راهنمای خرید</span>
          <h2 className="section-title">آموزش و راهنمای انتخاب تجهیزات برودتی</h2>
          <p className="section-sub">
            پیش از خرید، معیارهای فنی انتخاب قطعه برودتی را مرور کنید.
          </p>
        </div>
        <div className="article-grid">
          {articles.slice(0, limit).map((a) => (
            <article className="article-card" key={a.slug}>
              <div className="article-card__media" aria-hidden="true">
                <IconBook size={30} />
              </div>
              <div className="article-card__body">
                <h3>
                  <Link to={`/guides/${a.slug}`}>{a.title}</Link>
                </h3>
                <p>{a.excerpt}</p>
                <div className="article-card__meta">
                  <span>{a.topic}</span>
                  <Link to={`/guides/${a.slug}`} className="link-btn">
                    ادامه مطلب <IconArrowForward size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
