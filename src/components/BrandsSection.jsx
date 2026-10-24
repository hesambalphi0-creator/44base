import { Link } from 'react-router-dom'
import { brandMeta, brandName } from '../data/brands'
import { getByBrand, usedBrands } from '../data/products'

/**
 * Brand tiles render the wordmark as text — no trademark artwork is fabricated.
 * A brand only appears when it actually has products, and each tile links to the
 * filtered listing. No distributor relationship is implied.
 */
export default function BrandsSection() {
  const brands = usedBrands()

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">برندها</span>
          <h2 className="section-title">برندهای موجود در فروشگاه</h2>
          <p className="section-sub">
            فهرست زیر تنها برندهایی را نشان می‌دهد که در حال حاضر کالا در مجموعه دارند.
            های سرما نماینده رسمی این برندها معرفی نمی‌شود.
          </p>
        </div>
        <div className="brand-strip">
          {brands.map((id) => {
            const count = getByBrand(id).length
            return (
              <Link
                className="brand-tile"
                key={id}
                to={`/products?brand=${id}`}
                aria-label={`محصولات برند ${brandName(id)}`}
              >
                <span>
                  <span className="ltr" style={{ fontSize: 15 }}>
                    {brandMeta[id]?.name || id}
                  </span>
                  <span>{brandMeta[id]?.fa}</span>
                </span>
                <span style={{ marginBlockStart: 4 }}>
                  {count} کالا
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
