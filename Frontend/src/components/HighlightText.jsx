
function HighlightText({ text = "", highlight = "" }) {
  if (!highlight || !highlight.trim()) {
    return <>{text}</>;
  }

  // Escape regex special characters so user typing e.g. "(" or "[" doesn't crash
  const escapedHighlight = highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default HighlightText;

