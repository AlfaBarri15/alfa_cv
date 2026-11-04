"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

const minFont = 13;

export function SummaryWords({ label, text }: { label: string; text: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const paragraphs = useMemo(
    () =>
      text
        .split(/\r?\n+/)
        .map((paragraph) => paragraph.trim().split(/\s+/).filter(Boolean))
        .filter((paragraph) => paragraph.length > 0),
    [text],
  );
  const wordCount = paragraphs.reduce((total, paragraph) => total + paragraph.length, 0);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const block = wordsRef.current;
    if (!stage || !block || wordCount === 0) return;

    const fit = () => {
      stage.classList.remove("sum-stage-flow");

      const room = () => {
        const style = getComputedStyle(stage);
        return window.innerHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      };

      const apply = (size: number) => {
        stage.style.setProperty("--fit", `${size}px`);
      };

      const max = Math.min(window.innerWidth * 0.08, 46);
      let low = minFont;
      let high = Math.max(minFont, max);
      let best = minFont;

      for (let step = 0; step < 10; step += 1) {
        const mid = (low + high) / 2;
        apply(mid);
        if (block.scrollHeight <= room()) {
          best = mid;
          low = mid;
        } else {
          high = mid;
        }
      }

      apply(best);
      if (block.scrollHeight > room() + 1) {
        stage.classList.add("sum-stage-flow");
        apply(Math.min(22, Math.max(minFont, window.innerWidth * 0.045)));
      }
    };

    fit();
    const onFonts = () => fit();
    document.fonts?.ready.then(onFonts).catch(() => {});
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [wordCount]);

  let wordIndex = 0;

  return (
    <section className="sum-pin sum-pin-words">
      <div className="sum-stage" ref={stageRef}>
        <p className="sum-ghost font-serif font-bold uppercase">{label}</p>
        <div className="sum-words" ref={wordsRef} style={{ ["--n" as string]: Math.max(wordCount, 1) }}>
          {paragraphs.map((paragraph, paragraphIndex) => (
            <p className="sum-words-paragraph" key={`${paragraphIndex}-${paragraph.join("-")}`}>
              {paragraph.map((word) => {
                const index = wordIndex++;
                const start = Math.round((index / Math.max(wordCount - 1, 1)) * 42);
                const end = Math.min(58, start + 14);
                return (
                  <span key={`${word}-${index}`} style={{ animationRange: `cover ${start}% cover ${end}%` }}>
                    {word}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
      <div className="sum-summary-mark" id="sum-summary" />
    </section>
  );
}
