import { Link } from 'react-router-dom'
import ArticlesSection from '../components/ArticlesSection'
import BenefitsStrip from '../components/BenefitsStrip'
import BrandsSection from '../components/BrandsSection'
import CategoryCard from '../components/CategoryCard'
import CtaBanner from '../components/CtaBanner'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Seo from '../components/Seo'
import WhySection from '../components/WhySection'
import { IconArrowForward } from '../components/Icons'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { site } from '../data/site'

export default function Home() {
  // Featured = one representative product per category, so the homepage shows
  // breadth without dumping the whole catalogue.
  const featured = categories
    .map((c) => products.find((p) => p.category === c.id))
    .filter(Boolean)

  return (
    <>
      <Seo
        title="تجهیزات برودتی، کمپرسور، گاز مبرد و روغن کمپرسور"
        description={site.description}
      />
      <Hero />
      <BenefitsStrip />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-label">دسته‌بندی محصولات</span>
            <h2 className="section-title">محصولات تخصصی {site.name}</h2>
            <p className="section-sub">
              مجموعه‌ای از تجهیزات، قطعات و ملزومات برودتی برای مصارف خانگی، تجاری و صنعتی.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>

      <WhySection />

      <section className="section">
        <div className="container">
          <div
            className="section-head"
            style={{
              maxWidth: 'none',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="section-label">محصولات منتخب</span>
              <h2 className="section-title">پرفروش‌ترین‌های برودتی</h2>
              <p className="section-sub">
                یک نمونه منتخب از هر دسته؛ برای مشاهده کامل، وارد صفحه دسته‌بندی شوید.
              </p>
            </div>
            <Link className="btn btn--outline" to="/products">
              همه محصولات
              <IconArrowForward size={16} />
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <BrandsSection />
      <ArticlesSection />
      <CtaBanner />
    </>
  )
}
