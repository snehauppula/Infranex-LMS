/** First focus stop for keyboard / screen reader users. Target `<main id="main-content">`. */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-2 z-[100] -translate-y-[120%] rounded-xl bg-deep px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-lg outline-none ring-offset-2 ring-offset-background transition-[transform,opacity] duration-300 ease-brand-out motion-reduce:transition-none focus-visible:translate-y-2 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-primary"
    >
      Skip to main content
    </a>
  );
}
