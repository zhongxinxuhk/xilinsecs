"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmbedShellProps = {
  src: string;
  title: string;
  note?: string;
};

export default function EmbedShell({ src, title, note }: EmbedShellProps) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  return (
    <section className="site-shell">
      <div className="rainbow-panel overflow-hidden">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/80 bg-white/70 px-4 py-4 text-slate-950 sm:flex-row sm:items-center sm:px-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.16em] text-blue-700">在线服务</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">{title}</h2>
          </div>
          {note ? (
            <div className="hidden max-w-sm items-start gap-2 rounded-2xl border border-blue-100 bg-white/85 px-4 py-2 text-xs leading-6 text-slate-600 md:flex">
              <ShieldCheck className="mt-1 h-4 w-4 flex-none text-blue-600" />
              <span className="min-w-0">{note}</span>
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[70vh] overflow-auto bg-white/60">
          {!loaded && visible ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/55 p-4 backdrop-blur-sm">
              <div className="w-[min(360px,92%)] rounded-[24px] border border-white/80 bg-white/92 p-5 text-center shadow-glass sm:rounded-[28px] sm:p-8">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                <h3 className="mt-5 text-lg font-semibold text-slate-950">正在载入外部表单</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  若载入较慢，请稍候片刻或在新窗口中打开。
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-center text-sm font-semibold leading-tight text-white"
                  >
                    在新窗口打开
                  </a>
                  <Button variant="ghost" onClick={() => setVisible(false)} className="w-full sm:w-auto">
                    隐藏遮罩
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
          <iframe
            src={src}
            title={title}
            className="h-[72vh] w-full min-w-[680px] border-0 sm:min-w-0"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
