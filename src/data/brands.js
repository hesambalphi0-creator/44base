/**
 * Brand display metadata.
 *
 * Only brands that actually appear in the catalogue are listed here — the brand
 * tiles are derived from the product records, so a brand can never show up
 * without products behind it. No trademark artwork is fabricated: tiles render
 * the wordmark in text form.
 */
export const brandMeta = {
  embraco: { id: 'embraco', name: 'Embraco', fa: 'امبراکو' },
  secop: { id: 'secop', name: 'Secop', fa: 'سکوپ' },
  gmcc: { id: 'gmcc', name: 'GMCC', fa: 'جی‌ام‌سی‌سی' },
  danfoss: { id: 'danfoss', name: 'Danfoss', fa: 'دانفوس' },
  emkarate: { id: 'emkarate', name: 'Emkarate', fa: 'امکارات' },
  suniso: { id: 'suniso', name: 'Suniso', fa: 'سانيسو' },
  season: { id: 'season', name: 'Season', fa: 'سیزن' },
  isceon: { id: 'isceon', name: 'Isceon', fa: 'آیسئون' },
}

export const brandName = (id) => brandMeta[id]?.name || id
export const brandFa = (id) => brandMeta[id]?.fa || brandName(id)
