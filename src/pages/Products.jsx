import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductListing from '../components/ProductListing'
import Seo from '../components/Seo'
import { products } from '../data/products'

export default function Products() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <>
      <Seo
        title={query ? `جستجو: ${query}` : 'همه محصولات'}
        description="فهرست کامل محصولات های سرما: کمپرسور، گاز مبرد، روغن کمپرسور و تجهیزات سردخانه."
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'محصولات' }]} />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>{query ? `نتایج جستجو برای «${query}»` : 'همه محصولات'}</h1>
            <p>
              {query
                ? 'نتایج بر اساس نام محصول، برند، کد فنی و نوع مبرد فیلتر شده‌اند.'
                : `مجموعه‌ای از ${products.length} کالای برودتی در چهار دسته تخصصی. برای محدودکردن نتایج از فیلترهای فنی استفاده کنید.`}
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <ProductListing query={query} />
      </div>
    </>
  )
}
