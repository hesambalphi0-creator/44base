import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import EmptyState from '../components/EmptyState'
import { IconAlert, IconArrowForward, IconCheck, IconInfo, IconSearch } from '../components/Icons'
import Price from '../components/Price'
import Seo from '../components/Seo'
import { Notice } from '../components/Toaster'
import { brandName } from '../data/brands'
import { getByCategory, getProduct } from '../data/products'
import { toFa } from '../lib/format'

/**
 * Compatibility-oriented compressor selection.
 *
 * Matching rules are explicit and structured (see `evaluate`), and the result is
 * always presented as a *candidate list*, never as a confirmed compatibility
 * verdict: matching refrigerant and capacity alone does not guarantee that a
 * compressor fits a given system.
 */

const CRITERIA = [
  { key: 'refrigerant', label: 'مبرد سیستم', facet: 'refrigerant' },
  { key: 'voltage', label: 'ولتاژ', facet: 'voltage' },
  { key: 'horsepower', label: 'توان کمپرسور', facet: 'horsepower' },
  { key: 'application', label: 'کاربرد', facet: 'application' },
  { key: 'brand', label: 'برند', facet: 'brand' },
]

const distinct = (list, facet) => {
  const set = new Set()
  list.forEach((p) => {
    if (facet === 'brand') return set.add(p.brand)
    const v = p.facets?.[facet]
    if (Array.isArray(v)) v.forEach((x) => set.add(x))
    else if (v) set.add(v)
  })
  return [...set]
}

/** Returns 'match' | 'mismatch' | 'unknown' per criterion, with a reason. */
function evaluate(product, selection) {
  const results = []
  for (const c of CRITERIA) {
    const wanted = selection[c.key]
    if (!wanted) continue

    if (c.key === 'brand') {
      results.push(
        product.brand === wanted
          ? { key: c.key, label: c.label, status: 'match', reason: `برند ${brandName(wanted)}` }
          : { key: c.key, label: c.label, status: 'mismatch', reason: `برند متفاوت` }
      )
      continue
    }

    const value = product.facets?.[c.key]

    if (c.key === 'refrigerant') {
      const ok = Array.isArray(value) && value.includes(wanted)
      results.push({
        key: c.key,
        label: c.label,
        status: ok ? 'match' : 'mismatch',
        reason: ok ? `سازگار با ${wanted}` : `برای ${wanted} اعلام نشده است`,
      })
      continue
    }

    if (c.key === 'voltage') {
      results.push({
        key: c.key,
        label: c.label,
        status: value === wanted ? 'match' : 'mismatch',
        reason: value === wanted ? `ولتاژ ${wanted}` : `ولتاژ ${value || 'نامشخص'}`,
      })
      continue
    }

    // Capacity and application need data beyond the visible marking, so a
    // non-matching value is reported as "cannot verify" rather than a refusal.
    if (value && String(value).includes(wanted)) {
      results.push({ key: c.key, label: c.label, status: 'match', reason: String(value) })
    } else {
      results.push({
        key: c.key,
        label: c.label,
        status: 'unknown',
        reason: value ? `مقدار ثبت‌شده: ${value}` : 'اطلاعات کافی ثبت نشده است',
      })
    }
  }
  return results
}

const verdict = (results) => {
  if (results.some((r) => r.status === 'mismatch'))
    return { tone: 'mismatch', text: 'با معیارهای انتخابی هم‌خوان نیست' }
  if (results.some((r) => r.status === 'unknown'))
    return { tone: 'unknown', text: 'نیازمند بررسی تکمیلی' }
  return { tone: 'match', text: 'در محدوده معیارهای انتخابی' }
}

