"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";
import { FEATURE_TABS } from "../data";
import { FeatureIllustration } from "./feature-illustration";

const icons = [GraduationCap, ShieldCheck];
export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function keyboard(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % FEATURE_TABS.length;
    else if (event.key === "ArrowLeft")
      next = (index + FEATURE_TABS.length - 1) % FEATURE_TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = FEATURE_TABS.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }
  return (
    <>
      <div
        className="mx-auto mb-9 mt-8 flex w-fit max-w-full gap-1 overflow-x-auto rounded-pill border border-border bg-surface p-1.5"
        role="tablist"
        aria-label="Fitur CampusSpace"
      >
        {FEATURE_TABS.map((tab, index) => {
          const Icon = icons[index];
          return (
            <button
              key={tab.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={active === index}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === index ? 0 : -1}
              onKeyDown={(e) => keyboard(e, index)}
              onClick={() => setActive(index)}
              className={`flex shrink-0 items-center gap-2 rounded-pill px-4 py-3 text-xs font-medium transition-colors sm:px-6 ${active === index ? "bg-brand text-white" : "text-muted hover:bg-soft"}`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>
      {FEATURE_TABS.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={active !== index}
          tabIndex={0}
        >
          <div className="grid gap-[22px] md:grid-cols-3">
            {tab.cards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-feature border border-border bg-surface shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="feature-visual" aria-hidden="true">
                  <FeatureIllustration kind={card.illustration} />
                </div>
                <div className="px-6 pb-7 pt-6">
                  <h3 className="text-[17px] font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.8] text-muted">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
