import { footerGroups, siteConfig } from "@/lib/site-data";
import SmartLink from "@/components/ui/smart-link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/50 bg-slate-950 text-slate-200">
      <div className="site-shell py-14">
        <div className="flex min-w-0 flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 space-y-5 xl:w-[280px] xl:flex-none">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-300 sm:tracking-[0.28em]">HK XSEC</p>
              <h2 className="heading-display mt-3 text-3xl font-semibold text-white">{siteConfig.shortName}</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-400">{siteConfig.description}</p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>{siteConfig.address}</p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>

          <div className="grid min-w-0 flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {footerGroups.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white sm:tracking-[0.18em]">{group.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-400">
                  {group.links.map((link) => (
                    <li key={link.href} className="min-w-0">
                      <SmartLink href={link.href} className="transition hover:text-white">
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex min-w-0 flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-2">
            <p>{siteConfig.copyright}</p>
            <p>{siteConfig.ipv6Text}</p>
          </div>
          <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-3 md:justify-end">
            <SmartLink href={siteConfig.icpLink} className="transition hover:text-white">
              {siteConfig.icpText}
            </SmartLink>
            <SmartLink href={siteConfig.mpsLink} className="transition hover:text-white">
              {siteConfig.mpsText}
            </SmartLink>
            <SmartLink href={siteConfig.verifyLink} className="transition hover:text-white">
              查验证件
            </SmartLink>
            <SmartLink href="https://www.12377.cn/" className="transition hover:text-white">
              互联网违法信息举报
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
