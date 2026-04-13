/**
 * Scroll to the course player and try to play + fullscreen the lesson video.
 * Must run from a click/tap handler (browser user-activation rules).
 */
export function scrollCoursePlayerIntoViewAndFullscreen(): void {
  const wrap = document.getElementById("course-player");
  wrap?.scrollIntoView({ behavior: "smooth", block: "start" });

  const tryFocus = () => {
    const video = wrap?.querySelector("video");
    if (!(video instanceof HTMLVideoElement)) return;

    void video.play().catch(() => {});

    const v = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => void;
    };

    try {
      if (typeof v.webkitEnterFullscreen === "function") {
        v.webkitEnterFullscreen();
        return;
      }
      if (typeof video.requestFullscreen === "function") {
        void video.requestFullscreen();
        return;
      }
      if (typeof v.webkitRequestFullscreen === "function") {
        v.webkitRequestFullscreen();
      }
    } catch {
      /* Fullscreen not allowed or unsupported */
    }
  };

  requestAnimationFrame(tryFocus);
  window.setTimeout(tryFocus, 400);
}
