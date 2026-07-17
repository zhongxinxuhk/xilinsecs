import { ArrowUpRight, Braces, KeyRound, Network } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

const XILING_AI_URL = "https://cstk.sec.hn.cn";
const capabilities = [
  { icon: Network, title: "统一 API 入口", description: "减少多套接口的重复适配。", color: "text-blue-700 bg-blue-50" },
  { icon: Braces, title: "开发集成", description: "接入网站、应用与业务系统。", color: "text-cyan-700 bg-cyan-50" },
  { icon: KeyRound, title: "调用管理", description: "便于团队持续扩展与维护。", color: "text-emerald-700 bg-emerald-50" },
];

type XilingAiSpotlightProps = { compact?: boolean };

export default function XilingAiSpotlight({ compact = false }: XilingAiSpotlightProps) {
  return (
    <section className={compact ? "border-y border-blue-100" : "border-b border-blue-100"} id="xiling-ai">
      <div className="site-shell grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative flex flex-col justify-center overflow-hidden py-16 pr-0 sm:py-20 lg:border-r lg:border-blue-100 lg:pr-14">
          <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">新产品 · XILING AI</p>
            <h2 className="heading-display mt-5 text-5xl font-semibold text-slate-950 sm:text-6xl">希灵 AI</h2>
            <p className="mt-3 text-xl font-medium text-cyan-700">专业技术智能体调用服务</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">面向开发者与企业团队的 AI API 接入平台，让智能能力更快进入真实业务系统。</p>
            <ButtonLink href={XILING_AI_URL} size="lg" className="mt-8">访问希灵 AI<ArrowUpRight className="ml-2 h-4 w-4" /></ButtonLink>
          </div>
        </div>
        <div className="grid border-t border-blue-100 lg:border-t-0 lg:grid-cols-3">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex min-h-56 flex-col justify-between border-b border-blue-100 p-7 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${item.color}`}><Icon className="h-5 w-5" /></div>
                <div className="mt-10">
                  <p className="text-xs font-semibold text-slate-400">0{index + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
