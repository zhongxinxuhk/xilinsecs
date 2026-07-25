import type { NavItem } from "@/lib/data/types";

export const navigation: NavItem[] = [
  {
    label: "首页",
    href: "/",
    description: "首页与核心内容总览",
    children: [
      { label: "精选案例", href: "/projects/" },
      { label: "最新动态", href: "/news/" },
    ],
  },
  {
    label: "关于我们",
    href: "/about/",
    description: "公司介绍、团队与发展历程",
    children: [
      { label: "关于我们", href: "/about/" },
      { label: "管理团队", href: "/company/leadership/" },
      { label: "发展历程", href: "/company/timeline/" },
    ],
  },
  {
    label: "产品能力",
    href: "/products/",
    description: "产品能力、服务方案与交付成果",
    children: [
      { label: "产品能力", href: "/products/" },
      { label: "服务能力", href: "/services/" },
      { label: "项目案例", href: "/projects/" },
    ],
  },
  {
    label: "希灵 AI",
    href: "/platform/",
    description: "希灵 AI 开放平台 · 一级菜单",
    children: [
      { label: "平台总览", href: "/platform/" },
      { label: "访问平台", href: "https://platform.sec.hn.cn" },
      { label: "API 服务", href: "https://sla.sec.hn.cn/status/api-services" },
      { label: "网站服务", href: "https://sla.sec.hn.cn/status/web-services" },
      { label: "信息化基础设施", href: "https://sla.sec.hn.cn/status/information-system-infrastructure" },
    ],
  },
  {
    label: "合作伙伴",
    href: "/partners/",
    description: "合作生态、伙伴入口与联合交付",
    children: [
      { label: "合作伙伴", href: "/partners/" },
      { label: "申请合作", href: "/partners/apply/" },
      { label: "伙伴工作台", href: "/partners/workspace/" },
    ],
  },
  {
    label: "联系我们",
    href: "/contact/",
    description: "需求、联系、工具与下载入口",
    children: [
      { label: "联系我们", href: "/contact/" },
      { label: "提交需求", href: "/contact/request/" },
      { label: "工具中心", href: "/tools/" },
      { label: "下载中心", href: "/downloads/" },
    ],
  },
];
