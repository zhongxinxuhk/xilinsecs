import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getToolBySlug, tools } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CheckList from "@/components/sections/check-list";
import Reveal from "@/components/sections/reveal";
import Base64Tool from "@/components/tools/base64-tool";
import DnsQueryTool from "@/components/tools/dns-query-tool";
import Md5Tool from "@/components/tools/md5-tool";
import RandomPickerTool from "@/components/tools/random-picker-tool";
import UuidTool from "@/components/tools/uuid-tool";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return buildMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: tool.href,
    image: tool.heroImage,
  });
}

function renderTool(slug: string) {
  switch (slug) {
    case "base64":
      return <Base64Tool />;
    case "dns-query":
      return <DnsQueryTool />;
    case "md5-check":
      return <Md5Tool />;
    case "random-picker":
      return <RandomPickerTool />;
    case "uuid":
      return <UuidTool />;
    default:
      return null;
  }
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  return (
    <>
      <PageHero
        kicker="Public utility"
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
          <Reveal>{renderTool(params.slug)}</Reveal>
        </div>
      </section>
    </>
  );
}
