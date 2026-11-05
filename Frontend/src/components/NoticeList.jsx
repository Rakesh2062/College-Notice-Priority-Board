/**
 * NoticeList.jsx
 *
 * Props:
 *   notices      – array of notice objects (already filtered by App)
 *   onToggleRead – callback passed through to each NoticeCard
 *
 * If the array is empty (e.g., no High-priority notices when "Important" is selected),
 * we show a friendly empty-state message instead of a blank screen.
 */
import NoticeCard from "./NoticeCard";

function NoticeList({ notices, onToggleRead }) {
  if (notices.length === 0) {
    return <p className="empty-state">No notices to display.</p>;
  }

  return (
    <div className="notice-grid">
      {notices.map((notice) => (
        <NoticeCard
          key={notice._id}
          notice={notice}
          onToggleRead={onToggleRead}
        />
      ))}
    </div>
  );
}

export default NoticeList;
