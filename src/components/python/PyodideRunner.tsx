"use client";

import { useCallback, useRef, useState } from "react";
import { getPyodide, cleanTraceback, type Pyodide } from "./pyodide";

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
        py = await getPyodide();
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
