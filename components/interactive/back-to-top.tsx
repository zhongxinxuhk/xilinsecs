"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);
  const lastVisibleRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleScroll = useCallback(() => {
    const shouldBeVisible = window.scrollY > 400;
    
    // 只在状态变化时触发动画，避免每帧都创建动画
    if (shouldBeVisible !== lastVisibleRef.current) {
      lastVisibleRef.current = shouldBeVisible;
      setVisible(shouldBeVisible);

      // 尊重 reduced-motion 偏好
      if (reducedMotion) {
        if (buttonRef.current) {
          buttonRef.current.style.opacity = shouldBeVisible ? "1" : "0";
          buttonRef.current.style.transform = "none";
        }
        return;
      }

      // 使用 anime.js 弹性动画
      if (buttonRef.current) {
        // 清理之前的动画
        if (animationRef.current) {
          animationRef.current.pause();
        }
        
        animationRef.current = anime({
          targets: buttonRef.current,
          opacity: shouldBeVisible ? [0, 1] : [1, 0],
          translateY: shouldBeVisible ? [20, 0] : [0, 20],
          scale: shouldBeVisible ? [0.8, 1] : [1, 0.8],
          duration: 400,
          easing: shouldBeVisible ? "easeOutExpo" : "easeOutQuad",
        });
      }
    }
  }, [reducedMotion]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [handleScroll]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到顶部"
      className={[
        "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-300 hover:bg-white hover:text-slate-900 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 will-change-[opacity,transform]",
        visible ? "" : "pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
