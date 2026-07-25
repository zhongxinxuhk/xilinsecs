import { buildMetadata } from "@/lib/metadata";
import { leadershipNotes, teamMembers } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import PersonCard from "@/components/sections/person-card";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "领导团队",
  description: "认识 HK XSEC 的管理团队与组织原则。",
  path: "/company/leadership/",
  image: "/source/index_imgs/touxiang/chenziyi_index_01.webp",
});

export default function LegacyLeadershipTeamPage() {
  return (
    <>
      <PageHero
        kicker="管理团队"
        title="管理团队"
        description="团队规模不大，但会尽量让方案、产品、开发、安全和内容能力形成稳定配合。"
        image="/source/index_imgs/touxiang/chenziyi_index_01.webp"
        actions={[
          { label: "查看招聘", href: "/careers/" },
          { label: "查看发展历程", href: "/company/timeline/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-5 xl:grid-cols-2">
          {teamMembers.map((member) => (
            <Reveal key={member.slug}>
              <PersonCard person={member} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="团队原则"
              title="团队原则"
              description="这些原则决定了我们如何做方案、推进项目和处理风险。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={leadershipNotes.map((item, index) => ({
                  title: item.title,
                  description: item.description,
                  icon: ["Users", "Fingerprint", "ShieldCheck"][index] ?? "ShieldCheck",
                }))}
                columns="three"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
