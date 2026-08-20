"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  content,
  DEFAULT_LOCALE,
  LOCALES,
  type Copy,
  type Locale,
} from "./content";

const STORAGE_KEY = "valentine-locale";

function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (LOCALES as readonly string[]).includes(value)
  );
}

/* ── A tiny external store ────────────────────────────────────────
   Reading a saved preference during render would break hydration, and
   reading it in an effect means an extra render pass. useSyncExternalStore
   is built for exactly this: the server (and the hydrating client) see
   DEFAULT_LOCALE, then React swaps in the stored value in one go.        */

let cached: Locale | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): Locale {
  if (cached) return cached;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — no matter.
  }
  cached = isLocale(stored) ? stored : DEFAULT_LOCALE;
  return cached;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function writeLocale(next: Locale) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The preference just won't persist — the site still works.
  }
  listeners.forEach((l) => l());
}

/* ── Context ─────────────────────────────────────────────────────── */

type LocaleContextValue = {
  locale: Locale;
  copy: Copy;
  setLocale: (next: Locale) => void;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Keep <html lang> and the tab title in step with the chosen language.
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = content[locale].documentTitle;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      copy: content[locale],
      setLocale,
      toggle: () => writeLocale(locale === "en" ? "zh" : "en"),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Shortcut for components that only need the words. */
export function useCopy() {
  return useLocale().copy;
}
