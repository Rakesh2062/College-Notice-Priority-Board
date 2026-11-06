import { useState, useEffect, useMemo } from "react";
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
import EmergencyTicker from "./components/EmergencyTicker";
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
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      const stored = localStorage.getItem("pinned_notice_ids");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pinned_notice_ids", JSON.stringify(pinnedIds));
    } catch (e) {
      console.error(e);
    }
  }, [pinnedIds]);

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

  const urgentNotice = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const unreadHighNotices = notices.filter(
      (n) => n.priority === "High" && !n.isRead
    );

    if (unreadHighNotices.length === 0) {
      return null;
    }

    const upcomingOrToday = unreadHighNotices.filter((n) => {
      const noticeDate = new Date(n.date);
      noticeDate.setHours(0, 0, 0, 0);
      return noticeDate >= today;
    });

    if (upcomingOrToday.length > 0) {
      return upcomingOrToday.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    }

    return unreadHighNotices.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  }, [notices]);

  const togglePin = (id) => {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  };

  const counts = useMemo(() => {
    const countMap = {
      all: notices.length,
      Academics: 0,
      Examination: 0,
      Events: 0,
      General: 0,
      important: 0,
    };

    notices.forEach((n) => {
      if (countMap[n.category] !== undefined) {
        countMap[n.category] += 1;
      }
      if (n.priority === "High") {
        countMap.important += 1;
      }
    });

    return countMap;
  }, [notices]);

  const filteredNotices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = notices.filter((notice) => {
      if (activeCategory !== "all" && notice.category !== activeCategory) {
        return false;
      }
      if (importantOnly && notice.priority !== "High") {
        return false;
      }
      if (query) {
        const matchTitle = notice.title?.toLowerCase().includes(query);
        const matchDesc = notice.description?.toLowerCase().includes(query);
        const matchCat = notice.category?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCat) {
          return false;
        }
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      const aPinned = pinnedIds.includes(a._id);
      const bPinned = pinnedIds.includes(b._id);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return new Date(b.date) - new Date(a.date);
    });
  }, [notices, activeCategory, importantOnly, searchQuery, pinnedIds]);

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
    } catch {
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
    setSelectedNotice(null);
  };

  const handleNavigate = (notice) => {
    setSelectedNotice(notice);
  };

  return (
    <div className="app">
      <EmergencyTicker
        notice={urgentNotice}
        onSelectNotice={setSelectedNotice}
      />
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
            pinnedIds={pinnedIds}
            onTogglePin={togglePin}
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
          isPinned={pinnedIds.includes(selectedNotice._id)}
          onTogglePin={togglePin}
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
