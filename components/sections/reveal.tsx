"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * 旧版 Reveal：仅做 IO 触发的简单 fade-up。
 * 与新版 RevealStack 不冲突；当只需要轻量入场时使用它，复杂场景请使用 RevealStack。
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setVisible(true), delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

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
