import { useState } from "react";
import AuthModal from "./AuthModal";

function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
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
    <div className="vecteezy-landing">
      {/* Background flowing wave graphic */}
      <div className="wave-decoration-container" aria-hidden="true">
        <svg
          className="flowing-mesh-wave"
          viewBox="0 0 500 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="waveCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="waveBlueGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Layered parametric flowing wave curves mirroring the template */}
          <path d="M300,-50 C450,150 180,300 320,450 C430,570 240,700 380,850" stroke="url(#waveCyanGrad)" strokeWidth="1.5" />
          <path d="M310,-40 C460,160 190,310 330,460 C440,580 250,710 390,860" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M320,-30 C470,170 200,320 340,470 C450,590 260,720 400,870" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M330,-20 C480,180 210,330 350,480 C460,600 270,730 410,880" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M340,-10 C490,190 220,340 360,490 C470,610 280,740 420,890" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M350,0 C500,200 230,350 370,500 C480,620 290,750 430,900" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M360,10 C510,210 240,360 380,510 C490,630 300,760 440,910" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M370,20 C520,220 250,370 390,520 C500,640 310,770 450,920" stroke="url(#waveCyanGrad)" strokeWidth="1.2" />
          <path d="M380,30 C530,230 260,380 400,530 C510,650 320,780 460,930" stroke="url(#waveBlueGrad)" strokeWidth="1.4" />
          <path d="M390,40 C540,240 270,390 410,540 C520,660 330,790 470,940" stroke="url(#waveBlueGrad)" strokeWidth="1.4" />
          <path d="M400,50 C550,250 280,400 420,550 C530,670 340,800 480,950" stroke="url(#waveBlueGrad)" strokeWidth="1.4" />
          <path d="M410,60 C560,260 290,410 430,560 C540,680 350,810 490,960" stroke="url(#waveBlueGrad)" strokeWidth="1.4" />
        </svg>
      </div>

      {/* Top Header Navbar */}
      <header className="hero-navbar">
        <div className="navbar-logo">
          <div className="logo-symbol">
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <rect x="3" y="4" width="26" height="24" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="7" y="10" width="18" height="14" rx="2" fill="#ffffff" />
              <rect x="10" y="14" width="12" height="2" rx="1" fill="#0f172a" />
              <rect x="10" y="18" width="9" height="1.5" rx="1" fill="#94a3b8" />
              <circle cx="16" cy="7" r="2.5" fill="#ef4444" />
            </svg>
          </div>
          <span className="logo-text">Campus Board</span>
        </div>

        <nav className="navbar-links">
          <button className="nav-item active" type="button">Home</button>
          <button className="nav-item" type="button" onClick={() => setIsLearnMoreOpen(true)}>About</button>
          <button className="nav-item" type="button" onClick={() => setIsLearnMoreOpen(true)}>Features</button>
          <button className="nav-item" type="button" onClick={openSignIn}>Portal</button>
        </nav>

        <div className="navbar-search-btn" onClick={openSignIn} title="Sign in to search notices">
          <span className="nav-search-label">Search</span>
          <div className="nav-search-circle">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0b1736" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Hero Banner */}
      <main className="hero-main-content">
        <div className="hero-left-column">
          <h1 className="hero-display-title">
            College Notice<br />
            Priority Board.
          </h1>

          <p className="hero-description-paragraph">
            A centralized university communication portal delivering critical academic,
            examination, and campus circulars with smart urgency ranking, breaking alerts,
            and personal bookmarks.
          </p>

          <div className="hero-action-buttons">
            <button
              type="button"
              className="v-btn v-btn-cyan"
              onClick={() => setIsLearnMoreOpen(true)}
            >
              LEARN MORE
            </button>

            <button
              type="button"
              className="v-btn v-btn-purple"
              onClick={openSignIn}
            >
              SIGN IN / REGISTER
            </button>
          </div>
        </div>
      </main>

      {/* Learn More Interactive Modal / Drawer */}
      {isLearnMoreOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setIsLearnMoreOpen(false)}
        >
          <div className="modal-content modal-learnmore">
            <button
              type="button"
              className="modal-close"
              onClick={() => setIsLearnMoreOpen(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <h2 className="modal-title">About College Notice Priority Board</h2>
            </div>

            <div className="modal-body learnmore-body">
              <p className="learnmore-highlight">
                The <strong>College Notice Priority Board</strong> is an enterprise-grade campus communication system
                engineered to eliminate missed exam deadlines, delayed fee submissions, and critical emergency oversights.
              </p>

              <div className="learnmore-features-list">
                <div className="learnmore-item">
                  <span className="learnmore-icon">🚨</span>
                  <div>
                    <h4>Emergency Alert Ticker</h4>
                    <p>Top-pinned animated breaking banner that notifies students of active high-priority notices until marked as read.</p>
                  </div>
                </div>

                <div className="learnmore-item">
                  <span className="learnmore-icon">📌</span>
                  <div>
                    <h4>Client-side Circular Pinning</h4>
                    <p>Pin essential dates directly to the top of your dashboard with local storage persistence across sessions.</p>
                  </div>
                </div>

                <div className="learnmore-item">
                  <span className="learnmore-icon">🛡️</span>
                  <div>
                    <h4>Role-Based Access Control</h4>
                    <p>Secure authentication with JWT tokens dividing student reading mode and administrative editorial powers.</p>
                  </div>
                </div>

                <div className="learnmore-item">
                  <span className="learnmore-icon">🔍</span>
                  <div>
                    <h4>Instant Categorized Filtering</h4>
                    <p>Search circulars across Academics, Examination, Events, and General campus categories with live count chips.</p>
                  </div>
                </div>
              </div>

              <div className="demo-credentials-box">
                <span className="demo-badge">Quick Demo Credentials</span>
                <p><strong>Admin:</strong> <code>admin@college.edu</code> / <code>admin123</code></p>
                <p><strong>Student:</strong> <code>student@college.edu</code> / <code>student123</code></p>
              </div>
            </div>

            <div className="modal-footer form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsLearnMoreOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={() => {
                  setIsLearnMoreOpen(false);
                  openSignIn();
                }}
              >
                Access Dashboard &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
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
