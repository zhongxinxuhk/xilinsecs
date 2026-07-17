type TimelineListProps = {
  items: Array<{
    year: string;
    title: string;
    description: string;
  }>;
};

export default function TimelineList({ items }: TimelineListProps) {
  return (
    <div className="relative ml-2 min-w-0 border-l border-zinc-200 pl-6 sm:ml-4 sm:pl-8">
      {items.map((item, index) => (
        <div key={`${item.year}-${index}`} className="relative pb-10 last:pb-0">
          <div className="absolute -left-[34px] top-1 h-6 w-6 rounded-full border-4 border-zinc-100 bg-zinc-950 sm:-left-[42px]" />
          <div className="glass-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:tracking-[0.18em]">{item.year}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
