
import HighlightText from "./HighlightText";

function NoticeCard({ notice, onSelect, searchQuery = "" }) {
  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;
  const cardClass = `notice-card ${notice.isRead ? "read" : "unread"}`;

  const previewText =
    notice.description.length > 100
      ? notice.description.slice(0, 100) + "…"
      : notice.description;

  return (
    <div className={cardClass} onClick={() => onSelect(notice)} role="button" tabIndex={0}>
      <div className="notice-card-header">
        <h3 className="notice-title">
          <HighlightText text={notice.title} highlight={searchQuery} />
        </h3>
        <span className={badgeClass}>{notice.priority}</span>
      </div>

      <p className="notice-preview">
        <HighlightText text={previewText} highlight={searchQuery} />
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
