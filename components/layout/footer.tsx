import { footerGroups, siteConfig } from "@/lib/site-data";
import SmartLink from "@/components/ui/smart-link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-blue-100 bg-[#f7faff] text-slate-700">
      <div className="site-shell">
        <div className="grid border-l border-blue-100 lg:grid-cols-[.8fr_1.2fr]">
          <div className="border-b border-r border-blue-100 p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">HK XSEC</p>
            <h2 className="heading-display mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">{siteConfig.shortName}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{siteConfig.description}</p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <p className="flex gap-3"><MapPin className="mt-1 h-4 w-4 flex-none text-blue-600" /><span>{siteConfig.registeredAddress}</span></p>
              <a href={`mailto:${siteConfig.email}`} className="flex gap-3 transition hover:text-blue-700"><Mail className="mt-1 h-4 w-4 flex-none text-cyan-600" /><span>{siteConfig.email}</span></a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
            {footerGroups.map((group) => (
              <div key={group.title} className="border-b border-r border-blue-100 p-6 sm:p-8">
                <h3 className="text-sm font-semibold text-slate-950">{group.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                  {group.links.map((link) => <li key={link.href}><SmartLink href={link.href} className="transition hover:text-blue-700">{link.label}</SmartLink></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-x border-b border-blue-100 px-8 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2"><span>{siteConfig.copyright}</span><span>{siteConfig.ipv6Text}</span></div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <SmartLink href={siteConfig.icpLink} className="hover:text-blue-700">{siteConfig.icpText}</SmartLink>
            <SmartLink href={siteConfig.mpsLink} className="hover:text-blue-700">{siteConfig.mpsText}</SmartLink>
            <SmartLink href={siteConfig.verifyLink} className="hover:text-blue-700">查验证件</SmartLink>
            <SmartLink href="https://www.12377.cn/" className="hover:text-blue-700">互联网违法信息举报</SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
