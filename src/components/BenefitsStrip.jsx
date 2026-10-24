import { IconHeadset, IconLayers, IconShield, IconTruck } from './Icons'

/**
 * Compact benefits strip directly below the hero.
 * Copy is deliberately factual — no warranty period, delivery time or
 * certification is claimed, because the business has not confirmed them.
 */
const BENEFITS = [
  {
    icon: <IconShield size={21} />,
    title: 'تضمین اصالت کالا',
    text: 'کالاها با کد فنی و مشخصات اعلام‌شده برند ارائه می‌شوند.',
  },
  {
    icon: <IconTruck size={21} />,
    title: 'ارسال به سراسر کشور',
    text: 'هماهنگی ارسال بر اساس مقصد و حجم سفارش انجام می‌شود.',
  },
  {
    icon: <IconHeadset size={21} />,
    title: 'مشاوره تخصصی',
    text: 'راهنمایی در انتخاب قطعه بر اساس مشخصات سیستم شما.',
  },
  {
    icon: <IconLayers size={21} />,
    title: 'تنوع محصولات و برندها',
    text: 'مجموعه‌ای از برندهای معتبر کمپرسور، مبرد و روغن.',
  },
]

export default function BenefitsStrip() {
  return (
    <section className="benefits" aria-label="مزیت‌های خرید">
      <div className="container benefits__grid">
        {BENEFITS.map((b) => (
          <div className="benefit" key={b.title}>
            <span className="benefit__icon">{b.icon}</span>
            <div>
              <b>{b.title}</b>
              <span>{b.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
