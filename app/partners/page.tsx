import { buildMetadata } from "@/lib/metadata";
import { partnerPortals, partnershipModes, services } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "合作伙伴",
  description: "伙伴合作方式、申请入口、订单查询与工作台入口。",
  path: "/partners/",
});

export default function PartnersPage() {
  const partnerService = services.find((item) => item.slug === "partners");

  return (
    <>
      <PageHero
        kicker="Partner ecosystem"
        title="把伙伴合作从分散页面升级为一套连续可用的工作路径。"
        description={partnerService?.description ?? "围绕伙伴合作、资料维护、订单查询和协同工作台建立统一入口。"}
        image="/source/index_imgs/zb/rz.jpg"
        actions={[
          { label: "申请合作", href: "/partners/apply/" },
          { label: "进入工作台", href: "/partners/workspace/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <SectionHeading
              kicker="Modes"
              title="三种常见合作方式"
              description="合作不一定要从完整框架协议开始，也可以先从单个项目、区域协同或联合交付试运行。"
            />
          </Reveal>
          <div className="grid gap-4">
            {partnershipModes.map((mode) => (
              <Reveal key={mode.title}>
                <article className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">{mode.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{mode.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Portals"
              title="伙伴入口"
              description="把最常用的伙伴动作集中到同一层路径下，减少记忆成本。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {partnerPortals.map((portal) => (
              <Reveal key={portal.slug}>
                <article className="glass-card flex h-full flex-col p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{portal.audience}</div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-slate-50">{portal.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">{portal.summary}</p>
                  <a href={portal.href} className="mt-6 text-sm font-semibold text-blue-700">
                    打开入口
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="如果你在找一个更清晰的合作和交付方式，我们可以先从一个实际项目开始。"
            description="申请合作并不意味着立刻进入复杂流程。我们更鼓励先明确边界、角色和目标，再决定怎么长期协同。"
            primary={{ label: "发起合作申请", href: "/partners/apply/" }}
            secondary={{ label: "联系团队", href: "/contact/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
