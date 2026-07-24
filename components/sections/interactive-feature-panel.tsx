"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import SmartLink from "@/components/ui/smart-link";

export type InteractivePanelItem = {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
  color?: string;
  content?: string;
  href?: string;
  linkLabel?: string;
  bullets?: string[];
};

type InteractiveFeaturePanelProps = {
  items: InteractivePanelItem[];
  className?: string;
  /** 是否默认展开第一项 */
  defaultExpanded?: number;
};

/**
 * 可交互展开的功能面板。
 * 借鉴 mingheng.xin 的 feature accordion 设计：
 * - 左侧数字高亮 + 竖线指示器
 * - 点击展开内容区
 * - 悬停/激活时数字和边框颜色渐变
 */
export default function InteractiveFeaturePanel({
  items,
  className,
  defaultExpanded = 0,
}: InteractiveFeaturePanelProps) {
  const [expanded, setExpanded] = useState<number | null>(defaultExpanded);

  const toggle = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start", className)}>
      {/* 左侧：列表 */}
      <div className="border-t border-blue-100">
        {items.map((item, index) => {
          const Icon = item.icon;
          const accentColor = item.color ?? "#3b82f6";
          const isExpanded = expanded === index;

          return (
            <div
              key={item.number}
              className={cn(
                "group relative grid grid-cols-[auto_1fr_auto] gap-x-5 items-center py-5 border-b border-blue-100 cursor-pointer transition-colors duration-500",
                isExpanded && "bg-blue-50/30"
              )}
              onClick={() => toggle(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(index);
                }
              }}
              aria-expanded={isExpanded}
            >
              {/* 左侧竖线指示器 */}
              <span
                className={cn(
                  "absolute left-0 top-0 h-full w-0.5 origin-top transition-transform duration-500",
                  isExpanded ? "scale-y-100" : "scale-y-0"
                )}
                style={{ backgroundColor: accentColor }}
              />

              {/* 数字 */}
              <span
                className={cn(
                  "font-mono text-2xl md:text-3xl font-light tabular-nums transition-colors duration-500",
                  isExpanded ? "text-blue-600" : "text-slate-400"
                )}
                style={isExpanded ? { color: accentColor } : undefined}
              >
                {item.number}
              </span>

              {/* 标题区 */}
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  {Icon && (
                    <Icon
                      className="w-4 h-4 shrink-0 transition-colors duration-500"
                      style={{ color: isExpanded ? accentColor : "#94a3b8" }}
                    />
                  )}
                  <h3
                    className={cn(
                      "text-base md:text-lg font-semibold transition-colors duration-500 truncate",
                      isExpanded ? "text-slate-950" : "text-slate-600"
                    )}
                  >
                    {item.title}
                  </h3>
                </div>
                {item.subtitle && (
                  <p className="text-xs font-mono uppercase tracking-[0.1em] text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>

              {/* 展开箭头 */}
              <span
                className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0",
                  isExpanded
                    ? "border-blue-400/50 text-blue-600 rotate-180"
                    : "border-blue-100 text-slate-400"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          );
        })}
      </div>

      {/* 右侧：内容预览区 */}
      <div className="relative min-h-[320px] border border-blue-100 bg-white rounded-lg overflow-hidden">
        {items.map((item, index) => {
          const isExpanded = expanded === index;
          const accentColor = item.color ?? "#3b82f6";

          return (
            <div
              key={`content-${item.number}`}
              className={cn(
                "absolute inset-0 p-8 transition-all duration-500 ease-out",
                isExpanded
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-4 pointer-events-none"
              )}
              style={{ ["--accent" as string]: accentColor }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-sm font-mono tabular-nums font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                >
                  {item.number}
                </span>
                <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              </div>

              <p className="text-sm leading-7 text-slate-600 mb-6">{item.description}</p>

              {item.content && (
                <p className="text-sm leading-7 text-slate-500 mb-6">{item.content}</p>
              )}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-slate-600">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.href && (
                <SmartLink
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {item.linkLabel ?? "了解更多"}
                  <ArrowUpRight className="w-4 h-4" />
                </SmartLink>
              )}
            </div>
          );
        })}

        {/* 空状态 */}
        {expanded === null && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-slate-400">选择左侧功能项以预览详情</p>
          </div>
        )}
      </div>
    </div>
  );
}
