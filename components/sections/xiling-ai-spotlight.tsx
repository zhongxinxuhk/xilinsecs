import { ArrowUpRight, Braces, KeyRound, Network } from "lucide-react";
import Reveal from "@/components/sections/reveal";
import { ButtonLink } from "@/components/ui/button";

const XILING_AI_URL = "https://cstk.sec.hn.cn";
const capabilities = [
  { icon: Network, title: "统一 API 入口", description: "通过统一接口接入 AI 能力，减少重复适配。", tone: "blue" },
  { icon: Braces, title: "面向开发集成", description: "适用于网站、应用与企业内部业务系统。", tone: "cyan" },
  { icon: KeyRound, title: "集中调用管理", description: "集中组织接口调用，便于后续扩展与维护。", tone: "emerald" },
] as const;

const toneClasses = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  cyan: "border-cyan-100 bg-cyan-50 text-cyan-700",
  emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
};

type XilingAiSpotlightProps = { compact?: boolean };

export default function XilingAiSpotlight({ compact = false }: XilingAiSpotlightProps) {
  return (
    <section className={compact ? "section-space !pt-16" : "section-space"} id="xiling-ai">
      <div className="site-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-200 bg-gradient-to-br from-blue-50 via-white to-emerald-50 shadow-[0_24px_70px_rgba(8,145,178,0.12)]">
            <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                  新产品 · XILING AI
                </p>
                <h2 className="heading-display mt-5 text-4xl font-semibold text-slate-950 sm:text-5xl">希灵 AI</h2>
                <p className="mt-3 text-xl font-medium text-cyan-700">专业技术智能体调用服务</p>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                  面向开发者与企业团队的 AI API 接入平台，帮助网站、应用和业务系统快速集成智能化能力。
                </p>
                <ButtonLink href={XILING_AI_URL} size="lg" className="mt-8">
                  访问希灵 AI
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>
              <div className="border-t border-cyan-100 bg-white/55 p-5 backdrop-blur-sm sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="grid gap-3">
                  {capabilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="rounded-2xl border border-white bg-white/90 p-5 shadow-[0_10px_30px_rgba(37,99,235,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(37,99,235,0.12)]">
                        <div className="flex gap-4">
                          <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl border ${toneClasses[item.tone]}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-950">{item.title}</h3>
                            <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.description}</p>
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
