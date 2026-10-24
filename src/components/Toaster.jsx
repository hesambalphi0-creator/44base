import { useStore } from '../context/StoreContext'
import { IconCheck, IconInfo } from './Icons'

export default function Toaster() {
  const { toasts } = useStore()
  if (toasts.length === 0) return null
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <IconCheck size={17} />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}

/** Reusable inline notice. */
export function Notice({ variant = 'info', children, title }) {
  return (
    <div className={`notice notice--${variant}`}>
      <IconInfo size={17} />
      <div>
        {title && <b style={{ display: 'block' }}>{title}</b>}
        <div>{children}</div>
      </div>
    </div>
  )
}
