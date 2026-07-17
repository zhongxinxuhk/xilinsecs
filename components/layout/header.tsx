"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navigation, siteConfig } from "@/lib/site-data";
import { buttonStyles } from "@/components/ui/button";
import SmartLink from "@/components/ui/smart-link";
import SearchDialog from "@/components/interactive/search-dialog";
import { cn } from "@/lib/utils";

function openSearch() {
  window.dispatchEvent(new Event("open-search"));
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="site-shell pt-3 sm:pt-4">
          <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white/95 px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-4 sm:py-3">
            <SmartLink href="/" className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
              <Image src={siteConfig.logo} alt={siteConfig.shortName} width={40} height={40} className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">HK XSEC</div>
                <div className="max-w-[52vw] truncate text-sm font-medium text-zinc-900 sm:max-w-[360px] xl:max-w-none">
                  {siteConfig.name}
                </div>
              </div>
            </SmartLink>

            <nav className="hidden min-w-0 items-center gap-1 lg:flex xl:gap-2">
              {navigation.map((item) => (
                <div key={item.label} className="group relative">
                  <SmartLink href={item.href} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 xl:px-4">
                    {item.label}
                    {item.children ? <ChevronDown className="h-4 w-4 flex-none transition group-hover:rotate-180" /> : null}
                  </SmartLink>
                  {item.children ? (
                    <div className="pointer-events-none absolute left-1/2 top-full w-max min-w-[220px] max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_16px_50px_rgba(0,0,0,0.10)]">
                        {item.children.map((child) => (
                          <SmartLink key={child.href} href={child.href} className="block rounded-xl px-4 py-3 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950">
                            {child.label}
                          </SmartLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="hidden flex-none items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={openSearch}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-500 transition hover:bg-white hover:text-slate-700"
                aria-label="搜索 (Cmd+K)"
              >
                <Search className="h-4 w-4" />
              </button>
              <SmartLink href="/news/" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
                企业动态
              </SmartLink>
              <SmartLink href={siteConfig.wecomLink} className={buttonStyles({ size: "md" })}>
                与客户经理对话
              </SmartLink>
            </div>

            <div className="flex flex-none items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={openSearch}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-500"
                aria-label="搜索"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex rounded-full border border-slate-200 bg-white/60 p-2 text-slate-700"
                aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
                onClick={() => setMobileOpen((value) => !value)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div
            className={cn(
              "transition-[max-height,opacity] duration-300 lg:hidden",
              mobileOpen
                ? "max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain opacity-100"
                : "max-h-0 overflow-hidden opacity-0"
            )}
          >
            <div className="mt-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_16px_50px_rgba(0,0,0,0.10)] sm:p-4">
              {navigation.map((item) => (
                <div key={item.label} className="border-b border-slate-100 py-3 last:border-none">
                  <SmartLink
                    href={item.href}
                    className="block rounded-2xl px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/80"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </SmartLink>
                  {item.children ? (
                    <div className="mt-2 grid gap-1 pl-2">
                      {item.children.map((child) => (
                        <SmartLink
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-white/70 hover:text-slate-950"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </SmartLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <SmartLink href={siteConfig.wecomLink} className={cn(buttonStyles({ size: "md" }), "mt-4 w-full")} onClick={() => setMobileOpen(false)}>
                与客户经理对话
              </SmartLink>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog />
    </>
  );
}
