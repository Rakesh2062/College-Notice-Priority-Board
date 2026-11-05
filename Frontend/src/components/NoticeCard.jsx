/**
 * NoticeCard.jsx
 *
 * Props:
 *   notice       – a single notice object { _id, title, description, category, priority, date, isRead }
 *   onToggleRead – callback: onToggleRead(id, currentIsRead) — App handles the API call
 *
 * Visual rules:
 *   - Card root gets class "read" or "unread" based on notice.isRead
 *   - Priority badge gets class like "badge badge-high"
 *   - Date is formatted as "5 Nov 2026" style using en-GB locale
 */
function NoticeCard({ notice, onToggleRead }) {
  // Format the ISO date string into a readable format: "5 Nov 2026"
  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Build the priority badge class: "badge badge-high", "badge badge-medium", etc.
  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;

  // Card root class: "notice-card unread" or "notice-card read"
  const cardClass = `notice-card ${notice.isRead ? "read" : "unread"}`;

  return (
    <div className={cardClass}>
      <div className="notice-card-header">
        <h3 className="notice-title">{notice.title}</h3>
        <span className={badgeClass}>{notice.priority}</span>
      </div>

      <p className="notice-description">{notice.description}</p>

      <div className="notice-meta">
        <span className="notice-category">{notice.category}</span>
        <span className="notice-date">{formattedDate}</span>
      </div>

      <div className="notice-footer">
        <span className={`status-label ${notice.isRead ? "status-read" : "status-unread"}`}>
          {notice.isRead ? "Read" : "Unread"}
        </span>
        <button
          className="toggle-btn"
          onClick={() => onToggleRead(notice._id, notice.isRead)}
        >
          {notice.isRead ? "Mark as Unread" : "Mark as Read"}
        </button>
      </div>
    </div>
  );
}

export default NoticeCard;
