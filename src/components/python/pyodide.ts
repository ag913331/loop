// Shared Pyodide runtime: loaded once per page from the CDN and reused by every
// PyodideRunner and Exercise on the page. Nothing downloads until the first run.

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export type Pyodide = {
  runPythonAsync: (code: string, options?: { globals?: unknown }) => Promise<unknown>;
  toPy?: (obj: unknown) => { destroy?: () => void };
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  setStdin: (opts: { stdin: () => string }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<Pyodide>;
  }
}

let pyodidePromise: Promise<Pyodide> | null = null;

function loadPyodideOnce(): Promise<Pyodide> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise<Pyodide>((resolve, reject) => {
    if (window.loadPyodide) {
      window.loadPyodide({ indexURL: PYODIDE_URL }).then(resolve, reject);
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_URL}pyodide.js`;
    script.onload = () => {
      if (!window.loadPyodide) {
        reject(new Error("Pyodide failed to initialise"));
        return;
      }
      window.loadPyodide({ indexURL: PYODIDE_URL }).then(resolve, reject);
    };
    script.onerror = () => reject(new Error("Could not load the Python runtime"));
    document.head.appendChild(script);
  });
  return pyodidePromise;
}

let stdinReady = false;

/**
 * Get the shared Pyodide instance, loading it on first call and wiring input()
 * to a browser prompt (once). Throws if the runtime can't be loaded.
 */
export async function getPyodide(): Promise<Pyodide> {
  const py = await loadPyodideOnce();
  if (!stdinReady) {
    try {
      py.setStdin({
        stdin: () => {
          const v = window.prompt("Your program is waiting for input:");
          return v === null ? "" : v;
        },
      });
    } catch {
      // older runtimes without setStdin still run non-interactive code fine
    }
    stdinReady = true;
  }
  return py;
}

/**
 * Pyodide tracebacks include its own internal frames; strip them so the error
 * reads like an ordinary `python main.py` traceback a learner would see.
 */
export function cleanTraceback(message: string): string {
  const lines = message.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const file = lines[i].match(/^\s*File "(.*?)", line/);
    if (file) {
      const frame = [lines[i]];
      let j = i + 1;
      while (j < lines.length && /^\s/.test(lines[j]) && !/^\s*File "/.test(lines[j])) {
        frame.push(lines[j]);
        j++;
      }
      const internal =
        file[1].includes("_pyodide") || file[1].startsWith("/lib/python");
      if (!internal) out.push(...frame);
      i = j;
    } else {
      out.push(lines[i]);
      i++;
    }
  }
  return out.join("\n").replace(/"<exec>"/g, '"main.py"');
}
