"use client";

import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  /** 网格线模式 */
  variant?: "grid" | "orb" | "both";
  /** Orb 颜色 */
  orbColor?: string;
  className?: string;
};

/**
 * 环境背景装饰 — 借鉴 mingheng.xin 的 ambient-orb + grid-lines 模式。
 * 为 section 提供微妙的网格线和彩色光晕，增强视觉层次。
 */
export default function AmbientBackground({
  variant = "both",
  orbColor = "from-blue-500/12 via-blue-400/8 to-cyan-400/10",
  className,
}: AmbientBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)} aria-hidden>
      {(variant === "orb" || variant === "both") && (
        <>
          <div
            className={cn(
              "absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br blur-[100px]",
              orbColor
            )}
          />
          <div
            className={cn(
              "absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr blur-[90px]",
              orbColor
            )}
            style={{ animationDelay: "1.2s" }}
          />
        </>
      )}
      {(variant === "grid" || variant === "both") && (
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(37,99,235,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, black, transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
