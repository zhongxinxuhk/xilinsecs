export default function Loading() {
  return (
    <div className="site-shell py-28">
      <div className="rainbow-panel overflow-hidden px-8 py-16 text-center">
        <div className="section-kicker mx-auto inline-flex">加载中</div>
        <h1 className="heading-display mt-6 text-3xl font-semibold text-slate-950">
          正在为你加载页面…
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
          静态资源正在被请求，预计几秒内即可呈现。
        </p>
        <div className="mx-auto mt-10 flex items-center justify-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: "0s" }} />
          <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-500" style={{ animationDelay: "0.15s" }} />
          <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}
