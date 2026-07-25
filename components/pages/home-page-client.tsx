"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { homeHero, newsItems, products, projects, siteConfig, testimonials, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import TimelineList from "@/components/sections/timeline-list";
import NewsCard from "@/components/sections/news-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";
import RevealStack from "@/components/sections/reveal-stack";
import BeamPipeline from "@/components/sections/beam-pipeline";
import InteractiveFeaturePanel from "@/components/sections/interactive-feature-panel";
import TestimonialMarquee from "@/components/sections/testimonial-marquee";
import AmbientBackground from "@/components/sections/ambient-background";
import AIBusinessSection from "@/components/sections/ai-business-section";
import XilingAiSpotlight from "@/components/sections/xiling-ai-spotlight";
import SmartLink from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";
import type { PipelineStep } from "@/components/sections/beam-pipeline";
import type { InteractivePanelItem } from "@/components/sections/interactive-feature-panel";

const deliverySteps: PipelineStep[] = [
  {
    number: "01",
    title: "需求与方案",
    subtitle: "Discovery",
    description: "明确业务目标、现有环境、时间和预算边界。输出需求分析报告和定制方案建议书。",
    icon: "BookOpen",
    color: "#3b82f6",
  },
  {
    number: "02",
    title: "实施与安全",
    subtitle: "Implementation",
    description: "完成部署、联调、安全检查和交付验收。每个节点附带质量核查清单。",
    icon: "ShieldCheck",
    color: "#0891b2",
  },
  {
    number: "03",
    title: "运维与支持",
    subtitle: "Operations",
    description: "提供持续运维、应急响应和后续技术支持。建立知识库和标准操作流程。",
    icon: "HeartHandshake",
    color: "#0f9f7f",
  },
];

const servicePanelItems: InteractivePanelItem[] = [
  {
    number: "01",
    title: "私有云与基础设施",
    subtitle: "Infrastructure",
    description: "从 VMware 虚拟化到混合云架构，提供全栈基础设施规划、部署和持续运维服务。",
    icon: "Cloud",
    color: "#3b82f6",
    bullets: [
      "VMware vSphere / vSAN 集群设计与部署",
      "混合云 / 边缘节点架构规划",
      "存储与备份策略制定与实施",
      "性能监控与容量规划",
    ],
    href: "/services/vmware/",
    linkLabel: "了解私有云方案",
  },
  {
    number: "02",
    title: "信息安全服务",
    subtitle: "Cybersecurity",
    description: "覆盖漏洞扫描、渗透测试、安全加固和应急响应的全生命周期安全服务。",
    icon: "ShieldCheck",
    color: "#0891b2",
    bullets: [
      "漏洞扫描与渗透测试",
      "安全加固与基线配置",
      "态势感知平台部署",
      "应急响应与事件处置",
    ],
    href: "/services/security/",
    linkLabel: "了解安全服务",
  },
  {
    number: "03",
    title: "软件与业务系统",
    subtitle: "Development",
    description: "企业官网、业务门户、伙伴入口等定制开发，支持静态生成和低代码配置管理。",
    icon: "Globe",
    color: "#0f9f7f",
    bullets: [
      "企业官网 / 门户定制开发",
      "Next.js 静态生成与 SEO 优化",
      "低代码内容管理配置",
      "Pages 托管与持续部署",
    ],
    href: "/services/web/",
    linkLabel: "了解开发服务",
  },
  {
    number: "04",
    title: "设备与实施交付",
    subtitle: "Hardware",
    description: "从设备选型到实施交付，提供端到端的硬件供应链和项目全流程管理。",
    icon: "Workflow",
    color: "#e48a12",
    bullets: [
      "服务器 / 网络 / 安全设备选型",
      "到货验收与上架实施",
      "综合布线与环境部署",
      "操作培训与知识移交",
    ],
    href: "/services/hardware/",
    linkLabel: "了解设备服务",
  },
];

