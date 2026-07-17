import { BriefcaseBusiness, HeartHandshake, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { homeHero, newsItems, products, projects, siteConfig, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import TimelineList from "@/components/sections/timeline-list";
import ProjectCard from "@/components/sections/project-card";
import NewsCard from "@/components/sections/news-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";
import JsonLd from "@/components/seo/json-ld";
import XilingAiSpotlight from "@/components/sections/xiling-ai-spotlight";

const deliveryFeatures = [
  {
    title: "需求与方案",
    description: "基于业务目标、现有环境和预算边界制定实施方案。",
    icon: BriefcaseBusiness,
  },
  {
    title: "实施与安全",
    description: "按计划完成部署、联调、安全检查和交付验收。",
    icon: ShieldCheck,
  },
  {
    title: "运维与支持",
    description: "提供持续运维、应急响应和后续技术支持。",
    icon: HeartHandshake,
  },
];

export const metadata = buildMetadata({
  title: "海口希灵赛斯：一家专注于信息化解决方案的科技公司",
  description: siteConfig.seoDescription,
  path: "/",
  image: siteConfig.heroImage,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.domain,
          logo: siteConfig.logo,
          description: siteConfig.description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "海口",
            addressRegion: "海南",
            addressCountry: "CN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.email,
            contactType: "customer service",
          },
        }}
      />

      <PageHero
        kicker={homeHero.kicker}
        title={homeHero.title}
        description={homeHero.description}
        image={siteConfig.heroImage}
        actions={[homeHero.primaryCta, homeHero.secondaryCta]}
      />

      <XilingAiSpotlight />

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="产品能力"
              title="从基础设施到业务应用"
              description="围绕云平台、软件系统、信息安全与设备交付，为企业提供完整的技术支撑。"
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

      <section className="section-space border-y border-zinc-200 bg-zinc-50">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="交付流程"
              title="清晰、可控的项目实施"
              description="从需求确认到上线运维，每个阶段都有明确范围和交付结果。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid items={deliveryFeatures} columns="three" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="项目案例"
              title="近期交付项目"
              description="基础设施恢复、内容平台建设与国产化系统适配。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-zinc-200 bg-zinc-50">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="企业动态"
              title="最新进展"
              description="产品发布、服务升级与合作动态。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.slice(0, 3).map((item) => (
              <Reveal key={item.slug}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              kicker="发展历程"
              title="持续建设，长期服务"
              description="记录公司成立、业务合作与产品上线的重要节点。"
            />
          </Reveal>
          <Reveal>
            <TimelineList items={timeline} />
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="让技术方案真正服务于业务目标。"
            description="提交项目需求，团队将在一个工作日内与你联系。"
            primary={{ label: "提交项目需求", href: "/contact/request/" }}
            secondary={{ label: "与客户经理对话", href: siteConfig.wecomLink }}
          />
        </Reveal>
      </section>
    </>
  );
}
