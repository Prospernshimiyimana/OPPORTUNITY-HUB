import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

export function Card({ 
  children, 
  title, 
  subtitle, 
  className = "", 
  padding = "md",
  hover = true 
}: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div
      className={`rounded-[28px] border border-slate-200/70 bg-white/88 shadow-[0_18px_50px_-22px_rgba(15,23,42,0.28)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/72 ${
        hover ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-26px_rgba(15,23,42,0.38)]" : ""
      } ${paddingClasses[padding]} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
