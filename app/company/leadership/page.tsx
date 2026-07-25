import { buildMetadata } from "@/lib/metadata";
import { siteConfig, teamMembers } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import PersonCard from "@/components/sections/person-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "管理团队",
  description: "了解 HK XSEC 的核心团队成员。",
  path: "/company/leadership/",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        kicker="核心团队"
        title="专业、务实、长期主义。"
        description={`${siteConfig.shortName} 团队覆盖产品、开发、解决方案、信息安全与内容运营，致力于为客户提供可靠的信息化服务。`}
        image="/source/index_imgs/index_01.jpg"
        actions={[
          { label: "查看发展历程", href: "/company/timeline/" },
          { label: "加入我们", href: "/careers/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <div className="mb-12">
              <h2 className="heading-display text-3xl font-semibold text-slate-950 md:text-4xl">
                团队成员
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                团队覆盖产品、开发、解决方案、信息安全与内容运营，每位成员都在各自领域持续深耕。
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Reveal key={member.slug}>
                <PersonCard person={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="与我们一起，为客户创造长期价值。"
            description="如果你认同专业、务实、长期主义的理念，欢迎加入团队。"
            primary={{ label: "查看职位", href: "/careers/" }}
            secondary={{ label: "联系我们", href: "/contact/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
