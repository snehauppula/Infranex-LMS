/**
 * Scroll to the course player and try to play + fullscreen the lesson.
 * Must run from a click/tap handler (browser user-activation rules).
 *
 * Supports `<video>` (direct URL) and `<iframe>` (e.g. MEGA embed) inside `#course-player`.
 */

function requestElFullscreen(el: Element): boolean {
  const anyEl = el as Element & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    mozRequestFullScreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };

  try {
    if (typeof el.requestFullscreen === "function") {
      void el.requestFullscreen();
      return true;
    }
    if (typeof anyEl.webkitRequestFullscreen === "function") {
      void Promise.resolve(anyEl.webkitRequestFullscreen());
      return true;
    }
    if (typeof anyEl.mozRequestFullScreen === "function") {
      void Promise.resolve(anyEl.mozRequestFullScreen());
      return true;
    }
    if (typeof anyEl.msRequestFullscreen === "function") {
      void Promise.resolve(anyEl.msRequestFullscreen());
      return true;
    }
  } catch {
    /* not allowed */
  }
  return false;
}

export function scrollCoursePlayerIntoViewAndFullscreen(): void {
  const wrap = document.getElementById("course-player");
  wrap?.scrollIntoView({ behavior: "smooth", block: "start" });

  const tryFocus = () => {
    if (!wrap) return;

    const video = wrap.querySelector("video");
    if (video instanceof HTMLVideoElement) {
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
        if (requestElFullscreen(video)) return;
        if (typeof v.webkitRequestFullscreen === "function") {
          v.webkitRequestFullscreen();
        }
      } catch {
        /* Fullscreen not allowed or unsupported */
      }
      return;
    }

    const iframe = wrap.querySelector("iframe");
    if (iframe instanceof HTMLIFrameElement) {
      if (requestElFullscreen(iframe)) return;
      if (requestElFullscreen(wrap)) return;
      try {
        iframe.focus();
      } catch {
        /* ignore */
      }
      return;
    }

    requestElFullscreen(wrap);
  };

  requestAnimationFrame(tryFocus);
  window.setTimeout(tryFocus, 400);
  window.setTimeout(tryFocus, 900);
}
