"use client";

import { useEffect, useRef, useMemo } from "react";
import anime from "animejs";

type AnimeScrollOptions = {
  /** 触发阈值 0-1，默认 0.2 */
  threshold?: number;
  /** 是否只触发一次 */
  once?: boolean;
  /** anime.js 动画配置 */
  animeConfig?: anime.AnimeParams;
  /** 初始状态样式 */
  initialStyles?: Record<string, string>;
};

/**
 * 基于 IntersectionObserver + anime.js 的滚动触发动画 hook
 * 用于在元素进入视口时执行 anime.js 动画
 * 
 * 优化点：
 * - 使用 useMemo 稳定化对象引用，避免无限重渲染
 * - 正确处理 reduced-motion 偏好
 * - 清理动画实例防止内存泄漏
 */
export function useAnimeScroll<T extends HTMLElement>(
  options: AnimeScrollOptions = {}
) {
  const ref = useRef<T>(null);
  const animationRef = useRef<anime.AnimeInstance | null>(null);
  
  // 稳定化配置对象引用
  const {
    threshold = 0.2,
    once = true,
    animeConfig = {},
    initialStyles = {},
  } = options;
  
  const stableAnimeConfig = useMemo(() => animeConfig, [JSON.stringify(animeConfig)]);
  const stableInitialStyles = useMemo(() => initialStyles, [JSON.stringify(initialStyles)]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const applyStyles = (styles: Record<string, string>) => {
      Object.entries(styles).forEach(([key, value]) => {
        element.style.setProperty(key, value);
      });
    };

    const clearStyles = (styles: Record<string, string>) => {
      Object.keys(styles).forEach((key) => {
        element.style.removeProperty(key);
      });
    };

    // 检查是否启用 reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      // 如果用户偏好减少动画，直接显示最终状态
      clearStyles(stableInitialStyles);
      return;
    }

    // 应用初始样式
    applyStyles(stableInitialStyles);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 清理之前的动画
          if (animationRef.current) {
            animationRef.current.pause();
          }
          
          animationRef.current = anime({
            targets: element,
            easing: "easeOutCubic",
            ...stableAnimeConfig,
          });

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          // 如果不是一次性，可以在离开时重置
          applyStyles(stableInitialStyles);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [threshold, once, stableAnimeConfig, stableInitialStyles]);

  return ref;
}

/**
 * 创建弹性滚动入场动画的便捷 hook
 */
export function useBounceInScroll<T extends HTMLElement>() {
  return useAnimeScroll<T>({
    threshold: 0.15,
    once: true,
    initialStyles: {
      opacity: "0",
      transform: "translateY(40px) scale(0.95)",
    },
    animeConfig: {
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.95, 1],
      duration: 700,
      easing: "easeOutExpo",
    },
  });
}

/**
 * 创建淡入滑动动画的便捷 hook
 */
export function useFadeSlideInScroll<T extends HTMLElement>(direction: "up" | "down" | "left" | "right" = "up") {
  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(30px)",
    right: "translateX(-30px)",
  };

  return useAnimeScroll<T>({
    threshold: 0.15,
    once: true,
    initialStyles: {
      opacity: "0",
      transform: transforms[direction],
    },
    animeConfig: {
      opacity: [0, 1],
      translateY: direction === "up" ? [30, 0] : direction === "down" ? [-30, 0] : 0,
      translateX: direction === "left" ? [30, 0] : direction === "right" ? [-30, 0] : 0,
      duration: 700,
      easing: "easeOutCubic",
    },
  });
}
