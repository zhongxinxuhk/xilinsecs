import { buildMetadata } from "@/lib/metadata";
import { services, products } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "服务能力",
  description: "企业、客户、伙伴和公共服务四条路径的完整服务结构。",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="服务能力"
        title="覆盖建设、交付与运营的企业技术服务。"
        description="面向企业客户、现有客户与合作伙伴，提供从方案咨询到持续支持的专业服务。"
        image="/source/index_imgs/index_cplb01.webp"
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看产品目录", href: "/products/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="服务体系"
              title="四类服务"
              description="根据不同业务角色与需求，快速找到对应服务。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={services.map((item) => ({
                  title: item.title,
                  description: item.description,
                  icon: item.icon,
                  href: item.href,
                  bullets: item.capabilities.slice(0, 3),
                }))}
                columns="two"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="产品能力"
              title="服务和产品能力一起工作"
              description="基础设施、软件与设备能力为各类服务提供实施支撑。"
            />
          </Reveal>
          <Reveal>
            <IconCardGrid
              items={products.map((item) => ({
                title: item.title,
                description: item.description,
                icon: item.icon,
                href: item.href,
                bullets: item.features.slice(0, 2),
              }))}
              columns="three"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
