import type { ProductPage } from "@/lib/data/types";

export const products: ProductPage[] = [
  {
    slug: "cloud",
    href: "/products/cloud/",
    title: "云与基础设施",
    summary: "为私有云、虚拟化、容灾与边缘部署建立稳定底座。",
    description:
      "围绕 VMware、虚拟化平台、边缘节点和监控告警能力，帮助团队把基础设施建设和故障恢复做得更可预测。",
    heroImage: "/source/index_imgs/hsd_index02.webp",
    seoTitle: "云与基础设施产品",
    seoDescription: "私有云、虚拟化、容灾与边缘部署能力。",
    icon: "Cloud",
    features: [
      "VMware 私有云设计、部署和故障修复",
      "混合云和边缘节点协同接入",
      "监控告警、备份、容灾和容量规划",
      "环境交接文档与长期运维建议",
    ],
    scenarios: [
      "数据中心环境优化",
      "旧系统上云和资源整合",
      "关键业务环境的稳定性提升",
    ],
    cta: { label: "咨询基础设施方案", href: "/contact/" },
    tags: ["VMware", "私有云", "容灾"],
  },
  {
    slug: "software",
    href: "/products/software/",
    title: "软件与应用",
    summary: "面向品牌官网、业务平台、客户入口与伙伴协作的应用交付。",
    description:
      "覆盖官网升级、案例展示、业务门户、伙伴入口和客户服务系统，重点关注结构清晰、部署稳定和内容可持续维护。",
    heroImage: "/source/index_imgs/ihaikou_index01.webp",
    seoTitle: "软件与应用产品",
    seoDescription: "官网、业务平台、客户服务和伙伴入口的软件交付能力。",
    icon: "Laptop2",
    features: [
      "品牌官网与内容平台建设",
      "业务门户、查询中心与表单入口重构",
      "前端性能、SEO 与静态部署优化",
      "设计、开发、上线与后续维护协同",
    ],
    scenarios: [
      "企业官网重构",
      "渠道与客户入口统一",
      "新业务的快速上线",
    ],
    cta: { label: "讨论软件项目", href: "/contact/request/" },
    tags: ["官网", "平台", "静态部署"],
  },
  {
    slug: "hardware",
    href: "/products/hardware/",
    title: "硬件与安全设备",
    summary: "把设备采购、交付实施与安全治理放进同一方案。",
    description:
      "整合网络设备、安全设备与办公终端交付，让采购不只是买设备，而是得到更完整的实施与上线保障。",
    heroImage: "/business/services/b/hhps-xinchuang/01.webp",
    seoTitle: "硬件与安全设备",
    seoDescription: "网络设备、安全设备与办公终端的一体化交付能力。",
    icon: "Package",
    features: [
      "计算机、网络与安全设备整合采购",
      "实施部署、资产登记与交接文档",
      "结合实际预算与合规要求做方案设计",
      "与软件、网络和安全能力一体协同",
    ],
    scenarios: [
      "信创迁移与环境建设",
      "办公与网络环境升级",
      "安全边界与终端能力补齐",
    ],
    cta: { label: "获取产品清单", href: "/contact/" },
    tags: ["硬件", "安全设备", "实施交付"],
  },
];
