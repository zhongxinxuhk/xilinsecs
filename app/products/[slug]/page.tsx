import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getProductBySlug, products } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CheckList from "@/components/sections/check-list";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return buildMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: product.href,
    image: product.heroImage,
  });
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        kicker="产品能力"
        title={product.title}
        description={product.description}
        image={product.heroImage}
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "返回产品目录", href: "/products/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="能力组成" description="主要模块与交付内容。" />
              <div className="mt-6">
                <CheckList items={product.features} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="典型场景" description="适用的典型业务场景。" />
              <div className="mt-6">
                <CheckList items={product.scenarios} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title={`把 ${product.title} 纳入更完整的项目路径。`}
            description="如果你已经明确知道要做什么，我们可以直接讨论清单和范围；如果还在比较方案，也可以先从问题出发。"
            primary={{ label: "获取建议", href: "/contact/" }}
            secondary={{ label: "查看服务路径", href: "/services/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
