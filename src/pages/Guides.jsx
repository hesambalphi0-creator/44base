import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import { IconArrowForward, IconBook } from '../components/Icons'
import Seo from '../components/Seo'
import { articles, getArticle } from '../data/articles'
import { toFa } from '../lib/format'

export function Guides() {
  return (
    <>
      <Seo
        title="راهنمای خرید"
        description="راهنمای انتخاب کمپرسور، معرفی گازهای مبرد، تفاوت روغن‌های کمپرسور و تجهیزات سردخانه."
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'راهنمای خرید' }]} />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>راهنمای خرید و آموزش</h1>
            <p>
              مجموعه‌ای از راهنماهای کاربردی برای انتخاب درست قطعات برودتی و نگهداری
              سیستم‌های سرمایشی.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="article-grid">
          {articles.map((a) => (
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
                  <span>
                    {a.topic} — {toFa(a.readingMinutes)} دقیقه مطالعه
                  </span>
                  <Link to={`/guides/${a.slug}`} className="link-btn">
                    ادامه <IconArrowForward size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export function ArticleDetail() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) {
    return (
      <div className="container section">
        <EmptyState
          title="این راهنما یافت نشد"
          text="ممکن است نشانی صفحه تغییر کرده باشد."
          actions={
            <Link className="btn btn--primary" to="/guides">
              مشاهده همه راهنماها
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <>
      <Seo title={article.title} description={article.excerpt} />
      <div className="container">
        <Breadcrumbs
          items={[{ label: 'راهنمای خرید', to: '/guides' }, { label: article.title }]}
        />
        <article className="section" style={{ paddingBlockStart: 0, maxWidth: 820 }}>
          <span className="section-label">{article.topic}</span>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>{article.title}</h1>
          <p className="section-sub">
            زمان تقریبی مطالعه: {toFa(article.readingMinutes)} دقیقه
          </p>
          <div className="prose">
            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginBlockStart: 26, flexWrap: 'wrap' }}>
            <Link className="btn btn--primary" to="/products">
              مشاهده محصولات
              <IconArrowForward size={16} />
            </Link>
            <Link className="btn btn--outline" to="/contact">
              مشاوره تخصصی
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}
