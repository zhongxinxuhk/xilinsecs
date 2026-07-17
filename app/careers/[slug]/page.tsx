import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { careerValues, openRoles, teamMembers } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import PersonCard from "@/components/sections/person-card";
import RoleCard from "@/components/sections/role-card";
import Reveal from "@/components/sections/reveal";

const careerPages = {
  team: {
    title: "团队成员",
    description: "了解 HK XSEC 的团队成员与角色分工。",
  },
  life: {
    title: "工作方式",
    description: "了解团队的协作、成长和项目节奏。",
  },
  "open-roles": {
    title: "开放职位",
    description: "查看当前开放职位与岗位信息。",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(careerPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!(params.slug in careerPages)) return {};
  const current = careerPages[params.slug as keyof typeof careerPages];

  return buildMetadata({
    title: current.title,
    description: current.description,
    path: `/careers/${params.slug}/`,
    image: "/source/index_imgs/20260322-044041.webp",
  });
}

export default function CareerSubPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in careerPages)) notFound();

  if (params.slug === "team") {
    return (
      <>
        <PageHero
          kicker="团队成员"
          title="团队成员"
          description="认识你未来可能会一起工作的成员，以及他们关注的问题域。"
          image="/source/index_imgs/touxiang/chenziyi_index_01.webp"
          actions={[
            { label: "查看开放职位", href: "/careers/open-roles/" },
            { label: "返回招聘首页", href: "/careers/", variant: "outline" },
          ]}
        />

        <section className="section-space">
          <div className="site-shell grid gap-5 xl:grid-cols-2">
            {teamMembers.map((member) => (
              <Reveal key={member.slug} className="scroll-mt-28" >
                <div id={member.slug}>
                  <PersonCard person={member} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (params.slug === "life") {
    return (
      <>
        <PageHero
          kicker="工作方式"
          title="工作方式"
          description="这里更像一个需要跨角色解决问题的小团队，所以项目透明度、执行力和文档意识都很重要。"
          image="/source/index_imgs/index_01.jpg"
          actions={[
            { label: "认识团队", href: "/careers/team/" },
            { label: "查看职位", href: "/careers/open-roles/", variant: "outline" },
          ]}
        />

        <section className="section-space">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="团队文化"
                title="我们更接近这样的工作环境"
                description="不追求形式化包装，而是努力让每个人都能看到问题、方案和结果之间的关系。"
              />
            </Reveal>
            <div className="mt-8">
              <Reveal>
                <IconCardGrid items={careerValues} columns="three" />
              </Reveal>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        kicker="招聘职位"
        title="开放职位"
        description="这些岗位面向真实项目场景开放，欢迎通过邮件发送简历或作品。"
        image="/source/index_imgs/20260322-044041.webp"
        actions={[
          { label: "发送简历", href: "mailto:xuzhongxin@sec.hn.cn" },
          { label: "返回招聘首页", href: "/careers/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-5 xl:grid-cols-3">
          {openRoles.map((role) => (
            <Reveal key={role.slug}>
              <RoleCard role={role} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
