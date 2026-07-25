export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type CTA = LinkItem & {
  variant?: "solid" | "outline" | "ghost";
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: LinkItem[];
};

export type SeoRecord = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  cta?: CTA;
  tags?: string[];
  externalUrl?: string;
  embedUrl?: string;
};

export type SiteStat = {
  label: string;
  value: string;
  detail: string;
};

export type HomeHighlight = {
  title: string;
  description: string;
  icon: string;
};

export type ServicePage = SeoRecord & {
  audience: string;
  icon: string;
  href: string;
  capabilities: string[];
  deliverables: string[];
  outcomes: string[];
  relatedLinks: LinkItem[];
};

export type ProductPage = SeoRecord & {
  icon: string;
  href: string;
  features: string[];
  scenarios: string[];
};

export type ProjectRecord = SeoRecord & {
  href: string;
  category: string;
  client: string;
  year: string;
  services: string[];
  stack: string[];
  overview: string[];
  highlights: string[];
  gallery: string[];
};

export type NewsRecord = SeoRecord & {
  href: string;
  year: string;
  date: string;
  category: string;
  body: string[];
};

export type EducationEntry = {
  institution: string;
  major: string;
  period: string;
  details?: string[];
};

export type ProjectEntry = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export type WorkEntry = {
  company: string;
  role: string;
  period: string;
  details: string[];
};

export type SkillSet = {
  certifications: string[];
  security: string[];
  cloud: string[];
  ai: string[];
  other: string[];
};

export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  focus: string[];
  education?: EducationEntry[];
  projects?: ProjectEntry[];
  workExperience?: WorkEntry[];
  skills?: SkillSet;
  awards?: string[];
};

export type RoleRecord = SeoRecord & {
  location: string;
  mode: string;
  expectations: string[];
  impact: string[];
};

export type ToolRecord = SeoRecord & {
  href: string;
  icon: string;
  features: string[];
};

export type DownloadRecord = SeoRecord & {
  href: string;
  platforms: string[];
  benefits: string[];
  primaryLink: LinkItem;
  secondaryLink?: LinkItem;
  note?: string;
  pin?: string;
};

export type PortalRecord = SeoRecord & {
  href: string;
  audience: string;
  embedUrl: string;
  steps: string[];
  faqs: Array<{ question: string; answer: string }>;
};
