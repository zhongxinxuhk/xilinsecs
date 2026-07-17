"use client";

import { useState } from "react";
import { Copy, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Md5Tool() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleFile(file: File) {
    setLoading(true);
    setError("");
    setFileName(file.name);
    setFileSize(`${(file.size / 1024 / 1024).toFixed(2)} MB`);

    try {
      const SparkMD5 = await import("spark-md5");
      const buffer = await file.arrayBuffer();
      const value = SparkMD5.ArrayBuffer.hash(buffer);
      setHash(value);
    } catch (currentError) {
      setHash("");
      setError("文件处理失败，请重试。");
    } finally {
      setLoading(false);
    }
  }

  async function copyHash() {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="glass-card p-6">
        <h3 className="text-2xl font-semibold text-slate-950">文件 MD5 计算</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          计算在浏览器本地完成，不上传文件内容，适合下载校验和交付确认场景。
        </p>

        <label className="mt-6 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white px-6 text-center">
          <FileUp className="h-10 w-10 text-blue-700" />
          <div className="mt-4 text-base font-semibold text-slate-950">选择文件开始计算</div>
          <div className="mt-2 text-sm text-slate-500">支持任意文件类型，结果仅在本地生成</div>
          <input
            type="file"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleFile(file);
              }
            }}
          />
        </label>
      </section>

      <aside className="glass-card p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">摘要值</div>
        <h3 className="mt-4 text-2xl font-semibold text-slate-950">校验结果</h3>
        <div className="mt-5 space-y-3 text-sm text-slate-700">
          <div>文件名：{fileName || "未选择文件"}</div>
          <div>文件大小：{fileSize || "-"}</div>
          <div>状态：{loading ? "计算中..." : hash ? "已完成" : "等待文件"}</div>
        </div>
        <div className="soft-output-panel mt-6 p-4 text-sm">
          {error ? <span className="text-rose-500">{error}</span> : hash || "MD5 结果会显示在这里。"}
        </div>
        {hash ? (
          <div className="mt-5">
            <Button variant="outline" onClick={copyHash}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "已复制" : "复制 MD5"}
            </Button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
