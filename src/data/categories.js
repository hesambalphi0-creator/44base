/**
 * Product categories. `filters` lists which technical filter groups are
 * meaningful for that category — irrelevant filters are never rendered.
 */
export const categories = [
  {
    id: 'compressors',
    slug: 'compressors',
    name: 'کمپرسورهای یخچال و فریزر',
    shortName: 'کمپرسورهای برودتی',
    description: 'انواع کمپرسورهای اصلی و سازگار با سیستم‌های برودتی.',
    intro:
      'کمپرسور قلب سیستم برودتی است. در این دسته، کمپرسورهای هرمتیک برندهای معتبر برای کاربردهای خانگی، تجاری و صنعتی ارائه می‌شود.',
    images: [
      '/assets/products/compressor-embraco.svg',
      '/assets/products/compressor-secop.svg',
    ],
    filters: ['brand', 'refrigerant', 'horsepower', 'voltage', 'application'],
  },
  {
    id: 'gases',
    slug: 'gases',
    name: 'گازهای برودتی',
    shortName: 'گازهای برودتی',
    description: 'انواع گازهای مبرد برای کاربردهای مختلف برودتی و سرمایشی.',
    intro:
      'انتخاب مبرد درست، بازدهی و عمر سیستم را تعیین می‌کند. مبردهای رایج بر اساس نوع کاربرد و ظرفیت سیستم دسته‌بندی شده‌اند.',
    images: [
      '/assets/products/gas-r134a.svg',
      '/assets/products/gas-r22.svg',
    ],
    filters: ['brand', 'refrigerant', 'application'],
  },
  {
    id: 'oils',
    slug: 'oils',
    name: 'روغن‌های کمپرسور',
    shortName: 'روغن‌های کمپرسور',
    description: 'روغن‌های تخصصی کمپرسور برای کاربردهای برودتی.',
    intro:
      'روغن کمپرسور باید با مبرد و نوع کمپرسور سازگار باشد. روغن‌های معدنی و پلی‌استر (POE) بر اساس گرید و کاربرد ارائه می‌شوند.',
    images: [
      '/assets/products/oil-emkarate-rl100h.svg',
      '/assets/products/oil-suniso-4gs.svg',
    ],
    filters: ['brand', 'oilType', 'application'],
  },
  {
    id: 'cold-room',
    slug: 'cold-room',
    name: 'تجهیزات سردخانه',
    shortName: 'تجهیزات سردخانه',
    description: 'قطعات کنترلی و تجهیزات تخصصی مورد استفاده در سیستم‌های سردخانه.',
    intro:
      'قطعات کنترلی، فیلتردرایر و شیرآلات مورد استفاده در خطوط سردخانه‌های صنعتی و تجاری.',
    images: [
      '/assets/products/danfoss-pressure-switch.svg',
      '/assets/products/danfoss-filter-drier.svg',
    ],
    filters: ['brand', 'equipmentType', 'application'],
  },
]

export const filterGroups = {
  category: { key: 'category', label: 'دسته‌بندی' },
  brand: { key: 'brand', label: 'برند' },
  refrigerant: { key: 'refrigerant', label: 'سازگاری با مبرد' },
  horsepower: { key: 'horsepower', label: 'توان (اسب بخار)' },
  voltage: { key: 'voltage', label: 'ولتاژ' },
  application: { key: 'application', label: 'کاربرد' },
  oilType: { key: 'oilType', label: 'نوع روغن' },
  equipmentType: { key: 'equipmentType', label: 'نوع تجهیز' },
}

export const getCategory = (slugOrId) =>
  categories.find((c) => c.slug === slugOrId || c.id === slugOrId) || null
