"use client";

// Learner progress, stored in the browser (localStorage) — no backend, no login.
// All access goes through this provider, so the storage layer can later be
// swapped for a server-backed one (accounts + cross-device sync) without
// touching any UI. Progress is keyed by language so multiple courses coexist.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const KEY = "loop:progress";

// language -> set of completed lesson slugs
type DoneMap = Record<string, Record<string, true>>;

type ProgressContextValue = {
  /** False during SSR and the first client paint; true once localStorage is read. */
  hydrated: boolean;
  isDone: (language: string, slug: string) => boolean;
  toggle: (language: string, slug: string) => void;
  setDone: (language: string, slug: string, done: boolean) => void;
  /** How many of the given slugs are complete. */
  countDone: (language: string, slugs: string[]) => number;
  /** The first slug (in order) not yet complete, or null if all are done. */
  firstIncomplete: (language: string, slugs: string[]) => string | null;
  resetLanguage: (language: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function save(map: DoneMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // storage unavailable (private mode, blocked) — progress just won't persist
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [done, setDoneMap] = useState<DoneMap>({});
  const [hydrated, setHydrated] = useState(false);

  // Read once, after mount — never during render, so SSR and first paint match.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDoneMap(JSON.parse(raw) as DoneMap);
    } catch {
      // ignore malformed/blocked storage
    }
    setHydrated(true);
  }, []);

  const setDone = useCallback(
    (language: string, slug: string, value: boolean) => {
      setDoneMap((prev) => {
        const langMap = { ...(prev[language] ?? {}) };
        if (value) langMap[slug] = true;
        else delete langMap[slug];
        const next = { ...prev, [language]: langMap };
        save(next);
        return next;
      });
    },
    [],
  );

  const isDone = useCallback(
    (language: string, slug: string) => Boolean(done[language]?.[slug]),
    [done],
  );

  const toggle = useCallback(
    (language: string, slug: string) =>
      setDone(language, slug, !done[language]?.[slug]),
    [done, setDone],
  );

  const countDone = useCallback(
    (language: string, slugs: string[]) => {
      const m = done[language] ?? {};
      return slugs.reduce((n, s) => n + (m[s] ? 1 : 0), 0);
    },
    [done],
  );

  const firstIncomplete = useCallback(
    (language: string, slugs: string[]) => {
      const m = done[language] ?? {};
      return slugs.find((s) => !m[s]) ?? null;
    },
    [done],
  );

  const resetLanguage = useCallback((language: string) => {
    setDoneMap((prev) => {
      const next = { ...prev, [language]: {} };
      save(next);
      return next;
    });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        hydrated,
        isDone,
        toggle,
        setDone,
        countDone,
        firstIncomplete,
        resetLanguage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
