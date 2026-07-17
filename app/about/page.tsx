import { buildMetadata } from "@/lib/metadata";
import { aboutPillars, siteConfig, teamMembers, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import PersonCard from "@/components/sections/person-card";
import TimelineList from "@/components/sections/timeline-list";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "关于我们",
  description: "了解 HK XSEC 的定位、能力结构和团队方式。",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="关于希灵赛斯"
        title="为企业持续建设可靠、易维护的数字系统。"
        description={`${siteConfig.shortName} 提供基础设施、软件系统、信息安全与技术运营服务，帮助客户从规划、建设到长期维护形成稳定闭环。`}
        image="/source/index_imgs/index_01.jpg"
        actions={[
          { label: "查看项目案例", href: "/projects/" },
          { label: "认识团队", href: "/company/leadership/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="核心能力"
              title="核心能力"
              description="覆盖技术规划、系统建设、安全保障与持续运营。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid items={aboutPillars} columns="three" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="团队成员"
              title="专业团队"
              description="团队覆盖产品、开发、解决方案、信息安全与内容运营。"
            />
          </Reveal>
          <div className="grid gap-4">
            {teamMembers.slice(0, 3).map((member) => (
              <Reveal key={member.slug}>
                <PersonCard person={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              kicker="发展历程"
              title="发展历程"
              description="从公司创立、校企合作到长期技术服务与安全运营合作，团队正沿着更清晰的业务边界持续扩展。"
            />
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
