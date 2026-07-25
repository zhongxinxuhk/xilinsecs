import type { Metadata } from "next";
import { ArrowUpRight, Cpu, GaugeCircle, ShieldCheck, Zap, Workflow, KeyRound, Network } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { platform, platformCapabilities, platformMetrics, platformStatusPages } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";
import RevealStack from "@/components/sections/reveal-stack";
import SpotlightCard from "@/components/sections/spotlight-marquee";
import AnimatedMetric from "@/components/sections/digit-meter";
import { ButtonLink } from "@/components/ui/button";
import SmartLink from "@/components/ui/smart-link";

export const metadata: Metadata = buildMetadata({
  title: "希灵 AI 开放平台",
  description:
    "希灵 AI 开放平台：面向开发者与企业团队的 AI 接入能力，统一入口、配额、可观测，让智能能力快速进入真实业务系统。",
  path: "/platform/",
  image: "/source/index_imgs/ihaikou_index01.webp",
});

const accentFlow = [
  { label: "统一入口", icon: Network, hue: "from-blue-500/85 to-cyan-500/85" },
  { label: "工作流编排", icon: Workflow, hue: "from-cyan-500/85 to-emerald-500/85" },
  { label: "鉴权与计量", icon: KeyRound, hue: "from-emerald-500/85 to-blue-500/85" },
  { label: "可观测告警", icon: GaugeCircle, hue: "from-blue-500/85 to-purple-500/85" },
];

const slaHighlights = [
  {
    label: "核心 API",
    value: "99.95%",
    description: "近 90 天 SLA 公开统计，覆盖 API 网关与推理路由。",
  },
  {
    label: "故障平均恢复",
    value: "12 分钟",
    description: "由 24×7 的监控告警与自动故障切换支撑。",
  },
  {
    label: "主动拨测频率",
    value: "30 秒",
    description: "外部监控点持续对服务可用性进行验证。",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        kicker="希灵 AI · 开放平台"
        title="让 AI 接入，像调用一个稳定 API 那样简单。"
        description={platform.description}
        image="/source/index_imgs/ihaikou_index01.webp"
        actions={[
          { label: "前往开放平台", href: platform.url },
          { label: "查看 SLA 状态披露", href: "https://sla.sec.hn.cn/status/api-services", variant: "outline" },
        ]}
      />

      <section className="section-space border-b border-blue-100 bg-white">
        <div className="site-shell grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">核心架构</p>
            <h2 className="heading-display mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
              一条贯穿接入、推理、治理的实时数据流。
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              从请求进入 API 网关，到推理、工具调用、可观测输出，希灵 AI 开放平台在每一段都预留了清晰的接入点和可治理的扩展位。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={platform.url}>访问平台<ArrowUpRight className="ml-2 h-4 w-4" /></ButtonLink>
              <ButtonLink href="/contact/" variant="outline">申请企业接入</ButtonLink>
            </div>
          </Reveal>
          <RevealStack direction="up" delay={0.1}>
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.16),transparent_55%)]" aria-hidden />
              <div className="rainbow-panel relative grid grid-cols-2 gap-4 p-6 md:p-8">
                {accentFlow.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="relative overflow-hidden border border-blue-100 bg-white p-4">
                      <div className={cn(`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${step.hue}`)} />
                      <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mt-3 text-sm font-semibold text-slate-950">{step.label}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[.12em] text-blue-600">Step 0{index + 1}</div>
                    </div>
                  );
                })}
                <div className="col-span-2 border border-blue-100 bg-blue-50/60 p-4 text-xs leading-6 text-slate-600">
                  <span className="font-semibold text-blue-700">实时指标 ·</span>
                  平台每 5 秒聚合一次调用状态，慢请求与异常即刻反映在 SLA 页面。
                </div>
              </div>
            </div>
          </RevealStack>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-gradient-to-br from-blue-50/55 via-white to-cyan-50/45">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="能力清单"
              title="六块能力，构成一个可以即用的开放平台。"
              description="覆盖从调用方式、编排到可观测的完整闭环，按需启用，按团队规模伸缩。"
            />
          </Reveal>
          <div className="mt-12">
            <Reveal>
              <IconCardGrid items={platformCapabilities} columns="three" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-white">
        <div className="site-shell">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">关键指标</p>
            <h2 className="heading-display mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
              平台表现，从数字开始。
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              以下指标来自希灵 AI 开放平台过去 90 天的运维与可观测数据。
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platformMetrics.map((metric, index) => (
              <RevealStack key={metric.label} delay={index * 0.08}>
                <SpotlightCard className="h-full p-7">
                  <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-blue-600">Metric · 0{index + 1}</div>
                  <div className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">
                    <AnimatedMetric text={metric.value} />
                  </div>
                  <div className="mt-3 text-base font-semibold text-slate-900">{metric.label}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{metric.description}</p>
                </SpotlightCard>
              </RevealStack>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-gradient-to-br from-cyan-50/40 via-white to-blue-50/40">
        <div className="site-shell">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">SLA 服务运行状态披露</p>
            <h2 className="heading-display mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
              平台运行状态，公开透明。
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              希灵 AI 开放平台的所有关键能力均接入 Uptime Kuma 实时监控，对外披露运行状态。下方为站点当前 SLA 报告，详细监测项可在状态页查看。
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {slaHighlights.map((item, index) => (
              <RevealStack key={item.label} delay={index * 0.08}>
                <SpotlightCard className="h-full p-7" glow="rgba(8,145,178,0.18)">
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-700">
                    <span>SLA · {item.label}</span>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-slate-950 md:text-4xl">{item.value}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </SpotlightCard>
              </RevealStack>
            ))}
          </div>

          <div className="mt-12">
            <Reveal>
              <div className="border border-blue-100 bg-white">
                <header className="border-b border-blue-100 bg-blue-50/50 px-6 py-4">
                  <h3 className="text-base font-semibold text-slate-950">SLA 状态披露入口</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    点击下方任一状态页，进入完整 SLA 报告（含 API 服务、网站服务、信息化基础设施）。
                  </p>
                </header>
                <div className="grid divide-y divide-blue-100 md:grid-cols-3 md:divide-x md:divide-y-0">
                  {platformStatusPages.map((group) => (
                    <SmartLink
                      key={group.slug}
                      href={group.href}
                      className="group flex flex-col gap-3 p-6 transition hover:bg-blue-50/40"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                        <span>{group.name}</span>
                        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-sm leading-6 text-slate-600">{group.description}</p>
                      <code className="mt-auto break-all rounded bg-blue-50 px-2 py-1 text-[11px] text-blue-700">{group.href}</code>
                    </SmartLink>
                  ))}
                </div>
                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-blue-100 bg-white px-6 py-4 text-xs text-slate-500">
                  <span>说明 · 状态页基于 Uptime Kuma 部署，监测范围含本平台与外围交付业务系统。</span>
                  <a href="https://sla.sec.hn.cn/status/api-services" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">查看状态页 →</a>
                </footer>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
