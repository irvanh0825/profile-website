import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${className}`}
    >
      {children}
    </div>
  );
}
