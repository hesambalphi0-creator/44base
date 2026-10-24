export default function EmptyState({ icon, title, text, actions }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {actions && <div className="empty-state__actions">{actions}</div>}
    </div>
  )
}
