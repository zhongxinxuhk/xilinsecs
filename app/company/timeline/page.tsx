import { buildMetadata } from "@/lib/metadata";
import { siteConfig, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import TimelineList from "@/components/sections/timeline-list";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "发展历程",
  description: "了解 HK XSEC 从创立到持续成长的历程。",
  path: "/company/timeline/",
});

export default function TimelinePage() {
  return (
    <>
      <PageHero
        kicker="发展历程"
        title="从创立到持续成长。"
        description={`${siteConfig.shortName} 从创立之初便坚持专业交付与长期服务，沿着更清晰的业务边界持续扩展。`}
        image="/source/index_imgs/index_01.jpg"
        actions={[
          { label: "认识团队", href: "/company/leadership/" },
          { label: "查看项目案例", href: "/projects/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="heading-display text-3xl font-semibold text-slate-950 md:text-4xl">
                关键里程碑
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                从公司创立、校企合作到长期技术服务与安全运营合作，团队正沿着更清晰的业务边界持续扩展。
              </p>
            </div>
          </Reveal>
          <Reveal>
            <TimelineList items={timeline} />
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="让技术投入持续创造价值。"
            description="告诉我们当前目标与挑战，团队将协助明确范围并制定实施路径。"
            primary={{ label: "联系我们", href: "/contact/" }}
            secondary={{ label: "查看服务能力", href: "/services/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
