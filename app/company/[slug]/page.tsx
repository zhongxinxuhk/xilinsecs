import { Fingerprint, ShieldCheck, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { leadershipNotes, newsItems, teamMembers, timeline } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import PersonCard from "@/components/sections/person-card";
import TimelineList from "@/components/sections/timeline-list";
import NewsCard from "@/components/sections/news-card";
import IconCardGrid from "@/components/sections/icon-card-grid";
import Reveal from "@/components/sections/reveal";

const companyPages = {
  leadership: {
    title: "管理团队",
    description: "认识团队负责人和组织原则。",
    image: "/source/index_imgs/touxiang/xuzhongxin_index_01.webp",
  },
  timeline: {
    title: "发展历程",
    description: "查看公司发展的关键时间点和阶段性进展。",
    image: "/source/index_imgs/index_01.jpg",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(companyPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!(params.slug in companyPages)) return {};
  const page = companyPages[params.slug as keyof typeof companyPages];

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/company/${params.slug}/`,
    image: page.image,
  });
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  if (!(params.slug in companyPages)) notFound();

  if (params.slug === "timeline") {
    return (
      <>
        <PageHero
          kicker="发展历程"
          title="发展历程"
          description="用关键时间节点记录团队从成立、合作到持续扩展服务边界的过程。"
          image="/source/index_imgs/index_01.jpg"
          actions={[
            { label: "查看企业动态", href: "/news/" },
            { label: "了解团队", href: "/company/leadership/", variant: "outline" },
          ]}
        />

        <section className="section-space">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <SectionHeading
                kicker="关键节点"
                title="关键节点"
                description="这些节点代表了团队如何逐步建立服务结构和合作关系。"
              />
            </Reveal>
            <Reveal>
              <TimelineList items={timeline} />
            </Reveal>
          </div>
        </section>

        <section className="section-space pt-0">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="相关动态"
                title="相关动态"
                description="时间线之外，阶段性变化也会同步记录到企业动态中。"
              />
            </Reveal>
            <div className="mt-8 grid gap-5 xl:grid-cols-3">
              {newsItems.slice(0, 3).map((item) => (
                <Reveal key={item.slug}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

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
                  icon: [Users, Fingerprint, ShieldCheck][index] ?? ShieldCheck,
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
