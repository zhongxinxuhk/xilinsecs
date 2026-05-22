"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type PinCardProps = {
  pin: string;
  note: string;
};

export default function PinCard({ pin, note }: PinCardProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(pin);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="glass-card p-5 text-slate-950 dark:text-slate-50 sm:p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-blue-700">Team PIN</p>
      <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-slate-50">iOA 入网 PIN</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{note}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="soft-output-panel w-full px-4 py-3 text-center text-xl font-semibold tracking-[0.24em] text-blue-700 sm:w-auto sm:px-5 sm:text-2xl sm:tracking-[0.35em]">
          {visible ? pin : "••••••"}
        </div>
        <Button variant="outline" onClick={() => setVisible((value) => !value)} className="w-full sm:w-auto">
          {visible ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {visible ? "隐藏" : "查看"}
        </Button>
        <Button variant="outline" onClick={handleCopy} className="w-full sm:w-auto">
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "已复制" : "复制 PIN"}
        </Button>
      </div>
    </div>
  );
}
