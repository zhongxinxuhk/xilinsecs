import { ArrowUpRight, Braces, KeyRound, Network } from "lucide-react";
import Reveal from "@/components/sections/reveal";
import { ButtonLink } from "@/components/ui/button";

const XILING_AI_URL = "https://cstk.sec.hn.cn";
const capabilities = [
  { icon: Network, title: "统一 API 入口", description: "通过统一接口接入 AI 能力，减少重复适配。" },
  { icon: Braces, title: "面向开发集成", description: "适用于网站、应用与企业内部业务系统。" },
  { icon: KeyRound, title: "集中调用管理", description: "集中组织接口调用，便于后续扩展与维护。" },
];

type XilingAiSpotlightProps = { compact?: boolean };

export default function XilingAiSpotlight({ compact = false }: XilingAiSpotlightProps) {
  return (
    <section className={compact ? "section-space !pt-16" : "section-space"} id="xiling-ai">
      <div className="site-shell">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">新产品 · XILING AI</p>
                <h2 className="heading-display mt-4 text-4xl font-semibold text-zinc-950 sm:text-5xl">希灵 AI</h2>
                <p className="mt-3 text-xl font-medium text-zinc-500">专业技术智能体调用服务</p>
                <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600">
                  面向开发者与企业团队的 AI API 接入平台，帮助网站、应用和业务系统快速集成智能化能力。
                </p>
                <ButtonLink href={XILING_AI_URL} size="lg" className="mt-8">
                  访问希灵 AI
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>
              <div className="border-t border-zinc-200 bg-zinc-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="grid gap-3">
                  {capabilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article key={item.title} className="rounded-xl border border-zinc-200 bg-white p-5">
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-black text-white">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-zinc-950">{item.title}</h3>
                            <p className="mt-1.5 text-sm leading-6 text-zinc-600">{item.description}</p>
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
