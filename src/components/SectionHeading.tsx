import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  title: string;
  lead?: ReactNode;
};

export function SectionHeading({ index, title, lead }: Props) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      <div className="flex items-baseline gap-4">
        <span className="label">{index}</span>
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--line)" }}
        />
      </div>
      <h2 className="mt-5 text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
