export default function Loading() {
  return (
    <div className="site-shell py-28">
      <div className="ink-panel overflow-hidden px-8 py-16 text-center">
        <div className="section-kicker">Loading</div>
        <h1 className="heading-display mt-6 text-3xl font-semibold text-slate-950 dark:text-slate-50">
          页面加载中...
        </h1>
        <div className="mx-auto mt-8 flex items-center justify-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
          <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: "0.15s" }} />
          <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}
