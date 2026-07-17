import { Fingerprint, ShieldCheck, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getNewsBySlug, leadershipNotes, newsItems, teamMembers, timeline } from "@/lib/site-data";
import CtaBanner from "@/components/sections/cta-banner";
import IconCardGrid from "@/components/sections/icon-card-grid";
import NewsCard from "@/components/sections/news-card";
import PageHero from "@/components/sections/page-hero";
import PersonCard from "@/components/sections/person-card";
import Reveal from "@/components/sections/reveal";
import SectionHeading from "@/components/sections/section-heading";
import TimelineList from "@/components/sections/timeline-list";
import { formatDate } from "@/lib/utils";

const leadershipLegacyEntries = [
  { path: "fzlc", kind: "timeline" },
  { path: "teams/qgyw", kind: "team" },
  { path: "pages/2025/finance_q2.html", kind: "finance" },
] as const;

function findEntry(path: string) {
  return leadershipLegacyEntries.find((entry) => entry.path === path);
}

export function generateStaticParams() {
  return leadershipLegacyEntries.map((entry) => ({
    slug: entry.path.split("/"),
  }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const entry = findEntry(params.slug.join("/"));
  if (!entry) return {};

  if (entry.kind === "timeline") {
    return buildMetadata({
      title: "发展历程",
      description: "查看公司发展的关键时间点和阶段性进展。",
      path: "/company/timeline/",
      image: "/source/index_imgs/index_01.jpg",
    });
  }

  if (entry.kind === "team") {
    return buildMetadata({
      title: "团队成员",
      description: "了解 HK XSEC 的团队成员与角色分工。",
      path: "/careers/team/",
      image: "/source/index_imgs/touxiang/chenziyi_index_01.webp",
    });
  }

  if (entry.kind === "finance") {
    const item = getNewsBySlug("2025", "finance-q2-brief");
    if (!item) return {};

    return buildMetadata({
      title: item.seoTitle,
      description: item.seoDescription,
      path: item.href,
      image: item.heroImage,
    });
  }

  return buildMetadata({
    title: "企业动态",
    description: "查看 HK XSEC 的平台发布、服务升级和经营信息动态。",
    path: "/news/",
    image: "/leadership/indexnews/images/news/post6.webp",
  });
}

function renderNewsHome() {
  return (
    <>
      <PageHero
        kicker="企业动态"
        title="平台发布、服务升级与经营信息，都放进同一条动态时间线。"
        description="新的动态页不再只是零散公告，而是围绕品牌站、服务入口和业务进展组织内容。"
        image="/leadership/indexnews/images/news/post6.webp"
        actions={[
          { label: "查看关于我们", href: "/about/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="全部动态"
              title="全部动态"
              description="包括平台发布、服务升级和经营信息摘要。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((item) => (
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

function renderTimeline() {
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
    </>
  );
}

function renderTeam() {
  return (
    <>
      <PageHero
        kicker="管理团队"
        title="团队成员"
        description="认识你未来可能会一起协作的成员，以及他们各自关注的问题域。"
        image="/source/index_imgs/touxiang/chenziyi_index_01.webp"
        actions={[
          { label: "查看开放职位", href: "/careers/open-roles/" },
          { label: "返回招聘首页", href: "/careers/", variant: "outline" },
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

function renderFinanceBrief() {
  const item = getNewsBySlug("2025", "finance-q2-brief");
  if (!item) return null;

  return (
    <>
      <PageHero
        kicker={`${item.category} · ${formatDate(item.date)}`}
        title={item.title}
        description={item.description}
        image={item.heroImage}
        actions={[
          { label: "返回企业动态", href: "/news/" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell max-w-4xl">
          <Reveal>
            <article className="glass-card p-8">
              <div className="space-y-5 text-base leading-8 text-slate-700">
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="如果你想知道这些阶段性变化和你的项目有什么关系，我们可以一起聊。"
            description="官网升级、服务入口整合和基础设施改造，都可能受到组织节奏和业务边界变化的影响。"
            primary={{ label: "联系团队", href: "/contact/" }}
            secondary={{ label: "继续查看动态", href: "/news/" }}
          />
        </Reveal>
      </section>
    </>
  );
}

export default function LegacyLeadershipNestedPage({ params }: { params: { slug: string[] } }) {
  const entry = findEntry(params.slug.join("/"));
  if (!entry) notFound();

  if (entry.kind === "timeline") return renderTimeline();
  if (entry.kind === "team") return renderTeam();

  const finance = renderFinanceBrief();
  if (!finance) notFound();
  return finance;
}