export default function Compatibility() {
  const [searchParams] = useSearchParams()
  const preset = getProduct(searchParams.get('product'))
  const compressors = useMemo(() => getByCategory('compressors'), [])

  const [selection, setSelection] = useState(() =>
    preset
      ? {
          refrigerant: preset.facets?.refrigerant?.[0] || '',
          voltage: preset.facets?.voltage || '',
          horsepower: '',
          application: '',
          brand: '',
        }
      : { refrigerant: '', voltage: '', horsepower: '', application: '', brand: '' }
  )
  const [submitted, setSubmitted] = useState(Boolean(preset))

  const options = useMemo(
    () =>
      Object.fromEntries(
        CRITERIA.map((c) => [c.key, distinct(compressors, c.facet)])
      ),
    [compressors]
  )

  const hasSelection = Object.values(selection).some(Boolean)

  const evaluated = useMemo(
    () =>
      compressors
        .map((p) => {
          const results = evaluate(p, selection)
          return { product: p, results, verdict: verdict(results) }
        })
        .filter((r) => r.results.length > 0)
        .sort((a, b) => {
          const score = (r) => r.results.filter((x) => x.status === 'match').length
          return score(b) - score(a)
        }),
    [compressors, selection]
  )

  const set = (key) => (e) => {
    setSelection((s) => ({ ...s, [key]: e.target.value }))
    setSubmitted(false)
  }

  return (
    <>
      <Seo
        title="تطبیق کمپرسور با سیستم"
        description="انتخاب کمپرسور بر اساس مبرد، ولتاژ، توان، کاربرد و برند، با نمایش شفاف معیارهای منطبق و نامشخص."
      />
      <div className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'تطبیق کمپرسور با سیستم' }]} />
          <div style={{ paddingBlockEnd: 26 }}>
            <h1>تطبیق کمپرسور با سیستم</h1>
            <p>
              معیارهای سیستم خود را انتخاب کنید تا کمپرسورهای کاندید بر اساس داده‌های فنی
              ثبت‌شده فهرست شوند. این ابزار یک پیشنهاد اولیه است، نه تأیید نهایی سازگاری.
            </p>
          </div>
        </div>
      </div>

      <div className="container section">
        <Notice variant="warn" title="سازگاری تضمین‌شده نیست">
          تطبیق مبرد و توان به‌تنهایی سازگاری کمپرسور با سیستم را تضمین نمی‌کند. ظرفیت برودتی
          در نقطه کار، نوع روغن، ابعاد، نوع اتصالات و مشخصات راه‌انداز نیز باید بررسی شوند.
          در مواردی که داده کافی ثبت نشده باشد، نتیجه «نیازمند بررسی تکمیلی» نمایش داده
          می‌شود.
        </Notice>

        {preset && (
          <p className="field__hint" style={{ marginBlockStart: 12 }}>
            معیارها بر اساس کالای <b>{preset.name}</b> پیش‌فرض شده‌اند.
          </p>
        )}

        <div className="card" style={{ padding: 22, marginBlockStart: 20 }}>
          <div className="form-grid">
            {CRITERIA.map((c) => (
              <div className="field" key={c.key}>
                <label htmlFor={`cmp-${c.key}`}>{c.label}</label>
                <select id={`cmp-${c.key}`} value={selection[c.key]} onChange={set(c.key)}>
                  <option value="">انتخاب کنید…</option>
                  {options[c.key].map((v) => (
                    <option key={v} value={v}>
                      {c.key === 'brand' ? brandName(v) : v}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, marginBlockStart: 18, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--primary"
              disabled={!hasSelection}
              onClick={() => setSubmitted(true)}
            >
              <IconSearch size={16} />
              نمایش کمپرسورهای کاندید
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => {
                setSelection({
                  refrigerant: '',
                  voltage: '',
                  horsepower: '',
                  application: '',
                  brand: '',
                })
                setSubmitted(false)
              }}
            >
              پاک کردن معیارها
            </button>
          </div>
        </div>

        <div style={{ marginBlockStart: 26 }}>
          {!hasSelection ? (
            <EmptyState
              icon={<IconInfo size={30} />}
              title="معیارهای سیستم را انتخاب کنید"
              text="حداقل یکی از معیارهای فنی را انتخاب کنید تا کمپرسورهای کاندید فهرست شوند."
            />
          ) : !submitted ? (
            <EmptyState
              icon={<IconSearch size={30} />}
              title="برای مشاهده نتیجه، دکمه نمایش را بزنید"
              text="با زدن دکمه، کمپرسورها بر اساس معیارهای انتخابی ارزیابی و مرتب می‌شوند."
            />
          ) : evaluated.length === 0 ? (
            <EmptyState
              icon={<IconSearch size={30} />}
              title="کمپرسوری با این معیارها ثبت نشده است"
              text="معیارها را تغییر دهید یا برای بررسی دستی با کارشناسان تماس بگیرید."
            />
          ) : (
            <>
              <p className="listing__count" style={{ marginBlockEnd: 12 }}>
                {toFa(evaluated.length)} کمپرسور ارزیابی شد.
              </p>
              {evaluated.map(({ product, results, verdict: v }) => (
                <div className="card" key={product.id} style={{ padding: 18, marginBlockEnd: 14 }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    }}
                  >
                    <img
                      src={product.image}
                      alt=""
                      width="84"
                      height="84"
                      loading="lazy"
                      style={{ objectFit: 'contain' }}
                    />
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <Link to={`/product/${product.slug}`} style={{ fontWeight: 700 }}>
                        {product.name}
                      </Link>
                      <div className="field__hint ltr">
                        {product.sku} — {brandName(product.brand)}
                      </div>
                      <ul style={{ marginBlockStart: 10 }}>
                        {results.map((r) => (
                          <li
                            key={r.key}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              fontSize: 13.5,
                              paddingBlock: 3,
                            }}
                          >
                            {r.status === 'match' && (
                              <span style={{ color: '#1aa06d' }}>
                                <IconCheck size={15} />
                              </span>
                            )}
                            {r.status === 'mismatch' && (
                              <span style={{ color: '#c0392b' }}>
                                <IconAlert size={15} />
                              </span>
                            )}
                            {r.status === 'unknown' && (
                              <span style={{ color: '#e0a300' }}>
                                <IconInfo size={15} />
                              </span>
                            )}
                            <span>
                              <b>{r.label}:</b> {r.reason}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ textAlign: 'end', minWidth: 150 }}>
                      <span
                        className="stock"
                        style={{
                          color:
                            v.tone === 'match'
                              ? '#1aa06d'
                              : v.tone === 'mismatch'
                              ? '#c0392b'
                              : '#b38000',
                          fontWeight: 600,
                        }}
                      >
                        {v.text}
                      </span>
                      <div style={{ marginBlockStart: 8 }}>
                        <Price product={product} />
                      </div>
                      <Link
                        className="link-btn"
                        to={`/product/${product.slug}`}
                        style={{ marginBlockStart: 8, display: 'inline-flex', gap: 6 }}
                      >
                        مشاهده کالا <IconArrowForward size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
