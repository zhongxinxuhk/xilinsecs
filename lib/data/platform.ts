import { Cpu, GaugeCircle, KeyRound, Network, Plug, Workflow } from "lucide-react";

export const platform = {
  name: "希灵 AI 开放平台",
  tagline: "开放 · 可控 · 可观测的 AI 接入平台",
  description:
    "面向开发者与企业团队的 AI 能力接入平台，统一调度、鉴权、计量与可观测，让智能能力以 API 形式稳定进入真实业务系统。",
  url: "https://platform.sec.hn.cn",
};

export const platformCapabilities = [
  {
    icon: Network,
    title: "统一 API 入口",
    description: "收敛多模型、多供应商的能力差异，开发者只需对接一套规范化接口。",
  },
  {
    icon: Workflow,
    title: "工作流编排",
    description: "可视化组装推理、检索、工具调用与后处理，让复杂流程可被一行代码触发。",
  },
  {
    icon: KeyRound,
    title: "调用与配额管理",
    description: "提供 API Key、租户额度、限流与审计日志，便于团队持续扩展与维护。",
  },
  {
    icon: Cpu,
    title: "推理与上下文",
    description: "支持长上下文、记忆管理、会话状态保持，适配真实业务场景的连续交互。",
  },
  {
    icon: Plug,
    title: "开发集成",
    description: "兼容 OpenAI 风格接口、内置 SDK 与示例，覆盖网站、应用与业务系统接入。",
  },
  {
    icon: GaugeCircle,
    title: "可观测与告警",
    description: "调用时延、成功率、Token 消耗、异常事件实时可见，SLA 状态可对外披露。",
  },
];

export const platformMetrics = [
  { value: "99.95%", label: "核心 API 可用率", description: "近 90 天聚合自 SLA 状态页披露。" },
  { value: "< 800ms", label: "首次响应时延", description: "P50 实测区间，复杂任务除外。" },
  { value: "5+", label: "推理供应商接入", description: "支持多模型路由与自动切换。" },
  { value: "1 行", label: "代码完成替换", description: "兼容 OpenAI 风格接口，迁移成本低。" },
];

export const platformStatusPages = [
  {
    slug: "api-services",
    name: "API 服务",
    description: "希灵 AI 开放平台对外 API 的可用性与响应时延状态。",
    href: "https://sla.sec.hn.cn/status/api-services",
    internal: "/status/?group=api-services",
  },
  {
    slug: "web-services",
    name: "网站服务",
    description: "官方网站、企业门户及其子域服务的运行时状态。",
    href: "https://sla.sec.hn.cn/status/web-services",
    internal: "/status/?group=web-services",
  },
  {
    slug: "information-system-infrastructure",
    name: "信息化基础设施",
    description: "私有云、虚拟化、网络与存储等基础设施运行状态。",
    href: "https://sla.sec.hn.cn/status/information-system-infrastructure",
    internal: "/status/?group=information-system-infrastructure",
  },
];
