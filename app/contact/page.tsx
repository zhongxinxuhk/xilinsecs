import { buildMetadata } from "@/lib/metadata";
import { contactChannels, customerPortals, customerTicketPortals, downloads } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import IconCardGrid from "@/components/sections/icon-card-grid";
import DownloadCard from "@/components/sections/download-card";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "联系我们",
  description: "项目需求、客户服务、下载和沟通入口的统一联系页。",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="把联系、需求、查询和下载放在一个更容易理解的入口里。"
        description="无论你是要发起项目需求、进入客户服务、联系伙伴协作，还是寻找下载入口，都可以从这里开始。"
        image="/source/index_imgs/wx.jpg"
        actions={[
          { label: "提交项目需求", href: "/contact/request/" },
          { label: "打开工具中心", href: "/tools/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Primary actions"
              title="主要联系动作"
              description="如果你不确定该从哪个入口开始，优先使用这里的三个主动作。"
            />
          </Reveal>
          <div className="mt-8">
            <Reveal>
              <IconCardGrid
                items={contactChannels.map((item) => ({
                  title: item.title,
                  description: item.description,
                  icon: item.icon,
                  href: item.href,
                  label: item.label,
                }))}
                columns="three"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="site-shell grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading
                kicker="Customer service"
                title="客户服务入口"
                description="适合现有客户查询订单、订阅或工单状态。"
              />
              <div className="mt-6 grid gap-4">
                {[...customerPortals, ...customerTicketPortals].map((portal) => (
                  <article key={portal.slug} className="glass-card p-5">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-50">{portal.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">{portal.summary}</p>
                    <a href={portal.href} className="mt-4 inline-flex text-sm font-semibold text-blue-700">
                      打开入口
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <SectionHeading
                kicker="Downloads"
                title="下载与接入"
                description="软件下载和接入说明也统一收口到新站中。"
              />
              <div className="mt-6 grid gap-4">
                {downloads.map((item) => (
                  <DownloadCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
