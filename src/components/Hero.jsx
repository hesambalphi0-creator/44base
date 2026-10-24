import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { IconArrowForward, IconBook, IconSnow } from './Icons'

/**
 * Hero — dark navy composition with exactly four product subjects:
 * one compressor, one refrigerant cylinder, two compressor-oil containers.
 * Images are the project's own product assets (see /public/assets/products).
 */
const HERO_PRODUCTS = [
  {
    src: '/assets/products/compressor-embraco.svg',
    caption: 'کمپرسور Embraco EMY3118Y',
    alt: 'کمپرسور برودتی Embraco مدل EMY3118Y',
  },
  {
    src: '/assets/products/gas-r134a.svg',
    caption: 'سیلندر گاز مبرد R134a',
    alt: 'سیلندر گاز مبرد R134a',
  },
  {
    src: '/assets/products/oil-emkarate-rl100h.svg',
    caption: 'روغن کمپرسور Emkarate RL 100H',
    alt: 'روغن کمپرسور Emkarate RL 100H',
  },
  {
    src: '/assets/products/oil-suniso-4gs.svg',
    caption: 'روغن کمپرسور Suniso 4GS',
    alt: 'روغن کمپرسور Suniso 4GS',
  },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div>
          <span className="hero__eyebrow">
            <IconSnow size={15} />
            تخصصی‌ترین مرجع تأمین تجهیزات برودتی
          </span>
          <h1>
            تجهیزات برودتی، انتخاب حرفه‌ای
            <br />
            <em>برای سرمایش مطمئن</em>
          </h1>
          <p className="hero__text">{site.description}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/products">
              مشاهده محصولات
              <IconArrowForward size={17} />
            </Link>
            <Link className="btn btn--ghost-light" to="/about">
              <IconBook size={17} />
              درباره {site.name}
            </Link>
          </div>
        </div>

        <div className="hero__media">
          {HERO_PRODUCTS.map((p, i) => (
            <figure
              className="hero__product"
              key={p.src}
              style={{ animationDelay: `${0.08 * i + 0.05}s` }}
            >
              <img src={p.src} alt={p.alt} width="190" height="260" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
          <span className="hero__glow" aria-hidden="true" />
          <span className="hero__reflection" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
