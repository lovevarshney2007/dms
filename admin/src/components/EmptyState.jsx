export default function EmptyState({ icon: Icon, title, desc, action }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={24} />
        </div>
      )}
      <div className="empty-state-title">{title}</div>
      {desc && <p className="empty-state-desc">{desc}</p>}
      {action}
    </div>
  );
}
