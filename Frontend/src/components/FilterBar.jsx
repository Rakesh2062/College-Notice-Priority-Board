function FilterBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  importantOnly,
  onToggleImportant,
  counts,
}) {
  const categories = [
    { id: "all", label: "All Notices" },
    { id: "Academics", label: "Academics" },
    { id: "Examination", label: "Examination" },
    { id: "Events", label: "Events" },
    { id: "General", label: "General" },
  ];

  return (
    <div className="filter-panel">
      <div className="search-bar-box">
        <div className="search-input-wrapper">
          <svg
            className="search-input-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input-field"
            placeholder="Search circulars by keyword, department, or content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filter-controls-row">
        <div className="category-chips">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = counts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-chip ${isActive ? "active" : ""}`}
                onClick={() => onCategoryChange(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`important-toggle-chip ${importantOnly ? "active" : ""}`}
          onClick={onToggleImportant}
        >
          <span className="important-indicator">⚠️</span>
          <span>Important Only</span>
          {counts.important !== undefined && (
            <span className="chip-count important-count">{counts.important}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
