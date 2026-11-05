import { useState, useEffect } from "react";
import { getNotices, updateReadStatus } from "./services/noticeService";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NoticeList from "./components/NoticeList";
import "./App.css";

/**
 * App.jsx — Root component that owns all main state.
 *
 * State:
 *   notices      – the full array of notice objects from the backend
 *   activeFilter – "all" or "important"
 *   loading      – true while the initial fetch is in progress
 *   error        – error message string, or null
 *
 * Data flow:
 *   App fetches data → stores in `notices` → computes `filteredNotices` on render
 *   → passes filtered array down to NoticeList → each NoticeCard can call
 *   onToggleRead back up to App → App patches the backend and updates state.
 */
function App() {
  const [notices, setNotices] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notices once when the component mounts.
  // The empty dependency array [] means this runs only on initial render.
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();
        setNotices(data);
        setError(null);
      } catch (err) {
        setError("Failed to load notices. Please check if the server is running.");
      } finally {
        // Whether success or failure, we're done loading.
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Compute the filtered list on every render — NOT stored in state.
  // When activeFilter is "important", show only High-priority notices.
  // This is a derived value: it's calculated from existing state, not its own state.
  const filteredNotices = notices.filter((notice) => {
    if (activeFilter === "important") return notice.priority === "High";
    return true;
  });

  /**
   * Toggle a notice's read/unread status.
   *
   * 1. Call the backend with the OPPOSITE of the current isRead value.
   * 2. On success, replace that one notice in state with the server's response.
   *    We use .map() to create a new array — React detects the new reference and re-renders.
   * 3. On failure, show an error but leave the existing state unchanged (no optimistic update).
   */
  const handleToggleRead = async (id, currentIsRead) => {
    try {
      const updated = await updateReadStatus(id, !currentIsRead);
      setNotices((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update notice. Please try again.");
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Conditional rendering: show loading, error, or the notice list */}
        {loading && <p className="status-message">Loading notices...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <NoticeList
            notices={filteredNotices}
            onToggleRead={handleToggleRead}
          />
        )}
      </main>
    </div>
  );
}

export default App;
