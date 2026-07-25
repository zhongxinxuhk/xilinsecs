"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

type TimelineListProps = {
  items: Array<{
    year: string;
    title: string;
    description: string;
  }>;
};

export default function TimelineList({ items }: TimelineListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // 如果用户偏好减少动画，直接显示所有内容
    if (reducedMotion) {
      container.querySelectorAll(".timeline-item").forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      container.querySelectorAll(".timeline-dot").forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const timelineItems = container.querySelectorAll(".timeline-item");
          const timelineDots = container.querySelectorAll(".timeline-dot");

          // Animate timeline items with staggered slide-in
          anime({
            targets: timelineItems,
            translateX: [-40, 0],
            opacity: [0, 1],
            delay: anime.stagger(120),
            duration: 700,
            easing: "easeOutCubic",
          });

          // Animate dots with scale effect (opacity handled by parent)
          anime({
            targets: timelineDots,
            scale: [0, 1],
            delay: anime.stagger(120, { start: 200 }),
            duration: 600,
            easing: "easeOutExpo",
          });

          // Subtle ring pulse on each dot after it appears
          anime({
            targets: timelineDots,
            boxShadow: [
              '0 0 0 0px rgba(37,99,235,0.35)',
              '0 0 0 10px rgba(37,99,235,0)',
            ],
            delay: anime.stagger(120, { start: 800 }),
            duration: 900,
            easing: "easeOutQuad",
          });

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative ml-2 min-w-0 border-l border-blue-200 pl-6 sm:ml-4 sm:pl-8">
      {items.map((item, index) => (
        <div key={`${item.year}-${index}`} className="timeline-item relative pb-10 last:pb-0 opacity-0 -translate-x-10 motion-reduce:opacity-100 motion-reduce:translate-x-0 will-change-[opacity,transform]">
          <div className="timeline-dot absolute -left-[34px] top-1 h-6 w-6 rounded-full border-4 border-blue-100 bg-blue-600 motion-reduce:opacity-100 motion-reduce:scale-100 will-change-transform sm:-left-[42px]" style={{ transform: 'scale(0)' }} />
          <div className="glass-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 sm:tracking-[0.18em]">{item.year}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
