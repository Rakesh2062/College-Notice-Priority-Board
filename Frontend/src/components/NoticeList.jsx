
import NoticeCard from "./NoticeCard";

function NoticeList({ notices, onSelect, searchQuery = "" }) {
  if (notices.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <p>No notices found matching your criteria.</p>
        {searchQuery && (
          <span className="empty-hint">Try adjusting your search terms or clearing filters.</span>
        )}
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
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

export default NoticeList;
