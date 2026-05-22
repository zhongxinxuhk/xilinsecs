type ProcessStepsProps = {
  steps: string[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <article key={step} className="glass-card p-5 sm:p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 sm:tracking-[0.22em]">
            Step {index + 1}
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">{step}</p>
        </article>
      ))}
    </div>
  );
}
