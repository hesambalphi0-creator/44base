import { toFa } from '../lib/format'
import { IconMinus, IconPlus } from './Icons'

/** Quantity stepper. Buttons are disabled at the bounds instead of failing silently. */
export default function QuantitySelector({ value, onChange, min = 1, max = 99, label = 'تعداد' }) {
  const clamp = (n) => Math.max(min, Math.min(max, n))
  return (
    <div className="qty" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="کاهش تعداد"
      >
        <IconMinus size={16} />
      </button>
      <output aria-live="polite">{toFa(value)}</output>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="افزایش تعداد"
      >
        <IconPlus size={16} />
      </button>
    </div>
  )
}
