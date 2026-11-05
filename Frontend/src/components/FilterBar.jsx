/**
 * FilterBar.jsx
 *
 * Props:
 *   activeFilter  – "all" or "important" (owned by App)
 *   onFilterChange – callback that App passes down; called with the new filter value
 *
 * The active button gets the CSS class "active" for visual highlighting.
 * Clicking a button doesn't fetch new data — it just updates App's state,
 * which causes App to re-compute the filtered list on the next render.
 */
function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
        onClick={() => onFilterChange("all")}
      >
        All Notices
      </button>
      <button
        className={`filter-btn ${activeFilter === "important" ? "active" : ""}`}
        onClick={() => onFilterChange("important")}
      >
        Important
      </button>
    </div>
  );
}

export default FilterBar;
