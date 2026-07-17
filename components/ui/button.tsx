import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn, isExternalHref } from "@/lib/utils";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  solid: "border border-black bg-black text-white hover:border-zinc-800 hover:bg-zinc-800",
  outline: "border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50",
  ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
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
    "inline-flex max-w-full items-center justify-center whitespace-normal rounded-lg text-center font-medium leading-tight transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/50",
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
