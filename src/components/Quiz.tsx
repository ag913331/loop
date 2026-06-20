"use client";

import { useState } from "react";

export type Question = {
  prompt: string;
  code?: string;
  options: string[];
  correct: number;
  explain: string;
};

/**
 * A small self-checking multiple-choice quiz. Picking an option locks that
 * question, marks the right answer green (and a wrong pick red), and reveals a
 * short explanation. A running score shows once every question is answered.
 */
export default function Quiz({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null),
  );

  const select = (qi: number, oi: number) => {
    if (answers[qi] !== null) return; // locked once answered
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)));
  };

  const reset = () => setAnswers(questions.map(() => null));

  const answeredCount = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>(
    (s, a, i) => s + (a === questions[i].correct ? 1 : 0),
    0,
  );
  const done = answeredCount === questions.length;

  return (
    <div className="not-prose my-8 space-y-5">
      {questions.map((q, qi) => {
        const answer = answers[qi];
        const locked = answer !== null;
        return (
          <div
            key={qi}
            className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
          >
            <div className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-muted">
                {qi + 1}
              </span>
              <p className="font-medium text-foreground">{q.prompt}</p>
            </div>

            {q.code && (
              <pre className="ml-10 mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-sm text-foreground">
                {q.code}
              </pre>
            )}

            <div className="ml-10 mt-4 space-y-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.correct;
                const isChosen = oi === answer;
                let cls =
                  "border-border bg-background hover:bg-surface-2 cursor-pointer";
                if (locked) {
                  if (isCorrect)
                    cls = "border-brand/50 bg-brand/10 text-foreground";
                  else if (isChosen)
                    cls = "border-danger/50 bg-danger/10 text-muted";
                  else cls = "border-border bg-background opacity-50";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => select(qi, oi)}
                    disabled={locked}
                    className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left font-mono text-sm transition-colors ${cls}`}
                  >
                    <span className="w-4 shrink-0">
                      {locked && isCorrect && (
                        <span className="text-brand">✓</span>
                      )}
                      {locked && isChosen && !isCorrect && (
                        <span className="text-danger">✗</span>
                      )}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {locked && (
              <p className="ml-10 mt-3 text-sm text-muted">
                <span
                  className={
                    answer === q.correct ? "text-brand" : "text-danger"
                  }
                >
                  {answer === q.correct ? "Correct. " : "Not quite. "}
                </span>
                {q.explain}
              </p>
            )}
          </div>
        );
      })}

      {done && (
        <div className="flex items-center justify-between rounded-2xl border border-brand/40 bg-surface p-5">
          <span className="font-semibold text-foreground">
            You scored {score} / {questions.length}
            {score === questions.length ? " — perfect! 🎉" : ""}
          </span>
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            ↻ Try again
          </button>
        </div>
      )}
    </div>
  );
}
