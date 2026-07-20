export * from "@/lib/data/careers";
export * from "@/lib/data/downloads";
export * from "@/lib/data/legal";
export * from "@/lib/data/navigation";
export * from "@/lib/data/news";
export * from "@/lib/data/platform";
export * from "@/lib/data/products";
export * from "@/lib/data/projects";
export * from "@/lib/data/services";
export * from "@/lib/data/site";
export * from "@/lib/data/team";
export * from "@/lib/data/tools";
export * from "@/lib/data/types";

import {
  contactPortals,
  customerPortals,
  customerTicketPortals,
  partnerPortals,
} from "@/lib/data/downloads";
import { downloads } from "@/lib/data/downloads";
import { newsItems } from "@/lib/data/news";
import { products } from "@/lib/data/products";
import { projects } from "@/lib/data/projects";
import { services } from "@/lib/data/services";
import { teamMembers } from "@/lib/data/team";
import { tools } from "@/lib/data/tools";

export function getServiceBySlug(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return projects.find((item) => item.slug === slug);
}

export function getNewsBySlug(year: string, slug: string) {
  return newsItems.find((item) => item.year === year && item.slug === slug);
}

export function getToolBySlug(slug: string) {
  return tools.find((item) => item.slug === slug);
}

export function getDownloadBySlug(slug: string) {
  return downloads.find((item) => item.slug === slug);
}

export function getCustomerPortalBySlug(slug: string) {
  return customerPortals.find((item) => item.slug === slug);
}

export function getCustomerTicketPortalBySlug(slug: string) {
  return customerTicketPortals.find((item) => item.slug === slug);
}

export function getPartnerPortalBySlug(slug: string) {
  return partnerPortals.find((item) => item.slug === slug);
}

export function getContactPortalBySlug(slug: string) {
  return contactPortals.find((item) => item.slug === slug);
}

export const llmsSections = [
  {
    heading: "Main routes",
    links: [
      "/",
      "/about/",
      "/projects/",
      "/partners/",
      "/contact/",
      "/services/",
      "/products/",
      "/platform/",
      "/status/",
      "/news/",
      "/tools/",
      "/downloads/",
      "/terms/",
      "/privacy/",
      "/compliance/",
      "/careers/",
      "/legal/privacy/",
    ],
  },
  {
    heading: "Dynamic content",
    links: [
      ...projects.map((item) => item.href),
      ...newsItems.map((item) => item.href),
      ...services.map((item) => item.href),
      ...products.map((item) => item.href),
      ...tools.map((item) => item.href),
      ...downloads.map((item) => item.href),
      ...teamMembers.map((member) => `/careers/team/#${member.slug}`),
    ],
  },
];
