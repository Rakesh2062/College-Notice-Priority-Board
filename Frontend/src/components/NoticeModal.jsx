import { useEffect } from "react";

function NoticeModal({ notice, onClose, onToggleRead, isPinned, onTogglePin }) {
  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{notice.title}</h2>
          <div className="modal-header-actions">
            <button
              type="button"
              className={`pin-btn modal-pin-btn ${isPinned ? "is-pinned" : ""}`}
              onClick={() => onTogglePin(notice._id)}
              title={isPinned ? "Unpin notice" : "Pin notice to top"}
            >
              {isPinned ? "📌 Pinned" : "📍 Pin"}
            </button>
            <span className={badgeClass}>{notice.priority} Priority</span>
          </div>
        </div>

        <div className="modal-meta">
          <span className="modal-category">{notice.category}</span>
          <span className="modal-date">{formattedDate}</span>
        </div>

        <hr className="modal-divider" />

        <div className="modal-body">
          <p>{notice.description}</p>
        </div>

        <div className="modal-footer">
          <span
            className={`status-label ${notice.isRead ? "status-read" : "status-unread"}`}
          >
            {notice.isRead ? "✓ Read" : "● Unread"}
          </span>
          <button
            className="toggle-btn"
            onClick={() => onToggleRead(notice._id, notice.isRead)}
          >
            {notice.isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoticeModal;
