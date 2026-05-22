import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { teamMembers } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import Reveal from "@/components/sections/reveal";
import Image from "next/image";
import { BookOpen, Briefcase, Award, Cpu, Shield, Cloud, Sparkles } from "lucide-react";

export function generateStaticParams() {
  const founders = teamMembers.filter((member) => member.title === "创始人");
  return founders.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((m) => m.slug === params.slug);
  if (!member) return {};

  return buildMetadata({
    title: `${member.name} - ${member.title}`,
    description: member.bio,
    path: `/company/leadership/${member.slug}/`,
    image: member.image,
  });
}

export default function FounderDetailPage({ params }: { params: { slug: string } }) {
  const member = teamMembers.find((m) => m.slug === params.slug);
  if (!member || member.title !== "创始人") notFound();

  return (
    <>
      <PageHero
        kicker="Founder"
        title={member.name}
        description={member.bio}
        image={member.image}
        actions={[
          { label: "返回团队页面", href: "/company/leadership/" },
          { label: "联系我们", href: "/contact/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <div className="glass-card overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="relative h-40 w-40 overflow-hidden rounded-[32px] border-2 border-white/60 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-slate-950">{member.name}</h1>
                  <p className="mt-2 text-lg font-medium uppercase tracking-[0.16em] text-blue-700">
                    {member.title}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                    {member.focus.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {member.education && member.education.length > 0 && (
        <section className="section-space pt-0">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="Education"
                title="教育背景"
                description="专业学习与学术成就"
                icon={BookOpen}
              />
            </Reveal>
            <div className="mt-8 space-y-6">
              {member.education.map((edu, index) => (
                <Reveal key={index}>
                  <div className="glass-card p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {edu.institution}
                          </h3>
                          <p className="text-blue-700">{edu.major}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                          {edu.period}
                        </span>
                      </div>
                      {edu.details && edu.details.length > 0 && (
                        <ul className="mt-2 space-y-2">
                          {edu.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {member.projects && member.projects.length > 0 && (
        <section className="section-space pt-0">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="Projects"
                title="重要项目经历"
                description="主导或参与的关键项目"
                icon={Briefcase}
              />
            </Reveal>
            <div className="mt-8 space-y-6">
              {member.projects.map((project, index) => (
                <Reveal key={index}>
                  <div className="glass-card p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {project.company}
                          </h3>
                          <p className="text-blue-700">{project.role}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                          {project.period}
                        </span>
                      </div>
                      <p className="text-sm leading-7 text-slate-600">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {member.workExperience && member.workExperience.length > 0 && (
        <section className="section-space pt-0">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="Experience"
                title="工作经历"
                description="职业发展与专业积累"
                icon={Cpu}
              />
            </Reveal>
            <div className="mt-8 space-y-6">
              {member.workExperience.map((work, index) => (
                <Reveal key={index}>
                  <div className="glass-card p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-950">
                            {work.company}
                          </h3>
                          <p className="text-blue-700">{work.role}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                          {work.period}
                        </span>
                      </div>
                      <ul className="mt-2 space-y-2">
                        {work.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {member.skills && (
        <section className="section-space pt-0">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="Skills"
                title="专业技能"
                description="核心能力与技术专长"
                icon={Sparkles}
              />
            </Reveal>
            <div className="mt-8 space-y-8">
              {member.skills.certifications && member.skills.certifications.length > 0 && (
                <Reveal>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      <Award className="h-4 w-4" />
                      职业资质
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {member.skills.security && member.skills.security.length > 0 && (
                <Reveal>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      <Shield className="h-4 w-4" />
                      网络安全
                    </h4>
                    <ul className="space-y-2">
                      {member.skills.security.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {member.skills.cloud && member.skills.cloud.length > 0 && (
                <Reveal>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      <Cloud className="h-4 w-4" />
                      云计算与虚拟化
                    </h4>
                    <ul className="space-y-2">
                      {member.skills.cloud.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {member.skills.ai && member.skills.ai.length > 0 && (
                <Reveal>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      <Cpu className="h-4 w-4" />
                      AI应用
                    </h4>
                    <ul className="space-y-2">
                      {member.skills.ai.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {member.skills.other && member.skills.other.length > 0 && (
                <Reveal>
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                      <Sparkles className="h-4 w-4" />
                      其他
                    </h4>
                    <ul className="space-y-2">
                      {member.skills.other.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {member.awards && member.awards.length > 0 && (
        <section className="section-space pt-0">
          <div className="site-shell">
            <Reveal>
              <SectionHeading
                kicker="Awards"
                title="竞赛与荣誉"
                description="获得的奖项与荣誉"
                icon={Award}
              />
            </Reveal>
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {member.awards.map((award, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 text-sm font-medium text-amber-800"
                  >
                    {award}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}