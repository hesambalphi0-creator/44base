import { IconBook, IconHeadset, IconLayers, IconPackage, IconWrench } from './Icons'

const ITEMS = [
  {
    icon: <IconLayers size={20} />,
    title: 'تنوع محصولات تخصصی',
    text: 'کمپرسور، مبرد، روغن و تجهیزات کنترلی سردخانه در یک مجموعه.',
  },
  {
    icon: <IconHeadset size={20} />,
    title: 'راهنمایی در انتخاب تجهیزات',
    text: 'انتخاب قطعه بر اساس مبرد، ظرفیت و مشخصات برقی سیستم.',
  },
  {
    icon: <IconPackage size={20} />,
    title: 'دسترسی به برندهای مختلف',
    text: 'چند برند معتبر برای مقایسه و انتخاب متناسب با بودجه.',
  },
  {
    icon: <IconBook size={20} />,
    title: 'اطلاعات فنی محصولات',
    text: 'مشخصات و کد فنی هر کالا به‌صورت ساختاریافته در دسترس است.',
  },
  {
    icon: <IconWrench size={20} />,
    title: 'فرایند سفارش شفاف',
    text: 'ثبت سفارش، پیگیری وضعیت و هماهنگی ارسال به‌صورت روشن.',
  },
]

export default function WhySection() {
  return (
    <section className="section section--surface">
      <div className="container">
        <div className="section-head">
          <span className="section-label">مزیت‌های ما</span>
          <h2 className="section-title">چرا های سرما؟</h2>
          <p className="section-sub">
            تمرکز ما بر انتخاب دقیق قطعه برودتی و ارائه اطلاعات فنی قابل اتکاست، نه فروش
            سریع.
          </p>
        </div>
        <div className="why-grid">
          {ITEMS.map((i) => (
            <div className="why-item" key={i.title}>
              <span className="why-item__icon">{i.icon}</span>
              <div>
                <b>{i.title}</b>
                <p>{i.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
