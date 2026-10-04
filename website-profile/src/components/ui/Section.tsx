import { useId, type ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  /** Anchor id used by navbar links, without "#". */
  id: string;
  /** Small mono label above the title, e.g. "01 // ABOUT". */
  eyebrow: string;
  title: string;
  /** Alternate light-gray background (#fafafa). */
  muted?: boolean;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, muted = false, children }: SectionProps) {
  const titleId = useId();
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`section-y scroll-mt-16 ${muted ? "bg-surface" : "bg-white"}`}
    >
      <div className="container-site">
        <Reveal>
          <p className="font-mono text-sm font-medium text-primary">{eyebrow}</p>
          <h2
            id={titleId}
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
