"use client";

import { useMemo, useState } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RandomPickerTool() {
  const [entries, setEntries] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [error, setError] = useState("");

  const preview = useMemo(() => entries.slice(0, 16), [entries]);

  async function handleFile(file: File) {
    setError("");

    try {
      const XLSX = await import("xlsx");
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Array<string | number | null>>(firstSheet, {
        header: 1,
      });

      const nextEntries = rows
        .flat()
        .map((item) => String(item ?? "").trim())
        .filter(Boolean);

      setEntries(Array.from(new Set(nextEntries)));
      setPicked([]);
    } catch (currentError) {
      setEntries([]);
      setError("读取文件失败，请确认文件为 Excel 或 CSV。");
    }
  }

  function handlePick() {
    if (!entries.length) return;

    const pool = [...entries];
    const results: string[] = [];

    for (let index = 0; index < Math.min(count, pool.length); index += 1) {
      const nextIndex = Math.floor(Math.random() * pool.length);
      results.push(pool.splice(nextIndex, 1)[0]);
    }

    setPicked(results);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="glass-card p-6">
        <h3 className="text-2xl font-semibold text-slate-950">导入名单</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          支持 Excel / CSV 文件，默认读取第一张表并提取非空单元格作为候选名单。
        </p>

        <label className="mt-6 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white px-6 text-center">
          <div className="text-base font-semibold text-slate-950">上传名单文件</div>
          <div className="mt-2 text-sm text-slate-500">支持 Excel 或 CSV，本地解析不上传</div>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleFile(file);
              }
            }}
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="h-12 w-24 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
          />
          <Button onClick={handlePick} disabled={!entries.length}>
            <Shuffle className="mr-2 h-4 w-4" />
            开始随机抽取
          </Button>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}
      </section>

      <aside className="glass-card p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">名单预览</div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-950">名单与结果</h3>
        <div className="mt-5 text-sm text-slate-600">
          当前导入 {entries.length} 条候选项。
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {preview.map((item) => (
            <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {item}
            </span>
          ))}
        </div>
        <div className="soft-output-panel mt-6 p-4">
          <div className="text-sm text-slate-500">抽取结果</div>
          <div className="mt-4 flex flex-wrap gap-3">
            {picked.length ? (
              picked.map((item) => (
                <span key={item} className="rounded-full bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-500">暂无结果</span>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
