import {
  Building2,
  Laptop2,
  ShieldCheck,
  Package,
  Globe,
  Cloud,
  Handshake,
  BriefcaseBusiness,
  Users,
  Network,
  Workflow,
  KeyRound,
  Cpu,
  Plug,
  GaugeCircle,
  LifeBuoy,
  Hash,
  Fingerprint,
  FileDigit,
  Blocks,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Braces,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * 图标名称到 Lucide 组件的映射
 * 用于解决 Server Component 无法传递 React 组件到 Client Component 的问题
 */
export const iconMap: Record<string, LucideIcon> = {
  Building2,
  Laptop2,
  ShieldCheck,
  Package,
  Globe,
  Cloud,
  Handshake,
  BriefcaseBusiness,
  Users,
  Network,
  Workflow,
  KeyRound,
  Cpu,
  Plug,
  GaugeCircle,
  LifeBuoy,
  Hash,
  Fingerprint,
  FileDigit,
  Blocks,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Braces,
};

/**
 * 根据图标名称解析为 Lucide 组件
 * @param iconName 图标名称字符串
 * @param fallback 可选的备用图标，默认为 Building2
 */
export function resolveIcon(iconName: string | undefined, fallback: LucideIcon = Building2): LucideIcon {
  if (!iconName) return fallback;
  return iconMap[iconName] || fallback;
}
