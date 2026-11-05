/**
 * NoticeCard.jsx — Compact card showing title, priority, category, and date.
 * Clicking the card opens the detail modal (handled by App via onSelect).
 *
 * Props:
 *   notice   – a single notice object
 *   onSelect – callback: onSelect(notice) — tells App which notice to show in the modal
 */
function NoticeCard({ notice, onSelect }) {
  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;
  const cardClass = `notice-card ${notice.isRead ? "read" : "unread"}`;

  return (
    <div className={cardClass} onClick={() => onSelect(notice)} role="button" tabIndex={0}>
      <div className="notice-card-header">
        <h3 className="notice-title">{notice.title}</h3>
        <span className={badgeClass}>{notice.priority}</span>
      </div>

      <p className="notice-preview">
        {notice.description.length > 100
          ? notice.description.slice(0, 100) + "…"
          : notice.description}
      </p>

      <div className="notice-meta">
        <span className="notice-category">{notice.category}</span>
        <div className="notice-meta-right">
          <span
            className={`status-dot ${notice.isRead ? "dot-read" : "dot-unread"}`}
          />
          <span className="notice-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;
