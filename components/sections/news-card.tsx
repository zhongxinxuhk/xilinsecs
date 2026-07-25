"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

type NewsCardProps = {
  item: {
    title: string;
    date: string;
    summary: string;
    href: string;
    heroImage: string;
  };
};

export default function NewsCard({ item }: NewsCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || hasAnimated.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // 如果用户偏好减少动画，直接显示内容
    if (reducedMotion) {
      card.style.opacity = "1";
      card.style.transform = "none";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          anime({
            targets: card,
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            duration: 700,
            easing: "easeOutCubic",
          });

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={cardRef} className="glass-card min-w-0 overflow-hidden opacity-0 translate-y-10 scale-95 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 transition-all duration-500 ease-out hover:shadow-[0_20px_60px_rgba(37,99,235,0.12)] hover:-translate-y-1 active:scale-[0.99] will-change-[opacity,transform]">
      <div className="relative h-48 overflow-hidden">
        <Image src={item.heroImage} alt={item.title} fill className="object-cover transition-transform duration-700 ease-out hover:scale-105" />
      </div>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 sm:tracking-[0.18em]">{item.date}</p>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
        </div>
        <ButtonLink href={item.href} variant="ghost" className="group px-0">
          <span className="min-w-0">阅读更多</span>
          <ArrowUpRight className="ml-2 h-4 w-4 flex-none transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
