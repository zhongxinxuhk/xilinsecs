"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** 使用 anime.js 弹性动画而非 CSS transition */
  useAnime?: boolean;
};

/**
 * 旧版 Reveal：仅做 IO 触发的简单 fade-up。
 * 与新版 RevealStack 不冲突；当只需要轻量入场时使用它，复杂场景请使用 RevealStack。
 * 支持 useAnime prop 启用 anime.js 弹性动画效果。
 */
export default function Reveal({ children, className, delay = 0, useAnime = false }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (useAnime && !reducedMotion) {
            window.setTimeout(() => {
              anime({
                targets: element,
                opacity: [0, 1],
                translateY: [24, 0],
                scale: [0.96, 1],
                duration: 700,
                easing: "easeOutExpo",
              });
              setVisible(true);
            }, delay * 1000);
          } else {
            window.setTimeout(() => setVisible(true), delay * 1000);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, useAnime, reducedMotion]);

  // 当使用 anime.js 时，初始样式通过 anime 控制
  if (useAnime && !reducedMotion) {
    return (
      <div
        ref={ref}
        className={cn("opacity-0 translate-y-6 scale-96 motion-reduce:transform-none motion-reduce:opacity-100 will-change-[opacity,transform]", className)}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition duration-700 ease-out motion-reduce:transform-none motion-reduce:opacity-100",
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
