import {
  Blocks,
  BriefcaseBusiness,
  Building2,
  Cloud,
  Globe,
  Handshake,
  Laptop2,
  Package,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import type { CTA, HomeHighlight, LinkItem, SiteStat } from "@/lib/data/types";

export const siteConfig = {
  name: "海口希灵赛斯网络科技有限责任公司",
  shortName: "HK XSEC",
  domain: "https://www.sec.hn.cn",
  description: "致力于提供专业的信息化解决方案,助力企业数字化转型升级。",
  seoDescription:
    "专业的信息化解决方案供应商，提供私有云建设、信息安全咨询、网站建设等服务，致力于为客户提供专业、高效的数字化解决方案。",
  tagline: "让信息化建设，不再有难题。",
  registeredAddress:
    "海南省海口市龙华区金宇街道南海大道豪苑路1号海口中关村信息谷创新中心2025-ZC-1115",
  mailingAddress: "海南省琼海市海南软件学院大学生创业基地1/2层",
  address:
    "海南省海口市龙华区金宇街道南海大道豪苑路1号海口中关村信息谷创新中心2025-ZC-1115",
  email: "chenziyi@sec.hn.cn",
  supportEmail: "chenziyi@sec.hn.cn",
  heroImage: "/source/index_imgs/20260322-044041.webp",
  logo: "/source/imgs/logo.png",
  wecomLink: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af",
  icpLink: "https://beian.miit.gov.cn/",
  icpText: "琼ICP备2025060601号-1",
  mpsLink: "https://beian.mps.gov.cn/#/query/webSearch?code=46010002001548",
  mpsText: "琼公网安备46010002001548号",
  copyright: "© 2025—2026 sec.hn.cn 版权所有",
  ipv6Text: "本站支持IPv6",
  verifyLink:
    "https://e-register.amr.hainan.gov.cn:17089/#/?qyxx=I8%20HAEmgoR6TVmokEB2TW1jqNWu%2F6cwhlApRTM7toGszlRcs6ZUi30MySmjBAtsgtZrbljvmf6FmOfpPbwlMUXvXAKOaWdJBSpMNk53TLb0OV2l7K2tyrV5eL%20ru5FxZeM%20zBV09hFpPXdWTrE13jYyjlD6xSGFbyQCUx1f3M4I%3D",
};

export const homeHero = {
  kicker: "海口希灵赛斯网络科技有限责任公司",
  title: "云启无限",
  description:
    "让信息化建设，不再有难题。专业定制私有云基础设施建设，信息安全建设，网站建设，软件开发，计算机设备，信息安全设备销售等信息化建设解决方案。",
  primaryCta: {
    label: "与客户经理对话",
    href: siteConfig.wecomLink,
  } satisfies CTA,
  secondaryCta: {
    label: "提交您的需求",
    href: "/contact/request/",
    variant: "outline",
  } satisfies CTA,
};

export const homeStats: SiteStat[] = [
  {
    value: "私有云",
    label: "建设与咨询",
    detail: "针对不同客户群体与预算，分析需求并量身定制建设方案。",
  },
  {
    value: "信息安全",
    label: "测试与咨询",
    detail: "提供漏洞扫描、定向测试与整改建议，协助客户降低风险。",
  },
  {
    value: "信息系统",
    label: "建设服务",
    detail: "建立企业门户网站或定制部署业务系统，支撑长期运营。",
  },
];

export const homeHighlights: HomeHighlight[] = [
  {
    title: "VMware私有云",
    description: "释放服务器最大性能，节省硬件采购成本，提供高可用性云计算服务。",
    icon: Cloud,
  },
  {
    title: "信息安全咨询",
    description: "部署防火墙、态势感知平台、漏洞扫描系统，全方位保障企业信息安全。",
    icon: ShieldCheck,
  },
  {
    title: "信息化基础建设",
    description: "快速构建企业门户，提升SEO排名，提供静态网站建设和托管服务。",
    icon: Globe,
  },
];

export const contactChannels = [
  {
    title: "企业微信沟通",
    description: "适合项目咨询、长期运维与合作洽谈。",
    href: siteConfig.wecomLink,
    label: "打开企业微信",
    icon: Handshake,
  },
  {
    title: "提交项目需求",
    description: "适合新项目、改版、集成或基础设施升级类需求。",
    href: "/contact/request/",
    label: "提交需求",
    icon: BriefcaseBusiness,
  },
  {
    title: "伙伴合作入口",
    description: "适合代理合作、联合交付与资源协同。",
    href: "/partners/apply/",
    label: "申请合作",
    icon: Users,
  },
];

export const footerGroups: Array<{ title: string; links: LinkItem[] }> = [
  {
    title: "希灵 AI",
    links: [
      { label: "开放平台总览", href: "/platform/" },
      { label: "SLA 服务状态", href: "/status/" },
      { label: "访问平台", href: "https://platform.sec.hn.cn", external: true },
    ],
  },
  {
    title: "关于我们",
    links: [
      { label: "企业简介", href: "/about/" },
      { label: "职业机会", href: "/careers/" },
      { label: "领导团队", href: "/company/leadership/" },
      { label: "使用条款", href: "/terms/" },
      { label: "隐私政策", href: "/privacy/" },
      { label: "合规声明", href: "/compliance/" },
    ],
  },
  {
    title: "资源",
    links: [
      { label: "IOA保密办公", href: "/downloads/ioa-secure-office/" },
      { label: "ZTNA跨境办公", href: "/downloads/cross-border-office/" },
      { label: "零信任跨境专线「试点先行」", href: "https://zero.xinnew.top", external: true },
      { label: "MD5在线校验", href: "/tools/md5-check/" },
      {
        label: "软件资产S3",
        href: "https://user-ocloud.ihep.ac.cn/share/15328d44-91cc-40ce-9e17-022ff934be16?pwd=340854",
        external: true,
      },
    ],
  },
  {
    title: "星际网络应用",
    links: [
      {
        label: "云效Ops",
        href: "https://devops.aliyun.com/workbench?orgId=690f52c666aca23eccbe7d4c",
        external: true,
      },
      { label: "配置镜像仓库", href: "https://packages.sec.hn.cn/", external: true },
    ],
  },
  {
    title: "联系我们",
    links: [
      { label: "客服咨询", href: siteConfig.wecomLink, external: true },
      { label: "商务合作", href: "/contact/request/" },
      { label: "客户服务", href: "/business/c/" },
    ],
  },
  {
    title: "社交媒体",
    links: [
      { label: "抖音", href: "https://v.douyin.com/9N7akmvVn1Q/", external: true },
      { label: "CSDN", href: "https://blog.csdn.net/qq_73252299?type=blog", external: true },
      { label: "Gitee", href: "https://gitee.com/root-xx_edc-ctf", external: true },
    ],
  },
  {
    title: "友情链接",
    links: [
      { label: "海软计小智", href: "https://hncst-jxz.sec.hn.cn/", external: true },
      { label: "民选甄企", href: "https://community.sec.hn.cn/", external: true },
      { label: "智学通AI智慧教育项目", href: "https://agents.sec.hn.cn/chat/a6b4a2a88f63df4e", external: true },
      { label: "数据跨境合规审查系统", href: "https://cdcrs.sec.hn.cn/login", external: true },
      {
        label: "订阅格式转换",
        href: "https://zjdyzh.xinnew.top/",
        external: true,
      },
    ],
  },
];

export const aboutPillars = [
  {
    title: "架构与基础设施",
    description: "围绕私有云、虚拟化、网络与边缘环境做统一规划，而不是割裂式采购。",
    icon: Building2,
  },
  {
    title: "应用与交付",
    description: "从官网、内容平台到业务系统与伙伴入口，让体验与运维都能站得住。",
    icon: Laptop2,
  },
  {
    title: "安全与合规",
    description: "把安全评估、加固、响应和审计意识提前到方案和实施阶段。",
    icon: ShieldCheck,
  },
  {
    title: "设备与上线保障",
    description: "把硬件、软件、流程与知识移交放进一套完整的上线链路，而不是只交设备。",
    icon: Package,
  },
  {
    title: "公共服务设计",
    description: "在客户、伙伴和公众工具之间建立更低门槛、可访问、可追踪的服务入口。",
    icon: Globe,
  },
];

export const partnershipModes = [
  {
    title: "顾问与方案设计",
    description: "适合需要从 0 到 1 规划架构、服务目录或产品路径的团队。",
  },
  {
    title: "交付与重构实施",
    description: "适合官网升级、平台重做、流程入口统一与基础设施改造项目。",
  },
  {
    title: "长期运营支撑",
    description: "适合把性能、安全、内容治理和服务协同纳入持续改进节奏的团队。",
  },
];

export const testimonials = [
  {
    quote: "从接触需求到方案落地，整个沟通非常专业。私有云搭建比预期提前了一周完成，运维阶段响应也很及时。",
    author: "陈总",
    role: "某科技企业 · IT 负责人",
  },
  {
    quote: "安全评估报告非常详细，不仅指出了漏洞，还给出了可操作的修复路径，帮助我们通过了等保测评。",
    author: "李经理",
    role: "金融行业 · 信息安全主管",
  },
  {
    quote: "官网改版后访问速度明显提升，SEO 排名也在稳步上升。团队对细节的把控让人放心。",
    author: "王女士",
    role: "教育行业 · 市场总监",
  },
  {
    quote: "业务系统上线过程中遇到过几次波折，但团队的技术响应速度和解决能力确实过硬，项目最终按期交付。",
    author: "张工程师",
    role: "制造业 · 项目经理",
  },
  {
    quote: "作为长期运维合作伙伴，他们不仅是供应商，更像我们的技术顾问。从设备选型到安全策略，全程保驾护航。",
    author: "赵主任",
    role: "政府机构 · 信息中心",
  },
  {
    quote: "伙伴入口的设计很用心，流程清晰、文档齐全，合作关系推进得很顺畅，已经联合交付了三个项目。",
    author: "孙总",
    role: "合作伙伴 · 区域代理",
  },
];
