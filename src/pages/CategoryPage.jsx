import { Navigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductListing from '../components/ProductListing'
import Seo from '../components/Seo'
import { getCategory } from '../data/categories'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)

  if (!category) return <Navigate to="/products" replace />

  return (
    <>
      <Seo title={category.name} description={category.description} />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'محصولات', to: '/products' }, { label: category.name }]}
          />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>{category.name}</h1>
            <p>{category.intro}</p>
          </div>
        </div>
      </div>
      <div className="container">
        <ProductListing category={category} />
      </div>
    </>
  )
}
