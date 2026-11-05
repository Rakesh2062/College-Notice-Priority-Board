/**
 * NoticeList.jsx
 *
 * Props:
 *   notices  – array of notice objects (already filtered by App)
 *   onSelect – callback passed through to each NoticeCard to open the detail modal
 */
import NoticeCard from "./NoticeCard";

function NoticeList({ notices, onSelect }) {
  if (notices.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📋</span>
        <p>No notices to display.</p>
      </div>
    );
  }

  return (
    <div className="notice-grid">
      {notices.map((notice) => (
        <NoticeCard
          key={notice._id}
          notice={notice}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default NoticeList;
