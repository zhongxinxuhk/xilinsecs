"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Cpu,
  Globe,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink } from "@/components/ui/button";
import SmartLink from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const XILING_AI_URL = "https://platform.sec.hn.cn";

const aiCapabilities = [
  {
    icon: MessageSquare,
    title: "智能对话",
    description: "接入大语言模型，为客户服务、内部知识库和业务咨询提供自然语言交互能力。",
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BrainCircuit,
    title: "内容生成",
    description: "自动撰写报告、方案文档和营销文案，释放团队创作时间，聚焦核心决策。",
    color: "#7c3aed",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: ShieldCheck,
    title: "安全智能",
    description: "AI 驱动的威胁检测与自动化响应，让安全运营从被动处置转向主动防御。",
    color: "#0891b2",
    gradient: "from-cyan-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "数据分析",
    description: "用自然语言查询业务数据，自动生成可视化报表和洞察建议。",
    color: "#0f9f7f",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Bot,
    title: "流程自动化",
    description: "将重复性审批、表单处理和通知推送交予 AI Agent，减少人工干预节点。",
    color: "#e48a12",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "多语言服务",
    description: "实时翻译与本地化，让企业内容和服务无缝覆盖多语种市场。",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-500",
  },
];

const aiStats = [
  { value: "99.95%", label: "API 可用率", suffix: "SLA" },
  { value: "< 206", label: "平均响应", suffix: "ms" },
  { value: "10+", label: "推理路由", suffix: "routes" },
  { value: "5", label: "安全检测层", suffix: "layers" },
];

export default function AIBusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ai-stat-item",
        { autoAlpha: 0, y: 20, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".ai-stats-row", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".ai-capability-card",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".ai-capabilities-grid", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".ai-hero-text",
        { autoAlpha: 0, filter: "blur(8px)", y: 10 },
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-b from-white via-blue-50/30 to-white"
      id="ai-business"
    >
      {/* 顶部大光晕 */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-400/12 via-cyan-400/6 to-transparent blur-[100px]" aria-hidden />

      {/* Hero 区 */}
      <div className="site-shell relative pt-20 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* 标签 */}
          <div className="ai-hero-text inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">AI Solutions</span>
          </div>

          {/* 主标题 */}
          <h2 className="ai-hero-text heading-display mt-6 text-4xl font-semibold leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl">
            让 AI 成为
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              业务增长引擎
            </span>
          </h2>
          <p className="ai-hero-text mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            不只是调用一个 API。从基础设施到业务场景，我们帮助企业把 AI 能力嵌入到真实工作流中——安全、可控、可审计。
          </p>

          {/* CTA */}
          <div className="ai-hero-text mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={XILING_AI_URL} size="lg" className="shadow-[0_8px_30px_rgba(37,99,235,0.25)]">
              探索希灵 AI 平台<ArrowUpRight className="ml-2 h-4 w-4" />
            </ButtonLink>
            <SmartLink
              href="/contact/request/"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              预约方案咨询
            </SmartLink>
          </div>
        </div>
      </div>

      {/* 数据统计条 */}
      <div className="ai-stats-row site-shell relative pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-3xl grid-cols-2 divide-x divide-blue-100 overflow-hidden rounded-2xl border border-blue-100 bg-white/70 shadow-[0_4px_24px_rgba(37,99,235,0.06)] backdrop-blur-sm sm:grid-cols-4">
          {aiStats.map((stat) => (
            <div
              key={stat.label}
              className="ai-stat-item flex flex-col items-center justify-center px-4 py-6 text-center sm:py-7"
            >
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold tabular-nums text-slate-950 sm:text-3xl">{stat.value}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-600">{stat.suffix}</span>
              </div>
              <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 能力卡片网格 */}
      <div className="site-shell relative pb-20 sm:pb-28">
        <div className="ai-capabilities-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <article
                key={cap.title}
                className={cn(
                  "ai-capability-card group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-500 sm:p-7",
                  activeCard === index
                    ? "border-blue-400/60 shadow-[0_16px_48px_rgba(37,99,235,0.12)]"
                    : "border-blue-100 shadow-[0_2px_12px_rgba(37,99,235,0.04)] hover:border-blue-200 hover:shadow-[0_12px_36px_rgba(37,99,235,0.1)] hover:-translate-y-1"
                )}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(0)}
              >
                {/* 顶部渐变条 */}
                <div className={cn("absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100", cap.gradient)} />

                {/* 图标 */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: `${cap.color}12`,
                    boxShadow:
                      activeCard === index ? `0 0 20px ${cap.color}20` : undefined,
                  }}
                >
                  <Icon
                    className="h-5 w-5 transition-colors duration-500"
                    style={{ color: cap.color }}
                  />
                </div>

                {/* 内容 */}
                <h3 className="text-lg font-semibold text-slate-950 transition-colors duration-300 group-hover:text-blue-700">
                  {cap.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-600">{cap.description}</p>

                {/* 底部装饰 */}
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 translate-x-0">
                  了解更多
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
