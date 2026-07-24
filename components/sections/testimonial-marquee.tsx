"use client";

import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TestimonialMarqueeProps = {
  testimonials: Testimonial[];
  /** 每组显示的 testimonials 数量 */
  rows?: number;
  /** 滚动速度，秒 */
  speed?: number;
  className?: string;
};

/**
 * 自动滚动用户证言走马灯。
 * 借鉴 mingheng.xin 的 social proof marquee 设计：
 * CSS animation 驱动无限循环滚动，hover 时暂停。
 */
export default function TestimonialMarquee({
  testimonials,
  rows = 1,
  speed = 40,
  className,
}: TestimonialMarqueeProps) {
  if (testimonials.length === 0) return null;

  // 复制两份以实现无缝循环
  const doubled = [...testimonials, ...testimonials];

  const marqueeContent = (
    <div
      className="marquee-track flex shrink-0 gap-10 pr-10"
      style={{
        animationDuration: `${speed}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    >
      {doubled.map((item, i) => (
        <div
          key={`${item.author}-${i}`}
          className="w-[340px] md:w-[400px] shrink-0 border-l border-blue-200/60 pl-6 py-1"
        >
          <Quote className="w-4 h-4 text-blue-400/60 mb-4" />
          <p className="text-sm leading-7 text-slate-600 mb-5">{item.quote}</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {item.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm text-slate-900 font-medium leading-tight">{item.author}</div>
              <div className="text-[11px] text-slate-500">{item.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-container overflow-hidden py-4", className)}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="marquee-wrap flex"
          style={{
            animationDirection: rowIndex % 2 === 0 ? "normal" : "reverse",
            animationDuration: `${speed + rowIndex * 8}s`,
          }}
        >
          {marqueeContent}
        </div>
      ))}
    </div>
  );
}
