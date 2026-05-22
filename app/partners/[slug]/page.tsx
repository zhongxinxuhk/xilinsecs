import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getPartnerPortalBySlug, partnerPortals } from "@/lib/site-data";
import PortalPage from "@/components/pages/portal-page";

export function generateStaticParams() {
  return partnerPortals.map((portal) => ({ slug: portal.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const portal = getPartnerPortalBySlug(params.slug);
  if (!portal) return {};

  return buildMetadata({
    title: portal.seoTitle,
    description: portal.seoDescription,
    path: portal.href,
    image: portal.heroImage,
  });
}

export default function PartnerPortalPage({ params }: { params: { slug: string } }) {
  const portal = getPartnerPortalBySlug(params.slug);
  if (!portal) notFound();

  return <PortalPage portal={portal} />;
}
