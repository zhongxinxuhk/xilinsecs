"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-data";
import { buttonStyles } from "@/components/ui/button";
import SmartLink from "@/components/ui/smart-link";
import SearchDialog from "@/components/interactive/search-dialog";
import { cn } from "@/lib/utils";

function openSearch() { window.dispatchEvent(new Event("open-search")); }

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
        <div className="site-shell flex h-[72px] items-center justify-between gap-5">
          <SmartLink href="/" className="flex min-w-0 items-center gap-3">
            <Image src={siteConfig.logo} alt={siteConfig.shortName} width={38} height={38} className="h-9 w-9 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">HK XSEC</div>
              <div className="hidden truncate text-xs font-medium text-slate-700 sm:block">{siteConfig.name}</div>
            </div>
          </SmartLink>

          <nav className="hidden items-center lg:flex">
            {navigation.map((item) => (
              <div key={item.label} className="group relative">
                <SmartLink href={item.href} className="flex h-[72px] items-center gap-1 px-4 text-sm font-medium text-slate-600 transition hover:text-blue-700">
                  {item.label}
                  {item.children ? <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" /> : null}
                </SmartLink>
                {item.children ? (
                  <div className="pointer-events-none absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="border border-blue-100 bg-white p-2 shadow-[0_20px_60px_rgba(37,99,235,.13)]">
                      {item.children.map((child) => (
                        <SmartLink key={child.href} href={child.href} className="block border-b border-blue-50 px-4 py-3 text-sm text-slate-600 transition last:border-0 hover:bg-blue-50 hover:text-blue-700">
                          {child.label}
                        </SmartLink>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button type="button" onClick={openSearch} className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-blue-700" aria-label="搜索 (Cmd+K)">
              <Search className="h-4 w-4" />
            </button>
            <SmartLink href="/news/" className="px-3 text-sm font-medium text-slate-600 hover:text-blue-700">企业动态</SmartLink>
            <SmartLink href={siteConfig.wecomLink} className={buttonStyles({ size: "md" })}>与客户经理对话</SmartLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button type="button" onClick={openSearch} className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-500" aria-label="搜索"><Search className="h-4 w-4" /></button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-700" aria-label={mobileOpen ? "关闭菜单" : "打开菜单"} onClick={() => setMobileOpen((value) => !value)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={cn("border-t border-blue-100 bg-white transition-[max-height,opacity] duration-300 lg:hidden", mobileOpen ? "max-h-[calc(100vh-72px)] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden border-t-0 opacity-0")}>
          <div className="site-shell py-4">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-blue-50 py-2 last:border-0">
                <SmartLink href={item.href} className="block py-2 text-sm font-semibold text-slate-900" onClick={() => setMobileOpen(false)}>{item.label}</SmartLink>
                {item.children ? <div className="grid grid-cols-2 gap-1 pb-2">{item.children.map((child) => <SmartLink key={child.href} href={child.href} className="py-2 text-sm text-slate-500" onClick={() => setMobileOpen(false)}>{child.label}</SmartLink>)}</div> : null}
              </div>
            ))}
            <SmartLink href={siteConfig.wecomLink} className={cn(buttonStyles({ size: "md" }), "mt-4 w-full")} onClick={() => setMobileOpen(false)}>与客户经理对话</SmartLink>
          </div>
        </div>
      </header>
      <SearchDialog />
    </>
  );
}
