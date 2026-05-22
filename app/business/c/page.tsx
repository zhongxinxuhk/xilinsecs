import { buildMetadata } from "@/lib/metadata";
import {
  contactPortals,
  customerPortals,
  customerTicketPortals,
  downloads,
} from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import DownloadCard from "@/components/sections/download-card";
import CtaBanner from "@/components/sections/cta-banner";
import Reveal from "@/components/sections/reveal";
import SmartLink from "@/components/ui/smart-link";

const requestPortal = contactPortals.find((item) => item.slug === "request");
const ordersPortal = customerPortals.find((item) => item.slug === "orders");
const subscriptionsPortal = customerPortals.find((item) => item.slug === "subscriptions");
const profilePortal = customerPortals.find((item) => item.slug === "profile");
const newTicketPortal = customerTicketPortals.find((item) => item.slug === "new");
const ticketStatusPortal = customerTicketPortals.find((item) => item.slug === "status");

const serviceCards = [
  requestPortal
    ? {
        title: requestPortal.title,
        summary: requestPortal.summary,
        href: "/business/c/need.html",
        label: "提交需求",
      }
    : null,
  ordersPortal
    ? {
        title: ordersPortal.title,
        summary: ordersPortal.summary,
        href: ordersPortal.href,
        label: "查看订单",
      }
    : null,
  subscriptionsPortal
    ? {
        title: subscriptionsPortal.title,
        summary: subscriptionsPortal.summary,
        href: subscriptionsPortal.href,
        label: "查看订阅",
      }
    : null,
  profilePortal
    ? {
        title: profilePortal.title,
        summary: profilePortal.summary,
        href: profilePortal.href,
        label: "查看信息",
      }
    : null,
  newTicketPortal
    ? {
        title: newTicketPortal.title,
        summary: newTicketPortal.summary,
        href: newTicketPortal.href,
        label: "发起工单",
      }
    : null,
  ticketStatusPortal
    ? {
        title: ticketStatusPortal.title,
        summary: ticketStatusPortal.summary,
        href: ticketStatusPortal.href,
        label: "查询工单",
      }
    : null,
].filter(Boolean) as Array<{
  title: string;
  summary: string;
  href: string;
  label: string;
}>;

export const metadata = buildMetadata({
  title: "客户服务中心",
  description: "提交需求、查询订单与订阅、发起工单和查看客户资料的统一入口。",
  path: "/business/c/",
  image: "/source/index_imgs/wx.jpg",
});

export default function LegacyCustomerServicePage() {
  return (
    <>
      <PageHero
        kicker="Customer service"
        title="客户服务中心"
        description="把需求提交、订单与订阅查询、客户资料和工单流程集中到一个清晰入口里，减少来回跳转和重复沟通。"
        image="/source/index_imgs/wx.jpg"
        actions={[
          { label: "提交项目需求", href: "/business/c/need.html" },
          { label: "联系团队", href: "/contact/", variant: "outline" },
        ]}
        aside={
          <div className="glass-card p-6 text-slate-950 dark:text-slate-50">
            <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Service scope</p>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
              适合现有客户和潜在客户快速进入正确入口，也方便团队把需求、查询和售后动作统一收口。
            </p>
          </div>
        }
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="Primary actions"
              title="常用服务入口"
              description="无论是新需求还是已有项目查询，都可以从这里快速进入对应流程。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {serviceCards.map((card) => (
              <Reveal key={card.href}>
                <article className="glass-card flex h-full flex-col p-6 text-slate-950 dark:text-slate-50">
                  <h3 className="text-xl font-semibold">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">{card.summary}</p>
                  <SmartLink
                    href={card.href}
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    {card.label}
                  </SmartLink>
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
              kicker="Downloads"
              title="办公与接入下载"
              description="如果你同时需要办公接入或下载说明，也可以直接从这里进入。"
            />
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {downloads.map((item) => (
              <Reveal key={item.slug}>
                <DownloadCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <Reveal>
          <CtaBanner
            title="如果你还不确定该选哪个入口，我们可以一起先把问题分清楚。"
            description="从一个明确问题开始即可，我们会帮你判断更适合走需求沟通、查询入口还是售后流程。"
            primary={{ label: "联系客户经理", href: "/contact/" }}
            secondary={{ label: "查看服务能力", href: "/services/customer/" }}
          />
        </Reveal>
      </section>
    </>
  );
}