export default function HomePageClient() {
  const leadProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  return (
    <>
      <PageHero kicker={homeHero.kicker} title={homeHero.title} description={homeHero.description} image={siteConfig.heroImage} actions={[homeHero.primaryCta, homeHero.secondaryCta]} />

      <section className="relative border-b border-blue-100 bg-white overflow-hidden">
        <AmbientBackground variant="orb" orbColor="from-blue-500/10 via-blue-400/6 to-cyan-400/8" />
        <div className="site-shell relative grid grid-cols-2 divide-x divide-y divide-blue-100 sm:grid-cols-4 sm:divide-y-0">
          {[
            { label: "私有云与基础设施", hint: "VMware / 混合云 / 边缘节点", gradient: "from-blue-500 to-blue-600" },
            { label: "信息安全服务", hint: "漏洞扫描 / 安全咨询 / 态势感知", gradient: "from-cyan-500 to-cyan-600" },
            { label: "软件与业务系统", hint: "官网 / 业务门户 / 伙伴入口", gradient: "from-emerald-500 to-teal-600" },
            { label: "设备与实施交付", hint: "设备选型 / 实施交付 / 长期运维", gradient: "from-amber-500 to-orange-600" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="group relative flex min-h-28 cursor-default flex-col justify-center gap-1 px-4 py-5 transition-all duration-500 hover:bg-blue-50/40 sm:px-6 lg:px-8"
            >
              <span className="flex items-center gap-3">
                <span className={cn("text-xs font-bold transition-all duration-500 group-hover:scale-125 bg-gradient-to-r bg-clip-text text-transparent", item.gradient)}>0{index + 1}</span>
                <span className="text-sm font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-700">{item.label}</span>
              </span>
              <span className="overflow-hidden text-[11px] text-slate-500 max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100 group-hover:translate-y-1">
                {item.hint}
              </span>
              <span className={cn("absolute inset-x-4 bottom-3 h-px scale-x-0 bg-gradient-to-r transition-transform duration-700 group-hover:scale-x-100 sm:inset-x-6 lg:inset-x-8", item.gradient)} />
            </div>
          ))}
        </div>
      </section>

      <AIBusinessSection />

      <XilingAiSpotlight />

      <section className="section-space relative border-b border-blue-100 bg-white overflow-hidden">
        <AmbientBackground variant="grid" />
        <div className="site-shell relative">
          <RevealStack blur direction="blur"><SectionHeading kicker="产品能力" title="从基础设施，到业务应用。" description="以清晰的产品边界，支撑企业持续建设、稳定运行和安全扩展。" /></RevealStack>
          <div className="mt-12"><Reveal><IconCardGrid items={products.map((item) => ({ title: item.title, description: item.description, icon: item.icon, href: item.href, bullets: item.features.slice(0, 3) }))} columns="three" /></Reveal></div>
        </div>
      </section>

      <section className="section-space relative border-b border-blue-100 bg-white overflow-hidden">
        <AmbientBackground variant="orb" orbColor="from-emerald-500/8 via-blue-400/5 to-cyan-400/7" />
        <div className="site-shell relative">
          <RevealStack blur direction="blur"><SectionHeading kicker="服务能力" title="端到端覆盖，选择你需要的环节。" description="从基础设施到应用层，每个阶段都有清晰的服务边界和交付标准。" /></RevealStack>
          <div className="mt-12">
            <Reveal><InteractiveFeaturePanel items={servicePanelItems} defaultExpanded={0} /></Reveal>
          </div>
        </div>
      </section>

      <section className="section-space relative border-b border-blue-100 bg-gradient-to-b from-blue-50/55 to-white overflow-hidden">
        <AmbientBackground variant="orb" orbColor="from-blue-500/10 via-cyan-400/6 to-emerald-400/5" />
        <div className="site-shell relative">
          <RevealStack blur direction="blur"><SectionHeading kicker="项目案例" title="真实环境中的交付成果。" description="从平台建设到故障恢复，用可验证的结果呈现技术价值。" /></RevealStack>
          <div className="mt-12 grid border-l border-t border-blue-100 lg:grid-cols-[1.35fr_.65fr]">
            {leadProject ? (
              <SmartLink href={leadProject.href} className="group relative min-h-[560px] overflow-hidden border-b border-r border-blue-100 bg-slate-950">
                <Image src={leadProject.heroImage} alt={leadProject.title} fill className="object-cover opacity-75 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.16em] text-cyan-200 backdrop-blur-sm">{leadProject.category}</span>
                  <h3 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">{leadProject.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{leadProject.description}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3">查看案例<ArrowRight className="h-4 w-4" /></span>
                </div>
              </SmartLink>
            ) : null}
            <div className="grid">
              {sideProjects.map((project, index) => (
                <SmartLink key={project.slug} href={project.href} className="group grid min-h-[280px] grid-cols-[.9fr_1.1fr] border-b border-r border-blue-100 bg-white transition-all duration-500 hover:bg-blue-50/20">
                  <div className="relative overflow-hidden"><Image src={project.heroImage} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="flex flex-col justify-between p-6">
                    <span className="text-xs font-bold text-blue-500 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">0{index + 2}</span>
                    <div><span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[.12em] text-cyan-700">{project.category}</span><h3 className="mt-3 text-xl font-semibold text-slate-950">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p></div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3">查看案例<ArrowRight className="h-4 w-4" /></span>
                  </div>
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space relative border-b border-blue-100 bg-white overflow-hidden">
        <AmbientBackground variant="grid" />
        <div className="site-shell relative grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <RevealStack blur direction="blur"><SectionHeading kicker="交付流程" title="每一步，都清晰可控。" description="明确范围、节点和结果，让项目从方案到运维保持一致。" /></RevealStack>
          <Reveal><BeamPipeline steps={deliverySteps} /></Reveal>
        </div>
      </section>

      <section className="section-space relative border-b border-blue-100 bg-gradient-to-br from-emerald-50/55 via-white to-blue-50/55 overflow-hidden">
        <AmbientBackground variant="orb" orbColor="from-emerald-400/8 via-blue-400/5 to-cyan-400/6" />
        <div className="site-shell relative">
          <div className="grid gap-12 lg:min-h-[600px] lg:grid-cols-[.7fr_1.3fr] lg:items-stretch">
            <RevealStack blur direction="blur" className="lg:flex lg:items-center lg:justify-center">
              <div className="mx-auto max-w-xl text-center [&_h2]:justify-center">
                <SectionHeading kicker="发展历程" title="持续建设，长期服务。" description="记录公司成立、业务合作与产品上线的重要节点。" />
              </div>
            </RevealStack>
            <Reveal className="min-h-0 lg:flex lg:items-center">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-12 bg-gradient-to-b from-white/95 to-transparent lg:block" />
                <div
                  className="timeline-scroll lg:max-h-[560px] lg:overflow-y-auto lg:overscroll-contain lg:px-5 lg:py-8"
                  tabIndex={0}
                  role="region"
                  aria-label="公司发展历程，可上下滚动"
                >
                  <TimelineList items={timeline} />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-12 bg-gradient-to-t from-blue-50/90 to-transparent lg:block" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space relative bg-white overflow-hidden">
        <AmbientBackground variant="orb" orbColor="from-blue-500/8 via-cyan-400/5 to-blue-400/6" />
        <div className="site-shell relative">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <RevealStack blur direction="blur"><SectionHeading kicker="企业动态" title="最新进展" description="产品发布、服务升级与合作动态。" /></RevealStack>
            <SmartLink href="/news/" className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">查看全部动态<ArrowRight className="ml-2 h-4 w-4" /></SmartLink>
          </div>
          <div className="mt-12 grid border-l border-t border-blue-100 md:grid-cols-2 xl:grid-cols-3">{newsItems.slice(0, 3).map((item) => <Reveal key={item.slug}><NewsCard item={item} /></Reveal>)}</div>
        </div>
      </section>

      <section className="relative border-y border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 overflow-hidden">
        <AmbientBackground variant="grid" />
        <div className="site-shell relative py-16 sm:py-20">
          <div className="text-center mb-12">
            <RevealStack blur direction="blur">
              <SectionHeading kicker="客户评价" title="被越来越多的团队和企业信任。" description="来自不同行业的真实反馈，是我们持续改进的动力。" />
            </RevealStack>
          </div>
          <TestimonialMarquee testimonials={testimonials} rows={1} speed={45} />
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28"><CtaBanner title="让技术方案真正服务于业务目标。" description="提交项目需求，团队将在一个工作日内与你联系。" primary={{ label: "提交项目需求", href: "/contact/request/" }} secondary={{ label: "与客户经理对话", href: siteConfig.wecomLink }} /></section>
    </>
  );
}
