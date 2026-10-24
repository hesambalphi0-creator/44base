import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { Notice } from '../components/Toaster'
import Seo from '../components/Seo'
import { brandMeta, brandName } from '../data/brands'
import { getByBrand, usedBrands } from '../data/products'
import { toFa } from '../lib/format'

export default function Brands() {
  const brands = usedBrands()

  return (
    <>
      <Seo
        title="برندها"
        description="برندهای موجود در فروشگاه های سرما: کمپرسور، مبرد، روغن کمپرسور و تجهیزات سردخانه."
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'برندها' }]} />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>برندها</h1>
            <p>
              تنها برندهایی که در حال حاضر کالا در مجموعه دارند در این صفحه نمایش داده
              می‌شوند و هر برند به فهرست محصولات همان برند متصل است.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="brand-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {brands.map((id) => {
            const items = getByBrand(id)
            return (
              <Link className="brand-tile" key={id} to={`/products?brand=${id}`}>
                <span>
                  <span className="ltr" style={{ fontSize: 16 }}>
                    {brandMeta[id]?.name || id}
                  </span>
                  <span>{brandMeta[id]?.fa}</span>
                  <span>{toFa(items.length)} کالا</span>
                </span>
              </Link>
            )
          })}
        </div>

        <div style={{ marginBlockStart: 26 }}>
          <h2 className="section-title" style={{ fontSize: 20 }}>
            محصولات به تفکیک برند
          </h2>
          {brands.map((id) => (
            <div key={id} style={{ marginBlockStart: 18 }}>
              <h3 style={{ fontSize: 16, marginBlockEnd: 8 }}>{brandName(id)}</h3>
              <ul>
                {getByBrand(id).map((p) => (
                  <li key={p.id} className="summary__row">
                    <Link to={`/product/${p.slug}`} className="link-btn">
                      {p.name}
                    </Link>
                    <span className="ltr field__hint">{p.sku}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginBlockStart: 26 }}>
          <Notice variant="info" title="درباره نشان‌های تجاری">
            نشان‌های تجاری برندها به‌صورت متنی نمایش داده می‌شوند و هیچ لوگوی ساختگی یا
            تغییریافته‌ای در سایت استفاده نشده است. های سرما نماینده رسمی این برندها معرفی
            نمی‌شود.
          </Notice>
        </div>
      </div>
    </>
  )
}
