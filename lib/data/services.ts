import type { ServicePage } from "@/lib/data/types";

export const services: ServicePage[] = [
  {
    slug: "enterprise",
    href: "/services/enterprise/",
    title: "企业服务",
    summary: "面向企业与事业单位的基础设施、系统建设和安全治理服务。",
    description:
      "为企业客户提供从基础设施、业务系统到安全运营的整体方案，适合官网升级、信息化建设、私有云环境、长期运维支撑等场景。",
    heroImage: "/source/index_imgs/index_cplb01.webp",
    seoTitle: "企业服务",
    seoDescription: "面向企业客户的信息化基础设施、软件系统与安全治理服务。",
    audience: "企业客户 / 事业单位",
    icon: "Building2",
    capabilities: [
      "私有云与虚拟化环境规划、部署与恢复",
      "网站、门户、业务系统与服务入口建设",
      "安全评估、加固、漏洞扫描与响应支持",
      "上线保障、监控告警、文档移交与长期运营",
    ],
    deliverables: [
      "方案蓝图与实施路径",
      "交付清单、环境文档与验收说明",
      "监控、备份、应急和协作建议",
    ],
    outcomes: [
      "让环境更稳、系统更易维护、流程更清晰",
      "减少单点依赖，提升上线效率和可追踪性",
    ],
    relatedLinks: [
      { label: "查看案例", href: "/projects/" },
      { label: "发起需求", href: "/contact/request/" },
    ],
    cta: { label: "联系企业顾问", href: "/contact/" },
    tags: ["基础设施", "软件交付", "安全运营"],
  },
  {
    slug: "customer",
    href: "/services/customer/",
    title: "客户服务",
    summary: "统一客户需求、查询、订阅和工单入口，降低沟通成本。",
    description:
      "把需求提交、客户信息、账单查询、订阅状态和工单流程整合进统一的服务入口，让客户沟通和后续交付更顺滑。",
    heroImage: "/source/index_imgs/wx.jpg",
    seoTitle: "客户服务",
    seoDescription: "客户需求、账单、工单和订阅入口的统一服务中心。",
    audience: "现有客户 / 潜在客户",
    icon: "LifeBuoy",
    capabilities: [
      "需求提交与初步方案沟通",
      "账单、订阅和客户信息查询",
      "工单提交、自助查询与进度跟踪",
      "客户经理与企业微信协同支持",
    ],
    deliverables: [
      "统一访问入口",
      "更清晰的反馈链路",
      "更少的重复沟通和跳转成本",
    ],
    outcomes: [
      "客户能够更快找到正确入口和当前状态",
      "服务团队更容易标准化响应流程",
    ],
    relatedLinks: [
      { label: "客户订单", href: "/customer/orders/" },
      { label: "提交工单", href: "/customer/tickets/new/" },
    ],
    cta: { label: "进入客户服务中心", href: "/contact/" },
    tags: ["客户成功", "服务入口", "查询流程"],
  },
  {
    slug: "partners",
    href: "/services/partners/",
    title: "伙伴服务",
    summary: "让代理合作、资料维护、订单查询与协作工作台进入同一体系。",
    description:
      "围绕合作伙伴的注册、资料维护、订单查询与日常协作，建立更清晰的伙伴工作台和联合交付机制。",
    heroImage: "/source/index_imgs/zb/rz.jpg",
    seoTitle: "伙伴服务",
    seoDescription: "代理注册、订单查询、资料维护与协同工作台的统一伙伴服务。",
    audience: "渠道代理 / 生态伙伴",
    icon: "Handshake",
    capabilities: [
      "伙伴申请与资料维护",
      "代理订单查询与业务协同",
      "伙伴工作台与知识入口",
      "联合交付和资源配合机制",
    ],
    deliverables: [
      "更稳定的伙伴流程入口",
      "标准化协作界面和说明信息",
      "更低的协作学习成本",
    ],
    outcomes: [
      "让合作从一次性沟通变成持续协作",
      "减少伙伴侧对分散页面和临时说明的依赖",
    ],
    relatedLinks: [
      { label: "申请合作", href: "/partners/apply/" },
      { label: "伙伴工作台", href: "/partners/workspace/" },
    ],
    cta: { label: "进入合作伙伴页", href: "/partners/" },
    tags: ["渠道合作", "联合交付", "伙伴工作台"],
  },
  {
    slug: "public",
    href: "/services/public/",
    title: "公共服务",
    summary: "把高频工具、下载与开放入口做成稳定、易用的公共服务层。",
    description:
      "沉淀面向公众和开发者的轻量工具、下载和开放入口，让高频动作拥有更低摩擦、更高可达性的体验。",
    heroImage: "/leadership/indexnews/images/news/post3_news.webp",
    seoTitle: "公共服务",
    seoDescription: "公共工具、下载与开放入口的统一服务层。",
    audience: "公众用户 / 开发者 / 外部协作方",
    icon: "Globe",
    capabilities: [
      "在线编码、校验、查询等工具页面",
      "软件下载与办公接入说明",
      "对外知识入口与轻量访问场景",
      "兼顾移动端、桌面端和静态部署体验",
    ],
    deliverables: [
      "统一风格的工具中心",
      "更明确的下载和接入说明",
      "更适合搜索引擎收录的内容结构",
    ],
    outcomes: [
      "让高频公共动作不再依赖分散 HTML 页面",
      "提升外部访问体验与维护效率",
    ],
    relatedLinks: [
      { label: "打开工具中心", href: "/tools/" },
      { label: "访问下载中心", href: "/downloads/" },
    ],
    cta: { label: "查看公共工具", href: "/tools/" },
    tags: ["工具", "下载", "开放入口"],
  },
];
