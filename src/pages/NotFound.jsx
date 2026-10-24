import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Seo from '../components/Seo'
import { IconArrowForward, IconSnow } from '../components/Icons'

export default function NotFound() {
  return (
    <>
      <Seo title="صفحه یافت نشد" />
      <div className="container section">
        <EmptyState
          icon={<IconSnow size={34} />}
          title="این صفحه پیدا نشد"
          text="نشانی وارد‌شده وجود ندارد یا صفحه جابه‌جا شده است. از فهرست محصولات یا جستجو استفاده کنید."
          actions={
            <>
              <Link className="btn btn--primary" to="/">
                صفحه اصلی
              </Link>
              <Link className="btn btn--outline" to="/products">
                مشاهده محصولات
                <IconArrowForward size={16} />
              </Link>
            </>
          }
        />
      </div>
    </>
  )
}
