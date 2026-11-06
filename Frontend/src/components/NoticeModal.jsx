import { useEffect, useState } from "react";
import HighlightText from "./HighlightText";
import { useAuth } from "../context/AuthContext";

function NoticeModal({
  notice,
  notices,
  searchQuery = "",
  onClose,
  onToggleRead,
  onNavigate,
  onUpdate,
  onDelete,
}) {
  const { isAdmin } = useAuth();
  const [mode, setMode] = useState("detail");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  const [formData, setFormData] = useState({
    title: notice.title,
    description: notice.description,
    category: notice.category,
    priority: notice.priority,
    date: notice.date ? notice.date.slice(0, 10) : "",
  });

  useEffect(() => {
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      priority: notice.priority,
      date: notice.date ? notice.date.slice(0, 10) : "",
    });
    setMode("detail");
    setActionError("");
  }, [notice._id]);  

  const currentIndex = notices.findIndex((n) => n._id === notice._id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < notices.length - 1;

  const goTo = (index) => {
    setActionError("");
    setMode("detail");
    onNavigate(notices[index]);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (mode !== "detail") {
          setMode("detail");
          setActionError("");
        } else {
          onClose();
        }
      }
      if (mode === "detail") {
        if (e.key === "ArrowLeft" && hasPrev) goTo(currentIndex - 1);
        if (e.key === "ArrowRight" && hasNext) goTo(currentIndex + 1);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [mode, hasPrev, hasNext, currentIndex, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setActionError("Title and description are required.");
      return;
    }
    try {
      setIsSubmitting(true);
      setActionError("");
      await onUpdate(notice._id, formData);
      setMode("detail");
    } catch (err) {
      setActionError(err.response?.data?.message || "Failed to update notice.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      setActionError("");
      await onDelete(notice._id);
    } catch (err) {
      setActionError(err.response?.data?.message || "Failed to delete notice.");
      setMode("detail");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = new Date(notice.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const badgeClass = `badge badge-${notice.priority.toLowerCase()}`;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        className={`modal-nav-btn modal-nav-prev ${!hasPrev ? "nav-hidden" : ""}`}
        onClick={() => hasPrev && goTo(currentIndex - 1)}
        aria-label="Previous notice"
        disabled={!hasPrev}
      >
        ←
      </button>

      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {mode === "detail" && (
          <>
            <div className="modal-header">
              <h2 className="modal-title">
                <HighlightText text={notice.title} highlight={searchQuery} />
              </h2>
              <span className={badgeClass}>{notice.priority} Priority</span>
            </div>

            <div className="modal-meta">
              <span className="modal-category">{notice.category}</span>
              <span className="modal-date">{formattedDate}</span>
            </div>

            <hr className="modal-divider" />

            <div className="modal-body">
              <p>
                <HighlightText text={notice.description} highlight={searchQuery} />
              </p>
            </div>

            <p className="modal-counter">
              {currentIndex + 1} / {notices.length}
            </p>

            <div className="modal-footer">
              <span
                className={`status-label ${notice.isRead ? "status-read" : "status-unread"}`}
              >
                {notice.isRead ? "✓ Read" : "● Unread"}
              </span>

              <div className="modal-actions">
                <button
                  className="toggle-btn"
                  onClick={() => onToggleRead(notice._id, notice.isRead)}
                >
                  {notice.isRead ? "Mark as Unread" : "Mark as Read"}
                </button>
                {isAdmin && (
                  <>
                    <button
                      className="action-btn btn-edit"
                      onClick={() => { setMode("edit"); setActionError(""); }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="action-btn btn-delete"
                      onClick={() => { setMode("confirmDelete"); setActionError(""); }}
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        
        {mode === "edit" && (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Edit Notice</h2>
            </div>
            <p className="modal-intro">Update the details below and save.</p>

            {actionError && <div className="form-error-banner">{actionError}</div>}

            <form onSubmit={handleEditSubmit} className="create-notice-form">
              <div className="form-group">
                <label htmlFor="edit-title">Notice Title *</label>
                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  required
                  maxLength={120}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="edit-category">Category</label>
                  <select
                    id="edit-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Academics">Academics</option>
                    <option value="Examination">Examination</option>
                    <option value="Events">Events</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-priority">Priority</label>
                  <select
                    id="edit-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="edit-date">Date</label>
                  <input
                    id="edit-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-description">Full Description *</label>
                <textarea
                  id="edit-description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => { setMode("detail"); setActionError(""); }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ── CONFIRM DELETE VIEW ── */}
        {mode === "confirmDelete" && (
          <>
            <div className="modal-header">
              <h2 className="modal-title">Delete Notice?</h2>
            </div>

            <div className="modal-body" style={{ marginTop: "16px" }}>
              <p>
                Are you sure you want to permanently delete{" "}
                <strong>"{notice.title}"</strong>? This cannot be undone.
              </p>
            </div>

            {actionError && (
              <div className="form-error-banner" style={{ marginTop: "12px" }}>
                {actionError}
              </div>
            )}

            <div className="modal-footer form-actions" style={{ marginTop: "24px" }}>
              <button
                className="cancel-btn"
                onClick={() => { setMode("detail"); setActionError(""); }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="action-btn btn-delete-confirm"
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </>
        )}
      </div>

      <button
        className={`modal-nav-btn modal-nav-next ${!hasNext ? "nav-hidden" : ""}`}
        onClick={() => hasNext && goTo(currentIndex + 1)}
        aria-label="Next notice"
        disabled={!hasNext}
      >
        →
      </button>
    </div>
  );
}

export default NoticeModal;

