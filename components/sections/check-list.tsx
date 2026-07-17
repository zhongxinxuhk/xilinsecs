import { Check } from "lucide-react";

type CheckListProps = {
  items: string[];
  tone?: "light" | "dark";
};

export default function CheckList({ items, tone = "light" }: CheckListProps) {
  const textClass = tone === "dark" ? "text-slate-200" : "text-slate-700";
  const iconClass = tone === "dark" ? "bg-cyan-400/15 text-cyan-200" : "bg-blue-100 text-blue-700";

  return (
    <ul className="min-w-0 space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex min-w-0 gap-3 text-sm leading-7 ${textClass}`}>
          <span className={`mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full ${iconClass}`}>
            <Check className="h-4 w-4" />
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
