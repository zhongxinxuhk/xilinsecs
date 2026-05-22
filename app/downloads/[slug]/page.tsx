import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { downloads, getDownloadBySlug } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CheckList from "@/components/sections/check-list";
import PinCard from "@/components/sections/pin-card";
import Reveal from "@/components/sections/reveal";
import SmartLink from "@/components/ui/smart-link";

export function generateStaticParams() {
  return downloads.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getDownloadBySlug(params.slug);
  if (!item) return {};

  return buildMetadata({
    title: item.seoTitle,
    description: item.seoDescription,
    path: item.href,
    image: item.heroImage,
  });
}

export default function DownloadDetailPage({ params }: { params: { slug: string } }) {
  const item = getDownloadBySlug(params.slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        kicker="Download detail"
        title={item.title}
        description={item.description}
        image={item.heroImage}
        actions={[
          { label: item.primaryLink.label, href: item.primaryLink.href, variant: "solid" },
          { label: "返回下载中心", href: "/downloads/", variant: "outline" },
        ]}
        aside={
          item.pin && item.note ? <PinCard pin={item.pin} note={item.note} /> : undefined
        }
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="平台支持" description="适用平台和接入收益。" />
              <div className="mt-6">
                <CheckList items={[...item.platforms, ...item.benefits]} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="下一步" description="从下载到接入，建议按这个顺序推进。" />
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                <p>1. 根据你的设备平台进入官方下载页面。</p>
                <p>2. 安装完成后，按团队规则进行接入或联系负责人获取必要信息。</p>
                <p>3. 如有权限、网络或账号问题，优先通过联系页或伙伴工作台反馈。</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <SmartLink href={item.primaryLink.href} className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white">
                  {item.primaryLink.label}
                </SmartLink>
                {item.secondaryLink ? (
                  <SmartLink href={item.secondaryLink.href} className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900">
                    {item.secondaryLink.label}
                  </SmartLink>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
