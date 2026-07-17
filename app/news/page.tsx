import { buildMetadata } from "@/lib/metadata";
import { newsItems } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import NewsCard from "@/components/sections/news-card";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "企业动态",
  description: "查看 HK XSEC 的平台发布、服务升级和经营信息动态。",
  path: "/news/",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        kicker="企业动态"
        title="了解公司的最新进展。"
        description="关注产品发布、服务升级、合作进展与企业信息。"
        image="/leadership/indexnews/images/news/post6.webp"
        actions={[
          { label: "查看关于我们", href: "/about/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="全部动态"
              title="全部动态"
              description="包括平台发布、服务升级和经营信息摘要。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((item) => (
              <Reveal key={item.slug}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
