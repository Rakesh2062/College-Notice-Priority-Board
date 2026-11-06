function NoticeCard({ notice, onSelect, isPinned, onTogglePin }) {
  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;
  const cardClass = `notice-card ${notice.isRead ? "read" : "unread"} ${isPinned ? "pinned" : ""}`;

  return (
    <div className={cardClass} onClick={() => onSelect(notice)} role="button" tabIndex={0}>
      <div className="notice-card-header">
        <h3 className="notice-title">{notice.title}</h3>
        <div className="card-actions-top">
          <button
            type="button"
            className={`pin-btn ${isPinned ? "is-pinned" : ""}`}
            title={isPinned ? "Unpin notice" : "Pin notice to top"}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(notice._id);
            }}
          >
            {isPinned ? "📌" : "📍"}
          </button>
          <span className={badgeClass}>{notice.priority}</span>
        </div>
      </div>

      <p className="notice-preview">
        {notice.description.length > 100
          ? notice.description.slice(0, 100) + "…"
          : notice.description}
      </p>

      <div className="notice-meta">
        <span className="notice-category">{notice.category}</span>
        <div className="notice-meta-right">
          {isPinned && <span className="pinned-badge">Pinned</span>}
          <span className={`status-dot ${notice.isRead ? "dot-read" : "dot-unread"}`} />
          <span className="notice-date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default NoticeCard;
