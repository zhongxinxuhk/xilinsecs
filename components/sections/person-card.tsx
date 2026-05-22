import Image from "next/image";
import Link from "next/link";

type PersonCardProps = {
  person: {
    name: string;
    title: string;
    bio: string;
    image: string;
    slug?: string;
  };
};

export default function PersonCard({ person }: PersonCardProps) {
  const isFounder = person.title === "创始人";
  const href = isFounder && person.slug ? `/company/leadership/${person.slug}/` : undefined;

  const cardContent = (
    <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
      <div className="relative h-28 w-28 flex-none overflow-hidden rounded-[24px] border border-white/60">
        <Image src={person.image} alt={person.name} fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-slate-50">{person.name}</h3>
        <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-blue-700 sm:tracking-[0.16em]">{person.title}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{person.bio}</p>
        {isFounder && (
          <p className="mt-2 text-xs text-blue-600">点击查看详细介绍</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block glass-card cursor-pointer overflow-hidden p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg sm:p-6"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className="glass-card overflow-hidden p-5 sm:p-6">
      {cardContent}
    </article>
  );
}
