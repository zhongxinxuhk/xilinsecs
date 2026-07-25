import type { HomeHighlight, RoleRecord } from "@/lib/data/types";

export const careerValues: HomeHighlight[] = [
  {
    title: "包容与协作",
    description: "欢迎不同背景的人一起做事，团队重视沟通质量和彼此成就感。",
    icon: "Users",
  },
  {
    title: "专业成长",
    description: "鼓励把项目经验沉淀为方法论，让每个人都能看到自己的成长轨迹。",
    icon: "Sparkles",
  },
  {
    title: "解决真实问题",
    description: "我们更在意问题有没有被解决，而不是流程看起来是否复杂和完整。",
    icon: "Fingerprint",
  },
];

export const openRoles: RoleRecord[] = [
  {
    slug: "cloud-engineer",
    title: "云计算工程师",
    summary: "负责私有云、虚拟化和基础设施优化相关工作。",
    description:
      "参与私有云、虚拟化和基础设施项目，从规划、实施到故障恢复和文档移交，关注环境稳定性与交付质量。",
    heroImage: "/source/index_imgs/hsd_index02.webp",
    seoTitle: "云计算工程师职位",
    seoDescription: "加入 HK XSEC，参与私有云、虚拟化和基础设施优化项目。",
    location: "海口 / 支持远程协同",
    mode: "全职 / 项目制可谈",
    expectations: [
      "熟悉 VMware 相关环境或其他虚拟化平台",
      "理解网络、存储和系统基础能力",
      "具备排障、沟通和文档沉淀能力",
    ],
    impact: [
      "参与关键基础设施项目",
      "帮助客户缩短故障恢复和上线周期",
    ],
    cta: { label: "发送简历", href: "mailto:xuzhongxin@sec.hn.cn" },
    tags: ["云计算", "VMware", "基础设施"],
  },
  {
    slug: "security-engineer",
    title: "信息安全工程师",
    summary: "负责安全评估、渗透测试和加固建议输出。",
    description:
      "面向客户环境执行漏洞扫描、渗透测试和安全评估，把风险识别和加固建议转化成可落地的交付内容。",
    heroImage: "/source/index_imgs/index_01.jpg",
    seoTitle: "信息安全工程师职位",
    seoDescription: "加入 HK XSEC，参与安全评估、渗透测试和加固项目。",
    location: "海口 / 支持远程协同",
    mode: "全职 / 项目制可谈",
    expectations: [
      "熟悉常见 Web 与主机安全问题",
      "能输出清晰的修复建议和结果说明",
      "具备安全工具使用与风险分析能力",
    ],
    impact: [
      "把安全能力提前到方案和交付流程中",
      "帮助客户建立更稳定的安全运营意识",
    ],
    cta: { label: "申请该职位", href: "mailto:chenziyi@sec.hn.cn" },
    tags: ["安全", "渗透测试", "评估"],
  },
  {
    slug: "frontend-engineer",
    title: "前端工程师",
    summary: "负责官网、业务平台和公共工具页的前端实现与重构。",
    description:
      "参与品牌站、内容平台、工具页和服务入口重构，关注前端体验、性能优化和长期可维护性。",
    heroImage: "/source/index_imgs/20260322-044041.webp",
    seoTitle: "前端工程师职位",
    seoDescription: "加入 HK XSEC，参与官网与业务平台的前端设计和开发。",
    location: "海口 / 支持远程协同",
    mode: "全职 / 实习可谈",
    expectations: [
      "熟悉 HTML、CSS、JavaScript 与现代前端框架",
      "理解响应式设计、性能和工程结构",
      "能把设计意图落实成可靠代码",
    ],
    impact: [
      "打造面向客户、伙伴和公众的关键入口",
      "推动站点架构与视觉体验持续升级",
    ],
    cta: { label: "发送作品集", href: "mailto:xuzhongxin@sec.hn.cn" },
    tags: ["前端", "Next.js", "体验优化"],
  },
];
