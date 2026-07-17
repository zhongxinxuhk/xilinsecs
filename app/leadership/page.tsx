import { buildMetadata } from "@/lib/metadata";
import { newsItems } from "@/lib/site-data";
import NewsCard from "@/components/sections/news-card";
import PageHero from "@/components/sections/page-hero";
import Reveal from "@/components/sections/reveal";
import SectionHeading from "@/components/sections/section-heading";

export const metadata = buildMetadata({
  title: "企业动态",
  description: "查看 HK XSEC 的平台发布、服务升级和经营信息动态。",
  path: "/news/",
});

export default function LegacyLeadershipNewsPage() {
  return (
    <>
      <PageHero
        kicker="企业动态"
        title="平台发布、服务升级与经营信息，都放进同一条动态时间线。"
        description="新的动态页不再只是零散公告，而是围绕品牌站、服务入口和业务进展组织内容。"
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
