import type { TeamMember } from "@/lib/data/types";

export const teamMembers: TeamMember[] = [
  {
    slug: "xu-zhongxin",
    name: "徐中信",
    title: "创始人",
    bio: "负责公司整体方向、项目统筹与客户沟通，长期参与私有云、信息化建设和技术服务交付。",
    image: "/source/index_imgs/touxiang/xuzhongxin_index_01.webp",
    focus: ["项目统筹", "客户沟通", "业务设计"],
    education: [
      {
        institution: "海南软件职业技术学院",
        major: "软件技术专业（在读）",
        period: "2025.09-至今",
        details: ["主修：软件技术、全栈、数据库、Web前端开发、高级程序设计、数据结构", "专业排名前5%"],
      },
    ],
    projects: [
      {
        company: "海南好思达网络科技有限公司",
        role: "软件/应急响应外部咨询负责人",
        period: "2025.01-至今",
        description: "为海南省人民医院、海口海事局、海南省交通管理局等超10家政企业主，提供电子政务云基础设施应急故障修复、网络安全纵深防御体系建设指导及安全设备销售服务，已签订长期战略合作协议。",
      },
      {
        company: "海南省国安厅",
        role: "封关测试项目技术外聘项目经理",
        period: "2025.01-至今",
        description: "与业主合作期间，咨询抽调网络安全优秀人才前往海口某基地参与封关测试，项目资产与得分获业主高度认可；目前以与业主单位达成长期外聘顾问合作，持续提供渗透测试技术支持。",
      },
      {
        company: "AI短剧项目",
        role: "综合技术支持",
        period: "2026.01-02",
        description: "联合前艾尔平方核心团队，主要负责Sora、ChatGPT、Gemini生产环境大规模联通、抗云端监测等工作；主导短剧技术支撑，作品已上线红果、YouTube等平台，单平台收藏量超1000+，热度1300万。",
      },
    ],
    workExperience: [
      {
        company: "海口市海亚科技有限责任公司",
        role: "新媒体运营",
        period: "2025.01-2025.09",
        details: ["在岗期间主要负责主播团队招聘任务，超额完成每日指标约面100人以上，为公司招聘人才300以上", "配合运营数据复盘，分析面试转化与主播留存数据，优化招聘筛选标准，将主播入职后30天留存率提升15%左右"],
      },
      {
        company: "海口希灵赛斯网络科技有限公司",
        role: "创始人兼执行总裁",
        period: "2025.04-至今",
        details: ["统筹公司战略规划、商务洽谈与核心技术攻坚，两项软件著作权正在申请中", "2025年11月，与海南好思达网络科技有限公司达成战略合作，负责电子政务云基础设施故障应急响应咨询服务", "2026年3月，主导与品契（陵水）互联网的信息安全应急保障合作，作为项目负责人兼应急专家，1小时内介入处理CLDAP漏洞利用事件，成功完成攻击溯源取证并报送执法机关，获客户高度认可及公开好评"],
      },
      {
        company: "浪潮软件股份有限公司",
        role: "驻海南外部硬件工程师",
        period: "2025.11-至今",
        details: ["负责32***3联勤***部队***项目探针设备实施工作，获得业主单位好评，并继续服务后续维保工作"],
      },
    ],
    skills: {
      certifications: ["网络与信息安全管理员（三级/高级工）", "大数据工程技术人员（三级/高级工）", "金仓数据库认证专家（Kingbase Certified Professional）", "国家信息安全考试（NISP一）", "IBM-PMF项目管理"],
      security: ["熟悉信息安全管理与评估、等保二级测评咨询、漏洞扫描、设备实施全流程", "精通山石网科、深信服、天融信、绿盟等厂商安全产品业务落地"],
      cloud: ["精通 VMware 虚拟化、Proxmox VE 超融合技术", "熟练设计与实施 vSAN、vHA、Ceph 业务架构", "具备业务系统架构设计与故障应急响应能力"],
      ai: ["精通 CodeX、Claude、Trae 等 AI 开发工具", "落地数据跨境审查系统", "掌握 Openclaw 单/多 Agent 协作"],
      other: ["运营 CSDN 技术博客，分享网络安全攻防对抗、云计算、虚拟化、人工智能前沿技术", "粉丝量突破1130+"],
    },
    awards: ["2023年省技能大赛（网络空间安全）-队长-三等奖", "2024年省技能大赛（大数据应用与服务）-队长-二等奖", "2023年省技能大赛网络安全攻防演练-队长-成功突破***银行防线并获取敏感数据资产", "2024年海南省网络安全攻防演练-队长-成功突破***银行防线并获取敏感数据资产", "2026年琼海市青年创业活力奖、院级\"创新创业之星\"", "2024年省优奖学金、校优秀共青团员、三好学生"],
  },
  {
    slug: "chen-ziyi",
    name: "陈紫怡",
    title: "创始人",
    bio: "负责公司协同、运营推进与项目跟进，参与业务沟通、组织协调和长期服务支持。",
    image: "/source/index_imgs/touxiang/chenziyi_index_01.webp",
    focus: ["产品设计", "信息架构", "跨团队协同"],
  },
  {
    slug: "chen-shiyi",
    name: "陈诗怡",
    title: "大数据及信息安全工程师",
    bio: "聚焦大数据与信息安全方向，参与信息安全评估、方案制定与关键交付支持。",
    image: "/source/index_imgs/touxiang/chenshiyi_index_01.webp",
    focus: ["方案设计", "安全评估", "交付支持"],
  },
  {
    slug: "xiao-huahong",
    name: "肖骅鸿",
    title: "信息安全工程师",
    bio: "负责漏洞扫描、渗透测试、安全加固与运行维护，持续提升客户环境安全性。",
    image: "/source/index_imgs/touxiang/xiaohuahong_index_01.webp",
    focus: ["渗透测试", "漏洞扫描", "安全加固"],
  },
  {
    slug: "wang-yueyang",
    name: "王越阳",
    title: "软件开发工程师",
    bio: "负责网站与业务系统开发，参与前端实现、系统集成和交付部署。",
    image: "/source/index_imgs/touxiang/wangyueyang_index_01.webp",
    focus: ["前端开发", "性能优化", "工程化"],
  },
  {
    slug: "peng-qianhui",
    name: "彭芊惠",
    title: "新媒体运营",
    bio: "负责品牌传播、内容策划与外部渠道运营，支撑企业形象展示和内容触达。",
    image: "/source/index_imgs/touxiang/pengqianhui_index_01.webp",
    focus: ["内容运营", "品牌传播", "案例整理"],
  },
];

