"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Braces, KeyRound, Network } from "lucide-react";
import { gsap } from "gsap";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const XILING_AI_URL = "https://platform.sec.hn.cn";
const capabilities = [
  { icon: Network, title: "统一 API 入口", description: "减少多套接口的重复适配，集中治理。", color: "from-blue-500/85 to-cyan-500/85" },
  { icon: Braces, title: "开发集成", description: "兼容 OpenAI 风格接口，对接网站、应用与业务系统。", color: "from-cyan-500/85 to-emerald-500/85" },
  { icon: KeyRound, title: "调用管理", description: "便于团队持续扩展、配额控制与审计追溯。", color: "from-emerald-500/85 to-blue-500/85" },
];

const stats = [
  { value: "99.95%", label: "API 可用率" },
  { value: "< 800ms", label: "首次响应" },
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
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">新产品 · XILING AI</p>
          <h2 className="heading-display mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">希灵 AI</h2>
          <p className="mt-3 text-xl font-medium text-cyan-700">专业技术智能体调用服务</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">面向开发者与企业团队的 AI API 接入平台，让智能能力更快进入真实业务系统。</p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="xiling-stat border-l border-blue-200 pl-4 first:border-l-0 first:pl-0">
                <div className="text-lg font-semibold tabular-nums text-slate-950 sm:text-2xl">{stat.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[.12em] text-slate-500">{stat.label}</div>
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
              className="relative grid h-full grid-cols-1 gap-4 border border-blue-100 bg-white/85 p-6 backdrop-blur-sm md:grid-cols-3"
              style={{ transformStyle: "preserve-3d", transform: "rotateX(0deg) rotateY(0deg)" }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-cyan-50/30" />
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="xiling-capability relative flex flex-col gap-4 border border-blue-100 bg-white/95 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(37,99,235,.10)] md:col-span-1"
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
