"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { gsap } from "gsap";
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-100/50 bg-white/80 backdrop-blur-xl backdrop-saturate-150 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] data-[scrolled=true]:border-blue-200/60 data-[scrolled=true]:bg-white/90 data-[scrolled=true]:shadow-[0_8px_32px_rgba(37,99,235,0.08)]" data-scrolled={false}>
        <ScrollShadow />
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
              <NavItemComponent key={item.label} item={item} />
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
              aria-label="搜索 (Cmd+K)"
            >
              <Search className="h-4 w-4" />
            </button>
            <SmartLink href="/news/" className="px-3 text-sm font-medium text-slate-600 hover:text-blue-700">企业动态</SmartLink>
            <SmartLink href="/status/" className="inline-flex items-center gap-1.5 px-3 text-sm font-medium text-slate-600 hover:text-blue-700">
              <span className="inline-block h-1.5 w-1.5 animate-[pulse_2.6s_ease-in-out_infinite] rounded-full bg-emerald-500" />
              服务状态
            </SmartLink>
            <SmartLink href={siteConfig.wecomLink} className={buttonStyles({ size: "md" })}>与客户经理对话</SmartLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-500"
              aria-label="搜索"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-700"
              aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "border-t border-blue-100 bg-white transition-[max-height,opacity] duration-300 lg:hidden",
            mobileOpen ? "max-h-[calc(100vh-72px)] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden border-t-0 opacity-0"
          )}
        >
          <div className="site-shell py-4">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-blue-50 py-2 last:border-0">
                <SmartLink
                  href={item.href}
                  className="block py-2 text-sm font-semibold text-slate-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </SmartLink>
                {item.children ? (
                  <div className="grid grid-cols-2 gap-1 pb-2">
                    {item.children.map((child) => (
                      <SmartLink
                        key={child.href}
                        href={child.href}
                        className="py-2 text-sm text-slate-500"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </SmartLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <SmartLink
              href={siteConfig.wecomLink}
              className={cn(buttonStyles({ size: "md" }), "mt-4 w-full")}
              onClick={() => setMobileOpen(false)}
            >
              与客户经理对话
            </SmartLink>
          </div>
        </div>
      </header>
      <SearchDialog />
    </>
  );
}

function ScrollShadow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      const scrolled = window.scrollY > 12;
      document.querySelectorAll("header[data-scrolled]").forEach((node) => {
        node.setAttribute("data-scrolled", scrolled ? "true" : "false");
      });
      // header height hint for readers reading progress
      if (ref.current) ref.current.style.opacity = scrolled ? "1" : "0";
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-cyan-500/0 opacity-0 transition-opacity duration-500" />;
}

function NavItemComponent({ item }: { item: typeof navigation[number] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = () =>
    dropdownRef.current ? Array.from(dropdownRef.current.querySelectorAll<HTMLAnchorElement>("a")) : [];

  const animateIn = () => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;
    const anchors = links();
    gsap.killTweensOf(dropdown);
    gsap.killTweensOf(anchors);
    gsap.fromTo(dropdown, { autoAlpha: 0, y: -6 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power3.out" });
    gsap.fromTo(anchors, { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: "power3.out", stagger: 0.04 });
  };

  const animateOut = () => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;
    const anchors = links();
    gsap.killTweensOf(dropdown);
    gsap.killTweensOf(anchors);
    gsap.to([dropdown, ...anchors], { autoAlpha: 0, duration: 0.18, ease: "power2.in", overwrite: true });
  };

  const handleEnter = () => {
    if (hideTimeout.current) { clearTimeout(hideTimeout.current); hideTimeout.current = null; }
    if (showTimeout.current) clearTimeout(showTimeout.current);
    showTimeout.current = setTimeout(animateIn, 60);
  };

  const handleLeave = () => {
    if (showTimeout.current) { clearTimeout(showTimeout.current); showTimeout.current = null; }
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(animateOut, 80);
  };

  useEffect(() => {
    return () => {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  if (!item.children) {
    return (
      <div ref={wrapperRef} className="relative">
        <SmartLink
          href={item.href}
          className="flex h-[72px] items-center gap-1 px-4 text-sm font-medium text-slate-600 transition hover:text-blue-700"
        >
          {item.label}
        </SmartLink>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="group relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <SmartLink
        href={item.href}
        className="flex h-[72px] items-center gap-1 px-4 text-sm font-medium text-slate-600 transition hover:text-blue-700"
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
      </SmartLink>
      <div
        ref={dropdownRef}
        className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2"
      >
        <div className="border border-blue-100 bg-white p-2 shadow-[0_20px_60px_rgba(37,99,235,.13)]">
          {item.children.map((child) => (
            <SmartLink
              key={child.href}
              href={child.href}
              className="block truncate border-b border-blue-50 px-4 py-3 text-sm text-slate-600 transition last:border-0 hover:bg-blue-50 hover:text-blue-700"
            >
              {child.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  );
}
