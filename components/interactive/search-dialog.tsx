"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import SmartLink from "@/components/ui/smart-link";
import {
  products,
  services,
  projects,
  tools,
  downloads,
  newsItems,
  type SearchItem
} from "./search-data";

function fuzzyMatch(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

function score(item: SearchItem, query: string): number {
  const q = query.toLowerCase();
  let score = 0;
  if (item.label.toLowerCase().startsWith(q)) score += 10;
  if (item.label.toLowerCase().includes(q)) score += 5;
  if (item.description.toLowerCase().includes(q)) score += 3;
  if (item.category.toLowerCase().includes(q)) score += 2;
  return score;
}

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for global open-search event from header buttons
  const handleOpenSearch = useCallback(() => setOpen(true), []);
  useEffect(() => {
    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, [handleOpenSearch]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
    if (e.key === "Escape" && open) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      // Small delay so focus works after animation
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const allItems = [...products, ...services, ...projects, ...tools, ...downloads, ...newsItems];

  const results = query.length >= 1
    ? allItems
        .filter((item) => fuzzyMatch(item.label, query) || fuzzyMatch(item.description, query))
        .map((item) => ({ item, score: score(item, query) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    : [];

  const categoryColors: Record<string, string> = {};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/25" onClick={() => setOpen(false)} />
      <div className="relative mx-4 w-full max-w-xl animate-scale-in">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
            <Search className="h-5 w-5 flex-none text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索产品、服务、工具、项目..."
              className="flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
            <kbd className="hidden rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-400 sm:inline-block">
              ESC
            </kbd>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 transition hover:text-slate-600 sm:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto overscroll-contain">
            {results.length > 0 ? (
              <ul className="p-2">
                {results.map(({ item }) => (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                    >
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-slate-100 text-lg">
                        {item.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-slate-900">
                            {item.label}
                          </span>
                          <span className={`flex-none rounded-md px-1.5 py-0.5 text-[10px] font-medium ${categoryColors[item.category] || "bg-zinc-100 text-zinc-600"}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </SmartLink>
                  </li>
                ))}
              </ul>
            ) : query.length >= 1 ? (
              <div className="px-4 py-12 text-center text-sm text-slate-500">
                未找到与 &quot;{query}&quot; 相关的结果
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-slate-400">
                输入关键词搜索产品、服务、工具和项目...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
