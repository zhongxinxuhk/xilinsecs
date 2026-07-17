import { footerGroups, siteConfig } from "@/lib/site-data";
import SmartLink from "@/components/ui/smart-link";
import { Building2, Mail, MapPin } from "lucide-react";

const contactItems = [
  {
    label: "注册地址",
    value: siteConfig.registeredAddress,
    icon: Building2,
  },
  {
    label: "通讯地址",
    value: siteConfig.mailingAddress,
    icon: MapPin,
  },
  {
    label: "联系邮箱",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="mt-20 border-t border-zinc-200 bg-zinc-50 text-zinc-700">
      <div className="site-shell py-10 sm:py-12 lg:py-14">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,430px)_1fr] xl:grid-cols-[minmax(0,480px)_1fr] xl:gap-16 2xl:gap-20">
          <div className="min-w-0">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 sm:tracking-[0.32em]">HK XSEC</p>
              <h2 className="heading-display mt-3 text-3xl font-semibold text-zinc-950 sm:text-4xl">{siteConfig.shortName}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">{siteConfig.description}</p>
            </div>

            <div className="mt-6 grid gap-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-zinc-500">{item.label}</span>
                      <span className="mt-1 block break-words text-sm leading-6 text-zinc-700">{item.value}</span>
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex min-w-0 items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3 transition hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex min-w-0 items-start gap-3 rounded-lg border border-zinc-200 bg-white p-3">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 xl:grid-cols-6">
            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="text-sm font-semibold tracking-[0.08em] text-zinc-950 sm:tracking-[0.14em]">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
                  {group.links.map((link) => (
                    <li key={link.href} className="min-w-0">
                      <SmartLink href={link.href} className="inline-flex max-w-full break-words transition hover:text-zinc-950">
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex min-w-0 flex-col gap-5 border-t border-zinc-200 pt-6 text-sm text-zinc-500 md:mt-12 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-2">
            <p>{siteConfig.copyright}</p>
            <p>{siteConfig.ipv6Text}</p>
          </div>
          <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-3 md:max-w-3xl md:justify-end md:text-right">
            <SmartLink href={siteConfig.icpLink} className="max-w-full break-words transition hover:text-zinc-950">
              {siteConfig.icpText}
            </SmartLink>
            <SmartLink href={siteConfig.mpsLink} className="max-w-full break-words transition hover:text-zinc-950">
              {siteConfig.mpsText}
            </SmartLink>
            <SmartLink href={siteConfig.verifyLink} className="max-w-full break-words transition hover:text-zinc-950">
              查验证件
            </SmartLink>
            <SmartLink href="https://www.12377.cn/" className="max-w-full break-words transition hover:text-zinc-950">
              互联网违法信息举报
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
