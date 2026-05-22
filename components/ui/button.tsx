import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn, isExternalHref } from "@/lib/utils";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-blue-600 text-white shadow-[0_16px_30px_rgba(37,99,235,0.25)] hover:bg-blue-700",
  outline:
    "border border-slate-300 bg-white/70 text-slate-900 hover:border-blue-300 hover:bg-blue-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2 text-sm md:text-base",
  lg: "min-h-12 px-6 py-3 text-base",
};

export function buttonStyles({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex max-w-full items-center justify-center whitespace-normal rounded-full text-center font-semibold leading-tight transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ className, href, variant, size, ...props }: ButtonLinkProps) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={buttonStyles({ variant, size, className })}
        {...props}
      />
    );
  }

  return <Link href={href} className={buttonStyles({ variant, size, className })} {...props} />;
}
