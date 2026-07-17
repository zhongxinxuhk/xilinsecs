import { buildMetadata } from "@/lib/metadata";
import { downloads } from "@/lib/site-data";
import PageHero from "@/components/sections/page-hero";
import SectionHeading from "@/components/sections/section-heading";
import DownloadCard from "@/components/sections/download-card";
import Reveal from "@/components/sections/reveal";

export const metadata = buildMetadata({
  title: "下载中心",
  description: "iOA 与跨境办公客户端、安装指南和接入说明。",
  path: "/downloads/",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        kicker="下载中心"
        title="办公软件与安全接入资源。"
        description="获取 iOA、跨境办公客户端及对应平台的安装与接入指南。"
        image="/source/index_imgs/index_01.jpg"
        actions={[
          { label: "联系团队", href: "/contact/" },
          { label: "查看工具中心", href: "/tools/", variant: "outline" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              kicker="资源下载"
              title="下载资源"
              description="面向员工、客户或授权伙伴的软件下载和接入说明。"
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {downloads.map((item) => (
              <Reveal key={item.slug}>
                <DownloadCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
