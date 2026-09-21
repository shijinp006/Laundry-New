"use client";

import { useEffect, useRef, type RefObject } from "react";
import { loadYouTubeApi, type YTPlayer } from "@/lib/youtube-player";

/**
 * Mounts a muted, chromeless YouTube player into `containerRef` once
 * `enabled` is true, and drives a short silent loop by seeking back to 0s
 * on an interval. (YouTube's `end` + `loop` + `playlist` URL trick doesn't
 * restart cleanly on its own — it lands on the "replay" UI instead — so
 * the loop is driven from the IFrame Player API directly.)
 */
export function useYouTubeLoop(
  containerRef: RefObject<HTMLElement | null>,
  videoId: string,
  enabled: boolean,
  loopSeconds = 3,
) {
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let intervalId: number | undefined;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;

      new YT.Player(container, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event) => {
            if (cancelled) {
              event.target.destroy();
              return;
            }
            playerRef.current = event.target;
            event.target.playVideo();
            intervalId = window.setInterval(() => {
              event.target.seekTo(0, true);
            }, loopSeconds * 1000);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [containerRef, videoId, enabled, loopSeconds]);
}
