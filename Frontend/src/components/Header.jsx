/**
 * Header.jsx
 * App header with branded SVG logo, title, and create notice trigger button.
 */
function Header({ onOpenCreate }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-logo-icon">
            <svg viewBox="0 0 44 44" width="34" height="34" fill="none">
              <rect x="4" y="6" width="36" height="34" rx="7" fill="#1c3a63" stroke="#486e9e" strokeWidth="1.5" />
              <rect x="10" y="14" width="24" height="22" rx="3" fill="#ffffff" />
              <rect x="14" y="20" width="16" height="2.5" rx="1" fill="#0b1f3a" />
              <rect x="14" y="25" width="14" height="2" rx="1" fill="#94a3b8" />
              <rect x="14" y="29" width="10" height="2" rx="1" fill="#cbd5e1" />
              <ellipse cx="22" cy="10" rx="4" ry="2.5" fill="#ff6b6b" />
              <path d="M19.5 10 L21 14 L23 14 L24.5 10 Z" fill="#ee5253" />
            </svg>
          </div>
          <div className="header-text">
            <h1>Campus Notice Priority Board</h1>
            <p className="header-subtitle">Stay notified with priority-based campus announcements</p>
          </div>
        </div>

        <button className="create-notice-btn" onClick={onOpenCreate}>
          <span className="create-btn-icon">+</span>
          <span>New Notice</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
