import { buildMetadata } from "@/lib/metadata";
import { products } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";
import XilingAiSpotlight from "@/components/sections/xiling-ai-spotlight";

export const metadata = buildMetadata({
  title: "产品能力",
  description: "希灵 AI API 中转站，以及云与基础设施、软件应用、硬件与安全设备产品能力。",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Products"
        title="产品能力是交付落地的另一面。"
        description="服务路径决定用户如何找到我们，产品能力决定项目最终如何被实现、维护和持续扩展。"
        image="/source/index_imgs/ihaikou_index01.webp"
        actions={[
          { label: "查看服务能力", href: "/services/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <XilingAiSpotlight compact />

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="产品矩阵"
              title="三类交付产品"
              description="希灵 AI 提供面向开发者与企业的 API 接入能力；以下三类交付产品覆盖基础设施、软件系统与设备实施。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={products.map((item) => ({
                  title: item.title,
                  description: item.description,
                  icon: item.icon,
                  href: item.href,
                  bullets: item.features.slice(0, 3),
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
