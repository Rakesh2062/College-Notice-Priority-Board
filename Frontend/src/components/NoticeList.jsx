import NoticeCard from "./NoticeCard";

function NoticeList({ notices, onSelect, pinnedIds, onTogglePin }) {
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
          isPinned={pinnedIds.includes(notice._id)}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}

export default NoticeList;
