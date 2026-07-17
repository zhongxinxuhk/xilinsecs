import Image from "next/image";
import { ArrowRight, BriefcaseBusiness, HeartHandshake, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { homeHero, newsItems, products, projects, siteConfig, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import TimelineList from "@/components/sections/timeline-list";
import NewsCard from "@/components/sections/news-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";
import JsonLd from "@/components/seo/json-ld";
import XilingAiSpotlight from "@/components/sections/xiling-ai-spotlight";
import SmartLink from "@/components/ui/smart-link";

const deliveryFeatures = [
  { title: "需求与方案", description: "明确业务目标、现有环境、时间和预算边界。", icon: BriefcaseBusiness },
  { title: "实施与安全", description: "完成部署、联调、安全检查和交付验收。", icon: ShieldCheck },
  { title: "运维与支持", description: "提供持续运维、应急响应和后续技术支持。", icon: HeartHandshake },
];

export const metadata = buildMetadata({ title: "海口希灵赛斯：一家专注于信息化解决方案的科技公司", description: siteConfig.seoDescription, path: "/", image: siteConfig.heroImage });

export default function HomePage() {
  const leadProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.domain, logo: siteConfig.logo, description: siteConfig.description, address: { "@type": "PostalAddress", addressLocality: "海口", addressRegion: "海南", addressCountry: "CN" }, contactPoint: { "@type": "ContactPoint", email: siteConfig.email, contactType: "customer service" } }} />

      <PageHero kicker={homeHero.kicker} title={homeHero.title} description={homeHero.description} image={siteConfig.heroImage} actions={[homeHero.primaryCta, homeHero.secondaryCta]} />

      <section className="border-b border-blue-100 bg-white">
        <div className="site-shell grid grid-cols-2 divide-x divide-y divide-blue-100 sm:grid-cols-4 sm:divide-y-0">
          {["私有云与基础设施", "信息安全服务", "软件与业务系统", "设备与实施交付"].map((item, index) => (
            <div key={item} className="flex min-h-24 items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
              <span className="text-xs font-semibold text-blue-500">0{index + 1}</span>
              <span className="text-sm font-semibold text-slate-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <XilingAiSpotlight />

      <section className="section-space border-b border-blue-100 bg-white">
        <div className="site-shell">
          <Reveal><SectionHeading kicker="产品能力" title="从基础设施，到业务应用。" description="以清晰的产品边界，支撑企业持续建设、稳定运行和安全扩展。" /></Reveal>
          <div className="mt-12"><Reveal><IconCardGrid items={products.map((item) => ({ title: item.title, description: item.description, icon: item.icon, href: item.href, bullets: item.features.slice(0, 3) }))} columns="three" /></Reveal></div>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-gradient-to-b from-blue-50/55 to-white">
        <div className="site-shell">
          <Reveal><SectionHeading kicker="项目案例" title="真实环境中的交付成果。" description="从平台建设到故障恢复，用可验证的结果呈现技术价值。" /></Reveal>
          <div className="mt-12 grid border-l border-t border-blue-100 lg:grid-cols-[1.35fr_.65fr]">
            {leadProject ? (
              <SmartLink href={leadProject.href} className="group relative min-h-[560px] overflow-hidden border-b border-r border-blue-100 bg-slate-950">
                <Image src={leadProject.heroImage} alt={leadProject.title} fill className="object-cover opacity-75 transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan-200">{leadProject.category}</p>
                  <h3 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-5xl">{leadProject.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{leadProject.description}</p>
                  <span className="mt-7 inline-flex items-center text-sm font-semibold">查看案例<ArrowRight className="ml-2 h-4 w-4" /></span>
                </div>
              </SmartLink>
            ) : null}
            <div className="grid">
              {sideProjects.map((project, index) => (
                <SmartLink key={project.slug} href={project.href} className="group grid min-h-[280px] grid-cols-[.9fr_1.1fr] border-b border-r border-blue-100 bg-white">
                  <div className="relative overflow-hidden"><Image src={project.heroImage} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" /></div>
                  <div className="flex flex-col justify-between p-6">
                    <span className="text-xs font-semibold text-blue-500">0{index + 2}</span>
                    <div><p className="text-xs font-semibold uppercase tracking-[.12em] text-cyan-700">{project.category}</p><h3 className="mt-3 text-xl font-semibold text-slate-950">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p></div>
                    <ArrowRight className="mt-5 h-5 w-5 text-blue-600" />
                  </div>
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-white">
        <div className="site-shell grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <Reveal><SectionHeading kicker="交付流程" title="每一步，都清晰可控。" description="明确范围、节点和结果，让项目从方案到运维保持一致。" /></Reveal>
          <Reveal><IconCardGrid items={deliveryFeatures} columns="three" /></Reveal>
        </div>
      </section>

      <section className="section-space border-b border-blue-100 bg-gradient-to-br from-emerald-50/55 via-white to-blue-50/55">
        <div className="site-shell">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal><SectionHeading kicker="发展历程" title="持续建设，长期服务。" description="记录公司成立、业务合作与产品上线的重要节点。" /></Reveal>
            <Reveal><TimelineList items={timeline} /></Reveal>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal><SectionHeading kicker="企业动态" title="最新进展" description="产品发布、服务升级与合作动态。" /></Reveal>
            <SmartLink href="/news/" className="inline-flex items-center text-sm font-semibold text-blue-700">查看全部动态<ArrowRight className="ml-2 h-4 w-4" /></SmartLink>
          </div>
          <div className="mt-12 grid border-l border-t border-blue-100 md:grid-cols-2 xl:grid-cols-3">{newsItems.slice(0, 3).map((item) => <Reveal key={item.slug}><NewsCard item={item} /></Reveal>)}</div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28"><CtaBanner title="让技术方案真正服务于业务目标。" description="提交项目需求，团队将在一个工作日内与你联系。" primary={{ label: "提交项目需求", href: "/contact/request/" }} secondary={{ label: "与客户经理对话", href: siteConfig.wecomLink }} /></section>
    </>
  );
}
