import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import { IconHeart } from '../components/Icons'
import ProductGrid from '../components/ProductGrid'
import Seo from '../components/Seo'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <Seo title="علاقه‌مندی‌ها" />
      <div className="container">
        <Breadcrumbs items={[{ label: 'علاقه‌مندی‌ها' }]} />
        <div style={{ marginBlockEnd: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>علاقه‌مندی‌ها</h1>
          <p className="section-sub">
            فهرست علاقه‌مندی‌ها در همین مرورگر ذخیره می‌شود و پس از ورود به حساب، در دسترس
            خواهد بود.
          </p>
        </div>

        <div style={{ paddingBlockEnd: 64 }}>
          {items.length === 0 ? (
            <EmptyState
              icon={<IconHeart size={34} />}
              title="فهرست علاقه‌مندی‌ها خالی است"
              text="با زدن آیکن قلب روی هر کالا، آن را برای بررسی بعدی ذخیره کنید."
              actions={
                <Link className="btn btn--primary" to="/products">
                  مشاهده محصولات
                </Link>
              }
            />
          ) : (
            <ProductGrid products={items} />
          )}
        </div>
      </div>
    </>
  )
}
