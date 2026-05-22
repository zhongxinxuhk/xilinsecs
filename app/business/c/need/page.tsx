import { buildMetadata } from "@/lib/metadata";
import { getContactPortalBySlug } from "@/lib/site-data";
import PortalPage from "@/components/pages/portal-page";

const portal = getContactPortalBySlug("request");

export const metadata = portal
  ? buildMetadata({
      title: portal.seoTitle,
      description: portal.seoDescription,
      path: portal.href,
      image: portal.heroImage,
    })
  : {};

export default function LegacyRequestPage() {
  if (!portal) return null;

  return <PortalPage portal={portal} />;
}
