// Client-side search index — mirrors lib/data but as plain objects for bundle efficiency.
import type React from "react";

export type SearchItem = {
  label: string;
  description: string;
  href: string;
  category: string;
  icon: string;
};

// Icons as simple emoji/unicode placeholders for search results
const I = (s: string) => s;

export const products: SearchItem[] = [
  { label: "软件产品", description: "企业信息化软件产品包括 EduCheck 学籍校验系统", href: "/products/software/", category: "产品", icon: I("💻") },
  { label: "硬件产品", description: "计算机设备、信息安全设备等硬件产品", href: "/products/hardware/", category: "产品", icon: I("🖥️") },
  { label: "云产品", description: "私有云建设与云计算解决方案", href: "/products/cloud/", category: "产品", icon: I("☁️") },
];

export const services: SearchItem[] = [
  { label: "私有云建设及咨询", description: "针对不同客户群体与预算，分析需求，为客户量身定制私有云建设方案", href: "/services/cloud/", category: "服务", icon: I("☁️") },
  { label: "信创系统集成", description: "将客户系统进行国产化封装，并进行BT等保测试，助力客户信创迁移", href: "/services/xinchuang/", category: "服务", icon: I("🔒") },
  { label: "信息安全测试及咨询", description: "提供内网自查服务，对每台设备漏洞扫描或定向测试，并输出整改建议", href: "/services/security/", category: "服务", icon: I("🛡️") },
  { label: "信息系统建设", description: "建立企业/单位门户网站或定制部署Blog、WAF、LTD、CRM等应用系统", href: "/services/web/", category: "服务", icon: I("🌐") },
  { label: "IOA保密办公", description: "终端安全管控与零信任办公解决方案", href: "/services/ioa/", category: "服务", icon: I("🔐") },
];

export const projects: SearchItem[] = [
  { label: "海口希尔顿网站建设", description: "为海口希尔顿酒店建设企业官网", href: "/projects/ihaikou-platform/", category: "项目", icon: I("🏗️") },
  { label: "海南核电 VMware 恢复", description: "恢复海南核电受损的 VMware 虚拟化环境", href: "/projects/vmware-recovery/", category: "项目", icon: I("⚡") },
];

export const tools: SearchItem[] = [
  { label: "Base64 编解码", description: "在线 Base64 编码与解码工具，支持文本和文件", href: "/tools/base64/", category: "工具", icon: I("🔤") },
  { label: "DNS 查询", description: "DNS 记录查询工具，支持多种记录类型", href: "/tools/dns-query/", category: "工具", icon: I("🔍") },
  { label: "MD5 校验", description: "浏览器本地文件 MD5 哈希计算，不上传文件", href: "/tools/md5-check/", category: "工具", icon: I("🔑") },
  { label: "随机点名", description: "在线随机点名工具，支持列表导入", href: "/tools/random-picker/", category: "工具", icon: I("🎲") },
  { label: "UUID 生成", description: "在线 UUID/GUID 生成器", href: "/tools/uuid/", category: "工具", icon: I("🆔") },
];

export const downloads: SearchItem[] = [
  { label: "IOA 保密办公客户端", description: "深信服 IOA 终端安全客户端下载", href: "/downloads/ioa-secure-office/", category: "下载", icon: I("📥") },
  { label: "ZTNA 跨境办公客户端", description: "深信服 ZTNA 跨境办公客户端下载", href: "/downloads/cross-border-office/", category: "下载", icon: I("🌍") },
];

export const newsItems: SearchItem[] = [
  { label: "企业动态", description: "查看海口希灵赛斯最新企业动态和公告", href: "/news/", category: "动态", icon: I("📰") },
];
