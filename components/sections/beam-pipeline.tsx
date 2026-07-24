"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type PipelineStep = {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
  color?: string;
};

type BeamPipelineProps = {
  steps: PipelineStep[];
  className?: string;
};

/**
 * 带光束连接线的步骤管道组件。
 * 借鉴 mingheng.xin 的 pipeline 设计：大号数字、渐变光束连接线、悬停动效。
 * 数字通过 CSS 变量控制颜色，连接线使用 CSS 动画模拟光束流动。
 */
export default function BeamPipeline({ steps, className }: BeamPipelineProps) {
  return (
    <div className={cn("relative", className)}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const accentColor = step.color ?? "#3b82f6";
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step.number}
            className="group relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0"
          >
            {/* 左侧：数字 + 连接线 */}
            <div className="flex flex-col items-center w-16 shrink-0">
              <span
                className="font-mono text-5xl md:text-6xl font-extralight leading-none tabular-nums transition-colors duration-500 group-hover:text-blue-600"
                style={{ color: accentColor }}
              >
                {step.number}
              </span>
              {!isLast && (
                <div
                  className="pipeline-beam-track flex-1 mt-4 min-h-[3rem] w-px"
                  style={
                    {
                      "--beam-color": accentColor,
                      "--beam-delay": `${index * 0.15}s`,
                    } as React.CSSProperties
                  }
                />
              )}
            </div>

            {/* 右侧：内容 */}
            <div className="pt-1 pb-2">
              <div className="flex items-center gap-3 mb-3">
                {Icon && (
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundColor: `${accentColor}1A`,
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                )}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-950">{step.title}</h3>
                  {step.subtitle && (
                    <p className="text-xs font-mono uppercase tracking-[0.12em] text-slate-500">{step.subtitle}</p>
                  )}
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-600 max-w-xl">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
