const LABELS = {
  in_stock: 'موجود',
  on_request: 'استعلام موجودی',
  unavailable: 'ناموجود',
}

/** Only verified stock states are shown; unknown → "استعلام موجودی". */
export default function StockBadge({ status }) {
  const key = LABELS[status] ? status : 'on_request'
  return (
    <span className={`stock stock--${key}`}>
      <span className="stock__dot" aria-hidden="true" />
      {LABELS[key]}
    </span>
  )
}
