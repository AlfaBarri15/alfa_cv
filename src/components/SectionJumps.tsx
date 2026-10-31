"use client";

import { useEffect } from "react";
import type { Dictionary } from "@/i18n";

function Chevron({ direction }: { direction: "up" | "down" }) {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path
        d={direction === "up" ? "M6 14.5 12 8.5l6 6" : "M6 9.5 12 15.5l6-6"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

const jumpScript = `(function(){
  var root=document.currentScript&&document.currentScript.closest(".section-jumps");
  if(!root)return;
  var ids=(root.getAttribute("data-sections")||"").split(" ").filter(Boolean);
  var prev=root.querySelector('[data-jump="prev"]');
  var next=root.querySelector('[data-jump="next"]');
  function place(){
    var line=window.scrollY+window.innerHeight*0.35;
    var current=0;
    ids.forEach(function(id,index){
      var section=document.getElementById(id);
      if(section&&section.getBoundingClientRect().top+window.scrollY<=line)current=index;
    });
    var start=current<=0;
    var end=current>=ids.length-1;
    prev.href="#"+ids[Math.max(current-1,0)];
    next.href="#"+ids[Math.min(current+1,ids.length-1)];
    prev.setAttribute("aria-disabled",start?"true":"false");
    next.setAttribute("aria-disabled",end?"true":"false");
    prev.classList.toggle("pointer-events-none",start);
    prev.classList.toggle("opacity-35",start);
    next.classList.toggle("pointer-events-none",end);
    next.classList.toggle("opacity-35",end);
  }
  place();
  window.addEventListener("scroll",place,{passive:true});
  window.addEventListener("hashchange",place);
  window.addEventListener("resize",place);
})();`;

export function SectionJumps({ ids, labels }: { ids: string[]; labels: Dictionary }) {
  useEffect(() => {
    const root = document.querySelector(".section-jumps");
    if (!root) return;
    const prev = root.querySelector<HTMLAnchorElement>('[data-jump="prev"]');
    const next = root.querySelector<HTMLAnchorElement>('[data-jump="next"]');
    if (!prev || !next) return;

    const place = () => {
      const line = window.scrollY + window.innerHeight * 0.35;
      let current = 0;
      ids.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top + window.scrollY <= line) current = index;
      });
      const start = current <= 0;
      const end = current >= ids.length - 1;
      prev.href = `#${ids[Math.max(current - 1, 0)]}`;
      next.href = `#${ids[Math.min(current + 1, ids.length - 1)]}`;
      prev.setAttribute("aria-disabled", start ? "true" : "false");
      next.setAttribute("aria-disabled", end ? "true" : "false");
      prev.classList.toggle("pointer-events-none", start);
      prev.classList.toggle("opacity-35", start);
      next.classList.toggle("pointer-events-none", end);
      next.classList.toggle("opacity-35", end);
    };

    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("hashchange", place);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("hashchange", place);
      window.removeEventListener("resize", place);
    };
  }, [ids]);

  const iconButton = "grid size-8 place-items-center rounded-full transition-colors duration-300 ease-out hover:bg-paper/15 motion-reduce:transition-none";
  const idle = "text-muted hover:text-paper";

  return (
    <div className="section-jumps no-print" data-sections={ids.join(" ")}>
      <div className="flex flex-col rounded-full border border-line bg-ink/60 p-1" role="group" aria-label={labels.sectionsLabel}>
        <a
          aria-disabled="true"
          aria-label={labels.previousSection}
          className={`${iconButton} pointer-events-none opacity-35`}
          data-jump="prev"
          href={`#${ids[0]}`}
          title={labels.previousSection}
        >
          <Chevron direction="up" />
        </a>
        <a
          aria-disabled="false"
          aria-label={labels.nextSection}
          className={`${iconButton} ${idle}`}
          data-jump="next"
          href={`#${ids[1] ?? ids[0]}`}
          title={labels.nextSection}
        >
          <Chevron direction="down" />
        </a>
      </div>
      <script dangerouslySetInnerHTML={{ __html: jumpScript }} />
    </div>
  );
}
