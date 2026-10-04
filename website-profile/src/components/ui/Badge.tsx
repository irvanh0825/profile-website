import { Check } from "lucide-react";
import type { ReactNode } from "react";

export type BadgeVariant = "default" | "primary" | "success" | "warning";
export type BadgeSize = "md" | "sm";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-slate-200 bg-white text-slate-600",
  primary: "border-blue-200 bg-primary-soft text-blue-700",
  success: "border-emerald-200 bg-success-soft text-emerald-700",
  /** Reserved for "learning" status (AGENTS.md rule 3 exception). */
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

const sizeClasses: Record<BadgeSize, string> = {
  md: "px-3 py-1 text-xs",
  sm: "px-2 py-0.5 text-[10px]",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Render a checkmark before the label (used for "passed" status). */
  withCheck?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  withCheck = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {withCheck ? <Check className="size-3.5" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
