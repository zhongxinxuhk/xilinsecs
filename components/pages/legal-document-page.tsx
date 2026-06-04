import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { CheckSquare, FileText, Square } from "lucide-react";
import PageHero from "@/components/sections/page-hero";
import { legalDocumentList, type LegalDocumentSlug } from "@/lib/site-data";
import SmartLink from "@/components/ui/smart-link";

type HeadingBlock = {
  type: "heading";
  level: 2 | 3;
  id: string;
  text: string;
};

type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type ListBlock = {
  type: "list";
  ordered: boolean;
  items: string[];
};

type ChecklistBlock = {
  type: "checklist";
  items: Array<{
    checked: boolean;
    text: string;
  }>;
};

type TableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type MarkdownBlock = HeadingBlock | ParagraphBlock | ListBlock | ChecklistBlock | TableBlock;

type LegalDocumentPageProps = {
  slug: LegalDocumentSlug;
};

const legalContentDirectory = path.join(process.cwd(), "content", "legal");

function readMarkdown(source: string) {
  return fs.readFileSync(path.join(legalContentDirectory, source), "utf8");
}

function isTableLine(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return parseTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let sectionIndex = 0;
  let subsectionIndex = 0;

  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join("\n") });
    paragraph = [];
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].replace(/\s+$/, "");
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (/^#\s+/.test(trimmed)) {
      flushParagraph();
      continue;
    }

    const headingMatch = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      const level = headingMatch[1].length as 2 | 3;
      if (level === 2) {
        sectionIndex += 1;
        subsectionIndex = 0;
      } else {
        subsectionIndex += 1;
      }
      blocks.push({
        type: "heading",
        level,
        id: level === 2 ? `section-${sectionIndex}` : `section-${sectionIndex}-${subsectionIndex}`,
        text: headingMatch[2],
      });
      continue;
    }

    if (isTableLine(trimmed) && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
      flushParagraph();
      const tableLines: string[] = [];
      while (index < lines.length && isTableLine(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }
      index -= 1;
      const headers = parseTableRow(tableLines[0]);
      const rows = tableLines.slice(2).map(parseTableRow);
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length) {
        const itemMatch = /^\d+\.\s+(.+)$/.exec(lines[index].trim());
        if (!itemMatch) break;
        items.push(itemMatch[1]);
        index += 1;
      }
      index -= 1;
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      flushParagraph();
      const rawItems: string[] = [];
      while (index < lines.length) {
        const itemMatch = /^-\s+(.+)$/.exec(lines[index].trim());
        if (!itemMatch) break;
        rawItems.push(itemMatch[1]);
        index += 1;
      }
      index -= 1;

      const checklistItems = rawItems.map((item) => /^\[( |x|X)\]\s+(.+)$/.exec(item));
      if (checklistItems.every(Boolean)) {
        blocks.push({
          type: "checklist",
          items: checklistItems.map((item) => ({
            checked: item?.[1].toLowerCase() === "x",
            text: item?.[2] ?? "",
          })),
        });
      } else {
        blocks.push({ type: "list", ordered: false, items: rawItems });
      }
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}

function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <code
        key={`${match.index}-${match[1]}`}
        className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[0.92em] text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      >
        {match[1]}
      </code>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderParagraph(text: string) {
  return text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {renderInline(line)}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function renderBlock(block: MarkdownBlock) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2 id={block.id} className="scroll-mt-28 pt-6 text-2xl font-semibold leading-snug text-slate-950 dark:text-white">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 id={block.id} className="scroll-mt-28 pt-3 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
          {block.text}
        </h3>
      );
    case "paragraph":
      return <p className="text-sm leading-8 text-slate-700 dark:text-slate-300 sm:text-base">{renderParagraph(block.text)}</p>;
    case "list":
      if (block.ordered) {
        return (
          <ol className="space-y-3 pl-5 text-sm leading-8 text-slate-700 dark:text-slate-300 sm:text-base">
            {block.items.map((item) => (
              <li key={item} className="list-decimal pl-1">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-3 pl-5 text-sm leading-8 text-slate-700 dark:text-slate-300 sm:text-base">
          {block.items.map((item) => (
            <li key={item} className="list-disc pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    case "checklist":
      return (
        <ul className="space-y-3 text-sm leading-8 text-slate-700 dark:text-slate-300 sm:text-base">
          {block.items.map((item) => (
            <li key={item.text} className="flex gap-3">
              {item.checked ? (
                <CheckSquare className="mt-1.5 h-4 w-4 flex-none text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <Square className="mt-1.5 h-4 w-4 flex-none text-slate-400 dark:text-slate-500" aria-hidden="true" />
              )}
              <span>{renderInline(item.text)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="max-w-full overflow-x-auto rounded-xl border border-slate-200 bg-white/60 dark:border-slate-700 dark:bg-slate-900/40">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="border-b border-slate-200 px-4 py-3 font-semibold dark:border-slate-700">
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-slate-200 dark:border-slate-700">
                  {row.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top leading-7">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function LegalDocumentPage({ slug }: LegalDocumentPageProps) {
  const document = legalDocumentList.find((item) => item.slug === slug);

  if (!document) {
    return null;
  }

  const blocks = parseMarkdown(readMarkdown(document.source));
  const sectionHeadings = blocks.filter((block): block is HeadingBlock => block.type === "heading" && block.level === 2);
  const alternateDocuments = legalDocumentList.filter((item) => item.slug !== slug);

  return (
    <>
      <PageHero
        kicker={document.kicker}
        title={document.title}
        description={document.description}
        image="/source/index_imgs/index_cplb01.webp"
        actions={[
          ...alternateDocuments.map((item) => ({ label: item.navLabel, href: item.href, variant: "outline" as const })),
          { label: "联系我们", href: "/contact/" },
        ]}
      />

      <section className="section-space">
        <div className="site-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article className="glass-card min-w-0 p-5 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-start gap-3 border-b border-slate-200 pb-6 dark:border-slate-700">
              <FileText className="mt-1 h-5 w-5 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">{document.navLabel}</p>
                <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  以下内容按原始法律文档完整呈现，发布或对外提供服务前请结合实际运营主体补充待完善信息。
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {blocks.map((block, index) => (
                <div key={block.type === "heading" ? block.id : `${block.type}-${index}`}>{renderBlock(block)}</div>
              ))}
            </div>
          </article>

          <aside className="glass-card sticky top-28 hidden p-5 lg:block">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">文档目录</p>
            <nav className="mt-4 max-h-[calc(100vh-12rem)] space-y-2 overflow-y-auto pr-1 text-sm text-slate-600 dark:text-slate-400">
              {sectionHeadings.map((heading) => (
                <a key={heading.id} href={`#${heading.id}`} className="block rounded-lg px-3 py-2 transition hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-300">
                  {heading.text}
                </a>
              ))}
            </nav>
            <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-700">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Legal</p>
              <div className="mt-3 space-y-2 text-sm">
                {legalDocumentList.map((item) => (
                  <SmartLink
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 transition ${
                      item.slug === slug
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                    }`}
                  >
                    {item.navLabel}
                  </SmartLink>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
