import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getServiceBySlug, projects, services } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CheckList from "@/components/sections/check-list";
import ProjectCard from "@/components/sections/project-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: service.href,
    image: service.heroImage,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        kicker={service.audience}
        title={service.title}
        description={service.description}
        image={service.heroImage}
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看相关案例", href: "/projects/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">服务范围</p>
            <p className="mt-4 text-base leading-8 text-slate-600">{service.summary}</p>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="核心能力" description="主要服务范围与交付内容。" />
              <div className="mt-6">
                <CheckList items={service.capabilities} />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-6">
              <SectionHeading title="交付结果" description="交付物、业务成果与后续维护支持。" />
              <div className="mt-6">
                <CheckList items={[...service.deliverables, ...service.outcomes]} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="相关案例"
              title="相关案例"
              description="这些项目更能体现这条服务路径的交付方式。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title={`从 ${service.title} 开始，把问题收束成可执行的交付路径。`}
            description="如果你已经知道大致方向，可以直接联系团队；如果还不确定，我们也可以先一起拆解问题。"
            primary={{ label: "发起沟通", href: "/contact/" }}
            secondary={{ label: "返回服务总览", href: "/services/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
