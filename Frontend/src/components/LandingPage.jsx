import { useState } from "react";
import AuthModal from "./AuthModal";

function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [initialRegister, setInitialRegister] = useState(false);

  const openSignIn = () => {
    setInitialRegister(false);
    setIsAuthOpen(true);
  };

  const openRegister = () => {
    setInitialRegister(true);
    setIsAuthOpen(true);
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-brand">
            <div className="landing-logo-icon">
              <svg viewBox="0 0 44 44" width="32" height="32" fill="none">
                <rect x="4" y="6" width="36" height="34" rx="7" fill="#1c3a63" stroke="#486e9e" strokeWidth="1.5" />
                <rect x="10" y="14" width="24" height="22" rx="3" fill="#ffffff" />
                <rect x="14" y="20" width="16" height="2.5" rx="1" fill="#0b1f3a" />
                <rect x="14" y="25" width="14" height="2" rx="1" fill="#94a3b8" />
                <rect x="14" y="29" width="10" height="2" rx="1" fill="#cbd5e1" />
                <ellipse cx="22" cy="10" rx="4" ry="2.5" fill="#ff6b6b" />
                <path d="M19.5 10 L21 14 L23 14 L24.5 10 Z" fill="#ee5253" />
              </svg>
            </div>
            <span className="landing-brand-title">Campus Priority Board</span>
          </div>
          <div className="landing-nav-actions">
            <button className="landing-nav-btn secondary" onClick={openSignIn}>
              Sign In
            </button>
            <button className="landing-nav-btn primary" onClick={openRegister}>
              Create Account
            </button>
          </div>
        </div>
      </nav>

      <header className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">
            <span className="landing-badge-dot"></span>
            Official University Circular Portal
          </div>
          <h1 className="landing-headline">
            Never miss a crucial campus announcement again.
          </h1>
          <p className="landing-subtext">
            A real-time, priority-driven notice board designed for students and faculty.
            Filter by importance, pin essential exam schedules, receive emergency breaking broadcasts,
            and keep your semester organized.
          </p>

          <div className="landing-cta-group">
            <button className="landing-cta-btn primary" onClick={openSignIn}>
              <span>Enter Portal</span>
              <span className="landing-arrow">&rarr;</span>
            </button>
            <button className="landing-cta-btn secondary" onClick={openRegister}>
              New Student / Faculty Registration
            </button>
          </div>

          <div className="landing-demo-hint">
            <span>⚡ Demo logins ready:</span>
            <code>admin@college.edu</code> &bull; <code>student@college.edu</code>
          </div>
        </div>
      </header>

      <section className="landing-features">
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="feature-icon-wrapper red">
              <span>🚨</span>
            </div>
            <h3>Emergency Alert Ticker</h3>
            <p>
              High-priority breaking broadcasts automatically pin to the top banner until acknowledged and marked as read.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="feature-icon-wrapper blue">
              <span>📌</span>
            </div>
            <h3>Client-side Notice Pinning</h3>
            <p>
              Bookmark time-sensitive circulars and keep them floating at the top of your personalized feed with persistent client storage.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="feature-icon-wrapper amber">
              <span>🔍</span>
            </div>
            <h3>Instant Categorized Search</h3>
            <p>
              Search through circulars by department, keyword, or examination status with category count chips.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="feature-icon-wrapper green">
              <span>🛡️</span>
            </div>
            <h3>Role-Based Access</h3>
            <p>
              Faculty and admins can create, publish, edit, and delete circulars, while students enjoy clean distraction-free reading.
            </p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} College Notice Priority Board. Designed for Students & Administration.</p>
      </footer>

      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          defaultIsRegister={initialRegister}
        />
      )}
    </div>
  );
}

export default LandingPage;
