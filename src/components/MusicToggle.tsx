"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MusicBox } from "@/lib/music";

/** Where to put your own song — drop an mp3 here and it takes over. */
const TRACK_URL = "/music/song.mp3";

export default function MusicToggle({ autoStart }: { autoStart: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boxRef = useRef<MusicBox | null>(null);
  const hasFile = useRef(false);

  useEffect(() => {
    const audio = new Audio(TRACK_URL);
    audio.loop = true;
    audio.volume = 0.42;
    audio.preload = "auto";

    const ok = () => {
      hasFile.current = true;
      setReady(true);
    };
    const fail = () => {
      hasFile.current = false;
      setReady(true);
    };

    audio.addEventListener("canplaythrough", ok, { once: true });
    audio.addEventListener("error", fail, { once: true });
    audioRef.current = audio;
    boxRef.current = new MusicBox();

    // Don't wait forever if the network is slow.
    const t = window.setTimeout(() => setReady(true), 2500);

    return () => {
      clearTimeout(t);
      audio.pause();
      audio.src = "";
      boxRef.current?.dispose();
    };
  }, []);

  const play = useCallback(async () => {
    try {
      if (hasFile.current && audioRef.current) {
        await audioRef.current.play();
      } else {
        await boxRef.current?.start();
      }
      setPlaying(true);
    } catch {
      // Autoplay blocked — the visitor can still press the button.
      setPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    boxRef.current?.stop();
    setPlaying(false);
  }, []);

  // Kick off once the visitor has pressed "Open my heart" (a real gesture,
  // so browsers allow audio to start).
  useEffect(() => {
    if (!autoStart || !ready) return;
    const t = window.setTimeout(() => void play(), 700);
    return () => clearTimeout(t);
  }, [autoStart, ready, play]);

  const toggle = () => (playing ? pause() : void play());

  return (
    <AnimatePresence>
      {autoStart && (
        <motion.button
          type="button"
          onClick={toggle}
          data-no-hearts
          aria-pressed={playing}
          aria-label={playing ? "Pause the music" : "Play some music"}
          title={playing ? "Pause the music" : "Play some music"}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gold-400/40 bg-wine-800/70 text-gold-300 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-gold-300 hover:bg-rose-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        >
          <span
            aria-hidden
            className={`absolute inset-0 -z-10 rounded-full blur-md transition-opacity duration-500 ${
              playing ? "opacity-90" : "opacity-0"
            }`}
            style={{ background: "rgba(217,79,122,0.55)" }}
          />
          {playing ? (
            <span className="flex items-end gap-[3px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] rounded-full bg-current"
                  animate={{ height: [6, 17, 9, 20, 7] }}
                  transition={{
                    duration: 1.05,
                    repeat: Infinity,
                    delay: i * 0.13,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
          ) : (
            <svg
              className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path
                d="M9 18V5l11-2v13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" />
              <circle cx="17" cy="16" r="3" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
