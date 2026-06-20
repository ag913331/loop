"use client";

import { useCallback, useRef, useState } from "react";

// Pyodide is CPython compiled to WebAssembly. We load it straight from the CDN
// the first time the user runs code — nothing is downloaded until then, and
// everything executes in the browser, so there's no backend.
const PYODIDE_VERSION = "0.26.4";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type Pyodide = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<Pyodide>;
  }
}

// Load Pyodide once per page, sharing the same instance across every runner.
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

// Pyodide tracebacks include its own internal frames; strip them so the error
// reads like an ordinary `python main.py` traceback a learner would see.
function cleanTraceback(message: string): string {
  const lines = message.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const file = lines[i].match(/^\s*File "(.*?)", line/);
    if (file) {
      // Gather the whole frame: the File line plus its indented continuation
      // lines (source + any ^^^ carets), stopping at the next frame or message.
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

type Status = "idle" | "loading" | "running";

export default function PyodideRunner({
  initialCode,
}: {
  initialCode: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const pyRef = useRef<Pyodide | null>(null);

  const run = useCallback(async () => {
    // Note: we deliberately don't clear `output` here. Unmounting the output
    // panel at the start of every run collapses the page and then re-expands it
    // when the result arrives — on a fast run that looks like a flicker. We keep
    // the previous output in place and replace it once the new result is ready.
    let py = pyRef.current;
    if (!py) {
      setStatus("loading");
      try {
        py = await loadPyodideOnce();
        pyRef.current = py;
      } catch {
        setStatus("idle");
        setIsError(true);
        setOutput(
          "Couldn't load the Python runtime — check your connection and try again.",
        );
        return;
      }
    }

    setStatus("running");
    let buffer = "";
    py.setStdout({ batched: (s) => (buffer += `${s}\n`) });
    py.setStderr({ batched: (s) => (buffer += `${s}\n`) });

    try {
      await py.runPythonAsync(code);
      setOutput(buffer.length ? buffer.replace(/\n$/, "") : "(your program produced no output)");
      setIsError(false);
    } catch (e) {
      setIsError(true);
      const message = e instanceof Error ? e.message : String(e);
      setOutput(`${buffer}${cleanTraceback(message)}`.trim());
    } finally {
      setStatus("idle");
    }
  }, [code]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Insert spaces on Tab instead of moving focus, so indenting works.
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const { selectionStart: start, selectionEnd: end } = ta;
      setCode(code.slice(0, start) + "    " + code.slice(end));
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4;
      });
    }
  };

  const busy = status !== "idle";
  const rows = Math.max(4, code.split("\n").length);

  return (
    <div className="not-prose my-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          Run it yourself
        </span>
        <span className="text-xs text-muted">runs in your browser · Python</span>
      </div>

      {/* editor */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          <span className="ml-2 text-xs text-muted">main.py</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          rows={rows}
          spellCheck={false}
          aria-label="Editable Python code"
          className="block w-full resize-y bg-background p-4 font-mono text-sm leading-7 text-foreground outline-none"
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        {/* The button stays visually identical whether idle or running — only the
            disabled attribute toggles. Changing its label/size/opacity on a fast
            run made the button itself flicker. Status lives in the note beside it. */}
        <button
          type="button"
          onClick={run}
          disabled={busy}
          className="cursor-pointer rounded-lg bg-brand-strong px-4 py-2 text-sm font-semibold text-background transition-transform duration-100 active:scale-95"
        >
          ▶ Run
        </button>
        {status === "loading" && (
          <span className="text-xs text-muted">
            Loading Python… first run downloads it, just once
          </span>
        )}
      </div>

      {/* output */}
      {output !== null && (
        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
          <div className="border-b border-border px-3 py-2 text-xs text-muted">
            Output
          </div>
          <pre
            className={`whitespace-pre-wrap p-4 font-mono text-sm leading-6 ${
              isError ? "text-danger" : "text-foreground"
            }`}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
