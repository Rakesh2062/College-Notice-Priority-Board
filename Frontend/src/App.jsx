import { useState, useEffect } from "react";
import {
  getNotices,
  updateReadStatus,
  createNotice,
  updateNotice,
  deleteNotice,
} from "./services/noticeService";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import NoticeList from "./components/NoticeList";
import NoticeModal from "./components/NoticeModal";
import CreateNoticeModal from "./components/CreateNoticeModal";
import AuthModal from "./components/AuthModal";
import "./App.css";

function App() {
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [importantOnly, setImportantOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  
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

  const counts = {
    all: notices.length,
    Academics: notices.filter((n) => n.category === "Academics").length,
    Examination: notices.filter((n) => n.category === "Examination").length,
    Events: notices.filter((n) => n.category === "Events").length,
    General: notices.filter((n) => n.category === "General").length,
    important: notices.filter((n) => n.priority === "High").length,
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      activeCategory === "all" || notice.category === activeCategory;

    const matchesPriority = !importantOnly || notice.priority === "High";

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      notice.title.toLowerCase().includes(query) ||
      notice.description.toLowerCase().includes(query);

    return matchesCategory && matchesPriority && matchesSearch;
  });


  const handleToggleRead = async (id, currentIsRead) => {
    try {
      const updated = await updateReadStatus(id, !currentIsRead);
      setNotices((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
      if (selectedNotice && selectedNotice._id === updated._id) {
        setSelectedNotice(updated);
      }
      setError(null);
    } catch (err) {
      setError("Failed to update notice. Please try again.");
    }
  };

  const handleCreateNotice = async (noticeData) => {
    const created = await createNotice(noticeData);
    setNotices((prev) => [created, ...prev]);
  };

  const handleUpdateNotice = async (id, formData) => {
    const updated = await updateNotice(id, formData);
    setNotices((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
    setSelectedNotice(updated);
  };

  const handleDeleteNotice = async (id) => {
    await deleteNotice(id);
    setNotices((prev) => prev.filter((n) => n._id !== id));
    setSelectedNotice(null); // close the modal
  };

  const handleNavigate = (notice) => {
    setSelectedNotice(notice);
  };

  return (
    <div className="app">
      <Header
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
      <main className="container">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          importantOnly={importantOnly}
          onToggleImportant={() => setImportantOnly((prev) => !prev)}
          counts={counts}
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
            searchQuery={searchQuery}
          />
        )}
      </main>

      {selectedNotice && (
        <NoticeModal
          notice={selectedNotice}
          notices={filteredNotices}
          searchQuery={searchQuery}
          onClose={() => setSelectedNotice(null)}
          onToggleRead={handleToggleRead}
          onNavigate={handleNavigate}
          onUpdate={handleUpdateNotice}
          onDelete={handleDeleteNotice}
        />
      )}

      {isCreateOpen && (
        <CreateNoticeModal
          onClose={() => setIsCreateOpen(false)}
          onCreateNotice={handleCreateNotice}
        />
      )}

      {isAuthOpen && (
        <AuthModal onClose={() => setIsAuthOpen(false)} />
      )}
    </div>
  );
}

export default App;

