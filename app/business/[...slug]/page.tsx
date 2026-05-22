import Image from "next/image";
import { Blocks, BriefcaseBusiness, Building2, Cloud, Globe, Laptop2, ShieldCheck, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import {
  contactPortals,
  customerPortals,
  customerTicketPortals,
  downloads,
  getCustomerPortalBySlug,
  getCustomerTicketPortalBySlug,
  getNewsBySlug,
  getPartnerPortalBySlug,
  getProductBySlug,
  getProjectBySlug,
  getServiceBySlug,
  getToolBySlug,
  partnerPortals,
  partnershipModes,
  products,
  projects,
  services,
  tools,
} from "@/lib/site-data";
import PortalPage from "@/components/pages/portal-page";
import CtaBanner from "@/components/sections/cta-banner";
import CheckList from "@/components/sections/check-list";
import DownloadCard from "@/components/sections/download-card";
import IconCardGrid from "@/components/sections/icon-card-grid";
import PageHero from "@/components/sections/page-hero";
import ProjectCard from "@/components/sections/project-card";
import Reveal from "@/components/sections/reveal";
import SectionHeading from "@/components/sections/section-heading";
import Base64Tool from "@/components/tools/base64-tool";
import DnsQueryTool from "@/components/tools/dns-query-tool";
import RandomPickerTool from "@/components/tools/random-picker-tool";
import UuidTool from "@/components/tools/uuid-tool";
import SmartLink from "@/components/ui/smart-link";
import { formatDate } from "@/lib/utils";

type BusinessLegacyEntry = {
  path: string;
  kind:
    | "services-home"
    | "customer-home"
    | "partners-home"
    | "public-home"
    | "products-home"
    | "service"
    | "product"
    | "portal"
    | "project"
    | "tool"
    | "news"
    | "info"
    | "gemini";
  serviceSlug?: string;
  productSlug?: string;
  portalType?: "contact" | "customer" | "ticket" | "partner";
  portalSlug?: string;
  projectSlug?: string;
  toolSlug?: string;
  year?: string;
  newsSlug?: string;
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  kicker?: string;
  bullets?: string[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const businessLegacyEntries: BusinessLegacyEntry[] = [
  { path: "index.html", kind: "services-home" },
  { path: "c/need.html", kind: "portal", portalType: "contact", portalSlug: "request" },
  { path: "services", kind: "services-home" },
  { path: "services/b", kind: "service", serviceSlug: "enterprise" },
  {
    path: "services/b/order.html",
    kind: "info",
    title: "对公合同与交付信息支持",
    description: "原对公合同查询入口已并入企业服务与客户服务体系，现在统一通过顾问和服务中心协助处理。",
    canonicalPath: "/services/enterprise/",
    image: "/source/index_imgs/index_cplb01.webp",
    kicker: "Enterprise support",
    bullets: [
      "可协助核对合同、交付范围和项目阶段信息",
      "适合已有合作客户补充文档、确认交付状态和后续安排",
      "如需快速处理，建议同时通过企业微信或邮件联系团队",
    ],
    primaryHref: "/contact/",
    primaryLabel: "联系企业顾问",
    secondaryHref: "/business/c/",
    secondaryLabel: "进入客户服务中心",
  },
  {
    path: "services/b/sc.html",
    kind: "info",
    title: "对公资料核验支持",
    description: "原身份信息查询页已纳入统一协作流程，可通过客户服务中心或企业顾问协助完成资料核验。",
    canonicalPath: "/services/enterprise/",
    image: "/source/index_imgs/wx.jpg",
    kicker: "Enterprise verification",
    bullets: [
      "适合合同签署、项目启动或资料更新前的企业信息核对",
      "建议准备公司名称、联系人和相关合作背景，便于快速定位记录",
      "如涉及较敏感的资料更新，团队会通过更安全的沟通方式确认",
    ],
    primaryHref: "/business/c/",
    primaryLabel: "进入客户服务中心",
    secondaryHref: "/contact/",
    secondaryLabel: "联系团队",
  },
  { path: "services/b/htc-ihaikou.html", kind: "project", projectSlug: "ihaikou-platform" },
  { path: "services/b/hnhsd-vmh3c.html", kind: "project", projectSlug: "vmware-recovery" },
  { path: "services/p", kind: "partners-home" },
  { path: "services/p/oa.html", kind: "portal", portalType: "partner", portalSlug: "workspace" },
  { path: "services/p/agent-orders.html", kind: "portal", portalType: "partner", portalSlug: "orders" },
  { path: "services/p/agent_info_maintenance.html", kind: "portal", portalType: "partner", portalSlug: "profile" },
  { path: "services/p/agent_register.html", kind: "portal", portalType: "partner", portalSlug: "apply" },
  {
    path: "services/p/agent_registers.html",
    kind: "info",
    title: "合作申请已收到",
    description: "伙伴申请信息提交后，团队会尽快核对并通过邮件或企业微信联系你。",
    canonicalPath: "/partners/apply/",
    image: "/source/index_imgs/zb/rz.jpg",
    kicker: "Partner intake",
    bullets: [
      "建议保留提交时使用的联系人信息，方便团队后续回访",
      "如果合作目标较明确，可补充区域、行业和交付能力说明",
      "在等待期间，也可以先查看伙伴工作台和协作说明",
    ],
    primaryHref: "/partners/workspace/",
    primaryLabel: "查看伙伴工作台",
    secondaryHref: "/partners/",
    secondaryLabel: "返回合作伙伴页",
  },
  { path: "services/c", kind: "customer-home" },
  { path: "services/c/need.html", kind: "portal", portalType: "contact", portalSlug: "request" },
  { path: "services/c/order.html", kind: "portal", portalType: "customer", portalSlug: "orders" },
  { path: "services/c/subscription.html", kind: "portal", portalType: "customer", portalSlug: "subscriptions" },
  { path: "services/c/wo.html", kind: "portal", portalType: "ticket", portalSlug: "new" },
  { path: "services/c/wosu.html", kind: "portal", portalType: "ticket", portalSlug: "status" },
  { path: "services/c/customer-info.html", kind: "portal", portalType: "customer", portalSlug: "profile" },
  {
    path: "services/c/join.html",
    kind: "info",
    title: "客户注册与合作建档",
    description: "如果你准备开始新的合作，可以先从需求提交或客户服务中心入口进入，团队会协助完成资料建档和后续对接。",
    canonicalPath: "/business/c/",
    image: "/source/index_imgs/20260322-044041.webp",
    kicker: "Customer onboarding",
    bullets: [
      "先说明项目目标、现状和时间窗口，团队会帮助判断最合适的服务路径",
      "已有合作关系的客户可直接进入客户服务中心查询和补充资料",
      "如需正式建档或开通后续服务，客户经理会进一步协助处理",
    ],
    primaryHref: "/business/c/need.html",
    primaryLabel: "提交项目需求",
    secondaryHref: "/business/c/",
    secondaryLabel: "进入客户服务中心",
  },
  {
    path: "services/c/joins.html",
    kind: "info",
    title: "客户注册信息已提交",
    description: "团队已经收到注册或建档信息，接下来会根据你提交的内容安排后续联系和核对。",
    canonicalPath: "/business/c/",
    image: "/source/index_imgs/wx.jpg",
    kicker: "Customer intake",
    bullets: [
      "请留意提交时使用的邮箱或企业微信，以便接收后续沟通",
      "如果需要补充资料，可以直接从客户服务中心继续发起请求",
      "如遇紧急事项，建议同步联系客户经理加速处理",
    ],
    primaryHref: "/business/c/",
    primaryLabel: "返回客户服务中心",
    secondaryHref: "/contact/",
    secondaryLabel: "联系团队",
  },
  {
    path: "services/c/needs.html",
    kind: "info",
    title: "需求已提交",
    description: "你的项目需求已进入处理队列，团队会根据业务背景和时间窗口尽快与你联系。",
    canonicalPath: "/contact/request/",
    image: "/source/index_imgs/20260322-044041.webp",
    kicker: "Request received",
    bullets: [
      "如果需求还不完整也没关系，团队会在沟通中协助一起收敛范围",
      "建议准备当前系统现状、目标结果和大致预算，便于方案判断",
      "如需求有时效性，可通过企业微信补充说明优先级",
    ],
    primaryHref: "/business/c/",
    primaryLabel: "查看客户服务中心",
    secondaryHref: "/contact/",
    secondaryLabel: "联系团队",
  },
  {
    path: "services/c/wosus.html",
    kind: "info",
    title: "工单已提交",
    description: "工单信息已成功进入服务流程，可后续通过工单状态查询页查看进展。",
    canonicalPath: "/customer/tickets/status/",
    image: "/source/index_imgs/index_01.jpg",
    kicker: "Ticket created",
    bullets: [
      "建议保存提交时使用的信息，方便后续自助查询",
      "如问题影响生产或业务连续性，可同步联系客户经理说明紧急程度",
      "团队会根据问题类型安排处理和反馈节奏",
    ],
    primaryHref: "/customer/tickets/status/",
    primaryLabel: "查询工单状态",
    secondaryHref: "/business/c/",
    secondaryLabel: "返回客户服务中心",
  },
  { path: "services/g", kind: "public-home" },
  { path: "services/g/base64.html", kind: "tool", toolSlug: "base64" },
  { path: "services/g/dns-query.html", kind: "tool", toolSlug: "dns-query" },
  { path: "services/g/sjdm.html", kind: "tool", toolSlug: "random-picker" },
  { path: "services/g/uuid.html", kind: "tool", toolSlug: "uuid" },
  { path: "services/g/gemini", kind: "gemini" },
  { path: "product", kind: "products-home" },
  { path: "product/software", kind: "product", productSlug: "software" },
  {
    path: "product/software/educheck",
    kind: "info",
    title: "教育检查与软件交付方案",
    description: "教育检查类产品现已纳入软件与应用能力带，更适合结合业务场景、平台交付和后续维护一起规划。",
    canonicalPath: "/products/software/",
    image: "/source/index_imgs/ihaikou_index01.webp",
    kicker: "Education solution",
    bullets: [
      "适合教育场景下的内容展示、数据管理和业务流程数字化",
      "不仅关注功能上线，也关注部署稳定性和长期维护",
      "可以结合客户服务、伙伴入口和内容平台一起设计整体结构",
    ],
    primaryHref: "/products/software/",
    primaryLabel: "查看软件与应用能力",
    secondaryHref: "/contact/request/",
    secondaryLabel: "发起项目沟通",
  },
  { path: "product/hardware", kind: "product", productSlug: "hardware" },
  { path: "product/cloud", kind: "product", productSlug: "cloud" },
];

function findEntry(path: string) {
  return businessLegacyEntries.find((entry) => entry.path === path);
}

function getPortal(entry: BusinessLegacyEntry) {
  if (entry.portalType === "customer" && entry.portalSlug) {
    return getCustomerPortalBySlug(entry.portalSlug);
  }
  if (entry.portalType === "ticket" && entry.portalSlug) {
    return getCustomerTicketPortalBySlug(entry.portalSlug);
  }
  if (entry.portalType === "partner" && entry.portalSlug) {
    return getPartnerPortalBySlug(entry.portalSlug);
  }
  if (entry.portalType === "contact" && entry.portalSlug) {
    return contactPortals.find((portal) => portal.slug === entry.portalSlug);
  }
  return null;
}

export function generateStaticParams() {
  return businessLegacyEntries.map((entry) => ({
    slug: entry.path.split("/"),
  }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const entry = findEntry(params.slug.join("/"));
  if (!entry) return {};

  if (entry.kind === "service" && entry.serviceSlug) {
    const service = getServiceBySlug(entry.serviceSlug);
    if (!service) return {};

    return buildMetadata({
      title: service.seoTitle,
      description: service.seoDescription,
      path: service.href,
      image: service.heroImage,
    });
  }

  if (entry.kind === "product" && entry.productSlug) {
    const product = getProductBySlug(entry.productSlug);
    if (!product) return {};

    return buildMetadata({
      title: product.seoTitle,
      description: product.seoDescription,
      path: product.href,
      image: product.heroImage,
    });
  }

  if (entry.kind === "portal") {
    const portal = getPortal(entry);
    if (!portal) return {};

    return buildMetadata({
      title: portal.seoTitle,
      description: portal.seoDescription,
      path: portal.href,
      image: portal.heroImage,
    });
  }

  if (entry.kind === "project" && entry.projectSlug) {
    const project = getProjectBySlug(entry.projectSlug);
    if (!project) return {};

    return buildMetadata({
      title: project.seoTitle,
      description: project.seoDescription,
      path: project.href,
      image: project.heroImage,
    });
  }

  if (entry.kind === "tool" && entry.toolSlug) {
    const tool = getToolBySlug(entry.toolSlug);
    if (!tool) return {};

    return buildMetadata({
      title: tool.seoTitle,
      description: tool.seoDescription,
      path: tool.href,
      image: tool.heroImage,
    });
  }

  if (entry.kind === "news" && entry.year && entry.newsSlug) {
    const item = getNewsBySlug(entry.year, entry.newsSlug);
    if (!item) return {};

    return buildMetadata({
      title: item.seoTitle,
      description: item.seoDescription,
      path: item.href,
      image: item.heroImage,
    });
  }

  if (entry.kind === "gemini") {
    return buildMetadata({
      title: "Gemini API 镜像网关",
      description: "稳定、快速访问 Google Gemini 的开发者网关说明页。",
      path: "/business/services/g/gemini/index.html",
      image: "/business/services/g/gemini/01.png",
    });
  }

  if (entry.kind === "services-home") {
    return buildMetadata({
      title: "业务范围",
      description: "查看 HK XSEC 的企业、客户、伙伴和公共服务结构。",
      path: "/services/",
      image: "/source/index_imgs/index_cplb01.webp",
    });
  }

  if (entry.kind === "customer-home") {
    return buildMetadata({
      title: "客户服务中心",
      description: "提交需求、查询订单与订阅、发起工单和查看客户资料的统一入口。",
      path: "/business/c/",
      image: "/source/index_imgs/wx.jpg",
    });
  }

  if (entry.kind === "partners-home") {
    return buildMetadata({
      title: "代理商服务门户",
      description: "伙伴合作方式、申请入口、订单查询与工作台入口。",
      path: "/partners/",
      image: "/source/index_imgs/zb/rz.jpg",
    });
  }

  if (entry.kind === "public-home") {
    return buildMetadata({
      title: "公共服务导航",
      description: "查看工具、下载和对外开放入口的统一公共服务中心。",
      path: "/tools/",
      image: "/leadership/indexnews/images/news/post3_news.webp",
    });
  }

  if (entry.kind === "products-home") {
    return buildMetadata({
      title: "产品目录",
      description: "云与基础设施、软件与应用、硬件与安全设备的产品能力目录。",
      path: "/products/",
      image: "/source/index_imgs/ihaikou_index01.webp",
    });
  }

  return buildMetadata({
    title: entry.title ?? "业务页面",
    description: entry.description ?? "查看 HK XSEC 的业务入口与说明。",
    path: entry.canonicalPath ?? "/services/",
    image: entry.image ?? "/source/index_imgs/index_01.jpg",
  });
}

function renderServicesHome() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="业务范围不再是一组旧目录，而是一套按角色和任务组织的入口。"
        description="企业、客户、伙伴与公共服务共享同一套品牌和交付标准，但每条路径对应的任务、入口和后续动作都清晰拆开。"
        image="/source/index_imgs/index_cplb01.webp"
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看产品目录", href: "/products/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Four lanes"
              title="四类服务路径"
              description="用更直观的结构承接企业项目、客户服务、伙伴协作与公共工具，不再让用户记旧文件名。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={services.map((service) => ({
                  title: service.title,
                  description: service.description,
                  icon: service.icon,
                  href: service.href,
                  bullets: service.capabilities.slice(0, 3),
                }))}
                columns="two"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Products"
              title="交付最终会落到这些产品能力上"
              description="服务路径解决“从哪里进入”，产品能力解决“项目最后如何被实现和维护”。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={products.map((product) => ({
                  title: product.title,
                  description: product.description,
                  icon: product.icon,
                  href: product.href,
                  bullets: product.features.slice(0, 2),
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

function renderCustomerHome() {
  const requestPortal = contactPortals.find((item) => item.slug === "request");
  const ordersPortal = customerPortals.find((item) => item.slug === "orders");
  const subscriptionsPortal = customerPortals.find((item) => item.slug === "subscriptions");
  const profilePortal = customerPortals.find((item) => item.slug === "profile");
  const newTicketPortal = customerTicketPortals.find((item) => item.slug === "new");
  const ticketStatusPortal = customerTicketPortals.find((item) => item.slug === "status");

  const serviceCards = [
    requestPortal
      ? {
          title: requestPortal.title,
          summary: requestPortal.summary,
          href: "/business/c/need.html",
          label: "提交需求",
        }
      : null,
    ordersPortal
      ? {
          title: ordersPortal.title,
          summary: ordersPortal.summary,
          href: ordersPortal.href,
          label: "查看订单",
        }
      : null,
    subscriptionsPortal
      ? {
          title: subscriptionsPortal.title,
          summary: subscriptionsPortal.summary,
          href: subscriptionsPortal.href,
          label: "查看订阅",
        }
      : null,
    profilePortal
      ? {
          title: profilePortal.title,
          summary: profilePortal.summary,
          href: profilePortal.href,
          label: "查看信息",
        }
      : null,
    newTicketPortal
      ? {
          title: newTicketPortal.title,
          summary: newTicketPortal.summary,
          href: newTicketPortal.href,
          label: "发起工单",
        }
      : null,
    ticketStatusPortal
      ? {
          title: ticketStatusPortal.title,
          summary: ticketStatusPortal.summary,
          href: ticketStatusPortal.href,
          label: "查询工单",
        }
      : null,
  ].filter(Boolean) as Array<{
    title: string;
    summary: string;
    href: string;
    label: string;
  }>;

  return (
    <>
      <PageHero
        kicker="Customer service"
        title="客户服务中心"
        description="把需求提交、订单与订阅查询、客户资料和工单流程集中到一个清晰入口里，减少来回跳转和重复沟通。"
        image="/source/index_imgs/wx.jpg"
        actions={[
          { label: "提交项目需求", href: "/business/c/need.html" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950 dark:text-slate-50">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Service scope</p>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              适合现有客户和潜在客户快速进入正确入口，也方便团队把需求、查询和售后动作统一收口。
            </p>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Primary actions"
              title="常用服务入口"
              description="无论是新需求还是已有项目查询，都可以从这里快速进入对应流程。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {serviceCards.map((card) => (
              <Reveal key={card.href}>
                <article className="glass-card flex h-full flex-col p-6 text-slate-950 dark:text-slate-50">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">{card.summary}</p>
                  <SmartLink
                    href={card.href}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    {card.label}
                  </SmartLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Downloads"
              title="办公与接入下载"
              description="如果你同时需要办公接入或下载说明，也可以直接从这里进入。"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {downloads.map((item) => (
              <Reveal key={item.slug}>
                <DownloadCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function renderPartnersHome() {
  const partnerService = services.find((item) => item.slug === "partners");

  return (
    <>
      <PageHero
        kicker="Partner ecosystem"
        title="把伙伴合作从分散页面升级为一套连续可用的工作路径。"
        description={partnerService?.description ?? "围绕伙伴合作、资料维护、订单查询和工作台建立统一入口。"}
        image="/source/index_imgs/zb/rz.jpg"
        actions={[
          { label: "申请合作", href: "/partners/apply/" },
          { label: "进入工作台", href: "/partners/workspace/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="Modes"
              title="三种常见合作方式"
              description="合作不一定要从完整框架协议开始，也可以先从单个项目、区域协同或联合交付试运行。"
            />
          </Reveal>
          <div className="grid gap-4">
            {partnershipModes.map((mode) => (
              <Reveal key={mode.title}>
                <article className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">{mode.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{mode.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Portals"
              title="伙伴入口"
              description="把最常用的伙伴动作集中到同一层路径下，减少记忆成本。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {partnerPortals.map((portal) => (
              <Reveal key={portal.slug}>
                <article className="glass-card flex h-full flex-col p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{portal.audience}</div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-slate-50">{portal.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">{portal.summary}</p>
                  <SmartLink href={portal.href} className="mt-6 text-sm font-semibold text-blue-700">
                    打开入口
                  </SmartLink>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function renderPublicHome() {
  return (
    <>
      <PageHero
        kicker="Public utilities"
        title="公共服务中心"
        description="把工具、下载和开放访问入口统一放进同一层可维护结构里，减少对旧静态页和零散入口的依赖。"
        image="/leadership/indexnews/images/news/post3_news.webp"
        actions={[
          { label: "打开工具中心", href: "/tools/" },
          { label: "访问下载中心", href: "/downloads/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Utilities"
              title="常用公共工具"
              description="面向开发、运维和常见办公场景的轻量工具集合。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={tools.map((tool) => ({
                  title: tool.title,
                  description: tool.description,
                  icon: tool.icon,
                  href: tool.href,
                  bullets: tool.features.slice(0, 3),
                }))}
                columns="three"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Downloads"
              title="下载与接入"
              description="办公接入和跨境办公说明也统一纳入公共服务层。"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {downloads.map((item) => (
              <Reveal key={item.slug}>
                <DownloadCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function renderProductsHome() {
  return (
    <>
      <PageHero
        kicker="Products"
        title="产品能力是交付落地的另一面。"
        description="服务路径决定用户如何找到我们，产品能力决定项目最终如何被实现、维护和持续扩展。"
        image="/source/index_imgs/ihaikou_index01.webp"
        actions={[
          { label: "查看服务能力", href: "/services/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Catalog"
              title="三类产品能力"
              description="围绕基础设施、软件系统和设备交付组织产品目录，方便客户快速理解每条能力带的边界。"
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

function renderEnterpriseService() {
  const service = getServiceBySlug("enterprise");
  if (!service) return null;

  return (
    <>
      <PageHero
        kicker={service.audience}
        title={service.title}
        description={service.description}
        image={service.heroImage}
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看相关案例", href: "/projects/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950 dark:text-slate-50">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Scope</p>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">{service.summary}</p>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="核心能力" description="这是该路径下最常见的交付内容。" />
              <div className="mt-6">
                <CheckList items={service.capabilities} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="交付结果" description="除了实施本身，我们也会关注上线后的可维护性。" />
              <div className="mt-6">
                <CheckList items={[...service.deliverables, ...service.outcomes]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Related work"
              title="相关案例"
              description="这些项目更能体现企业服务路径的交付方式。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function renderProductDetail(productSlug: string) {
  const product = getProductBySlug(productSlug);
  if (!product) return null;

  return (
    <>
      <PageHero
        kicker="Product capability"
        title={product.title}
        description={product.description}
        image={product.heroImage}
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "返回产品目录", href: "/products/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="能力组成" description="该产品能力下最常出现的模块和交付项。" />
              <div className="mt-6">
                <CheckList items={product.features} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="典型场景" description="这些通常是客户真正需要解决的问题。" />
              <div className="mt-6">
                <CheckList items={product.scenarios} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function renderToolShell(toolSlug: string) {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return null;

  const toolNode =
    toolSlug === "base64" ? (
      <Base64Tool />
    ) : toolSlug === "dns-query" ? (
      <DnsQueryTool />
    ) : toolSlug === "random-picker" ? (
      <RandomPickerTool />
    ) : toolSlug === "uuid" ? (
      <UuidTool />
    ) : null;

  if (!toolNode) return null;

  return (
    <>
      <PageHero
        kicker="Public utility"
        title={tool.title}
        description={tool.description}
        image={tool.heroImage}
        actions={[
          { label: "返回工具中心", href: "/tools/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="能力说明" description={tool.summary} />
              <div className="mt-6">
                <CheckList items={tool.features} />
              </div>
            </div>
          </Reveal>
          <Reveal>{toolNode}</Reveal>
        </div>
      </section>
    </>
  );
}

function renderProjectDetail(projectSlug: string) {
  const project = getProjectBySlug(projectSlug);
  if (!project) return null;

  return (
    <>
      <PageHero
        kicker={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.description}
        image={project.heroImage}
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "返回案例列表", href: "/projects/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950 dark:text-slate-50">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Client</p>
            <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-50">{project.client}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="项目概览" description={project.summary} />
              <div className="mt-6 space-y-4 text-sm leading-8 text-slate-700 dark:text-slate-300">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="项目亮点" description="这些内容最能体现项目的执行价值。" />
              <div className="mt-6">
                <CheckList items={[...project.highlights, ...project.services, ...project.stack]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Project gallery"
              title="项目画面"
              description="保留原项目中的关键界面或环境截图，帮助快速理解交付结果。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {project.gallery.map((image) => (
              <Reveal key={image}>
                <div className="glass-card overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <Image src={image} alt={project.title} fill className="object-cover" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function renderNewsDetail(year: string, newsSlug: string) {
  const item = getNewsBySlug(year, newsSlug);
  if (!item) return null;

  return (
    <>
      <PageHero
        kicker={`${item.category} · ${formatDate(item.date)}`}
        title={item.title}
        description={item.description}
        image={item.heroImage}
        actions={[
          { label: "返回企业动态", href: "/news/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell max-w-4xl">
          <Reveal>
            <article className="glass-card p-8">
              <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function renderInfoPage(entry: BusinessLegacyEntry) {
  return (
    <>
      <PageHero
        kicker={entry.kicker ?? "Legacy support"}
        title={entry.title ?? "服务说明"}
        description={entry.description ?? "该页面已重构为新的入口结构。"}
        image={entry.image ?? "/source/index_imgs/index_01.jpg"}
        actions={[
          { label: entry.primaryLabel ?? "继续", href: entry.primaryHref ?? "/contact/" },
          {
            label: entry.secondaryLabel ?? "返回首页",
            href: entry.secondaryHref ?? "/",
            variant: "outline",
          },
        ]}
      />

      {entry.bullets?.length ? (
        <section className="section-space">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <SectionHeading
                kicker="What to do next"
                title="下一步建议"
                description="为了让你更快进入正确流程，这里整理了几个关键点。"
              />
            </Reveal>
            <Reveal>
              <div className="glass-card p-6">
                <CheckList items={entry.bullets} />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="如果你希望团队直接协助判断下一步，我们可以一起收束问题。"
            description="不必先准备一份复杂说明，只要能描述当前目标和遇到的阻碍，我们就可以继续推进。"
            primary={{ label: entry.primaryLabel ?? "继续", href: entry.primaryHref ?? "/contact/" }}
            secondary={{ label: entry.secondaryLabel ?? "返回首页", href: entry.secondaryHref ?? "/" }}
          />
        </Reveal>
      </section>
    </>
  );
}

function renderGeminiGateway() {
  return (
    <>
      <PageHero
        kicker="Developer gateway"
        title="Gemini API 镜像网关"
        description="为受限网络环境下的开发者提供更稳定的 Gemini API 接入说明，适合调试、迁移和日常集成场景。"
        image="/business/services/g/gemini/01.png"
        actions={[
          { label: "前往 Google AI Studio", href: "https://aistudio.google.com/" },
          { label: "联系支持中心", href: "/contact/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950 dark:text-slate-50">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Endpoint</p>
            <div className="mt-4 rounded-[24px] border border-blue-100 bg-blue-50/80 p-4 font-mono text-sm text-blue-900">
              https://gemini.xinnew.top/
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              支持 IPv4 / IPv6 双栈，适合开发测试、受限网络环境下的 API 联调和迁移场景。
            </p>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="接入步骤" description="用最短路径完成配置和验证。" />
              <div className="mt-6">
                <CheckList
                  items={[
                    "前往 Google AI Studio 申请并获取 Gemini API 密钥",
                    "将网关端点配置为 https://gemini.xinnew.top/",
                    "优先在服务端保存密钥，避免在公开仓库或前端代码中暴露",
                    "完成连通性验证后，再逐步接入正式业务流程",
                  ]}
                />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="使用建议" description="这类网关更适合作为接入层，而不是替代应用本身的安全治理。" />
              <div className="mt-6">
                <CheckList
                  items={[
                    "兼容 Google Gemini API 格式，便于已有接入逻辑迁移",
                    "关键密钥建议离线备份并合理控制并发请求",
                    "建议在服务端统一记录超时、失败率和配额消耗情况",
                    "如需企业级接入支持，可联系团队协助梳理调用链和部署方式",
                  ]}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <SmartLink
                  href="https://aistudio.google.com/"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white"
                >
                  获取 API 密钥
                </SmartLink>
                <SmartLink
                  href="/contact/"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 dark:text-slate-100"
                >
                  联系团队
                </SmartLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default function LegacyBusinessPage({ params }: { params: { slug: string[] } }) {
  const entry = findEntry(params.slug.join("/"));
  if (!entry) notFound();

  if (entry.kind === "services-home") return renderServicesHome();
  if (entry.kind === "customer-home") return renderCustomerHome();
  if (entry.kind === "partners-home") return renderPartnersHome();
  if (entry.kind === "public-home") return renderPublicHome();
  if (entry.kind === "products-home") return renderProductsHome();
  if (entry.kind === "service") return renderEnterpriseService();
  if (entry.kind === "product" && entry.productSlug) return renderProductDetail(entry.productSlug);
  if (entry.kind === "portal") {
    const portal = getPortal(entry);
    if (!portal) notFound();
    return <PortalPage portal={portal} />;
  }
  if (entry.kind === "project" && entry.projectSlug) return renderProjectDetail(entry.projectSlug);
  if (entry.kind === "tool" && entry.toolSlug) return renderToolShell(entry.toolSlug);
  if (entry.kind === "news" && entry.year && entry.newsSlug) return renderNewsDetail(entry.year, entry.newsSlug);
  if (entry.kind === "gemini") return renderGeminiGateway();

  return renderInfoPage(entry);
}
