"use client";

import { useCallback, useRef, useState } from "react";
import { getPyodide, cleanTraceback, type Pyodide } from "./pyodide";

/**
 * An auto-graded coding exercise. The learner writes code in the editor; on
 * "Check", their code runs in a fresh namespace, then the hidden `tests` (a
 * block of Python asserts) run against it. No exception → pass; otherwise the
 * failing assertion's message is shown. Reuses the shared Pyodide runtime.
 *
 *   <Exercise
 *     prompt="Write a function shout(text) that returns it in upper case."
 *     starter={"def shout(text):\n    # your code here\n    pass"}
 *     tests={'assert shout("hi") == "HI", "shout(\\"hi\\") should be HI"'}
 *     hint="Strings have an .upper() method."
 *   />
 */
export default function Exercise({
  prompt,
  starter,
  tests,
  hint,
}: {
  prompt: string;
  starter: string;
  tests: string;
  hint?: string;
}) {
  const [code, setCode] = useState(starter);
  const [status, setStatus] = useState<"idle" | "loading" | "checking">("idle");
  const [result, setResult] = useState<
    { passed: boolean; message: string; output?: string } | null
  >(null);
  const [showHint, setShowHint] = useState(false);
  const pyRef = useRef<Pyodide | null>(null);

  const check = useCallback(async () => {
    let py = pyRef.current;
    if (!py) {
      setStatus("loading");
      try {
        py = await getPyodide();
        pyRef.current = py;
      } catch {
        setStatus("idle");
        setResult({
          passed: false,
          message:
            "Couldn't load the Python runtime — check your connection and try again.",
        });
        return;
      }
    }

    setStatus("checking");
    let out = "";
    py.setStdout({ batched: (s) => (out += `${s}\n`) });
    py.setStderr({ batched: (s) => (out += `${s}\n`) });

    // Run the learner's code and the hidden tests in one fresh namespace, so the
    // tests see their definitions but nothing leaks between attempts or cells.
    const ns = py.toPy ? py.toPy({}) : undefined;
    try {
      await py.runPythonAsync(code, ns ? { globals: ns } : undefined);
      await py.runPythonAsync(tests, ns ? { globals: ns } : undefined);
      setResult({
        passed: true,
        message: "All checks passed — nicely done!",
        output: out.trim() || undefined,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      const last =
        cleanTraceback(message).trim().split("\n").filter(Boolean).pop() ??
        "Not quite — try again.";
      setResult({ passed: false, message: last, output: out.trim() || undefined });
    } finally {
      ns?.destroy?.();
      setStatus("idle");
    }
  }, [code, tests]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    <div className="not-prose my-8 rounded-2xl border border-brand/30 bg-surface p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand">
          ✎ Your turn
        </span>
        <span className="text-xs text-muted">auto-checked · Python</span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-foreground">{prompt}</p>

      {/* editor */}
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand/70" />
          <span className="ml-2 text-xs text-muted">solution.py</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          rows={rows}
          spellCheck={false}
          aria-label="Editable Python solution"
          className="block w-full resize-y bg-background p-4 font-mono text-sm leading-7 text-foreground outline-none"
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={check}
          disabled={busy}
          className="cursor-pointer rounded-lg bg-brand-strong px-4 py-2 text-sm font-semibold text-background transition-transform duration-100 active:scale-95"
        >
          ✓ Check
        </button>
        {hint && (
          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            className="cursor-pointer text-xs text-muted underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >
            {showHint ? "Hide hint" : "Need a hint?"}
          </button>
        )}
        {status === "loading" && (
          <span className="text-xs text-muted">Loading Python… just once</span>
        )}
      </div>

      {showHint && hint && (
        <p className="mt-3 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted">
          💡 {hint}
        </p>
      )}

      {result && (
        <div
          className={`mt-4 rounded-xl border px-4 py-3 ${
            result.passed
              ? "border-brand/50 bg-brand/10"
              : "border-danger/40 bg-danger/10"
          }`}
        >
          <p
            className={`font-mono text-sm font-semibold ${
              result.passed ? "text-brand" : "text-danger"
            }`}
          >
            {result.passed ? "✓ " : "✗ "}
            {result.message}
          </p>
          {result.output && (
            <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-6 text-muted">
              {result.output}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
