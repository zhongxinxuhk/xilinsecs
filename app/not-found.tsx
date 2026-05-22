import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-shell py-28">
      <div className="ink-panel overflow-hidden px-8 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-blue-700">404</p>
        <h1 className="heading-display mt-6 text-5xl font-semibold text-slate-950 dark:text-slate-50">页面未找到</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
          这个地址没有对应的新页面，可能是旧目录路径已经被重构。你可以回到首页，或直接进入服务、案例和联系页。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 dark:text-slate-50">
            返回首页
          </Link>
          <Link href="/contact/" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 dark:text-slate-100">
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
}
