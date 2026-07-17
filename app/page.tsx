import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Cloud,
  Globe,
  Laptop2,
  ShieldCheck,
  Users,
  Workflow,
  TrendingUp,
  Sparkles,
  Timer,
  HeartHandshake,
} from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { homeHero, siteConfig, teamMembers, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import TimelineList from "@/components/sections/timeline-list";
import Reveal from "@/components/sections/reveal";
import { ButtonLink } from "@/components/ui/button";
import AnimatedCounter from "@/components/interactive/animated-counter";
import GsapShowcasePager from "@/components/interactive/gsap-showcase-pager";
import JsonLd from "@/components/seo/json-ld";
import XilingAiSpotlight from "@/components/sections/xiling-ai-spotlight";

const coreCapabilities = [
  {
    title: "VMware私有云",
    description: "释放服务器最大性能，节省硬件采购成本，提供高可用性云计算服务。",
    icon: Cloud,
    href: "/products/cloud/",
    label: "了解更多",
  },
  {
    title: "信息安全咨询",
    description: "部署防火墙、态势感知平台、漏洞扫描系统，全方位保障企业信息安全。",
    icon: ShieldCheck,
    href: "https://blog.csdn.net/qq_73252299?spm=1000.2115.3001.5343",
    label: "了解更多",
  },
  {
    title: "信息化基础建设",
    description: "快速构建企业门户，提升SEO排名，提供静态网站建设和托管服务。",
    icon: Globe,
    href: "/products/software/",
    label: "了解更多",
  },
];

const productOffers = [
  {
    title: "私有云建设及咨询",
    description: "针对不同客户群体与预算，分析需求，为客户量身定制私有云建设方案。",
    icon: Cloud,
  },
  {
    title: "信创系统集成",
    description: "将客户系统进行国产化封装，并进行BT等保测试，助力客户信创迁移。",
    icon: Building2,
  },
  {
    title: "信息安全测试及咨询",
    description: "提供内网自查服务，对每台设备漏洞扫描或定向测试，并输出整改建议。",
    icon: ShieldCheck,
  },
  {
    title: "信息系统建设",
    description: "建立企业/单位门户网站或定制部署Blog、WAF、LTD、CRM等应用系统。",
    icon: Laptop2,
  },
];

const deliveryFeatures = [
  {
    title: "专业定制",
    description: "根据需求打造专属解决方案",
    icon: Workflow,
  },
  {
    title: "高效交付",
    description: "严格遵循项目时间表",
    icon: BriefcaseBusiness,
  },
  {
    title: "持续支持",
    description: "项目交付后提供完善的技术支持",
    icon: Users,
  },
];

const featuredProjects = [
  {
    title: "HTC iHAIKOU 网站建设",
    description: "海口旅游职业学院职教周 iHAIKOU内容分发系统建设",
    image: "/source/index_imgs/ihaikou_index01.webp",
    author: "徐中信",
    date: "2025-01-17",
    href: "/projects/ihaikou-platform/",
  },
  {
    title: "VMware 私有云故障修复",
    description: "分管运维现场处理VMware私有云故障",
    image: "/source/index_imgs/hsd_index02.webp",
    author: "徐中信",
    date: "2025-03-26",
    href: "/projects/vmware-recovery/",
  },
  {
    title: "海口海甸小学信创系统软件适配",
    description: "海口海甸小学银河麒麟信创系统软件适配",
    image: "/business/services/b/hhps-xinchuang/01.webp",
    author: "徐中信",
    date: "2025-09-03",
    href: "/projects/xinchuang-adaptation/",
  },
  {
    title: "海口红塔烟草局",
    description: "海口红塔烟草局数据中心控制器故障检修",
    image: "/business/services/b/hhps-xinchuang/01.webp",
    author: "徐中信",
    date: "2025-10-28",
    href: "/services/enterprise/",
  },
];

const latestNews = [
  {
    title: "新增技术进出口经营信息",
    summary: "为海南自贸港封关准备，新增技术进出口，代理进出口经营。",
    date: "2025-11-06",
    image: "/leadership/indexnews/images/news/post6.webp",
    href: "/news/2025/technology-import-export/",
  },
  {
    title: "代理商服务平台上线",
    summary: "企业自主开发代理商服务平台前端服务上线，面向希灵赛斯的代理商提供跨部门协作等服务。",
    date: "2025-09-01",
    image: "/leadership/indexnews/images/news/post1_thumb.webp",
    href: "/news/2025/partner-platform-launch/",
  },
  {
    title: "公共服务平台上线",
    summary: "企业自主开发公共服务平台前端服务上线，面向全球网民提供公共服务。",
    date: "2025-08-11",
    image: "/leadership/indexnews/images/news/post3_news.webp",
    href: "/news/2025/public-service-center-launch/",
  },
  {
    title: "客户服务平台上线",
    summary: "企业自主开发客户服务平台前端，面向希灵赛斯的潜在客户和现有客户提供服务。",
    date: "2025-07-31",
    image: "/leadership/indexnews/images/news/post4.webp",
    href: "/news/2025/customer-service-center-refresh/",
  },
];

const statItems = [
  { value: 50, suffix: "+", label: "服务客户", icon: HeartHandshake },
  { value: 100, suffix: "%", label: "项目交付率", icon: Timer },
  { value: 4, suffix: "", label: "核心业务线", icon: Sparkles },
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
        actions={[homeHero.primaryCta]}
      />

      {/* Animated stats counter */}
      <section className="section-space !pb-0">
        <div className="site-shell">
          <Reveal>
            <div className="glass-card grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:gap-8 sm:p-8 md:gap-10 md:p-10">
              {statItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="text-center">
                    <Icon className="mx-auto h-7 w-7 text-blue-600 dark:text-blue-400" />
                    <div className="heading-display mt-3 text-3xl font-bold text-slate-950 dark:text-slate-50 sm:text-4xl md:text-5xl">
                      <AnimatedCounter end={item.value} suffix={item.suffix} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <XilingAiSpotlight compact />

      <section className="section-space">
        <div className="site-shell">
          <Reveal className="ink-panel overflow-hidden px-6 py-10 sm:px-8 md:px-10">
            <div className="max-w-3xl">
              <div className="section-kicker">核心定位</div>
              <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
                打造数字化未来
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">专业IT解决方案提供商</p>
            </div>
            <div className="mt-8">
              <IconCardGrid items={coreCapabilities} columns="three" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal className="rainbow-panel overflow-hidden px-6 py-10 text-slate-950 dark:text-slate-50 sm:px-8 md:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/80 shadow-soft">
                <Image
                  src="/source/index_imgs/index_cplb01.webp"
                  alt="我们的核心产品与服务"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/10 to-transparent dark:from-slate-900/75 dark:via-slate-900/10" />
              </div>

              <div>
                <div className="max-w-3xl">
                  <div className="section-kicker">核心产品</div>
                  <h2 className="heading-display mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
                    我们的核心产品与服务
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">
                    围绕私有云、信息安全、信创适配与信息系统建设，提供从咨询到实施的整体支撑。
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {productOffers.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className="glass-card p-5 transition hover:-translate-y-1 hover:shadow-glass"
                      >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-50">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-[28px] border border-orange-200 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-orange-900/30 dark:bg-slate-800/80">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">提交您的需求</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    把您的项目需求、时间节点与预算提交给我们，我们会在T+1个工作日内联系您。
                  </p>
                  <ButtonLink href="/contact/request/" className="mt-6">
                    现在提交
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal className="rainbow-panel overflow-hidden px-6 py-10 text-slate-950 dark:text-slate-50 sm:px-8 md:px-10">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="section-kicker">交付方式</div>
                <h2 className="heading-display mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-50 md:text-4xl">定制专属方案</h2>
                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                  从需求梳理、方案设计到现场实施，我们把每个环节拆成清晰节点，保证业务目标、成本边界和交付节奏始终可控。
                </p>
                <ButtonLink href={siteConfig.wecomLink} className="mt-8">
                  立即咨询
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {deliveryFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <article
                      key={feature.title}
                      className="rounded-[24px] border border-white/80 bg-white/70 p-5 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:bg-white/90 dark:border-slate-700/50 dark:bg-slate-800/70"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-blue-500 dark:text-slate-950">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-slate-50">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{feature.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <GsapShowcasePager
              kicker="项目案例"
              title="精选项目案例"
              description="把核心交付现场做成可翻页的沉浸式展台，客户可以更快理解我们解决问题的方式。"
              items={featuredProjects.map((project) => ({
                title: project.title,
                description: project.description,
                image: project.image,
                href: project.href,
                ctaLabel: "查看详情",
                eyebrow: project.date,
                meta: `负责人 ${project.author}`,
                tags: ["现场交付", "信息化", "客户价值"],
              }))}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <GsapShowcasePager
              kicker="近期动态"
              title="关注我们的最新进展"
              description="将企业动态改为节奏更清晰的翻页展示，保留信息密度，也让重点新闻更有发布感。"
              tone="emerald"
              items={latestNews.map((item) => ({
                title: item.title,
                description: item.summary,
                image: item.image,
                href: item.href,
                ctaLabel: "阅读更多",
                eyebrow: item.date,
                tags: ["企业动态", "服务升级", "平台建设"],
              }))}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="团队成员"
              title="认识希灵赛斯背后的团队"
              description="核心团队成员信息已按原站首页内容补回。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member) => (
              <Reveal key={member.slug}>
                <article className="glass-card p-6 text-center transition hover:-translate-y-1 hover:shadow-glass">
                  <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-[24px] border border-white/70 transition-transform duration-300 hover:scale-105">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-slate-50">{member.name}</h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-blue-700 dark:text-blue-400">{member.title}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading
              kicker="发展历程"
              title="发展历程"
              description="从团队成立到长期服务合作，我们把每一次关键节点都沉淀为下一次交付的经验。"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <article className="glass-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-blue-600 text-white shadow-soft">
                    <Timer className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-950 dark:text-white">{timeline[0]?.year}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">创立起点</p>
                  </div>
                </div>
              </article>
              <article className="glass-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-soft">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-950 dark:text-white">{timeline.length} 个</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">关键里程碑</p>
                  </div>
                </div>
              </article>
              <article className="glass-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-slate-950 text-white shadow-soft dark:bg-slate-100 dark:text-slate-950">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-950 dark:text-white">持续服务</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">合作与交付同步推进</p>
                  </div>
                </div>
              </article>
            </div>
            <div className="mt-6">
              <ButtonLink href="/company/timeline/" variant="outline" className="w-full justify-between gap-3 sm:w-auto">
                查看完整历程
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal>
            <TimelineList items={timeline} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
