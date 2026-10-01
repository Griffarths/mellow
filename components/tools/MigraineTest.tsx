"use client";

import { useRef, useState, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import type { ToolLocale } from "@/lib/tools";
import { score, type Answers, type TestCopy } from "@/lib/migraine-test";
import { typographize } from "@/lib/typography";
import { RichText } from "./RichText";

type Props = {
  locale: ToolLocale;
  // Only this language's texts, so the client bundle doesn't carry all eight.
  copy: TestCopy;
  // Store badges rendered on the server.
  badges: ReactNode;
};

export function MigraineTest({ locale, copy: c, badges }: Props) {
  const ty = (s: string) => typographize(s, locale);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const total = c.questions.length;
  const q = c.questions[step];

  function keepInView() {
    const el = boxRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ block: "start" });
    }
  }

  function advance() {
    if (step + 1 < total) setStep(step + 1);
    else setDone(true);
    keepInView();
  }

  function pickSingle(id: string) {
    setAnswers((a) => ({ ...a, [q.id]: id }));
    window.setTimeout(advance, 180);
  }

  function toggleMulti(id: string, exclusive?: boolean) {
    setAnswers((a) => {
      const current = Array.isArray(a[q.id]) ? (a[q.id] as string[]) : [];
      const exclusiveIds = q.options.filter((o) => o.exclusive).map((o) => o.id);
      let next: string[];
      if (current.includes(id)) next = current.filter((x) => x !== id);
      else if (exclusive) next = [id];
      else next = [...current.filter((x) => !exclusiveIds.includes(x)), id];
      return { ...a, [q.id]: next };
    });
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    keepInView();
  }

  const box =
    "scroll-mt-24 rounded-card bg-white p-6 ring-1 ring-surface-line md:p-10";

  if (done) {
    const outcome = score(answers);
    const r = c.results[outcome.result];
    const notes = [
      outcome.chronic && c.chronicNote,
      outcome.medicationOveruse && c.overuseNote,
    ].filter(Boolean) as (typeof c.chronicNote)[];

    return (
      <div ref={boxRef} className={box} aria-live="polite">
        <p className="text-caption font-bold uppercase tracking-[0.08em] text-croix-ink">
          {c.resultEyebrow}
        </p>
        <h2 className="mt-3 text-h2 text-ink">{ty(r.title)}</h2>
        <p className="mt-4 max-w-[65ch] text-[17px] leading-[1.75] text-ink-body">{ty(r.text)}</p>
        {outcome.result !== "urgent" &&
          notes.map((n, i) => (
            <p
              key={i}
              className="mt-4 max-w-[65ch] border-l-2 border-croix-accent pl-4 text-[15px] leading-relaxed text-ink-body"
            >
              <RichText parts={n} locale={locale} />
            </p>
          ))}
        {r.links.length > 0 && (
          <p className="mt-5 max-w-[65ch] text-[15px] leading-relaxed text-ink-2">
            <RichText parts={r.links} locale={locale} />
          </p>
        )}

        <div className="mt-8 border-t border-surface-line pt-8">
          <p className="text-lg font-bold tracking-tight text-ink">{ty(c.appTitle)}</p>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{ty(c.appText)}</p>
          <div className="mt-5">{badges}</div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-ink-3">{ty(c.disclaimer)}</p>
        <button type="button" onClick={restart} className={buttonClass("secondary", "mt-6")}>
          {c.restart}
        </button>
      </div>
    );
  }

  const selected = answers[q.id];
  const isSelected = (id: string) =>
    Array.isArray(selected) ? selected.includes(id) : selected === id;
  const multiReady = Array.isArray(selected) && selected.length > 0;

  return (
    <div ref={boxRef} className={box}>
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-ink-3">
        <span>{c.progress.replace("{n}", String(step + 1)).replace("{total}", String(total))}</span>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="rounded-chip px-2 py-1 text-ink-2 transition hover:bg-surface-soft hover:text-ink"
          >
            ← {c.back}
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-soft" aria-hidden>
        <div
          className="h-full rounded-full bg-ink transition-all duration-300"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>

      <fieldset className="mt-8">
        <legend className="text-h3 text-ink">{ty(q.title)}</legend>
        {q.hint && <p className="mt-2 text-[15px] text-ink-3">{ty(q.hint)}</p>}
        <div className="mt-6 grid gap-2.5">
          {q.options.map((o) => {
            const on = isSelected(o.id);
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={on}
                onClick={() => (q.multiple ? toggleMulti(o.id, o.exclusive) : pickSingle(o.id))}
                className={`flex items-center gap-3 rounded-btn px-5 py-4 text-left text-[15px] font-semibold leading-snug transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-hot md:text-base ${
                  on
                    ? "bg-ink text-white"
                    : "bg-surface-soft text-ink hover:bg-surface-line"
                }`}
              >
                {q.multiple && (
                  <span
                    aria-hidden
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${
                      on ? "border-white bg-white text-ink" : "border-ink-mute"
                    }`}
                  >
                    {on && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2.5 6.5 2.5 2.5 4.5-5" />
                      </svg>
                    )}
                  </span>
                )}
                {ty(o.label)}
              </button>
            );
          })}
        </div>
      </fieldset>

      {q.multiple && (
        <button
          type="button"
          disabled={!multiReady}
          onClick={advance}
          className={buttonClass("primary", "mt-6 disabled:cursor-not-allowed disabled:opacity-40")}
        >
          {step + 1 === total ? c.seeResult : c.next}
        </button>
      )}
    </div>
  );
}
