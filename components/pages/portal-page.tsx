import type { PortalRecord } from "@/lib/data/types";
import PageHero from "@/components/sections/page-hero";
import ProcessSteps from "@/components/sections/process-steps";
import EmbedShell from "@/components/sections/embed-shell";
import FaqList from "@/components/sections/faq-list";
import SectionHeading from "@/components/sections/section-heading";
import Reveal from "@/components/sections/reveal";

type PortalPageProps = {
  portal: PortalRecord;
};

export default function PortalPage({ portal }: PortalPageProps) {
  return (
    <>
      <PageHero
        kicker={portal.audience}
        title={portal.title}
        description={portal.description}
        image={portal.heroImage}
        actions={[
          { label: "打开当前入口", href: portal.href },
          { label: "联系我们", href: "/contact/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-5 text-slate-950 sm:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-blue-700 sm:tracking-[0.22em]">Portal brief</p>
            <p className="mt-4 text-base leading-8 text-slate-600">{portal.summary}</p>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <SectionHeading
              kicker="How it works"
              title="进入前先确认几个关键点"
              description="这些入口沿用现有表单源或查询源，新页面主要负责统一体验和路径。"
            />
          </Reveal>
          <Reveal>
            <ProcessSteps steps={portal.steps} />
          </Reveal>
        </div>
      </section>

      <Reveal className="section-space pt-0">
        <EmbedShell src={portal.embedUrl} title={portal.title} note="外部表单源保持不变，新的页面壳负责统一体验。" />
      </Reveal>

      <section className="section-space">
        <div className="site-shell grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <SectionHeading
              kicker="FAQ"
              title="常见问题"
              description="如果查询或提交过程中遇到问题，可以先看这里。"
            />
          </Reveal>
          <Reveal>
            <FaqList items={portal.faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
