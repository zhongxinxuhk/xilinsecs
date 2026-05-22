"use client";

import { ButtonLink } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="site-shell py-28">
      <div className="ink-panel overflow-hidden px-8 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-rose-600 dark:text-rose-400">Error</p>
        <h1 className="heading-display mt-6 text-5xl font-semibold text-slate-950 dark:text-slate-50">
          发生了意外错误
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
          页面加载过程中出现了问题，请尝试刷新或返回首页。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">返回首页</ButtonLink>
          <ButtonLink href="/contact/" variant="outline">联系我们</ButtonLink>
        </div>
      </div>
    </div>
  );
}
