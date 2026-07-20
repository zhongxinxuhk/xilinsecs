import type { Metadata } from "next";
import { Activity, AlertTriangle, Clock4, ExternalLink, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { platformStatusPages } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import Reveal from "@/components/sections/reveal";
import RevealStack from "@/components/sections/reveal-stack";
import SlaStatusBoard from "@/components/sections/uptime-kuma-board";
import SmartLink from "@/components/ui/smart-link";

export const metadata: Metadata = buildMetadata({
  title: "SLA 服务运行状态披露",
  description:
    "希灵赛斯 SLA 服务运行状态披露：基于 Uptime Kuma 对外公开 API 服务、网站服务和信息化基础设施三类监控指标的可观测报告。",
  path: "/status/",
  image: "/source/index_imgs/hsd_index02.webp",
});

export default function StatusPage() {
  return (
    <>
      <PageHero
        kicker="SLA 服务运行状态披露"
        title="平台运行状态，对外公开。"
        description="基于 Uptime Kuma 实时拨测，对外披露希灵赛斯对外服务的可用率、响应时延与最近事件。所有数据每 60 秒自动刷新。"
        image="/source/index_imgs/hsd_index02.webp"
        actions={[
          { label: "前往希灵 AI 开放平台", href: "https://platform.sec.hn.cn" },
          { label: "联系运维团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space border-b border-blue-100 bg-white">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="披露范围"
              title="三类系统，全栈对外披露。"
              description="以下三个分项覆盖 API 服务、网站服务与信息化基础设施，均由 Uptime Kuma 持续拨测，结果直接展示在下方实时面板中。"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {platformStatusPages.map((group, index) => (
              <RevealStack key={group.slug} delay={index * 0.06}>
                <SmartLink href={group.href} className="group block h-full">
                  <div className="flex h-full flex-col gap-4 border border-blue-100 bg-white p-7 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(37,99,235,.12)]">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-700">
                      <span>SLA · 0{index + 1}</span>
                      <Activity className="h-4 w-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-950">{group.name}</h3>
                    <p className="text-sm leading-7 text-slate-600">{group.description}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-blue-100 pt-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock4 className="h-3 w-3" /> 实时拨测
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-700 transition group-hover:gap-2">
                        打开<ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </SmartLink>
              </RevealStack>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-gradient-to-b from-blue-50/55 to-white">
        <div className="site-shell space-y-10">
          {platformStatusPages.map((group, index) => (
            <Reveal key={group.slug} delay={index * 0.04}>
              <SlaStatusBoard
                endpoint={`https://sla.sec.hn.cn/api/status-page/${group.slug}`}
                slug={group.slug}
                pageUrl={group.href}
                title={`${group.name} · SLA 报告`}
                description={group.description}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-shell">
          <div className="border border-blue-100 bg-gradient-to-br from-blue-50/65 via-white to-cyan-50/40 p-8 md:p-12">
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">关于本次披露</p>
                <h2 className="heading-display mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">
                  数据如何被采集，为什么公开？
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  所有监测点由 Uptime Kuma 部署在全球与内网拨测节点上，按 30 秒频率发起点到点检查，并把心跳、可用率、最近事件以 JSON 形式对外暴露。本页面通过浏览器侧 fetch 实时拉取最近数据，并在前端做汇总展示。
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <ShieldCheck className="mt-1 h-4 w-4 flex-none text-emerald-600" />
                    <span>所有监测点都基于 TLS 1.3 加密回传；公共面板不会泄露 API Key 或内部标记。</span>
                  </li>
                  <li className="flex gap-3">
                    <Activity className="mt-1 h-4 w-4 flex-none text-blue-600" />
                    <span>状态变化会在 60 秒内反映到本面板，事件描述与最近心跳均来自 Uptime Kuma。</span>
                  </li>
                  <li className="flex gap-3">
                    <AlertTriangle className="mt-1 h-4 w-4 flex-none text-amber-600" />
                    <span>当 SLA 接口不可达（例如内部网络隔离），本页会回退为错误提示，并保留原始状态页直达链接。</span>
                  </li>
                </ul>
              </Reveal>
              <RevealStack direction="left">
                <div className="grid gap-3">
                  {platformStatusPages.map((group) => (
                    <SmartLink
                      key={group.slug}
                      href={group.href}
                      className="group flex items-center justify-between border border-blue-100 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-950">{group.name}</div>
                        <code className="mt-0.5 block break-all text-[11px] text-slate-500">{group.href}</code>
                      </div>
                      <ExternalLink className="h-4 w-4 flex-none text-blue-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </SmartLink>
                  ))}
                </div>
              </RevealStack>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
