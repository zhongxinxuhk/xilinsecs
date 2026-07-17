import { buildMetadata } from "@/lib/metadata";
import { careerValues, openRoles, teamMembers } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import PersonCard from "@/components/sections/person-card";
import RoleCard from "@/components/sections/role-card";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "职业机会",
  description: "查看 HK XSEC 的团队价值、成员和开放职位。",
  path: "/careers/",
  image: "/source/index_imgs/touxiang/wangyueyang_index_01.webp",
});

export default function LegacyCareersPage() {
  return (
    <>
      <PageHero
        kicker="加入我们"
        title="如果你喜欢把问题真正解决掉，我们会很欢迎你。"
        description="我们偏爱愿意跨角色协作、能把方案落实成结果的人。团队不大，但能看到项目从讨论、交付到长期维护的完整过程。"
        image="/source/index_imgs/touxiang/wangyueyang_index_01.webp"
        actions={[
          { label: "查看开放职位", href: "/careers/open-roles/" },
          { label: "认识团队", href: "/careers/team/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="团队价值观"
              title="我们看重的工作方式"
              description="在这里，沟通、执行力和对真实问题的兴趣通常比华丽叙事更重要。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid items={careerValues} columns="three" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="团队成员"
              title="你会和这些角色一起工作"
              description="团队成员覆盖产品、开发、安全、方案和内容能力，工作边界清晰，但协作很紧。"
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
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="招聘职位"
              title="当前开放职位"
              description="如果你想做更完整、更有上下文的项目，这些岗位会很合适。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {openRoles.map((role) => (
              <Reveal key={role.slug}>
                <RoleCard role={role} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
