import {
  ArrowUpRight,
  Braces,
  CheckCircle2,
  KeyRound,
  Network,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/sections/reveal";
import { ButtonLink } from "@/components/ui/button";

const XILING_AI_URL = "https://cstk.sec.hn.cn";

const capabilities = [
  {
    icon: Network,
    title: "统一 API 入口",
    description: "用更清晰的接入路径连接 AI 能力，减少多套接口带来的重复适配工作。",
  },
  {
    icon: Braces,
    title: "面向开发集成",
    description: "适用于网站、应用与内部业务系统，让 AI 能力更快进入真实业务流程。",
  },
  {
    icon: KeyRound,
    title: "集中调用管理",
    description: "通过统一平台组织接口调用，为团队后续扩展和维护建立稳定基础。",
  },
];

type XilingAiSpotlightProps = {
  compact?: boolean;
};

export default function XilingAiSpotlight({ compact = false }: XilingAiSpotlightProps) {
  return (
    <section className={compact ? "section-space !pt-12 sm:!pt-16 md:!pt-20" : "section-space"} id="xiling-ai">
      <div className="site-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-sky-200/80 bg-white/90 px-6 py-8 text-slate-950 shadow-[0_24px_80px_rgba(14,116,144,0.12)] backdrop-blur-xl sm:px-8 sm:py-10 md:px-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_88%_82%,rgba(59,130,246,0.12),transparent_36%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(14,116,144,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,.12)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-cyan-50/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  新产品上线
                </div>
                <p className="mt-7 text-sm font-semibold tracking-[0.24em] text-cyan-700">XILING AI</p>
                <h2 className="heading-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  希灵 AI
                  <span className="mt-2 block text-cyan-700">API 中转站</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  面向开发者与企业团队的 AI API 接入平台。以统一入口连接 AI 能力，帮助网站、应用和业务系统更快完成智能化集成。
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
                  {["统一接入", "快速集成", "面向业务落地"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600" />
                      {item}
                    </span>
                  ))}
                </div>
                <ButtonLink
                  href={XILING_AI_URL}
                  size="lg"
                  className="mt-8 bg-[#0066FF] text-white shadow-[0_18px_40px_rgba(37,99,235,0.20)] hover:bg-[#0052CC] dark:bg-[#0066FF] dark:text-white dark:hover:bg-[#0052CC]"
                >
                  访问希灵 AI
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>

              <div className="rounded-[28px] border border-sky-200/80 bg-white/75 p-3 shadow-[0_18px_50px_rgba(14,116,144,0.10)] backdrop-blur sm:p-4">
                <div className="mb-3 flex items-center gap-2 px-2 text-xs text-slate-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-2 font-mono">cstk.sec.hn.cn</span>
                </div>
                <div className="grid gap-3">
                  {capabilities.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className="group rounded-[20px] border border-sky-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-cyan-700">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-cyan-600/70">0{index + 1}</span>
                              <h3 className="font-semibold text-slate-950">{item.title}</h3>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
