import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-shell py-28">
      <div className="rainbow-panel overflow-hidden px-8 py-16 text-center">
        <div className="section-kicker mx-auto inline-flex">404 · 页面未找到</div>
        <h1 className="heading-display mt-6 text-5xl font-semibold text-slate-950">这个页面已经走出站点了</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
          找不到你要访问的页面。可以回到首页，或前往服务、案例与联系页面找找方向。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">返回首页</ButtonLink>
          <ButtonLink href="/contact/" size="lg" variant="outline">联系我们</ButtonLink>
        </div>
      </div>
    </div>
  );
}
