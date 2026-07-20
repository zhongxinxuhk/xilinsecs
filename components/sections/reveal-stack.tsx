"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type RevealDirection = "up" | "down" | "left" | "right" | "fade";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 触发动画的滚动起点偏移，单位 px */
  y?: number;
  x?: number;
  /** 延迟秒 */
  delay?: number;
  /** 持续秒 */
  duration?: number;
  direction?: RevealDirection;
  /** 元素第一次露出后才开始动画，避免重复触发 */
  once?: boolean;
  /** force enable even with reduced-motion */
  forceAnimate?: boolean;
};

const initialFor = (direction: RevealDirection, y: number, x: number) => {
  switch (direction) {
    case "up":
      return { autoAlpha: 0, y };
    case "down":
      return { autoAlpha: 0, y: -y };
    case "left":
      return { autoAlpha: 0, x };
    case "right":
      return { autoAlpha: 0, x: -x };
    case "fade":
      return { autoAlpha: 0 };
    default:
      return { autoAlpha: 0, y };
  }
};

/**
 * 滚动进入视口后做 GSAP 动画的 Reveal 组件。
 * 与旧版 Reveal 兼容（API 类似）：支持上下左右淡入、延迟、持续时长、单次触发。
 * 用户开启了 prefers-reduced-motion 时退化为直接可见，避免视觉不适。
 */
export default function Reveal({
  children,
  className,
  y = 28,
  x = 28,
  delay = 0,
  duration = 0.85,
  direction = "up",
  once = true,
  forceAnimate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches && !forceAnimate);
  }, [forceAnimate]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        initialFor(direction, y, x),
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, node);

    return () => ctx.revert();
  }, [reducedMotion, direction, y, x, delay, duration, once]);

  return (
    <div ref={ref} className={cn("opacity-0 motion-reduce:opacity-100", className)} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
