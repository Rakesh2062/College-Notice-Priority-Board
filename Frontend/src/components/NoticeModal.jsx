import { useEffect } from "react";

/**
 * NoticeModal.jsx — Full-detail overlay that appears when a notice card is clicked.
 *
 * Props:
 *   notice       – the notice object to display
 *   onClose      – callback to close the modal
 *   onToggleRead – callback: onToggleRead(id, currentIsRead)
 */
function NoticeModal({ notice, onClose, onToggleRead }) {
  // Format date
  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close when clicking the backdrop (not the modal content)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{notice.title}</h2>
          <span className={badgeClass}>{notice.priority} Priority</span>
        </div>

        {/* Meta tags row */}
        <div className="modal-meta">
          <span className="modal-category">{notice.category}</span>
          <span className="modal-date">{formattedDate}</span>
        </div>

        {/* Divider */}
        <hr className="modal-divider" />

        {/* Description */}
        <div className="modal-body">
          <p>{notice.description}</p>
        </div>

        {/* Footer */}
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