export const leadershipNotes = [
  {
    title: "专业为本",
    description: "所有交付都应建立在真实可执行的方案、清楚的边界和可维护的结果之上。",
  },
  {
    title: "客户至上",
    description: "不把客户困在复杂流程里，而是尽量让决策、沟通和交付变得直观、可靠。",
  },
  {
    title: "安全优先",
    description: "把安全和合规提前到设计阶段，而不是作为项目结束前的附加动作。",
  },
];

export const timeline = [
  {
    year: "2025.04",
    title: "公司创立",
    description: "两位创始人经过6个月的设计和规划，决定于2025年4月创立团队，并命名海口希灵赛斯网络科技有限公司。",
  },
  {
    year: "2025.05",
    title: "海口旅游职业学院（HTC）达成深度合作",
    description: "2025年5月，与HTC达成合作，为其建设VMware私有云体系，iHAIKOU平台及ai智能助手，并持续提供咨询服务。",
  },
  {
    year: "2025.09",
    title: "Goodstart 软件服务解决供应商",
    description: "2025年9月，与Goodstart（海南好思达）达成深度合作，为Goodstart长期提供支撑、应用软件解决方案，成为优秀技术服务供应商。",
  },
  {
    year: "2026.03",
    title: "与品契（陵水）互联网有限责任公司达成合作",
    description: "2026年3月10日，与品契（陵水）互联网有限责任公司达成信息安全运行维护合作，为品契长期提供信息安全应急响应、信息安全评估、漏洞扫描、渗透测试等服务。",
  },
];
