import type { ToolRecord } from "@/lib/data/types";

export const tools: ToolRecord[] = [
  {
    slug: "base64",
    href: "/tools/base64/",
    title: "Base64 编解码工具",
    summary: "支持文本编码、解码、复制与二维码导出。",
    description:
      "用于前端调试、接口联调和简单数据处理，支持本地编码、解码、复制结果和二维码生成，不依赖外部 CDN。",
    heroImage: "/leadership/indexnews/images/news/post3_news.webp",
    seoTitle: "Base64 编解码工具",
    seoDescription: "支持文本编码、解码、复制与二维码导出的 Base64 工具。",
    icon: "Hash",
    features: ["Unicode 兼容", "二维码导出", "结果复制", "本地处理"],
    tags: ["编码", "调试", "工具"],
  },
  {
    slug: "dns-query",
    href: "/tools/dns-query/",
    title: "DNS 查询控制台",
    summary: "基于静态配置读取 DOH 服务地址的查询控制台。",
    description:
      "从 `/api/info.json` 读取 DOH 配置，支持 A、AAAA、CNAME、MX、TXT 等常见记录查询，并展示响应详情。",
    heroImage: "/source/index_imgs/index_01.jpg",
    seoTitle: "DNS 查询控制台",
    seoDescription: "支持基于 DOH 的 DNS 记录查询与响应查看。",
    icon: "Globe",
    features: ["DOH 配置读取", "多种记录类型", "查询结果复制", "边缘部署友好"],
    tags: ["DNS", "DOH", "网络"],
  },
  {
    slug: "md5-check",
    href: "/tools/md5-check/",
    title: "MD5 校验工具",
    summary: "支持文件哈希计算与结果复制。",
    description:
      "面向常见下载校验和交付确认场景，支持本地文件 MD5 计算、体积显示和结果复制。",
    heroImage: "/source/index_imgs/index_cplb01.webp",
    seoTitle: "MD5 校验工具",
    seoDescription: "支持本地文件 MD5 计算与结果复制的在线工具。",
    icon: "Fingerprint",
    features: ["本地计算", "拖拽上传", "结果复制", "无需服务端"],
    tags: ["MD5", "校验", "文件"],
  },
  {
    slug: "random-picker",
    href: "/tools/random-picker/",
    title: "随机点名工具",
    summary: "支持上传 Excel/CSV 名单并随机抽取。",
    description:
      "适合课堂点名、会议抽取和活动名单场景，支持读取 Excel/CSV 文件并随机抽取一个或多个对象。",
    heroImage: "/business/services/g/gemini/01.png",
    seoTitle: "随机点名工具",
    seoDescription: "支持上传 Excel/CSV 名单并进行随机抽取。",
    icon: "FileDigit",
    features: ["Excel/CSV 导入", "多人抽取", "名单预览", "本地处理"],
    tags: ["随机", "Excel", "名单"],
  },
  {
    slug: "uuid",
    href: "/tools/uuid/",
    title: "UUID 生成工具",
    summary: "批量生成 UUID v4，并支持复制与导出文本。",
    description:
      "面向开发、测试与脚本场景，支持批量生成 UUID v4、复制单条或一键复制全部结果。",
    heroImage: "/source/index_imgs/20260322-044041.webp",
    seoTitle: "UUID 生成工具",
    seoDescription: "支持批量生成和复制 UUID v4 的在线工具。",
    icon: "KeyRound",
    features: ["批量生成", "复制单条", "复制全部", "本地生成"],
    tags: ["UUID", "开发", "批量"],
  },
];
