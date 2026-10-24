/**
 * Product catalogue — SAMPLE DATA.
 *
 * Every record here is `priceType: 'sample'`. These are clearly-labelled demo
 * records used to make the storefront fully explorable; they are NOT verified
 * business data, live inventory or confirmed pricing.
 *
 * Specifications are limited to the markings that are actually visible on the
 * supplied product assets. No technical value, certification or stock figure is
 * invented — replace this file with the real catalogue (or a database-backed
 * data source) before going live.
 *
 * Facet keys (brand, refrigerant, horsepower, voltage, application, oilType,
 * equipmentType) drive the category filters declared in `categories.js`.
 */

export const products = [
  /* --------------------------------------------------------- compressors */
  {
    id: 'p-embraco-emY3118Y',
    slug: 'compressor-embraco-emY3118Y',
    name: 'کمپرسور برودتی Embraco مدل EMY3118Y',
    sku: 'EMY3118Y',
    model: 'EMY3118Y',
    brand: 'embraco',
    category: 'compressors',
    image: '/assets/products/compressor-embraco.svg',
    gallery: ['/assets/products/compressor-embraco.svg'],
    shortDescription:
      'کمپرسور هرمتیک Embraco برای یخچال و فریزر خانگی، مناسب مبردهای R134a و R600a.',
    description:
      'کمپرسور هرمتیک Embraco سری EMY برای کاربردهای خانگی و نیمه‌تجاری طراحی شده است. این کمپرسور در یخچال و فریزرهای خانگی رایج استفاده می‌شود و انتخاب آن باید بر اساس مبرد، ظرفیت برودتی و مشخصات برقی سیستم انجام شود.',
    price: 5450000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      refrigerant: ['R134a', 'R600a'],
      horsepower: '۱/۴ اسب',
      voltage: '220V',
      application: 'خانگی',
    },
    specs: [
      { label: 'برند', value: 'Embraco', latin: true },
      { label: 'مدل', value: 'EMY3118Y', latin: true },
      { label: 'نوع کمپرسور', value: 'هرمتیک' },
      { label: 'مبرد سازگار', value: 'R134a / R600a', latin: true },
      { label: 'ولتاژ', value: '220V', latin: true },
      { label: 'فرکانس', value: '50Hz', latin: true },
      { label: 'کاربرد', value: 'یخچال و فریزر خانگی' },
    ],
    seo: {
      title: 'کمپرسور Embraco مدل EMY3118Y | های سرما',
      description:
        'کمپرسور هرمتیک Embraco EMY3118Y مناسب یخچال و فریزر خانگی، سازگار با R134a و R600a.',
    },
  },
  {
    id: 'p-secop-sc18g',
    slug: 'compressor-secop-sc18g',
    name: 'کمپرسور برودتی Secop مدل SC18G',
    sku: 'SC18G',
    model: 'SC18G',
    brand: 'secop',
    category: 'compressors',
    image: '/assets/products/compressor-secop.svg',
    gallery: ['/assets/products/compressor-secop.svg'],
    shortDescription:
      'کمپرسور هرمتیک Secop سری SC برای سردکننده‌ها و یخچال‌های تجاری کوچک.',
    description:
      'سری SC شرکت Secop برای سردکننده‌های کوچک، ویترین‌های سرد و یخچال‌های تجاری استفاده می‌شود. تطبیق دقیق کمپرسور با سیستم برودتی نیازمند بررسی همزمان مبرد، ظرفیت و مشخصات برقی است.',
    price: 4180000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      refrigerant: ['R134a', 'R600a'],
      horsepower: '۱/۵ اسب',
      voltage: '220V',
      application: 'خانگی و تجاری',
    },
    specs: [
      { label: 'برند', value: 'Secop', latin: true },
      { label: 'مدل', value: 'SC18G', latin: true },
      { label: 'نوع کمپرسور', value: 'هرمتیک' },
      { label: 'مبرد سازگار', value: 'R134a / R600a', latin: true },
      { label: 'ولتاژ', value: '220V', latin: true },
      { label: 'فرکانس', value: '50Hz', latin: true },
      { label: 'کاربرد', value: 'سردکننده و ویترین سرد' },
    ],
    seo: {
      title: 'کمپرسور Secop مدل SC18G | های سرما',
      description: 'کمپرسور هرمتیک Secop SC18G برای سردکننده و ویترین سرد.',
    },
  },
  {
    id: 'p-gmcc-asg108',
    slug: 'compressor-gmcc-asg108',
    name: 'کمپرسور برودتی GMCC مدل ASG108',
    sku: 'ASG108',
    model: 'ASG108',
    brand: 'gmcc',
    category: 'compressors',
    image: '/assets/products/compressor-gmcc.svg',
    gallery: ['/assets/products/compressor-gmcc.svg'],
    shortDescription:
      'کمپرسور هرمتیک GMCC برای یخچال خانگی و کاربردهای سبک تجاری.',
    description:
      'کمپرسور GMCC سری ASG گزینه‌ای اقتصادی برای یخچال‌های خانگی و کاربردهای سبک تجاری است. پیش از انتخاب، سازگاری مبرد و ظرفیت برودتی سیستم بررسی می‌شود.',
    price: 3250000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      refrigerant: ['R134a', 'R600a'],
      horsepower: '۱/۶ اسب',
      voltage: '220V',
      application: 'خانگی و تجاری',
    },
    specs: [
      { label: 'برند', value: 'GMCC', latin: true },
      { label: 'مدل', value: 'ASG108', latin: true },
      { label: 'نوع کمپرسور', value: 'هرمتیک' },
      { label: 'مبرد سازگار', value: 'R134a / R600a', latin: true },
      { label: 'ولتاژ', value: '220V', latin: true },
      { label: 'کاربرد', value: 'یخچال خانگی' },
    ],
    seo: {
      title: 'کمپرسور GMCC مدل ASG108 | های سرما',
      description: 'کمپرسور هرمتیک GMCC ASG108 برای یخچال خانگی و کاربردهای سبک تجاری.',
    },
  },

  /* -------------------------------------------------------------- gases */
  {
    id: 'p-gas-r134a',
    slug: 'refrigerant-r134a-13-6kg',
    name: 'گاز مبرد R134a — سیلندر ۱۳٫۶ کیلوگرم',
    sku: 'REF-R134A-136',
    model: 'R134a',
    brand: 'isceon',
    category: 'gases',
    image: '/assets/products/gas-r134a.svg',
    gallery: ['/assets/products/gas-r134a.svg'],
    shortDescription: 'مبرد R134a در سیلندر ۱۳٫۶ کیلوگرمی، مناسب سیستم‌های خانگی و تجاری.',
    description:
      'R134a یک مبرد HFC است که در یخچال، فریزر، سردکننده و سیستم‌های تهویه مطبوع خودرو کاربرد دارد. انتخاب مبرد باید بر اساس مشخصات اعلام‌شده سازنده سیستم انجام شود.',
    price: 3900000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      refrigerant: ['R134a'],
      application: 'خانگی و تجاری',
    },
    specs: [
      { label: 'شناسه مبرد', value: 'R134a', latin: true },
      { label: 'وزن خالص', value: '۱۳٫۶ کیلوگرم' },
      { label: 'نوع بسته‌بندی', value: 'سیلندر یک‌بار مصرف' },
      { label: 'برند', value: 'Isceon', latin: true },
      { label: 'گروه مبرد', value: 'HFC' },
    ],
    seo: {
      title: 'گاز مبرد R134a سیلندر ۱۳٫۶ کیلوگرمی | های سرما',
      description: 'خرید گاز مبرد R134a در سیلندر ۱۳٫۶ کیلوگرمی برای کاربردهای خانگی و تجاری.',
    },
  },
  {
    id: 'p-gas-r22',
    slug: 'refrigerant-r22-13-6kg',
    name: 'گاز مبرد R22 — سیلندر ۱۳٫۶ کیلوگرم',
    sku: 'REF-R22-136',
    model: 'R22',
    brand: 'season',
    category: 'gases',
    image: '/assets/products/gas-r22.svg',
    gallery: ['/assets/products/gas-r22.svg'],
    shortDescription: 'مبرد R22 در سیلندر ۱۳٫۶ کیلوگرمی برای سیستم‌های سردخانه‌ای قدیمی‌تر.',
    description:
      'R22 یک مبرد HCFC است که در بسیاری از سیستم‌های سردخانه و چیلر قدیمی‌تر استفاده شده است. برای شارژ سیستم‌های موجود، مشخصات پلاک سیستم ملاک است.',
    price: 2750000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      refrigerant: ['R22'],
      application: 'سردخانه و چیلر',
    },
    specs: [
      { label: 'شناسه مبرد', value: 'R22', latin: true },
      { label: 'وزن خالص', value: '۱۳٫۶ کیلوگرم' },
      { label: 'نوع بسته‌بندی', value: 'سیلندر' },
      { label: 'برند', value: 'Season', latin: true },
      { label: 'گروه مبرد', value: 'HCFC' },
    ],
    seo: {
      title: 'گاز مبرد R22 سیلندر ۱۳٫۶ کیلوگرمی | های سرما',
      description: 'گاز مبرد R22 برای سیستم‌های سردخانه‌ای و چیلر.',
    },
  },
  {
    id: 'p-gas-r410a',
    slug: 'refrigerant-r410a-11-3kg',
    name: 'گاز مبرد R410A — سیلندر ۱۱٫۳ کیلوگرم',
    sku: 'REF-R410A-113',
    model: 'R410A',
    brand: 'season',
    category: 'gases',
    image: '/assets/products/gas-r410a.svg',
    gallery: ['/assets/products/gas-r410a.svg'],
    shortDescription: 'مبرد R410A برای سیستم‌های اسپلیت و چیلر با فشار کاری بالاتر.',
    description:
      'R410A مخلوطی از مبردهای HFC است که در سیستم‌های تهویه مطبوع جدید استفاده می‌شود و فشار کاری بالاتری نسبت به R22 دارد. شارژ آن نیازمند تجهیزات مناسب است.',
    price: 4600000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      refrigerant: ['R410A'],
      application: 'اسپلیت و چیلر',
    },
    specs: [
      { label: 'شناسه مبرد', value: 'R410A', latin: true },
      { label: 'وزن خالص', value: '۱۱٫۳ کیلوگرم' },
      { label: 'نوع بسته‌بندی', value: 'سیلندر' },
      { label: 'برند', value: 'Season', latin: true },
      { label: 'گروه مبرد', value: 'HFC Blend' },
    ],
    seo: {
      title: 'گاز مبرد R410A سیلندر ۱۱٫۳ کیلوگرمی | های سرما',
      description: 'گاز مبرد R410A برای سیستم‌های اسپلیت و چیلر.',
    },
  },

  /* --------------------------------------------------------------- oils */
  {
    id: 'p-oil-emkarate-rl100h',
    slug: 'compressor-oil-emkarate-rl100h',
    name: 'روغن کمپرسور Emkarate RL 100H',
    sku: 'OIL-RL100H',
    model: 'RL 100H',
    brand: 'emkarate',
    category: 'oils',
    image: '/assets/products/oil-emkarate-rl100h.svg',
    gallery: ['/assets/products/oil-emkarate-rl100h.svg'],
    shortDescription: 'روغن پلی‌استر (POE) Emkarate RL 100H برای کمپرسورهای با مبرد HFC.',
    description:
      'Emkarate RL 100H یک روغن پلی‌اول‌استر (POE) است که برای کمپرسورهای هرمتیک با مبردهای HFC مانند R134a و R410A استفاده می‌شود. روغن POE جاذب رطوبت است و باید در بسته‌بندی بسته نگهداری شود.',
    price: 890000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      oilType: 'پلی‌استر (POE)',
      application: 'کمپرسورهای با مبرد HFC',
    },
    specs: [
      { label: 'برند', value: 'Emkarate', latin: true },
      { label: 'گرید', value: 'RL 100H', latin: true },
      { label: 'نوع روغن', value: 'پلی‌اول‌استر (POE)' },
      { label: 'حجم بسته‌بندی', value: '۱ لیتر' },
      { label: 'کاربرد', value: 'کمپرسورهای هرمتیک HFC' },
    ],
    seo: {
      title: 'روغن کمپرسور Emkarate RL 100H | های سرما',
      description: 'روغن پلی‌استر Emkarate RL 100H برای کمپرسورهای با مبرد HFC.',
    },
  },
  {
    id: 'p-oil-suniso-4gs',
    slug: 'compressor-oil-suniso-4gs',
    name: 'روغن کمپرسور Suniso 4GS',
    sku: 'OIL-4GS',
    model: '4GS',
    brand: 'suniso',
    category: 'oils',
    image: '/assets/products/oil-suniso-4gs.svg',
    gallery: ['/assets/products/oil-suniso-4gs.svg'],
    shortDescription: 'روغن معدنی Suniso 4GS برای کمپرسورهای با مبردهای CFC و HCFC.',
    description:
      'Suniso 4GS یک روغن معدنی (ناپتنیک) است که در کمپرسورهای برودتی با مبردهای CFC و HCFC کاربرد دارد. سازگاری روغن با مبرد و نوع کمپرسور باید پیش از تعویض بررسی شود.',
    price: 520000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      oilType: 'معدنی',
      application: 'کمپرسورهای با مبرد CFC/HCFC',
    },
    specs: [
      { label: 'برند', value: 'Suniso', latin: true },
      { label: 'گرید', value: '4GS', latin: true },
      { label: 'نوع روغن', value: 'معدنی (ناپتنیک)' },
      { label: 'حجم بسته‌بندی', value: '۱ لیتر' },
      { label: 'کاربرد', value: 'کمپرسورهای برودتی CFC/HCFC' },
    ],
    seo: {
      title: 'روغن کمپرسور Suniso 4GS | های سرما',
      description: 'روغن معدنی Suniso 4GS برای کمپرسورهای برودتی.',
    },
  },

  /* ----------------------------------------------------------- cold room */
  {
    id: 'p-danfoss-kp',
    slug: 'danfoss-pressure-switch-kp',
    name: 'کلید فشار Danfoss سری KP',
    sku: 'KP-SERIES',
    model: 'KP',
    brand: 'danfoss',
    category: 'cold-room',
    image: '/assets/products/danfoss-pressure-switch.svg',
    gallery: ['/assets/products/danfoss-pressure-switch.svg'],
    shortDescription: 'کلید فشار (پرسوستات) Danfoss سری KP برای کنترل فشار در سیستم برودتی.',
    description:
      'کلیدهای فشار سری KP برای کنترل و حفاظت فشار در سیستم‌های برودتی و تهویه مطبوع استفاده می‌شوند. انتخاب ست‌پوینت و محدوده فشار باید بر اساس مشخصات سیستم انجام شود.',
    price: 1240000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      equipmentType: 'کلید فشار',
      application: 'سردخانه و چیلر',
    },
    specs: [
      { label: 'برند', value: 'Danfoss', latin: true },
      { label: 'سری', value: 'KP', latin: true },
      { label: 'نوع تجهیز', value: 'کلید فشار (پرسوستات)' },
      { label: 'کاربرد', value: 'کنترل و حفاظت فشار سیستم برودتی' },
    ],
    seo: {
      title: 'کلید فشار Danfoss سری KP | های سرما',
      description: 'کلید فشار Danfoss سری KP برای سیستم‌های برودتی و سردخانه.',
    },
  },
  {
    id: 'p-danfoss-dcl165',
    slug: 'danfoss-filter-drier-dcl165',
    name: 'فیلتردرایر Danfoss مدل DCL 165',
    sku: 'DCL165',
    model: 'DCL 165',
    brand: 'danfoss',
    category: 'cold-room',
    image: '/assets/products/danfoss-filter-drier.svg',
    gallery: ['/assets/products/danfoss-filter-drier.svg'],
    shortDescription: 'فیلتردرایر Danfoss DCL 165 برای حذف رطوبت و آلودگی از خط مایع.',
    description:
      'فیلتردرایر DCL 165 در خط مایع سیستم برودتی نصب می‌شود تا رطوبت، اسید و ذرات معلق را حذف کند. اندازه و نوع اتصال باید با لوله‌کشی سیستم تطبیق داده شود.',
    price: 760000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      equipmentType: 'فیلتردرایر',
      application: 'خط مایع',
    },
    specs: [
      { label: 'برند', value: 'Danfoss', latin: true },
      { label: 'مدل', value: 'DCL 165', latin: true },
      { label: 'نوع تجهیز', value: 'فیلتردرایر خط مایع' },
      { label: 'کاربرد', value: 'حذف رطوبت و آلودگی' },
    ],
    seo: {
      title: 'فیلتردرایر Danfoss DCL 165 | های سرما',
      description: 'فیلتردرایر Danfoss DCL 165 برای خط مایع سیستم‌های برودتی.',
    },
  },
  {
    id: 'p-danfoss-valve',
    slug: 'danfoss-refrigeration-valve',
    name: 'شیر برودتی Danfoss (سری SVA / EVR)',
    sku: 'SVA-EVR',
    model: 'SVA / EVR',
    brand: 'danfoss',
    category: 'cold-room',
    image: '/assets/products/danfoss-valve.svg',
    gallery: ['/assets/products/danfoss-valve.svg'],
    shortDescription: 'شیرهای دستی و برقی Danfoss برای خطوط سردخانه‌های صنعتی.',
    description:
      'شیرهای سری SVA (دستی) و EVR (برقی) در خطوط سردخانه صنعتی برای قطع و وصل جریان مبرد استفاده می‌شوند. انتخاب شیر بر اساس قطر لوله، نوع مبرد و فشار کاری انجام می‌شود.',
    price: 1980000,
    salePrice: null,
    priceType: 'sample',
    stockStatus: 'on_request',
    facets: {
      equipmentType: 'شیر برودتی',
      application: 'خطوط سردخانه',
    },
    specs: [
      { label: 'برند', value: 'Danfoss', latin: true },
      { label: 'سری', value: 'SVA / EVR', latin: true },
      { label: 'نوع تجهیز', value: 'شیر برودتی' },
      { label: 'کاربرد', value: 'خطوط سردخانه صنعتی' },
    ],
    seo: {
      title: 'شیر برودتی Danfoss سری SVA و EVR | های سرما',
      description: 'شیرهای برودتی Danfoss برای خطوط سردخانه صنعتی.',
    },
  },
]

