export type LegalDocumentSlug = "terms" | "privacy" | "compliance";

export type LegalDocumentConfig = {
  slug: LegalDocumentSlug;
  href: string;
  source: string;
  navLabel: string;
  kicker: string;
  title: string;
  description: string;
  metaDescription: string;
};

export const legalDocuments = {
  terms: {
    slug: "terms",
    href: "/terms/",
    source: "terms.md",
    navLabel: "使用条款",
    kicker: "Terms",
    title: "HGZS 跨境数据合规审查系统使用条款",
    description: "说明系统授权使用、账号管理、数据接入、审查结果、第三方服务、日志审计和责任边界。",
    metaDescription: "HGZS 跨境数据合规审查系统使用条款，涵盖授权使用、账号管理、数据接入、审查辅助结果、日志审计与责任限制。",
  },
  privacy: {
    slug: "privacy",
    href: "/privacy/",
    source: "privacy.md",
    navLabel: "隐私政策",
    kicker: "Privacy",
    title: "HGZS 跨境数据合规审查系统隐私政策",
    description: "说明系统在账号、合规审查、流量监测、AI 审计、机器学习分析和运维过程中涉及的个人信息处理活动。",
    metaDescription: "HGZS 跨境数据合规审查系统隐私政策，说明个人信息处理范围、目的、依据、保存期限、共享、跨境传输和权利响应。",
  },
  compliance: {
    slug: "compliance",
    href: "/compliance/",
    source: "compliance.md",
    navLabel: "合规声明",
    kicker: "Compliance",
    title: "HGZS 跨境数据合规审查系统合规声明",
    description: "说明系统合规设计目标、适用边界、管理要求、AI 与机器学习合规、审计留痕和部署前检查事项。",
    metaDescription: "HGZS 跨境数据合规审查系统合规声明，涵盖合规目标、适用边界、数据出境、网络安全、AI 合规和运行期管理要求。",
  },
} satisfies Record<LegalDocumentSlug, LegalDocumentConfig>;

export const legalDocumentList = [legalDocuments.terms, legalDocuments.privacy, legalDocuments.compliance];

export function getLegalDocument(slug: LegalDocumentSlug) {
  return legalDocuments[slug];
}
