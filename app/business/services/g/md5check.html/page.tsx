import { buildMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CheckList from "@/components/sections/check-list";
import Reveal from "@/components/sections/reveal";
import Md5Tool from "@/components/tools/md5-tool";

const tool = getToolBySlug("md5-check");

export const metadata = tool
  ? buildMetadata({
      title: tool.seoTitle,
      description: tool.seoDescription,
      path: tool.href,
      image: tool.heroImage,
    })
  : {};

export default function LegacyMd5ToolPage() {
  if (!tool) return null;

  return (
    <>
      <PageHero
        kicker="公共工具"
        title={tool.title}
        description={tool.description}
        image={tool.heroImage}
        actions={[
          { label: "返回工具中心", href: "/tools/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="能力说明" description={tool.summary} />
              <div className="mt-6">
                <CheckList items={tool.features} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <Md5Tool />
          </Reveal>
        </div>
      </section>
    </>
  );
}
