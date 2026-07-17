import { buildMetadata } from "@/lib/metadata";
import { tools } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "工具中心",
  description: "Base64、DNS、MD5、随机点名和 UUID 等公共工具中心。",
  path: "/tools/",
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        kicker="工具中心"
        title="简单、快速、可靠的在线工具。"
        description="面向开发、运维和日常办公场景，无需安装即可使用。"
        image="/leadership/indexnews/images/news/post3_news.webp"
        actions={[
          { label: "访问下载中心", href: "/downloads/" },
          { label: "联系我们", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="在线工具"
              title="全部工具"
              description="面向开发、运维和常见办公场景的轻量工具集合。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={tools.map((tool) => ({
                  title: tool.title,
                  description: tool.description,
                  icon: tool.icon,
                  href: tool.href,
                  bullets: tool.features,
                }))}
                columns="three"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
