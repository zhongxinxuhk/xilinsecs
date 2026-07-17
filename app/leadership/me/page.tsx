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
  title: "企业简介",
  description: "了解 HK XSEC 的定位、能力结构和团队方式。",
  path: "/about/",
  image: "/source/index_imgs/index_01.jpg",
});

export default function LegacyAboutPage() {
  return (
    <>
      <PageHero
        kicker="关于希灵赛斯"
        title="我们不是把项目做成一堆页面，而是把长期可维护性一起交付。"
        description={`${siteConfig.shortName} 关注的是基础设施、软件系统、安全能力和服务运营入口如何彼此支撑。我们希望客户拿到的不是一次性成果，而是一套更容易继续演进的结构。`}
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
              title="公司能力由五条支柱构成"
              description="我们把技术、内容、运营和安全放在一条连续的建设链上，而不是让不同团队彼此脱节。"
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
              title="一支更偏执行型的小团队"
              description="团队成员覆盖产品、开发、方案、安全与内容能力，结构不大，但强调跨角色协同和快速落地。"
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
            title="如果你更关注“长期怎么维护”，我们会很适合一起做事。"
            description="欢迎从一个明确问题开始，我们可以一起判断应该先处理信息架构、技术底座，还是服务流程。"
            primary={{ label: "联系我们", href: "/contact/" }}
            secondary={{ label: "查看服务能力", href: "/services/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
