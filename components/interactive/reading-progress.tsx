"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleScroll = useCallback(() => {
    // 使用 RAF 节流，避免每帧都创建动画
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      // 直接设置宽度，使用 CSS transition 而不是 anime.js
      // 对于进度条这种高频更新，CSS transition 性能更好
      if (barRef.current) {
        barRef.current.style.width = `${newProgress}%`;
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-[width] duration-150 ease-out will-change-[width]"
        style={{ width: "0%", transition: reducedMotion ? "none" : undefined }}
      />
    </div>
  );
}