/* ------------------------------------------------------------- selectors */

export const getProduct = (slug) => products.find((p) => p.slug === slug) || null

export const getByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId)

export const getByBrand = (brandId) => products.filter((p) => p.brand === brandId)

/** Brands that actually have products, in a stable display order. */
export const usedBrands = () => {
  const seen = []
  for (const p of products) if (!seen.includes(p.brand)) seen.push(p.brand)
  return seen
}

export const relatedProducts = (product, limit = 3) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.brand === product.brand))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, limit)

/** Distinct values for one facet key inside a category (empty values dropped). */
export const facetValues = (categoryId, facetKey) => {
  const set = new Set()
  for (const p of getByCategory(categoryId)) {
    if (facetKey === 'brand') {
      set.add(p.brand)
      continue
    }
    const v = p.facets?.[facetKey]
    if (Array.isArray(v)) v.forEach((x) => set.add(x))
    else if (v) set.add(v)
  }
  return [...set]
}

/** Free-text search across the identifiers a technician would actually use. */
export const searchProducts = (query, limit = 8) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products
    .filter((p) =>
      [
        p.name,
        p.sku,
        p.model,
        p.shortDescription,
        p.brand,
        ...(p.facets?.refrigerant || []),
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    )
    .slice(0, limit)
}
