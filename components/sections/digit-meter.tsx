"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type AnimatedMetricProps = {
  /** 数字部分，可包含百分号、加号、毫秒等，解析时只对纯数字段做计数 */
  text: string;
  duration?: number;
  className?: string;
};

/**
 * 数字滚动进入视口后做 ease-out 计数动画。
 * 非数字字符保持原样，最终以 `[prefix][animated][suffix]` 输出。
 */
export default function AnimatedMetric({ text, duration = 1.6, className }: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [reducedMotion, setReducedMotion] = useState(true);

  const numericMatch = text.match(/-?\d+(\.\d+)?/);
  const numberPortion = numericMatch ? numericMatch[0] : null;
  const numericValue = numberPortion ? parseFloat(numberPortion) : null;
  const decimals = numberPortion && numberPortion.includes(".") ? numberPortion.split(".")[1].length : 0;
  const prefix = numericMatch ? text.slice(0, numericMatch.index!) : text;
  const suffix = numericMatch ? text.slice(numericMatch.index! + numericMatch[0].length) : "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || numericValue === null) {
      setDisplay(text);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion) {
          setDisplay(text);
          return;
        }
        const state = { current: 0 };
        gsap.to(state, {
          current: numericValue,
          duration,
          ease: "power3.out",
          onUpdate() {
            const value = decimals > 0 ? state.current.toFixed(decimals) : Math.round(state.current).toString();
            setDisplay(`${prefix}${value}${suffix}`);
          },
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, numericValue, decimals, prefix, suffix, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {numericValue === null ? text : display}
    </span>
  );
}
