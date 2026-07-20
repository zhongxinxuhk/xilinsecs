"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type HeroFxProps = {
  selector: string;
  /** 增量每个字符包裹 <span class="char"> */
  splitChars?: boolean;
  /** 启动延迟 */
  delay?: number;
};

/**
 * 给已挂载到 DOM 的元素注入字符/词级拆分 + 入场动画。
 * 用法：在 layout 组件中放 <HeroFx selector="#hero-headline" />，
 *      对应元素的内部文本将被打散为字符并 staggered 入场。
 */
export default function HeroFx({ selector, splitChars = true, delay = 0.1 }: HeroFxProps) {
  const restored = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.querySelector(selector);
    if (!root || restored.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    restored.current = true;
    const children = Array.from(root.querySelectorAll<HTMLElement>(":scope > *"));
    if (!children.length) return;

    const elements: HTMLElement[] = [];
    children.forEach((child) => {
      const text = child.textContent ?? "";
      if (!text.trim()) {
        elements.push(child);
        return;
      }
      const parts = splitChars ? Array.from(text) : text.split(/(\s+)/);
      child.innerHTML = "";
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          child.append(document.createTextNode(part));
          return;
        }
        const span = document.createElement("span");
        span.textContent = part;
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        if (!splitChars) span.style.whiteSpace = "pre";
        child.appendChild(span);
        elements.push(span);
      });
    });

    gsap.fromTo(
      elements,
      { autoAlpha: 0, y: 28, rotateX: -25 },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.025,
        delay,
      }
    );
  }, [selector, splitChars, delay]);

  return null;
}
