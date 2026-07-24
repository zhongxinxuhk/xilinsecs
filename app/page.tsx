import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";
import JsonLd from "@/components/seo/json-ld";
import HomePageClient from "@/components/pages/home-page-client";

export const metadata = buildMetadata({
  title: "海口希灵赛斯：一家专注于信息化解决方案的科技公司",
  description: siteConfig.seoDescription,
  path: "/",
  image: siteConfig.heroImage,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.domain,
          logo: siteConfig.logo,
          description: siteConfig.description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "海口",
            addressRegion: "海南",
            addressCountry: "CN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.email,
            contactType: "customer service",
          },
        }}
      />
      <HomePageClient />
    </>
  );
}
