import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>}
      </Reveal>
      {href && (
        <Link
          to={href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary hover:shadow-sm"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
