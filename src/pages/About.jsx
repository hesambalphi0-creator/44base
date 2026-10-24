import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { IconLayers, IconPackage, IconSnow, IconWrench } from '../components/Icons'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { categories } from '../data/categories'
import { site } from '../data/site'

export default function About() {
  return (
    <>
      <Seo
        title="درباره ما"
        description={`معرفی ${site.name} و رویکرد این مجموعه در تأمین تجهیزات برودتی و HVAC-R.`}
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'درباره ما' }]} />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>درباره {site.name}</h1>
            <p>
              {site.name} (<span className="ltr">HI SARMA</span>) در حوزه تأمین تجهیزات برودتی
              و HVAC-R فعالیت می‌کند: گازهای مبرد، کمپرسورهای یخچال و فریزر، روغن‌های کمپرسور و
              تجهیزات سردخانه.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="why-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="why-item">
            <span className="why-item__icon">
              <IconSnow size={20} />
            </span>
            <div>
              <b>حوزه فعالیت</b>
              <p>
                تأمین قطعات و ملزومات سیستم‌های برودتی برای مصارف خانگی، تجاری و صنعتی، با
                تمرکز بر انتخاب تخصصی قطعه بر اساس مشخصات فنی سیستم.
              </p>
            </div>
          </div>
          <div className="why-item">
            <span className="why-item__icon">
              <IconLayers size={20} />
            </span>
            <div>
              <b>تنوع محصولات</b>
              <p>
                چهار گروه اصلی کالا: کمپرسور، مبرد، روغن کمپرسور و تجهیزات کنترلی سردخانه، از
                چند برند معتبر.
              </p>
            </div>
          </div>
          <div className="why-item">
            <span className="why-item__icon">
              <IconWrench size={20} />
            </span>
            <div>
              <b>رویکرد مشاوره‌ای</b>
              <p>
                پیش از فروش، مشخصات سیستم (مبرد، ظرفیت، ولتاژ) بررسی می‌شود تا قطعه مناسب
                انتخاب شود.
              </p>
            </div>
          </div>
          <div className="why-item">
            <span className="why-item__icon">
              <IconPackage size={20} />
            </span>
            <div>
              <b>فرایند سفارش</b>
              <p>
                ثبت سفارش، تأیید موجودی و هماهنگی ارسال به‌صورت شفاف انجام می‌شود.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBlockStart: 28 }}>
          <h2 className="section-title" style={{ fontSize: 20 }}>
            دسته‌بندی محصولات
          </h2>
          <div className="category-grid" style={{ marginBlockStart: 16 }}>
            {categories.map((c) => (
              <Link className="category-card" key={c.id} to={`/category/${c.slug}`}>
                <div className="category-card__media">
                  {c.images.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" />
                  ))}
                </div>
                <h3>{c.name}</h3>
                <p>{c.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginBlockStart: 28 }}>
          <Notice variant="info" title="اطلاعات تکمیلی شرکت">
            تاریخ تأسیس، تعداد کارکنان، نشانی دفتر، گواهی‌نامه‌ها و سابقه همکاری با برندها در
            این صفحه درج نشده است، زیرا این اطلاعات باید توسط کسب‌وکار تأیید و ارائه شود.
            هیچ ادعایی درباره نمایندگی رسمی برندها مطرح نمی‌شود.
          </Notice>
        </div>
      </div>
    </>
  )
}
