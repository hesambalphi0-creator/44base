import ProductCard from './ProductCard'
import EmptyState from './EmptyState'
import { IconSearch } from './Icons'

export default function ProductGrid({ products, emptyTitle, emptyText, emptyActions }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<IconSearch size={34} />}
        title={emptyTitle || 'محصولی با این مشخصات یافت نشد'}
        text={
          emptyText ||
          'فیلترها را تغییر دهید یا عبارت جستجو را ساده‌تر کنید. برای انتخاب تخصصی می‌توانید با کارشناسان ما تماس بگیرید.'
        }
        actions={emptyActions}
      />
    )
  }
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
