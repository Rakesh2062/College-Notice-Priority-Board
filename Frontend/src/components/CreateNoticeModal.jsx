import { useState, useEffect } from "react";

function CreateNoticeModal({ onClose, onCreateNotice }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    priority: "Medium",
    date: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setErrorMsg("Please fill in both title and description.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg("");
      await onCreateNotice(formData);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || "Failed to create notice. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content modal-create">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Create New Notice</h2>
        </div>
        <p className="modal-intro">
          Publish a new announcement to the college priority board.
        </p>

        {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="create-notice-form">
          <div className="form-group">
            <label htmlFor="title">Notice Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g., Semester Exam Registration Deadline"
              value={formData.title}
              onChange={handleChange}
              maxLength={120}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
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
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
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
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Full Description *</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              placeholder="Provide comprehensive details regarding the notice, important dates, and action items..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Notice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNoticeModal;

