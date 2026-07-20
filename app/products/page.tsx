import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { products } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "产品能力",
  description: "希灵 AI 开放平台，以及云与基础设施、软件应用、硬件与安全设备产品能力。",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="产品能力"
        title="为业务构建稳定、可扩展的技术底座。"
        description="覆盖 AI 接入、云与基础设施、软件应用以及硬件与安全设备。"
        image="/source/index_imgs/ihaikou_index01.webp"
        actions={[
          { label: "查看希灵 AI 开放平台", href: "/platform/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="border-b border-blue-100 bg-white">
        <div className="site-shell">
          <Link
            href="/platform/"
            className="group relative flex flex-col gap-3 border-x border-b border-blue-100 p-7 transition hover:bg-blue-50/40 sm:flex-row sm:items-center sm:justify-between md:p-10"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-600">希灵 AI · 开放平台</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950 sm:text-2xl">以一个 API 网关接入多模型能力</h2>
                <p className="mt-1 text-sm text-slate-500">统一入口、配额、可观测、安全审计。前往平台总览查看指标、能力与 SLA 披露。</p>
              </div>
            </div>
            <span className="inline-flex items-center text-sm font-semibold text-blue-700 transition group-hover:gap-2">
              访问 /platform/<ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="产品矩阵"
              title="三类交付产品"
              description="希灵 AI 提供面向开发者与企业的 API 接入能力；以下三类交付产品覆盖基础设施、软件系统与设备实施。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={products.map((item) => ({
                  title: item.title,
                  description: item.description,
                  icon: item.icon,
                  href: item.href,
                  bullets: item.features.slice(0, 3),
                }))}
                columns="three"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
