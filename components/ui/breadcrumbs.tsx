import { ChevronRight, Home } from "lucide-react";
import SmartLink from "@/components/ui/smart-link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="site-shell pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <li>
          <SmartLink
            href="/"
            className="inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 transition hover:text-slate-900 dark:hover:text-slate-200"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">首页</span>
          </SmartLink>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 flex-none text-slate-300 dark:text-slate-600" />
            {item.href ? (
              <SmartLink
                href={item.href}
                className="rounded-lg px-1.5 py-0.5 transition hover:text-slate-900 dark:hover:text-slate-200"
              >
                {item.label}
              </SmartLink>
            ) : (
              <span className="px-1.5 py-0.5 font-medium text-slate-800 dark:text-slate-200">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
