type FaqListProps = {
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export default function FaqList({ items }: FaqListProps) {
  return (
    <div className="grid min-w-0 gap-4">
      {items.map((item) => (
        <details key={item.question} className="glass-card group p-5 sm:p-6">
          <summary className="cursor-pointer list-none text-base font-semibold text-slate-950 dark:text-slate-50">
            {item.question}
          </summary>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
