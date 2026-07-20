"use client";

import { useEffect, useRef } from "react";
import { footerGroups, siteConfig } from "@/lib/site-data";
import SmartLink from "@/components/ui/smart-link";
import { gsap } from "gsap";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper.querySelectorAll(".footer-group, .footer-brand, .footer-meta"),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: wrapper, start: "top 92%" },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={wrapperRef} id="site-footer" className="relative overflow-hidden border-t border-blue-100 bg-[#f7faff] text-slate-700">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.10),transparent_55%)]"
      />
      <div className="site-shell relative">
        <div className="grid border-l border-blue-100 lg:grid-cols-[.8fr_1.2fr]">
          <div className="footer-brand border-b border-r border-blue-100 p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">HK XSEC</p>
            <h2 className="heading-display mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">{siteConfig.shortName}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{siteConfig.description}</p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-none text-blue-600" />
                <span>{siteConfig.registeredAddress}</span>
              </p>
              <a href={`mailto:${siteConfig.email}`} className="flex gap-3 transition hover:text-blue-700">
                <Mail className="mt-1 h-4 w-4 flex-none text-cyan-600" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7">
            {footerGroups.map((group) => (
              <div key={group.title} className="footer-group group relative border-b border-r border-blue-100 p-6 transition-colors duration-300 hover:bg-white/80 sm:p-8">
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <h3 className="text-sm font-semibold text-slate-950">{group.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-500">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink href={link.href} className="inline-flex items-center transition hover:translate-x-0.5 hover:text-blue-700">
                        <span>{link.label}</span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-meta flex flex-col gap-4 border-x border-b border-blue-100 px-8 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>{siteConfig.copyright}</span>
            <span>{siteConfig.ipv6Text}</span>
          </div>
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
