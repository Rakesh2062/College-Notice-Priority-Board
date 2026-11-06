
const CATEGORIES = ["all", "Academics", "Examination", "Events", "General"];

function FilterBar({
  searchQuery = "",
  onSearchChange,
  activeCategory = "all",
  onCategoryChange,
  importantOnly = false,
  onToggleImportant,
  counts = {},
}) {
  return (
    <div className="filter-bar-container">
      {/* ── LIVE SEARCH BAR ── */}
      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search notices by title, keyword, or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            title="Clear search"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-toolbar-bottom">
        <div className="category-filters">
          {CATEGORIES.map((cat) => {
            const label = cat === "all" ? "All Notices" : cat;
            const count = counts[cat] ?? 0;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                className={`filter-btn ${isActive ? "active" : ""}`}
                onClick={() => onCategoryChange(cat)}
              >
                <span>{label}</span>
                <span className="filter-count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          className={`filter-btn important-btn ${importantOnly ? "active" : ""}`}
          onClick={onToggleImportant}
        >
          <span>High Priority Only</span>
          {counts.important !== undefined && (
            <span className="filter-count-badge important-badge">{counts.important}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
