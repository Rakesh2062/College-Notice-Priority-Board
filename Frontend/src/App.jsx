import { useState, useEffect } from "react";
import { getNotices, updateReadStatus, createNotice } from "./services/noticeService";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NoticeList from "./components/NoticeList";
import NoticeModal from "./components/NoticeModal";
import CreateNoticeModal from "./components/CreateNoticeModal";
import "./App.css";

/**
 * App.jsx — Root component that owns all main state.
 */
function App() {
  const [notices, setNotices] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Fetch notices once when the component mounts.
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();
        setNotices(data);
        setError(null);
      } catch (err) {
        console.error("fetchNotices error:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load notices. Please check if the server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Compute the filtered list on every render.
  const filteredNotices = notices.filter((notice) => {
    if (activeFilter === "important") return notice.priority === "High";
    return true;
  });

  /**
   * Toggle a notice's read/unread status.
   */
  const handleToggleRead = async (id, currentIsRead) => {
    try {
      const updated = await updateReadStatus(id, !currentIsRead);
      setNotices((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n))
      );
      if (selectedNotice && selectedNotice._id === updated._id) {
        setSelectedNotice(updated);
      }
      setError(null);
    } catch (err) {
      setError("Failed to update notice. Please try again.");
    }
  };

  /**
   * Add a newly created notice to state
   */
  const handleCreateNotice = async (noticeData) => {
    const created = await createNotice(noticeData);
    // Prepend to display at the beginning
    setNotices((prev) => [created, ...prev]);
  };

  return (
    <div className="app">
      <Header onOpenCreate={() => setIsCreateOpen(true)} />
      <main className="container">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {loading && (
          <div className="status-message">
            <div className="loader" />
            <p>Loading notices...</p>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <NoticeList
            notices={filteredNotices}
            onSelect={setSelectedNotice}
          />
        )}
      </main>

      {/* Detail modal — rendered when a notice is selected */}
      {selectedNotice && (
        <NoticeModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
          onToggleRead={handleToggleRead}
        />
      )}

      {/* Create notice modal */}
      {isCreateOpen && (
        <CreateNoticeModal
          onClose={() => setIsCreateOpen(false)}
          onCreateNotice={handleCreateNotice}
        />
      )}
    </div>
  );
}

export default App;
