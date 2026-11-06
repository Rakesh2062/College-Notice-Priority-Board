function EmergencyTicker({ notice, onSelectNotice }) {
  if (!notice) return null;

  return (
    <div className="emergency-ticker" onClick={() => onSelectNotice(notice)}>
      <div className="ticker-badge">
        <span className="ticker-pulse"></span>
        <span className="ticker-icon">🚨</span>
        <span className="ticker-label">URGENT</span>
      </div>
      <div className="ticker-content">
        <span className="ticker-text">{notice.title}</span>
        <span className="ticker-cta">Click to view &rarr;</span>
      </div>
    </div>
  );
}

export default EmergencyTicker;

