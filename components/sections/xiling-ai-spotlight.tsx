"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveIcon } from "@/lib/icon-resolver";

const XILING_AI_URL = "https://platform.sec.hn.cn";
const capabilities = [
  { icon: "Network", title: "统一 API 入口", description: "减少多套接口的重复适配，集中治理。", color: "from-blue-500/85 to-cyan-500/85" },
  { icon: "Braces", title: "开发集成", description: "兼容 OpenAI 风格接口，对接网站、应用与业务系统。", color: "from-cyan-500/85 to-emerald-500/85" },
  { icon: "KeyRound", title: "调用管理", description: "便于团队持续扩展、配额控制与审计追溯。", color: "from-emerald-500/85 to-blue-500/85" },
];

const stats = [
  { value: "99.95%", label: "API 可用率" },
  { value: "< 206ms", label: "首次响应" },
  { value: "5+", label: "推理路由" },
];

type XilingAiSpotlightProps = { compact?: boolean };

export default function XilingAiSpotlight({ compact = false }: XilingAiSpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".xiling-capability",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".xiling-stat",
        { autoAlpha: 0, scale: 0.92, y: 10 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, reducedMotion]);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x: relativeX, y: relativeY });
    if (visualRef.current && !reducedMotion) {
      gsap.to(visualRef.current, {
        rotateY: relativeX * 9,
        rotateX: -relativeY * 9,
        duration: 0.6,
        ease: "power3.out",
        transformPerspective: 900,
      });
    }
  };

  const handleLeave = () => {
    setMouse({ x: 0, y: 0 });
    if (visualRef.current && !reducedMotion) {
      gsap.to(visualRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-50/45 via-white to-cyan-50/45",
        compact && "border-y"
      )}
      id="xiling-ai"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:linear-gradient(to_right,black,transparent_70%)]"
      />

      <div className="site-shell relative grid items-stretch gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative flex flex-col justify-center py-16 sm:py-20 lg:py-24 lg:pr-14">
          <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-blue-300/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -left-16 top-2/3 h-48 w-48 rounded-full bg-cyan-300/15 blur-2xl" aria-hidden />
          
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/60 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[.18em] text-blue-700">新产品 · XILING AI</span>
          </div>
          
          <h2 className="heading-display mt-6 text-5xl font-semibold text-slate-950 sm:text-6xl lg:text-7xl">
            希灵
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">AI</span>
          </h2>
          <p className="mt-4 text-xl font-medium text-cyan-700">专业技术智能体调用服务</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">面向开发者与企业团队的 AI API 接入平台，让智能能力更快进入真实业务系统。支持多模型路由、调用审计、配额管理和团队协作。</p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="xiling-stat group relative rounded-xl border border-blue-100 bg-white/80 p-4 text-center backdrop-blur-sm transition-all duration-500 hover:border-blue-200 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]">
                <div className="text-xl font-bold tabular-nums text-slate-950 transition-colors duration-300 group-hover:text-blue-600 sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <ButtonLink href={XILING_AI_URL} size="lg" className="mt-8 w-full sm:w-auto">
            访问希灵 AI 开放平台<ArrowUpRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>
        </div>

        <div className="relative">
          <div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              ref={visualRef}
              className="relative grid h-full grid-cols-1 gap-4 rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-[0_8px_40px_rgba(37,99,235,0.06)] backdrop-blur-sm md:grid-cols-3"
              style={{ transformStyle: "preserve-3d", transform: "rotateX(0deg) rotateY(0deg)" }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 via-transparent to-cyan-50/40" />
              {capabilities.map((item, index) => {
                const Icon = resolveIcon(item.icon);
                return (
                  <article
                    key={item.title}
                    className="xiling-capability relative flex flex-col gap-4 rounded-xl border border-blue-100 bg-white/95 p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.12)] md:col-span-1"
                  >
                    <div className={cn("h-1 w-full rounded-full bg-gradient-to-r", item.color)} />
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-blue-600">0{index + 1}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                );
              })}

              <div className="col-span-full -mt-2 border-t border-dashed border-blue-200/80 pt-4 text-xs leading-6 text-slate-500">
                <span className="font-semibold text-blue-700">悬浮卡片 ·</span> 跟随光标做 3D 倾斜，可直接点击进入希灵 AI 开放平台。
                <span className="ml-2 inline-block tabular-nums text-blue-700">
                  ( {mouse.x.toFixed(2)}, {mouse.y.toFixed(2)} )
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
