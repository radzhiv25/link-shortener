const STORAGE_KEY = 'shrtnr-theme';

/** Runs before React hydrates so the correct theme is on <html> immediately (no flash). */
export function ThemeScript() {
  const script = `
(function() {
  try {
    var t = localStorage.getItem('${STORAGE_KEY}');
    var r = document.documentElement;
    if (t === 'dark') {
      r.classList.add('dark');
      r.setAttribute('data-theme', 'dark');
    } else {
      r.classList.remove('dark');
      r.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;
  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
